import React, { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Navigation, Layers, Plus, Minus, Sun, Moon, Globe, Play, Pause } from 'lucide-react';
import type { Station } from '../../../../data/mockStations';
import styles from '../../../../scss/systemHome/InstallationLocationsView.module.scss';

interface MapViewProps {
  stations: Station[];
  selectedStation: Station | null;
  onSelectStation: (station: Station) => void;
  isDarkMode: boolean;
  activeCountry: string;
}

export type MapMode = 'standard' | 'satellite' | 'dark';

// Center & Zoom presets for supported language markets
const COUNTRY_CENTERS: Record<string, { lat: number; lng: number; zoom: number }> = {
  ALL: { lat: 20.0, lng: 65.0, zoom: 2.3 },
  KR: { lat: 36.3, lng: 127.8, zoom: 7.0 },
  UZ: { lat: 41.2, lng: 66.5, zoom: 6.2 },
  KG: { lat: 41.5, lng: 74.5, zoom: 6.8 },
  ID: { lat: -2.5, lng: 118.0, zoom: 5.0 },
  IN: { lat: 22.5, lng: 78.5, zoom: 4.8 },
  US: { lat: 37.78, lng: -122.41, zoom: 11.0 },
  RU: { lat: 55.75, lng: 37.61, zoom: 8.0 },
};

// Calculate angular distance on 3D sphere to hide markers on the back hemisphere of Globe
const isStationOnVisibleGlobe = (cameraCenter: maplibregl.LngLat, stationLng: number, stationLat: number): boolean => {
  const rad = Math.PI / 180;
  const dLat = (stationLat - cameraCenter.lat) * rad;
  const dLng = (stationLng - cameraCenter.lng) * rad;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(cameraCenter.lat * rad) * Math.cos(stationLat * rad) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));
  return c < 1.35; // ~77 degrees horizon cutoff
};

export const MapView: React.FC<MapViewProps> = ({
  stations,
  selectedStation,
  onSelectStation,
  isDarkMode,
  activeCountry,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Record<string, { marker: maplibregl.Marker; station: Station; el: HTMLElement }>>({});

  const [mapMode, setMapMode] = useState<MapMode>(isDarkMode ? 'dark' : 'standard');
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const isUserInteractingRef = useRef(false);
  const animFrameIdRef = useRef<number | null>(null);

  // Sync navbar dark mode changes to map mode if satellite is not selected
  useEffect(() => {
    if (mapMode !== 'satellite') {
      setMapMode(isDarkMode ? 'dark' : 'standard');
    }
  }, [isDarkMode]);

  // Generate MapLibre GL 3D Globe Style Specification (Matching Reference Images 1 & 2)
  const getGlobeMapStyle = (mode: MapMode): maplibregl.StyleSpecification => {
    if (mode === 'satellite') {
      return {
        version: 8,
        projection: { type: 'globe' },
        sources: {
          'esri-satellite': {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
            attribution: '&copy; Esri &copy; Maxar',
          },
        },
        layers: [
          {
            id: 'satellite-bg',
            type: 'background',
            paint: { 'background-color': '#010409' },
          },
          {
            id: 'satellite-tiles',
            type: 'raster',
            source: 'esri-satellite',
            minzoom: 0,
            maxzoom: 20,
          },
        ],
      };
    }

    const isDark = mode === 'dark';
    const tileSub = isDark ? 'dark_all' : 'rastertiles/voyager';
    const bgColor = isDark ? '#010409' : '#ffffff';

    return {
      version: 8,
      projection: { type: 'globe' },
      sources: {
        'carto-tiles': {
          type: 'raster',
          tiles: [
            `https://a.basemaps.cartocdn.com/${tileSub}/{z}/{x}/{y}{r}.png`,
            `https://b.basemaps.cartocdn.com/${tileSub}/{z}/{x}/{y}{r}.png`,
            `https://c.basemaps.cartocdn.com/${tileSub}/{z}/{x}/{y}{r}.png`,
            `https://d.basemaps.cartocdn.com/${tileSub}/{z}/{x}/{y}{r}.png`,
          ],
          tileSize: 256,
          attribution: '&copy; CARTO &copy; OpenStreetMap',
        },
      },
      layers: [
        {
          id: 'globe-bg',
          type: 'background',
          paint: { 'background-color': bgColor },
        },
        {
          id: 'carto-tiles',
          type: 'raster',
          source: 'carto-tiles',
          minzoom: 0,
          maxzoom: 20,
        },
      ],
    };
  };

  // Build CSMS 3D Globe Radar Target Marker DOM Element (Matching Reference Images 1 & 2)
  const createRadarMarkerElement = (station: Station, isSelected: boolean) => {
    const el = document.createElement('div');
    el.className = `${styles.csmsRadarMarkerWrapper} ${isSelected ? styles.csmsRadarSelected : ''}`;

    let color = '#10b981'; // Green (Available / Active)
    let iconSvg = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
      </svg>
    `;

    if (station.status === 'Charging') {
      color = '#2563eb'; // Blue
      iconSvg = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      `;
    } else if (station.status === 'Faulted') {
      color = '#ef4444'; // Red (Warning)
      iconSvg = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      `;
    } else if (station.status === 'Offline') {
      color = '#64748b'; // Gray
      iconSvg = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
          <line x1="1" y1="1" x2="23" y2="23"></line>
          <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
          <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
        </svg>
      `;
    } else if (station.status === 'Reserved') {
      color = '#8b5cf6'; // Purple
      iconSvg = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      `;
    }

    const isCharging = station.status === 'Charging';
    const activeKw = station.activePowerKw > 0 ? `${station.activePowerKw.toFixed(0)}kW` : '';

    el.innerHTML = `
      <div class="${styles.radarLabelCapsule}" style="background-color: ${color}">
        <span class="${styles.radarCpText}">${station.chargers.length} CP</span>
        ${activeKw ? `<span class="${styles.radarKwText}">${activeKw}</span>` : ''}
      </div>
      <div class="${styles.radarPillarLine}" style="background-color: ${color}"></div>
      <div class="${styles.radarPinBadge}" style="background-color: ${color}">
        ${isCharging ? `<div class="${styles.radarPulseRing}"></div>` : ''}
        <div class="${styles.radarIconWrapper}">${iconSvg}</div>
      </div>
      <div class="${styles.radarTargetBase}" style="border-color: ${color}">
        <div class="${styles.radarTargetCore}" style="background-color: ${color}"></div>
      </div>
    `;

    return el;
  };

  // Function to update 3D Globe marker visibility (Hides backside markers smoothly)
  const updateMarkersVisibility = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const center = map.getCenter();
    const currentZoom = map.getZoom();

    Object.values(markersRef.current).forEach(({ station, el }) => {
      const isSelected = selectedStation?.id === station.id;

      if (currentZoom < 5.0) {
        const isVisible = isStationOnVisibleGlobe(center, station.lng, station.lat);
        if (isVisible || isSelected) {
          el.style.display = 'flex';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        } else {
          el.style.display = 'none';
          el.style.visibility = 'hidden';
          el.style.opacity = '0';
        }
      } else {
        el.style.display = 'flex';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
      }
    });
  };

  // Initialize MapLibre Canvas with 3D Globe & Continuous Auto-Rotation
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: getGlobeMapStyle(mapMode),
        center: [65.0, 20.0],
        zoom: 2.3,
        minZoom: 2.0,
        maxZoom: 19,
        pitch: 0,
        bearing: 0,
        attributionControl: false,
      });

      // Track user interaction to pause/resume slow 3D Globe auto-rotation
      map.on('mousedown', () => { isUserInteractingRef.current = true; });
      map.on('dragstart', () => { isUserInteractingRef.current = true; });
      map.on('zoomstart', () => { isUserInteractingRef.current = true; });
      map.on('touchstart', () => { isUserInteractingRef.current = true; });

      // Bind occlusion check on camera movement & render
      map.on('move', updateMarkersVisibility);
      map.on('render', updateMarkersVisibility);

      mapInstanceRef.current = map;
    }

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Smooth Slow 3D Globe Auto-Rotation Loop (Rotates continuously when zoomed out)
  useEffect(() => {
    let lastTime = performance.now();

    const rotateGlobe = (now: number) => {
      const map = mapInstanceRef.current;
      if (map && isAutoRotating && !isUserInteractingRef.current) {
        const delta = now - lastTime;
        if (delta > 30) { // ~30fps smooth rotation step
          lastTime = now;
          const currentZoom = map.getZoom();
          if (currentZoom < 4.0) {
            const center = map.getCenter();
            center.lng = (center.lng + 0.08) % 360; // Calm slow rotation (Images 1 & 2 spec)
            map.setCenter(center);
            updateMarkersVisibility();
          }
        }
      }
      animFrameIdRef.current = requestAnimationFrame(rotateGlobe);
    };

    animFrameIdRef.current = requestAnimationFrame(rotateGlobe);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isAutoRotating]);

  // Update Map Style when mapMode changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.setStyle(getGlobeMapStyle(mapMode));
  }, [mapMode]);

  // Handle Container Resize Events
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.resize();
        updateMarkersVisibility();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update Station Markers & Popups (Anchor: 'bottom' locks radar base 100% to coordinates)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(({ marker }) => marker.remove());
    markersRef.current = {};

    stations.forEach((station) => {
      const isSelected = selectedStation?.id === station.id;
      const el = createRadarMarkerElement(station, isSelected);

      // Custom Popup Node
      const popupNode = document.createElement('div');
      popupNode.className = styles.appleMapPopup;
      popupNode.innerHTML = `
        <div class="${styles.popupHeader}">
          <span class="${styles.popupCountryBadge}">${station.countryCode}</span>
          <strong class="${styles.popupTitle}">${station.name}</strong>
        </div>
        <div class="${styles.popupAddress}">${station.address}</div>
        <div class="${styles.popupStatsGrid}">
          <div class="${styles.popupStatItem}">
            <span class="${styles.popupStatLabel}">Operator</span>
            <span class="${styles.popupStatVal}">${station.operator}</span>
          </div>
          <div class="${styles.popupStatItem}">
            <span class="${styles.popupStatLabel}">Chargers</span>
            <span class="${styles.popupStatVal}">${station.chargers.length} Units</span>
          </div>
          <div class="${styles.popupStatItem}">
            <span class="${styles.popupStatLabel}">Status</span>
            <span class="${styles.popupStatusBadge}" style="color: ${station.status === 'Charging' ? '#2563eb' : station.status === 'Available' ? '#10b981' : '#ef4444'}">
              ● ${station.status}
            </span>
          </div>
          <div class="${styles.popupStatItem}">
            <span class="${styles.popupStatLabel}">Active Load</span>
            <span class="${styles.popupStatVal}">${station.activePowerKw.toFixed(1)} kW</span>
          </div>
        </div>
        <button id="btn-inspect-${station.id}" class="${styles.applePopupBtn}">
          Inspect Station & Remote Control →
        </button>
      `;

      const popup = new maplibregl.Popup({
        offset: [0, -48],
        closeButton: true,
        closeOnClick: false,
        className: styles.customApplePopup,
      }).setDOMContent(popupNode);

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        isUserInteractingRef.current = true;
        onSelectStation(station);
      });

      popup.on('open', () => {
        const btn = document.getElementById(`btn-inspect-${station.id}`);
        if (btn) {
          btn.onclick = () => onSelectStation(station);
        }
      });

      // Anchor: 'bottom' locks target radar base directly to [station.lng, station.lat]
      const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([station.lng, station.lat])
        .setPopup(popup)
        .addTo(map);

      markersRef.current[station.id] = { marker, station, el };
    });

    updateMarkersVisibility();
  }, [stations, selectedStation]);

  // Center Map on Country Select (Pauses auto-rotation and flies smoothly)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    isUserInteractingRef.current = true;
    const preset = COUNTRY_CENTERS[activeCountry] || COUNTRY_CENTERS.ALL;
    map.flyTo({
      center: [preset.lng, preset.lat],
      zoom: preset.zoom,
      pitch: 0,
      bearing: 0,
      speed: 0.35,
      curve: 1.4,
      duration: 2500,
      essential: true,
    });
  }, [activeCountry]);

  // Center Map on Selected Station (Pauses auto-rotation and flies smoothly to station)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedStation) return;

    isUserInteractingRef.current = true;
    map.flyTo({
      center: [selectedStation.lng, selectedStation.lat],
      zoom: 14.0,
      pitch: 0,
      bearing: 0,
      speed: 0.35,
      curve: 1.4,
      duration: 2500,
      essential: true,
    });

    const item = markersRef.current[selectedStation.id];
    if (item) {
      item.marker.togglePopup();
    }
  }, [selectedStation]);

  // Controls Handler
  const handleZoomIn = () => {
    isUserInteractingRef.current = true;
    mapInstanceRef.current?.zoomIn({ duration: 300 });
  };

  const handleZoomOut = () => {
    isUserInteractingRef.current = true;
    mapInstanceRef.current?.zoomOut({ duration: 300 });
  };

  const handleRecenter = () => {
    isUserInteractingRef.current = false;
    mapInstanceRef.current?.flyTo({
      center: [65.0, 20.0],
      zoom: 2.3,
      pitch: 0,
      bearing: 0,
      speed: 0.4,
      duration: 2000,
    });
  };

  const toggleAutoRotate = () => {
    if (!isAutoRotating) {
      isUserInteractingRef.current = false;
    }
    setIsAutoRotating(!isAutoRotating);
  };

  return (
    <div className={styles.globeMapWrapper}>
      <div ref={mapContainerRef} className={styles.mapLibreCanvas} />

      {/* FLOATING LAYER SELECTOR (Top-Left) */}
      <div className={styles.appleLayerSwitcher}>
        <button
          className={`${styles.appleControlBtn} ${isLayerMenuOpen ? styles.appleControlActive : ''}`}
          onClick={() => setIsLayerMenuOpen(!isLayerMenuOpen)}
          title="Map Layers"
        >
          <Layers size={18} />
        </button>

        {isLayerMenuOpen && (
          <div className={styles.appleLayerMenu}>
            <button
              className={`${styles.appleLayerOption} ${mapMode === 'standard' ? styles.activeOption : ''}`}
              onClick={() => {
                setMapMode('standard');
                setIsLayerMenuOpen(false);
              }}
            >
              <Sun size={15} />
              <span>Standard Day</span>
            </button>
            <button
              className={`${styles.appleLayerOption} ${mapMode === 'satellite' ? styles.activeOption : ''}`}
              onClick={() => {
                setMapMode('satellite');
                setIsLayerMenuOpen(false);
              }}
            >
              <Globe size={15} />
              <span>Satellite</span>
            </button>
            <button
              className={`${styles.appleLayerOption} ${mapMode === 'dark' ? styles.activeOption : ''}`}
              onClick={() => {
                setMapMode('dark');
                setIsLayerMenuOpen(false);
              }}
            >
              <Moon size={15} />
              <span>Dark Space</span>
            </button>
          </div>
        )}
      </div>

      {/* FLOATING CONTROL STACK (Bottom-Left) */}
      <div className={styles.appleFloatingStack}>
        <button
          className={`${styles.appleControlBtn} ${isAutoRotating && !isUserInteractingRef.current ? styles.appleControlActive : ''}`}
          onClick={toggleAutoRotate}
          title={isAutoRotating ? 'Pause 3D Globe Rotation' : 'Rotate 3D Globe'}
        >
          {isAutoRotating && !isUserInteractingRef.current ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button className={styles.appleControlBtn} onClick={handleRecenter} title="Re-center Global Network">
          <Navigation size={18} />
        </button>
        <button className={styles.appleControlBtn} onClick={handleZoomIn} title="Zoom In">
          <Plus size={18} />
        </button>
        <button className={styles.appleControlBtn} onClick={handleZoomOut} title="Zoom Out">
          <Minus size={18} />
        </button>
      </div>
    </div>
  );
};

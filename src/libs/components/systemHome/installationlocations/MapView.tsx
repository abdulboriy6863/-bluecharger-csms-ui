import React, { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Navigation, Layers, Plus, Minus, Sun, Moon, Globe, Play, Pause } from 'lucide-react';
import type { Station } from '../../../../data/mockStations';
import type { Charger } from '../../../types/charger/charger';
import styles from '../../../../scss/systemHome/InstallationLocationsView.module.scss';

interface MapViewProps {
  stations: Station[];
  selectedStation: Station | null;
  onSelectStation: (station: Station) => void;
  isDarkMode: boolean;
  activeCountry: string;
  onSelectCharger?: (charger: Charger) => void;
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
  onSelectCharger,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maplibregl.Map | null>(null);

  // Client-side state management (ID-based Map) preventing duplicate markers and object breakups
  const markersMapRef = useRef<Map<string, { marker: maplibregl.Marker; station: Station; el: HTMLElement }>>(new Map());
  const chargerMarkersMapRef = useRef<Map<string, { marker: maplibregl.Marker; cp: any; el: HTMLElement }>>(new Map());

  const [mapMode, setMapMode] = useState<MapMode>(isDarkMode ? 'dark' : 'standard');
  const [zoomClass, setZoomClass] = useState<'zoom-low' | 'zoom-mid' | 'zoom-high'>('zoom-mid');
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const isUserInteractingRef = useRef(false);
  const animFrameIdRef = useRef<number | null>(null);

  // Calculate coordinates for offset chargers to show exact position clusters
  const getChargerCoordinates = (stationLat: number, stationLng: number, index: number, total: number) => {
    if (total <= 1) {
      return { lat: stationLat, lng: stationLng };
    }
    const radius = 0.00025; // ~25 meters
    const angle = (index * 2 * Math.PI) / total;
    const latOffset = radius * Math.sin(angle);
    const lngOffset = (radius * Math.cos(angle)) / Math.cos(stationLat * Math.PI / 180);
    return {
      lat: stationLat + latOffset,
      lng: stationLng + lngOffset,
    };
  };

  // Build Charger Marker DOM element
  const createChargerMarkerElement = (cp: any, isDark: boolean) => {
    const el = document.createElement('div');
    el.className = `${styles.csmsChargerMarkerWrapper} ${isDark ? styles.nightModeMarker : styles.dayModeMarker}`;

    let statusClass = '';
    let iconSvg = '';

    if (cp.status === 'Charging') {
      statusClass = styles.chargerCharging;
      iconSvg = `
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      `;
    } else if (cp.status === 'Available') {
      statusClass = styles.chargerAvailable;
      iconSvg = `
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
        </svg>
      `;
    } else if (cp.status === 'Faulted') {
      statusClass = styles.chargerFaulted;
      iconSvg = `
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        </svg>
      `;
    } else if (cp.status === 'Offline') {
      statusClass = styles.chargerOffline;
      iconSvg = `
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
        </svg>
      `;
    } else if (cp.status === 'Reserved') {
      statusClass = styles.chargerReserved;
      iconSvg = `
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      `;
    }

    el.innerHTML = `
      <div class="${styles.chargerLabel}">${cp.id}</div>
      <div class="${styles.chargerPin} ${statusClass}">
        ${cp.status === 'Charging' ? `<div class="${styles.chargerPulseRing}"></div>` : ''}
        <div class="${styles.chargerIcon}">${iconSvg}</div>
      </div>
    `;

    return el;
  };

  // Sync navbar dark mode changes to map mode if satellite is not selected
  useEffect(() => {
    if (mapMode !== 'satellite') {
      setMapMode(isDarkMode ? 'dark' : 'standard');
    }
  }, [isDarkMode]);

  // Generate MapLibre GL 3D Globe Style Specification (Adaptive Day / Night Space Atmosphere)
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
    const bgColor = isDark ? '#010409' : '#f8fafc';

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

  // Build Diegetic CSMS Holographic Pillar Marker (4 Korean CSMS Infrastructure Categories)
  const createRadarMarkerElement = (station: Station, isSelected: boolean, isDark: boolean) => {
    const el = document.createElement('div');
    el.className = `${styles.csmsRadarMarkerWrapper} ${isSelected ? styles.csmsRadarSelected : ''} ${isDark ? styles.nightModeMarker : styles.dayModeMarker}`;

    // 1. Standby (대기중 - Blue #007aff)
    // 2. Active Flow (충전중 - Green #10b981)
    // 3. Malfunction (고장 - Red #ef4444)
    // 4. Connection Lost (끊김 - Yellow #f59e0b)
    let color = '#007aff'; // Default Blue (대기중)
    let krStatus = '대기중';
    let iconSvg = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 10h-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4h2a2 2 0 0 1 2 2v3a1 1 0 0 1-2 1v1"></path>
      </svg>
    `;
    let animationClass = '';

    if (station.status === 'Charging') { // 충전중 (Active Flow - Green)
      color = '#10b981';
      krStatus = '충전중';
      animationClass = styles.activeFlowParticleStream;
      iconSvg = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      `;
    } else if (station.status === 'Available') { // 대기중 (Standby - Blue)
      color = '#007aff';
      krStatus = '대기중';
      iconSvg = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
        </svg>
      `;
    } else if (station.status === 'Faulted') { // 고장 (Malfunction - Red)
      color = '#ef4444';
      krStatus = '고장';
      animationClass = styles.fracturedRedSparks;
      iconSvg = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      `;
    } else if (station.status === 'Offline') { // 끊김 (Connection Lost - Yellow)
      color = '#f59e0b';
      krStatus = '끊김';
      animationClass = styles.breakingCommLines;
      iconSvg = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
        </svg>
      `;
    } else if (station.status === 'Reserved') { // 예약 (Pre-booked - Purple)
      color = '#8b5cf6';
      krStatus = '예약';
      iconSvg = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      `;
    }

    const totalCapacityKw = station.totalPowerKw;
    const labelDataText = `${station.chargers.length} CP | ${totalCapacityKw}kW`;

    el.innerHTML = `
      <div class="${styles.radarLabelCapsule} ${animationClass}" style="border-color: ${color}; background-color: ${isDark ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.95)'}">
        <span class="${styles.krStatusBadge}" style="background-color: ${color}">${krStatus}</span>
        <span class="${styles.radarCpText}" style="color: ${isDark ? '#f8fafc' : '#0f172a'}">${labelDataText}</span>
      </div>
      <div class="${styles.holographicPillarLine}" style="background: linear-gradient(to top, ${color}, transparent)"></div>
      <div class="${styles.radarPinBadge}" style="background-color: ${color}; border-color: ${isDark ? '#ffffff' : color}">
        ${station.status === 'Charging' ? `<div class="${styles.radarPulseRing}"></div>` : ''}
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

    markersMapRef.current.forEach(({ station, el }) => {
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

    // Hide or show charger markers based on zoom visibility
    chargerMarkersMapRef.current.forEach(({ marker, el }) => {
      if (currentZoom >= 13.5) {
        el.style.display = 'flex';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
      } else {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
      }
    });
  };

  const updateZoomClass = (map: maplibregl.Map) => {
    const z = map.getZoom();
    let nextClass: 'zoom-low' | 'zoom-mid' | 'zoom-high' = 'zoom-mid';
    if (z < 4.5) {
      nextClass = 'zoom-low';
    } else if (z >= 13.5) {
      nextClass = 'zoom-high';
    }
    setZoomClass(nextClass);
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

      map.on('mousedown', () => { isUserInteractingRef.current = true; });
      map.on('dragstart', () => { isUserInteractingRef.current = true; });
      map.on('zoomstart', () => { isUserInteractingRef.current = true; });
      map.on('touchstart', () => { isUserInteractingRef.current = true; });

      map.on('move', updateMarkersVisibility);
      map.on('render', updateMarkersVisibility);
      map.on('zoom', () => {
        updateZoomClass(map);
        updateMarkersVisibility();
      });

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

  // Smooth Slow 3D Globe Auto-Rotation Loop
  useEffect(() => {
    let lastTime = performance.now();

    const rotateGlobe = (now: number) => {
      const map = mapInstanceRef.current;
      if (map && isAutoRotating && !isUserInteractingRef.current) {
        const delta = now - lastTime;
        if (delta > 30) {
          lastTime = now;
          const currentZoom = map.getZoom();
          if (currentZoom < 4.0) {
            const center = map.getCenter();
            center.lng = (center.lng + 0.08) % 360;
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

  // Update Station & Charger Markers using ID-based Map State Management to prevent duplicates/breakups
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const activeStationIds = new Set<string>();
    const activeChargerIds = new Set<string>();
    const isDark = mapMode === 'dark' || (mapMode !== 'standard' && isDarkMode);

    // 1. Manage Station Markers
    stations.forEach((station) => {
      activeStationIds.add(station.id);
      const isSelected = selectedStation?.id === station.id;

      let existing = markersMapRef.current.get(station.id);

      if (existing) {
        // Update existing marker DOM element cleanly without recreate/flicker
        const newEl = createRadarMarkerElement(station, isSelected, isDark);
        existing.marker.getElement().innerHTML = newEl.innerHTML;
        existing.marker.getElement().className = newEl.className;
        existing.marker.setLngLat([station.lng, station.lat]);
        existing.station = station;
      } else {
        // Create new anchored marker
        const el = createRadarMarkerElement(station, isSelected, isDark);

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
              <span class="${styles.popupStatusBadge}" style="color: ${station.status === 'Charging' ? '#10b981' : station.status === 'Available' ? '#007aff' : '#ef4444'}">
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

        const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
          .setLngLat([station.lng, station.lat])
          .setPopup(popup)
          .addTo(map);

        markersMapRef.current.set(station.id, { marker, station, el });
      }
    });

    // Remove any obsolete station markers no longer in dataset
    markersMapRef.current.forEach((val, id) => {
      if (!activeStationIds.has(id)) {
        val.marker.remove();
        markersMapRef.current.delete(id);
      }
    });

    // 2. Manage Individual Charger Markers (only at high zoom)
    if (zoomClass === 'zoom-high') {
      stations.forEach((station) => {
        const totalCps = station.chargers.length;
        station.chargers.forEach((cp, index) => {
          activeChargerIds.add(cp.id);
          let existingCp = chargerMarkersMapRef.current.get(cp.id);
          const offsetCoords = getChargerCoordinates(station.lat, station.lng, index, totalCps);

          if (existingCp) {
            const newEl = createChargerMarkerElement(cp, isDark);
            existingCp.marker.getElement().innerHTML = newEl.innerHTML;
            existingCp.marker.getElement().className = newEl.className;
            existingCp.marker.setLngLat([offsetCoords.lng, offsetCoords.lat]);
            existingCp.cp = cp;
          } else {
            const el = createChargerMarkerElement(cp, isDark);

            // Charger click action: opens the full detail drawer
            el.addEventListener('click', (e) => {
              e.stopPropagation();
              isUserInteractingRef.current = true;
              if (onSelectCharger) {
                const fullCharger: Charger = {
                  id: cp.id,
                  name: cp.name,
                  stationId: station.id,
                  stationName: station.name,
                  region: station.region,
                  status: cp.status,
                  connectors: cp.connectors,
                  manufacturer: cp.manufacturer,
                  model: cp.model,
                  firmwareVersion: cp.firmwareVersion,
                  ocppVersion: cp.ocppVersion,
                  ipAddress: cp.ipAddress,
                  macAddress: '00:1E:C0:8A:4F:99',
                  lastHeartbeat: cp.lastHeartbeat,
                  lastStatusChange: 'Just now',
                  todayEnergyKwh: cp.todayEnergyKwh,
                  totalSessionsToday: cp.totalSessionsToday,
                };
                onSelectCharger(fullCharger);
              }
            });

            const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
              .setLngLat([offsetCoords.lng, offsetCoords.lat])
              .addTo(map);

            chargerMarkersMapRef.current.set(cp.id, { marker, cp, el });
          }
        });
      });
    }

    // Remove any obsolete or hidden chargers
    chargerMarkersMapRef.current.forEach((val, id) => {
      if (zoomClass !== 'zoom-high' || !activeChargerIds.has(id)) {
        val.marker.remove();
        chargerMarkersMapRef.current.delete(id);
      }
    });

    updateMarkersVisibility();
  }, [stations, selectedStation, mapMode, isDarkMode, zoomClass]);

  // Center Map on Country Select
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

  // Center Map on Selected Station
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

    const item = markersMapRef.current.get(selectedStation.id);
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
      <div ref={mapContainerRef} className={`${styles.mapLibreCanvas} ${styles[zoomClass]}`} />

      {/* FLOATING LAYER SELECTOR (Top-Right) */}
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

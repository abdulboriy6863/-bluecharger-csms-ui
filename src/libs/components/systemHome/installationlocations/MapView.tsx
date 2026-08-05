import React, { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Navigation, Layers, Plus, Minus, Sun, Moon, Globe } from 'lucide-react';
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

// Center & Zoom presets for supported language markets (Apple Maps Globe & City Presets)
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

  // Sync navbar dark mode changes to map mode if satellite is not selected
  useEffect(() => {
    if (mapMode !== 'satellite') {
      setMapMode(isDarkMode ? 'dark' : 'standard');
    }
  }, [isDarkMode]);

  // Generate MapLibre GL Apple 3D Globe Map Style Specification
  const getAppleMapStyle = (mode: MapMode): maplibregl.StyleSpecification => {
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
            paint: { 'background-color': '#000000' },
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
    const bgColor = isDark ? '#030712' : '#ffffff';

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
          id: 'apple-map-bg',
          type: 'background',
          paint: { 'background-color': bgColor },
        },
        {
          id: 'apple-map-tiles',
          type: 'raster',
          source: 'carto-tiles',
          minzoom: 0,
          maxzoom: 20,
        },
      ],
    };
  };

  // Build Apple Maps Signature Pin Marker DOM Element
  // IMPORTANT: Order is Label (Top), Pin Badge (Middle), Pin Tip (Bottom).
  // This guarantees anchor: 'bottom' locks the sharp tip EXACTLY to [lng, lat]!
  const createAppleMarkerElement = (station: Station, isSelected: boolean) => {
    const el = document.createElement('div');
    el.className = `${styles.appleMarkerWrapper} ${isSelected ? styles.appleMarkerSelected : ''}`;

    let color = '#34c759'; // Apple System Green (Available)
    let iconSvg = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
      </svg>
    `;

    if (station.status === 'Charging') {
      color = '#007aff'; // Apple System Blue
      iconSvg = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      `;
    } else if (station.status === 'Faulted') {
      color = '#ff3b30'; // Apple System Red
      iconSvg = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      `;
    } else if (station.status === 'Offline') {
      color = '#8e8e93'; // Apple System Gray
      iconSvg = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
          <line x1="1" y1="1" x2="23" y2="23"></line>
          <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
          <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
        </svg>
      `;
    } else if (station.status === 'Reserved') {
      color = '#af52de'; // Apple System Purple
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
      <div class="${styles.appleLabelCapsule}" style="background-color: ${color}">
        <span class="${styles.appleCpText}">${station.chargers.length} CP</span>
        ${activeKw ? `<span class="${styles.appleKwText}">${activeKw}</span>` : ''}
      </div>
      <div class="${styles.applePinBadge}" style="background-color: ${color}">
        ${isCharging ? `<div class="${styles.applePulseGlow}"></div>` : ''}
        <div class="${styles.appleIconWrapper}">${iconSvg}</div>
      </div>
      <div class="${styles.applePinTail}" style="border-top-color: ${color}"></div>
    `;

    return el;
  };

  // Initialize MapLibre Canvas with Apple 3D Globe & Mercator rendering
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: getAppleMapStyle(mapMode),
        center: [65.0, 20.0],
        zoom: 2.3,
        minZoom: 2.0,
        maxZoom: 19,
        pitch: 0,
        bearing: 0,
        attributionControl: false,
      });

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Map Style when mapMode changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.setStyle(getAppleMapStyle(mapMode));
  }, [mapMode]);

  // Handle Container Resize Events
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update Station Markers & Popups (Anchor: 'bottom' locks pin tip 100% to coordinates)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(({ marker }) => marker.remove());
    markersRef.current = {};

    stations.forEach((station) => {
      const isSelected = selectedStation?.id === station.id;
      const el = createAppleMarkerElement(station, isSelected);

      // Custom Apple Maps Style Popup Node
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
            <span class="${styles.popupStatusBadge}" style="color: ${station.status === 'Charging' ? '#007aff' : station.status === 'Available' ? '#34c759' : '#ff3b30'}">
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
        onSelectStation(station);
      });

      popup.on('open', () => {
        const btn = document.getElementById(`btn-inspect-${station.id}`);
        if (btn) {
          btn.onclick = () => onSelectStation(station);
        }
      });

      // Anchor: 'bottom' locks pin tip directly to [station.lng, station.lat]
      const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([station.lng, station.lat])
        .setPopup(popup)
        .addTo(map);

      markersRef.current[station.id] = { marker, station, el };
    });
  }, [stations, selectedStation]);

  // Center Map on Country Select (Apple smooth flyTo)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

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

  // Center Map on Selected Station (Apple smooth flyTo)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedStation) return;

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

  // Apple Controls Handler
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn({ duration: 300 });
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut({ duration: 300 });
  const handleRecenter = () => {
    mapInstanceRef.current?.flyTo({
      center: [65.0, 20.0],
      zoom: 2.3,
      pitch: 0,
      bearing: 0,
      speed: 0.4,
      duration: 2000,
    });
  };

  return (
    <div className={styles.globeMapWrapper}>
      <div ref={mapContainerRef} className={styles.mapLibreCanvas} />

      {/* APPLE MAPS FLOATING LAYER SELECTOR (Top-Left) */}
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
              <span>Standard</span>
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
              <span>Dark Mode</span>
            </button>
          </div>
        )}
      </div>

      {/* APPLE MAPS FLOATING CONTROL STACK (Bottom-Left) */}
      <div className={styles.appleFloatingStack}>
        <button className={styles.appleControlBtn} onClick={handleRecenter} title="Re-center Network">
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

import React, { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { Station } from '../../../../data/mockStations';
import styles from '../../../../scss/systemHome/InstallationLocationsView.module.scss';

interface MapViewProps {
  stations: Station[];
  selectedStation: Station | null;
  onSelectStation: (station: Station) => void;
  isDarkMode: boolean;
  activeCountry: string;
}

// Center presets for regional navigation
const COUNTRY_CENTERS: Record<string, { lat: number; lng: number; zoom: number }> = {
  ALL: { lat: 25.0, lng: 45.0, zoom: 2.2 },
  KR: { lat: 36.3, lng: 127.8, zoom: 7.2 },
  UZ: { lat: 40.5, lng: 67.5, zoom: 6.5 },
  US: { lat: 37.78, lng: -122.41, zoom: 10.5 },
  DE: { lat: 52.52, lng: 13.40, zoom: 10.5 },
  AE: { lat: 25.20, lng: 55.27, zoom: 10.5 },
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
  const markersRef = useRef<Record<string, maplibregl.Marker>>({});

  // Generate MapLibre GL 3D Globe Style Specification
  const getGlobeStyle = (dark: boolean): maplibregl.StyleSpecification => {
    const tileSub = dark ? 'dark_all' : 'rastertiles/voyager';
    return {
      version: 8,
      projection: {
        type: 'globe',
      },
      sources: {
        'carto-globe-tiles': {
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
          id: 'carto-globe-layer',
          type: 'raster',
          source: 'carto-globe-tiles',
          minzoom: 0,
          maxzoom: 20,
        },
      ],
    };
  };

  // Helper to build DOM element for custom SVG Pin Marker
  const createMarkerElement = (station: Station, isSelected: boolean) => {
    const el = document.createElement('div');
    el.className = `${styles.markerPinWrapper} ${isSelected ? styles.markerSelected : ''}`;

    let color = '#10b981'; // Green (Available)
    if (station.status === 'Charging') color = '#2563eb'; // Blue
    else if (station.status === 'Faulted') color = '#ef4444'; // Red
    else if (station.status === 'Offline') color = '#64748b'; // Gray
    else if (station.status === 'Reserved') color = '#8b5cf6'; // Purple

    const isCharging = station.status === 'Charging';
    const activeKw = station.activePowerKw > 0 ? `${station.activePowerKw.toFixed(0)}kW` : '';

    el.innerHTML = `
      ${isCharging ? `<div class="${styles.pulseRing}" style="background-color: ${color}"></div>` : ''}
      <div class="${styles.markerPin}" style="background-color: ${color}; border-color: ${isSelected ? '#ffffff' : color}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      </div>
      <div class="${styles.markerLabel}" style="background-color: ${color}">
        <span>${station.chargers.length} CP</span>
        ${activeKw ? `<span class="${styles.kwBadge}">${activeKw}</span>` : ''}
      </div>
    `;

    return el;
  };

  // Initialize MapLibre 3D Globe
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: getGlobeStyle(isDarkMode),
        center: [45.0, 25.0],
        zoom: 2.2,
        pitch: 15,
        attributionControl: false,
      });

      // Add navigation controls (zoom, rotate, pitch)
      map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'bottom-left');

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Map Style when Navbar isDarkMode changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.setStyle(getGlobeStyle(isDarkMode));
  }, [isDarkMode]);

  // Update Station Markers & Popups
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    stations.forEach((station) => {
      const isSelected = selectedStation?.id === station.id;
      const el = createMarkerElement(station, isSelected);

      // Custom Popup HTML
      const popupNode = document.createElement('div');
      popupNode.className = styles.mapPopup;
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
        <button id="btn-inspect-${station.id}" class="${styles.popupInspectBtn}">
          Inspect Station & Chargers →
        </button>
      `;

      const popup = new maplibregl.Popup({
        offset: [0, -35],
        closeButton: true,
        closeOnClick: false,
        className: styles.customMapLibrePopup,
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

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([station.lng, station.lat])
        .setPopup(popup)
        .addTo(map);

      markersRef.current[station.id] = marker;
    });
  }, [stations, selectedStation]);

  // Center Map on Country Select
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const preset = COUNTRY_CENTERS[activeCountry] || COUNTRY_CENTERS.ALL;
    map.flyTo({
      center: [preset.lng, preset.lat],
      zoom: preset.zoom,
      essential: true,
      duration: 1800,
    });
  }, [activeCountry]);

  // Center Map on Selected Station
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedStation) return;

    map.flyTo({
      center: [selectedStation.lng, selectedStation.lat],
      zoom: 14,
      pitch: 35,
      essential: true,
      duration: 1500,
    });

    const marker = markersRef.current[selectedStation.id];
    if (marker) {
      marker.togglePopup();
    }
  }, [selectedStation]);

  return (
    <div className={styles.globeMapWrapper}>
      <div ref={mapContainerRef} className={styles.mapLibreCanvas} />
    </div>
  );
};

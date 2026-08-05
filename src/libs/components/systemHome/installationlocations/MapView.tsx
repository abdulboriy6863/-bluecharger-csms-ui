import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Station } from '../../../../data/mockStations';
import styles from '../../../../scss/systemHome/InstallationLocationsView.module.scss';

interface MapViewProps {
  stations: Station[];
  selectedStation: Station | null;
  onSelectStation: (station: Station) => void;
  isDarkMode: boolean;
  activeCountry: string;
}

// Map center presets for quick navigation
const COUNTRY_CENTERS: Record<string, { lat: number; lng: number; zoom: number }> = {
  ALL: { lat: 38.0, lng: 70.0, zoom: 4 },
  KR: { lat: 36.3, lng: 127.8, zoom: 8 },
  UZ: { lat: 40.5, lng: 67.5, zoom: 7 },
  US: { lat: 37.78, lng: -122.41, zoom: 11 },
  DE: { lat: 52.52, lng: 13.40, zoom: 11 },
  AE: { lat: 25.20, lng: 55.27, zoom: 11 },
};

export const MapView: React.FC<MapViewProps> = ({
  stations,
  selectedStation,
  onSelectStation,
  isDarkMode,
  activeCountry,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  // Get tile layer URL based on top navigation dark mode
  const getTileUrl = (dark: boolean) => {
    return dark
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
  };

  // Helper to create custom SVG marker icons
  const createMarkerIcon = (station: Station, isSelected: boolean) => {
    let color = '#10b981'; // Green for Available
    let statusText = 'Available';

    if (station.status === 'Charging') {
      color = '#2563eb'; // Blue
      statusText = 'Charging';
    } else if (station.status === 'Faulted') {
      color = '#ef4444'; // Red
      statusText = 'Faulted';
    } else if (station.status === 'Offline') {
      color = '#64748b'; // Gray
      statusText = 'Offline';
    } else if (station.status === 'Reserved') {
      color = '#8b5cf6'; // Purple
      statusText = 'Reserved';
    }

    const isCharging = station.status === 'Charging';
    const activeKw = station.activePowerKw > 0 ? `${station.activePowerKw.toFixed(0)}kW` : '';

    const htmlContent = `
      <div class="${styles.markerPinWrapper} ${isSelected ? styles.markerSelected : ''}">
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
      </div>
    `;

    return L.divIcon({
      className: 'custom-station-marker',
      html: htmlContent,
      iconSize: [40, 50],
      iconAnchor: [20, 48],
      popupAnchor: [0, -45],
    });
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [38.0, 70.0],
        zoom: 4,
        zoomControl: false,
      });

      L.control.zoom({ position: 'bottomleft' }).addTo(map);

      const tileLayer = L.tileLayer(getTileUrl(isDarkMode), {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      tileLayerRef.current = tileLayer;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle Tile Theme Update when global isDarkMode changes
  useEffect(() => {
    if (tileLayerRef.current) {
      tileLayerRef.current.setUrl(getTileUrl(isDarkMode));
    }
  }, [isDarkMode]);

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    stations.forEach((station) => {
      const isSelected = selectedStation?.id === station.id;
      const icon = createMarkerIcon(station, isSelected);

      const marker = L.marker([station.lat, station.lng], { icon }).addTo(map);

      // Popup Content
      const popupHtml = `
        <div class="${styles.mapPopup}">
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
        </div>
      `;

      marker.bindPopup(popupHtml, { maxWidth: 300, className: styles.customLeafletPopup });

      marker.on('click', () => {
        onSelectStation(station);
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-inspect-${station.id}`);
        if (btn) {
          btn.onclick = () => onSelectStation(station);
        }
      });

      markersRef.current[station.id] = marker;
    });
  }, [stations, selectedStation]);

  // Center Map on Country Change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const preset = COUNTRY_CENTERS[activeCountry] || COUNTRY_CENTERS.ALL;
    map.flyTo([preset.lat, preset.lng], preset.zoom, { duration: 1.2 });
  }, [activeCountry]);

  // Center Map on Selected Station
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedStation) return;

    map.flyTo([selectedStation.lat, selectedStation.lng], 14, { duration: 1.0 });

    const marker = markersRef.current[selectedStation.id];
    if (marker) {
      marker.openPopup();
    }
  }, [selectedStation]);

  return (
    <div className={styles.mapCanvasContainer}>
      <div ref={mapContainerRef} className={styles.leafletMap} />
    </div>
  );
};

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

// Center & Zoom presets for supported language markets (2D Mercator Map like Image 2)
const COUNTRY_CENTERS: Record<string, { lat: number; lng: number; zoom: number }> = {
  ALL: { lat: 28.0, lng: 65.0, zoom: 2.5 },
  KR: { lat: 36.3, lng: 127.8, zoom: 7.0 },
  UZ: { lat: 41.2, lng: 66.5, zoom: 6.2 },
  KG: { lat: 41.5, lng: 74.5, zoom: 6.8 },
  ID: { lat: -2.5, lng: 118.0, zoom: 5.0 },
  IN: { lat: 22.5, lng: 78.5, zoom: 4.8 },
  US: { lat: 38.0, lng: -96.0, zoom: 4.2 },
  RU: { lat: 56.0, lng: 55.0, zoom: 4.0 },
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

  // Generate MapLibre GL Mercator Style Specification (Matching Image 2)
  const getMapStyle = (dark: boolean): maplibregl.StyleSpecification => {
    const tileSub = dark ? 'dark_all' : 'rastertiles/voyager';
    const bgColor = dark ? '#030712' : '#ffffff';

    return {
      version: 8,
      projection: {
        type: 'mercator',
      },
      sources: {
        'carto-map-tiles': {
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
          id: 'map-bg-layer',
          type: 'background',
          paint: {
            'background-color': bgColor,
          },
        },
        {
          id: 'carto-map-layer',
          type: 'raster',
          source: 'carto-map-tiles',
          minzoom: 0,
          maxzoom: 20,
        },
      ],
    };
  };

  // Build DOM element for CSMS Location Pin Marker (Matching CSMS Image 3 Pin Spec)
  const createMarkerElement = (station: Station, isSelected: boolean) => {
    const el = document.createElement('div');
    el.className = `${styles.csmsMarkerWrapper} ${isSelected ? styles.csmsMarkerSelected : ''}`;

    let color = '#10b981'; // Green (Available)
    let statusIconSvg = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
      </svg>
    `;

    if (station.status === 'Charging') {
      color = '#2563eb'; // Blue
      statusIconSvg = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      `;
    } else if (station.status === 'Faulted') {
      color = '#ef4444'; // Red
      statusIconSvg = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      `;
    } else if (station.status === 'Offline') {
      color = '#64748b'; // Gray
      statusIconSvg = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="1" y1="1" x2="23" y2="23"></line>
          <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
          <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
        </svg>
      `;
    } else if (station.status === 'Reserved') {
      color = '#8b5cf6'; // Purple
      statusIconSvg = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      `;
    }

    const isCharging = station.status === 'Charging';
    const activeKw = station.activePowerKw > 0 ? `${station.activePowerKw.toFixed(0)}kW` : '';

    el.innerHTML = `
      <div class="${styles.csmsPinBadge}" style="background-color: ${color}">
        ${isCharging ? `<div class="${styles.csmsPulseRing}"></div>` : ''}
        <div class="${styles.csmsIconContainer}">${statusIconSvg}</div>
      </div>
      <div class="${styles.csmsPinTip}" style="border-top-color: ${color}"></div>
      <div class="${styles.csmsLabelBadge}" style="background-color: ${color}">
        <span class="${styles.csmsCpCount}">${station.chargers.length} CP</span>
        ${activeKw ? `<span class="${styles.csmsKwVal}">${activeKw}</span>` : ''}
      </div>
    `;

    return el;
  };

  // Initialize MapLibre 2D Mercator Map (Like Image 2 - Pins 100% locked to coordinates)
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: getMapStyle(isDarkMode),
        center: [65.0, 28.0],
        zoom: 2.5,
        minZoom: 1.5,
        maxZoom: 19,
        pitch: 0,
        bearing: 0,
        attributionControl: false,
      });

      // Add navigation controls (zoom in/out)
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-left');

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

    map.setStyle(getMapStyle(isDarkMode));
  }, [isDarkMode]);

  // Handle Resize Events
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update Station Markers & Popups (Anchor: 'bottom' locks tip to coordinates 100%)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(({ marker }) => marker.remove());
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
        offset: [0, -42],
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

      // Anchor: 'bottom' locks pin tip to [station.lng, station.lat]
      const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([station.lng, station.lat])
        .setPopup(popup)
        .addTo(map);

      markersRef.current[station.id] = { marker, station, el };
    });
  }, [stations, selectedStation]);

  // Center Map on Country Select (Calm smooth flyTo)
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

  // Center Map on Selected Station (Calm smooth flyTo, pin stays 100% on location)
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

  return (
    <div className={styles.globeMapWrapper}>
      <div ref={mapContainerRef} className={styles.mapLibreCanvas} />
    </div>
  );
};

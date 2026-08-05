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

// Center & Zoom presets for supported language markets
// Balanced zoom levels and lat 15.0° keep the Globe centered without dropping or overflowing canvas
const COUNTRY_CENTERS: Record<string, { lat: number; lng: number; zoom: number }> = {
  ALL: { lat: 15.0, lng: 65.0, zoom: 2.15 },
  KR: { lat: 36.3, lng: 127.8, zoom: 5.5 },
  UZ: { lat: 41.0, lng: 66.5, zoom: 5.2 },
  KG: { lat: 41.5, lng: 73.5, zoom: 5.5 },
  ID: { lat: -2.5, lng: 115.0, zoom: 4.5 },
  IN: { lat: 22.0, lng: 78.0, zoom: 4.5 },
  US: { lat: 38.0, lng: -98.0, zoom: 4.0 },
  RU: { lat: 56.0, lng: 45.0, zoom: 4.0 },
};

// Calculate angular distance on sphere to hide markers on the backside of 3D Globe
const isStationOnVisibleGlobe = (cameraCenter: maplibregl.LngLat, stationLng: number, stationLat: number): boolean => {
  const rad = Math.PI / 180;
  const dLat = (stationLat - cameraCenter.lat) * rad;
  const dLng = (stationLng - cameraCenter.lng) * rad;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(cameraCenter.lat * rad) * Math.cos(stationLat * rad) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));

  // If angular distance > ~1.40 radians (~80 degrees), it's behind the globe horizon
  return c < 1.40;
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

  // Generate MapLibre GL 3D Globe Style Specification
  const getGlobeStyle = (dark: boolean): maplibregl.StyleSpecification => {
    const tileSub = dark ? 'dark_all' : 'rastertiles/voyager';
    const bgColor = dark ? '#030712' : '#ffffff';

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
          id: 'globe-bg-layer',
          type: 'background',
          paint: {
            'background-color': bgColor,
          },
        },
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

  // Build DOM element for custom SVG Pin Marker
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
      <div class="${styles.markerPin}" style="background-color: ${color}; border-color: ${isSelected ? '#ffffff' : color}">
        ${isCharging ? `<div class="${styles.pulseRingInner}" style="border-color: ${color}"></div>` : ''}
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

  // Function to update marker visibility based on 3D Globe camera orientation
  // ALWAYS keeps markers 100% visible when zoomed in (currentZoom >= 3.8 or selected station)
  const updateMarkersVisibility = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const center = map.getCenter();
    const currentZoom = map.getZoom();

    Object.values(markersRef.current).forEach(({ station, el }) => {
      const isSelected = selectedStation?.id === station.id;

      // When zoomed in (zoom >= 3.8) or selected station, ALWAYS force marker to be visible
      if (isSelected || currentZoom >= 3.8) {
        el.style.display = 'flex';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
      } else {
        const isVisible = isStationOnVisibleGlobe(center, station.lng, station.lat);
        if (isVisible) {
          el.style.display = 'flex';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        } else {
          el.style.display = 'none';
          el.style.visibility = 'hidden';
          el.style.opacity = '0';
        }
      }
    });
  };

  // Initialize MapLibre 3D Globe perfectly centered (pitch: 0 permanently)
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: getGlobeStyle(isDarkMode),
        center: [65.0, 15.0], // Centered vertically & horizontally inside rectangular viewport
        zoom: 2.15,
        minZoom: 2.0, // Prevents shrinking distortion while allowing full globe view
        maxZoom: 19,
        pitch: 0, // Flat upright 3D globe axis permanently centered
        bearing: 0,
        attributionControl: false,
      });

      // Add navigation controls (zoom, rotate)
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-left');

      // Bind occlusion check on camera movement/render
      map.on('move', updateMarkersVisibility);
      map.on('render', updateMarkersVisibility);

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

  // Handle Resize Events
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

  // Update Station Markers & Popups
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

      markersRef.current[station.id] = { marker, station, el };
    });

    updateMarkersVisibility();
  }, [stations, selectedStation]);

  // Center Map on Country Select (Pitch 0, calm smooth speed)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const preset = COUNTRY_CENTERS[activeCountry] || COUNTRY_CENTERS.ALL;
    map.flyTo({
      center: [preset.lng, preset.lat],
      zoom: preset.zoom,
      pitch: 0, // Flat upright 3D globe axis permanently centered
      bearing: 0,
      speed: 0.45, // Smooth slow speed
      curve: 1.4,
      duration: 2400,
      essential: true,
    });
  }, [activeCountry]);

  // Center Map on Selected Station (Smooth calm fly-to transition, ensures markers stay 100% visible)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedStation) return;

    // Immediately force marker visibility for selected station
    const item = markersRef.current[selectedStation.id];
    if (item) {
      item.el.style.display = 'flex';
      item.el.style.visibility = 'visible';
      item.el.style.opacity = '1';
    }

    map.flyTo({
      center: [selectedStation.lng, selectedStation.lat],
      zoom: 13.5,
      pitch: 0, // Keeps map flat and centered without dropping
      bearing: 0,
      speed: 0.4, // Slow, calm camera transition
      curve: 1.4,
      duration: 2600, // 2.6 seconds smooth motion
      essential: true,
    });

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

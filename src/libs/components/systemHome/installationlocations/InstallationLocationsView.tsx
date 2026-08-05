import React, { useState, useEffect, useMemo } from 'react';
import { mockStations, type Station } from '../../../../data/mockStations';
import type { Charger, CommandType } from '../../../types/charger/charger';
import { MapView } from './MapView';
import { StatusCountersBar } from './StatusCountersBar';
import { StationListSidebar } from './StationListSidebar';
import { StationDetailOverlay } from './StationDetailOverlay';
import styles from '../../../../scss/systemHome/InstallationLocationsView.module.scss';

interface InstallationLocationsViewProps {
  isDarkMode?: boolean;
  chargers?: Charger[];
  onSelectCharger?: (charger: Charger) => void;
  onOpenControlModal?: (charger: Charger, defaultCommand?: CommandType) => void;
}

export const InstallationLocationsView: React.FC<InstallationLocationsViewProps> = ({
  isDarkMode = false,
  onSelectCharger,
  onOpenControlModal,
}) => {
  const [stations, setStations] = useState<Station[]>(mockStations);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [activeCountry, setActiveCountry] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isWsConnected, setIsWsConnected] = useState<boolean>(true);

  // Simulated Real-time WebSocket Telemetry updates (fluctuates active kW power for charging sessions)
  useEffect(() => {
    const interval = setInterval(() => {
      setStations((prevStations) =>
        prevStations.map((st) => {
          if (st.status !== 'Charging') return st;

          // Slightly fluctuate active power draw to demonstrate real-time WebSocket connection
          const delta = (Math.random() - 0.5) * 4.0;
          const newActiveKw = Math.max(20, st.activePowerKw + delta);

          const updatedChargers = st.chargers.map((cp) => {
            if (cp.status !== 'Charging') return cp;

            const updatedConnectors = cp.connectors.map((conn) => {
              if (conn.status !== 'Charging' || !conn.currentPowerKw) return conn;
              const connDelta = (Math.random() - 0.5) * 2.0;
              return {
                ...conn,
                currentPowerKw: Math.max(10, conn.currentPowerKw + connDelta),
              };
            });

            return {
              ...cp,
              connectors: updatedConnectors,
              lastHeartbeat: '1 sec ago',
            };
          });

          return {
            ...st,
            activePowerKw: newActiveKw,
            chargers: updatedChargers,
            lastHeartbeat: '1 sec ago',
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Filtered stations based on status, country, and search query
  const filteredStations = useMemo(() => {
    return stations.filter((st) => {
      // Country Filter
      if (activeCountry !== 'ALL' && st.countryCode !== activeCountry) {
        return false;
      }

      // Status Filter
      if (statusFilter !== 'ALL') {
        if (statusFilter === 'Available' && st.availableChargers === 0) return false;
        if (statusFilter === 'Charging' && st.chargingChargers === 0) return false;
        if (statusFilter === 'Faulted' && st.faultedChargers === 0) return false;
        if (statusFilter === 'Offline' && st.offlineChargers === 0) return false;
        if (statusFilter === 'Reserved' && st.reservedChargers === 0) return false;
      }

      // Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = st.name.toLowerCase().includes(q);
        const matchAddress = st.address.toLowerCase().includes(q);
        const matchOperator = st.operator.toLowerCase().includes(q);
        const matchCharger = st.chargers.some(
          (c) =>
            c.id.toLowerCase().includes(q) ||
            c.model.toLowerCase().includes(q) ||
            c.manufacturer.toLowerCase().includes(q)
        );

        if (!matchName && !matchAddress && !matchOperator && !matchCharger) {
          return false;
        }
      }

      return true;
    });
  }, [stations, activeCountry, statusFilter, searchQuery]);

  const handleManualRefresh = () => {
    setIsWsConnected(false);
    setTimeout(() => {
      setIsWsConnected(true);
    }, 400);
  };

  return (
    <div className={styles.container}>
      {/* Top Status & Telemetry Counters Summary Bar */}
      <StatusCountersBar
        stations={stations}
        activeFilter={statusFilter}
        onFilterChange={setStatusFilter}
        isWsConnected={isWsConnected}
        onManualRefresh={handleManualRefresh}
      />

      {/* Main Body (Leaflet Canvas Map + Right Station List Sidebar) */}
      <div className={styles.mainBody}>
        <MapView
          stations={filteredStations}
          selectedStation={selectedStation}
          onSelectStation={setSelectedStation}
          isDarkMode={isDarkMode}
          activeCountry={activeCountry}
        />

        <StationListSidebar
          stations={filteredStations}
          selectedStation={selectedStation}
          onSelectStation={setSelectedStation}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCountry={activeCountry}
          onCountryChange={setActiveCountry}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        />

        {/* Selected Station Inspector Overlay */}
        {selectedStation && (
          <StationDetailOverlay
            station={selectedStation}
            onClose={() => setSelectedStation(null)}
            onSelectCharger={onSelectCharger}
            onOpenControlModal={onOpenControlModal}
          />
        )}
      </div>
    </div>
  );
};

export default InstallationLocationsView;

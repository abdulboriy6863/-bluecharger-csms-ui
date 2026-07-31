import React, { useState, useMemo } from 'react';
import styles from './LiveMonitoring.module.scss';
import { Charger } from '../../types/charger';
import { StatusCounters } from './StatusCounters';
import { FilterBar } from './FilterBar';
import { ChargerTable } from './ChargerTable';

interface LiveMonitoringProps {
  chargers: Charger[];
  onSelectCharger: (charger: Charger) => void;
  onOpenControlModal: (charger: Charger) => void;
}

export const LiveMonitoring: React.FC<LiveMonitoringProps> = ({
  chargers,
  onSelectCharger,
  onOpenControlModal
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedConnector, setSelectedConnector] = useState<string>('ALL');
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);

  // Compute status counts
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: chargers.length };
    chargers.forEach((c) => {
      counts[c.status] = (counts[c.status] || 0) + 1;
    });
    return counts;
  }, [chargers]);

  // Filter chargers
  const filteredChargers = useMemo(() => {
    return chargers.filter((c) => {
      if (selectedStatus !== 'ALL' && c.status !== selectedStatus) return false;
      if (selectedRegion !== 'ALL' && c.region !== selectedRegion) return false;
      if (selectedConnector !== 'ALL') {
        const hasConnector = c.connectors.some(conn => conn.type === selectedConnector);
        if (!hasConnector) return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesId = c.id.toLowerCase().includes(q);
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesStation = c.stationName.toLowerCase().includes(q);
        const matchesModel = c.model.toLowerCase().includes(q);
        if (!matchesId && !matchesName && !matchesStation && !matchesModel) return false;
      }
      return true;
    });
  }, [chargers, selectedStatus, selectedRegion, selectedConnector, searchQuery]);

  const handleResetFilters = () => {
    setSelectedStatus('ALL');
    setSearchQuery('');
    setSelectedRegion('ALL');
    setSelectedConnector('ALL');
  };

  return (
    <div className={styles.monitoringScreen}>
      <div className={styles.headerArea}>
        <div>
          <h1 className={styles.title}>Live Charger Monitoring</h1>
          <p className={styles.subtitle}>
            Real-time status tracking and remote management ({filteredChargers.length} of {chargers.length} chargers displayed)
          </p>
        </div>
      </div>

      <StatusCounters
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
        statusCounts={statusCounts}
      />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        selectedConnector={selectedConnector}
        onConnectorChange={setSelectedConnector}
        autoRefresh={autoRefresh}
        onToggleAutoRefresh={() => setAutoRefresh(!autoRefresh)}
        onResetFilters={handleResetFilters}
      />

      <ChargerTable
        chargers={filteredChargers}
        onSelectCharger={onSelectCharger}
        onOpenControlModal={onOpenControlModal}
      />
    </div>
  );
};

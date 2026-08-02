import type { Charger } from '../charger/charger';

export interface ChargerTableProps {
  chargers: Charger[];
  onSelectCharger: (charger: Charger) => void;
  onOpenControlModal: (charger: Charger) => void;
}

export interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  selectedConnector: string;
  onConnectorChange: (connector: string) => void;
  autoRefresh: boolean;
  onToggleAutoRefresh: () => void;
  onResetFilters: () => void;
}

export interface LiveMonitoringProps {
  chargers: Charger[];
  onSelectCharger: (charger: Charger) => void;
  onOpenControlModal: (charger: Charger) => void;
}

export interface StatusCountersProps {
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
  statusCounts: Record<string, number>;
}

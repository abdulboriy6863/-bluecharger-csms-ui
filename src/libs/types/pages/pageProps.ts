import type { Charger } from '../charger/charger';

export interface ChargerControlPageProps {
  chargers: Charger[];
  onSelectCharger: (charger: Charger) => void;
  onOpenControlModal: (charger: Charger) => void;
}

export interface ChargerStatusPageProps {
  chargers: Charger[];
  onSelectCharger: (charger: Charger) => void;
  onOpenControlModal: (charger: Charger) => void;
}

export interface DashboardPageProps {
  onNavigateMonitoring: () => void;
}

export interface ManagementPageFrameProps {
  title: string;
  description: string;
  columns: string[];
  rows: string[][];
  actionLabel: string;
}

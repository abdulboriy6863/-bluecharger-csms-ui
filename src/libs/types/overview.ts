import type {
  AlertEvent,
  EnergyTrendPoint,
  KpiMetric,
  StatusDistributionPoint,
} from './dashboard';

export interface EnergyTrendChartProps {
  data: EnergyTrendPoint[];
}

export interface KpiCardsProps {
  metrics: KpiMetric[];
}

export interface OverviewDashboardProps {
  onNavigateMonitoring: () => void;
}

export interface RecentAlertsProps {
  alerts: AlertEvent[];
  onSelectCharger?: (chargerId: string) => void;
}

export interface StatusDistributionProps {
  data: StatusDistributionPoint[];
}

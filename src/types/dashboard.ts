export interface KpiMetric {
  title: string;
  value: string | number;
  unit?: string;
  changePercent?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  description?: string;
}

export interface EnergyTrendPoint {
  time: string; // e.g. "08:00"
  energyKwh: number;
  activeSessions: number;
  peakPowerKw: number;
}

export interface StatusDistributionPoint {
  name: string;
  count: number;
  color: string;
}

export interface AlertEvent {
  id: string;
  chargerId: string;
  stationName: string;
  type: 'ERROR' | 'WARNING' | 'INFO';
  code: string;
  message: string;
  timestamp: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  acknowledged: boolean;
}

export interface StationStat {
  count: number;
  unit: string;
  momChange: number;
  trendDirection: 'up' | 'down' | 'flat';
}

export interface ChargerCountStat {
  rapidCount: number;
  rapidUnit: string;
  slowCount: number;
  slowUnit: string;
}

export interface EnergyUsageItem {
  kwh: number;
  changeKwh: number;
  changePercent: number;
  trendDirection: 'up' | 'down' | 'flat';
}

export interface EnergyUsageStat {
  rapid: EnergyUsageItem;
  slow: EnergyUsageItem;
}

export interface MemberStat {
  count: number;
  unit: string;
}

export interface GeneralStatisticsData {
  station: StationStat;
  charger: ChargerCountStat;
  energy: EnergyUsageStat;
  member: MemberStat;
}

export type ChargerStatusPanelId = 'operation' | 'connector';

export interface ChargerStatusBreakdownItem {
  id: string;
  labelKey: string;
  fast: number;
  slow: number;
  total: number;
  color: string;
  badgeBackground: string;
}

export interface ChargerStatusPanelData {
  id: ChargerStatusPanelId;
  titleKey: string;
  items: ChargerStatusBreakdownItem[];
}

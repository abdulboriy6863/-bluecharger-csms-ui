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

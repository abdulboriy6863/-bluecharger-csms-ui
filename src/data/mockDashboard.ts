import type { KpiMetric, EnergyTrendPoint, StatusDistributionPoint } from '../libs/types/dashboard/dashboard';

export const mockKpis: KpiMetric[] = [
  {
    title: 'Total Chargers',
    value: '142',
    unit: 'Units',
    changePercent: 8.5,
    changeType: 'positive',
    description: 'Across 4 Global Regions'
  },
  {
    title: 'Active Charging',
    value: '48',
    unit: 'Active Now',
    changePercent: 12.4,
    changeType: 'positive',
    description: 'Utilizing 4.8 MW total load'
  },
  {
    title: 'Today Energy Delivered',
    value: '18.42',
    unit: 'MWh',
    changePercent: 15.2,
    changeType: 'positive',
    description: '+2.4 MWh vs Yesterday'
  },
  {
    title: 'Network Uptime',
    value: '99.4%',
    unit: 'Target 99%',
    changePercent: 0.2,
    changeType: 'positive',
    description: '2 Faulted / 3 Offline'
  },
  {
    title: 'Today Revenue',
    value: '$4,850.40',
    unit: 'USD',
    changePercent: 11.8,
    changeType: 'positive',
    description: 'Avg $0.26 / kWh'
  }
];

export const mockEnergyTrend: EnergyTrendPoint[] = [
  { time: '00:00', energyKwh: 340, activeSessions: 12, peakPowerKw: 420 },
  { time: '03:00', energyKwh: 180, activeSessions: 8, peakPowerKw: 210 },
  { time: '06:00', energyKwh: 490, activeSessions: 22, peakPowerKw: 680 },
  { time: '09:00', energyKwh: 1250, activeSessions: 46, peakPowerKw: 1540 },
  { time: '12:00', energyKwh: 1680, activeSessions: 58, peakPowerKw: 1980 },
  { time: '15:00', energyKwh: 1420, activeSessions: 52, peakPowerKw: 1750 },
  { time: '18:00', energyKwh: 1890, activeSessions: 64, peakPowerKw: 2210 },
  { time: '21:00', energyKwh: 1100, activeSessions: 38, peakPowerKw: 1320 },
];

export const mockStatusDistribution: StatusDistributionPoint[] = [
  { name: 'Available', count: 68, color: '#10b981' },
  { name: 'Charging', count: 48, color: '#06b6d4' },
  { name: 'Reserved', count: 12, color: '#f59e0b' },
  { name: 'Faulted', count: 6, color: '#ef4444' },
  { name: 'Offline', count: 8, color: '#64748b' },
];

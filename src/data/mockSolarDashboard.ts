import type { SolarDashboardData } from '../libs/types/dashboard/solarDashboard';

export const mockSolarDashboard: SolarDashboardData = {
  titleKey: 'solarDashboard.title',
  subtitleKey: 'solarDashboard.subtitle',
  weather: {
    temperatureC: 11,
    plantNameKey: 'solarDashboard.plantName',
    conditionKey: 'solarDashboard.weather.clear',
  },
  flow: {
    pvKwh: 1.76,
    gridKwh: 1.76,
    loadKwh: 0,
    batteryKwh: 0,
  },
  kpi: {
    batterySocPercent: 98,
    selfConsumptionPercent: 0,
    pvPowerKw: 0.31,
    loadPowerKw: 0,
  },
  power: {
    importKw: 8.5,
    exportKw: 12.2,
    revenue: '----',
  },
  carbon: {
    todayKg: 4.2,
    cumulativeKg: 1240,
    points: [
      { id: 'jul27', labelKey: 'solarDashboard.carbon.date.jul27', valueKg: 3.1 },
      { id: 'jul28', labelKey: 'solarDashboard.carbon.date.jul28', valueKg: 2.4 },
      { id: 'jul29', labelKey: 'solarDashboard.carbon.date.jul29', valueKg: 2.8 },
      { id: 'jul30', labelKey: 'solarDashboard.carbon.date.jul30', valueKg: 4.0 },
      { id: 'jul31', labelKey: 'solarDashboard.carbon.date.jul31', valueKg: 2.4 },
      { id: 'aug1', labelKey: 'solarDashboard.carbon.date.aug1', valueKg: 4.6 },
      { id: 'aug2', labelKey: 'solarDashboard.carbon.date.aug2', valueKg: 4.2 },
    ],
  },
};

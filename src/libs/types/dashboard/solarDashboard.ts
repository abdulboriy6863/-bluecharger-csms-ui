export interface SolarDashboardFlowMetrics {
  pvKwh: number;
  gridKwh: number;
  loadKwh: number;
  batteryKwh: number;
}

export interface SolarDashboardWeather {
  temperatureC: number;
  plantNameKey: string;
  conditionKey: string;
}

export interface SolarDashboardKpi {
  batterySocPercent: number;
  selfConsumptionPercent: number;
  pvPowerKw: number;
  loadPowerKw: number;
}

export interface SolarDashboardPowerSummary {
  importKw: number;
  exportKw: number;
  revenue: string;
}

export interface SolarCarbonPoint {
  id: string;
  labelKey: string;
  valueKg: number;
}

export interface SolarDashboardData {
  titleKey: string;
  subtitleKey: string;
  weather: SolarDashboardWeather;
  flow: SolarDashboardFlowMetrics;
  kpi: SolarDashboardKpi;
  power: SolarDashboardPowerSummary;
  carbon: {
    todayKg: number;
    cumulativeKg: number;
    points: SolarCarbonPoint[];
  };
}

export interface SolarDashboardPageCardProps {
  data: SolarDashboardData;
}

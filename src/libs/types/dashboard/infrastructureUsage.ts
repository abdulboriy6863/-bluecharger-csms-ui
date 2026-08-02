export type InfrastructureDistributionMode = 'chargerType' | 'modelName';

export interface InfrastructureDistributionSeries {
  id: string;
  labelKey: string;
  color: string;
}

export interface InfrastructureDistributionRegion {
  id: string;
  labelKey: string;
  values: Record<string, number>;
}

export interface InfrastructureDistributionPanel {
  mode: InfrastructureDistributionMode;
  titleKey: string;
  descriptionKey: string;
  yAxisLabelKey: string;
  series: InfrastructureDistributionSeries[];
  regions: InfrastructureDistributionRegion[];
}

export interface InfrastructureUsageTrendPoint {
  id: string;
  labelKey: string;
  fastEnergyKwh: number;
  slowEnergyKwh: number;
  totalEnergyKwh: number;
  fastChargerCount: number;
  slowChargerCount: number;
}

export interface InfrastructureUsageTrend {
  titleKey: string;
  descriptionKey: string;
  leftAxisLabelKey: string;
  rightAxisLabelKey: string;
  points: InfrastructureUsageTrendPoint[];
}

export interface InfrastructureUsageData {
  distributionPanels: Record<InfrastructureDistributionMode, InfrastructureDistributionPanel>;
  usageTrend: InfrastructureUsageTrend;
}

export interface InfrastructureDistributionChartRow extends Record<string, string | number> {
  id: string;
  name: string;
  total: number;
}

export interface InfrastructureUsageChartPoint extends InfrastructureUsageTrendPoint {
  name: string;
}

export interface InfrastructurePrismaticBarProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
}

export interface InfrastructureUsageSectionCardProps {
  data: InfrastructureUsageData;
}

export interface InfrastructureChartMenuProps {
  open: boolean;
  onDownloadCsv: () => void;
}

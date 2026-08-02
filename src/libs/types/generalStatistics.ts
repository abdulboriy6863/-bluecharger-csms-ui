import type { ReactNode } from 'react';

export type GeneralStatisticTrendDirection = 'up' | 'down' | 'flat';
export type GeneralStatisticTrendTone = 'danger' | 'info' | 'neutral';
export type GeneralStatisticPalette = 'peach' | 'sky' | 'mint' | 'violet';

export interface GeneralStatisticTrend {
  direction: GeneralStatisticTrendDirection;
  value: string;
  tone?: GeneralStatisticTrendTone;
}

export interface GeneralStatisticMetric {
  label?: string;
  value: string | number;
  unit?: string;
  trend?: GeneralStatisticTrend;
  trailing?: string;
}

export interface GeneralStatisticsCardProps {
  title: string;
  subTitle?: string;
  icon: ReactNode;
  metrics: GeneralStatisticMetric[];
  size?: 'standard' | 'wide';
  palette?: GeneralStatisticPalette;
}

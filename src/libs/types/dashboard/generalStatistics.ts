import type { ReactNode } from 'react';

export type GeneralStatisticTrendDirection = 'up' | 'down' | 'flat';
export type GeneralStatisticTrendTone = 'danger' | 'info' | 'neutral' | 'success';
export type GeneralStatisticAccentTone = 'blue' | 'red' | 'navy';

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
  topLabel: string;
  watermarkIcon?: ReactNode;
  accentTone?: GeneralStatisticAccentTone;
  metrics?: GeneralStatisticMetric[];
  children?: ReactNode;
}

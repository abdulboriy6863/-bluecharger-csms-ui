import React from 'react';
import styles from '../../../scss/systemHome/GeneralStatisticsSection.module.scss';
import clsx from 'clsx';

export type GeneralStatisticTrend = {
  direction: 'up' | 'down' | 'flat';
  value: string;
  tone?: 'danger' | 'info' | 'neutral';
};

export type GeneralStatisticMetric = {
  label?: string;
  value: string | number;
  unit?: string;
  trend?: GeneralStatisticTrend;
  trailing?: string;
};

interface GeneralStatisticsCardProps {
  title: string;
  subTitle?: string;
  icon: React.ReactNode;
  metrics: GeneralStatisticMetric[];
  size?: 'standard' | 'wide';
}

export const GeneralStatisticsCard: React.FC<GeneralStatisticsCardProps> = ({
  title,
  subTitle,
  icon,
  metrics,
  size = 'standard',
}) => {
  return (
    <article className={clsx(styles.statCard, size === 'wide' && styles.wideCard)}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitleGroup}>
          <h3 className={styles.title}>{title}</h3>
          {subTitle && <span className={styles.subTitle}>{subTitle}</span>}
        </div>
        <div className={styles.cardIcon}>{icon}</div>
      </div>
      <div className={styles.cardBody}>
        {metrics.map((metric, index) => (
          <div className={styles.metricRow} key={`${title}-${index}`}>
            {metric.label && <span className={styles.metricLabel}>{metric.label}</span>}
            <span className={styles.metricValue}>{metric.value}</span>
            {metric.unit && <span className={styles.metricUnit}>{metric.unit}</span>}
            {metric.trend && (
              <span className={clsx(styles.trendBadge, styles[metric.trend.tone ?? 'neutral'])}>
                {metric.trend.direction === 'up' && '▲'}
                {metric.trend.direction === 'down' && '▼'}
                {metric.trend.direction === 'flat' && '-'}
                {metric.trend.direction !== 'flat' && <span>{metric.trend.value}</span>}
              </span>
            )}
            {metric.trailing && <span className={styles.metricTrailing}>{metric.trailing}</span>}
          </div>
        ))}
      </div>
    </article>
  );
};

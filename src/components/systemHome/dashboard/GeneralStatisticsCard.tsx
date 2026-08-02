import React from 'react';
import styles from '../../../scss/systemHome/GeneralStatisticsSection.module.scss';
import clsx from 'clsx';
import type { GeneralStatisticsCardProps } from '../../../libs/types/dashboard/generalStatistics';

export const GeneralStatisticsCard: React.FC<GeneralStatisticsCardProps> = ({
  topLabel,
  watermarkIcon,
  accentTone = 'blue',
  metrics,
  children,
}) => {
  return (
    <article className={clsx(styles.statCard, styles[accentTone])}>
      {watermarkIcon && <div className={styles.watermarkWrapper}>{watermarkIcon}</div>}

      <div className={styles.topLabelRow}>
        <span className={styles.topLabel}>{topLabel}</span>
      </div>

      <div className={styles.cardContent}>
        {children ? (
          children
        ) : (
          metrics?.map((metric, index) => (
            <div className={styles.metricRow} key={`${topLabel}-${index}`}>
              {metric.label && <span className={styles.metricLabel}>{metric.label}</span>}
              <div className={styles.metricValueGroup}>
                <span className={styles.metricValue}>{metric.value}</span>
                {metric.unit && <span className={styles.metricUnit}>{metric.unit}</span>}
                {metric.trend && (
                  <span className={clsx(styles.trendBadge, styles[metric.trend.tone ?? 'neutral'])}>
                    {metric.trend.direction === 'up' && '↗ '}
                    {metric.trend.direction === 'down' && '↘ '}
                    <span>{metric.trend.value}</span>
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </article>
  );
};

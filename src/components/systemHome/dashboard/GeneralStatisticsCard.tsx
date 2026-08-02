import React from 'react';
import styles from '../../../scss/systemHome/GeneralStatisticsSection.module.scss';
import clsx from 'clsx';
import type { GeneralStatisticsCardProps } from '../../../libs/types/dashboard/generalStatistics';

export const GeneralStatisticsCard: React.FC<GeneralStatisticsCardProps> = ({
  title,
  subTitle,
  icon,
  metrics,
  size = 'standard',
  palette = 'sky',
}) => {
  return (
    <article className={clsx(styles.statCard, styles[palette], size === 'wide' && styles.wideCard)}>
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

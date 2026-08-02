import React from 'react';
import styles from '../../scss/systemHome/StatusDistribution.module.scss';
import { useI18n } from '../../i18n/I18nContext';
import type { StatusDistributionProps } from '../../libs/types/overview';

export const StatusDistribution: React.FC<StatusDistributionProps> = ({ data }) => {
  const { t } = useI18n();
  const total = data.reduce((acc, curr) => acc + curr.count, 0);
  const statusKeys: Record<string, string> = {
    Available: 'monitoring.available', Charging: 'monitoring.charging', Reserved: 'monitoring.reserved',
    Faulted: 'monitoring.faulted', Offline: 'monitoring.offline',
  };

  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        {data.map((item, idx) => {
          const percent = ((item.count / total) * 100).toFixed(1);
          return (
            <div
              key={idx}
              className={styles.segment}
              style={{ width: `${percent}%`, backgroundColor: item.color }}
              title={`${t(statusKeys[item.name] || item.name)}: ${item.count} (${percent}%)`}
            />
          );
        })}
      </div>

      <div className={styles.legendList}>
        {data.map((item, idx) => {
          const percent = ((item.count / total) * 100).toFixed(1);
          return (
            <div key={idx} className={styles.legendItem}>
              <div className={styles.left}>
                <span className={styles.dot} style={{ backgroundColor: item.color }} />
                <span className={styles.name}>{t(statusKeys[item.name] || item.name)}</span>
              </div>
              <div className={styles.right}>
                <span className={styles.count}>{item.count}</span>
                <span className={styles.percent}>{percent}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

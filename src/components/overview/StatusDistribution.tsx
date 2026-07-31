import React from 'react';
import styles from './StatusDistribution.module.scss';
import { StatusDistributionPoint } from '../../types/dashboard';

interface StatusDistributionProps {
  data: StatusDistributionPoint[];
}

export const StatusDistribution: React.FC<StatusDistributionProps> = ({ data }) => {
  const total = data.reduce((acc, curr) => acc + curr.count, 0);

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
              title={`${item.name}: ${item.count} (${percent}%)`}
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
                <span className={styles.name}>{item.name}</span>
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

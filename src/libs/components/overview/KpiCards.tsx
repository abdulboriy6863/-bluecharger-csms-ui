import React from 'react';
import styles from '../../../scss/systemHome/KpiCards.module.scss';
import { Zap, Activity, TrendingUp, ShieldCheck, DollarSign, ArrowUpRight } from 'lucide-react';
import type { KpiCardsProps } from '../../types/overview/overview';

export const KpiCards: React.FC<KpiCardsProps> = ({ metrics }) => {
  const getIcon = (index: number) => {
    switch (index) {
      case 0: return <Zap size={18} />;
      case 1: return <Activity size={18} />;
      case 2: return <TrendingUp size={18} />;
      case 3: return <ShieldCheck size={18} />;
      case 4: return <DollarSign size={18} />;
      default: return <Zap size={18} />;
    }
  };

  return (
    <div className={styles.grid}>
      {metrics.map((kpi, idx) => (
        <div key={idx} className={styles.kpiCard}>
          <div className={styles.header}>
            <span className={styles.title}>{kpi.title}</span>
            <div className={styles.iconBox}>{getIcon(idx)}</div>
          </div>
          <div className={styles.valueGroup}>
            <span className={styles.value}>{kpi.value}</span>
            {kpi.unit && <span className={styles.unit}>{kpi.unit}</span>}
          </div>
          <div className={styles.footer}>
            {kpi.changePercent !== undefined && (
              <span className={`${styles.changeBadge} ${styles[kpi.changeType || 'positive']}`}>
                <ArrowUpRight size={14} />
                +{kpi.changePercent}%
              </span>
            )}
            {kpi.description && (
              <span className={styles.description}>{kpi.description}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

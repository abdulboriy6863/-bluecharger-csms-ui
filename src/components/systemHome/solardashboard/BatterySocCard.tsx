import React from 'react';
import { Zap } from 'lucide-react';
import styles from '../../../scss/systemHome/BatterySocCard.module.scss';
import { useI18n } from '../../../i18n/I18nContext';

interface BatterySocCardProps {
  percentage: number;
}

export const BatterySocCard: React.FC<BatterySocCardProps> = ({ percentage }) => {
  const { t } = useI18n();

  // SVG ring settings
  const radius = 50;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <section className={styles.kpiCard}>
      <div className={styles.gaugeContainer}>
        <svg className={styles.svgRing} viewBox="0 0 100 100">
          <defs>
            <linearGradient id="batteryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
          {/* Background circle */}
          <circle
            className={styles.circleBackground}
            cx="50"
            cy="50"
            r={normalizedRadius}
          />
          {/* Progress circle */}
          <circle
            className={styles.circleProgress}
            cx="50"
            cy="50"
            r={normalizedRadius}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className={styles.centerValue}>
          <span className={styles.percent}>{percentage}%</span>
          <Zap size={18} className={styles.icon} fill="currentColor" />
        </div>
      </div>
      <h2 className={styles.title}>{t('solarDashboard.kpi.batterySoc')}</h2>
    </section>
  );
};

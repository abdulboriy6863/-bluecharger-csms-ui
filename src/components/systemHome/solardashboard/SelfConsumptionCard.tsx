import React from 'react';
import styles from '../../../scss/systemHome/SelfConsumptionCard.module.scss';
import { useI18n } from '../../../i18n/I18nContext';

interface SelfConsumptionCardProps {
  percentage: number;
  pvPowerKw: number;
  loadPowerKw: number;
}

const format = (value: number, digits = 2) => value.toFixed(digits);

export const SelfConsumptionCard: React.FC<SelfConsumptionCardProps> = ({
  percentage,
  pvPowerKw,
  loadPowerKw,
}) => {
  const { t } = useI18n();

  // SVG ring settings
  const radius = 50;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <section className={styles.kpiCard}>
      {/* Gauge column */}
      <div className={styles.gaugeContainer}>
        <svg className={styles.svgRing} viewBox="0 0 100 100">
          <defs>
            <linearGradient id="selfConsumeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <circle
            className={styles.circleBackground}
            cx="50"
            cy="50"
            r={normalizedRadius}
          />
          <circle
            className={styles.circleProgress}
            cx="50"
            cy="50"
            r={normalizedRadius}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <span className={styles.centerValue}>{percentage}%</span>
      </div>

      {/* Details column */}
      <div className={styles.detailsWrapper}>
        <h2 className={styles.title}>{t('solarDashboard.kpi.selfConsumption')}</h2>
        <ul className={styles.metricsList}>
          <li className={styles.metricItem}>
            <span className={styles.label}>{t('solarDashboard.kpi.pvPower')}</span>
            <div className={styles.valueGroup}>
              <span className={styles.value}>{format(pvPowerKw)}</span>
              <span className={styles.unit}>kW</span>
            </div>
          </li>
          <li className={styles.metricItem}>
            <span className={styles.label}>{t('solarDashboard.kpi.loadPower')}</span>
            <div className={styles.valueGroup}>
              <span className={styles.value}>{format(loadPowerKw)}</span>
              <span className={styles.unit}>kW</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

import React from 'react';
import { Leaf } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styles from '../../../scss/systemHome/CarbonReductionCard.module.scss';
import { useI18n } from '../../../i18n/I18nContext';
import type { SolarCarbonPoint } from '../../../libs/types/dashboard/solarDashboard';

interface CarbonReductionCardProps {
  todayKg: number;
  cumulativeKg: number;
  points: SolarCarbonPoint[];
}

const format = (value: number, digits = 1) => value.toFixed(digits);

export const CarbonReductionCard: React.FC<CarbonReductionCardProps> = ({
  todayKg,
  cumulativeKg,
  points,
}) => {
  const { t } = useI18n();

  const chartData = points.map((point) => ({
    name: t(point.labelKey),
    value: point.valueKg,
  }));

  return (
    <section className={styles.carbonCard}>
      {/* Card Header */}
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <Leaf size={20} className={styles.icon} fill="currentColor" />
          <h2>{t('solarDashboard.carbon.title')}</h2>
        </div>
        <div className={styles.statsGroup}>
          {/* Today Stat */}
          <div className={styles.statItem}>
            <span className={`${styles.bullet} ${styles.todayBullet}`} />
            <div className={styles.details}>
              <span className={styles.label}>{t('solarDashboard.carbon.today')}</span>
              <span className={styles.value}>{format(todayKg)} kg</span>
            </div>
          </div>
          {/* Cumulative Stat */}
          <div className={styles.statItem}>
            <span className={`${styles.bullet} ${styles.totalBullet}`} />
            <div className={styles.details}>
              <span className={styles.label}>{t('solarDashboard.carbon.cumulative')}</span>
              <span className={styles.value}>{cumulativeKg.toLocaleString()} kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 5, left: -24, bottom: 5 }}>
            <defs>
              <linearGradient id="carbonBarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--border-color, #edf2f7)" strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--text-muted, #7f93b2)', fontSize: 11 }}
              dy={8}
            />
            <YAxis hide domain={[0, 'dataMax + 1']} />
            <Tooltip
              contentStyle={{
                border: '1px solid var(--border-color, #e2e8f0)',
                borderRadius: 8,
                background: 'var(--bg-secondary, #ffffff)',
                color: 'var(--text-primary, #2E56A6)',
                boxShadow: '0 4px 12px rgba(46, 86, 166, 0.08)',
              }}
              cursor={{ fill: 'var(--neutral-light, rgba(0,0,0,0.02))' }}
              formatter={(value: number) => [`${value} kg`, t('solarDashboard.carbon.title')]}
            />
            <Bar
              dataKey="value"
              fill="url(#carbonBarGrad)"
              radius={[6, 6, 0, 0]}
              maxBarSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

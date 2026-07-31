import React from 'react';
import { Sun, Zap, BatteryCharging, TrendingUp } from 'lucide-react';
import { Card } from '../../../components/common/Card/Card';
import { useI18n } from '../../../i18n/I18nContext';
import styles from './SolarDashboardPage.module.scss';

const solarMetrics = [
  { value: '2.84 MW', label: 'Current solar output', icon: Sun, tone: 'amber' },
  { value: '18.6 MWh', label: 'Generated today', icon: Zap, tone: 'blue' },
  { value: '74%', label: 'Solar contribution', icon: BatteryCharging, tone: 'green' },
  { value: '+12.8%', label: 'Month-over-month', icon: TrendingUp, tone: 'violet' },
];

export const SolarDashboardPage: React.FC = () => {
  const { t } = useI18n();
  return (
    <section className={styles.page}>
      <div className={styles.header}><div><p className={styles.eyebrow}>SYSTEM HOME / ENERGY</p><h1>{t('home.solar')}</h1><p className={styles.subtitle}>Monitor solar generation and its contribution to charging operations.</p></div><span className={styles.liveState}><span /> Live data</span></div>
      <div className={styles.metricGrid}>{solarMetrics.map((metric) => { const Icon = metric.icon; return <div className={styles.metricCard} key={metric.label}><div className={`${styles.iconBox} ${styles[metric.tone]}`}><Icon size={18} /></div><strong>{metric.value}</strong><span>{metric.label}</span></div>; })}</div>
      <div className={styles.contentGrid}>
        <Card title="Solar generation profile" subtitle="Energy generated across the network today"><div className={styles.chartPlaceholder}><div className={styles.chartLine} /><div className={styles.chartAxis}><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span></div></div></Card>
        <Card title="Source allocation" subtitle="How current charging demand is supplied"><div className={styles.allocationList}><div><span><i className={styles.solarDot} /> Solar</span><strong>74%</strong></div><div><span><i className={styles.gridDot} /> Grid</span><strong>21%</strong></div><div><span><i className={styles.storageDot} /> Storage</span><strong>5%</strong></div></div></Card>
      </div>
    </section>
  );
};

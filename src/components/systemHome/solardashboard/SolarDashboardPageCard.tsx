import React from 'react';
import { BatteryCharging, CloudSun, Leaf, Sun, Zap } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styles from '../../../scss/systemHome/SolarDashboardPageCard.module.scss';
import { useI18n } from '../../../i18n/I18nContext';
import type { SolarDashboardPageCardProps } from '../../../libs/types/dashboard/solarDashboard';

const format = (value: number, digits = 2) => value.toFixed(digits);

export const SolarDashboardPageCard: React.FC<SolarDashboardPageCardProps> = ({ data }) => {
  const { t } = useI18n();
  const { flow, kpi, power, carbon, weather } = data;
  const chartData = carbon.points.map((point) => ({
    name: t(point.labelKey),
    value: point.valueKg,
  }));

  return (
    <article className={styles.dashboard}>
      <header className={styles.dashboardHeader}>
        <div>
          <h1>{t(data.titleKey)}</h1>
          <p>{t(data.subtitleKey)}</p>
        </div>
        <div className={styles.liveBadge}><span /> {t('solarDashboard.live')}</div>
      </header>

      <div className={styles.dashboardGrid}>
        <section className={styles.flowCard} aria-label={t('solarDashboard.flow.aria')}>
          <div className={styles.weather}>
            <CloudSun size={28} strokeWidth={1.8} aria-hidden="true" />
            <strong>{weather.temperatureC}°C</strong>
            <span>{t(weather.plantNameKey)}</span>
          </div>

          <div className={styles.flowCanvas}>
            <div className={`${styles.flowNode} ${styles.sunNode}`}>
              <Sun size={34} strokeWidth={1.8} aria-hidden="true" />
            </div>
            <div className={`${styles.flowConnector} ${styles.sunToPv}`} />
            <div className={`${styles.flowMetric} ${styles.pvMetric}`}>
              <span>{t('solarDashboard.flow.pv')}</span>
              <strong>{format(flow.pvKwh)} <small>kWh</small></strong>
            </div>

            <div className={styles.solarPanel} aria-label={t('solarDashboard.flow.pv')}>
              <div className={styles.panelCells} />
            </div>

            <div className={`${styles.flowConnector} ${styles.pvToGrid}`} />
            <div className={`${styles.flowNode} ${styles.gridNode}`}>
              <Zap size={30} strokeWidth={1.8} aria-hidden="true" />
            </div>
            <div className={`${styles.flowMetric} ${styles.gridMetric}`}>
              <span>{t('solarDashboard.flow.grid')}</span>
              <strong>{format(flow.gridKwh)} <small>kWh</small></strong>
            </div>

            <div className={`${styles.flowConnector} ${styles.pvToBattery}`} />
            <div className={`${styles.flowNode} ${styles.batteryNode}`}>
              <BatteryCharging size={27} strokeWidth={1.8} aria-hidden="true" />
            </div>
            <div className={`${styles.flowMetric} ${styles.batteryMetric}`}>
              <span>{t('solarDashboard.flow.battery')}</span>
              <strong>{format(flow.batteryKwh)} <small>kWh</small></strong>
            </div>

            <div className={`${styles.flowConnector} ${styles.batteryToLoad}`} />
            <div className={`${styles.flowMetric} ${styles.loadMetric}`}>
              <span>{t('solarDashboard.flow.load')}</span>
              <strong>{format(flow.loadKwh)} <small>kWh</small></strong>
            </div>
          </div>
        </section>

        <div className={styles.mainColumn}>
          <div className={styles.kpiGrid}>
            <section className={styles.kpiCard}>
              <div className={styles.progressRing} style={{ '--progress': `${kpi.batterySocPercent * 3.6}deg` } as React.CSSProperties}>
                <div><strong>{kpi.batterySocPercent}%</strong><Zap size={20} aria-hidden="true" /></div>
              </div>
              <h2>{t('solarDashboard.kpi.batterySoc')}</h2>
            </section>
            <section className={`${styles.kpiCard} ${styles.consumptionCard}`}>
              <div className={`${styles.progressRing} ${styles.mutedRing}`} style={{ '--progress': `${kpi.selfConsumptionPercent * 3.6}deg` } as React.CSSProperties}>
                <div><strong>{kpi.selfConsumptionPercent}%</strong></div>
              </div>
              <div className={styles.consumptionDetails}>
                <h2>{t('solarDashboard.kpi.selfConsumption')}</h2>
                <dl>
                  <div><dt>{t('solarDashboard.kpi.pvPower')}</dt><dd>{format(kpi.pvPowerKw)} <small>kW</small></dd></div>
                  <div><dt>{t('solarDashboard.kpi.loadPower')}</dt><dd>{format(kpi.loadPowerKw)} <small>kW</small></dd></div>
                </dl>
              </div>
            </section>
          </div>

          <section className={styles.powerCard}>
            <div><span className={styles.importDot} /> <span>{t('solarDashboard.power.import')}</span><strong>{format(power.importKw, 1)} <small>kW</small></strong></div>
            <div><span className={styles.exportDot} /> <span>{t('solarDashboard.power.export')}</span><strong>{format(power.exportKw, 1)} <small>kW</small></strong></div>
            <div><span className={styles.revenueIcon}>$</span> <span>{t('solarDashboard.power.revenue')}</span><strong>{power.revenue}</strong></div>
          </section>

          <section className={styles.carbonCard}>
            <div className={styles.carbonHeader}>
              <h2><Leaf size={19} aria-hidden="true" /> {t('solarDashboard.carbon.title')}</h2>
              <div className={styles.carbonStats}>
                <div><span className={styles.todayDot} /> <small>{t('solarDashboard.carbon.today')}</small><strong>{format(carbon.todayKg, 1)} kg</strong></div>
                <div><span className={styles.totalDot} /> <small>{t('solarDashboard.carbon.cumulative')}</small><strong>{carbon.cumulativeKg} kg</strong></div>
              </div>
            </div>
            <div className={styles.chartWrap}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 12, right: 2, left: -24, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#edf2f7" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#7f93b2', fontSize: 11 }} dy={8} />
                  <YAxis hide domain={[0, 5]} />
                  <Tooltip cursor={{ fill: '#f4f8fc' }} formatter={(value: number) => [`${value} kg`, t('solarDashboard.carbon.title')]} />
                  <Bar dataKey="value" fill="#cbd7e5" radius={[4, 4, 0, 0]} maxBarSize={13} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
};

import React, { useMemo, useState } from 'react';
import {
  Bar as ReBar,
  BarChart as ReBarChart,
  CartesianGrid as ReCartesianGrid,
  ComposedChart as ReComposedChart,
  Legend as ReLegend,
  Line as ReLine,
  ResponsiveContainer as ReResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis as ReXAxis,
  YAxis as ReYAxis,
} from 'recharts';
import styles from '../../../scss/systemHome/DashboardSections.module.scss';
import { useI18n } from '../../../i18n/I18nContext';
import type {
  InfrastructureDistributionMode,
  InfrastructureUsageSectionCardProps,
} from '../../../libs/types/dashboard/infrastructureUsage';

export const InfrastructureUsageSectionCard: React.FC<InfrastructureUsageSectionCardProps> = ({
  data,
}) => {
  const { t } = useI18n();
  const [activeMode, setActiveMode] = useState<InfrastructureDistributionMode>('chargerType');

  const distributionPanel = data.distributionPanels[activeMode];
  const modeOptions: InfrastructureDistributionMode[] = ['chargerType', 'modelName'];

  // All 18 regions processed and sorted cleanly for horizontal bar presentation
  const allRegions = useMemo(() => {
    return distributionPanel.regions
      .map((region) => {
        const total = distributionPanel.series.reduce(
          (sum, series) => sum + (region.values[series.id] ?? 0),
          0,
        );
        return {
          id: region.id,
          name: t(region.labelKey),
          total,
          values: region.values,
        };
      })
      .sort((a, b) => b.total - a.total);
  }, [distributionPanel, t]);

  const maxTotal = useMemo(() => Math.max(...allRegions.map((r) => r.total), 1), [allRegions]);

  // Recharts data for right card (Energy Usage Trend)
  const usageChartData = useMemo(() => data.usageTrend.points.map((point) => ({
    ...point,
    name: t(point.labelKey),
  })), [data.usageTrend.points, t]);

  const usageTotalEnergy = data.usageTrend.points.reduce((sum, point) => sum + point.totalEnergyKwh, 0);
  const usagePeak = data.usageTrend.points.reduce(
    (peak, point) => (point.totalEnergyKwh > peak.totalEnergyKwh ? point : peak),
    data.usageTrend.points[0],
  );

  return (
    <div className={styles.infrastructureUsageGrid}>
      {/* Left Card: Regional Infrastructure (Horizontal Bars for ALL Cities & Models) */}
      <article className={styles.infrastructureCard}>
        <header className={styles.infrastructureHeader}>
          <div className={styles.infrastructureTitleGroup}>
            <h3>{t(distributionPanel.titleKey)}</h3>
            <p>{t(distributionPanel.descriptionKey)}</p>
          </div>
          <div className={styles.typeModelSwitcher}>
            {modeOptions.map((mode) => (
              <button
                key={mode}
                type="button"
                className={`${styles.switcherBtn} ${activeMode === mode ? styles.activeSwitcherBtn : ''}`}
                onClick={() => setActiveMode(mode)}
              >
                {t(`dashboard.infrastructure.mode.${mode}`)}
              </button>
            ))}
          </div>
        </header>

        {/* Scrollable Container showing ALL Cities/Regions */}
        <div className={styles.scrollableRegionsBody}>
          {allRegions.map((region) => (
            <div key={region.id} className={styles.regionRow}>
              <div className={styles.regionHeader}>
                <span className={styles.regionName}>{region.name}</span>
                <span className={styles.regionTotal}>{region.total.toLocaleString()}</span>
              </div>
              <div className={styles.progressTrack}>
                {distributionPanel.series.map((series) => {
                  const val = region.values[series.id] ?? 0;
                  if (val <= 0) return null;
                  const pct = (val / maxTotal) * 100;
                  return (
                    <div
                      key={series.id}
                      className={styles.barSegment}
                      style={{
                        width: `${pct}%`,
                        backgroundColor: series.color,
                      }}
                      title={`${t(series.labelKey)}: ${val.toLocaleString()}`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Legend for selected Mode (Charger Type vs Model Name) */}
        <div className={styles.regionalLegendRow}>
          {distributionPanel.series.map((series) => (
            <span key={series.id} className={styles.legendDotItem}>
              <i style={{ backgroundColor: series.color }} />
              {t(series.labelKey)}
            </span>
          ))}
        </div>
      </article>

      {/* Right Card: Original Energy Usage Trend (Untouched) */}
      <article className={styles.infrastructureCard}>
        <header className={styles.infrastructureHeader}>
          <div className={styles.infrastructureTitleGroup}>
            <h3>{t(data.usageTrend.titleKey)}</h3>
            <p>{t(data.usageTrend.descriptionKey)}</p>
          </div>
          <div className={styles.trendPillGroup}>
            <span className={styles.peakDayPill}>
              {t('dashboard.infrastructure.summary.peak')}: <strong>{t(usagePeak.labelKey)}</strong>
            </span>
            <span className={styles.totalKwhPill}>
              {t('dashboard.infrastructure.summary.totalEnergy')}: <strong>{usageTotalEnergy.toLocaleString()} kWh</strong>
            </span>
          </div>
        </header>

        <div className={styles.trendChartBody}>
          <ReResponsiveContainer width="100%" height={290}>
            <ReComposedChart data={usageChartData} margin={{ top: 16, right: 16, left: -12, bottom: 4 }}>
              <ReCartesianGrid stroke="var(--border-color, #e0e0e0)" strokeDasharray="3 5" vertical={false} />
              <ReXAxis
                dataKey="name"
                tick={{ fill: 'var(--text-muted, #7A91BF)', fontSize: 11, fontWeight: 700 }}
                tickLine={false}
                axisLine={{ stroke: 'var(--border-color, #e0e0e0)' }}
              />
              <ReYAxis
                yAxisId="chargers"
                tick={{ fill: 'var(--text-muted, #7A91BF)', fontSize: 11, fontWeight: 700 }}
                tickFormatter={(value) => Number(value).toLocaleString()}
                axisLine={false}
                tickLine={false}
              />
              <ReYAxis
                yAxisId="energy"
                orientation="right"
                tick={{ fill: 'var(--text-muted, #7A91BF)', fontSize: 11, fontWeight: 700 }}
                tickFormatter={(value) => `${Math.round(Number(value) / 1000)}k`}
                axisLine={false}
                tickLine={false}
              />
              <ReTooltip
                cursor={{ fill: 'rgba(46, 86, 166, 0.04)' }}
                contentStyle={{
                  backgroundColor: 'var(--bg-secondary, #ffffff)',
                  border: '1px solid var(--border-color, #e0e0e0)',
                  borderRadius: 8,
                  boxShadow: '0 8px 20px var(--shadow, rgba(46, 86, 166, 0.12))',
                  fontWeight: 700,
                  fontSize: 12,
                  color: 'var(--text-primary, #2E56A6)',
                }}
              />
              <ReLegend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary, #416CA6)' }} />
              <ReBar yAxisId="energy" dataKey="fastEnergyKwh" name={t('dashboard.infrastructure.metric.fastEnergy')} fill="#2F80ED" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <ReBar yAxisId="energy" dataKey="slowEnergyKwh" name={t('dashboard.infrastructure.metric.slowEnergy')} fill="#00BFA6" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <ReBar yAxisId="energy" dataKey="totalEnergyKwh" name={t('dashboard.infrastructure.metric.totalEnergy')} fill="#8B5CF6" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <ReLine yAxisId="chargers" type="monotone" dataKey="fastChargerCount" name={t('dashboard.infrastructure.metric.fastChargers')} stroke="#F43F5E" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <ReLine yAxisId="chargers" type="monotone" dataKey="slowChargerCount" name={t('dashboard.infrastructure.metric.slowChargers')} stroke="#F2B84B" strokeWidth={2.5} strokeDasharray="6 5" dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </ReComposedChart>
          </ReResponsiveContainer>
        </div>
      </article>
    </div>
  );
};

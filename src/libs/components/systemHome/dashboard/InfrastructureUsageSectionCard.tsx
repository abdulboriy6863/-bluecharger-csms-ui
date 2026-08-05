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
import styles from '../../../../scss/systemHome/DashboardSections.module.scss';
import { useI18n } from '../../../../i18n/I18nContext';
import type {
  InfrastructureDistributionMode,
  InfrastructureUsageSectionCardProps,
} from '../../../types/dashboard/infrastructureUsage';

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

  const totalEnergyKwh = useMemo(
    () => data.usageTrend.points.reduce((sum, point) => sum + point.totalEnergyKwh, 0),
    [data.usageTrend.points],
  );

  // Keep the existing chart scale while sourcing labels and values from the six reference periods.
  const usageTrendData = useMemo(() => {
    return data.usageTrend.points.slice(0, 6).map((point) => ({
      day: t(point.labelKey),
      fastKwh: Math.round(point.fastEnergyKwh / 100),
      slowKwh: Math.round(point.slowEnergyKwh / 100),
      activeCounts: Math.round((point.fastChargerCount + point.slowChargerCount) / 3),
    }));
  }, [data.usageTrend.points, t]);

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

      {/* Right Card: Energy Consumption Trend */}
      <article className={styles.infrastructureCard}>
        <header className={styles.infrastructureHeader}>
          <div className={styles.infrastructureTitleGroup}>
            <h3>{t(data.usageTrend.titleKey)}</h3>
            <p>{t(data.usageTrend.descriptionKey)}</p>
          </div>
          <div className={styles.trendPillGroup}>
            <span className={styles.peakDayPill}>
              {t('dashboard.infrastructure.summary.peak')}
            </span>
            <span className={styles.totalKwhPill}>
              {t('dashboard.infrastructure.summary.totalEnergy')}: <strong>{totalEnergyKwh.toLocaleString(undefined, { maximumFractionDigits: 2 })} kWh</strong>
            </span>
          </div>
        </header>

        <div className={styles.trendChartBody}>
          <ReResponsiveContainer width="100%" height={260}>
            <ReComposedChart data={usageTrendData} margin={{ top: 16, right: 12, left: -24, bottom: 4 }}>
              <ReCartesianGrid stroke="#f1f5f9" vertical={false} />
              <ReXAxis
                dataKey="day"
                tick={{ fill: '#7A91BF', fontSize: 11, fontWeight: 700 }}
                tickLine={false}
                axisLine={false}
              />
              <ReYAxis hide />
              <ReTooltip
                cursor={{ fill: 'rgba(46, 86, 166, 0.04)' }}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0e0',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#2E56A6',
                }}
              />
              <ReBar dataKey="fastKwh" name={t('dashboard.infrastructure.metric.fastEnergy')} fill="#93C5FD" radius={[4, 4, 0, 0]} maxBarSize={24} />
              <ReBar dataKey="slowKwh" name={t('dashboard.infrastructure.metric.slowEnergy')} fill="#2E56A6" radius={[4, 4, 0, 0]} maxBarSize={24} />
              <ReLine
                type="monotone"
                dataKey="activeCounts"
                name={t('dashboard.infrastructure.metric.fastChargers')}
                stroke="#2E56A6"
                strokeWidth={2.5}
                strokeDasharray="4 4"
                dot={{ r: 4, fill: '#2E56A6' }}
              />
            </ReComposedChart>
          </ReResponsiveContainer>
        </div>

        <div className={styles.trendFooterRow}>
          <div className={styles.trendLegendLeft}>
            <span className={styles.legendSquareItem}>
              <i className={styles.lightSquare} /> {t('dashboard.infrastructure.metric.fastEnergy')}
            </span>
            <span className={styles.legendSquareItem}>
              <i className={styles.darkSquare} /> {t('dashboard.infrastructure.metric.slowEnergy')}
            </span>
            <span className={styles.legendLineItem}>
              <i className={styles.dashedLine} /> {t('dashboard.infrastructure.metric.fastChargers')}
            </span>
          </div>
          <span className={styles.updatedTimeText}>{t('dashboard.infrastructure.summary.peak')}</span>
        </div>
      </article>
    </div>
  );
};

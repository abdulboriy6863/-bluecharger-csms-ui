import React, { useMemo, useState } from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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

  // Filter top regions for clean density presentation matching screenshot
  const distributionPanel = data.distributionPanels[activeMode];
  const topRegions = useMemo(() => {
    return distributionPanel.regions
      .map((region) => {
        const slow = region.values.slow ?? region.values.model7kw ?? 0;
        const fast = (region.values.fast ?? 0) + (region.values.fastBus ?? 0) + (region.values.model40kw ?? 0) + (region.values.model100kwDual ?? 0);
        const total = slow + fast;
        return {
          id: region.id,
          name: t(region.labelKey).split(' ')[0], // short name e.g. Seoul, Gyeonggi
          slow,
          fast,
          total,
        };
      })
      .filter((r) => r.total > 0)
      .sort((a, b) => b.total - a.total)
      .slice(0, 4); // Top 4 key regions matching Stitch screenshot
  }, [distributionPanel, t]);

  const maxRegionTotal = useMemo(() => {
    return Math.max(...topRegions.map((r) => r.total), 1);
  }, [topRegions]);

  // 7-day usage data formatted for bar + spline curve matching reference screenshot
  const usageTrendData = useMemo(() => {
    const dayLabels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    return data.usageTrend.points.slice(0, 7).map((point, index) => ({
      day: dayLabels[index % 7],
      fastKwh: Math.round(point.fastEnergyKwh / 10),
      slowKwh: Math.round(point.slowEnergyKwh / 10),
      activeCounts: point.fastChargerCount + point.slowChargerCount,
    }));
  }, [data.usageTrend.points]);

  return (
    <div className={styles.infrastructureUsageGrid}>
      {/* Left Card: Regional Infrastructure */}
      <article className={styles.infrastructureCard}>
        <header className={styles.infrastructureHeader}>
          <div className={styles.infrastructureTitleGroup}>
            <h3>{t('dashboard.infrastructure.regionalTitle')}</h3>
            <p>{t('dashboard.infrastructure.densitySubtitle')}</p>
          </div>
          <div className={styles.typeModelSwitcher}>
            <button
              type="button"
              className={`${styles.switcherBtn} ${activeMode === 'chargerType' ? styles.activeSwitcherBtn : ''}`}
              onClick={() => setActiveMode('chargerType')}
            >
              Type
            </button>
            <button
              type="button"
              className={`${styles.switcherBtn} ${activeMode === 'modelName' ? styles.activeSwitcherBtn : ''}`}
              onClick={() => setActiveMode('modelName')}
            >
              Model
            </button>
          </div>
        </header>

        <div className={styles.regionalBarsBody}>
          {topRegions.map((region) => {
            const fastPercent = (region.fast / maxRegionTotal) * 100;
            const slowPercent = (region.slow / maxRegionTotal) * 100;

            return (
              <div key={region.id} className={styles.regionRow}>
                <div className={styles.regionHeader}>
                  <span className={styles.regionName}>{region.name}</span>
                  <span className={styles.regionTotal}>{region.total.toLocaleString()}</span>
                </div>
                <div className={styles.progressTrack}>
                  <div
                    className={styles.fastSegment}
                    style={{ width: `${Math.min(fastPercent, 80)}%` }}
                  />
                  <div
                    className={styles.slowSegment}
                    style={{ width: `${Math.min(slowPercent, 60)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.regionalLegendRow}>
          <span className={styles.legendDotItem}>
            <i className={styles.darkBlueDot} /> Fast
          </span>
          <span className={styles.legendDotItem}>
            <i className={styles.skyBlueDot} /> Slow
          </span>
        </div>
      </article>

      {/* Right Card: Energy Consumption Trend */}
      <article className={styles.infrastructureCard}>
        <header className={styles.infrastructureHeader}>
          <div className={styles.infrastructureTitleGroup}>
            <h3>{t('dashboard.infrastructure.energyTrendTitle')}</h3>
            <p>{t('dashboard.infrastructure.usagePatternSubtitle')}</p>
          </div>
          <div className={styles.trendPillGroup}>
            <span className={styles.peakDayPill}>Peak Day: 3 days ago</span>
            <span className={styles.totalKwhPill}>Total: 228,000 kWh</span>
          </div>
        </header>

        <div className={styles.trendChartBody}>
          <ResponsiveContainer width="100%" height={210}>
            <ComposedChart data={usageTrendData} margin={{ top: 12, right: 12, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fill: '#7A91BF', fontSize: 11, fontWeight: 700 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0e0',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#2E56A6',
                }}
              />
              <Bar dataKey="fastKwh" fill="#dbeafe" radius={[4, 4, 0, 0]} maxBarSize={32} />
              <Bar dataKey="slowKwh" fill="#0f4c81" radius={[4, 4, 0, 0]} maxBarSize={32} />
              <Line
                type="monotone"
                dataKey="activeCounts"
                stroke="#0f4c81"
                strokeWidth={2.5}
                strokeDasharray="4 4"
                dot={{ r: 4, fill: '#0f4c81' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.trendFooterRow}>
          <div className={styles.trendLegendLeft}>
            <span className={styles.legendSquareItem}>
              <i className={styles.lightSquare} /> Fast kWh
            </span>
            <span className={styles.legendSquareItem}>
              <i className={styles.darkSquare} /> Slow kWh
            </span>
            <span className={styles.legendLineItem}>
              <i className={styles.dashedLine} /> Active Counts
            </span>
          </div>
          <span className={styles.updatedTimeText}>Updated: 2 mins ago</span>
        </div>
      </article>
    </div>
  );
};

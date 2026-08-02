import React, { useMemo, useState } from 'react';
import { BarChart3, Download, Eye, EyeOff, Menu, Zap } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styles from '../../../scss/systemHome/DashboardSections.module.scss';
import { useI18n } from '../../../i18n/I18nContext';
import type {
  InfrastructureChartMenuProps,
  InfrastructureDistributionChartRow,
  InfrastructureDistributionMode,
  InfrastructureUsageChartPoint,
  InfrastructureUsageSectionCardProps,
} from '../../../libs/types/dashboard/infrastructureUsage';

const formatNumber = (value: number): string => value.toLocaleString();
const formatEnergy = (value: number): string => `${value.toLocaleString()} kWh`;
const formatCount = (value: number): string => value.toLocaleString();
const normalizeTooltipValue = (value: unknown): number => {
  if (Array.isArray(value)) return Number(value[0] ?? 0);
  return Number(value);
};

const downloadCsv = (fileName: string, rows: string[][]) => {
  const csv = rows
    .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const ChartMenu: React.FC<InfrastructureChartMenuProps> = ({
  open,
  tableVisible,
  onDownloadCsv,
  onToggleTable,
}) => {
  const { t } = useI18n();

  if (!open) return null;

  return (
    <div className={styles.infrastructureMenuPanel} role="menu">
      <button type="button" role="menuitem" onClick={onDownloadCsv}>
        <Download size={15} />
        <span>{t('dashboard.infrastructure.menu.downloadCsv')}</span>
      </button>
      <button type="button" role="menuitem" onClick={onToggleTable}>
        {tableVisible ? <EyeOff size={15} /> : <Eye size={15} />}
        <span>
          {tableVisible
            ? t('dashboard.infrastructure.menu.hideTable')
            : t('dashboard.infrastructure.menu.viewTable')}
        </span>
      </button>
    </div>
  );
};

export const InfrastructureUsageSectionCard: React.FC<InfrastructureUsageSectionCardProps> = ({
  data,
}) => {
  const { t } = useI18n();
  const [activeMode, setActiveMode] = useState<InfrastructureDistributionMode>('chargerType');
  const [openMenu, setOpenMenu] = useState<'distribution' | 'usage' | null>(null);
  const [showDistributionTable, setShowDistributionTable] = useState<boolean>(false);
  const [showUsageTable, setShowUsageTable] = useState<boolean>(false);
  const distributionPanel = data.distributionPanels[activeMode];
  const modeOptions: InfrastructureDistributionMode[] = ['chargerType', 'modelName'];

  const distributionChartData = useMemo<InfrastructureDistributionChartRow[]>(() => distributionPanel.regions.map((region) => {
    const total = distributionPanel.series.reduce((sum, series) => sum + (region.values[series.id] ?? 0), 0);

    return {
      id: region.id,
      name: t(region.labelKey),
      total,
      ...region.values,
    };
  }), [distributionPanel, t]);

  const usageChartData = useMemo<InfrastructureUsageChartPoint[]>(() => data.usageTrend.points.map((point) => ({
    ...point,
    name: t(point.labelKey),
  })), [data.usageTrend.points, t]);

  const distributionTotal = distributionChartData.reduce((sum, region) => sum + region.total, 0);
  const usageTotalEnergy = data.usageTrend.points.reduce((sum, point) => sum + point.totalEnergyKwh, 0);
  const usagePeak = data.usageTrend.points.reduce(
    (peak, point) => (point.totalEnergyKwh > peak.totalEnergyKwh ? point : peak),
    data.usageTrend.points[0],
  );
  const energyMetricNames = useMemo(() => new Set([
    t('dashboard.infrastructure.metric.fastEnergy'),
    t('dashboard.infrastructure.metric.slowEnergy'),
    t('dashboard.infrastructure.metric.totalEnergy'),
  ]), [t]);

  const handleDownloadDistributionCsv = () => {
    const header = [
      t('dashboard.infrastructure.table.region'),
      ...distributionPanel.series.map((series) => t(series.labelKey)),
      t('dashboard.infrastructure.table.total'),
    ];
    const rows = distributionChartData.map((region) => [
      region.name,
      ...distributionPanel.series.map((series) => String(region[series.id] ?? 0)),
      String(region.total),
    ]);

    downloadCsv('infrastructure-distribution.csv', [header, ...rows]);
    setOpenMenu(null);
  };

  const handleDownloadUsageCsv = () => {
    const rows = usageChartData.map((point) => [
      point.name,
      String(point.fastEnergyKwh),
      String(point.slowEnergyKwh),
      String(point.totalEnergyKwh),
      String(point.fastChargerCount),
      String(point.slowChargerCount),
    ]);

    downloadCsv('charger-usage-trend.csv', [
      [
        t('dashboard.infrastructure.table.period'),
        t('dashboard.infrastructure.metric.fastEnergy'),
        t('dashboard.infrastructure.metric.slowEnergy'),
        t('dashboard.infrastructure.metric.totalEnergy'),
        t('dashboard.infrastructure.metric.fastChargers'),
        t('dashboard.infrastructure.metric.slowChargers'),
      ],
      ...rows,
    ]);
    setOpenMenu(null);
  };

  return (
    <div className={styles.infrastructureUsageGrid}>
      <article className={styles.infrastructureCard}>
        <header className={styles.infrastructureHeader}>
          <div className={styles.infrastructureTitleGroup}>
            <h3>{t(distributionPanel.titleKey)}</h3>
            <p>{t(distributionPanel.descriptionKey)}</p>
          </div>
          <div className={styles.infrastructureControls}>
            <div className={styles.infrastructureModeGroup} role="radiogroup" aria-label={t('dashboard.infrastructure.modeAria')}>
              {modeOptions.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={`${styles.infrastructureModeButton} ${activeMode === mode ? styles.infrastructureModeActive : ''}`}
                  onClick={() => setActiveMode(mode)}
                  role="radio"
                  aria-checked={activeMode === mode}
                >
                  {t(`dashboard.infrastructure.mode.${mode}`)}
                </button>
              ))}
            </div>
            <div className={styles.infrastructureMenuWrap}>
              <button
                type="button"
                className={styles.infrastructureIconButton}
                aria-label={t('dashboard.infrastructure.menu.open')}
                onClick={() => setOpenMenu((current) => (current === 'distribution' ? null : 'distribution'))}
              >
                <Menu size={24} />
              </button>
              <ChartMenu
                open={openMenu === 'distribution'}
                tableVisible={showDistributionTable}
                onDownloadCsv={handleDownloadDistributionCsv}
                onToggleTable={() => {
                  setShowDistributionTable((current) => !current);
                  setOpenMenu(null);
                }}
              />
            </div>
          </div>
        </header>

        <div className={styles.infrastructureSummaryRail}>
          <span>
            <BarChart3 size={16} />
            {t('dashboard.infrastructure.summary.totalInstalled')} <strong>{formatNumber(distributionTotal)}</strong>
          </span>
          <span>
            <Zap size={16} />
            {t('dashboard.infrastructure.summary.series')} <strong>{distributionPanel.series.length}</strong>
          </span>
        </div>

        <div className={styles.infrastructureChartFrame}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distributionChartData} margin={{ top: 10, right: 18, left: 4, bottom: 16 }}>
              <CartesianGrid stroke="#e8eef6" vertical={false} />
              <XAxis
                dataKey="name"
                interval={0}
                angle={-38}
                textAnchor="end"
                height={82}
                tick={{ fill: '#687386', fontSize: 11, fontWeight: 700 }}
                tickLine={false}
                axisLine={{ stroke: '#d9e4f0' }}
              />
              <YAxis
                tick={{ fill: '#687386', fontSize: 12, fontWeight: 800 }}
                tickFormatter={(value) => formatCount(Number(value))}
                axisLine={false}
                tickLine={false}
                label={{
                  value: t(distributionPanel.yAxisLabelKey),
                  angle: -90,
                  position: 'insideLeft',
                  fill: '#667085',
                  fontSize: 12,
                  fontWeight: 800,
                }}
              />
              <Tooltip
                cursor={{ fill: 'rgba(15, 23, 42, 0.04)' }}
                contentStyle={{
                  border: '1px solid #d5e0ee',
                  borderRadius: 8,
                  boxShadow: '0 12px 28px rgba(31, 49, 73, 0.12)',
                  fontWeight: 800,
                }}
                formatter={(value, name) => [formatNumber(normalizeTooltipValue(value)), String(name)]}
              />
              {distributionPanel.series.map((series) => (
                <Bar
                  key={series.id}
                  dataKey={series.id}
                  stackId="installed"
                  name={t(series.labelKey)}
                  fill={series.color}
                  radius={[3, 3, 0, 0]}
                  maxBarSize={34}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.infrastructureLegend}>
          {distributionPanel.series.map((series) => (
            <span key={series.id}>
              <i style={{ backgroundColor: series.color }} />
              {t(series.labelKey)}
            </span>
          ))}
        </div>

        {showDistributionTable && (
          <div className={styles.infrastructureTableWrap}>
            <table className={styles.infrastructureTable}>
              <thead>
                <tr>
                  <th>{t('dashboard.infrastructure.table.region')}</th>
                  {distributionPanel.series.map((series) => (
                    <th key={series.id}>{t(series.labelKey)}</th>
                  ))}
                  <th>{t('dashboard.infrastructure.table.total')}</th>
                </tr>
              </thead>
              <tbody>
                {distributionChartData.map((region) => (
                  <tr key={region.id}>
                    <td>{region.name}</td>
                    {distributionPanel.series.map((series) => (
                      <td key={series.id}>{formatNumber(Number(region[series.id] ?? 0))}</td>
                    ))}
                    <td>{formatNumber(region.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </article>

      <article className={styles.infrastructureCard}>
        <header className={styles.infrastructureHeader}>
          <div className={styles.infrastructureTitleGroup}>
            <h3>{t(data.usageTrend.titleKey)}</h3>
            <p>{t(data.usageTrend.descriptionKey)}</p>
          </div>
          <div className={styles.infrastructureMenuWrap}>
            <button
              type="button"
              className={styles.infrastructureIconButton}
              aria-label={t('dashboard.infrastructure.menu.open')}
              onClick={() => setOpenMenu((current) => (current === 'usage' ? null : 'usage'))}
            >
              <Menu size={24} />
            </button>
            <ChartMenu
              open={openMenu === 'usage'}
              tableVisible={showUsageTable}
              onDownloadCsv={handleDownloadUsageCsv}
              onToggleTable={() => {
                setShowUsageTable((current) => !current);
                setOpenMenu(null);
              }}
            />
          </div>
        </header>

        <div className={styles.infrastructureSummaryRail}>
          <span>
            {t('dashboard.infrastructure.summary.totalEnergy')} <strong>{formatEnergy(usageTotalEnergy)}</strong>
          </span>
          <span>
            {t('dashboard.infrastructure.summary.peak')} <strong>{t(usagePeak.labelKey)}</strong>
          </span>
        </div>

        <div className={styles.infrastructureChartFrame}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={usageChartData} margin={{ top: 10, right: 16, left: 0, bottom: 6 }}>
              <CartesianGrid stroke="#e8eef6" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: '#687386', fontSize: 12, fontWeight: 800 }}
                tickLine={false}
                axisLine={{ stroke: '#d9e4f0' }}
              />
              <YAxis
                yAxisId="chargers"
                tick={{ fill: '#687386', fontSize: 12, fontWeight: 800 }}
                tickFormatter={(value) => formatCount(Number(value))}
                axisLine={false}
                tickLine={false}
                label={{
                  value: t(data.usageTrend.leftAxisLabelKey),
                  angle: -90,
                  position: 'insideLeft',
                  fill: '#667085',
                  fontSize: 12,
                  fontWeight: 800,
                }}
              />
              <YAxis
                yAxisId="energy"
                orientation="right"
                tick={{ fill: '#687386', fontSize: 12, fontWeight: 800 }}
                tickFormatter={(value) => `${Math.round(Number(value) / 1000)}k`}
                axisLine={false}
                tickLine={false}
                label={{
                  value: t(data.usageTrend.rightAxisLabelKey),
                  angle: 90,
                  position: 'insideRight',
                  fill: '#667085',
                  fontSize: 12,
                  fontWeight: 800,
                }}
              />
              <Tooltip
                cursor={{ fill: 'rgba(15, 23, 42, 0.04)' }}
                contentStyle={{
                  border: '1px solid #d5e0ee',
                  borderRadius: 8,
                  boxShadow: '0 12px 28px rgba(31, 49, 73, 0.12)',
                  fontWeight: 800,
                }}
                formatter={(value, name) => {
                  const metricName = String(name);
                  const formatted = energyMetricNames.has(metricName)
                    ? formatEnergy(normalizeTooltipValue(value))
                    : formatCount(normalizeTooltipValue(value));

                  return [formatted, metricName];
                }}
              />
              <Legend verticalAlign="bottom" height={34} iconType="circle" wrapperStyle={{ fontWeight: 800 }} />
              <Bar yAxisId="energy" dataKey="fastEnergyKwh" name={t('dashboard.infrastructure.metric.fastEnergy')} fill="#f97316" radius={[6, 6, 0, 0]} maxBarSize={30} />
              <Bar yAxisId="energy" dataKey="slowEnergyKwh" name={t('dashboard.infrastructure.metric.slowEnergy')} fill="#f7b500" radius={[6, 6, 0, 0]} maxBarSize={30} />
              <Bar yAxisId="energy" dataKey="totalEnergyKwh" name={t('dashboard.infrastructure.metric.totalEnergy')} fill="#a7c900" radius={[6, 6, 0, 0]} maxBarSize={30} />
              <Line yAxisId="chargers" type="monotone" dataKey="fastChargerCount" name={t('dashboard.infrastructure.metric.fastChargers')} stroke="#ef003b" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line yAxisId="chargers" type="monotone" dataKey="slowChargerCount" name={t('dashboard.infrastructure.metric.slowChargers')} stroke="#24b5d5" strokeWidth={3} strokeDasharray="8 7" dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {showUsageTable && (
          <div className={styles.infrastructureTableWrap}>
            <table className={styles.infrastructureTable}>
              <thead>
                <tr>
                  <th>{t('dashboard.infrastructure.table.period')}</th>
                  <th>{t('dashboard.infrastructure.metric.fastEnergy')}</th>
                  <th>{t('dashboard.infrastructure.metric.slowEnergy')}</th>
                  <th>{t('dashboard.infrastructure.metric.totalEnergy')}</th>
                  <th>{t('dashboard.infrastructure.metric.fastChargers')}</th>
                  <th>{t('dashboard.infrastructure.metric.slowChargers')}</th>
                </tr>
              </thead>
              <tbody>
                {usageChartData.map((point) => (
                  <tr key={point.id}>
                    <td>{point.name}</td>
                    <td>{formatEnergy(point.fastEnergyKwh)}</td>
                    <td>{formatEnergy(point.slowEnergyKwh)}</td>
                    <td>{formatEnergy(point.totalEnergyKwh)}</td>
                    <td>{formatNumber(point.fastChargerCount)}</td>
                    <td>{formatNumber(point.slowChargerCount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </article>
    </div>
  );
};

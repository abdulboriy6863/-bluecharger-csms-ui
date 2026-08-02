import React, { useMemo, useState } from 'react';
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Menu, X } from 'lucide-react';
import styles from '../../../scss/systemHome/DashboardSections.module.scss';
import { mockChargerStatusPanels } from '../../../data/mockChargerStatusSummary';
import {
  ChargerStatusBreakdownItem,
  ChargerStatusPanelData,
  ChargerStatusPanelId,
} from '../../../types/dashboard';
import { useI18n } from '../../../i18n/I18nContext';

interface ChartItem extends ChargerStatusBreakdownItem {
  name: string;
  percent: number;
}

interface PieLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
  name?: string;
}

interface ChargerStatusChartCardProps {
  panel: ChargerStatusPanelData;
  active?: boolean;
  detail?: boolean;
  onSelect?: (panelId: ChargerStatusPanelId) => void;
  onClose?: () => void;
}

const RADIAN = Math.PI / 180;

const formatPercent = (value: number): string => `${(value * 100).toFixed(1)} %`;

const renderPieLabel = ({
  cx = 0,
  cy = 0,
  midAngle = 0,
  innerRadius = 0,
  outerRadius = 0,
  percent = 0,
  name = '',
}: PieLabelProps): React.ReactNode => {
  if (percent < 0.065) return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.58;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      className={styles.pieLabel}
    >
      <tspan x={x} dy="-0.45em">{name}</tspan>
      <tspan x={x} dy="1.15em">{formatPercent(percent)}</tspan>
    </text>
  );
};

const getPanelTotals = (items: ChargerStatusBreakdownItem[]) => items.reduce(
  (totals, item) => ({
    fast: totals.fast + item.fast,
    slow: totals.slow + item.slow,
    total: totals.total + item.total,
  }),
  { fast: 0, slow: 0, total: 0 },
);

const ChargerStatusChartCard: React.FC<ChargerStatusChartCardProps> = ({
  panel,
  active = false,
  detail = false,
  onSelect,
  onClose,
}) => {
  const { t } = useI18n();
  const totals = useMemo(() => getPanelTotals(panel.items), [panel.items]);
  const chartData = useMemo<ChartItem[]>(() => panel.items.map((item) => ({
    ...item,
    name: t(item.labelKey),
    percent: item.total / totals.total,
  })), [panel.items, t, totals.total]);
  const unit = t('dashboard.chargerStatus.unit');
  const title = t(panel.titleKey);

  return (
    <article className={`${styles.statusCard} ${detail ? styles.detailCard : ''}`}>
      <header className={`${styles.statusCardHeader} ${active ? styles.activeHeader : ''}`}>
        <button
          className={styles.statusTitleButton}
          type="button"
          onClick={() => onSelect?.(panel.id)}
          aria-pressed={active}
        >
          {title}
        </button>
        {detail && onClose ? (
          <button
            className={styles.menuIcon}
            type="button"
            aria-label={t('dashboard.chargerStatus.closeDetail')}
            onClick={onClose}
          >
            <X size={24} />
          </button>
        ) : (
          <button
            className={styles.menuIcon}
            type="button"
            aria-label={t('dashboard.chargerStatus.openDetail')}
            onClick={() => onSelect?.(panel.id)}
          >
            <Menu size={26} />
          </button>
        )}
      </header>

      <div className={detail ? styles.detailBody : styles.summaryBody}>
        <div className={detail ? styles.detailChartPane : styles.chartPane}>
          <div className={styles.chartViewport}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                <Pie
                  data={chartData}
                  dataKey="total"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="82%"
                  stroke="#ffffff"
                  strokeWidth={2}
                  isAnimationActive={false}
                  labelLine={false}
                  label={renderPieLabel}
                >
                  {chartData.map((item) => (
                    <Cell key={item.id} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip
                  isAnimationActive={false}
                  formatter={(value, name) => [`${Number(value).toLocaleString()}${unit}`, String(name)]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.legendGrid}>
            {chartData.map((item) => (
              <span className={styles.legendItem} key={item.id}>
                <span className={styles.legendDot} style={{ backgroundColor: item.color }} />
                {item.name}
              </span>
            ))}
          </div>
        </div>

        {detail && (
          <div className={styles.tablePane}>
            <table className={styles.statusTable}>
              <thead>
                <tr>
                  <th>{t('dashboard.chargerStatus.table.category')}</th>
                  <th>{t('dashboard.chargerStatus.table.fast')}</th>
                  <th>{t('dashboard.chargerStatus.table.slow')}</th>
                  <th>{t('dashboard.chargerStatus.table.total')}</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span
                        className={styles.categoryPill}
                        style={{
                          color: item.color,
                          backgroundColor: item.badgeBackground,
                        }}
                      >
                        {item.name}
                      </span>
                    </td>
                    <td>{item.fast.toLocaleString()}{unit}</td>
                    <td>{item.slow.toLocaleString()}{unit}</td>
                    <td>{item.total.toLocaleString()}{unit}</td>
                  </tr>
                ))}
                <tr className={styles.totalRow}>
                  <td>{t('dashboard.chargerStatus.total')}</td>
                  <td>{totals.fast.toLocaleString()}{unit}</td>
                  <td>{totals.slow.toLocaleString()}{unit}</td>
                  <td>{totals.total.toLocaleString()}{unit}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </article>
  );
};

export const ChargerStatusSection: React.FC = () => {
  const { t } = useI18n();
  const [selectedPanelId, setSelectedPanelId] = useState<ChargerStatusPanelId | null>(null);
  const selectedPanel = mockChargerStatusPanels.find((panel) => panel.id === selectedPanelId);

  return (
    <section className={styles.chargerStatusSection} aria-label={t('dashboard.chargerStatus.aria')}>
      {selectedPanel ? (
        <div className={styles.expandedStack}>
          <div className={styles.panelTabs} role="tablist" aria-label={t('dashboard.chargerStatus.tabsAria')}>
            {mockChargerStatusPanels.map((panel) => (
              <button
                key={panel.id}
                type="button"
                className={`${styles.panelTab} ${panel.id === selectedPanel.id ? styles.activeTab : ''}`}
                onClick={() => setSelectedPanelId(panel.id)}
                role="tab"
                aria-selected={panel.id === selectedPanel.id}
              >
                <span>{t(panel.titleKey)}</span>
              </button>
            ))}
          </div>
          <ChargerStatusChartCard
            panel={selectedPanel}
            active
            detail
            onSelect={setSelectedPanelId}
            onClose={() => setSelectedPanelId(null)}
          />
        </div>
      ) : (
        <div className={styles.statusGrid}>
          {mockChargerStatusPanels.map((panel) => (
            <ChargerStatusChartCard
              key={panel.id}
              panel={panel}
              onSelect={setSelectedPanelId}
            />
          ))}
        </div>
      )}
    </section>
  );
};

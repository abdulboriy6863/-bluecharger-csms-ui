import React, { useId, useMemo, useState } from 'react';
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
const OPERATION_CHART_INNER_RADIUS = 82;
const OPERATION_CHART_BASE_OUTER_RADIUS = 158;
const OPERATION_CHART_MAX_EXTENSION = 78;
const OPERATION_CHART_VIEWBOX_SIZE = 560;

const formatPercent = (value: number): string => `${(value * 100).toFixed(1)} %`;

const mixHexColor = (hexColor: string, mixWith: string, amount: number) => {
  const parseHex = (value: string) => {
    const normalized = value.replace('#', '');
    return {
      r: parseInt(normalized.slice(0, 2), 16),
      g: parseInt(normalized.slice(2, 4), 16),
      b: parseInt(normalized.slice(4, 6), 16),
    };
  };
  const base = parseHex(hexColor);
  const target = parseHex(mixWith);
  const mixChannel = (from: number, to: number) => Math.round(from + (to - from) * amount);

  return `rgb(${mixChannel(base.r, target.r)}, ${mixChannel(base.g, target.g)}, ${mixChannel(base.b, target.b)})`;
};

const polarPoint = (radius: number, angle: number) => {
  const angleInRadians = (angle - 90) * RADIAN;
  return {
    x: radius * Math.cos(angleInRadians),
    y: radius * Math.sin(angleInRadians),
  };
};

const createAnnularSectorPath = (
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
) => {
  const outerStart = polarPoint(outerRadius, startAngle);
  const outerEnd = polarPoint(outerRadius, endAngle);
  const innerEnd = polarPoint(innerRadius, endAngle);
  const innerStart = polarPoint(innerRadius, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${outerStart.x.toFixed(3)} ${outerStart.y.toFixed(3)}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x.toFixed(3)} ${outerEnd.y.toFixed(3)}`,
    `L ${innerEnd.x.toFixed(3)} ${innerEnd.y.toFixed(3)}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x.toFixed(3)} ${innerStart.y.toFixed(3)}`,
    'Z',
  ].join(' ');
};

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

const OperationInfographicPie: React.FC<{
  data: ChartItem[];
  total: number;
  unit: string;
  totalLabel: string;
}> = ({ data, total, unit, totalLabel }) => {
  const gradientPrefix = useId().replace(/:/g, '');
  const segmentShadowId = `${gradientPrefix}-segmentShadow`;
  const centerShadowId = `${gradientPrefix}-centerShadow`;
  const maxTotal = Math.max(...data.map((item) => item.total));
  let cursorAngle = -86;

  return (
    <svg
      className={styles.infographicSvg}
      viewBox={`${-OPERATION_CHART_VIEWBOX_SIZE / 2} ${-OPERATION_CHART_VIEWBOX_SIZE / 2} ${OPERATION_CHART_VIEWBOX_SIZE} ${OPERATION_CHART_VIEWBOX_SIZE}`}
      role="img"
      aria-label={`${totalLabel} ${total.toLocaleString()}${unit}`}
    >
      <defs>
        <filter id={segmentShadowId} x="-24%" y="-24%" width="148%" height="148%">
          <feDropShadow dx="0" dy="10" stdDeviation="7" floodColor="#1f3149" floodOpacity="0.15" />
        </filter>
        <filter id={centerShadowId} x="-28%" y="-28%" width="156%" height="156%">
          <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#1f3149" floodOpacity="0.17" />
        </filter>
        {data.map((item) => (
          <linearGradient
            key={item.id}
            id={`${gradientPrefix}-${item.id}`}
            x1="-10%"
            y1="-10%"
            x2="110%"
            y2="110%"
          >
            <stop offset="0%" stopColor={mixHexColor(item.color, '#ffffff', 0.26)} />
            <stop offset="100%" stopColor={mixHexColor(item.color, '#000000', 0.08)} />
          </linearGradient>
        ))}
      </defs>

      {data.map((item) => {
        const sweep = item.percent * 360;
        const gap = Math.min(2.2, Math.max(0.4, sweep * 0.18));
        const startAngle = cursorAngle + gap / 2;
        const endAngle = cursorAngle + sweep - gap / 2;
        const outerRadius = Math.round(
          OPERATION_CHART_BASE_OUTER_RADIUS
            + Math.pow(item.total / maxTotal, 0.44) * OPERATION_CHART_MAX_EXTENSION,
        );
        const labelRadius = OPERATION_CHART_INNER_RADIUS + (outerRadius - OPERATION_CHART_INNER_RADIUS) * 0.64;
        const labelPoint = polarPoint(labelRadius, startAngle + (endAngle - startAngle) / 2);
        const path = createAnnularSectorPath(
          OPERATION_CHART_INNER_RADIUS,
          outerRadius,
          startAngle,
          Math.max(startAngle + 0.3, endAngle),
        );
        const showLabel = item.percent >= 0.065;

        cursorAngle += sweep;

        return (
          <g key={item.id}>
            <path
              className={styles.infographicSegment}
              d={path}
              fill={`url(#${gradientPrefix}-${item.id})`}
              filter={`url(#${segmentShadowId})`}
            />
            {showLabel && (
              <text
                className={styles.infographicLabel}
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                dominantBaseline="central"
              >
                <tspan className={styles.infographicLabelName} x={labelPoint.x} dy="-0.7em">
                  {item.name}
                </tspan>
                <tspan className={styles.infographicLabelPercent} x={labelPoint.x} dy="1.2em">
                  {formatPercent(item.percent)}
                </tspan>
              </text>
            )}
          </g>
        );
      })}

      <circle className={styles.infographicCenterOuter} r="101" filter={`url(#${centerShadowId})`} />
      <circle className={styles.infographicCenterInner} r="82" />
      <text className={styles.infographicCenterText} textAnchor="middle" dominantBaseline="central">
        <tspan className={styles.infographicCenterValue} x="0" dy="-0.18em">
          {total.toLocaleString()}{unit}
        </tspan>
        <tspan className={styles.infographicCenterLabel} x="0" dy="1.35em">
          {totalLabel}
        </tspan>
      </text>
    </svg>
  );
};

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
            {panel.id === 'operation' ? (
              <OperationInfographicPie
                data={chartData}
                total={totals.total}
                unit={unit}
                totalLabel={t('dashboard.chargerStatus.total')}
              />
            ) : (
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
            )}
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

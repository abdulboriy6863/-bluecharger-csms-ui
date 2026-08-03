import React, { useId, useMemo, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import styles from '../../../scss/systemHome/DashboardSections.module.scss';
import {
  ChargerStatusBreakdownItem,
  ChargerStatusChartItem,
  ChargerStatusInfographicPieProps,
  ChargerStatusSectionCardProps,
} from '../../../libs/types/dashboard/chargerStatus';
import { useI18n } from '../../../i18n/I18nContext';

const RADIAN = Math.PI / 180;
const STATUS_CHART_INNER_RADIUS = 100;
const STATUS_CHART_OUTER_RADIUS = 138;
const STATUS_CHART_VIEWBOX_SIZE = 320;

const formatPercent = (value: number): string => `${(value * 100).toFixed(1)}%`;
const classNames = (...values: Array<string | false | undefined>) => values.filter(Boolean).join(' ');

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

const getPanelTotals = (items: ChargerStatusBreakdownItem[]) => items.reduce(
  (totals, item) => ({
    fast: totals.fast + item.fast,
    slow: totals.slow + item.slow,
    total: totals.total + item.total,
  }),
  { fast: 0, slow: 0, total: 0 },
);

const StatusInfographicPie: React.FC<ChargerStatusInfographicPieProps> = ({
  data,
  total,
  unit,
  totalLabel,
  activeId,
  pinnedId,
  isInteracting,
  onHover,
  onLeave,
  onToggle,
}) => {
  const activeItem = data.find((item) => item.id === activeId) ?? data[0];
  let cursorAngle = -90;

  return (
    <svg
      className={styles.donutSvg}
      viewBox={`${-STATUS_CHART_VIEWBOX_SIZE / 2} ${-STATUS_CHART_VIEWBOX_SIZE / 2} ${STATUS_CHART_VIEWBOX_SIZE} ${STATUS_CHART_VIEWBOX_SIZE}`}
      role="group"
      aria-label={`${activeItem.name} ${formatPercent(activeItem.percent)} ${activeItem.total.toLocaleString()}${unit}`}
      onMouseLeave={onLeave}
    >
      {/* Background Track Circle */}
      <circle
        r={(STATUS_CHART_INNER_RADIUS + STATUS_CHART_OUTER_RADIUS) / 2}
        stroke="#f1f5f9"
        strokeWidth={STATUS_CHART_OUTER_RADIUS - STATUS_CHART_INNER_RADIUS}
        fill="none"
      />

      {data.map((item) => {
        const sweep = item.percent * 360;
        const gap = Math.min(1.5, Math.max(0.4, sweep * 0.1));
        const startAngle = cursorAngle + gap / 2;
        const endAngle = cursorAngle + sweep - gap / 2;
        const path = createAnnularSectorPath(
          STATUS_CHART_INNER_RADIUS,
          STATUS_CHART_OUTER_RADIUS,
          startAngle,
          Math.max(startAngle + 0.2, endAngle),
        );
        const isActive = item.id === activeItem.id;
        const isDimmed = isInteracting && !isActive;

        cursorAngle += sweep;

        return (
          <g
            key={item.id}
            role="button"
            tabIndex={0}
            aria-pressed={pinnedId === item.id}
            onMouseEnter={() => onHover(item.id)}
            onFocus={() => onHover(item.id)}
            onBlur={onLeave}
            onClick={() => onToggle(item.id)}
          >
            <path
              className={classNames(
                styles.donutSegment,
                isActive && styles.donutSegmentActive,
                isDimmed && styles.donutSegmentDimmed,
              )}
              d={path}
              fill={item.color}
            />
          </g>
        );
      })}

      {/* Center Display Text */}
      <text className={styles.donutCenterText} textAnchor="middle" dominantBaseline="central">
        <tspan className={styles.donutCenterValue} x="0" dy="-0.3em">
          {total.toLocaleString()}
        </tspan>
        <tspan className={styles.donutCenterLabel} x="0" dy="1.6em">
          {totalLabel}
        </tspan>
      </text>
    </svg>
  );
};

export const ChargerStatusSectionCard: React.FC<ChargerStatusSectionCardProps> = ({
  panel,
  active = false,
  detail = false,
  onSelect,
  onClose,
}) => {
  const { t } = useI18n();
  const totals = useMemo(() => getPanelTotals(panel.items), [panel.items]);
  const chartData = useMemo<ChargerStatusChartItem[]>(() => panel.items.map((item) => ({
    ...item,
    name: t(item.labelKey),
    percent: item.total / totals.total,
  })), [panel.items, t, totals.total]);
  const unit = t('dashboard.chargerStatus.unit');
  const title = t(panel.titleKey);
  const defaultItemId = useMemo(() => (
    chartData.reduce((largest, item) => (item.total > largest.total ? item : largest), chartData[0]).id
  ), [chartData]);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [pinnedItemId, setPinnedItemId] = useState<string | null>(null);
  const activeItemId = hoveredItemId ?? pinnedItemId ?? defaultItemId;
  const isInteracting = Boolean(pinnedItemId ?? hoveredItemId);

  const handleToggleItem = (itemId: string) => {
    setPinnedItemId((current) => (current === itemId ? null : itemId));
    setHoveredItemId(itemId);
  };

  const centerTotalLabel = panel.id === 'operation' ? 'Total' : 'Connectors';
  const top4Items = useMemo(() => chartData.slice(0, 4), [chartData]);
  const operationItems = useMemo(() => chartData.slice(0, 3), [chartData]);

  return (
    <article className={`${styles.statusCard} ${detail ? styles.detailCard : ''}`}>
      <header className={styles.statusCardHeader}>
        <h3 className={styles.statusCardTitle}>{title}</h3>
        {detail && onClose ? (
          <button
            className={styles.expandIconButton}
            type="button"
            aria-label={t('dashboard.chargerStatus.closeDetail')}
            onClick={onClose}
          >
            <X size={18} />
          </button>
        ) : (
          <button
            className={styles.expandIconButton}
            type="button"
            aria-label={t('dashboard.chargerStatus.openDetail')}
            onClick={() => onSelect?.(panel.id)}
          >
            <Maximize2 size={18} />
          </button>
        )}
      </header>

      <div className={styles.cardMainBody}>
        {/* Left Side: Donut Chart */}
        <div className={styles.donutPane}>
          <StatusInfographicPie
            data={chartData}
            total={totals.total}
            unit={unit}
            totalLabel={centerTotalLabel}
            tooltipLabel={t('dashboard.chargerStatus.tooltip.status')}
            fastLabel={t('dashboard.chargerStatus.table.fast')}
            slowLabel={t('dashboard.chargerStatus.table.slow')}
            activeId={activeItemId}
            pinnedId={pinnedItemId}
            isInteracting={isInteracting}
            onHover={setHoveredItemId}
            onLeave={() => setHoveredItemId(null)}
            onToggle={handleToggleItem}
          />
        </div>

        {/* Right Side: List or Grid view matching Stitch UI */}
        {panel.id === 'operation' ? (
          /* Operation Status List View */
          <div className={styles.listPane}>
            {operationItems.map((item) => (
              <div key={item.id} className={styles.operationRow}>
                <div className={styles.operationRowLeft}>
                  <span className={styles.colorDot} style={{ backgroundColor: item.color }} />
                  <span className={styles.operationName}>{item.name}</span>
                </div>
                <span className={styles.operationValue}>{item.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        ) : (
          /* Connector Status 2x2 Tinted Cards Grid View */
          <div className={styles.gridPane}>
            {top4Items.map((item) => (
              <div
                key={item.id}
                className={styles.connectorTintBox}
                style={{
                  backgroundColor: item.badgeBackground,
                  borderColor: item.color,
                }}
              >
                <span className={styles.tintBoxTitle} style={{ color: item.color }}>
                  {item.name}
                </span>
                <span className={styles.tintBoxValue} style={{ color: item.color }}>
                  {item.total.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Expanded Table View when Detail Mode is Active */}
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
    </article>
  );
};

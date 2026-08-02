import React, { useId, useMemo, useState } from 'react';
import { Menu, X } from 'lucide-react';
import styles from '../../../scss/systemHome/DashboardSections.module.scss';
import {
  ChargerStatusBreakdownItem,
  ChargerStatusChartItem,
  ChargerStatusInfographicPieProps,
  ChargerStatusSectionCardProps,
} from '../../../libs/types/dashboard/chargerStatus';
import { useI18n } from '../../../i18n/I18nContext';

const RADIAN = Math.PI / 180;
const STATUS_CHART_INNER_RADIUS = 88;
const STATUS_CHART_OUTER_RADIUS = 252;
const STATUS_CHART_VIEWBOX_SIZE = 620;
const STATUS_TOOLTIP_WIDTH = 164;
const STATUS_TOOLTIP_HEIGHT = 82;

const formatPercent = (value: number): string => `${(value * 100).toFixed(1)} %`;
const classNames = (...values: Array<string | false | undefined>) => values.filter(Boolean).join(' ');
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

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
  tooltipLabel,
  fastLabel,
  slowLabel,
  activeId,
  pinnedId,
  isInteracting,
  onHover,
  onLeave,
  onToggle,
}) => {
  const gradientPrefix = useId().replace(/:/g, '');
  const segmentShadowId = `${gradientPrefix}-segmentShadow`;
  const centerShadowId = `${gradientPrefix}-centerShadow`;
  const activeItem = data.find((item) => item.id === activeId) ?? data[0];
  let tooltipPoint = { x: 0, y: -148 };
  let cursorAngle = -86;

  return (
    <svg
      className={styles.infographicSvg}
      viewBox={`${-STATUS_CHART_VIEWBOX_SIZE / 2} ${-STATUS_CHART_VIEWBOX_SIZE / 2} ${STATUS_CHART_VIEWBOX_SIZE} ${STATUS_CHART_VIEWBOX_SIZE}`}
      role="group"
      aria-label={`${activeItem.name} ${formatPercent(activeItem.percent)} ${activeItem.total.toLocaleString()}${unit}`}
      onMouseLeave={onLeave}
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
        <radialGradient id={`${gradientPrefix}-centerSurface`} cx="42%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#eef4fb" />
        </radialGradient>
      </defs>

      {data.map((item) => {
        const sweep = item.percent * 360;
        const gap = Math.min(2.2, Math.max(0.4, sweep * 0.18));
        const startAngle = cursorAngle + gap / 2;
        const endAngle = cursorAngle + sweep - gap / 2;
        const outerRadius = STATUS_CHART_OUTER_RADIUS;
        const labelRadius = STATUS_CHART_INNER_RADIUS + (outerRadius - STATUS_CHART_INNER_RADIUS) * 0.64;
        const labelPoint = polarPoint(labelRadius, startAngle + (endAngle - startAngle) / 2);
        const path = createAnnularSectorPath(
          STATUS_CHART_INNER_RADIUS,
          outerRadius,
          startAngle,
          Math.max(startAngle + 0.3, endAngle),
        );
        const showLabel = item.percent >= 0.065;
        const isActive = item.id === activeItem.id;
        const isDimmed = isInteracting && !isActive;
        const midAngle = startAngle + (endAngle - startAngle) / 2;
        const explode = isActive ? polarPoint(10, midAngle) : { x: 0, y: 0 };
        const ariaLabel = `${item.name}: ${item.total.toLocaleString()}${unit}, ${formatPercent(item.percent)}`;

        if (isActive) {
          tooltipPoint = polarPoint(
            STATUS_CHART_INNER_RADIUS + (STATUS_CHART_OUTER_RADIUS - STATUS_CHART_INNER_RADIUS) * 0.58,
            midAngle,
          );
        }

        cursorAngle += sweep;

        return (
          <g
            key={item.id}
            className={styles.infographicSegmentGroup}
            transform={`translate(${explode.x.toFixed(2)} ${explode.y.toFixed(2)})`}
            role="button"
            tabIndex={0}
            aria-label={ariaLabel}
            aria-pressed={pinnedId === item.id}
            onMouseEnter={() => onHover(item.id)}
            onFocus={() => onHover(item.id)}
            onBlur={onLeave}
            onClick={() => onToggle(item.id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onToggle(item.id);
              }
            }}
          >
            <path
              className={classNames(
                styles.infographicSegment,
                isActive && styles.infographicSegmentActive,
                isDimmed && styles.infographicSegmentDimmed,
              )}
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

      <circle className={styles.infographicCenterAccent} r="111" stroke={activeItem.color} />
      <circle className={styles.infographicCenterOuter} r="101" filter={`url(#${centerShadowId})`} />
      <circle className={styles.infographicCenterInner} r="82" fill={`url(#${gradientPrefix}-centerSurface)`} />
      <text className={styles.infographicCenterText} textAnchor="middle" dominantBaseline="central">
        <tspan className={styles.infographicCenterPercent} x="0" dy="-1.85em">
          {formatPercent(activeItem.percent)}
        </tspan>
        <tspan className={styles.infographicCenterName} x="0" dy="1.42em">
          {activeItem.name}
        </tspan>
        <tspan className={styles.infographicCenterValue} x="0" dy="1.45em">
          {activeItem.total.toLocaleString()}{unit}
        </tspan>
        <tspan className={styles.infographicCenterBreakdown} x="0" dy="1.38em">
          {fastLabel} {activeItem.fast.toLocaleString()} / {slowLabel} {activeItem.slow.toLocaleString()}
        </tspan>
        <tspan className={styles.infographicCenterLabel} x="0" dy="1.38em">
          {totalLabel} {total.toLocaleString()}{unit}
        </tspan>
      </text>

      {isInteracting && (
        <foreignObject
          className={styles.infographicTooltipObject}
          x={clamp(
            tooltipPoint.x + (tooltipPoint.x >= 0 ? 18 : -STATUS_TOOLTIP_WIDTH - 18),
            -STATUS_CHART_VIEWBOX_SIZE / 2 + 18,
            STATUS_CHART_VIEWBOX_SIZE / 2 - STATUS_TOOLTIP_WIDTH - 18,
          )}
          y={clamp(
            tooltipPoint.y - STATUS_TOOLTIP_HEIGHT / 2,
            -STATUS_CHART_VIEWBOX_SIZE / 2 + 18,
            STATUS_CHART_VIEWBOX_SIZE / 2 - STATUS_TOOLTIP_HEIGHT - 18,
          )}
          width={STATUS_TOOLTIP_WIDTH}
          height={STATUS_TOOLTIP_HEIGHT}
        >
          <div className={styles.infographicTooltip}>
            <span className={styles.infographicTooltipTitle}>{activeItem.name}</span>
            <span className={styles.infographicTooltipValue}>
              <span>{tooltipLabel}:</span>
              <strong>{formatPercent(activeItem.percent)}</strong>
            </span>
          </div>
        </foreignObject>
      )}
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
          <div className={`${styles.chartViewport} ${styles.statusInfographicViewport}`}>
            <StatusInfographicPie
              data={chartData}
              total={totals.total}
              unit={unit}
              totalLabel={t('dashboard.chargerStatus.total')}
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

          <div className={styles.legendGrid}>
            {chartData.map((item) => (
              <button
                className={classNames(
                  styles.legendItem,
                  styles.legendButton,
                  item.id === activeItemId && styles.legendButtonActive,
                )}
                key={item.id}
                type="button"
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
                onFocus={() => setHoveredItemId(item.id)}
                onBlur={() => setHoveredItemId(null)}
                onClick={() => handleToggleItem(item.id)}
                aria-pressed={pinnedItemId === item.id}
              >
                <span className={styles.legendDot} style={{ backgroundColor: item.color }} />
                {item.name}
              </button>
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

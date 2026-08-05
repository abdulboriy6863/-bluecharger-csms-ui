import React from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  BatteryCharging,
  CloudSun,
  DollarSign,
  Home,
  Leaf,
  Sun,
  Zap,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styles from '../../../../scss/systemHome/SolarDashboardSectionCard.module.scss';
import { useI18n } from '../../../../i18n/I18nContext';
import type {
  SolarCarbonPoint,
  SolarDashboardFlowMetrics,
  SolarDashboardPageCardProps,
  SolarDashboardWeather,
} from '../../../types/dashboard/solarDashboard';

const format = (value: number, digits = 2) => value.toFixed(digits);

// ============================================================================
// 1. SolarFlowCard Component
// ============================================================================
interface SolarFlowCardProps {
  weather: SolarDashboardWeather;
  flow: SolarDashboardFlowMetrics;
  batterySoc: number;
}

const SolarFlowCard: React.FC<SolarFlowCardProps> = ({ weather, flow, batterySoc }) => {
  const { t } = useI18n();

  const isPvActive = flow.pvKwh > 0;
  const isGridActive = flow.gridKwh > 0;
  const isBatteryActive = flow.batteryKwh > 0;
  const isLoadActive = flow.loadKwh > 0;

  return (
    <section className={styles.flowCard} aria-label={t('solarDashboard.flow.aria')}>
      {/* Weather & Plant Header */}
      <div className={styles.weatherWidget}>
        <div className={styles.weatherInfo}>
          <div className={styles.iconWrapper}>
            <CloudSun size={24} strokeWidth={2} aria-hidden="true" />
          </div>
          <div>
            <div className={styles.temperature}>{weather.temperatureC}°C</div>
            <div className={styles.plantName}>{t(weather.plantNameKey)} • 120 kWp</div>
          </div>
        </div>

        <div className={styles.headerRightStats}>
          <span className={styles.inverterStatusBadge}>
            <span className={styles.inverterDot} /> Grid-Tied Synchronized
          </span>
          <div className={styles.statusIndicator}>
            <span className={styles.dot} />
            <span>{t('solarDashboard.live')}</span>
          </div>
        </div>
      </div>

      {/* Diagram Canvas */}
      <div className={styles.diagramContainer}>
        <svg className={styles.svgConnections} viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="pvGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="gridGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="batteryGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="loadGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <filter id="glowEffect" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="node3DShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="12" stdDeviation="8" floodColor="#2e56a6" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* Background Structural Paths */}
          <path d="M 250,75 L 250,215" className={styles.connectionPath} />
          <path d="M 285,240 L 385,240" className={styles.connectionPath} />
          <path d="M 220,270 L 140,375" className={styles.connectionPath} />
          <path d="M 280,270 L 360,375" className={styles.connectionPath} />

          {/* Glowing Animated Particle Flow Lines */}
          <path
            d="M 250,75 L 250,215"
            className={`${styles.flowParticle} ${isPvActive ? styles.active : ''}`}
            stroke="url(#pvGlow)"
            filter="url(#glowEffect)"
          />
          <path
            d="M 285,240 L 385,240"
            className={`${styles.flowParticle} ${isGridActive ? styles.active : ''}`}
            stroke="url(#gridGlow)"
            filter="url(#glowEffect)"
          />
          <path
            d="M 220,270 L 140,375"
            className={`${styles.flowParticle} ${isBatteryActive ? styles.active : ''}`}
            stroke="url(#batteryGlow)"
            filter="url(#glowEffect)"
          />
          <path
            d="M 280,270 L 360,375"
            className={`${styles.flowParticle} ${isLoadActive ? styles.active : ''}`}
            stroke="url(#loadGlow)"
            filter="url(#glowEffect)"
          />

          {/* 3D Traveling Energy Spheres */}
          {isPvActive && (
            <g>
              <circle r="7" fill="#fbbf24" filter="url(#glowEffect)">
                <animateMotion path="M 250,75 L 250,215" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle r="4" fill="#ffffff">
                <animateMotion path="M 250,75 L 250,215" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </g>
          )}

          {isGridActive && (
            <g>
              <circle r="7" fill="#3b82f6" filter="url(#glowEffect)">
                <animateMotion path="M 285,240 L 385,240" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <circle r="4" fill="#ffffff">
                <animateMotion path="M 285,240 L 385,240" dur="1.8s" repeatCount="indefinite" />
              </circle>
            </g>
          )}

          {isBatteryActive && (
            <g>
              <circle r="7" fill="#10b981" filter="url(#glowEffect)">
                <animateMotion path="M 220,270 L 140,375" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r="4" fill="#ffffff">
                <animateMotion path="M 220,270 L 140,375" dur="2s" repeatCount="indefinite" />
              </circle>
            </g>
          )}

          {isLoadActive && (
            <g>
              <circle r="7" fill="#f97316" filter="url(#glowEffect)">
                <animateMotion path="M 280,270 L 360,375" dur="1.6s" repeatCount="indefinite" />
              </circle>
              <circle r="4" fill="#ffffff">
                <animateMotion path="M 280,270 L 360,375" dur="1.6s" repeatCount="indefinite" />
              </circle>
            </g>
          )}
        </svg>

        {/* PV Node */}
        <div className={`${styles.node} ${styles.sunNode}`} style={{ top: '14%', left: '50%' }}>
          <div className={styles.nodeCircle}>
            <Sun size={22} strokeWidth={2} />
          </div>
          <div className={styles.nodeLabelGroup}>
            <span className={styles.label}>{t('solarDashboard.flow.pv')}</span>
            <span className={styles.value}>
              {format(flow.pvKwh)}
              <small className={styles.unit}>kWh</small>
            </span>
          </div>
        </div>

        {/* Central Inverter Node */}
        <div className={`${styles.node} ${styles.inverterNode}`} style={{ top: '48%', left: '50%' }}>
          <div className={styles.nodeCircle}>
            <div className={styles.solarPanelWrap}>
              <div className={styles.solarPanelSkew}>
                <div className={styles.panelCells} />
              </div>
            </div>
          </div>
          <div className={styles.inverterTelemetryBadge}>
            <span className={styles.inverterTitle}>3-Phase Smart Inverter</span>
            <span className={styles.inverterMeta}>Efficiency 98.4% • 50.0 Hz</span>
          </div>
        </div>

        {/* Grid Node */}
        <div className={`${styles.node} ${styles.gridNode}`} style={{ top: '48%', left: '80%' }}>
          <div className={styles.nodeCircle}>
            <Zap size={22} strokeWidth={2} />
          </div>
          <div className={styles.nodeLabelGroup}>
            <span className={styles.label}>{t('solarDashboard.flow.grid')}</span>
            <span className={styles.value}>
              {format(flow.gridKwh)}
              <small className={styles.unit}>kWh</small>
            </span>
          </div>
        </div>

        {/* Battery Node */}
        <div className={`${styles.node} ${styles.batteryNode}`} style={{ top: '82%', left: '26%' }}>
          <div className={styles.nodeCircle}>
            <BatteryCharging size={20} strokeWidth={2} />
            <span className={styles.batteryLevel}>{batterySoc}%</span>
          </div>
          <div className={styles.nodeLabelGroup}>
            <span className={styles.label}>{t('solarDashboard.flow.battery')}</span>
            <span className={styles.value}>
              {format(flow.batteryKwh)}
              <small className={styles.unit}>kWh</small>
            </span>
          </div>
        </div>

        {/* Power Load Node */}
        <div className={`${styles.node} ${styles.loadNode}`} style={{ top: '82%', left: '74%' }}>
          <div className={styles.nodeCircle}>
            <Home size={20} strokeWidth={2} />
          </div>
          <div className={styles.nodeLabelGroup}>
            <span className={styles.label}>{t('solarDashboard.flow.load')}</span>
            <span className={styles.value}>
              {format(flow.loadKwh)}
              <small className={styles.unit}>kWh</small>
            </span>
          </div>
        </div>
      </div>

      {/* Summary Telemetry Footer Bar */}
      <div className={styles.flowSummaryFooter}>
        <div className={styles.summaryPill}>
          <span className={styles.pillDot} style={{ background: '#f59e0b' }} />
          <span>PV Generation: <strong>{format(flow.pvKwh)} kWh</strong></span>
        </div>
        <div className={styles.summaryPill}>
          <span className={styles.pillDot} style={{ background: '#3b82f6' }} />
          <span>Grid Supply: <strong>{format(flow.gridKwh)} kWh</strong></span>
        </div>
        <div className={styles.summaryPill}>
          <span className={styles.pillDot} style={{ background: '#10b981' }} />
          <span>BESS Buffer: <strong>{batterySoc}% ({format(flow.batteryKwh)} kWh)</strong></span>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 2. BatterySocCard Component
// ============================================================================
interface BatterySocCardProps {
  percentage: number;
}

const BatterySocCard: React.FC<BatterySocCardProps> = ({ percentage }) => {
  const { t } = useI18n();

  const radius = 55;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <section className={`${styles.kpiCard} ${styles.columnCard}`}>
      <div className={styles.gaugeContainer}>
        <svg className={styles.svgRing} viewBox="0 0 110 110">
          <defs>
            <linearGradient id="batteryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
          <circle
            className={styles.circleBackground}
            cx="55"
            cy="55"
            r={normalizedRadius}
          />
          <circle
            className={`${styles.circleProgress} ${styles.batteryProgress}`}
            cx="55"
            cy="55"
            r={normalizedRadius}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className={styles.centerValue}>
          <span className={styles.percent}>{percentage}%</span>
          <Zap size={16} className={styles.icon} fill="currentColor" />
        </div>
      </div>
      <h2 className={styles.title}>{t('solarDashboard.kpi.batterySoc')}</h2>
    </section>
  );
};

// ============================================================================
// 3. SelfConsumptionCard Component
// ============================================================================
interface SelfConsumptionCardProps {
  percentage: number;
  pvPowerKw: number;
  loadPowerKw: number;
}

const SelfConsumptionCard: React.FC<SelfConsumptionCardProps> = ({
  percentage,
  pvPowerKw,
  loadPowerKw,
}) => {
  const { t } = useI18n();

  const radius = 55;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <section className={`${styles.kpiCard} ${styles.rowCard}`}>
      {/* SVG gauge progress */}
      <div className={styles.gaugeContainer}>
        <svg className={styles.svgRing} viewBox="0 0 110 110">
          <defs>
            <linearGradient id="selfConsumeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <circle
            className={styles.circleBackground}
            cx="55"
            cy="55"
            r={normalizedRadius}
          />
          <circle
            className={`${styles.circleProgress} ${styles.selfConsumptionProgress}`}
            cx="55"
            cy="55"
            r={normalizedRadius}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <span className={styles.centerValue}>{percentage}%</span>
      </div>

      {/* Metrics details */}
      <div className={styles.detailsWrapper}>
        <h2 className={styles.title}>{t('solarDashboard.kpi.selfConsumption')}</h2>
        <ul className={styles.metricsList}>
          <li className={styles.metricItem}>
            <span className={styles.label}>{t('solarDashboard.kpi.pvPower')}</span>
            <div className={styles.valueGroup}>
              <span className={styles.value}>{format(pvPowerKw)}</span>
              <span className={styles.unit}>kW</span>
            </div>
          </li>
          <li className={styles.metricItem}>
            <span className={styles.label}>{t('solarDashboard.kpi.loadPower')}</span>
            <div className={styles.valueGroup}>
              <span className={styles.value}>{format(loadPowerKw)}</span>
              <span className={styles.unit}>kW</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

// ============================================================================
// 4. PowerSummaryCard Component
// ============================================================================
interface PowerSummaryCardProps {
  importKw: number;
  exportKw: number;
  revenue: string;
}

const PowerSummaryCard: React.FC<PowerSummaryCardProps> = ({
  importKw,
  exportKw,
  revenue,
}) => {
  const { t } = useI18n();

  return (
    <section className={styles.powerCard}>
      {/* Imported Power */}
      <div className={styles.powerItem}>
        <div className={`${styles.iconWrapper} ${styles.importIcon}`}>
          <ArrowDownLeft size={22} strokeWidth={2.2} />
        </div>
        <div className={styles.info}>
          <span className={styles.label}>{t('solarDashboard.power.import')}</span>
          <div className={styles.valueGroup}>
            <span className={styles.value}>{format(importKw, 1)}</span>
            <span className={styles.unit}>kW</span>
          </div>
        </div>
      </div>

      {/* Exported Power */}
      <div className={styles.powerItem}>
        <div className={`${styles.iconWrapper} ${styles.exportIcon}`}>
          <ArrowUpRight size={22} strokeWidth={2.2} />
        </div>
        <div className={styles.info}>
          <span className={styles.label}>{t('solarDashboard.power.export')}</span>
          <div className={styles.valueGroup}>
            <span className={styles.value}>{format(exportKw, 1)}</span>
            <span className={styles.unit}>kW</span>
          </div>
        </div>
      </div>

      {/* Total Revenue */}
      <div className={styles.powerItem}>
        <div className={`${styles.iconWrapper} ${styles.revenueIcon}`}>
          <DollarSign size={22} strokeWidth={2.2} />
        </div>
        <div className={styles.info}>
          <span className={styles.label}>{t('solarDashboard.power.revenue')}</span>
          <div className={styles.valueGroup}>
            <span className={styles.value}>{revenue}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 5. CarbonReductionCard Component
// ============================================================================
interface CarbonReductionCardProps {
  todayKg: number;
  cumulativeKg: number;
  points: SolarCarbonPoint[];
}

const CarbonReductionCard: React.FC<CarbonReductionCardProps> = ({
  todayKg,
  cumulativeKg,
  points,
}) => {
  const { t } = useI18n();

  const chartData = points.map((point) => ({
    name: t(point.labelKey),
    value: point.valueKg,
  }));

  return (
    <section className={styles.carbonCard}>
      <div className={styles.carbonHeader}>
        <div className={styles.carbonTitleGroup}>
          <Leaf size={20} className={styles.icon} fill="currentColor" />
          <h2>{t('solarDashboard.carbon.title')}</h2>
        </div>
        <div className={styles.carbonStatsGroup}>
          <div className={styles.carbonStatItem}>
            <span className={`${styles.bullet} ${styles.todayBullet}`} />
            <div className={styles.details}>
              <span className={styles.label}>{t('solarDashboard.carbon.today')}</span>
              <span className={styles.value}>{format(todayKg, 1)} kg</span>
            </div>
          </div>
          <div className={styles.carbonStatItem}>
            <span className={`${styles.bullet} ${styles.totalBullet}`} />
            <div className={styles.details}>
              <span className={styles.label}>{t('solarDashboard.carbon.cumulative')}</span>
              <span className={styles.value}>{cumulativeKg.toLocaleString()} kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 5, left: -24, bottom: 5 }}>
            <defs>
              <linearGradient id="carbonBarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--border-color, #edf2f7)" strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--text-muted, #7f93b2)', fontSize: 11 }}
              dy={8}
            />
            <YAxis hide domain={[0, 'dataMax + 1']} />
            <Tooltip
              contentStyle={{
                border: '1px solid var(--border-color, #e2e8f0)',
                borderRadius: 8,
                background: 'var(--bg-secondary, #ffffff)',
                color: 'var(--text-primary, #2E56A6)',
                boxShadow: '0 4px 12px rgba(46, 86, 166, 0.08)',
              }}
              cursor={{ fill: 'var(--neutral-light, rgba(0,0,0,0.02))' }}
              formatter={(value: number) => [`${value} kg`, t('solarDashboard.carbon.title')]}
            />
            <Bar
              dataKey="value"
              fill="url(#carbonBarGrad)"
              radius={[6, 6, 0, 0]}
              maxBarSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

// ============================================================================
// Main Presentation Card Component: SolarDashboardSectionCard
// ============================================================================
export const SolarDashboardSectionCard: React.FC<SolarDashboardPageCardProps> = ({ data }) => {
  const { t } = useI18n();
  const { flow, kpi, power, carbon, weather } = data;

  return (
    <article className={styles.dashboard}>
      <header className={styles.dashboardHeader}>
        <div>
          <h1>{t(data.titleKey)}</h1>
          <p>{t(data.subtitleKey)}</p>
        </div>
        <div className={styles.liveBadge}>
          <span /> {t('solarDashboard.live')}
        </div>
      </header>

      <div className={styles.dashboardGrid}>
        {/* Left column flow chart card */}
        <SolarFlowCard
          weather={weather}
          flow={flow}
          batterySoc={kpi.batterySocPercent}
        />

        {/* Right column detailed stats */}
        <div className={styles.mainColumn}>
          <div className={styles.kpiGrid}>
            <BatterySocCard percentage={kpi.batterySocPercent} />
            <SelfConsumptionCard
              percentage={kpi.selfConsumptionPercent}
              pvPowerKw={kpi.pvPowerKw}
              loadPowerKw={kpi.loadPowerKw}
            />
          </div>

          <PowerSummaryCard
            importKw={power.importKw}
            exportKw={power.exportKw}
            revenue={power.revenue}
          />

          <CarbonReductionCard
            todayKg={carbon.todayKg}
            cumulativeKg={carbon.cumulativeKg}
            points={carbon.points}
          />
        </div>
      </div>
    </article>
  );
};

export const SolarDashboardPageCard = SolarDashboardSectionCard;

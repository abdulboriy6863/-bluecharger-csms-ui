import React from 'react';
import { BatteryCharging, CloudSun, Sun, Zap, Home } from 'lucide-react';
import styles from '../../../scss/systemHome/SolarFlowCard.module.scss';
import { useI18n } from '../../../i18n/I18nContext';
import type { SolarDashboardWeather, SolarDashboardFlowMetrics } from '../../../libs/types/dashboard/solarDashboard';

interface SolarFlowCardProps {
  weather: SolarDashboardWeather;
  flow: SolarDashboardFlowMetrics;
  batterySoc: number;
}

const format = (value: number, digits = 2) => value.toFixed(digits);

export const SolarFlowCard: React.FC<SolarFlowCardProps> = ({ weather, flow, batterySoc }) => {
  const { t } = useI18n();

  // Determine which flows are active based on values > 0
  const isPvActive = flow.pvKwh > 0;
  const isGridActive = flow.gridKwh > 0;
  const isBatteryActive = flow.batteryKwh > 0;
  const isLoadActive = flow.loadKwh > 0;

  return (
    <section className={styles.flowCard} aria-label={t('solarDashboard.flow.aria')}>
      {/* Weather Header */}
      <div className={styles.weatherWidget}>
        <div className={styles.weatherInfo}>
          <div className={styles.iconWrapper}>
            <CloudSun size={24} strokeWidth={2} aria-hidden="true" />
          </div>
          <div>
            <div className={styles.temperature}>{weather.temperatureC}°C</div>
            <div className={styles.plantName}>{t(weather.plantNameKey)}</div>
          </div>
        </div>
        <div className={styles.statusIndicator}>
          <span className={styles.dot} />
          <span>{t('solarDashboard.live')}</span>
        </div>
      </div>

      {/* Diagram Area */}
      <div className={styles.diagramContainer}>
        {/* SVG Connections Layer */}
        <svg className={styles.svgConnections} viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">
          {/* Defs for gradients & shadow filters */}
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
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Static Paths */}
          <path d="M 250,75 L 250,215" className={styles.connectionPath} />
          <path d="M 285,240 L 385,240" className={styles.connectionPath} />
          <path d="M 220,270 L 140,375" className={styles.connectionPath} />
          <path d="M 155,410 L 345,410" className={styles.connectionPath} />

          {/* Animated Flow Particles */}
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
            d="M 155,410 L 345,410"
            className={`${styles.flowParticle} ${isLoadActive ? styles.active : ''}`}
            stroke="url(#loadGlow)"
            filter="url(#glowEffect)"
          />
        </svg>

        {/* Nodes Layer */}
        {/* 1. Solar PV Node */}
        <div className={`${styles.node} ${styles.sunNode}`} style={{ top: '15%', left: '50%' }}>
          <div className={styles.nodeCircle}>
            <Sun size={32} strokeWidth={1.8} />
          </div>
          <div className={styles.nodeLabelGroup}>
            <span className={styles.label}>{t('solarDashboard.flow.pv')}</span>
            <span className={styles.value}>
              {format(flow.pvKwh)}
              <small className={styles.unit}>kWh</small>
            </span>
          </div>
        </div>

        {/* 2. Inverter / Solar Panel (Center Node) */}
        <div className={`${styles.node} ${styles.inverterNode}`} style={{ top: '48%', left: '50%' }}>
          <div className={styles.nodeCircle}>
            <div className={styles.solarPanelWrap}>
              <div className={styles.solarPanelSkew}>
                <div className={styles.panelCells} />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Grid Node */}
        <div className={`${styles.node} ${styles.gridNode}`} style={{ top: '48%', left: '80%' }}>
          <div className={styles.nodeCircle}>
            <Zap size={28} strokeWidth={1.8} />
          </div>
          <div className={styles.nodeLabelGroup}>
            <span className={styles.label}>{t('solarDashboard.flow.grid')}</span>
            <span className={styles.value}>
              {format(flow.gridKwh)}
              <small className={styles.unit}>kWh</small>
            </span>
          </div>
        </div>

        {/* 4. Battery Node */}
        <div className={`${styles.node} ${styles.batteryNode}`} style={{ top: '82%', left: '26%' }}>
          <div className={styles.nodeCircle}>
            <BatteryCharging size={26} strokeWidth={1.8} />
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

        {/* 5. Power Load Node */}
        <div className={`${styles.node} ${styles.loadNode}`} style={{ top: '82%', left: '74%' }}>
          <div className={styles.nodeCircle}>
            <Home size={26} strokeWidth={1.8} />
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
    </section>
  );
};

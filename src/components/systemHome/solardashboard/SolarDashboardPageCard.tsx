import React from 'react';
import styles from '../../../scss/systemHome/SolarDashboardPageCard.module.scss';
import { useI18n } from '../../../i18n/I18nContext';
import type { SolarDashboardPageCardProps } from '../../../libs/types/dashboard/solarDashboard';
import { SolarFlowCard } from './SolarFlowCard';
import { BatterySocCard } from './BatterySocCard';
import { SelfConsumptionCard } from './SelfConsumptionCard';
import { PowerSummaryCard } from './PowerSummaryCard';
import { CarbonReductionCard } from './CarbonReductionCard';

export const SolarDashboardPageCard: React.FC<SolarDashboardPageCardProps> = ({ data }) => {
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
        {/* Left Column: Real-Time Flow diagram & Weather widget */}
        <SolarFlowCard 
          weather={weather} 
          flow={flow} 
          batterySoc={kpi.batterySocPercent} 
        />

        {/* Right Column: Detail metrics, gauges and carbon charts */}
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

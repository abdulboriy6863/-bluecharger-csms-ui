import React from 'react';
import styles from '../../../scss/systemHome/GeneralStatisticsSection.module.scss';
import { GeneralStatisticsCard } from './GeneralStatisticsCard';
import { mockGeneralStatistics } from '../../../data/mockGeneralStatistics';
import { UserPlus, BatteryCharging, Fuel } from 'lucide-react';
import { useI18n } from '../../../i18n/I18nContext';

const EvStationIcon: React.FC<{ size?: number }> = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 22V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17" />
    <path d="M9 7h4" />
    <path d="M5 12h12" />
    <path d="M19 12v3a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-4l-2-2" />
  </svg>
);

export const GeneralStatisticsSection: React.FC = () => {
  const { t } = useI18n();
  const data = mockGeneralStatistics;

  return (
    <section className={styles.sectionWrapper} aria-label="General Statistics Section">
      <div className={styles.cardGrid}>

        {/* Box 1: Station Count */}
        <GeneralStatisticsCard
          title={t('dashboard.stats.stationsTitle')}
          subTitle={t('dashboard.stats.prevMonthBasis')}
          icon={<EvStationIcon size={26} />}
          variant="rose"
        >
          <span className={styles.primaryValue}>
            {data.station.count.toLocaleString()}
          </span>
          <span className={styles.unitText}>{t('dashboard.stats.units.locations')}</span>
          {data.station.momChange > 0 && (
            <span className={styles.trendBadgeUp}>
              ▲ {data.station.momChange}
            </span>
          )}
        </GeneralStatisticsCard>

        {/* Box 2: Charger Count */}
        <GeneralStatisticsCard
          title={t('dashboard.stats.chargersTitle')}
          icon={<Fuel size={26} />}
          variant="blue"
        >
          <div className={styles.rowsContainer}>
            <div className={styles.statRow}>
              <span className={styles.rowLabel}>{t('dashboard.stats.rapid')}</span>
              <span className={styles.rowValue}>
                {data.charger.rapidCount.toLocaleString()}
              </span>
              <span className={styles.rowUnit}>{t('dashboard.stats.units.chargers')}</span>
              <span className={styles.dotSeparator}>·</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.rowLabel}>{t('dashboard.stats.slow')}</span>
              <span className={styles.rowValue}>
                {data.charger.slowCount.toLocaleString()}
              </span>
              <span className={styles.rowUnit}>{t('dashboard.stats.units.chargers')}</span>
              <span className={styles.dotSeparator}>·</span>
            </div>
          </div>
        </GeneralStatisticsCard>

        {/* Box 3: Energy Delivered */}
        <GeneralStatisticsCard
          title={t('dashboard.stats.energyTitle')}
          icon={<BatteryCharging size={26} />}
          variant="mint"
        >
          <div className={styles.rowsContainer}>
            <div className={styles.statRow}>
              <span className={styles.rowLabel}>{t('dashboard.stats.rapid')}</span>
              <span className={styles.rowValue}>
                {data.energy.rapid.kwh.toLocaleString()}
              </span>
              <span className={styles.rowUnit}>kWh</span>
              <span className={styles.trendBadgeDown}>
                ▼ {data.energy.rapid.changeKwh.toLocaleString()} kWh ({data.energy.rapid.changePercent}%)
              </span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.rowLabel}>{t('dashboard.stats.slow')}</span>
              <span className={styles.rowValue}>
                {data.energy.slow.kwh.toLocaleString()}
              </span>
              <span className={styles.rowUnit}>kWh</span>
              <span className={styles.trendBadgeDown}>
                ▼ {data.energy.slow.changeKwh.toLocaleString()} kWh ({data.energy.slow.changePercent}%)
              </span>
            </div>
          </div>
        </GeneralStatisticsCard>

        {/* Box 4: Member Registrations */}
        <GeneralStatisticsCard
          title={t('dashboard.stats.membersTitle')}
          icon={<UserPlus size={26} />}
          variant="lavender"
        >
          <span className={styles.primaryValue}>
            {data.member.count.toLocaleString()}
          </span>
          <span className={styles.unitText}>{t('dashboard.stats.units.members')}</span>
          <span className={styles.dotSeparator}>·</span>
        </GeneralStatisticsCard>

      </div>
    </section>
  );
};

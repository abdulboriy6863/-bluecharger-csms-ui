import React from 'react';
import styles from '../../../scss/systemHome/GeneralStatisticsSection.module.scss';
import { GeneralStatisticsCard } from './GeneralStatisticsCard';
import { mockGeneralStatistics } from '../../../data/mockGeneralStatistics';
import { BatteryCharging, Fuel, UsersRound } from 'lucide-react';
import { useI18n } from '../../../i18n/I18nContext';

export const GeneralStatisticsSection: React.FC = () => {
  const { t } = useI18n();
  const data = mockGeneralStatistics;

  return (
    <section className={styles.sectionWrapper} aria-label="General Statistics Section">
      <div className={styles.cardGrid}>
        <GeneralStatisticsCard
          title={t('dashboard.stats.stationsTitle')}
          subTitle={t('dashboard.stats.prevMonthBasis')}
          icon={<Fuel size={36} />}
          metrics={[
            {
              value: data.station.count.toLocaleString(),
              unit: t('dashboard.stats.units.locations'),
              trend: {
                direction: data.station.trendDirection,
                value: String(data.station.momChange),
                tone: 'danger',
              },
            },
          ]}
        />

        <GeneralStatisticsCard
          title={t('dashboard.stats.chargersTitle')}
          icon={<Fuel size={36} />}
          metrics={[
            {
              label: t('dashboard.stats.rapid'),
              value: data.charger.rapidCount.toLocaleString(),
              unit: t('dashboard.stats.units.chargers'),
              trailing: '-',
            },
            {
              label: t('dashboard.stats.slow'),
              value: data.charger.slowCount.toLocaleString(),
              unit: t('dashboard.stats.units.chargers'),
              trailing: '-',
            },
          ]}
        />

        <GeneralStatisticsCard
          title={t('dashboard.stats.energyTitle')}
          icon={<BatteryCharging size={36} />}
          size="wide"
          metrics={[
            {
              label: t('dashboard.stats.rapid'),
              value: data.energy.rapid.kwh.toLocaleString(),
              unit: 'kWh',
              trend: {
                direction: data.energy.rapid.trendDirection,
                value: `${data.energy.rapid.changeKwh.toLocaleString()} kWh (${data.energy.rapid.changePercent}%)`,
                tone: 'info',
              },
            },
            {
              label: t('dashboard.stats.slow'),
              value: data.energy.slow.kwh.toLocaleString(),
              unit: 'kWh',
              trend: {
                direction: data.energy.slow.trendDirection,
                value: `${data.energy.slow.changeKwh.toLocaleString()} kWh (${data.energy.slow.changePercent}%)`,
                tone: 'info',
              },
            },
          ]}
        />

        <GeneralStatisticsCard
          title={t('dashboard.stats.membersTitle')}
          icon={<UsersRound size={36} />}
          metrics={[
            {
              value: data.member.count.toLocaleString(),
              unit: t('dashboard.stats.units.members'),
              trailing: '-',
            },
          ]}
        />
      </div>
    </section>
  );
};

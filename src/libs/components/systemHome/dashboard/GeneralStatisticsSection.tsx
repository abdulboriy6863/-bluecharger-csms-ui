import React from 'react';
import styles from '../../../../scss/systemHome/GeneralStatisticsSection.module.scss';
import { GeneralStatisticsCard } from './GeneralStatisticsCard';
import { mockGeneralStatistics } from '../../../../data/mockGeneralStatistics';
import { BatteryCharging, Calendar, Car, Download, Fuel, UsersRound, Zap } from 'lucide-react';
import { useI18n } from '../../../../i18n/I18nContext';

export const GeneralStatisticsSection: React.FC = () => {
  const { t } = useI18n();
  const data = mockGeneralStatistics;

  return (
    <section className={styles.sectionWrapper} aria-label="General Statistics Section">
      {/* Top Header Row matching Stitch Reference Image */}
      <div className={styles.headerBar}>
        <div className={styles.titleGroup}>
          <span className={styles.headerSubtitle}>{t('dashboard.header.networkOverview')}</span>
          <h1 className={styles.headerTitle}>{t('dashboard.header.operationsDashboard')}</h1>
        </div>
        <div className={styles.headerActions}>
          <button type="button" className={styles.dateFilterButton}>
            <Calendar size={15} />
            <span>{t('dashboard.header.last7Days')}</span>
          </button>
          <button type="button" className={styles.exportReportButton}>
            <Download size={15} />
            <span>{t('dashboard.header.exportReport')}</span>
          </button>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className={styles.cardGrid}>
        {/* Card 1: STATIONS */}
        <GeneralStatisticsCard
          topLabel={t('dashboard.stats.stations')}
          accentTone="blue"
          watermarkIcon={<Zap className={styles.watermarkIcon} />}
        >
          <div className={styles.singleMetricLayout}>
            <div className={styles.metricBigRow}>
              <span className={styles.bigValue}>{data.station.count.toLocaleString()}</span>
              <span className={styles.unitText}>{t('dashboard.stats.locations')}</span>
            </div>
            <div className={styles.trendRow}>
              <span className={styles.greenTrend}>↗ +{data.station.momChange} MoM</span>
            </div>
          </div>
        </GeneralStatisticsCard>

        {/* Card 2: CONNECTOR FLEET */}
        <GeneralStatisticsCard
          topLabel={t('dashboard.stats.connectorFleet')}
          accentTone="blue"
          watermarkIcon={<Car className={styles.watermarkIcon} />}
        >
          <div className={styles.listMetricsLayout}>
            <div className={styles.metricDetailRow}>
              <span className={styles.metricName}>{t('dashboard.stats.fastCharge')}</span>
              <span className={styles.metricNumber}>{data.charger.rapidCount.toLocaleString()}</span>
            </div>
            <div className={styles.metricDetailRow}>
              <span className={styles.metricName}>{t('dashboard.stats.slowCharge')}</span>
              <span className={styles.metricNumber}>{data.charger.slowCount.toLocaleString()}</span>
            </div>
          </div>
        </GeneralStatisticsCard>

        {/* Card 3: ENERGY (KWH) */}
        <GeneralStatisticsCard
          topLabel={t('dashboard.stats.energyKwh')}
          accentTone="blue"
          watermarkIcon={<BatteryCharging className={styles.watermarkIcon} />}
        >
          <div className={styles.listMetricsLayout}>
            <div className={styles.metricDetailRow}>
              <span className={styles.metricName}>{t('dashboard.stats.fastCharge')}</span>
              <div className={styles.valueGroup}>
                <span className={styles.metricNumber}>{data.energy.rapid.kwh.toLocaleString()} kWh</span>
                <span className={styles.changeBadge}>(-{data.energy.rapid.changePercent}%)</span>
              </div>
            </div>
            <div className={styles.metricDetailRow}>
              <span className={styles.metricName}>{t('dashboard.stats.slowCharge')}</span>
              <div className={styles.valueGroup}>
                <span className={styles.metricNumber}>{data.energy.slow.kwh.toLocaleString()} kWh</span>
                <span className={styles.changeBadge}>(-{data.energy.slow.changePercent}%)</span>
              </div>
            </div>
          </div>
        </GeneralStatisticsCard>

        {/* Card 4: ACTIVE MEMBERS */}
        <GeneralStatisticsCard
          topLabel={t('dashboard.stats.activeMembers')}
          accentTone="blue"
          watermarkIcon={<UsersRound className={styles.watermarkIcon} />}
        >
          <div className={styles.singleMetricLayout}>
            <div className={styles.metricBigRow}>
              <span className={styles.bigValue}>{data.member.count.toLocaleString()}</span>
              <span className={styles.unitText}>{t('dashboard.stats.onlineNow')}</span>
            </div>
            <div className={styles.avatarsRow}>
              <div className={styles.avatarGroup}>
                <div className={styles.avatar} style={{ backgroundColor: '#bfdbfe' }} />
                <div className={styles.avatar} style={{ backgroundColor: '#93c5fd' }} />
                <div className={styles.avatar} style={{ backgroundColor: '#60a5fa' }} />
                <div className={styles.avatarMore}>+12</div>
              </div>
            </div>
          </div>
        </GeneralStatisticsCard>
      </div>
    </section>
  );
};

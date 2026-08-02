import React from 'react';
import styles from '../../scss/systemHome/OverviewDashboard.module.scss';
import { EnergyTrendChart } from './EnergyTrendChart';
import { StatusDistribution } from './StatusDistribution';
import { RecentAlerts } from './RecentAlerts';
import { Card } from '../common/Card/Card';
import { Button } from '../common/Button/Button';
import { GeneralStatisticsSection } from '../systemHome/dashboard/GeneralStatisticsSection';
import { mockEnergyTrend, mockStatusDistribution } from '../../data/mockDashboard';
import { mockAlerts } from '../../data/mockEvents';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';

interface OverviewDashboardProps {
  onNavigateMonitoring: () => void;
  onSelectCharger: (chargerId: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigateMonitoring,
  onSelectCharger
}) => {
  const { t } = useI18n();
  return (
    <div className={styles.dashboard}>
      <div className={styles.headerArea}>
        <div>
          <h1 className={styles.pageTitle}>{t('overview.title')}</h1>
          <p className={styles.pageSubtitle}>{t('overview.subtitle')}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="secondary" icon={<RefreshCw size={15} />}>
            {t('overview.refresh')}
          </Button>
          <Button variant="primary" icon={<ArrowRight size={15} />} iconPosition="right" onClick={onNavigateMonitoring}>
            {t('overview.monitoring')}
          </Button>
        </div>
      </div>

      <GeneralStatisticsSection />

      <div className={styles.contentGrid}>
        <div className={styles.leftCol}>
          <Card
            title={t('overview.energyTitle')}
            subtitle={t('overview.energySubtitle')}
          >
            <EnergyTrendChart data={mockEnergyTrend} />
          </Card>

          <Card
            title={t('overview.alertsTitle')}
            subtitle={t('overview.alertsSubtitle')}
            action={
              <Button variant="ghost" size="sm" onClick={onNavigateMonitoring}>
                {t('overview.viewChargers')}
              </Button>
            }
          >
            <RecentAlerts alerts={mockAlerts} onSelectCharger={onSelectCharger} />
          </Card>
        </div>

        <div className={styles.rightCol}>
          <Card
            title={t('overview.statusTitle')}
            subtitle={t('overview.statusSubtitle')}
          >
            <StatusDistribution data={mockStatusDistribution} />
          </Card>

          <Card title={t('overview.regionalTitle')}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: 600 }}>Tashkent Central Hub</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>42 / 45 Online</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: 600 }}>Samarkand Silk Road</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>28 / 28 Online</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: 600 }}>Seoul Smart Grid</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>38 / 40 Online</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600 }}>Busan Maritime Depot</span>
                <span style={{ color: '#ef4444', fontWeight: 600 }}>24 / 29 Online (1 Fault)</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

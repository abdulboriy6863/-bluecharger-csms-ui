import React from 'react';
import styles from '../../scss/systemHome/OverviewDashboard.module.scss';
import { Button } from '../common/Button/Button';
import { GeneralStatisticsSection } from '../systemHome/dashboard/GeneralStatisticsSection';
import { ChargerStatusSection } from '../systemHome/dashboard/ChargerStatusSection';
import { InfrastructureUsageSection } from '../systemHome/dashboard/InfrastructureUsageSection';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';
import type { OverviewDashboardProps } from '../../libs/types/overview/overview';

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigateMonitoring,
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

      <div className={styles.sectionStack}>
        <ChargerStatusSection />
        <InfrastructureUsageSection />
      </div>
    </div>
  );
};

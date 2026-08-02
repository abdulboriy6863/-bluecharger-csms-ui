import React from 'react';
import styles from '../../../scss/systemHome/DashboardPage.module.scss';
import { OverviewDashboard } from '../../../components/overview/OverviewDashboard';

interface DashboardPageProps {
  onNavigateMonitoring: () => void;
  onSelectCharger: (chargerId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigateMonitoring,
  onSelectCharger,
}) => (
  <section className={styles.page} aria-label="System Home Dashboard">
    <OverviewDashboard
      onNavigateMonitoring={onNavigateMonitoring}
      onSelectCharger={onSelectCharger}
    />
  </section>
);

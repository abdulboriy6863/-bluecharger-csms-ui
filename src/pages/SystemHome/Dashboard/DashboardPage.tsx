import React from 'react';
import { OverviewDashboard } from '../../../components/overview/OverviewDashboard';
import styles from './DashboardPage.module.scss';

interface DashboardPageProps {
  onNavigateMonitoring: () => void;
  onSelectCharger: (chargerId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = (props) => (
  <section className={styles.page} aria-label="System Home Dashboard">
    <OverviewDashboard {...props} />
  </section>
);

import React from 'react';
import styles from '../../../scss/systemHome/DashboardPage.module.scss';
import { OverviewDashboard } from '../../../components/overview/OverviewDashboard';
import type { DashboardPageProps } from '../../../libs/types/pageProps';

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigateMonitoring,
}) => (
  <section className={styles.page} aria-label="System Home Dashboard">
    <OverviewDashboard
      onNavigateMonitoring={onNavigateMonitoring}
    />
  </section>
);

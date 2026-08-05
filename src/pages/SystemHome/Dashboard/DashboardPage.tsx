import React from 'react';
import styles from '../../../scss/systemHome/DashboardPage.module.scss';
import { OverviewDashboard } from '../../../libs/components/overview/OverviewDashboard';
import type { DashboardPageProps } from '../../../libs/types/pages/pageProps';

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigateMonitoring,
}) => (
  <section className={styles.page} aria-label="System Home Dashboard">
    <OverviewDashboard
      onNavigateMonitoring={onNavigateMonitoring}
    />
  </section>
);

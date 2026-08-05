import React from 'react';
import { OverviewDashboard } from '../../../libs/components/overview/OverviewDashboard';
import type { DashboardPageProps } from '../../../libs/types/pages/pageProps';

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigateMonitoring,
}) => (
  <section aria-label="System Home Dashboard">
    <OverviewDashboard
      onNavigateMonitoring={onNavigateMonitoring}
    />
  </section>
);

import React from 'react';
import styles from '../../../scss/systemHome/OverviewDashboard.module.scss';
import { GeneralStatisticsSection } from '../systemHome/dashboard/GeneralStatisticsSection';
import { ChargerStatusSection } from '../systemHome/dashboard/ChargerStatusSection';
import { InfrastructureUsageSection } from '../systemHome/dashboard/InfrastructureUsageSection';
import type { OverviewDashboardProps } from '../../types/overview/overview';

export const OverviewDashboard: React.FC<OverviewDashboardProps> = () => {
  return (
    <div className={styles.dashboard}>
      <GeneralStatisticsSection />

      <div className={styles.sectionStack}>
        <ChargerStatusSection />
        <InfrastructureUsageSection />
      </div>
    </div>
  );
};

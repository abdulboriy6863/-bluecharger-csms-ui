import React from 'react';
import styles from '../../../../scss/systemHome/FirstHomePage.module.scss';
import { GeneralStatisticsSection } from '../../../../libs/components/systemHome/dashboard/GeneralStatisticsSection';
import { ChargerStatusSection } from '../../../../libs/components/systemHome/dashboard/ChargerStatusSection';
import { InfrastructureUsageSection } from '../../../../libs/components/systemHome/dashboard/InfrastructureUsageSection';

export const FirstHomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Section 1: General Statistics */}
      <GeneralStatisticsSection />

      {/* Section 2: Charger Operation & Connector Status */}
      <ChargerStatusSection />

      {/* Section 3: Infrastructure Status & Usage Statistics */}
      <InfrastructureUsageSection />
    </div>
  );
};

export default FirstHomePage;

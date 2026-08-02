import React from 'react';
import styles from './FirstHomePage.module.scss';
import { GeneralStatisticsSection } from '../../../../components/systemHome/dashboard/GeneralStatisticsSection';
import { ChargerStatusSection } from '../../../../components/systemHome/dashboard/ChargerStatusSection';
import { AdvertisementSection } from '../../../../components/systemHome/dashboard/AdvertisementSection';
import { InfrastructureUsageSection } from '../../../../components/systemHome/dashboard/InfrastructureUsageSection';
import { FooterSection } from '../../../../components/systemHome/dashboard/FooterSection';

export const FirstHomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Section 1: General Statistics */}
      <GeneralStatisticsSection />

      {/* Section 2: Charger Operation & Connector Status */}
      <ChargerStatusSection />

      {/* Section 3: Advertisement (Company Video & Promo) */}
      <AdvertisementSection />

      {/* Section 4: Infrastructure Status & Usage Statistics */}
      <InfrastructureUsageSection />

      {/* Section 5: Footer */}
      <FooterSection />
    </div>
  );
};

export default FirstHomePage;

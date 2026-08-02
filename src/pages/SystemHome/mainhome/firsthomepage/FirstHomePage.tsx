import React from 'react';
import styles from './FirstHomePage.module.scss';
import { GeneralStatisticsSection } from './sections/GeneralStatisticsSection';
import { ChargerStatusSection } from './sections/ChargerStatusSection';
import { AdvertisementSection } from './sections/AdvertisementSection';
import { InfrastructureUsageSection } from './sections/InfrastructureUsageSection';
import { FooterSection } from './sections/FooterSection';

export const FirstHomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* 1. General Statistics */}
      <GeneralStatisticsSection />

      {/* 2. Charger Operation Status & Charger Status by Connector */}
      <ChargerStatusSection />

      {/* 3. Advertisement (Company Video / Promo) */}
      <AdvertisementSection />

      {/* 4. Infrastructure Status & Charger Usage Statistics */}
      <InfrastructureUsageSection />

      {/* 5. Footer */}
      <FooterSection />
    </div>
  );
};

export default FirstHomePage;

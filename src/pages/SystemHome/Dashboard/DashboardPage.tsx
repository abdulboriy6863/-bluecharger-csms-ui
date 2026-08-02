import React from 'react';
import { FirstHomePage } from '../mainhome/firsthomepage/FirstHomePage';
import styles from '../../../styles/systemHome/DashboardPage.module.scss';

interface DashboardPageProps {
  onNavigateMonitoring?: () => void;
  onSelectCharger?: (chargerId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = () => (
  <section className={styles.page} aria-label="System Home Dashboard">
    <FirstHomePage />
  </section>
);


import React from 'react';
import styles from '../../../scss/systemHome/SolarDashboardPage.module.scss';
import { SolarDashboardPageCard } from '../../../libs/components/systemHome/solardashboard/SolarDashboardPageCard';
import { mockSolarDashboard } from '../../../data/mockSolarDashboard';
import { useI18n } from '../../../i18n/I18nContext';

export const SolarDashboardPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <section className={styles.page} aria-label={t('home.solar')}>
      <SolarDashboardPageCard data={mockSolarDashboard} />
    </section>
  );
};

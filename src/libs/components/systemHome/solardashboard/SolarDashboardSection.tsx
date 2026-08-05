import React from 'react';
import styles from '../../../../scss/systemHome/SolarDashboardSectionCard.module.scss';
import { SolarDashboardSectionCard } from './SolarDashboardSectionCard';
import { mockSolarDashboard } from '../../../../data/mockSolarDashboard';
import { useI18n } from '../../../../i18n/I18nContext';

export const SolarDashboardSection: React.FC = () => {
  const { t } = useI18n();

  return (
    <section className={styles.page} aria-label={t('home.solar')}>
      <SolarDashboardSectionCard data={mockSolarDashboard} />
    </section>
  );
};

export default SolarDashboardSection;

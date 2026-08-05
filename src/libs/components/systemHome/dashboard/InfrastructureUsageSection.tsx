import React from 'react';
import styles from '../../../../scss/systemHome/DashboardSections.module.scss';
import { mockInfrastructureUsage } from '../../../../data/mockInfrastructureUsage';
import { useI18n } from '../../../../i18n/I18nContext';
import { InfrastructureUsageSectionCard } from './InfrastructureUsageSectionCard';

export const InfrastructureUsageSection: React.FC = () => {
  const { t } = useI18n();

  return (
    <section className={styles.infrastructureUsageSection} aria-label={t('dashboard.infrastructure.aria')}>
      <InfrastructureUsageSectionCard data={mockInfrastructureUsage} />
    </section>
  );
};

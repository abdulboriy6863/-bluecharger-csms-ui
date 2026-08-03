import React from 'react';
import { Sun } from 'lucide-react';
import styles from '../../../scss/systemHome/SolarDashboardPageCard.module.scss';
import { useI18n } from '../../../i18n/I18nContext';
import type { SolarDashboardPageCardProps } from '../../../libs/types/dashboard/solarDashboard';

export const SolarDashboardPageCard: React.FC<SolarDashboardPageCardProps> = ({
  titleKey,
  children,
}) => {
  const { t } = useI18n();

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <Sun className={styles.icon} size={22} aria-hidden="true" />
        <h1>{t(titleKey)}</h1>
      </header>
      {children && <div className={styles.content}>{children}</div>}
    </article>
  );
};

import React from 'react';
import styles from '../../../scss/systemHome/GeneralStatisticsSection.module.scss';

interface GeneralStatisticsCardProps {
  title: string;
  subTitle?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const GeneralStatisticsCard: React.FC<GeneralStatisticsCardProps> = ({
  title,
  subTitle,
  icon,
  children
}) => {
  return (
    <div className={styles.statCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitleGroup}>
          <span className={styles.title}>{title}</span>
          {subTitle && <span className={styles.subTitle}>{subTitle}</span>}
        </div>
        <div className={styles.cardIcon}>{icon}</div>
      </div>
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
};

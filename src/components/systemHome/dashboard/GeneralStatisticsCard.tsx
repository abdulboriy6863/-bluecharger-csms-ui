import React from 'react';
import styles from '../../../scss/systemHome/GeneralStatisticsSection.module.scss';
import clsx from 'clsx';

export type CardVariant = 'rose' | 'blue' | 'mint' | 'lavender';

interface GeneralStatisticsCardProps {
  title: string;
  subTitle?: string;
  icon: React.ReactNode;
  variant?: CardVariant;
  children: React.ReactNode;
}

export const GeneralStatisticsCard: React.FC<GeneralStatisticsCardProps> = ({
  title,
  subTitle,
  icon,
  variant = 'blue',
  children
}) => {
  const variantClassMap: Record<CardVariant, string> = {
    rose: styles.cardSoftRose,
    blue: styles.cardSoftBlue,
    mint: styles.cardSoftMint,
    lavender: styles.cardSoftLavender
  };

  return (
    <div className={clsx(styles.statCard, variantClassMap[variant])}>
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

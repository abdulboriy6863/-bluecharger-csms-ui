import React from 'react';
import styles from './Badge.module.scss';
import clsx from 'clsx';
import { ChargerStatus } from '../../../types/charger';

interface BadgeProps {
  status: ChargerStatus | 'neutral';
  label?: string;
  showDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ status, label, showDot = true }) => {
  const statusClass = status.toLowerCase() as keyof typeof styles;

  return (
    <span className={clsx(styles.badge, styles[statusClass])}>
      {showDot && <span className={styles.dot} />}
      {label || status}
    </span>
  );
};

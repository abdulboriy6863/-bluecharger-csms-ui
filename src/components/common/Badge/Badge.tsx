import React from 'react';
import styles from '../../../scss/common/Badge.module.scss';
import clsx from 'clsx';
import { ChargerStatus } from '../../../types/charger';
import { useI18n } from '../../../i18n/I18nContext';

interface BadgeProps {
  status: ChargerStatus | 'neutral';
  label?: string;
  showDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ status, label, showDot = true }) => {
  const { t } = useI18n();
  const statusClass = status.toLowerCase() as keyof typeof styles;
  const statusKey: Record<string, string> = {
    Available: 'monitoring.available', Charging: 'monitoring.charging', Reserved: 'monitoring.reserved',
    Faulted: 'monitoring.faulted', Offline: 'monitoring.offline',
  };

  return (
    <span className={clsx(styles.badge, styles[statusClass])}>
      {showDot && <span className={styles.dot} />}
      {label || t(statusKey[status] || status)}
    </span>
  );
};

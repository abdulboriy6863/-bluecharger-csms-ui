import React from 'react';
import styles from '../../scss/monitoring/StatusCounters.module.scss';
import clsx from 'clsx';
import { useI18n } from '../../i18n/I18nContext';
import type { StatusCountersProps } from '../../libs/types/monitoring';

export const StatusCounters: React.FC<StatusCountersProps> = ({
  selectedStatus,
  onSelectStatus,
  statusCounts
}) => {
  const { t } = useI18n();
  const items = [
    { id: 'ALL', label: t('monitoring.allChargers'), count: statusCounts.ALL || 0, color: '#2563eb' },
    { id: 'Available', label: t('monitoring.available'), count: statusCounts.Available || 0, color: '#10b981' },
    { id: 'Charging', label: t('monitoring.charging'), count: statusCounts.Charging || 0, color: '#06b6d4' },
    { id: 'Reserved', label: t('monitoring.reserved'), count: statusCounts.Reserved || 0, color: '#f59e0b' },
    { id: 'Faulted', label: t('monitoring.faulted'), count: statusCounts.Faulted || 0, color: '#ef4444' },
    { id: 'Offline', label: t('monitoring.offline'), count: statusCounts.Offline || 0, color: '#64748b' },
  ];

  return (
    <div className={styles.counterList}>
      {items.map((item) => {
        const isActive = selectedStatus === item.id;
        return (
          <div
            key={item.id}
            className={clsx(styles.counterPill, isActive && styles.active)}
            onClick={() => onSelectStatus(item.id)}
          >
            <span className={styles.dot} style={{ backgroundColor: item.color }} />
            <span className={styles.label}>{item.label}</span>
            <span className={styles.count}>{item.count}</span>
          </div>
        );
      })}
    </div>
  );
};

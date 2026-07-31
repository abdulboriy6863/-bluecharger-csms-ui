import React from 'react';
import styles from './StatusCounters.module.scss';
import clsx from 'clsx';
import { ChargerStatus } from '../../types/charger';

interface StatusCountersProps {
  selectedStatus: string; // 'ALL' or specific ChargerStatus
  onSelectStatus: (status: string) => void;
  statusCounts: Record<string, number>;
}

export const StatusCounters: React.FC<StatusCountersProps> = ({
  selectedStatus,
  onSelectStatus,
  statusCounts
}) => {
  const items = [
    { id: 'ALL', label: 'All Chargers', count: statusCounts.ALL || 0, color: '#2563eb' },
    { id: 'Available', label: 'Available', count: statusCounts.Available || 0, color: '#10b981' },
    { id: 'Charging', label: 'Charging', count: statusCounts.Charging || 0, color: '#06b6d4' },
    { id: 'Reserved', label: 'Reserved', count: statusCounts.Reserved || 0, color: '#f59e0b' },
    { id: 'Faulted', label: 'Faulted', count: statusCounts.Faulted || 0, color: '#ef4444' },
    { id: 'Offline', label: 'Offline', count: statusCounts.Offline || 0, color: '#64748b' },
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

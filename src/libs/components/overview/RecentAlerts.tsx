import React from 'react';
import styles from '../../../scss/systemHome/RecentAlerts.module.scss';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import type { RecentAlertsProps } from '../../types/overview/overview';

export const RecentAlerts: React.FC<RecentAlertsProps> = ({ alerts, onSelectCharger }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'ERROR': return <AlertTriangle size={16} />;
      case 'WARNING': return <AlertCircle size={16} />;
      default: return <Info size={16} />;
    }
  };

  return (
    <div className={styles.alertList}>
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={styles.alertCard}
          style={{ cursor: onSelectCharger ? 'pointer' : 'default' }}
          onClick={() => onSelectCharger && onSelectCharger(alert.chargerId)}
        >
          <div className={`${styles.iconBox} ${styles[alert.type]}`}>
            {getIcon(alert.type)}
          </div>
          <div className={styles.info}>
            <div className={styles.headerRow}>
              <span className={styles.chargerId}>{alert.chargerId} ({alert.code})</span>
              <span className={styles.time}>{alert.timestamp}</span>
            </div>
            <p className={styles.message}>{alert.message}</p>
            <span className={styles.station}>{alert.stationName}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

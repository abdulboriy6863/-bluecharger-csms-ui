import React from 'react';
import { Wifi, RefreshCw, Zap, CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';
import type { Station } from '../../../../data/mockStations';
import styles from '../../../../scss/systemHome/InstallationLocationsView.module.scss';

interface StatusCountersBarProps {
  stations: Station[];
  activeFilter: string;
  onFilterChange: (status: string) => void;
  isWsConnected: boolean;
  onManualRefresh: () => void;
}

export const StatusCountersBar: React.FC<StatusCountersBarProps> = ({
  stations,
  activeFilter,
  onFilterChange,
  isWsConnected,
  onManualRefresh,
}) => {
  // Aggregate status counts across all stations & chargers
  let totalStations = stations.length;
  let totalChargers = 0;
  let availableCount = 0;
  let chargingCount = 0;
  let faultedCount = 0;
  let offlineCount = 0;
  let reservedCount = 0;
  let totalActiveKw = 0;

  stations.forEach((st) => {
    totalChargers += st.chargers.length;
    availableCount += st.availableChargers;
    chargingCount += st.chargingChargers;
    faultedCount += st.faultedChargers;
    offlineCount += st.offlineChargers;
    reservedCount += st.reservedChargers;
    totalActiveKw += st.activePowerKw;
  });

  return (
    <div className={styles.statusCountersContainer}>
      <div className={styles.statusGrid}>
        {/* Total Stations / Chargers */}
        <button
          className={`${styles.statusCard} ${styles.totalCard} ${activeFilter === 'ALL' ? styles.activeFilter : ''}`}
          onClick={() => onFilterChange('ALL')}
        >
          <div className={styles.statusHeader}>
            <span className={styles.cardTitle}>Total Fleet</span>
            <span className={styles.totalBadge}>{totalStations} Stns</span>
          </div>
          <div className={styles.cardValue}>{totalChargers}</div>
          <div className={styles.cardFooter}>
            <span>{totalActiveKw.toFixed(0)} kW Active Load</span>
          </div>
        </button>

        {/* Standby / Available */}
        <button
          className={`${styles.statusCard} ${styles.availableCard} ${activeFilter === 'Available' ? styles.activeFilter : ''}`}
          onClick={() => onFilterChange('Available')}
        >
          <div className={styles.statusHeader}>
            <span className={styles.cardTitle}>Available</span>
            <CheckCircle2 size={16} className={styles.iconGreen} />
          </div>
          <div className={`${styles.cardValue} ${styles.valGreen}`}>{availableCount}</div>
          <div className={styles.cardFooter}>Standby Ready</div>
        </button>

        {/* Charging */}
        <button
          className={`${styles.statusCard} ${styles.chargingCard} ${activeFilter === 'Charging' ? styles.activeFilter : ''}`}
          onClick={() => onFilterChange('Charging')}
        >
          <div className={styles.statusHeader}>
            <span className={styles.cardTitle}>Charging</span>
            <Zap size={16} className={styles.iconBlue} />
          </div>
          <div className={`${styles.cardValue} ${styles.valBlue}`}>{chargingCount}</div>
          <div className={styles.cardFooter}>In Active Session</div>
        </button>

        {/* Faulted */}
        <button
          className={`${styles.statusCard} ${styles.faultedCard} ${activeFilter === 'Faulted' ? styles.activeFilter : ''}`}
          onClick={() => onFilterChange('Faulted')}
        >
          <div className={styles.statusHeader}>
            <span className={styles.cardTitle}>Faulted</span>
            <AlertTriangle size={16} className={styles.iconRed} />
          </div>
          <div className={`${styles.cardValue} ${styles.valRed}`}>{faultedCount}</div>
          <div className={styles.cardFooter}>Requires Service</div>
        </button>

        {/* Offline / Disconnected */}
        <button
          className={`${styles.statusCard} ${styles.offlineCard} ${activeFilter === 'Offline' ? styles.activeFilter : ''}`}
          onClick={() => onFilterChange('Offline')}
        >
          <div className={styles.statusHeader}>
            <span className={styles.cardTitle}>Offline</span>
            <XCircle size={16} className={styles.iconGray} />
          </div>
          <div className={`${styles.cardValue} ${styles.valGray}`}>{offlineCount}</div>
          <div className={styles.cardFooter}>Network Drop</div>
        </button>

        {/* Reserved */}
        <button
          className={`${styles.statusCard} ${styles.reservedCard} ${activeFilter === 'Reserved' ? styles.activeFilter : ''}`}
          onClick={() => onFilterChange('Reserved')}
        >
          <div className={styles.statusHeader}>
            <span className={styles.cardTitle}>Reserved</span>
            <Clock size={16} className={styles.iconPurple} />
          </div>
          <div className={`${styles.cardValue} ${styles.valPurple}`}>{reservedCount}</div>
          <div className={styles.cardFooter}>Pre-booked</div>
        </button>

        {/* Live WebSocket Status Indicator */}
        <div className={styles.wsControlCard}>
          <div className={styles.wsHeader}>
            <span className={`${styles.wsPulseDot} ${isWsConnected ? styles.wsOnline : ''}`} />
            <span className={styles.wsTitle}>
              {isWsConnected ? 'WS LIVE TELEMETRY' : 'WS DISCONNECTED'}
            </span>
          </div>
          <div className={styles.wsActions}>
            <button className={styles.refreshBtn} onClick={onManualRefresh} title="Trigger Heartbeat Refresh">
              <RefreshCw size={14} className={styles.refreshIcon} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

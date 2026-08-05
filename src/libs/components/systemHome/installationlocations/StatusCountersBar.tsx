import React from 'react';
import { Wifi, RefreshCw, Zap, CheckCircle2, AlertTriangle, XCircle, Clock, Server } from 'lucide-react';
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
        {/* TOTAL FLEET */}
        <button
          className={`${styles.statusCard} ${styles.totalCard} ${activeFilter === 'ALL' ? styles.activeFilter : ''}`}
          onClick={() => onFilterChange('ALL')}
        >
          <div className={styles.statusHeader}>
            <span className={styles.cardTitle}>Total Fleet</span>
            <div className={styles.iconPill}>
              <Server size={14} className={styles.iconNavy} />
              <span className={styles.totalBadge}>{totalStations} Stns</span>
            </div>
          </div>
          <div className={styles.cardMainValue}>{totalChargers} <small>CPs</small></div>
          <div className={styles.cardSubText}>{totalActiveKw.toFixed(0)} kW Active Load</div>
        </button>

        {/* STANDBY / AVAILABLE */}
        <button
          className={`${styles.statusCard} ${styles.availableCard} ${activeFilter === 'Available' ? styles.activeFilter : ''}`}
          onClick={() => onFilterChange(activeFilter === 'Available' ? 'ALL' : 'Available')}
        >
          <div className={styles.statusHeader}>
            <span className={styles.cardTitle}>Available</span>
            <CheckCircle2 size={16} className={styles.iconGreen} />
          </div>
          <div className={`${styles.cardMainValue} ${styles.valGreen}`}>{availableCount}</div>
          <div className={styles.cardSubText}>Standby Ready</div>
        </button>

        {/* CHARGING / ACTIVE SESSION */}
        <button
          className={`${styles.statusCard} ${styles.chargingCard} ${activeFilter === 'Charging' ? styles.activeFilter : ''}`}
          onClick={() => onFilterChange(activeFilter === 'Charging' ? 'ALL' : 'Charging')}
        >
          <div className={styles.statusHeader}>
            <span className={styles.cardTitle}>Charging</span>
            <Zap size={16} className={styles.iconBlue} />
          </div>
          <div className={`${styles.cardMainValue} ${styles.valBlue}`}>{chargingCount}</div>
          <div className={styles.cardSubText}>In Active Session</div>
        </button>

        {/* FAULTED / MALFUNCTION */}
        <button
          className={`${styles.statusCard} ${styles.faultedCard} ${activeFilter === 'Faulted' ? styles.activeFilter : ''}`}
          onClick={() => onFilterChange(activeFilter === 'Faulted' ? 'ALL' : 'Faulted')}
        >
          <div className={styles.statusHeader}>
            <span className={styles.cardTitle}>Faulted</span>
            <AlertTriangle size={16} className={styles.iconRed} />
          </div>
          <div className={`${styles.cardMainValue} ${styles.valRed}`}>{faultedCount}</div>
          <div className={styles.cardSubText}>Requires Service</div>
        </button>

        {/* OFFLINE / DISCONNECTED */}
        <button
          className={`${styles.statusCard} ${styles.offlineCard} ${activeFilter === 'Offline' ? styles.activeFilter : ''}`}
          onClick={() => onFilterChange(activeFilter === 'Offline' ? 'ALL' : 'Offline')}
        >
          <div className={styles.statusHeader}>
            <span className={styles.cardTitle}>Offline</span>
            <XCircle size={16} className={styles.iconGray} />
          </div>
          <div className={`${styles.cardMainValue} ${styles.valGray}`}>{offlineCount}</div>
          <div className={styles.cardSubText}>Network Drop</div>
        </button>

        {/* RESERVED */}
        <button
          className={`${styles.statusCard} ${styles.reservedCard} ${activeFilter === 'Reserved' ? styles.activeFilter : ''}`}
          onClick={() => onFilterChange(activeFilter === 'Reserved' ? 'ALL' : 'Reserved')}
        >
          <div className={styles.statusHeader}>
            <span className={styles.cardTitle}>Reserved</span>
            <Clock size={16} className={styles.iconPurple} />
          </div>
          <div className={`${styles.cardMainValue} ${styles.valPurple}`}>{reservedCount}</div>
          <div className={styles.cardSubText}>Pre-booked</div>
        </button>

        {/* WEBSOCKET LIVE CONTROL */}
        <div className={styles.wsControlCard}>
          <div className={styles.wsHeader}>
            <span className={`${styles.wsPulseDot} ${isWsConnected ? styles.wsOnline : ''}`} />
            <span className={styles.wsTitle}>
              {isWsConnected ? 'WS LIVE TELEMETRY' : 'WS DISCONNECTED'}
            </span>
          </div>
          <button className={styles.refreshBtn} onClick={onManualRefresh} title="Sync Heartbeat">
            <RefreshCw size={13} className={styles.refreshIcon} />
            <span>Sync Live Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { X, Zap, Cpu, ShieldCheck, MapPin, Activity, Sliders, ExternalLink } from 'lucide-react';
import type { Station } from '../../../../data/mockStations';
import type { Charger, CommandType } from '../../../types/charger/charger';
import styles from '../../../../scss/systemHome/InstallationLocationsView.module.scss';

interface StationDetailOverlayProps {
  station: Station | null;
  onClose: () => void;
  onSelectCharger?: (charger: Charger) => void;
  onOpenControlModal?: (charger: Charger, defaultCommand?: CommandType) => void;
}

export const StationDetailOverlay: React.FC<StationDetailOverlayProps> = ({
  station,
  onClose,
  onSelectCharger,
  onOpenControlModal,
}) => {
  if (!station) return null;

  return (
    <div className={styles.overlayContainer}>
      <div className={styles.overlayCard}>
        {/* Header */}
        <div className={styles.overlayHeader}>
          <div className={styles.headerTitleGroup}>
            <span className={styles.countryFlagBadge}>{station.countryCode}</span>
            <div>
              <h3 className={styles.stationTitle}>{station.name}</h3>
              <p className={styles.stationSubTitle}>
                <MapPin size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                {station.address} ({station.lat.toFixed(4)}, {station.lng.toFixed(4)})
              </p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} title="Close Inspector">
            <X size={18} />
          </button>
        </div>

        {/* Quick Station Telemetry Grid */}
        <div className={styles.telemetryGrid}>
          <div className={styles.telemetryCard}>
            <span className={styles.telemetryLabel}>Operator</span>
            <span className={styles.telemetryValue}>{station.operator}</span>
          </div>
          <div className={styles.telemetryCard}>
            <span className={styles.telemetryLabel}>Total Capacity</span>
            <span className={styles.telemetryValue}>{station.totalPowerKw} kW</span>
          </div>
          <div className={styles.telemetryCard}>
            <span className={styles.telemetryLabel}>Live Load</span>
            <span className={styles.telemetryValue} style={{ color: '#2563eb' }}>
              {station.activePowerKw.toFixed(1)} kW
            </span>
          </div>
          <div className={styles.telemetryCard}>
            <span className={styles.telemetryLabel}>Status</span>
            <span
              className={styles.telemetryValue}
              style={{
                color:
                  station.status === 'Charging'
                    ? '#2563eb'
                    : station.status === 'Available'
                    ? '#10b981'
                    : '#ef4444',
              }}
            >
              ● {station.status}
            </span>
          </div>
        </div>

        {/* Chargers & Connectors Inspector List */}
        <div className={styles.chargersSection}>
          <h4 className={styles.sectionHeader}>
            <Cpu size={16} style={{ marginRight: '6px' }} />
            Installed Chargers & Connectors ({station.chargers.length})
          </h4>

          <div className={styles.chargersGrid}>
            {station.chargers.map((cp) => (
              <div key={cp.id} className={styles.chargerItemCard}>
                <div className={styles.chargerItemTop}>
                  <div>
                    <strong className={styles.chargerId}>{cp.id}</strong>
                    <div className={styles.chargerModel}>{cp.model} ({cp.manufacturer})</div>
                  </div>
                  <span
                    className={styles.cpStatusBadge}
                    style={{
                      backgroundColor:
                        cp.status === 'Charging'
                          ? '#dbeafe'
                          : cp.status === 'Available'
                          ? '#d1fae5'
                          : '#fee2e2',
                      color:
                        cp.status === 'Charging'
                          ? '#1d4ed8'
                          : cp.status === 'Available'
                          ? '#047857'
                          : '#b91c1c',
                    }}
                  >
                    ● {cp.status}
                  </span>
                </div>

                {/* Technical Meta info */}
                <div className={styles.cpMetaRow}>
                  <span>Firmware: {cp.firmwareVersion}</span>
                  <span>OCPP: {cp.ocppVersion}</span>
                  <span>IP: {cp.ipAddress}</span>
                </div>

                {/* Connectors */}
                <div className={styles.connectorsList}>
                  {cp.connectors.map((conn) => (
                    <div key={conn.id} className={styles.connectorPill}>
                      <Zap size={13} style={{ color: conn.status === 'Charging' ? '#2563eb' : '#10b981' }} />
                      <span className={styles.connType}>
                        Connector #{conn.id} ({conn.type} - {conn.maxPowerKw}kW)
                      </span>
                      <span className={styles.connStatus}>
                        {conn.status} {conn.currentPowerKw ? `@ ${conn.currentPowerKw.toFixed(1)} kW` : ''}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className={styles.cpActionRow}>
                  {onOpenControlModal && (
                    <button
                      className={styles.controlActionBtn}
                      onClick={() => {
                        const fullCharger: Charger = {
                          id: cp.id,
                          name: cp.name,
                          stationId: station.id,
                          stationName: station.name,
                          region: station.region,
                          status: cp.status,
                          connectors: cp.connectors,
                          manufacturer: cp.manufacturer,
                          model: cp.model,
                          firmwareVersion: cp.firmwareVersion,
                          ocppVersion: cp.ocppVersion,
                          ipAddress: cp.ipAddress,
                          macAddress: '00:1E:C0:8A:4F:99',
                          lastHeartbeat: cp.lastHeartbeat,
                          lastStatusChange: 'Just now',
                          todayEnergyKwh: cp.todayEnergyKwh,
                          totalSessionsToday: cp.totalSessionsToday,
                        };
                        onOpenControlModal(fullCharger);
                      }}
                    >
                      <Sliders size={13} style={{ marginRight: '4px' }} />
                      Remote Control
                    </button>
                  )}

                  {onSelectCharger && (
                    <button
                      className={styles.detailActionBtn}
                      onClick={() => {
                        const fullCharger: Charger = {
                          id: cp.id,
                          name: cp.name,
                          stationId: station.id,
                          stationName: station.name,
                          region: station.region,
                          status: cp.status,
                          connectors: cp.connectors,
                          manufacturer: cp.manufacturer,
                          model: cp.model,
                          firmwareVersion: cp.firmwareVersion,
                          ocppVersion: cp.ocppVersion,
                          ipAddress: cp.ipAddress,
                          macAddress: '00:1E:C0:8A:4F:99',
                          lastHeartbeat: cp.lastHeartbeat,
                          lastStatusChange: 'Just now',
                          todayEnergyKwh: cp.todayEnergyKwh,
                          totalSessionsToday: cp.totalSessionsToday,
                        };
                        onSelectCharger(fullCharger);
                      }}
                    >
                      <ExternalLink size={13} style={{ marginRight: '4px' }} />
                      Full Drawer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import styles from '../../../scss/chargerDetail/ChargerDetailDrawer.module.scss';
import { Drawer } from '../common/Drawer/Drawer';
import { Badge } from '../common/Badge/Badge';
import { Button } from '../common/Button/Button';
import { Zap, Cpu, AlertTriangle, Play, Square, RotateCcw, Unlock } from 'lucide-react';
import type { ChargerDetailDrawerProps } from '../../types/charger/chargerDetail';

export const ChargerDetailDrawer: React.FC<ChargerDetailDrawerProps> = ({
  charger,
  isOpen,
  onClose,
  onOpenControlModal
}) => {
  if (!charger) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`Charger Telemetry - ${charger.id}`}
      subtitle={charger.name}
    >
      <div className={styles.drawerContent}>
        {/* Status Header */}
        <div className={styles.statusCard}>
          <div className={styles.identity}>
            <span className={styles.chargerId}>{charger.id}</span>
            <span className={styles.stationName}>{charger.stationName} ({charger.region})</span>
          </div>
          <Badge status={charger.status} />
        </div>

        {/* Connectors & Live Readings */}
        <div>
          <div className={styles.sectionTitle}>
            <Zap size={16} color="#2563eb" /> Connectors Telemetry
          </div>
          <div className={styles.connectorGrid}>
            {charger.connectors.map((conn) => (
              <div key={conn.id} className={styles.connectorBox}>
                <div className={styles.connHeader}>
                  <span>Connector #{conn.id}</span>
                  <Badge status={conn.status} showDot={false} />
                </div>
                <div className={styles.telemetry}>
                  <span>Type:</span>
                  <span className={styles.val}>{conn.type}</span>
                </div>
                <div className={styles.telemetry}>
                  <span>Max Power:</span>
                  <span className={styles.val}>{conn.maxPowerKw} kW</span>
                </div>
                {conn.status === 'Charging' && (
                  <>
                    <div className={styles.telemetry}>
                      <span>Live Output:</span>
                      <span className={styles.val} style={{ color: '#06b6d4' }}>{conn.currentPowerKw} kW</span>
                    </div>
                    <div className={styles.telemetry}>
                      <span>Session Energy:</span>
                      <span className={styles.val}>{conn.energyDeliveredKwh} kWh</span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specification */}
        <div>
          <div className={styles.sectionTitle}>
            <Cpu size={16} color="#64748b" /> Hardware & OCPP Details
          </div>
          <table className={styles.techTable}>
            <tbody>
              <tr>
                <td>Manufacturer</td>
                <td>{charger.manufacturer}</td>
              </tr>
              <tr>
                <td>Model</td>
                <td>{charger.model}</td>
              </tr>
              <tr>
                <td>Firmware Version</td>
                <td>{charger.firmwareVersion}</td>
              </tr>
              <tr>
                <td>OCPP Protocol</td>
                <td>{charger.ocppVersion}</td>
              </tr>
              <tr>
                <td>IP Address</td>
                <td>{charger.ipAddress}</td>
              </tr>
              <tr>
                <td>MAC Address</td>
                <td>{charger.macAddress}</td>
              </tr>
              <tr>
                <td>Heartbeat Status</td>
                <td>{charger.lastHeartbeat}</td>
              </tr>
              <tr>
                <td>Today Energy Output</td>
                <td>{charger.todayEnergyKwh} kWh</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Remote Control Actions */}
        <div className={styles.actionsGroup}>
          <div className={styles.sectionTitle}>Remote Operations</div>
          <div className={styles.actionGrid}>
            <Button
              variant="primary"
              icon={<Play size={14} />}
              onClick={() => onOpenControlModal(charger, 'RemoteStartTransaction')}
            >
              Remote Start
            </Button>
            <Button
              variant="secondary"
              icon={<Square size={14} />}
              onClick={() => onOpenControlModal(charger, 'RemoteStopTransaction')}
            >
              Remote Stop
            </Button>
          </div>

          <div className={styles.dangerBox}>
            <span className={styles.warningText}>
              <AlertTriangle size={14} /> Dangerous Remote Commands
            </span>
            <div className={styles.actionGrid}>
              <Button
                variant="danger"
                icon={<RotateCcw size={14} />}
                onClick={() => onOpenControlModal(charger, 'Reset')}
              >
                Hard Reset
              </Button>
              <Button
                variant="secondary"
                icon={<Unlock size={14} />}
                onClick={() => onOpenControlModal(charger, 'UnlockConnector')}
              >
                Unlock Connector
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

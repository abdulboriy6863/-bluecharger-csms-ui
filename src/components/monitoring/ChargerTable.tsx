import React from 'react';
import styles from './ChargerTable.module.scss';
import { Charger } from '../../types/charger';
import { Badge } from '../common/Badge/Badge';
import { Button } from '../common/Button/Button';
import { Sliders, Wifi, Eye } from 'lucide-react';

interface ChargerTableProps {
  chargers: Charger[];
  onSelectCharger: (charger: Charger) => void;
  onOpenControlModal: (charger: Charger) => void;
}

export const ChargerTable: React.FC<ChargerTableProps> = ({
  chargers,
  onSelectCharger,
  onOpenControlModal
}) => {
  if (chargers.length === 0) {
    return (
      <div className={styles.tableContainer}>
        <div className={styles.emptyState}>
          <Wifi size={36} color="#94a3b8" />
          <p>No chargers matched your current filter criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Charger ID & Name</th>
            <th>Station & Region</th>
            <th>Status</th>
            <th>Connectors</th>
            <th>Manufacturer / Model</th>
            <th>Heartbeat</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {chargers.map((c) => (
            <tr key={c.id} onClick={() => onSelectCharger(c)}>
              <td>
                <div className={styles.chargerIdCell}>
                  <span className={styles.idText}>{c.id}</span>
                  <span className={styles.nameText}>{c.name}</span>
                </div>
              </td>
              <td>
                <div className={styles.stationCell}>
                  <span className={styles.stationName}>{c.stationName}</span>
                  <span className={styles.region}>{c.region}</span>
                </div>
              </td>
              <td>
                <Badge status={c.status} />
              </td>
              <td>
                <div className={styles.connectorsCell}>
                  {c.connectors.map((conn) => (
                    <span key={conn.id} className={styles.connectorChip}>
                      #{conn.id} {conn.type} ({conn.maxPowerKw}kW)
                    </span>
                  ))}
                </div>
              </td>
              <td>
                <div className={styles.techCell}>
                  <span className={styles.model}>{c.model}</span>
                  <span className={styles.mfr}>{c.manufacturer}</span>
                </div>
              </td>
              <td>
                <span className={styles.heartbeat}>
                  <Wifi size={12} color={c.status === 'Offline' ? '#ef4444' : '#10b981'} />
                  {c.lastHeartbeat}
                </span>
              </td>
              <td onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<Eye size={13} />}
                    onClick={() => onSelectCharger(c)}
                  >
                    Detail
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<Sliders size={13} />}
                    onClick={() => onOpenControlModal(c)}
                  >
                    Control
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

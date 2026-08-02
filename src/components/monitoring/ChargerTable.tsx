import React from 'react';
import styles from '../../scss/monitoring/ChargerTable.module.scss';
import { Badge } from '../common/Badge/Badge';
import { Button } from '../common/Button/Button';
import { Sliders, Wifi, Eye } from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';
import type { ChargerTableProps } from '../../libs/types/monitoring';

export const ChargerTable: React.FC<ChargerTableProps> = ({
  chargers,
  onSelectCharger,
  onOpenControlModal
}) => {
  const { t } = useI18n();
  if (chargers.length === 0) {
    return (
      <div className={styles.tableContainer}>
        <div className={styles.emptyState}>
          <Wifi size={36} color="#94a3b8" />
          <p>{t('monitoring.noResults')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{t('monitoring.charger')}</th>
            <th>{t('monitoring.station')}</th>
            <th>{t('monitoring.status')}</th>
            <th>{t('monitoring.connectors')}</th>
            <th>{t('monitoring.manufacturer')}</th>
            <th>{t('monitoring.heartbeat')}</th>
            <th>{t('monitoring.actions')}</th>
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
                    {t('monitoring.detail')}
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<Sliders size={13} />}
                    onClick={() => onOpenControlModal(c)}
                  >
                    {t('monitoring.control')}
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

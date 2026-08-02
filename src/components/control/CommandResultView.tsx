import React from 'react';
import styles from '../../styles/control/CommandResultView.module.scss';
import { CommandResult } from '../../types/charger';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '../common/Button/Button';

interface CommandResultViewProps {
  result: CommandResult;
  onDone: () => void;
}

export const CommandResultView: React.FC<CommandResultViewProps> = ({ result, onDone }) => {
  return (
    <div className={styles.resultContainer}>
      <div className={`${styles.statusIconBox} ${styles[result.status]}`}>
        {result.status === 'PENDING' && <Loader2 size={36} className="animate-spin" />}
        {result.status === 'SUCCESS' && <CheckCircle2 size={36} />}
        {result.status === 'FAILED' && <XCircle size={36} />}
      </div>

      <h3 className={styles.title}>
        {result.status === 'PENDING' && 'Command Transmitting...'}
        {result.status === 'SUCCESS' && 'OCPP Command Accepted'}
        {result.status === 'FAILED' && 'Command Execution Rejected'}
      </h3>

      <p className={styles.description}>
        {result.status === 'PENDING' && 'Sending WebSocket message to charger endpoint...'}
        {result.status === 'SUCCESS' && `Charger accepted ${result.commandType} request with status Accepted.`}
        {result.status === 'FAILED' && result.responseMessage}
      </p>

      <div className={styles.metadataTable}>
        <div className={styles.row}>
          <span className={styles.key}>Command ID</span>
          <span className={styles.val}>{result.id}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.key}>Target Charger</span>
          <span className={styles.val}>{result.chargerId}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.key}>Command Type</span>
          <span className={styles.val}>{result.commandType}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.key}>Issued By</span>
          <span className={styles.val}>{result.requestedBy}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.key}>Timestamp</span>
          <span className={styles.val}>{result.timestamp}</span>
        </div>
      </div>

      {result.status !== 'PENDING' && (
        <div style={{ marginTop: '12px', width: '100%' }}>
          <Button variant="primary" style={{ width: '100%' }} onClick={onDone}>
            Close & Return to Monitoring
          </Button>
        </div>
      )}
    </div>
  );
};

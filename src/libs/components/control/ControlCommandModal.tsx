import React, { useEffect, useState } from 'react';
import styles from '../../../scss/control/ControlCommandModal.module.scss';
import type { CommandType, CommandResult } from '../../types/charger/charger';
import { Modal } from '../common/Modal/Modal';
import { Select } from '../common/Select/Select';
import { Input } from '../common/Input/Input';
import { Button } from '../common/Button/Button';
import { CommandResultView } from './CommandResultView';
import { AlertTriangle, Send } from 'lucide-react';
import type { ControlCommandModalProps } from '../../types/control/control';

const defaultReason = 'Operator manual control test';

export const ControlCommandModal: React.FC<ControlCommandModalProps> = ({
  charger,
  initialCommand = 'RemoteStartTransaction',
  isOpen,
  onClose,
  onCommandExecuted
}) => {
  const [commandType, setCommandType] = useState<CommandType>(initialCommand);
  const [connectorId, setConnectorId] = useState<string>('1');
  const [reason, setReason] = useState<string>(defaultReason);
  const [executingResult, setExecutingResult] = useState<CommandResult | null>(null);

  useEffect(() => {
    if (!isOpen || !charger) return;

    setCommandType(initialCommand);
    setConnectorId(String(charger.connectors[0]?.id ?? '1'));
    setReason(defaultReason);
    setExecutingResult(null);
  }, [charger, initialCommand, isOpen]);

  if (!charger) return null;

  const commandOptions = [
    { value: 'RemoteStartTransaction', label: 'Remote Start Transaction' },
    { value: 'RemoteStopTransaction', label: 'Remote Stop Transaction' },
    { value: 'Reset', label: 'Reset (Hard / Soft)' },
    { value: 'UnlockConnector', label: 'Unlock Connector Plug' },
    { value: 'ChangeConfiguration', label: 'Change Configuration' },
    { value: 'UpdateFirmware', label: 'Trigger Firmware OTA' },
  ];

  const connectorOptions = charger.connectors.map((conn) => ({
    value: String(conn.id),
    label: `Connector #${conn.id} - ${conn.type} (${conn.maxPowerKw}kW)`,
  }));

  const handleExecute = () => {
    const cmdId = `CMD-${Math.floor(100000 + Math.random() * 900000)}`;
    const initialResult: CommandResult = {
      id: cmdId,
      chargerId: charger.id,
      commandType,
      status: 'PENDING',
      timestamp: new Date().toLocaleTimeString(),
      requestedBy: 'Operator Admin (You)'
    };

    setExecutingResult(initialResult);

    // Simulate WebSocket response delay
    setTimeout(() => {
      const isSuccess = Math.random() > 0.15; // 85% success rate simulation
      const finalResult: CommandResult = {
        ...initialResult,
        status: isSuccess ? 'SUCCESS' : 'FAILED',
        responseMessage: isSuccess
          ? 'Accepted: Charger confirmed execution'
          : 'Rejected: Charger reported Connector In Use or Hardware Failure'
      };
      setExecutingResult(finalResult);
      onCommandExecuted(finalResult);
    }, 1200);
  };

  const handleDone = () => {
    setExecutingResult(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={executingResult ? handleDone : onClose}
      title={executingResult ? 'Command Execution Status' : `Remote Control - ${charger.id}`}
      footer={
        !executingResult && (
          <>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant={commandType === 'Reset' ? 'danger' : 'primary'}
              icon={<Send size={15} />}
              onClick={handleExecute}
            >
              Transmit Command
            </Button>
          </>
        )
      }
    >
      {executingResult ? (
        <CommandResultView result={executingResult} onDone={handleDone} />
      ) : (
        <div className={styles.modalContent}>
          <div className={styles.targetSummary}>
            <span className={styles.label}>Target Device</span>
            <span className={styles.id}>{charger.id} — {charger.name}</span>
          </div>

          <div className={styles.fieldGroup}>
            <Select
              label="Select OCPP Command Type"
              value={commandType}
              options={commandOptions}
              onChange={(e) => setCommandType(e.target.value as CommandType)}
            />
          </div>

          {['RemoteStartTransaction', 'RemoteStopTransaction', 'UnlockConnector'].includes(commandType) && (
            <div className={styles.fieldGroup}>
              <Select
                label="Target Connector"
                value={connectorId}
                options={connectorOptions}
                onChange={(e) => setConnectorId(e.target.value)}
              />
            </div>
          )}

          <div className={styles.fieldGroup}>
            <Input
              label="Operator Reason / Audit Comment"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Provide justification for audit log"
            />
          </div>

          <div className={styles.riskBanner}>
            <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
            <span>
              <strong>Safety Warning:</strong> Transmitting remote commands directly interrupts or initiates high-voltage EV charging operations. Confirm only if authorized.
            </span>
          </div>
        </div>
      )}
    </Modal>
  );
};

import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './ErrorHistoryPage.module.scss';
export const ErrorHistoryPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('history.errors')} description="Review charger faults, OCPP errors and resolution status." actionLabel="Export errors" columns={['Error', 'Charger', 'Severity', 'Detected', 'Status']} rows={[['ConnectorLockFailure', 'CHG-SAM-003', 'High', '10:39', 'Open'], ['GroundFailure', 'CHG-SEL-019', 'Medium', '09:52', 'Investigating'], ['OverVoltage', 'CHG-TAS-004', 'Low', '08:44', 'Resolved']]} /></div>; };

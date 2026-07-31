import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './CommunicationHistoryPage.module.scss';
export const CommunicationHistoryPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('history.communication')} description="Inspect charger heartbeats, OCPP messages and connection health." actionLabel="Export messages" columns={['Timestamp', 'Charger', 'Message', 'Direction', 'Latency']} rows={[['10:44:21', 'CHG-TAS-001', 'Heartbeat', 'Inbound', '82 ms'], ['10:44:18', 'CHG-SEL-014', 'StatusNotification', 'Inbound', '104 ms'], ['10:43:59', 'CHG-SAM-003', 'BootNotification', 'Inbound', '218 ms']]} /></div>; };

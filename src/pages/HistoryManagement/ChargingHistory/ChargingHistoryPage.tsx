import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './ChargingHistoryPage.module.scss';
export const ChargingHistoryPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('history.charging')} description="Review charging sessions, energy delivery and session outcomes." actionLabel="Export history" columns={['Session', 'Member', 'Charger', 'Energy', 'Started']} rows={[['SES-98421', 'Jinwoo Kim', 'CHG-TAS-001', '34.2 kWh', '10:42'], ['SES-98420', 'Aziza Rakhimova', 'CHG-SAM-003', '52.0 kWh', '10:16'], ['SES-98419', 'Daniel Wong', 'CHG-SEL-014', '18.9 kWh', '09:58']]} /></div>; };

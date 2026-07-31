import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './ControlHistoryPage.module.scss';
export const ControlHistoryPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('history.control')} description="Audit remote commands issued to chargers and their results." actionLabel="Export log" columns={['Command ID', 'Charger', 'Command', 'Operator', 'Result']} rows={[['CMD-928441', 'CHG-TAS-001', 'Remote Stop', 'Abdulboriy', 'Accepted'], ['CMD-928440', 'CHG-SEL-014', 'Reset', 'Mina Park', 'Accepted'], ['CMD-928439', 'CHG-SAM-003', 'Unlock', 'Diyor Karimov', 'Rejected']]} /></div>; };

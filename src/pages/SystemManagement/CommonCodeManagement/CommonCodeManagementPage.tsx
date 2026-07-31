import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../shared/ManagementPageFrame';
import styles from './CommonCodeManagementPage.module.scss';

export const CommonCodeManagementPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('management.commonCodes')} description="Maintain shared codes used across the operations platform." actionLabel="Add code" columns={['Code group', 'Values', 'Usage', 'Status']} rows={[['CHARGER_STATUS', '5', 'Monitoring', 'Active'], ['CONNECTOR_TYPE', '4', 'Infrastructure', 'Active'], ['COMMAND_RESULT', '3', 'Control Center', 'Active']]} /></div>; };

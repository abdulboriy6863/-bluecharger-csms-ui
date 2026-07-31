import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './PrepaidChargingHistoryPage.module.scss';
export const PrepaidChargingHistoryPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('history.prepaid')} description="Track prepaid charging sessions, balances and settlement references." actionLabel="Export prepaid history" columns={['Session', 'Member', 'Prepaid balance', 'Energy', 'Status']} rows={[['PRE-18421', 'Fleet Partners', '$240.00', '42.1 kWh', 'Completed'], ['PRE-18420', 'Premium Network', '$84.50', '18.2 kWh', 'Completed'], ['PRE-18419', 'Retail Customers', '$12.00', '6.4 kWh', 'Active']]} /></div>; };

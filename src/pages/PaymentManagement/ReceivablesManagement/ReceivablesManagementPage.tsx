import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './ReceivablesManagementPage.module.scss';
export const ReceivablesManagementPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('payment.receivables')} description="Track unpaid balances, overdue accounts and collection status." actionLabel="Send reminder" columns={['Account', 'Member', 'Balance', 'Due date', 'Status']} rows={[['AR-21804', 'Fleet Partners', '$1,284.00', 'Aug 02, 2026', 'Open'], ['AR-21803', 'Retail Customers', '$248.60', 'Aug 01, 2026', 'Reminder sent'], ['AR-21802', 'Premium Network', '$84.20', 'Jul 30, 2026', 'Overdue']]} /></div>; };

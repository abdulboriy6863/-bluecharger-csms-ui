import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './PaymentHistoryPage.module.scss';
export const PaymentHistoryPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('history.payments')} description="Track payment approvals, refunds and transaction outcomes." actionLabel="Export payments" columns={['Transaction', 'Member', 'Amount', 'Method', 'Status']} rows={[['PAY-72018', 'Jinwoo Kim', '$12.40', 'Card', 'Approved'], ['PAY-72017', 'Aziza Rakhimova', '$18.90', 'Wallet', 'Approved'], ['PAY-72016', 'Daniel Wong', '$6.20', 'Card', 'Pending']]} /></div>; };

import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './PrepaidManagementPage.module.scss';
export const PrepaidManagementPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('payment.prepaid')} description="Manage prepaid balances, top-ups and account funding activity." actionLabel="Add prepaid rule" columns={['Account', 'Members', 'Balance', 'Last top-up', 'Status']} rows={[['Fleet Wallet', '128', '$24,820.00', 'Today, 09:42', 'Healthy'], ['Premium Wallet', '412', '$8,440.50', 'Today, 08:18', 'Healthy'], ['Retail Wallet', '2,846', '$2,184.20', 'Yesterday', 'Low balance']]} /></div>; };

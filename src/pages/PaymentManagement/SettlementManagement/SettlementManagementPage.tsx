import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './SettlementManagementPage.module.scss';
export const SettlementManagementPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('payment.settlement')} description="Review settlement batches, service company shares and payout status." actionLabel="Create settlement" columns={['Batch', 'Period', 'Transactions', 'Amount', 'Status']} rows={[['SET-2026-07-31', 'Jul 31, 2026', '4,821', '$84,218.40', 'Ready'], ['SET-2026-07-30', 'Jul 30, 2026', '4,612', '$79,442.20', 'Paid'], ['SET-2026-07-29', 'Jul 29, 2026', '4,504', '$77,120.80', 'Paid']]} /></div>; };

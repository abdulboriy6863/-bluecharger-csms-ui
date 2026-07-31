import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './SalesManagementPage.module.scss';
export const SalesManagementPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('sales.sales')} description="Review charging revenue, invoices and customer sales activity." actionLabel="Create sales record" columns={['Sale', 'Customer', 'Region', 'Amount', 'Status']} rows={[['SAL-2026-9842', 'Retail Customers', 'Global', '$42,840.00', 'Posted'], ['SAL-2026-9841', 'Fleet Partners', 'Uzbekistan', '$18,420.00', 'Posted'], ['SAL-2026-9840', 'Premium Network', 'South Korea', '$12,284.00', 'Review']]} /></div>; };

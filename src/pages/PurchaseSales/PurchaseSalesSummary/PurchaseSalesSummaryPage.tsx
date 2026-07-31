import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './PurchaseSalesSummaryPage.module.scss';
export const PurchaseSalesSummaryPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('sales.summary')} description="Compare purchase and sales totals across regions and reporting periods." actionLabel="Export summary" columns={['Period', 'Purchases', 'Sales', 'Gross margin', 'Status']} rows={[['Jul 31, 2026', '$28,844.20', '$84,218.40', '$55,374.20', 'Final'], ['Jul 30, 2026', '$26,410.00', '$79,442.20', '$53,032.20', 'Final'], ['Jul 29, 2026', '$24,820.40', '$77,120.80', '$52,300.40', 'Final']]} /></div>; };

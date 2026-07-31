import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './PurchaseSalesPerformancePage.module.scss';
export const PurchaseSalesPerformancePage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('sales.performance')} description="Measure purchase and sales performance by region, product and period." actionLabel="Export performance" columns={['Region', 'Sales target', 'Actual sales', 'Achievement', 'Trend']} rows={[['Global', '$80,000', '$84,218', '105.3%', 'Up'], ['Uzbekistan', '$24,000', '$26,410', '110.0%', 'Up'], ['South Korea', '$42,000', '$44,820', '106.7%', 'Stable']]} /></div>; };

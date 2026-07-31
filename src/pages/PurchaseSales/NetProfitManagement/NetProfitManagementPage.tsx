import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './NetProfitManagementPage.module.scss';
export const NetProfitManagementPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('sales.netProfit')} description="Monitor revenue, operating costs and net profit across the charging network." actionLabel="Export profit report" columns={['Period', 'Revenue', 'Operating cost', 'Net profit', 'Margin']} rows={[['Jul 31, 2026', '$84,218.40', '$28,844.20', '$55,374.20', '65.8%'], ['Jul 30, 2026', '$79,442.20', '$26,410.00', '$53,032.20', '66.7%'], ['Jul 29, 2026', '$77,120.80', '$24,820.40', '$52,300.40', '67.8%']]} /></div>; };

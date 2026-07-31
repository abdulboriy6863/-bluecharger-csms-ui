import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './PurchaseManagementPage.module.scss';
export const PurchaseManagementPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('sales.purchases')} description="Track network purchases, supplier invoices and procurement status." actionLabel="Add purchase" columns={['Purchase', 'Supplier', 'Category', 'Amount', 'Status']} rows={[['PUR-2026-0812', 'Grid Energy Co.', 'Energy', '$18,420.00', 'Approved'], ['PUR-2026-0811', 'K-Energy Mobility', 'Hardware', '$8,240.00', 'Pending'], ['PUR-2026-0810', 'BlueCharge Hardware', 'Parts', '$2,184.20', 'Paid']]} /></div>; };

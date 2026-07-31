import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../shared/ManagementPageFrame';
import styles from './MenuPermissionGroupsPage.module.scss';

export const MenuPermissionGroupsPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('management.permissions')} description="Define menu visibility and action permissions by role." actionLabel="Create group" columns={['Permission group', 'Members', 'Scope', 'Updated']} rows={[['Operator Admin', '8 users', 'Global', 'Today'], ['Field Manager', '14 users', 'Regional', 'Yesterday'], ['Billing Specialist', '4 users', 'Billing only', 'Jul 29, 2026']]} /></div>; };

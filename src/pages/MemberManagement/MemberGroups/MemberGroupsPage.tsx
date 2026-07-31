import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './MemberGroupsPage.module.scss';

export const MemberGroupsPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('members.groups')} description="Organize members into operational and service groups." actionLabel="Add group" columns={['Group', 'Members', 'Service region', 'Status']} rows={[['Fleet Partners', '128', 'Global', 'Active'], ['Retail Customers', '2,846', 'Global', 'Active'], ['Premium Network', '412', 'South Korea', 'Active']]} /></div>; };

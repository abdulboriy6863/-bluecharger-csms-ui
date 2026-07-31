import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './MemberNotificationsPage.module.scss';

export const MemberNotificationsPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('members.notifications')} description="Configure member alerts, delivery channels and notification history." actionLabel="Create alert" columns={['Notification', 'Channel', 'Recipients', 'Status']} rows={[['Charging complete', 'Push + Email', '2,846 members', 'Enabled'], ['Payment failed', 'Email', 'Fleet Partners', 'Enabled'], ['Maintenance notice', 'SMS', 'Premium Network', 'Draft']]} /></div>; };

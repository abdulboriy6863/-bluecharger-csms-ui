import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../shared/ManagementPageFrame';
import styles from './UserManagementPage.module.scss';

export const UserManagementPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('management.users')} description="Manage operator accounts, roles and access status." actionLabel="Add user" columns={['User', 'Role', 'Company', 'Last active']} rows={[['Abdulboriy', 'Operator Admin', 'BlueNetworks Global', 'Just now'], ['Mina Park', 'Field Manager', 'BlueNetworks Korea', '8 min ago'], ['Diyor Karimov', 'Support Agent', 'EV Partner Central', '1 hr ago']]} /></div>; };

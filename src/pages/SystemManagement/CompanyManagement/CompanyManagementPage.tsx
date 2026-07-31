import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../shared/ManagementPageFrame';
import styles from './CompanyManagementPage.module.scss';

export const CompanyManagementPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('management.companies')} description="Manage service companies, operators and business ownership." actionLabel="Add company" columns={['Company', 'Country', 'Contact', 'Status']} rows={[['BlueNetworks Global', 'International', 'admin@bluenetwork.io', 'Active'], ['BlueNetworks Korea', 'South Korea', 'support@bluenetwork.kr', 'Active'], ['EV Partner Central', 'Uzbekistan', 'ops@evpartner.uz', 'Pending']]} /></div>; };

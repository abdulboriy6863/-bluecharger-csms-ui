import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../shared/ManagementPageFrame';
import styles from './NoticeFaqPage.module.scss';

export const NoticeFaqPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('management.noticeFaq')} description="Publish operational notices and answer frequently asked questions." actionLabel="Create notice" columns={['Title', 'Category', 'Published by', 'Updated']} rows={[['Scheduled maintenance: Seoul region', 'Notice', 'System Admin', 'Today'], ['How to reset a charger safely', 'FAQ', 'Support Team', 'Yesterday'], ['Billing settlement cycle', 'FAQ', 'Billing Team', 'Jul 28, 2026']]} /></div>; };

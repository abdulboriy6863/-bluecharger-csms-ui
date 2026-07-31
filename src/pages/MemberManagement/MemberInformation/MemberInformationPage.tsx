import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './MemberInformationPage.module.scss';

export const MemberInformationPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('members.information')} description="Review member identity, contact and account information." actionLabel="Add member" columns={['Member', 'Member ID', 'Group', 'Joined']} rows={[['Jinwoo Kim', 'MBR-20481', 'Premium Network', 'Jul 31, 2026'], ['Aziza Rakhimova', 'MBR-20480', 'Fleet Partners', 'Jul 30, 2026'], ['Daniel Wong', 'MBR-20479', 'Retail Customers', 'Jul 30, 2026']]} /></div>; };

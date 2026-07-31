import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './MemberSupportPage.module.scss';

export const MemberSupportPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('members.support')} description="Track member requests, support cases and resolution ownership." actionLabel="New case" columns={['Case', 'Member', 'Priority', 'Assignee']} rows={[['Unable to start session', 'Jinwoo Kim', 'High', 'Support Team'], ['Invoice question', 'Aziza Rakhimova', 'Normal', 'Billing Team'], ['Card replacement', 'Daniel Wong', 'Low', 'Member Care']]} /></div>; };

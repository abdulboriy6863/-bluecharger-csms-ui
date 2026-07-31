import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './MemberGradesPage.module.scss';

export const MemberGradesPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('members.grades')} description="Define membership levels, benefits and eligibility rules." actionLabel="Add grade" columns={['Grade', 'Members', 'Discount', 'Eligibility']} rows={[['Platinum', '86', '15%', '100+ sessions'], ['Gold', '428', '10%', '50+ sessions'], ['Standard', '2,332', '0%', 'Default']]} /></div>; };

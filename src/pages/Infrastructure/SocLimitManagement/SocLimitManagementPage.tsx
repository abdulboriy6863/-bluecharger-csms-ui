import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './SocLimitManagementPage.module.scss';

export const SocLimitManagementPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('infrastructure.socLimits')} description="Configure state-of-charge limits for safe and efficient charging." actionLabel="Add SoC rule" columns={['Rule', 'Vehicle group', 'Minimum', 'Maximum']} rows={[['Fleet overnight', 'Fleet Partners', '20%', '90%'], ['Premium fast charge', 'Premium Network', '10%', '80%'], ['Default safety rule', 'All members', '15%', '95%']]} /></div>; };

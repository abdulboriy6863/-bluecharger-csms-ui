import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './PowerLimitManagementPage.module.scss';

export const PowerLimitManagementPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('infrastructure.powerLimits')} description="Set station and charger power limits to protect network capacity." actionLabel="Add power rule" columns={['Rule', 'Scope', 'Limit', 'Schedule']} rows={[['Seoul peak limit', 'Seoul Smart Grid', '1.2 MW', '16:00–21:00'], ['Tashkent hub limit', 'Tashkent Central Hub', '900 kW', 'Always'], ['Default charger limit', 'All chargers', '180 kW', 'Always']]} /></div>; };

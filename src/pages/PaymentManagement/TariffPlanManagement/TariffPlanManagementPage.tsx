import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './TariffPlanManagementPage.module.scss';
export const TariffPlanManagementPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('payment.tariffs')} description="Manage charging tariff plans, schedules and regional pricing rules." actionLabel="Add tariff plan" columns={['Plan', 'Region', 'Rate', 'Schedule', 'Status']} rows={[['Standard Public', 'Global', '$0.26 / kWh', 'All day', 'Active'], ['Korea Peak Saver', 'South Korea', '$0.32 / kWh', '16:00–21:00', 'Active'], ['Fleet Overnight', 'Uzbekistan', '$0.18 / kWh', '22:00–06:00', 'Draft']]} /></div>; };

import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './ChargingStationManagementPage.module.scss';

export const ChargingStationManagementPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('infrastructure.stations')} description="Manage station locations, operating hours and regional ownership." actionLabel="Add station" columns={['Station', 'Region', 'Chargers', 'Availability']} rows={[['Tashkent Central Mall Station', 'Tashkent', '12', '24/7'], ['Seoul Gangnam Smart Station', 'Seoul', '18', '24/7'], ['Samarkand Station Plaza', 'Samarkand', '8', '06:00–24:00']]} /></div>; };

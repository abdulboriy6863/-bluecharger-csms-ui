import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './ChargerManagementPage.module.scss';

export const ChargerManagementPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('infrastructure.chargers')} description="Register chargers, assign stations and manage live device metadata." actionLabel="Add charger" columns={['Charger', 'Station', 'Model', 'Status']} rows={[['CHG-TAS-001', 'Tashkent Central Mall', 'HyperCharger 150kW Dual', 'Charging'], ['CHG-SEL-014', 'Seoul Gangnam Smart', 'UrbanCharge 60', 'Available'], ['CHG-SAM-003', 'Samarkand Station Plaza', 'K-Mobility Fast', 'Offline']]} /></div>; };

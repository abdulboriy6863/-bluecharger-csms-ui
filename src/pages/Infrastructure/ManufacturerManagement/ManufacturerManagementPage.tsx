import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './ManufacturerManagementPage.module.scss';

export const ManufacturerManagementPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('infrastructure.manufacturers')} description="Manage charger manufacturers and their network compatibility." actionLabel="Add manufacturer" columns={['Manufacturer', 'Models', 'Chargers', 'Status']} rows={[['Signet EV Systems', '8', '84', 'Active'], ['BlueCharge Hardware', '4', '42', 'Active'], ['K-Energy Mobility', '3', '16', 'Active']]} /></div>; };

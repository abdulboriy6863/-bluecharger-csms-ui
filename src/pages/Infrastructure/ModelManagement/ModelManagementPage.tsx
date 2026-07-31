import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { ManagementPageFrame } from '../../SystemManagement/shared/ManagementPageFrame';
import styles from './ModelManagementPage.module.scss';

export const ModelManagementPage: React.FC = () => { const { t } = useI18n(); return <div className={styles.page}><ManagementPageFrame title={t('infrastructure.models')} description="Maintain charger model specifications, protocols and connector support." actionLabel="Add model" columns={['Model', 'Manufacturer', 'Power', 'Protocol']} rows={[['HyperCharger 150kW Dual', 'Signet EV Systems', '150 kW', 'OCPP 1.6J'], ['UrbanCharge 60', 'BlueCharge Hardware', '60 kW', 'OCPP 2.0.1'], ['K-Mobility Fast', 'K-Energy Mobility', '180 kW', 'OCPP 1.6J']]} /></div>; };

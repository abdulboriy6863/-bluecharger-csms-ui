import React from 'react';
import { Charger } from '../../../types/charger';
import { LiveMonitoring } from '../../../components/monitoring/LiveMonitoring';
import styles from './ChargerStatusPage.module.scss';

interface ChargerStatusPageProps { chargers: Charger[]; onSelectCharger: (charger: Charger) => void; onOpenControlModal: (charger: Charger) => void; }

export const ChargerStatusPage: React.FC<ChargerStatusPageProps> = (props) => <section className={styles.page} aria-label="Charger Status"><LiveMonitoring {...props} /></section>;

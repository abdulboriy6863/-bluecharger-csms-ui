import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Charger } from '../../../types/charger';
import { ChargerTable } from '../../../components/monitoring/ChargerTable';
import { useI18n } from '../../../i18n/I18nContext';
import styles from './ChargerControlPage.module.scss';

interface ChargerControlPageProps { chargers: Charger[]; onSelectCharger: (charger: Charger) => void; onOpenControlModal: (charger: Charger) => void; }

export const ChargerControlPage: React.FC<ChargerControlPageProps> = ({ chargers, onSelectCharger, onOpenControlModal }) => {
  const { t } = useI18n();
  return <section className={styles.page}><div className={styles.header}><div><p className={styles.eyebrow}>SYSTEM HOME / REMOTE OPERATIONS</p><h1>{t('home.chargerControl')}</h1><p className={styles.subtitle}>Select a charger to send an authorized remote command.</p></div><div className={styles.commandBadge}><SlidersHorizontal size={16} /> OCPP command center</div></div><div className={styles.notice}><strong>Operational control</strong><span>Every command is recorded with the operator, target charger and timestamp for audit.</span></div><ChargerTable chargers={chargers} onSelectCharger={onSelectCharger} onOpenControlModal={onOpenControlModal} /></section>;
};

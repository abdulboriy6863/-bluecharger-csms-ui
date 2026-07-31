import React from 'react';
import { MapPin, Search, CircleCheck, AlertTriangle } from 'lucide-react';
import { Card } from '../../../components/common/Card/Card';
import { useI18n } from '../../../i18n/I18nContext';
import styles from './InstallationLocationsPage.module.scss';

const locations = [
  { name: 'Tashkent Central Hub', region: 'Tashkent, Uzbekistan', chargers: 45, online: 42, state: 'Operational' },
  { name: 'Samarkand Silk Road', region: 'Samarkand, Uzbekistan', chargers: 28, online: 28, state: 'Operational' },
  { name: 'Seoul Smart Grid', region: 'Seoul, South Korea', chargers: 40, online: 38, state: 'Attention' },
  { name: 'Busan Maritime Depot', region: 'Busan, South Korea', chargers: 29, online: 24, state: 'Attention' },
];

export const InstallationLocationsPage: React.FC = () => {
  const { t } = useI18n();
  return (
    <section className={styles.page}>
      <div className={styles.header}><div><p className={styles.eyebrow}>SYSTEM HOME / NETWORK MAP</p><h1>{t('home.locations')}</h1><p className={styles.subtitle}>Track installation sites, regional coverage and station health.</p></div><button className={styles.searchButton} type="button"><Search size={16} /> Search locations</button></div>
      <div className={styles.layout}>
        <Card title="Installation map" subtitle="Global station footprint"><div className={styles.map}><div className={styles.mapGrid} />{locations.map((location, index) => <span key={location.name} className={`${styles.mapPin} ${styles[`pin${index}`]}`} title={location.name}><MapPin size={22} /></span>)}<div className={styles.mapLabel}>BlueNetworks global network</div></div></Card>
        <Card title="Installation locations" subtitle={`${locations.length} active regions`}><div className={styles.locationList}>{locations.map((location) => <div className={styles.locationRow} key={location.name}><div className={styles.locationIcon}><MapPin size={16} /></div><div className={styles.locationInfo}><strong>{location.name}</strong><span>{location.region}</span></div><div className={styles.locationHealth}><strong>{location.online}/{location.chargers}</strong><span className={location.state === 'Operational' ? styles.ok : styles.attention}>{location.state === 'Operational' ? <CircleCheck size={13} /> : <AlertTriangle size={13} />} {location.state}</span></div></div>)}</div></Card>
      </div>
    </section>
  );
};

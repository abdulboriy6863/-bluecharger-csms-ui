import React from 'react';
import styles from '../../../styles/systemHome/InstallationLocationsView.module.scss';
import { MapPin } from 'lucide-react';

export const InstallationLocationsView: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        <MapPin size={24} style={{ verticalAlign: 'middle', marginRight: '8px', color: '#0284c7' }} />
        Installation Locations (설치/위치 현황)
      </h2>
      <p className={styles.description}>
        System Home - Installation Locations UI komponentlari, xarita va stansiyalar joylashuvi preview paneli.
      </p>
    </div>
  );
};

export default InstallationLocationsView;

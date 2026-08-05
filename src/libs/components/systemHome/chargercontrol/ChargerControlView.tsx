import React from 'react';
import styles from '../../../../scss/systemHome/ChargerControlView.module.scss';
import { Sliders } from 'lucide-react';

export const ChargerControlView: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        <Sliders size={24} style={{ verticalAlign: 'middle', marginRight: '8px', color: '#9333ea' }} />
        Charger Control (충전기 제어)
      </h2>
      <p className={styles.description}>
        System Home - Charger Control UI komponentlari va masofaviy boshqaruv komandalar paneli.
      </p>
    </div>
  );
};

export default ChargerControlView;

import React from 'react';
import styles from './ChargerStatusView.module.scss';
import { Zap } from 'lucide-react';

export const ChargerStatusView: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        <Zap size={24} style={{ verticalAlign: 'middle', marginRight: '8px', color: '#16a34a' }} />
        Charger Status (충전기 현황)
      </h2>
      <p className={styles.description}>
        System Home - Charger Status UI komponentlari, zaryadlovchilar holati filtri va status matretsasi.
      </p>
    </div>
  );
};

export default ChargerStatusView;

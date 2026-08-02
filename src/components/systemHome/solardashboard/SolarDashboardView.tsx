import React from 'react';
import styles from '../../../scss/systemHome/SolarDashboardView.module.scss';
import { Sun } from 'lucide-react';

export const SolarDashboardView: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        <Sun size={24} style={{ verticalAlign: 'middle', marginRight: '8px', color: '#f59e0b' }} />
        Solar Dashboard (태양광 모니터링)
      </h2>
      <p className={styles.description}>
        System Home - Solar Dashboard UI komponentlari va quyosh energiyasi generatsiyasi statistikasi.
      </p>
    </div>
  );
};

export default SolarDashboardView;

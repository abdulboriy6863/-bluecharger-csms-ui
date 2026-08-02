import React from 'react';
import styles from '../../../scss/systemHome/DashboardSections.module.scss';
import { Zap } from 'lucide-react';

export const ChargerStatusSection: React.FC = () => {
  return (
    <section className={`${styles.section} ${styles.chargerStatus}`} aria-label="Charger Status Section">
      <div className={styles.sectionHeader}>
        <h2>
          <Zap size={24} />
          Section 2: 충전기 운영현황 & 충전기 상태현황 (커넥터 기준)
        </h2>
        <span className={styles.badge}>Soft Green (#DCFCE7)</span>
      </div>
      <div className={styles.sectionBody}>
        <p><strong>Kelajakdagi mantiq va rejalashtirilgan komponentlar:</strong></p>
        <div className={styles.placeholderCard}>
          <p>⚡ Zaryadlovchi qurilmalar va konnektorlar holati (Charger & Connector Live Status):</p>
          <ul>
            <li><strong>충전기 운영현황 (Operation Status)</strong> — Ishlayotgan, texnik xizmatda, nosoz va ishlamayotgan zaryadlovchilarning umumiy ulushi va statistikasi.</li>
            <li><strong>충전기 상태현황 (커넥터 기준) (Status by Connector)</strong> — Har bir konnektor turi (CCS2, CHAdeMO, AC Type 2) bo'yicha real-vaqt rejimida statuslar (Available, Charging, Faulted, Offline, Preparing).</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

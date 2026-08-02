import React from 'react';
import styles from '../../../scss/systemHome/DashboardSections.module.scss';
import { Tv } from 'lucide-react';

export const AdvertisementSection: React.FC = () => {
  return (
    <section className={`${styles.section} ${styles.advertisement}`} aria-label="Advertisement Section">
      <div className={styles.sectionHeader}>
        <h2>
          <Tv size={24} />
          Section 3: Advertisement (Kompaniya Video / Reklama Paneli)
        </h2>
        <span className={styles.badge}>Soft Purple (#F3E8FF)</span>
      </div>
      <div className={styles.sectionBody}>
        <p><strong>Kelajakdagi mantiq va rejalashtirilgan komponentlar:</strong></p>
        <div className={styles.placeholderCard}>
          <p>📺 Reklama va Media Taqdimot Paneli (Company Video & Promo Banner):</p>
          <ul>
            <li><strong>Kompaniya Taqdimot Videosi</strong> — BlueNetworks / BlueCharger EV infratuzilmasi, brend va loyiha yutuqlari haqida taqdimot videosi (HTML5 Video / Embedded Player).</li>
            <li><strong>Yangi Yangiliklar va Promolar</strong> — Operatorlar hamda mijozlar uchun maxsus aksiyalar, stansiyalar tarmog'ini kengaytirish haqida muhim e'lonlar.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

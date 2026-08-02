import React from 'react';
import styles from '../FirstHomePage.module.scss';
import { ShieldCheck } from 'lucide-react';

export const FooterSection: React.FC = () => {
  return (
    <section className={`${styles.section} ${styles.footerSection}`} aria-label="Footer Section">
      <div className={styles.sectionHeader}>
        <h2>
          <ShieldCheck size={24} />
          Section 5: Footer (Tizim Footeri va Ma'lumotlar)
        </h2>
        <span className={styles.badge}>Dark Slate (#0F172A)</span>
      </div>
      <div className={styles.sectionBody}>
        <p><strong>Kelajakdagi mantiq va rejalashtirilgan komponentlar:</strong></p>
        <div className={styles.placeholderCard}>
          <p>🌐 Tizim Footeri va Ma'lumotlar Bloki (Platform Footer & System Specs):</p>
          <ul>
            <li><strong>Copyright & Branding</strong> — © 2026 BlueNetworks CSMS / BlueCharger EV Operations Platform. All rights reserved.</li>
            <li><strong>Tizim Holati va Versiya</strong> — Network Status: Operational (TLS 1.3 Encryption Active) | Platform Version: v2.4.0-prod.</li>
            <li><strong>Foydali Havolalar</strong> — Qo'llab-quvvatlash xizmati, Maxfiylik siyosati, Foydalanish shartlari va Admin aloqa vositalari.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

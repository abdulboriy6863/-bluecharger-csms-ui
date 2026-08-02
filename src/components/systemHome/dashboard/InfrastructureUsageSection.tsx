import React from 'react';
import styles from '../../../scss/systemHome/DashboardSections.module.scss';
import { Activity } from 'lucide-react';

export const InfrastructureUsageSection: React.FC = () => {
  return (
    <section className={`${styles.section} ${styles.infrastructureUsage}`} aria-label="Infrastructure Usage Section">
      <div className={styles.sectionHeader}>
        <h2>
          <Activity size={24} />
          Section 4: 인프라 현황 & 충전기 이용현황
        </h2>
        <span className={styles.badge}>Soft Amber (#FEF3C7)</span>
      </div>
      <div className={styles.sectionBody}>
        <p><strong>Kelajakdagi mantiq va rejalashtirilgan komponentlar:</strong></p>
        <div className={styles.placeholderCard}>
          <p>📈 Infratuzilma va Foydalanish Analitikasi (Infrastructure & Usage Analytics):</p>
          <ul>
            <li><strong>인프라 현황 (Infrastructure Status)</strong> — Regionlar bo'yicha zaryadlash stansiyalarining taqsimlanishi, transformatorlar quvvati hamda tarmoq yuklamasi.</li>
            <li><strong>충전기 이용현황 (Usage Analytics)</strong> — Kunlik va soatlik eng faol zaryadlash vaqtlari (Peak Hours), seanslarning o'rtacha davomiyligi hamda quvvat iste'moli grafiklari.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import styles from './DashboardSections.module.scss';
import { BarChart3 } from 'lucide-react';

export const GeneralStatisticsSection: React.FC = () => {
  return (
    <section className={`${styles.section} ${styles.generalStats}`} aria-label="General Statistics Section">
      <div className={styles.sectionHeader}>
        <h2>
          <BarChart3 size={24} />
          Section 1: General Statistics
        </h2>
        <span className={styles.badge}>Soft Blue (#E0F2FE)</span>
      </div>
      <div className={styles.sectionBody}>
        <p><strong>Kelajakdagi mantiq va rejalashtirilgan komponentlar:</strong></p>
        <div className={styles.placeholderCard}>
          <p>📊 Asosiy statistik ko'rsatkichlar kartochkalari (General Statistics Cards):</p>
          <ul>
            <li><strong>충전소 수 (전월기준)</strong> — Jami zaryadlash stansiyalari soni va o'tgan oyga nisbatan o'sish ko'rsatkichi (masalan: 1,290 개소 ▲ 1).</li>
            <li><strong>충전기 수 (전월기준)</strong> — Zaryadlash qurilmalari soni: 급속 (Tezkor: 867) va 완속 (Sekin: 1,840).</li>
            <li><strong>충전량 (전월기준)</strong> — Umumiy sarflangan zaryad hajmi (kWh) va o'tgan oyga nisbatan o'zgarish foizi.</li>
            <li><strong>회원가입 현황</strong> — Ro'yxatdan o'tgan mijozlar hamda foydalanuvchilar umumiy soni (masalan: 983 명).</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

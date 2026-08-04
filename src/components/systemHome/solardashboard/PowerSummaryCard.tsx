import React from 'react';
import { ArrowDownLeft, ArrowUpRight, DollarSign } from 'lucide-react';
import styles from '../../../scss/systemHome/PowerSummaryCard.module.scss';
import { useI18n } from '../../../i18n/I18nContext';

interface PowerSummaryCardProps {
  importKw: number;
  exportKw: number;
  revenue: string;
}

const format = (value: number, digits = 1) => value.toFixed(digits);

export const PowerSummaryCard: React.FC<PowerSummaryCardProps> = ({
  importKw,
  exportKw,
  revenue,
}) => {
  const { t } = useI18n();

  return (
    <section className={styles.powerCard}>
      {/* 1. Imported Power */}
      <div className={styles.item}>
        <div className={`${styles.iconWrapper} ${styles.importIcon}`}>
          <ArrowDownLeft size={22} strokeWidth={2.2} />
        </div>
        <div className={styles.info}>
          <span className={styles.label}>{t('solarDashboard.power.import')}</span>
          <div className={styles.valueGroup}>
            <span className={styles.value}>{format(importKw)}</span>
            <span className={styles.unit}>kW</span>
          </div>
        </div>
      </div>

      {/* 2. Exported Power */}
      <div className={styles.item}>
        <div className={`${styles.iconWrapper} ${styles.exportIcon}`}>
          <ArrowUpRight size={22} strokeWidth={2.2} />
        </div>
        <div className={styles.info}>
          <span className={styles.label}>{t('solarDashboard.power.export')}</span>
          <div className={styles.valueGroup}>
            <span className={styles.value}>{format(exportKw)}</span>
            <span className={styles.unit}>kW</span>
          </div>
        </div>
      </div>

      {/* 3. Total Revenue */}
      <div className={styles.item}>
        <div className={`${styles.iconWrapper} ${styles.revenueIcon}`}>
          <DollarSign size={22} strokeWidth={2.2} />
        </div>
        <div className={styles.info}>
          <span className={styles.label}>{t('solarDashboard.power.revenue')}</span>
          <div className={styles.valueGroup}>
            <span className={styles.value}>{revenue}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

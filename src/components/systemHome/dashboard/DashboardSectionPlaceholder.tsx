import React from 'react';
import styles from '../../../scss/systemHome/DashboardSections.module.scss';
import type { DashboardSectionPlaceholderProps } from '../../../libs/types/dashboardSection';

export const DashboardSectionPlaceholder: React.FC<DashboardSectionPlaceholderProps> = ({
  fileName,
  tone,
}) => (
  <section className={`${styles.section} ${styles[tone]}`} aria-label={fileName}>
    <div className={styles.fileMeta}>
      <span className={styles.fileBadge}>TSX</span>
      <strong className={styles.fileName}>{fileName}</strong>
    </div>
  </section>
);

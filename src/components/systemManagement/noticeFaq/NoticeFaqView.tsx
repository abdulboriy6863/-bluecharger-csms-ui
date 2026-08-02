import React from 'react';
import styles from '../../../scss/systemManagement/NoticeFaqView.module.scss';
import { HelpCircle } from 'lucide-react';

export const NoticeFaqView: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        <HelpCircle size={24} style={{ verticalAlign: 'middle', marginRight: '8px', color: '#e11d48' }} />
        Notice / FAQ (공지사항 / FAQ 관리)
      </h2>
      <p className={styles.description}>
        System Management - Notice / FAQ UI komponentlari, e'lonlar hamda ko'p beriladigan savollar paneli.
      </p>
    </div>
  );
};

export default NoticeFaqView;

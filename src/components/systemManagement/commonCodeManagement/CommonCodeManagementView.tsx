import React from 'react';
import styles from './CommonCodeManagementView.module.scss';
import { Code2 } from 'lucide-react';

export const CommonCodeManagementView: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        <Code2 size={24} style={{ verticalAlign: 'middle', marginRight: '8px', color: '#d97706' }} />
        Common Code Management (공통코드 관리)
      </h2>
      <p className={styles.description}>
        System Management - Common Code Management UI komponentlari, tizim kodlari va lug'atlar katalogi.
      </p>
    </div>
  );
};

export default CommonCodeManagementView;

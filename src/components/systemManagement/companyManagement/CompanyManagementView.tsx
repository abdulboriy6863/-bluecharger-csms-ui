import React from 'react';
import styles from '../../../scss/systemManagement/CompanyManagementView.module.scss';
import { Building2 } from 'lucide-react';

export const CompanyManagementView: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        <Building2 size={24} style={{ verticalAlign: 'middle', marginRight: '8px', color: '#0284c7' }} />
        Company Management (사업자/업체 관리)
      </h2>
      <p className={styles.description}>
        System Management - Company Management UI komponentlari, operator va provayder kompaniyalar ro'yxati hamda ma'lumotlari.
      </p>
    </div>
  );
};

export default CompanyManagementView;

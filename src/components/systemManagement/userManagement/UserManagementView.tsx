import React from 'react';
import styles from '../../../scss/systemManagement/UserManagementView.module.scss';
import { Users } from 'lucide-react';

export const UserManagementView: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        <Users size={24} style={{ verticalAlign: 'middle', marginRight: '8px', color: '#16a34a' }} />
        User Management (사용자/운영자 관리)
      </h2>
      <p className={styles.description}>
        System Management - User Management UI komponentlari, admin va operator akkauntlari ro'yxati hamda ruxsatnomalari.
      </p>
    </div>
  );
};

export default UserManagementView;

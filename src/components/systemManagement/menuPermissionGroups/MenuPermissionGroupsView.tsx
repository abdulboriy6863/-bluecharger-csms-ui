import React from 'react';
import styles from '../../../scss/systemManagement/MenuPermissionGroupsView.module.scss';
import { ShieldAlert } from 'lucide-react';

export const MenuPermissionGroupsView: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        <ShieldAlert size={24} style={{ verticalAlign: 'middle', marginRight: '8px', color: '#9333ea' }} />
        Menu Permission Groups (메뉴 권한 그룹 관리)
      </h2>
      <p className={styles.description}>
        System Management - Menu Permission Groups UI komponentlari, ro'llar va menyularga kirish huquqlari sozlamalari.
      </p>
    </div>
  );
};

export default MenuPermissionGroupsView;

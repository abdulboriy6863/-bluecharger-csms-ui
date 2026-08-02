import React from 'react';
import { UserManagementView } from '../../../components/systemManagement/userManagement/UserManagementView';

export const UserManagementPage: React.FC = () => {
  return (
    <section style={{ padding: '24px' }}>
      <UserManagementView />
    </section>
  );
};


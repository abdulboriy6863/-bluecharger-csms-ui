import React from 'react';
import styles from './AppShell.module.scss';
import { Sidebar, NavTab } from '../Sidebar/Sidebar';
import { TopBar } from '../TopBar/TopBar';
import { Language, User } from '../../../types/auth';

interface AppShellProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  user: User | null;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onLogout: () => void;
  liveChargerCount?: number;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  activeTab,
  onTabChange,
  user,
  language,
  onLanguageChange,
  onLogout,
  liveChargerCount,
  children
}) => {
  return (
    <div className={styles.shell}>
      <Sidebar
        activeTab={activeTab}
        onTabChange={onTabChange}
        liveChargerCount={liveChargerCount}
      />
      <div className={styles.mainContainer}>
        <TopBar
          activeTab={activeTab}
          user={user}
          language={language}
          onLanguageChange={onLanguageChange}
          onLogout={onLogout}
        />
        <main className={styles.contentArea}>{children}</main>
      </div>
    </div>
  );
};

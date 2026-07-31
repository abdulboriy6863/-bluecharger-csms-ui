import React from 'react';
import styles from './AppShell.module.scss';
import { TopNavigation, NavTab, SystemHomePage } from '../TopNavigation/TopNavigation';
import { Language, User } from '../../../types/auth';

interface AppShellProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  systemHomePage: SystemHomePage;
  onSystemHomePageChange: (page: SystemHomePage) => void;
  user: User | null;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  activeTab,
  onTabChange,
  systemHomePage,
  onSystemHomePageChange,
  user,
  language,
  onLanguageChange,
  onLogout,
  isDarkMode,
  onToggleDarkMode,
  children
}) => {
  return (
    <div className={`${styles.shell} ${isDarkMode ? 'darkAppMode' : ''}`}>
      <TopNavigation
        activeTab={activeTab}
        onTabChange={onTabChange}
        systemHomePage={systemHomePage}
        onSystemHomePageChange={onSystemHomePageChange}
        user={user}
        language={language}
        onLanguageChange={onLanguageChange}
        onLogout={onLogout}
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
      />
      <main className={styles.contentArea}>{children}</main>
    </div>
  );
};

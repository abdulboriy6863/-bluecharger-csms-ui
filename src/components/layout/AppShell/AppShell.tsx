import React from 'react';
import styles from '../../../scss/layout/AppShell.module.scss';
import { TopNavigation } from '../TopNavigation/TopNavigation';
import type { AppShellProps } from '../../../libs/types/layout';

export const AppShell: React.FC<AppShellProps> = ({
  activeTab,
  onTabChange,
  systemHomePage,
  onSystemHomePageChange,
  systemManagementPage,
  onSystemManagementPageChange,
  memberManagementPage,
  onMemberManagementPageChange,
  infrastructurePage,
  onInfrastructurePageChange,
  historyManagementPage,
  onHistoryManagementPageChange,
  paymentManagementPage,
  onPaymentManagementPageChange,
  purchaseSalesPage,
  onPurchaseSalesPageChange,
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
        systemManagementPage={systemManagementPage}
        onSystemManagementPageChange={onSystemManagementPageChange}
        memberManagementPage={memberManagementPage}
        onMemberManagementPageChange={onMemberManagementPageChange}
        infrastructurePage={infrastructurePage}
        onInfrastructurePageChange={onInfrastructurePageChange}
        historyManagementPage={historyManagementPage}
        onHistoryManagementPageChange={onHistoryManagementPageChange}
        paymentManagementPage={paymentManagementPage}
        onPaymentManagementPageChange={onPaymentManagementPageChange}
        purchaseSalesPage={purchaseSalesPage}
        onPurchaseSalesPageChange={onPurchaseSalesPageChange}
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

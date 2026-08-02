import React from 'react';
import styles from '../../../scss/layout/AppShell.module.scss';
import { TopNavigation, NavTab, SystemHomePage, SystemManagementPage, MemberManagementPage, InfrastructurePage, HistoryManagementPage, PaymentManagementPage, PurchaseSalesPage } from '../TopNavigation/TopNavigation';
import { Language, User } from '../../../types/auth';

interface AppShellProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  systemHomePage: SystemHomePage;
  onSystemHomePageChange: (page: SystemHomePage) => void;
  systemManagementPage: SystemManagementPage;
  onSystemManagementPageChange: (page: SystemManagementPage) => void;
  memberManagementPage: MemberManagementPage;
  onMemberManagementPageChange: (page: MemberManagementPage) => void;
  infrastructurePage: InfrastructurePage;
  onInfrastructurePageChange: (page: InfrastructurePage) => void;
  historyManagementPage: HistoryManagementPage;
  onHistoryManagementPageChange: (page: HistoryManagementPage) => void;
  paymentManagementPage: PaymentManagementPage;
  onPaymentManagementPageChange: (page: PaymentManagementPage) => void;
  purchaseSalesPage: PurchaseSalesPage;
  onPurchaseSalesPageChange: (page: PurchaseSalesPage) => void;
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

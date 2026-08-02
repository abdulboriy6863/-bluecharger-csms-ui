import type { ReactNode } from 'react';
import type { Language, User } from './auth';

export type NavTab =
  | 'overview'
  | 'monitoring'
  | 'control'
  | 'stations'
  | 'customers'
  | 'sessions'
  | 'billing'
  | 'tariffs'
  | 'reports'
  | 'settings';

export type SystemHomePage = 'dashboard' | 'solar' | 'locations' | 'charger-status' | 'charger-control';
export type SystemManagementPage = 'companies' | 'users' | 'permissions' | 'common-codes' | 'notice-faq';
export type MemberManagementPage = 'groups' | 'information' | 'notifications' | 'support' | 'grades';
export type InfrastructurePage = 'manufacturers' | 'models' | 'stations' | 'chargers' | 'soc-limits' | 'power-limits';
export type HistoryManagementPage = 'charging' | 'payments' | 'control' | 'communication' | 'errors' | 'charging-graph' | 'prepaid';
export type PaymentManagementPage = 'tariffs' | 'settlement' | 'receivables' | 'prepaid';
export type PurchaseSalesPage = 'purchases' | 'sales' | 'summary' | 'performance' | 'net-profit';

export interface ModuleNavItem {
  id: string;
  labelKey: string;
  tab: NavTab;
  matches: NavTab[];
}

export interface NavigationLanguageOption {
  value: Language;
  label: string;
  title: string;
}

export interface TopNavigationProps {
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
}

export interface AppShellProps extends TopNavigationProps {
  children: ReactNode;
}

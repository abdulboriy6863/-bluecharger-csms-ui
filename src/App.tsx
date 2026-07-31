import React, { useState } from 'react';
import './styles/global.scss';
import { AppShell } from './components/layout/AppShell/AppShell';
import { NavTab, SystemHomePage, SystemManagementPage, MemberManagementPage, InfrastructurePage, HistoryManagementPage, PaymentManagementPage } from './components/layout/TopNavigation/TopNavigation';
import { LoginScreen } from './components/login/LoginScreen';
import { ChargerDetailDrawer } from './components/chargerDetail/ChargerDetailDrawer';
import { ControlCommandModal } from './components/control/ControlCommandModal';
import { mockChargers } from './data/mockChargers';
import { Charger, CommandType, CommandResult } from './types/charger';
import { User } from './types/auth';
import { useI18n } from './i18n/I18nContext';
import { DashboardPage } from './pages/SystemHome/Dashboard/DashboardPage';
import { SolarDashboardPage } from './pages/SystemHome/SolarDashboard/SolarDashboardPage';
import { InstallationLocationsPage } from './pages/SystemHome/InstallationLocations/InstallationLocationsPage';
import { ChargerStatusPage } from './pages/SystemHome/ChargerStatus/ChargerStatusPage';
import { ChargerControlPage } from './pages/SystemHome/ChargerControl/ChargerControlPage';
import { CompanyManagementPage } from './pages/SystemManagement/CompanyManagement/CompanyManagementPage';
import { UserManagementPage } from './pages/SystemManagement/UserManagement/UserManagementPage';
import { MenuPermissionGroupsPage } from './pages/SystemManagement/MenuPermissionGroups/MenuPermissionGroupsPage';
import { CommonCodeManagementPage } from './pages/SystemManagement/CommonCodeManagement/CommonCodeManagementPage';
import { NoticeFaqPage } from './pages/SystemManagement/NoticeFaq/NoticeFaqPage';
import { MemberGroupsPage } from './pages/MemberManagement/MemberGroups/MemberGroupsPage';
import { MemberInformationPage } from './pages/MemberManagement/MemberInformation/MemberInformationPage';
import { MemberNotificationsPage } from './pages/MemberManagement/MemberNotifications/MemberNotificationsPage';
import { MemberSupportPage } from './pages/MemberManagement/MemberSupport/MemberSupportPage';
import { MemberGradesPage } from './pages/MemberManagement/MemberGrades/MemberGradesPage';
import { ManufacturerManagementPage } from './pages/Infrastructure/ManufacturerManagement/ManufacturerManagementPage';
import { ModelManagementPage } from './pages/Infrastructure/ModelManagement/ModelManagementPage';
import { ChargingStationManagementPage } from './pages/Infrastructure/ChargingStationManagement/ChargingStationManagementPage';
import { ChargerManagementPage } from './pages/Infrastructure/ChargerManagement/ChargerManagementPage';
import { SocLimitManagementPage } from './pages/Infrastructure/SocLimitManagement/SocLimitManagementPage';
import { PowerLimitManagementPage } from './pages/Infrastructure/PowerLimitManagement/PowerLimitManagementPage';
import { ChargingHistoryPage } from './pages/HistoryManagement/ChargingHistory/ChargingHistoryPage';
import { PaymentHistoryPage } from './pages/HistoryManagement/PaymentHistory/PaymentHistoryPage';
import { ControlHistoryPage } from './pages/HistoryManagement/ControlHistory/ControlHistoryPage';
import { CommunicationHistoryPage } from './pages/HistoryManagement/CommunicationHistory/CommunicationHistoryPage';
import { ErrorHistoryPage } from './pages/HistoryManagement/ErrorHistory/ErrorHistoryPage';
import { ChargingHistoryGraphPage } from './pages/HistoryManagement/ChargingHistoryGraph/ChargingHistoryGraphPage';
import { PrepaidChargingHistoryPage } from './pages/HistoryManagement/PrepaidChargingHistory/PrepaidChargingHistoryPage';
import { TariffPlanManagementPage } from './pages/PaymentManagement/TariffPlanManagement/TariffPlanManagementPage';
import { SettlementManagementPage } from './pages/PaymentManagement/SettlementManagement/SettlementManagementPage';
import { ReceivablesManagementPage } from './pages/PaymentManagement/ReceivablesManagement/ReceivablesManagementPage';
import { PrepaidManagementPage } from './pages/PaymentManagement/PrepaidManagement/PrepaidManagementPage';

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { language, setLanguage, t } = useI18n();
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [systemHomePage, setSystemHomePage] = useState<SystemHomePage>('dashboard');
  const [systemManagementPage, setSystemManagementPage] = useState<SystemManagementPage>('companies');
  const [memberManagementPage, setMemberManagementPage] = useState<MemberManagementPage>('groups');
  const [infrastructurePage, setInfrastructurePage] = useState<InfrastructurePage>('manufacturers');
  const [historyManagementPage, setHistoryManagementPage] = useState<HistoryManagementPage>('charging');
  const [paymentManagementPage, setPaymentManagementPage] = useState<PaymentManagementPage>('tariffs');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [user] = useState<User>({
    id: 'USR-8821',
    name: 'Abdulboriy (Operator)',
    email: 'admin@bluenetwork.io',
    role: 'Operator Admin',
    company: 'BlueNetworks Global',
  });

  // State for Charger Dataset & Modals
  const [chargers, setChargers] = useState<Charger[]>(mockChargers);
  const [selectedCharger, setSelectedCharger] = useState<Charger | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const [controlModal, setControlModal] = useState<{
    isOpen: boolean;
    charger: Charger | null;
    initialCommand?: CommandType;
  }>({
    isOpen: false,
    charger: null,
    initialCommand: 'RemoteStartTransaction',
  });

  const handleSelectCharger = (charger: Charger) => {
    setSelectedCharger(charger);
    setIsDrawerOpen(true);
  };

  const handleOpenControlModal = (charger: Charger, defaultCommand?: CommandType) => {
    setControlModal({
      isOpen: true,
      charger,
      initialCommand: defaultCommand || 'RemoteStartTransaction',
    });
  };

  const handleCommandExecuted = (result: CommandResult) => {
    if (result.status === 'SUCCESS') {
      // Dynamically reflect mock status change
      setChargers((prev) =>
        prev.map((c) => {
          if (c.id === result.chargerId) {
            let newStatus = c.status;
            if (result.commandType === 'RemoteStartTransaction') newStatus = 'Charging';
            if (result.commandType === 'RemoteStopTransaction') newStatus = 'Available';
            if (result.commandType === 'Reset') newStatus = 'Available';
            return { ...c, status: newStatus, lastStatusChange: 'Just now' };
          }
          return c;
        })
      );
    }
  };

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
  };

  if (!isAuthenticated) {
    return (
      <LoginScreen
        onLoginSuccess={() => setIsAuthenticated(true)}
        language={language}
        onLanguageChange={setLanguage}
      />
    );
  }

  return (
    <AppShell
      activeTab={activeTab}
      onTabChange={handleTabChange}
      systemHomePage={systemHomePage}
      onSystemHomePageChange={setSystemHomePage}
      systemManagementPage={systemManagementPage}
      onSystemManagementPageChange={setSystemManagementPage}
      memberManagementPage={memberManagementPage}
      onMemberManagementPageChange={setMemberManagementPage}
      infrastructurePage={infrastructurePage}
      onInfrastructurePageChange={setInfrastructurePage}
      historyManagementPage={historyManagementPage}
      onHistoryManagementPageChange={setHistoryManagementPage}
      paymentManagementPage={paymentManagementPage}
      onPaymentManagementPageChange={setPaymentManagementPage}
      user={user}
      language={language}
      onLanguageChange={setLanguage}
      onLogout={() => setIsAuthenticated(false)}
      isDarkMode={isDarkMode}
      onToggleDarkMode={() => setIsDarkMode((current) => !current)}
    >
      {activeTab === 'overview' && systemHomePage === 'dashboard' && (
        <DashboardPage
          onNavigateMonitoring={() => { setSystemHomePage('charger-status'); setActiveTab('monitoring'); }}
          onSelectCharger={(id) => {
            const found = chargers.find((c) => c.id === id);
            if (found) handleSelectCharger(found);
            else { setSystemHomePage('charger-status'); setActiveTab('monitoring'); }
          }}
        />
      )}

      {activeTab === 'overview' && systemHomePage === 'solar' && <SolarDashboardPage />}
      {activeTab === 'overview' && systemHomePage === 'locations' && <InstallationLocationsPage />}

      {activeTab === 'monitoring' && systemHomePage === 'charger-status' && (
        <ChargerStatusPage
          chargers={chargers}
          onSelectCharger={handleSelectCharger}
          onOpenControlModal={handleOpenControlModal}
        />
      )}

      {activeTab === 'control' && systemHomePage === 'charger-control' && (
        <ChargerControlPage
          chargers={chargers}
          onSelectCharger={handleSelectCharger}
          onOpenControlModal={handleOpenControlModal}
        />
      )}

      {activeTab === 'settings' && systemManagementPage === 'companies' && <CompanyManagementPage />}
      {activeTab === 'settings' && systemManagementPage === 'users' && <UserManagementPage />}
      {activeTab === 'settings' && systemManagementPage === 'permissions' && <MenuPermissionGroupsPage />}
      {activeTab === 'settings' && systemManagementPage === 'common-codes' && <CommonCodeManagementPage />}
      {activeTab === 'settings' && systemManagementPage === 'notice-faq' && <NoticeFaqPage />}

      {activeTab === 'customers' && memberManagementPage === 'groups' && <MemberGroupsPage />}
      {activeTab === 'customers' && memberManagementPage === 'information' && <MemberInformationPage />}
      {activeTab === 'customers' && memberManagementPage === 'notifications' && <MemberNotificationsPage />}
      {activeTab === 'customers' && memberManagementPage === 'support' && <MemberSupportPage />}
      {activeTab === 'customers' && memberManagementPage === 'grades' && <MemberGradesPage />}

      {activeTab === 'stations' && infrastructurePage === 'manufacturers' && <ManufacturerManagementPage />}
      {activeTab === 'stations' && infrastructurePage === 'models' && <ModelManagementPage />}
      {activeTab === 'stations' && infrastructurePage === 'stations' && <ChargingStationManagementPage />}
      {activeTab === 'stations' && infrastructurePage === 'chargers' && <ChargerManagementPage />}
      {activeTab === 'stations' && infrastructurePage === 'soc-limits' && <SocLimitManagementPage />}
      {activeTab === 'stations' && infrastructurePage === 'power-limits' && <PowerLimitManagementPage />}

      {activeTab === 'sessions' && historyManagementPage === 'charging' && <ChargingHistoryPage />}
      {activeTab === 'sessions' && historyManagementPage === 'payments' && <PaymentHistoryPage />}
      {activeTab === 'sessions' && historyManagementPage === 'control' && <ControlHistoryPage />}
      {activeTab === 'sessions' && historyManagementPage === 'communication' && <CommunicationHistoryPage />}
      {activeTab === 'sessions' && historyManagementPage === 'errors' && <ErrorHistoryPage />}
      {activeTab === 'sessions' && historyManagementPage === 'charging-graph' && <ChargingHistoryGraphPage />}
      {activeTab === 'sessions' && historyManagementPage === 'prepaid' && <PrepaidChargingHistoryPage />}

      {activeTab === 'billing' && paymentManagementPage === 'tariffs' && <TariffPlanManagementPage />}
      {activeTab === 'billing' && paymentManagementPage === 'settlement' && <SettlementManagementPage />}
      {activeTab === 'billing' && paymentManagementPage === 'receivables' && <ReceivablesManagementPage />}
      {activeTab === 'billing' && paymentManagementPage === 'prepaid' && <PrepaidManagementPage />}

      {activeTab !== 'overview' && activeTab !== 'monitoring' && activeTab !== 'control' && activeTab !== 'settings' && activeTab !== 'customers' && activeTab !== 'stations' && activeTab !== 'sessions' && activeTab !== 'billing' && (
        <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
            {activeTab.toUpperCase()} {t('nav.events')}
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>
            {t('overview.subtitle')}
          </p>
        </div>
      )}

      {/* Detail Drawer */}
      <ChargerDetailDrawer
        charger={selectedCharger}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpenControlModal={handleOpenControlModal}
      />

      {/* Control Command Modal */}
      <ControlCommandModal
        charger={controlModal.charger}
        initialCommand={controlModal.initialCommand}
        isOpen={controlModal.isOpen}
        onClose={() => setControlModal({ isOpen: false, charger: null })}
        onCommandExecuted={handleCommandExecuted}
      />
    </AppShell>
  );
};

export default App;

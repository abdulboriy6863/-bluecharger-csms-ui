import React, { useState } from 'react';
import './styles/global.scss';
import { AppShell } from './components/layout/AppShell/AppShell';
import { NavTab } from './components/layout/Sidebar/Sidebar';
import { LoginScreen } from './components/login/LoginScreen';
import { OverviewDashboard } from './components/overview/OverviewDashboard';
import { LiveMonitoring } from './components/monitoring/LiveMonitoring';
import { ChargerDetailDrawer } from './components/chargerDetail/ChargerDetailDrawer';
import { ControlCommandModal } from './components/control/ControlCommandModal';
import { mockChargers } from './data/mockChargers';
import { Charger, CommandType, CommandResult } from './types/charger';
import { User, Language } from './types/auth';

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<NavTab>('overview');

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
      onTabChange={setActiveTab}
      user={user}
      language={language}
      onLanguageChange={setLanguage}
      onLogout={() => setIsAuthenticated(false)}
      liveChargerCount={chargers.length}
    >
      {activeTab === 'overview' && (
        <OverviewDashboard
          onNavigateMonitoring={() => setActiveTab('monitoring')}
          onSelectCharger={(id) => {
            const found = chargers.find((c) => c.id === id);
            if (found) handleSelectCharger(found);
            else setActiveTab('monitoring');
          }}
        />
      )}

      {activeTab === 'monitoring' && (
        <LiveMonitoring
          chargers={chargers}
          onSelectCharger={handleSelectCharger}
          onOpenControlModal={handleOpenControlModal}
        />
      )}

      {activeTab !== 'overview' && activeTab !== 'monitoring' && (
        <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
            {activeTab.toUpperCase()} Module
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>
            This operational module will be integrated after approval of the P0 flow.
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

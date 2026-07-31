import React from 'react';
import styles from './Sidebar.module.scss';
import clsx from 'clsx';
import {
  Zap,
  LayoutDashboard,
  Activity,
  Sliders,
  MapPin,
  Users,
  Clock,
  CreditCard,
  Tag,
  BarChart3,
  Settings
} from 'lucide-react';

export type NavTab = 'overview' | 'monitoring' | 'control' | 'stations' | 'customers' | 'sessions' | 'billing' | 'tariffs' | 'reports' | 'settings';

type NavItem = {
  id: NavTab;
  label: string;
  description: string;
  icon: React.ReactNode;
  badge?: number | string;
};

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  liveChargerCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  liveChargerCount = 142
}) => {
  const mainNav: NavItem[] = [
    { id: 'overview', label: 'Overview', description: 'Network health', icon: <LayoutDashboard size={18} /> },
    { id: 'monitoring', label: 'Live Monitoring', description: 'Real-time chargers', icon: <Activity size={18} />, badge: liveChargerCount },
    { id: 'control', label: 'Control Center', description: 'Remote commands', icon: <Sliders size={18} /> },
  ];

  const operationalNav: NavItem[] = [
    { id: 'stations', label: 'Stations & Chargers', description: 'Sites and hardware', icon: <MapPin size={18} /> },
    { id: 'customers', label: 'Customers & Tokens', description: 'Drivers and auth', icon: <Users size={18} /> },
    { id: 'sessions', label: 'Charging Sessions', description: 'History and logs', icon: <Clock size={18} /> },
  ];

  const businessNav: NavItem[] = [
    { id: 'billing', label: 'Billing & Settlement', description: 'Payments and invoices', icon: <CreditCard size={18} /> },
    { id: 'tariffs', label: 'Tariffs & Promotions', description: 'Plans and campaigns', icon: <Tag size={18} /> },
    { id: 'reports', label: 'Analytics & Reports', description: 'Performance views', icon: <BarChart3 size={18} /> },
    { id: 'settings', label: 'Admin Settings', description: 'Users and roles', icon: <Settings size={18} /> },
  ];

  const renderNavGroup = (title: string, items: NavItem[]) => (
    <>
      <div className={styles.sectionTitle}>{title}</div>
      {items.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            className={clsx(styles.navItem, isActive && styles.active)}
            onClick={() => onTabChange(item.id)}
          >
            <div className={styles.leftGroup}>
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navCopy}>
                <span className={styles.navLabel}>{item.label}</span>
                <span className={styles.navDescription}>{item.description}</span>
              </span>
            </div>
            {item.badge !== undefined && (
              <span className={styles.badge}>{item.badge}</span>
            )}
          </button>
        );
      })}
    </>
  );

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brandHeader}>
        <div className={styles.logo}>
          <div className={styles.iconBadge}>
            <Zap size={22} color="#ffffff" />
          </div>
          <div className={styles.brandText}>
            <span className={styles.name}>BlueNetwork</span>
            <span className={styles.subtitle}>EV Operations</span>
          </div>
        </div>
      </div>

      <div className={styles.networkCard}>
        <span className={styles.networkLabel}>Network status</span>
        <strong>1,284 online</strong>
        <span className={styles.networkMeta}>342 active sessions</span>
      </div>

      <nav className={styles.navSection}>
        {renderNavGroup('Core Operations', mainNav)}
        {renderNavGroup('Infrastructure', operationalNav)}
        {renderNavGroup('Business & Admin', businessNav)}
      </nav>

      <div className={styles.footer}>
        <div className={styles.statusIndicator}>
          <span className={styles.statusLabel}>
            <span className={styles.liveDot} />
            OCPP Network Live
          </span>
          <span className={styles.version}>v2.4.0</span>
        </div>
      </div>
    </aside>
  );
};

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
  const mainNav = [
    { id: 'overview' as NavTab, label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'monitoring' as NavTab, label: 'Live Monitoring', icon: <Activity size={18} />, badge: liveChargerCount },
    { id: 'control' as NavTab, label: 'Control Center', icon: <Sliders size={18} /> },
  ];

  const operationalNav = [
    { id: 'stations' as NavTab, label: 'Stations & Chargers', icon: <MapPin size={18} /> },
    { id: 'customers' as NavTab, label: 'Customers & Tokens', icon: <Users size={18} /> },
    { id: 'sessions' as NavTab, label: 'Charging Sessions', icon: <Clock size={18} /> },
  ];

  const businessNav = [
    { id: 'billing' as NavTab, label: 'Billing & Settlement', icon: <CreditCard size={18} /> },
    { id: 'tariffs' as NavTab, label: 'Tariffs & Promotions', icon: <Tag size={18} /> },
    { id: 'reports' as NavTab, label: 'Analytics & Reports', icon: <BarChart3 size={18} /> },
    { id: 'settings' as NavTab, label: 'Admin Settings', icon: <Settings size={18} /> },
  ];

  const renderNavGroup = (title: string, items: typeof mainNav) => (
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
              <span>{item.label}</span>
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
            <span className={styles.name}>BLUENETWORK</span>
            <span className={styles.subtitle}>CSMS Platform</span>
          </div>
        </div>
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

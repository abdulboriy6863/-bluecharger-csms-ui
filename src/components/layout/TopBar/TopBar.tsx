import React, { useState, useEffect } from 'react';
import styles from './TopBar.module.scss';
import { Search, Bell, Clock, LogOut, Building2, ChevronDown } from 'lucide-react';
import { Input } from '../../common/Input/Input';
import { Select } from '../../common/Select/Select';
import { Language, User } from '../../../types/auth';
import { NavTab } from '../Sidebar/Sidebar';

interface TopBarProps {
  activeTab: NavTab;
  user: User | null;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onLogout: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  user,
  language,
  onLanguageChange,
  onLogout
}) => {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'uz', label: "O'zbek" },
    { value: 'ru', label: 'Русский' },
    { value: 'ko', label: '한국어' },
  ];

  const pageMeta: Record<NavTab, { title: string; eyebrow: string }> = {
    overview: { title: 'Overview', eyebrow: 'Network command dashboard' },
    monitoring: { title: 'Live Monitoring', eyebrow: 'Real-time charger visibility' },
    control: { title: 'Control Center', eyebrow: 'Remote operations and commands' },
    stations: { title: 'Stations & Chargers', eyebrow: 'Infrastructure management' },
    customers: { title: 'Customers & Tokens', eyebrow: 'Driver and authentication records' },
    sessions: { title: 'Charging Sessions', eyebrow: 'Session history and activity' },
    billing: { title: 'Billing & Settlement', eyebrow: 'Payments, invoices, and settlement' },
    tariffs: { title: 'Tariffs & Promotions', eyebrow: 'Plans, schedules, and campaigns' },
    reports: { title: 'Analytics & Reports', eyebrow: 'Performance and exports' },
    settings: { title: 'Admin Settings', eyebrow: 'Users, roles, and platform setup' },
  };

  const currentPage = pageMeta[activeTab];

  return (
    <header className={styles.topBar}>
      <div className={styles.leftSection}>
        <div className={styles.pageTitleBlock}>
          <span className={styles.eyebrow}>{currentPage.eyebrow}</span>
          <h1>{currentPage.title}</h1>
        </div>
        <div className={styles.searchBox}>
          <Input
            placeholder="Search chargers, stations, customers..."
            icon={<Search size={16} />}
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        <button className={styles.companyPicker} type="button">
          <Building2 size={16} />
          <span>BlueNetworks Global</span>
          <ChevronDown size={14} />
        </button>

        <div className={styles.liveTime}>
          <Clock size={14} className={styles.clockIcon} />
          <span>UTC+5:</span>
          <span className={styles.timeValue}>{timeString}</span>
        </div>

        <div className={styles.langSelector}>
          <Select
            value={language}
            options={languageOptions}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
          />
        </div>

        <button className={styles.iconBtn} title="Notifications (2 Alerts)">
          <Bell size={18} />
          <span className={styles.badgeDot} />
        </button>

        {user && (
          <div className={styles.userProfile}>
            <div className={styles.avatar}>
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className={styles.userInfo}>
              <span className={styles.name}>{user.name}</span>
              <span className={styles.role}>{user.role}</span>
            </div>
          </div>
        )}

        <button className={styles.logoutBtn} onClick={onLogout} title="Sign Out">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

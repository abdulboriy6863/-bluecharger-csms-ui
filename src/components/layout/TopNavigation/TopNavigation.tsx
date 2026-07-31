import React, { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import {
  Bell,
  ChevronDown,
  Globe2,
  Lock,
  LogOut,
  Moon,
  Settings,
  Sun,
  UserRound,
} from 'lucide-react';
import { Language, User } from '../../../types/auth';
import styles from './TopNavigation.module.scss';

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

type ModuleNavItem = {
  id: string;
  label: string;
  tab: NavTab;
  matches: NavTab[];
};

interface TopNavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  user: User | null;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const moduleNavItems: ModuleNavItem[] = [
  {
    id: 'system-home',
    label: 'Tizim bosh sahifasi',
    tab: 'overview',
    matches: ['overview', 'monitoring', 'control'],
  },
  {
    id: 'system-admin',
    label: 'Tizim boshqaruvi',
    tab: 'settings',
    matches: ['settings'],
  },
  {
    id: 'members',
    label: "A'zolar boshqaruvi",
    tab: 'customers',
    matches: ['customers'],
  },
  {
    id: 'infrastructure',
    label: 'Infratuzilma',
    tab: 'stations',
    matches: ['stations'],
  },
  {
    id: 'history',
    label: "Tarix ma'lumotlari",
    tab: 'sessions',
    matches: ['sessions'],
  },
  {
    id: 'events',
    label: '이벤트',
    tab: 'tariffs',
    matches: ['tariffs'],
  },
  {
    id: 'payments',
    label: "To'lov ma'lumotlari",
    tab: 'billing',
    matches: ['billing'],
  },
  {
    id: 'sales',
    label: 'Harid sotuv',
    tab: 'reports',
    matches: ['reports'],
  },
];

const languageOptions: Array<{ value: Language; label: string; title: string }> = [
  { value: 'en', label: 'ENG', title: 'English' },
  { value: 'ko', label: 'KOR', title: 'Korean' },
  { value: 'ru', label: 'RUS', title: 'Russian' },
  { value: 'hi', label: 'IND', title: 'Indian' },
  { value: 'id', label: 'IDN', title: 'Indonesian' },
  { value: 'ky', label: 'KRG', title: 'Kyrgyz' },
];

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeTab,
  onTabChange,
  user,
  language,
  onLanguageChange,
  onLogout,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [dateTime, setDateTime] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const date = now.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      const time = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      });
      setDateTime(`${date} ${time}`);
    };

    updateDateTime();
    const timer = window.setInterval(updateDateTime, 30000);
    return () => window.clearInterval(timer);
  }, []);

  const selectedLanguage = useMemo(
    () => languageOptions.find((option) => option.value === language) ?? languageOptions[0],
    [language]
  );

  return (
    <header className={styles.navigationShell}>
      <div className={styles.utilityBar}>
        <button className={styles.brandLockup} type="button" onClick={() => onTabChange('overview')}>
          <span className={styles.brandMain}>BLUE NETWORKS</span>
          <span className={styles.brandSub}>(주)블루네트웍스</span>
        </button>

        <div className={styles.utilityCenter} aria-label="Current date and time">
          {dateTime}
        </div>

        <div className={styles.utilityActions}>
          <div className={styles.welcomeBlock}>
            <UserRound size={24} />
            <span>
              <strong>Welcome!</strong>
              <small>{user?.role ?? 'Operator'} | {user?.company ?? 'BlueNetworks'}</small>
            </span>
          </div>

          <div className={styles.languageSelect}>
            <Globe2 size={15} />
            <select
              value={language}
              aria-label="Select language"
              onChange={(event) => onLanguageChange(event.target.value as Language)}
              title={selectedLanguage.title}
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} />
          </div>

          <button className={styles.iconAction} type="button" title="User profile">
            <Settings size={22} />
            <span>User</span>
          </button>

          <button className={styles.iconOnlyAction} type="button" title="Security lock">
            <Lock size={22} />
          </button>

          <button className={styles.iconAction} type="button" onClick={onLogout} title="Logout">
            <LogOut size={22} />
            <span>Logout</span>
          </button>

          <button className={styles.iconOnlyAction} type="button" title="Notifications">
            <Bell size={23} />
            <span className={styles.alertDot} />
          </button>

          <button
            className={clsx(styles.iconOnlyAction, styles.themeToggle, isDarkMode && styles.active)}
            type="button"
            onClick={onToggleDarkMode}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>
      </div>

      <nav className={styles.moduleBar} aria-label="Primary modules">
        {moduleNavItems.map((item) => {
          const isActive = item.matches.includes(activeTab);

          return (
            <button
              key={item.id}
              type="button"
              className={clsx(styles.moduleItem, isActive && styles.active)}
              onClick={() => onTabChange(item.tab)}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

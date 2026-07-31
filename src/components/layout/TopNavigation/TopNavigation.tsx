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
import { useI18n } from '../../../i18n/I18nContext';
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

export type SystemHomePage = 'dashboard' | 'solar' | 'locations' | 'charger-status' | 'charger-control';

type ModuleNavItem = {
  id: string;
  labelKey: string;
  tab: NavTab;
  matches: NavTab[];
};

interface TopNavigationProps {
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
}

const moduleNavItems: ModuleNavItem[] = [
  {
    id: 'system-home',
    labelKey: 'nav.home',
    tab: 'overview',
    matches: ['overview', 'monitoring', 'control'],
  },
  {
    id: 'system-admin',
    labelKey: 'nav.admin',
    tab: 'settings',
    matches: ['settings'],
  },
  {
    id: 'members',
    labelKey: 'nav.members',
    tab: 'customers',
    matches: ['customers'],
  },
  {
    id: 'infrastructure',
    labelKey: 'nav.infrastructure',
    tab: 'stations',
    matches: ['stations'],
  },
  {
    id: 'history',
    labelKey: 'nav.history',
    tab: 'sessions',
    matches: ['sessions'],
  },
  {
    id: 'events',
    labelKey: 'nav.events',
    tab: 'tariffs',
    matches: ['tariffs'],
  },
  {
    id: 'payments',
    labelKey: 'nav.payments',
    tab: 'billing',
    matches: ['billing'],
  },
  {
    id: 'sales',
    labelKey: 'nav.sales',
    tab: 'reports',
    matches: ['reports'],
  },
];

const languageOptions: Array<{ value: Language; label: string; title: string }> = [
  { value: 'en', label: 'English', title: 'English' },
  { value: 'ko', label: '한국어', title: '한국어' },
  { value: 'ru', label: 'Русский', title: 'Русский' },
  { value: 'hi', label: 'हिन्दी', title: 'हिन्दी' },
  { value: 'id', label: 'Bahasa Indonesia', title: 'Bahasa Indonesia' },
  { value: 'ky', label: 'Кыргызча', title: 'Кыргызча' },
];

export const TopNavigation: React.FC<TopNavigationProps> = ({
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
}) => {
  const [dateTime, setDateTime] = useState<string>('');
  const { t, language: activeLanguage } = useI18n();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const localeByLanguage: Record<Language, string> = {
        en: 'en-US', ko: 'ko-KR', ru: 'ru-RU', hi: 'hi-IN', id: 'id-ID', ky: 'ky-KG', uz: 'uz-UZ',
      };
      const date = now.toLocaleDateString(localeByLanguage[activeLanguage], {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      const time = now.toLocaleTimeString(localeByLanguage[activeLanguage], {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      });
      setDateTime(`${date} ${time}`);
    };

    updateDateTime();
    const timer = window.setInterval(updateDateTime, 30000);
    return () => window.clearInterval(timer);
  }, [activeLanguage]);

  const selectedLanguage = useMemo(
    () => languageOptions.find((option) => option.value === language) ?? languageOptions[0],
    [language]
  );

  const isSystemHomeActive = moduleNavItems[0].matches.includes(activeTab);
  const systemHomePages: Array<{ id: SystemHomePage; labelKey: string }> = [
    { id: 'dashboard', labelKey: 'home.dashboard' },
    { id: 'solar', labelKey: 'home.solar' },
    { id: 'locations', labelKey: 'home.locations' },
    { id: 'charger-status', labelKey: 'home.chargerStatus' },
    { id: 'charger-control', labelKey: 'home.chargerControl' },
  ];

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
              <strong>{t('nav.welcome')}</strong>
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

          <button className={styles.iconAction} type="button" title={t('nav.profile')}>
            <Settings size={22} />
            <span>{t('nav.user')}</span>
          </button>

          <button className={styles.iconOnlyAction} type="button" title={t('nav.security')}>
            <Lock size={22} />
          </button>

          <button className={styles.iconAction} type="button" onClick={onLogout} title={t('nav.logout')}>
            <LogOut size={22} />
            <span>{t('nav.logout')}</span>
          </button>

          <button className={styles.iconOnlyAction} type="button" title={t('nav.notifications')}>
            <Bell size={23} />
            <span className={styles.alertDot} />
          </button>

          <button
            className={clsx(styles.iconOnlyAction, styles.themeToggle, isDarkMode && styles.active)}
            type="button"
            onClick={onToggleDarkMode}
            title={isDarkMode ? t('nav.lightMode') : t('nav.darkMode')}
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
              onClick={() => {
                if (item.id === 'system-home') onSystemHomePageChange('dashboard');
                onTabChange(item.tab);
              }}
            >
              {t(item.labelKey)}
            </button>
          );
        })}
      </nav>

      {isSystemHomeActive && (
        <nav className={styles.homeSubnav} aria-label="System Home pages">
          {systemHomePages.map((page) => (
            <button
              key={page.id}
              type="button"
              className={clsx(styles.homeSubnavItem, systemHomePage === page.id && styles.active)}
              onClick={() => {
                onSystemHomePageChange(page.id);
                onTabChange(page.id === 'charger-status' ? 'monitoring' : page.id === 'charger-control' ? 'control' : 'overview');
              }}
            >
              {t(page.labelKey)}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};

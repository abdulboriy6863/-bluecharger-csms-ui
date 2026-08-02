import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import {
  Bell,
  Globe2,
  Lock,
  LogOut,
  Moon,
  Settings,
  Sun,
  UserRound,
} from 'lucide-react';
import type { Language } from '../../../libs/types/auth';
import { useI18n } from '../../../i18n/I18nContext';
import styles from '../../../scss/layout/TopNavigation.module.scss';
import type {
  HistoryManagementPage,
  InfrastructurePage,
  MemberManagementPage,
  ModuleNavItem,
  NavigationLanguageOption,
  PaymentManagementPage,
  PurchaseSalesPage,
  SystemHomePage,
  SystemManagementPage,
  TopNavigationProps,
} from '../../../libs/types/layout';

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

const languageOptions: NavigationLanguageOption[] = [
  { value: 'en', label: 'ENG', title: 'English' },
  { value: 'ko', label: 'KOR', title: '한국어' },
  { value: 'ru', label: 'RUS', title: 'Русский' },
  { value: 'hi', label: 'HIN', title: 'हिन्दी' },
  { value: 'id', label: 'IDN', title: 'Bahasa Indonesia' },
  { value: 'ky', label: 'KYR', title: 'Кыргызча' },
  { value: 'uz', label: 'UZB', title: 'O‘zbekcha' },
];

export const TopNavigation: React.FC<TopNavigationProps> = ({
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
}) => {
  const [dateTime, setDateTime] = useState<string>('');
  const [isHomeSubnavOpen, setIsHomeSubnavOpen] = useState<boolean>(true);
  const [isHomeSubnavClosing, setIsHomeSubnavClosing] = useState<boolean>(false);
  const [isManagementSubnavOpen, setIsManagementSubnavOpen] = useState<boolean>(false);
  const [isManagementSubnavClosing, setIsManagementSubnavClosing] = useState<boolean>(false);
  const [isMemberSubnavOpen, setIsMemberSubnavOpen] = useState<boolean>(false);
  const [isMemberSubnavClosing, setIsMemberSubnavClosing] = useState<boolean>(false);
  const [isInfrastructureSubnavOpen, setIsInfrastructureSubnavOpen] = useState<boolean>(false);
  const [isInfrastructureSubnavClosing, setIsInfrastructureSubnavClosing] = useState<boolean>(false);
  const [isHistorySubnavOpen, setIsHistorySubnavOpen] = useState<boolean>(false);
  const [isHistorySubnavClosing, setIsHistorySubnavClosing] = useState<boolean>(false);
  const [isPaymentSubnavOpen, setIsPaymentSubnavOpen] = useState<boolean>(false);
  const [isPaymentSubnavClosing, setIsPaymentSubnavClosing] = useState<boolean>(false);
  const [isSalesSubnavOpen, setIsSalesSubnavOpen] = useState<boolean>(false);
  const [isSalesSubnavClosing, setIsSalesSubnavClosing] = useState<boolean>(false);
  const { t, language: activeLanguage } = useI18n();
  const languageSelectRef = useRef<HTMLDivElement>(null);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState<boolean>(false);
  const isSystemHomeActive = moduleNavItems[0].matches.includes(activeTab);
  const isSystemManagementActive = activeTab === 'settings';
  const isMemberManagementActive = activeTab === 'customers';
  const isInfrastructureActive = activeTab === 'stations';
  const isHistoryActive = activeTab === 'sessions';
  const isPaymentActive = activeTab === 'billing';
  const isSalesActive = activeTab === 'reports';

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

  useEffect(() => {
    if (!isSystemHomeActive) {
      setIsHomeSubnavOpen(false);
      setIsHomeSubnavClosing(false);
    }
    if (!isSystemManagementActive) {
      setIsManagementSubnavOpen(false);
      setIsManagementSubnavClosing(false);
    }
    if (!isMemberManagementActive) {
      setIsMemberSubnavOpen(false);
      setIsMemberSubnavClosing(false);
    }
    if (!isInfrastructureActive) {
      setIsInfrastructureSubnavOpen(false);
      setIsInfrastructureSubnavClosing(false);
    }
    if (!isHistoryActive) {
      setIsHistorySubnavOpen(false);
      setIsHistorySubnavClosing(false);
    }
    if (!isPaymentActive) {
      setIsPaymentSubnavOpen(false);
      setIsPaymentSubnavClosing(false);
    }
    if (!isSalesActive) {
      setIsSalesSubnavOpen(false);
      setIsSalesSubnavClosing(false);
    }
  }, [activeTab]);

  useEffect(() => {
    const closeLanguageMenu = (event: MouseEvent) => {
      if (!languageSelectRef.current?.contains(event.target as Node)) setIsLanguageMenuOpen(false);
    };
    document.addEventListener('mousedown', closeLanguageMenu);
    return () => document.removeEventListener('mousedown', closeLanguageMenu);
  }, []);

  const toggleHomeSubnav = () => {
    if (isHomeSubnavOpen) {
      setIsHomeSubnavClosing(true);
      window.setTimeout(() => {
        setIsHomeSubnavOpen(false);
        setIsHomeSubnavClosing(false);
      }, 320);
      return;
    }

    setIsHomeSubnavOpen(true);
  };

  const toggleManagementSubnav = () => {
    if (isManagementSubnavOpen) {
      setIsManagementSubnavClosing(true);
      window.setTimeout(() => {
        setIsManagementSubnavOpen(false);
        setIsManagementSubnavClosing(false);
      }, 320);
      return;
    }
    setIsManagementSubnavOpen(true);
  };

  const toggleMemberSubnav = () => {
    if (isMemberSubnavOpen) {
      setIsMemberSubnavClosing(true);
      window.setTimeout(() => {
        setIsMemberSubnavOpen(false);
        setIsMemberSubnavClosing(false);
      }, 320);
      return;
    }
    setIsMemberSubnavOpen(true);
  };

  const toggleInfrastructureSubnav = () => {
    if (isInfrastructureSubnavOpen) {
      setIsInfrastructureSubnavClosing(true);
      window.setTimeout(() => {
        setIsInfrastructureSubnavOpen(false);
        setIsInfrastructureSubnavClosing(false);
      }, 320);
      return;
    }
    setIsInfrastructureSubnavOpen(true);
  };

  const toggleHistorySubnav = () => {
    if (isHistorySubnavOpen) {
      setIsHistorySubnavClosing(true);
      window.setTimeout(() => {
        setIsHistorySubnavOpen(false);
        setIsHistorySubnavClosing(false);
      }, 320);
      return;
    }
    setIsHistorySubnavOpen(true);
  };

  const togglePaymentSubnav = () => {
    if (isPaymentSubnavOpen) {
      setIsPaymentSubnavClosing(true);
      window.setTimeout(() => {
        setIsPaymentSubnavOpen(false);
        setIsPaymentSubnavClosing(false);
      }, 320);
      return;
    }
    setIsPaymentSubnavOpen(true);
  };

  const toggleSalesSubnav = () => {
    if (isSalesSubnavOpen) {
      setIsSalesSubnavClosing(true);
      window.setTimeout(() => {
        setIsSalesSubnavOpen(false);
        setIsSalesSubnavClosing(false);
      }, 320);
      return;
    }
    setIsSalesSubnavOpen(true);
  };

  const selectedLanguage = useMemo(
    () => languageOptions.find((option) => option.value === language) ?? languageOptions[0],
    [language]
  );

  const systemHomePages: Array<{ id: SystemHomePage; labelKey: string }> = [
    { id: 'dashboard', labelKey: 'home.dashboard' },
    { id: 'solar', labelKey: 'home.solar' },
    { id: 'locations', labelKey: 'home.locations' },
    { id: 'charger-status', labelKey: 'home.chargerStatus' },
    { id: 'charger-control', labelKey: 'home.chargerControl' },
  ];
  const systemManagementPages: Array<{ id: SystemManagementPage; labelKey: string }> = [
    { id: 'companies', labelKey: 'management.companies' },
    { id: 'users', labelKey: 'management.users' },
    { id: 'permissions', labelKey: 'management.permissions' },
    { id: 'common-codes', labelKey: 'management.commonCodes' },
    { id: 'notice-faq', labelKey: 'management.noticeFaq' },
  ];
  const memberManagementPages: Array<{ id: MemberManagementPage; labelKey: string }> = [
    { id: 'groups', labelKey: 'members.groups' },
    { id: 'information', labelKey: 'members.information' },
    { id: 'notifications', labelKey: 'members.notifications' },
    { id: 'support', labelKey: 'members.support' },
    { id: 'grades', labelKey: 'members.grades' },
  ];
  const infrastructurePages: Array<{ id: InfrastructurePage; labelKey: string }> = [
    { id: 'manufacturers', labelKey: 'infrastructure.manufacturers' },
    { id: 'models', labelKey: 'infrastructure.models' },
    { id: 'stations', labelKey: 'infrastructure.stations' },
    { id: 'chargers', labelKey: 'infrastructure.chargers' },
    { id: 'soc-limits', labelKey: 'infrastructure.socLimits' },
    { id: 'power-limits', labelKey: 'infrastructure.powerLimits' },
  ];
  const historyPages: Array<{ id: HistoryManagementPage; labelKey: string }> = [
    { id: 'charging', labelKey: 'history.charging' },
    { id: 'payments', labelKey: 'history.payments' },
    { id: 'control', labelKey: 'history.control' },
    { id: 'communication', labelKey: 'history.communication' },
    { id: 'errors', labelKey: 'history.errors' },
    { id: 'charging-graph', labelKey: 'history.chargingGraph' },
    { id: 'prepaid', labelKey: 'history.prepaid' },
  ];
  const paymentPages: Array<{ id: PaymentManagementPage; labelKey: string }> = [
    { id: 'tariffs', labelKey: 'payment.tariffs' },
    { id: 'settlement', labelKey: 'payment.settlement' },
    { id: 'receivables', labelKey: 'payment.receivables' },
    { id: 'prepaid', labelKey: 'payment.prepaid' },
  ];
  const purchaseSalesPages: Array<{ id: PurchaseSalesPage; labelKey: string }> = [
    { id: 'purchases', labelKey: 'sales.purchases' },
    { id: 'sales', labelKey: 'sales.sales' },
    { id: 'summary', labelKey: 'sales.summary' },
    { id: 'performance', labelKey: 'sales.performance' },
    { id: 'net-profit', labelKey: 'sales.netProfit' },
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

          <div className={styles.languageSelect} ref={languageSelectRef}>
            <Globe2 size={15} />
            <button type="button" className={styles.languageTrigger} aria-label="Select language" aria-expanded={isLanguageMenuOpen} onClick={() => setIsLanguageMenuOpen((open) => !open)} title={selectedLanguage.title}>
              {selectedLanguage.label}
            </button>
            {isLanguageMenuOpen && (
              <div className={styles.languageMenu} role="menu">
                {languageOptions.map((option) => (
                  <button key={option.value} type="button" className={styles.languageOption} data-active={option.value === language} onClick={() => { onLanguageChange(option.value); setIsLanguageMenuOpen(false); }}>
                    <span>{option.label}</span><small>{option.title}</small>
                  </button>
                ))}
              </div>
            )}
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
                if (item.id === 'system-home') {
                  onSystemHomePageChange('dashboard');
                  toggleHomeSubnav();
                }
                if (item.id === 'system-admin') {
                  onSystemManagementPageChange('companies');
                  toggleManagementSubnav();
                }
                if (item.id === 'members') {
                  onMemberManagementPageChange('groups');
                  toggleMemberSubnav();
                }
                if (item.id === 'infrastructure') {
                  onInfrastructurePageChange('manufacturers');
                  toggleInfrastructureSubnav();
                }
                if (item.id === 'history') {
                  onHistoryManagementPageChange('charging');
                  toggleHistorySubnav();
                }
                if (item.id === 'payments') {
                  onPaymentManagementPageChange('tariffs');
                  togglePaymentSubnav();
                }
                if (item.id === 'sales') {
                  onPurchaseSalesPageChange('purchases');
                  toggleSalesSubnav();
                }
                onTabChange(item.tab);
              }}
            >
              {t(item.labelKey)}
            </button>
          );
        })}
      </nav>

      {isSystemHomeActive && (isHomeSubnavOpen || isHomeSubnavClosing) && (
        <nav className={clsx(styles.homeSubnav, isHomeSubnavClosing && styles.closing)} aria-label="System Home pages">
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

      {isSystemManagementActive && (isManagementSubnavOpen || isManagementSubnavClosing) && (
        <nav className={clsx(styles.homeSubnav, isManagementSubnavClosing && styles.closing)} aria-label="System Management pages">
          {systemManagementPages.map((page) => (
            <button
              key={page.id}
              type="button"
              className={clsx(styles.homeSubnavItem, systemManagementPage === page.id && styles.active)}
              onClick={() => {
                onSystemManagementPageChange(page.id);
                onTabChange('settings');
              }}
            >
              {t(page.labelKey)}
            </button>
          ))}
        </nav>
      )}

      {isMemberManagementActive && (isMemberSubnavOpen || isMemberSubnavClosing) && (
        <nav className={clsx(styles.homeSubnav, isMemberSubnavClosing && styles.closing)} aria-label="Member Management pages">
          {memberManagementPages.map((page) => (
            <button key={page.id} type="button" className={clsx(styles.homeSubnavItem, memberManagementPage === page.id && styles.active)} onClick={() => { onMemberManagementPageChange(page.id); onTabChange('customers'); }}>
              {t(page.labelKey)}
            </button>
          ))}
        </nav>
      )}

      {isInfrastructureActive && (isInfrastructureSubnavOpen || isInfrastructureSubnavClosing) && (
        <nav className={clsx(styles.homeSubnav, isInfrastructureSubnavClosing && styles.closing)} aria-label="Infrastructure pages">
          {infrastructurePages.map((page) => (
            <button key={page.id} type="button" className={clsx(styles.homeSubnavItem, infrastructurePage === page.id && styles.active)} onClick={() => { onInfrastructurePageChange(page.id); onTabChange('stations'); }}>
              {t(page.labelKey)}
            </button>
          ))}
        </nav>
      )}

      {isHistoryActive && (isHistorySubnavOpen || isHistorySubnavClosing) && (
        <nav className={clsx(styles.homeSubnav, isHistorySubnavClosing && styles.closing)} aria-label="History Management pages">
          {historyPages.map((page) => (
            <button key={page.id} type="button" className={clsx(styles.homeSubnavItem, historyManagementPage === page.id && styles.active)} onClick={() => { onHistoryManagementPageChange(page.id); onTabChange('sessions'); }}>
              {t(page.labelKey)}
            </button>
          ))}
        </nav>
      )}

      {isPaymentActive && (isPaymentSubnavOpen || isPaymentSubnavClosing) && (
        <nav className={clsx(styles.homeSubnav, isPaymentSubnavClosing && styles.closing)} aria-label="Payment Information pages">
          {paymentPages.map((page) => (
            <button key={page.id} type="button" className={clsx(styles.homeSubnavItem, paymentManagementPage === page.id && styles.active)} onClick={() => { onPaymentManagementPageChange(page.id); onTabChange('billing'); }}>
              {t(page.labelKey)}
            </button>
          ))}
        </nav>
      )}

      {isSalesActive && (isSalesSubnavOpen || isSalesSubnavClosing) && (
        <nav className={clsx(styles.homeSubnav, isSalesSubnavClosing && styles.closing)} aria-label="Purchase and Sales pages">
          {purchaseSalesPages.map((page) => (
            <button key={page.id} type="button" className={clsx(styles.homeSubnavItem, purchaseSalesPage === page.id && styles.active)} onClick={() => { onPurchaseSalesPageChange(page.id); onTabChange('reports'); }}>
              {t(page.labelKey)}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import styles from './TopBar.module.scss';
import { Search, Bell, Clock, LogOut } from 'lucide-react';
import { Input } from '../../common/Input/Input';
import { Select } from '../../common/Select/Select';
import { Language, User } from '../../../types/auth';

interface TopBarProps {
  user: User | null;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onLogout: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
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

  return (
    <header className={styles.topBar}>
      <div className={styles.leftSection}>
        <div className={styles.searchBox}>
          <Input
            placeholder="Search chargers, stations, serial no, IP..."
            icon={<Search size={16} />}
          />
        </div>
      </div>

      <div className={styles.rightSection}>
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

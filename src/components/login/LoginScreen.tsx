import React, { useState } from 'react';
import styles from './LoginScreen.module.scss';
import { Eye, EyeOff, ShieldCheck, Lock, HelpCircle, Zap } from 'lucide-react';
import { Language } from '../../types/auth';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('operator@bluenetwork.com');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberId, setRememberId] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 500);
  };

  return (
    <div className={styles.loginContainer}>
      {/* Full Screen Vivid Background Image */}
      <div className={styles.bgImageWrapper}>
        <img src="/assets/global-network-bg.png" alt="BLUENETWORK Global Telemetry Network" />
      </div>

      {/* Subtle Radial Glow Overlay behind form */}
      <div className={styles.formBackdropGlow} />

      {/* Main Frameless Form Composition */}
      <div className={styles.loginFormComposition}>
        {/* Brand Section */}
        <div className={styles.brandSection}>
          <div className={styles.brandOverline}>BLUENETWORKS</div>
          <h1 className={styles.brandTitle}>BLUENETWORK</h1>
          <p className={styles.brandSubtitle}>EV Operations Platform</p>
        </div>

        {/* Login Form */}
        <form className={styles.formBody} onSubmit={handleSubmit}>
          {/* User ID or Email */}
          <div className={`${styles.fieldGroup} ${styles.emailField}`}>
            <div className={styles.labelRow}>
              <label className={styles.label}>USER ID OR EMAIL</label>
            </div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@bluenetwork.com"
                required
              />
            </div>
          </div>

          {/* Password & Forgot Link */}
          <div className={`${styles.fieldGroup} ${styles.passwordField}`}>
            <div className={styles.labelRow}>
              <label className={styles.label}>PASSWORD</label>
              <a href="#forgot" className={styles.forgotLink}>
                Forgot password?
              </a>
            </div>
            <div className={styles.inputContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={styles.hasRightIcon}
                required
              />
              <button
                type="button"
                className={styles.eyeIconBtn}
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember my ID */}
          <label className={styles.rememberRow}>
            <input
              type="checkbox"
              checked={rememberId}
              onChange={(e) => setRememberId(e.target.checked)}
            />
            <span className={styles.rememberText}>Remember my ID</span>
          </label>

          {/* Sign In Submit Button */}
          <button type="submit" className={styles.signInSubmitBtn} disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Footer Metrics & Security Info */}
        <div className={styles.footerSection}>
          <div className={styles.metricsLine}>
            <span className={styles.metricItem}>
              <span className={styles.livePulseDot} />
              1,284 chargers online
            </span>
            <span className={styles.divider}>|</span>
            <span className={styles.metricItem}>
              <Zap size={14} className={styles.boltIcon} />
              342 active sessions
            </span>
          </div>

          <div className={styles.securityLine}>
            <span className={styles.secItem}>
              <ShieldCheck size={14} color="#10b981" /> TLS 1.3 Encrypted
            </span>
            <span className={styles.divider}>|</span>
            <span className={styles.secItem}>
              <Lock size={13} color="#94a3b8" /> Authorized access only
            </span>
            <span className={styles.divider}>|</span>
            <a href="#help" className={styles.secItem}>
              <HelpCircle size={13} color="#94a3b8" /> Help
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

import type { Language } from '../auth/auth';

export interface LoginScreenProps {
  onLoginSuccess: () => void;
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export interface LoginLanguageOption {
  value: Language;
  label: string;
}

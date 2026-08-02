import type { ReactNode } from 'react';
import type { Language } from '../auth/auth';

export type TranslationMap = Record<string, string>;

export interface I18nContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export interface I18nProviderProps {
  children: ReactNode;
}

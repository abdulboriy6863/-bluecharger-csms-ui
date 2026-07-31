export type Language = 'en' | 'ko' | 'ru' | 'hi' | 'id' | 'ky' | 'uz';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Operator Admin' | 'Field Manager' | 'Support Agent' | 'Billing Specialist';
  avatarUrl?: string;
  company: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  language: Language;
}

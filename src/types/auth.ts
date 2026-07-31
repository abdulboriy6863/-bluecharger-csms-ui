export type Language = 'en' | 'uz' | 'ru' | 'ko';

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

export type DashboardSectionTone =
  | 'chargerStatus'
  | 'advertisement'
  | 'infrastructureUsage'
  | 'footerSection';

export interface DashboardSectionPlaceholderProps {
  fileName: string;
  tone: DashboardSectionTone;
}

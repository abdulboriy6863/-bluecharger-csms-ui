export type ChargerStatusPanelId = 'operation' | 'connector';

export interface ChargerStatusBreakdownItem {
  id: string;
  labelKey: string;
  fast: number;
  slow: number;
  total: number;
  color: string;
  badgeBackground: string;
}

export interface ChargerStatusPanelData {
  id: ChargerStatusPanelId;
  titleKey: string;
  items: ChargerStatusBreakdownItem[];
}

export interface ChargerStatusChartItem extends ChargerStatusBreakdownItem {
  name: string;
  percent: number;
}

export interface ChargerStatusSectionCardProps {
  panel: ChargerStatusPanelData;
  active?: boolean;
  detail?: boolean;
  onSelect?: (panelId: ChargerStatusPanelId) => void;
  onClose?: () => void;
}

export interface ChargerStatusInfographicPieProps {
  data: ChargerStatusChartItem[];
  total: number;
  unit: string;
  totalLabel: string;
  tooltipLabel: string;
  fastLabel: string;
  slowLabel: string;
  activeId: string;
  pinnedId: string | null;
  isInteracting: boolean;
  onHover: (itemId: string) => void;
  onLeave: () => void;
  onToggle: (itemId: string) => void;
}

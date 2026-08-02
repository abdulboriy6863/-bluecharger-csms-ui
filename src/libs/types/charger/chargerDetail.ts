import type { Charger, CommandType } from './charger';

export interface ChargerDetailDrawerProps {
  charger: Charger | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenControlModal: (charger: Charger, defaultCommand?: CommandType) => void;
}

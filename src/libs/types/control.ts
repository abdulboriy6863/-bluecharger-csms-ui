import type { Charger, CommandResult, CommandType } from './charger';

export interface CommandResultViewProps {
  result: CommandResult;
  onDone: () => void;
}

export interface ControlCommandModalProps {
  charger: Charger | null;
  initialCommand?: CommandType;
  isOpen: boolean;
  onClose: () => void;
  onCommandExecuted: (result: CommandResult) => void;
}

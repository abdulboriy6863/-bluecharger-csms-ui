export enum ChargerStatusEnum {
  AVAILABLE = 'Available',
  CHARGING = 'Charging',
  RESERVED = 'Reserved',
  FAULTED = 'Faulted',
  OFFLINE = 'Offline',
}

export enum CommandTypeEnum {
  REMOTE_START = 'RemoteStartTransaction',
  REMOTE_STOP = 'RemoteStopTransaction',
  RESET = 'Reset',
  UNLOCK_CONNECTOR = 'UnlockConnector',
  CHANGE_CONFIGURATION = 'ChangeConfiguration',
  UPDATE_FIRMWARE = 'UpdateFirmware',
}

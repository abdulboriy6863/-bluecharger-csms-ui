export type ChargerStatus = 'Available' | 'Charging' | 'Reserved' | 'Faulted' | 'Offline';

export type ConnectorType = 'CCS2' | 'CHAdeMO' | 'Type 2' | 'GB/T';

export interface Connector {
  id: number;
  type: ConnectorType;
  maxPowerKw: number;
  status: ChargerStatus;
  currentPowerKw?: number;
  energyDeliveredKwh?: number;
}

export interface Charger {
  id: string; // CP-1001
  name: string;
  stationId: string;
  stationName: string;
  region: string; // Seoul, Tashkent, Samarkand, Busan
  status: ChargerStatus;
  connectors: Connector[];
  manufacturer: string;
  model: string;
  firmwareVersion: string;
  ocppVersion: string;
  ipAddress: string;
  macAddress: string;
  lastHeartbeat: string;
  lastStatusChange: string;
  todayEnergyKwh: number;
  totalSessionsToday: number;
}

export type CommandType =
  | 'RemoteStartTransaction'
  | 'RemoteStopTransaction'
  | 'Reset'
  | 'UnlockConnector'
  | 'ChangeConfiguration'
  | 'UpdateFirmware';

export interface RemoteCommandRequest {
  chargerId: string;
  commandType: CommandType;
  connectorId?: number;
  reason?: string;
  requestedBy: string;
}

export interface CommandResult {
  id: string;
  chargerId: string;
  commandType: CommandType;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  timestamp: string;
  requestedBy: string;
  responseMessage?: string;
}

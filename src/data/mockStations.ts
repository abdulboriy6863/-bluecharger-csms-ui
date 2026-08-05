import type { Connector, ChargerStatus } from '../libs/types/charger/charger';

export interface StationConnector extends Connector {}

export interface StationCharger {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  ocppVersion: string;
  firmwareVersion: string;
  ipAddress: string;
  status: 'Available' | 'Charging' | 'Faulted' | 'Offline' | 'Reserved';
  connectors: StationConnector[];
  todayEnergyKwh: number;
  totalSessionsToday: number;
  lastHeartbeat: string;
}

export interface Station {
  id: string;
  name: string;
  operator: string;
  country: 'Uzbekistan' | 'South Korea' | 'USA' | 'Germany' | 'UAE';
  countryCode: 'UZ' | 'KR' | 'US' | 'DE' | 'AE';
  region: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
  status: 'Available' | 'Charging' | 'Faulted' | 'Offline' | 'Reserved';
  totalChargers: number;
  availableChargers: number;
  chargingChargers: number;
  faultedChargers: number;
  offlineChargers: number;
  reservedChargers: number;
  totalPowerKw: number;
  activePowerKw: number;
  chargers: StationCharger[];
  lastHeartbeat: string;
}

export const mockStations: Station[] = [
  // SOUTH KOREA STATIONS
  {
    id: 'ST-KR-01',
    name: 'Seoul Gangnam Smart Hub',
    operator: 'BlueNetworks Korea',
    country: 'South Korea',
    countryCode: 'KR',
    region: 'Seoul',
    city: 'Gangnam-gu',
    address: '513 Yeongdong-daero, Gangnam-gu, Seoul',
    lat: 37.5130,
    lng: 127.0585,
    status: 'Charging',
    totalChargers: 4,
    availableChargers: 2,
    chargingChargers: 2,
    faultedChargers: 0,
    offlineChargers: 0,
    reservedChargers: 0,
    totalPowerKw: 800,
    activePowerKw: 307.2,
    lastHeartbeat: '2 sec ago',
    chargers: [
      {
        id: 'CP-1004',
        name: 'Seoul Gangnam Tech Hub #1',
        manufacturer: 'Chaevi',
        model: 'UltraFast 200kW Dual',
        firmwareVersion: 'v5.1.0',
        ocppVersion: 'OCPP 1.6J',
        ipAddress: '10.200.4.55',
        status: 'Available',
        todayEnergyKwh: 640.2,
        totalSessionsToday: 22,
        lastHeartbeat: '2 sec ago',
        connectors: [
          { id: 1, type: 'CCS2', maxPowerKw: 200, status: 'Available', currentPowerKw: 0 },
          { id: 2, type: 'CCS2', maxPowerKw: 200, status: 'Available', currentPowerKw: 0 }
        ]
      },
      {
        id: 'CP-1005',
        name: 'Seoul Gangnam Tech Hub #2',
        manufacturer: 'Chaevi',
        model: 'UltraFast 200kW Dual',
        firmwareVersion: 'v5.1.0',
        ocppVersion: 'OCPP 1.6J',
        ipAddress: '10.200.4.56',
        status: 'Charging',
        todayEnergyKwh: 710.0,
        totalSessionsToday: 25,
        lastHeartbeat: '8 sec ago',
        connectors: [
          { id: 1, type: 'CCS2', maxPowerKw: 200, status: 'Charging', currentPowerKw: 165.2, energyDeliveredKwh: 42.1 },
          { id: 2, type: 'CCS2', maxPowerKw: 200, status: 'Available', currentPowerKw: 0 }
        ]
      },
      {
        id: 'CP-1020',
        name: 'Seoul Gangnam DC HighPower #3',
        manufacturer: 'Signet EV',
        model: 'HyperCharger 200kW',
        firmwareVersion: 'v4.1.2',
        ocppVersion: 'OCPP 2.0.1',
        ipAddress: '10.200.4.57',
        status: 'Charging',
        todayEnergyKwh: 540.8,
        totalSessionsToday: 18,
        lastHeartbeat: '4 sec ago',
        connectors: [
          { id: 1, type: 'CCS2', maxPowerKw: 200, status: 'Charging', currentPowerKw: 142.0, energyDeliveredKwh: 28.6 }
        ]
      },
      {
        id: 'CP-1021',
        name: 'Seoul Gangnam AC Wallbox #4',
        manufacturer: 'Signet EV',
        model: 'AC Dual 22kW',
        firmwareVersion: 'v1.2.0',
        ocppVersion: 'OCPP 1.6J',
        ipAddress: '10.200.4.58',
        status: 'Available',
        todayEnergyKwh: 88.0,
        totalSessionsToday: 4,
        lastHeartbeat: '10 sec ago',
        connectors: [
          { id: 1, type: 'Type 2', maxPowerKw: 22, status: 'Available' },
          { id: 2, type: 'Type 2', maxPowerKw: 22, status: 'Available' }
        ]
      }
    ]
  },
  {
    id: 'ST-KR-02',
    name: 'Anseong Seowon Administrative Station',
    operator: 'BlueNetworks Korea',
    country: 'South Korea',
    countryCode: 'KR',
    region: 'Gyeonggi',
    city: 'Anseong-si',
    address: '23 Seowon-am-gil, Seowon-myeon, Anseong-si, Gyeonggi-do',
    lat: 37.0080,
    lng: 127.2797,
    status: 'Available',
    totalChargers: 2,
    availableChargers: 2,
    chargingChargers: 0,
    faultedChargers: 0,
    offlineChargers: 0,
    reservedChargers: 0,
    totalPowerKw: 240,
    activePowerKw: 0,
    lastHeartbeat: '12 sec ago',
    chargers: [
      {
        id: 'BNS1D21',
        name: 'Anseong Seowon Fast Charger #1',
        manufacturer: 'Signet EV Systems',
        model: 'HyperCharger 120kW Dual',
        firmwareVersion: 'v3.2.1',
        ocppVersion: 'OCPP 1.6J',
        ipAddress: '10.105.12.31',
        status: 'Available',
        todayEnergyKwh: 310.2,
        totalSessionsToday: 11,
        lastHeartbeat: '12 sec ago',
        connectors: [
          { id: 1, type: 'CCS2', maxPowerKw: 120, status: 'Available' },
          { id: 2, type: 'CHAdeMO', maxPowerKw: 50, status: 'Available' }
        ]
      }
    ]
  },
  {
    id: 'ST-KR-03',
    name: 'Pyeongtaek Seonwon Tech Depot',
    operator: 'BlueNetworks Korea',
    country: 'South Korea',
    countryCode: 'KR',
    region: 'Gyeonggi',
    city: 'Pyeongtaek-si',
    address: '155-40 Haman-po-gil, Poseung-eup, Pyeongtaek-si',
    lat: 36.9921,
    lng: 127.0886,
    status: 'Available',
    totalChargers: 3,
    availableChargers: 3,
    chargingChargers: 0,
    faultedChargers: 0,
    offlineChargers: 0,
    reservedChargers: 0,
    totalPowerKw: 360,
    activePowerKw: 0,
    lastHeartbeat: '5 sec ago',
    chargers: [
      {
        id: 'BNS1D25',
        name: 'Pyeongtaek Tech Center #1',
        manufacturer: 'Signet EV',
        model: 'DC Dual 120kW',
        firmwareVersion: 'v3.5.0',
        ocppVersion: 'OCPP 1.6J',
        ipAddress: '10.105.15.40',
        status: 'Available',
        todayEnergyKwh: 420.0,
        totalSessionsToday: 15,
        lastHeartbeat: '5 sec ago',
        connectors: [
          { id: 1, type: 'CCS2', maxPowerKw: 120, status: 'Available' }
        ]
      }
    ]
  },
  {
    id: 'ST-KR-04',
    name: 'Cheonan Seobuk 3-Ga Depot',
    operator: 'BlueNetworks Korea',
    country: 'South Korea',
    countryCode: 'KR',
    region: 'Chungnam',
    city: 'Cheonan-si',
    address: '168 Ipsang 3-gil, Seobuk-gu, Cheonan-si, Chungcheongnam-do',
    lat: 36.8151,
    lng: 127.1139,
    status: 'Charging',
    totalChargers: 3,
    availableChargers: 1,
    chargingChargers: 2,
    faultedChargers: 0,
    offlineChargers: 0,
    reservedChargers: 0,
    totalPowerKw: 300,
    activePowerKw: 184.5,
    lastHeartbeat: '6 sec ago',
    chargers: [
      {
        id: 'BNS0607',
        name: '7kW 3-Ga Test Station',
        manufacturer: 'Secon Power',
        model: 'AC Wallbox 7kW',
        firmwareVersion: 'v1.0.4',
        ocppVersion: 'OCPP 1.6J',
        ipAddress: '10.106.8.12',
        status: 'Available',
        todayEnergyKwh: 45.0,
        totalSessionsToday: 3,
        lastHeartbeat: '20 sec ago',
        connectors: [
          { id: 1, type: 'Type 2', maxPowerKw: 7, status: 'Available' }
        ]
      },
      {
        id: 'BNS1240',
        name: 'REVO Ultra-Fast Station',
        manufacturer: 'REVO',
        model: 'DC Dual 150kW',
        firmwareVersion: 'v2.8.0',
        ocppVersion: 'OCPP 2.0.1',
        ipAddress: '10.106.8.14',
        status: 'Charging',
        todayEnergyKwh: 580.4,
        totalSessionsToday: 19,
        lastHeartbeat: '6 sec ago',
        connectors: [
          { id: 1, type: 'CCS2', maxPowerKw: 150, status: 'Charging', currentPowerKw: 124.5, energyDeliveredKwh: 36.8 },
          { id: 2, type: 'CHAdeMO', maxPowerKw: 50, status: 'Charging', currentPowerKw: 60.0, energyDeliveredKwh: 12.4 }
        ]
      }
    ]
  },
  {
    id: 'ST-KR-05',
    name: 'Busan Logistics Port E-Park',
    operator: 'BlueNetworks Korea',
    country: 'South Korea',
    countryCode: 'KR',
    region: 'Busan',
    city: 'Jung-gu',
    address: '88 Chungjang-daero, Jung-gu, Busan',
    lat: 35.1028,
    lng: 129.0403,
    status: 'Faulted',
    totalChargers: 2,
    availableChargers: 0,
    chargingChargers: 0,
    faultedChargers: 1,
    offlineChargers: 1,
    reservedChargers: 0,
    totalPowerKw: 150,
    activePowerKw: 0,
    lastHeartbeat: '3 hrs ago',
    chargers: [
      {
        id: 'CP-1006',
        name: 'Busan Port Terminal DC-1',
        manufacturer: 'Daeyoung Chaevi',
        model: 'EV-Pro 100kW',
        firmwareVersion: 'v2.9.4',
        ocppVersion: 'OCPP 1.6J',
        ipAddress: '10.210.1.18',
        status: 'Faulted',
        todayEnergyKwh: 85.0,
        totalSessionsToday: 3,
        lastHeartbeat: '3 hrs ago',
        connectors: [
          { id: 1, type: 'CCS2', maxPowerKw: 100, status: 'Faulted' },
          { id: 2, type: 'CHAdeMO', maxPowerKw: 50, status: 'Offline' }
        ]
      }
    ]
  },

  // UZBEKISTAN STATIONS
  {
    id: 'ST-UZ-01',
    name: 'Tashkent Central Mall Station',
    operator: 'BlueCharger Uzbekistan',
    country: 'Uzbekistan',
    countryCode: 'UZ',
    region: 'Tashkent',
    city: 'Yunusabad',
    address: 'Amir Timur Avenue 107B, Yunusabad, Tashkent',
    lat: 41.3322,
    lng: 69.2845,
    status: 'Charging',
    totalChargers: 4,
    availableChargers: 2,
    chargingChargers: 2,
    faultedChargers: 0,
    offlineChargers: 0,
    reservedChargers: 0,
    totalPowerKw: 540,
    activePowerKw: 213.0,
    lastHeartbeat: '3 sec ago',
    chargers: [
      {
        id: 'CP-1001',
        name: 'Tashkent City Center Ultra DC-1',
        manufacturer: 'Signet EV Systems',
        model: 'HyperCharger 150kW Dual',
        firmwareVersion: 'v3.8.12-pro',
        ocppVersion: 'OCPP 1.6J',
        ipAddress: '192.168.10.101',
        status: 'Charging',
        todayEnergyKwh: 412.5,
        totalSessionsToday: 14,
        lastHeartbeat: '10 sec ago',
        connectors: [
          { id: 1, type: 'CCS2', maxPowerKw: 150, status: 'Charging', currentPowerKw: 118.4, energyDeliveredKwh: 34.2 },
          { id: 2, type: 'GB/T', maxPowerKw: 120, status: 'Available', currentPowerKw: 0 }
        ]
      },
      {
        id: 'CP-1002',
        name: 'Tashkent City Center Ultra DC-2',
        manufacturer: 'Signet EV Systems',
        model: 'HyperCharger 150kW Dual',
        firmwareVersion: 'v3.8.12-pro',
        ocppVersion: 'OCPP 1.6J',
        ipAddress: '192.168.10.102',
        status: 'Available',
        todayEnergyKwh: 298.0,
        totalSessionsToday: 9,
        lastHeartbeat: '15 sec ago',
        connectors: [
          { id: 1, type: 'CCS2', maxPowerKw: 150, status: 'Available' },
          { id: 2, type: 'GB/T', maxPowerKw: 120, status: 'Available' }
        ]
      },
      {
        id: 'CP-1012',
        name: 'Tashkent Chorsu Business Hub',
        manufacturer: 'StarCharge',
        model: 'Nova DC 120kW',
        firmwareVersion: 'v3.5.0',
        ocppVersion: 'OCPP 1.6J',
        ipAddress: '192.168.18.22',
        status: 'Charging',
        todayEnergyKwh: 310.5,
        totalSessionsToday: 10,
        lastHeartbeat: '3 sec ago',
        connectors: [
          { id: 1, type: 'GB/T', maxPowerKw: 120, status: 'Charging', currentPowerKw: 94.6, energyDeliveredKwh: 21.0 },
          { id: 2, type: 'GB/T', maxPowerKw: 120, status: 'Available' }
        ]
      }
    ]
  },
  {
    id: 'ST-UZ-02',
    name: 'Tashkent Airport VIP Parking P1',
    operator: 'BlueCharger Uzbekistan',
    country: 'Uzbekistan',
    countryCode: 'UZ',
    region: 'Tashkent',
    city: 'Yakkasaray',
    address: 'Kumarik Street 13, Tashkent Airport P1',
    lat: 41.2579,
    lng: 69.2812,
    status: 'Reserved',
    totalChargers: 2,
    availableChargers: 0,
    chargingChargers: 0,
    faultedChargers: 0,
    offlineChargers: 1,
    reservedChargers: 1,
    totalPowerKw: 320,
    activePowerKw: 0,
    lastHeartbeat: '12 sec ago',
    chargers: [
      {
        id: 'CP-1007',
        name: 'Tashkent Airport VIP Parking P1',
        manufacturer: 'StarCharge',
        model: 'Titan 160kW',
        firmwareVersion: 'v4.0.2',
        ocppVersion: 'OCPP 1.6J',
        ipAddress: '192.168.15.5',
        status: 'Reserved',
        todayEnergyKwh: 520.4,
        totalSessionsToday: 18,
        lastHeartbeat: '12 sec ago',
        connectors: [
          { id: 1, type: 'GB/T', maxPowerKw: 160, status: 'Reserved' }
        ]
      },
      {
        id: 'CP-1008',
        name: 'Tashkent Airport Express P2',
        manufacturer: 'StarCharge',
        model: 'Titan 160kW',
        firmwareVersion: 'v4.0.2',
        ocppVersion: 'OCPP 1.6J',
        ipAddress: '192.168.15.6',
        status: 'Offline',
        todayEnergyKwh: 120.0,
        totalSessionsToday: 4,
        lastHeartbeat: '45 mins ago',
        connectors: [
          { id: 1, type: 'GB/T', maxPowerKw: 160, status: 'Offline' }
        ]
      }
    ]
  },
  {
    id: 'ST-UZ-03',
    name: 'Samarkand Silk Road Hub',
    operator: 'BlueCharger Uzbekistan',
    country: 'Uzbekistan',
    countryCode: 'UZ',
    region: 'Samarkand',
    city: 'Samarkand City',
    address: 'Registan Street 1, Samarkand',
    lat: 39.6542,
    lng: 66.9597,
    status: 'Charging',
    totalChargers: 2,
    availableChargers: 0,
    chargingChargers: 2,
    faultedChargers: 0,
    offlineChargers: 0,
    reservedChargers: 0,
    totalPowerKw: 290,
    activePowerKw: 204.8,
    lastHeartbeat: '4 sec ago',
    chargers: [
      {
        id: 'CP-1003',
        name: 'Samarkand Registan Plaza Fast-1',
        manufacturer: 'ABB E-mobility',
        model: 'Terra 124 Dual',
        firmwareVersion: 'v4.2.0-b3',
        ocppVersion: 'OCPP 2.0.1',
        ipAddress: '192.168.12.201',
        status: 'Charging',
        todayEnergyKwh: 355.8,
        totalSessionsToday: 11,
        lastHeartbeat: '5 sec ago',
        connectors: [
          { id: 1, type: 'CCS2', maxPowerKw: 120, status: 'Charging', currentPowerKw: 94.6, energyDeliveredKwh: 18.9 },
          { id: 2, type: 'CHAdeMO', maxPowerKw: 50, status: 'Available' }
        ]
      },
      {
        id: 'CP-1009',
        name: 'Samarkand Railway Plaza #1',
        manufacturer: 'ABB E-mobility',
        model: 'Terra 124',
        firmwareVersion: 'v4.2.0',
        ocppVersion: 'OCPP 1.6J',
        ipAddress: '192.168.12.88',
        status: 'Charging',
        todayEnergyKwh: 480.9,
        totalSessionsToday: 16,
        lastHeartbeat: '4 sec ago',
        connectors: [
          { id: 1, type: 'CCS2', maxPowerKw: 120, status: 'Charging', currentPowerKw: 110.2, energyDeliveredKwh: 52.0 }
        ]
      }
    ]
  },

  // USA STATIONS
  {
    id: 'ST-US-01',
    name: 'San Francisco Financial District Hub',
    operator: 'BlueNetworks USA',
    country: 'USA',
    countryCode: 'US',
    region: 'California',
    city: 'San Francisco',
    address: '555 California St, San Francisco, CA 94104',
    lat: 37.7922,
    lng: -122.4038,
    status: 'Available',
    totalChargers: 4,
    availableChargers: 3,
    chargingChargers: 1,
    faultedChargers: 0,
    offlineChargers: 0,
    reservedChargers: 0,
    totalPowerKw: 1400,
    activePowerKw: 240.0,
    lastHeartbeat: '2 sec ago',
    chargers: [
      {
        id: 'CP-US-301',
        name: 'SF Downtown MegaCharger #1',
        manufacturer: 'ABB E-mobility',
        model: 'Terra 360 Mega',
        firmwareVersion: 'v6.1.0',
        ocppVersion: 'OCPP 2.0.1',
        ipAddress: '172.16.4.101',
        status: 'Charging',
        todayEnergyKwh: 980.5,
        totalSessionsToday: 32,
        lastHeartbeat: '2 sec ago',
        connectors: [
          { id: 1, type: 'CCS2', maxPowerKw: 360, status: 'Charging', currentPowerKw: 240.0, energyDeliveredKwh: 65.4 },
          { id: 2, type: 'NACS', maxPowerKw: 360, status: 'Available' }
        ]
      },
      {
        id: 'CP-US-302',
        name: 'SF Downtown MegaCharger #2',
        manufacturer: 'ABB E-mobility',
        model: 'Terra 360 Mega',
        firmwareVersion: 'v6.1.0',
        ocppVersion: 'OCPP 2.0.1',
        ipAddress: '172.16.4.102',
        status: 'Available',
        todayEnergyKwh: 890.0,
        totalSessionsToday: 29,
        lastHeartbeat: '5 sec ago',
        connectors: [
          { id: 1, type: 'NACS', maxPowerKw: 360, status: 'Available' }
        ]
      }
    ]
  },

  // GERMANY / EUROPE STATIONS
  {
    id: 'ST-DE-01',
    name: 'Berlin Alexanderplatz SuperHub',
    operator: 'BlueNetworks Europe',
    country: 'Germany',
    countryCode: 'DE',
    region: 'Berlin',
    city: 'Berlin Mitte',
    address: 'Alexanderplatz 1, 10178 Berlin',
    lat: 52.5219,
    lng: 13.4132,
    status: 'Charging',
    totalChargers: 3,
    availableChargers: 1,
    chargingChargers: 2,
    faultedChargers: 0,
    offlineChargers: 0,
    reservedChargers: 0,
    totalPowerKw: 900,
    activePowerKw: 380.0,
    lastHeartbeat: '1 sec ago',
    chargers: [
      {
        id: 'CP-DE-401',
        name: 'Berlin Mitte HPC #1',
        manufacturer: 'Alpitronic',
        model: 'HYC 300 Dual',
        firmwareVersion: 'v5.4.1',
        ocppVersion: 'OCPP 2.0.1',
        ipAddress: '10.88.2.14',
        status: 'Charging',
        todayEnergyKwh: 1120.0,
        totalSessionsToday: 41,
        lastHeartbeat: '1 sec ago',
        connectors: [
          { id: 1, type: 'CCS2', maxPowerKw: 300, status: 'Charging', currentPowerKw: 210.0, energyDeliveredKwh: 58.2 },
          { id: 2, type: 'CCS2', maxPowerKw: 300, status: 'Charging', currentPowerKw: 170.0, energyDeliveredKwh: 45.1 }
        ]
      }
    ]
  },

  // UAE STATIONS
  {
    id: 'ST-AE-01',
    name: 'Dubai Downtown EV Oasis',
    operator: 'BlueNetworks Middle East',
    country: 'UAE',
    countryCode: 'AE',
    region: 'Dubai',
    city: 'Downtown Dubai',
    address: 'Sheikh Zayed Rd, Downtown Dubai',
    lat: 25.1972,
    lng: 55.2744,
    status: 'Available',
    totalChargers: 4,
    availableChargers: 4,
    chargingChargers: 0,
    faultedChargers: 0,
    offlineChargers: 0,
    reservedChargers: 0,
    totalPowerKw: 960,
    activePowerKw: 0,
    lastHeartbeat: '4 sec ago',
    chargers: [
      {
        id: 'CP-AE-501',
        name: 'Dubai Oasis Fast #1',
        manufacturer: 'Signet EV',
        model: 'HyperCharger 240kW',
        firmwareVersion: 'v4.5.0',
        ocppVersion: 'OCPP 2.0.1',
        ipAddress: '10.50.1.10',
        status: 'Available',
        todayEnergyKwh: 850.4,
        totalSessionsToday: 26,
        lastHeartbeat: '4 sec ago',
        connectors: [
          { id: 1, type: 'CCS2', maxPowerKw: 240, status: 'Available' }
        ]
      }
    ]
  }
];

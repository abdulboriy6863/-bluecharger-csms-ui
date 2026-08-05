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
  status: ChargerStatus;
  connectors: StationConnector[];
  todayEnergyKwh: number;
  totalSessionsToday: number;
  lastHeartbeat: string;
}

export interface Station {
  id: string;
  name: string;
  operator: string;
  country: 'Uzbekistan' | 'South Korea' | 'Kyrgyzstan' | 'Indonesia' | 'India' | 'USA' | 'Russia';
  countryCode: 'UZ' | 'KR' | 'KG' | 'ID' | 'IN' | 'US' | 'RU';
  region: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
  status: ChargerStatus;
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
  // 1. SOUTH KOREA (KOR) STATIONS
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
    totalChargers: 2,
    availableChargers: 2,
    chargingChargers: 0,
    faultedChargers: 0,
    offlineChargers: 0,
    reservedChargers: 0,
    totalPowerKw: 240,
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
    name: 'Busan Port Terminal Logistics Hub',
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

  // 2. UZBEKISTAN (UZB) STATIONS
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
    totalChargers: 3,
    availableChargers: 1,
    chargingChargers: 2,
    faultedChargers: 0,
    offlineChargers: 0,
    reservedChargers: 0,
    totalPowerKw: 420,
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
      }
    ]
  },
  {
    id: 'ST-UZ-03',
    name: 'Bukhara Ancient City EV Station',
    operator: 'BlueCharger Uzbekistan',
    country: 'Uzbekistan',
    countryCode: 'UZ',
    region: 'Bukhara',
    city: 'Bukhara City',
    address: 'Bahauddin Naqshband Street 42, Bukhara',
    lat: 39.7747,
    lng: 64.4286,
    status: 'Available',
    totalChargers: 2,
    availableChargers: 2,
    chargingChargers: 0,
    faultedChargers: 0,
    offlineChargers: 0,
    reservedChargers: 0,
    totalPowerKw: 240,
    activePowerKw: 0,
    lastHeartbeat: '8 sec ago',
    chargers: [
      {
        id: 'CP-UZ-201',
        name: 'Bukhara Oasis DC 120kW',
        manufacturer: 'StarCharge',
        model: 'Titan 120kW',
        firmwareVersion: 'v4.1.0',
        ocppVersion: 'OCPP 1.6J',
        ipAddress: '192.168.22.10',
        status: 'Available',
        todayEnergyKwh: 210.0,
        totalSessionsToday: 7,
        lastHeartbeat: '8 sec ago',
        connectors: [
          { id: 1, type: 'GB/T', maxPowerKw: 120, status: 'Available' },
          { id: 2, type: 'CCS2', maxPowerKw: 120, status: 'Available' }
        ]
      }
    ]
  },

  // 3. KYRGYZSTAN (KYR) STATIONS
  {
    id: 'ST-KG-01',
    name: 'Bishkek Ala-Too Square Hub',
    operator: 'BlueNetworks Kyrgyzstan',
    country: 'Kyrgyzstan',
    countryCode: 'KG',
    region: 'Bishkek',
    city: 'Bishkek Central',
    address: 'Chuy Avenue 114, Bishkek',
    lat: 42.8746,
    lng: 74.6122,
    status: 'Charging',
    totalChargers: 2,
    availableChargers: 1,
    chargingChargers: 1,
    faultedChargers: 0,
    offlineChargers: 0,
    reservedChargers: 0,
    totalPowerKw: 300,
    activePowerKw: 128.5,
    lastHeartbeat: '2 sec ago',
    chargers: [
      {
        id: 'CP-KG-301',
        name: 'Bishkek Chuy DC Fast #1',
        manufacturer: 'StarCharge',
        model: 'Titan 150kW Dual',
        firmwareVersion: 'v4.2.1',
        ocppVersion: 'OCPP 1.6J',
        ipAddress: '10.74.10.5',
        status: 'Charging',
        todayEnergyKwh: 480.0,
        totalSessionsToday: 16,
        lastHeartbeat: '2 sec ago',
        connectors: [
          { id: 1, type: 'GB/T', maxPowerKw: 150, status: 'Charging', currentPowerKw: 128.5, energyDeliveredKwh: 31.4 },
          { id: 2, type: 'CCS2', maxPowerKw: 150, status: 'Available' }
        ]
      }
    ]
  },
  {
    id: 'ST-KG-02',
    name: 'Osh Sulaiman-Too EV Depot',
    operator: 'BlueNetworks Kyrgyzstan',
    country: 'Kyrgyzstan',
    countryCode: 'KG',
    region: 'Osh',
    city: 'Osh City',
    address: 'Kurmanjan Datka Street 201, Osh',
    lat: 40.5140,
    lng: 72.8058,
    status: 'Available',
    totalChargers: 2,
    availableChargers: 2,
    chargingChargers: 0,
    faultedChargers: 0,
    offlineChargers: 0,
    reservedChargers: 0,
    totalPowerKw: 240,
    activePowerKw: 0,
    lastHeartbeat: '14 sec ago',
    chargers: [
      {
        id: 'CP-KG-302',
        name: 'Osh Central Fast #1',
        manufacturer: 'Signet EV',
        model: 'HyperCharger 120kW',
        firmwareVersion: 'v3.5.0',
        ocppVersion: 'OCPP 1.6J',
        ipAddress: '10.74.20.12',
        status: 'Available',
        todayEnergyKwh: 190.5,
        totalSessionsToday: 6,
        lastHeartbeat: '14 sec ago',
        connectors: [
          { id: 1, type: 'GB/T', maxPowerKw: 120, status: 'Available' }
        ]
      }
    ]
  },

  // 4. INDONESIA (IDN) STATIONS
  {
    id: 'ST-ID-01',
    name: 'Jakarta Sudirman EV Central',
    operator: 'BlueNetworks Indonesia',
    country: 'Indonesia',
    countryCode: 'ID',
    region: 'Jakarta',
    city: 'South Jakarta',
    address: 'Jend. Sudirman Kav 52-53, Jakarta',
    lat: -6.2297,
    lng: 106.8074,
    status: 'Charging',
    totalChargers: 3,
    availableChargers: 1,
    chargingChargers: 2,
    faultedChargers: 0,
    offlineChargers: 0,
    reservedChargers: 0,
    totalPowerKw: 450,
    activePowerKw: 280.0,
    lastHeartbeat: '4 sec ago',
    chargers: [
      {
        id: 'CP-ID-401',
        name: 'Jakarta SCBD UltraFast #1',
        manufacturer: 'ABB E-mobility',
        model: 'Terra 184 Dual',
        firmwareVersion: 'v5.1.2',
        ocppVersion: 'OCPP 2.0.1',
        ipAddress: '10.106.4.15',
        status: 'Charging',
        todayEnergyKwh: 750.2,
        totalSessionsToday: 24,
        lastHeartbeat: '4 sec ago',
        connectors: [
          { id: 1, type: 'CCS2', maxPowerKw: 180, status: 'Charging', currentPowerKw: 155.0, energyDeliveredKwh: 48.2 },
          { id: 2, type: 'CCS2', maxPowerKw: 180, status: 'Charging', currentPowerKw: 125.0, energyDeliveredKwh: 39.1 }
        ]
      }
    ]
  },
  {
    id: 'ST-ID-02',
    name: 'Bali Denpasar Resort EV Hub',
    operator: 'BlueNetworks Indonesia',
    country: 'Indonesia',
    countryCode: 'ID',
    region: 'Bali',
    city: 'Denpasar',
    address: 'Bypass Ngurah Rai 100, Sanur, Bali',
    lat: -8.6705,
    lng: 115.2126,
    status: 'Available',
    totalChargers: 2,
    availableChargers: 2,
    chargingChargers: 0,
    faultedChargers: 0,
    offlineChargers: 0,
    reservedChargers: 0,
    totalPowerKw: 300,
    activePowerKw: 0,
    lastHeartbeat: '10 sec ago',
    chargers: [
      {
        id: 'CP-ID-402',
        name: 'Bali Sanur Fast Charger #1',
        manufacturer: 'StarCharge',
        model: 'Titan 150kW',
        firmwareVersion: 'v4.0.0',
        ocppVersion: 'OCPP 1.6J',
        ipAddress: '10.115.8.20',
        status: 'Available',
        todayEnergyKwh: 340.0,
        totalSessionsToday: 11,
        lastHeartbeat: '10 sec ago',
        connectors: [
          { id: 1, type: 'CCS2', maxPowerKw: 150, status: 'Available' }
        ]
      }
    ]
  },

  // 5. INDIA (HIN) STATIONS
  {
    id: 'ST-IN-01',
    name: 'New Delhi Connaught Plaza Hub',
    operator: 'BlueNetworks India',
    country: 'India',
    countryCode: 'IN',
    region: 'Delhi',
    city: 'New Delhi',
    address: 'Connaught Place Outer Circle, New Delhi',
    lat: 28.6315,
    lng: 77.2167,
    status: 'Charging',
    totalChargers: 3,
    availableChargers: 1,
    chargingChargers: 2,
    faultedChargers: 0,
    offlineChargers: 0,
    reservedChargers: 0,
    totalPowerKw: 480,
    activePowerKw: 245.0,
    lastHeartbeat: '3 sec ago',
    chargers: [
      {
        id: 'CP-IN-501',
        name: 'Delhi CP HighPower #1',
        manufacturer: 'ABB E-mobility',
        model: 'Terra 180kW',
        firmwareVersion: 'v5.2.0',
        ocppVersion: 'OCPP 2.0.1',
        ipAddress: '10.77.1.50',
        status: 'Charging',
        todayEnergyKwh: 820.0,
        totalSessionsToday: 27,
        lastHeartbeat: '3 sec ago',
        connectors: [
          { id: 1, type: 'CCS2', maxPowerKw: 180, status: 'Charging', currentPowerKw: 145.0, energyDeliveredKwh: 41.2 },
          { id: 2, type: 'CCS2', maxPowerKw: 180, status: 'Charging', currentPowerKw: 100.0, energyDeliveredKwh: 28.4 }
        ]
      }
    ]
  },
  {
    id: 'ST-IN-02',
    name: 'Mumbai BKC Financial Center Depot',
    operator: 'BlueNetworks India',
    country: 'India',
    countryCode: 'IN',
    region: 'Maharashtra',
    city: 'Mumbai',
    address: 'Bandra Kurla Complex, Mumbai',
    lat: 19.0600,
    lng: 72.8700,
    status: 'Available',
    totalChargers: 2,
    availableChargers: 2,
    chargingChargers: 0,
    faultedChargers: 0,
    offlineChargers: 0,
    reservedChargers: 0,
    totalPowerKw: 300,
    activePowerKw: 0,
    lastHeartbeat: '6 sec ago',
    chargers: [
      {
        id: 'CP-IN-502',
        name: 'Mumbai BKC Fast #1',
        manufacturer: 'Signet EV',
        model: 'DC Dual 150kW',
        firmwareVersion: 'v4.1.0',
        ocppVersion: 'OCPP 1.6J',
        ipAddress: '10.72.10.88',
        status: 'Available',
        todayEnergyKwh: 610.0,
        totalSessionsToday: 19,
        lastHeartbeat: '6 sec ago',
        connectors: [
          { id: 1, type: 'CCS2', maxPowerKw: 150, status: 'Available' }
        ]
      }
    ]
  },

  // 6. USA (ENG) STATIONS
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
    totalChargers: 3,
    availableChargers: 2,
    chargingChargers: 1,
    faultedChargers: 0,
    offlineChargers: 0,
    reservedChargers: 0,
    totalPowerKw: 1080,
    activePowerKw: 240.0,
    lastHeartbeat: '2 sec ago',
    chargers: [
      {
        id: 'CP-US-601',
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
      }
    ]
  },

  // 7. RUSSIA (RUS) STATIONS
  {
    id: 'ST-RU-01',
    name: 'Moscow City Business Center',
    operator: 'BlueNetworks Eurasia',
    country: 'Russia',
    countryCode: 'RU',
    region: 'Moscow',
    city: 'Presnensky',
    address: 'Presnenskaya Naberezhnaya 12, Moscow',
    lat: 55.7472,
    lng: 37.5375,
    status: 'Charging',
    totalChargers: 3,
    availableChargers: 1,
    chargingChargers: 2,
    faultedChargers: 0,
    offlineChargers: 0,
    reservedChargers: 0,
    totalPowerKw: 450,
    activePowerKw: 260.0,
    lastHeartbeat: '5 sec ago',
    chargers: [
      {
        id: 'CP-RU-701',
        name: 'Moscow City UltraFast #1',
        manufacturer: 'Signet EV',
        model: 'HyperCharger 150kW',
        firmwareVersion: 'v4.5.1',
        ocppVersion: 'OCPP 1.6J',
        ipAddress: '10.37.12.14',
        status: 'Charging',
        todayEnergyKwh: 690.0,
        totalSessionsToday: 21,
        lastHeartbeat: '5 sec ago',
        connectors: [
          { id: 1, type: 'CCS2', maxPowerKw: 150, status: 'Charging', currentPowerKw: 140.0, energyDeliveredKwh: 44.5 },
          { id: 2, type: 'GB/T', maxPowerKw: 150, status: 'Charging', currentPowerKw: 120.0, energyDeliveredKwh: 36.2 }
        ]
      }
    ]
  }
];

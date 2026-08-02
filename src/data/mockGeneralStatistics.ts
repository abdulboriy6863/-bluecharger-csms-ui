import type { GeneralStatisticsData } from '../libs/types/dashboard/dashboard';

export const mockGeneralStatistics: GeneralStatisticsData = {
  station: {
    count: 1290,
    unit: '개소',
    momChange: 1,
    trendDirection: 'up'
  },
  charger: {
    rapidCount: 867,
    rapidUnit: '기',
    slowCount: 1840,
    slowUnit: '기'
  },
  energy: {
    rapid: {
      kwh: 29665,
      changeKwh: 2453,
      changePercent: 8,
      trendDirection: 'down'
    },
    slow: {
      kwh: 12299,
      changeKwh: 6794,
      changePercent: 36,
      trendDirection: 'down'
    }
  },
  member: {
    count: 983,
    unit: '명'
  }
};

import { GeneralStatisticsData } from '../types/dashboard';

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
      kwh: 28667,
      changeKwh: 2115,
      changePercent: 7,
      trendDirection: 'down'
    },
    slow: {
      kwh: 11808,
      changeKwh: 6338,
      changePercent: 35,
      trendDirection: 'down'
    }
  },
  member: {
    count: 983,
    unit: '명'
  }
};

import React from 'react';
import styles from '../../styles/systemHome/EnergyTrendChart.module.scss';
import { EnergyTrendPoint } from '../../types/dashboard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EnergyTrendChartProps {
  data: EnergyTrendPoint[];
}

export const EnergyTrendChart: React.FC<EnergyTrendChartProps> = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '13px' }}
            formatter={(value: any) => [`${value} kWh`, 'Energy Delivered']}
          />
          <Area
            type="monotone"
            dataKey="energyKwh"
            stroke="#2563eb"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorEnergy)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

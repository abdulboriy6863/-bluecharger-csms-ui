import React from 'react';
import styles from './OverviewDashboard.module.scss';
import { KpiCards } from './KpiCards';
import { EnergyTrendChart } from './EnergyTrendChart';
import { StatusDistribution } from './StatusDistribution';
import { RecentAlerts } from './RecentAlerts';
import { Card } from '../common/Card/Card';
import { Button } from '../common/Button/Button';
import { mockKpis, mockEnergyTrend, mockStatusDistribution } from '../../data/mockDashboard';
import { mockAlerts } from '../../data/mockEvents';
import { ArrowRight, RefreshCw } from 'lucide-react';

interface OverviewDashboardProps {
  onNavigateMonitoring: () => void;
  onSelectCharger: (chargerId: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigateMonitoring,
  onSelectCharger
}) => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.headerArea}>
        <div>
          <h1 className={styles.pageTitle}>Network Operations Overview</h1>
          <p className={styles.pageSubtitle}>Real-time telemetry and network performance monitoring</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="secondary" icon={<RefreshCw size={15} />}>
            Refresh Telemetry
          </Button>
          <Button variant="primary" icon={<ArrowRight size={15} />} iconPosition="right" onClick={onNavigateMonitoring}>
            Live Monitoring Grid
          </Button>
        </div>
      </div>

      <KpiCards metrics={mockKpis} />

      <div className={styles.contentGrid}>
        <div className={styles.leftCol}>
          <Card
            title="24-Hour Energy Delivery Trend"
            subtitle="Hourly power output (kWh) across all active chargers"
          >
            <EnergyTrendChart data={mockEnergyTrend} />
          </Card>

          <Card
            title="Recent Network Alerts & Faults"
            subtitle="High & Medium priority OCPP error events requiring attention"
            action={
              <Button variant="ghost" size="sm" onClick={onNavigateMonitoring}>
                View All Chargers
              </Button>
            }
          >
            <RecentAlerts alerts={mockAlerts} onSelectCharger={onSelectCharger} />
          </Card>
        </div>

        <div className={styles.rightCol}>
          <Card
            title="Charger Status Distribution"
            subtitle="Current operational breakdown"
          >
            <StatusDistribution data={mockStatusDistribution} />
          </Card>

          <Card title="Regional Hub Status">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: 600 }}>Tashkent Central Hub</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>42 / 45 Online</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: 600 }}>Samarkand Silk Road</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>28 / 28 Online</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: 600 }}>Seoul Smart Grid</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>38 / 40 Online</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600 }}>Busan Maritime Depot</span>
                <span style={{ color: '#ef4444', fontWeight: 600 }}>24 / 29 Online (1 Fault)</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

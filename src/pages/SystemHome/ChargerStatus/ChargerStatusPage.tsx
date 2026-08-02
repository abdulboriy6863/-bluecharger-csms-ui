import React from 'react';
import { LiveMonitoring } from '../../../components/monitoring/LiveMonitoring';
import type { ChargerStatusPageProps } from '../../../libs/types/pageProps';

export const ChargerStatusPage: React.FC<ChargerStatusPageProps> = ({
  chargers,
  onSelectCharger,
  onOpenControlModal,
}) => (
  <LiveMonitoring
    chargers={chargers}
    onSelectCharger={onSelectCharger}
    onOpenControlModal={onOpenControlModal}
  />
);

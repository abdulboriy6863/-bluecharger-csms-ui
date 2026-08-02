import React from 'react';
import { LiveMonitoring } from '../../../components/monitoring/LiveMonitoring';
import type { ChargerControlPageProps } from '../../../libs/types/pageProps';

export const ChargerControlPage: React.FC<ChargerControlPageProps> = ({
  chargers,
  onSelectCharger,
  onOpenControlModal,
}) => {
  return (
    <LiveMonitoring
      chargers={chargers}
      onSelectCharger={onSelectCharger}
      onOpenControlModal={onOpenControlModal}
    />
  );
};

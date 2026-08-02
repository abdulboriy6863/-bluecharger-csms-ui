import React from 'react';
import { Charger } from '../../../types/charger';
import { LiveMonitoring } from '../../../components/monitoring/LiveMonitoring';

interface ChargerStatusPageProps {
  chargers: Charger[];
  onSelectCharger: (charger: Charger) => void;
  onOpenControlModal: (charger: Charger) => void;
}

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

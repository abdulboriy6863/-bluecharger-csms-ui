import React from 'react';
import { Charger } from '../../../types/charger';
import { LiveMonitoring } from '../../../components/monitoring/LiveMonitoring';

interface ChargerControlPageProps {
  chargers: Charger[];
  onSelectCharger: (charger: Charger) => void;
  onOpenControlModal: (charger: Charger) => void;
}

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

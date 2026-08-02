import React from 'react';
import { Charger } from '../../../types/charger';
import { ChargerControlView } from '../../../components/systemHome/chargercontrol/ChargerControlView';

interface ChargerControlPageProps {
  chargers?: Charger[];
  onSelectCharger?: (charger: Charger) => void;
  onOpenControlModal?: (charger: Charger) => void;
}

export const ChargerControlPage: React.FC<ChargerControlPageProps> = () => {
  return (
    <section style={{ padding: '24px' }}>
      <ChargerControlView />
    </section>
  );
};


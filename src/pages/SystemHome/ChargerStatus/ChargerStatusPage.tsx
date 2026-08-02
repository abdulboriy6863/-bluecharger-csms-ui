import React from 'react';
import { Charger } from '../../../types/charger';
import { ChargerStatusView } from '../../../components/systemHome/chargerstatus/ChargerStatusView';

interface ChargerStatusPageProps {
  chargers?: Charger[];
  onSelectCharger?: (charger: Charger) => void;
  onOpenControlModal?: (charger: Charger) => void;
}

export const ChargerStatusPage: React.FC<ChargerStatusPageProps> = () => (
  <section style={{ padding: '24px' }} aria-label="Charger Status">
    <ChargerStatusView />
  </section>
);


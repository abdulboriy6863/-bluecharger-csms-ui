import React from 'react';
import { InstallationLocationsView } from '../../../libs/components/systemHome/installationlocations/InstallationLocationsView';
import type { Charger, CommandType } from '../../../libs/types/charger/charger';

interface InstallationLocationsPageProps {
  isDarkMode?: boolean;
  chargers?: Charger[];
  onSelectCharger?: (charger: Charger) => void;
  onOpenControlModal?: (charger: Charger, defaultCommand?: CommandType) => void;
}

export const InstallationLocationsPage: React.FC<InstallationLocationsPageProps> = ({
  isDarkMode = false,
  chargers,
  onSelectCharger,
  onOpenControlModal,
}) => {
  return (
    <section style={{ width: '100%', padding: '16px 24px 24px 24px', boxSizing: 'border-box' }}>
      <InstallationLocationsView
        isDarkMode={isDarkMode}
        chargers={chargers}
        onSelectCharger={onSelectCharger}
        onOpenControlModal={onOpenControlModal}
      />
    </section>
  );
};

export default InstallationLocationsPage;

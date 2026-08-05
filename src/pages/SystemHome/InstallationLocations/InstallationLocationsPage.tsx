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
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <InstallationLocationsView
        isDarkMode={isDarkMode}
        chargers={chargers}
        onSelectCharger={onSelectCharger}
        onOpenControlModal={onOpenControlModal}
      />
    </div>
  );
};

export default InstallationLocationsPage;

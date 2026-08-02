import React, { useState } from 'react';
import styles from '../../../scss/systemHome/DashboardSections.module.scss';
import { mockChargerStatusPanels } from '../../../data/mockChargerStatusSummary';
import { ChargerStatusPanelId } from '../../../types/dashboard';
import { useI18n } from '../../../i18n/I18nContext';
import { ChargerStatusSectionCard } from './ChargerStatusSectionCard';

export const ChargerStatusSection: React.FC = () => {
  const { t } = useI18n();
  const [selectedPanelId, setSelectedPanelId] = useState<ChargerStatusPanelId | null>(null);
  const selectedPanel = mockChargerStatusPanels.find((panel) => panel.id === selectedPanelId);

  return (
    <section className={styles.chargerStatusSection} aria-label={t('dashboard.chargerStatus.aria')}>
      {selectedPanel ? (
        <div className={styles.expandedStack}>
          <div className={styles.panelTabs} role="tablist" aria-label={t('dashboard.chargerStatus.tabsAria')}>
            {mockChargerStatusPanels.map((panel) => (
              <button
                key={panel.id}
                type="button"
                className={`${styles.panelTab} ${panel.id === selectedPanel.id ? styles.activeTab : ''}`}
                onClick={() => setSelectedPanelId(panel.id)}
                role="tab"
                aria-selected={panel.id === selectedPanel.id}
              >
                <span>{t(panel.titleKey)}</span>
              </button>
            ))}
          </div>
          <ChargerStatusSectionCard
            panel={selectedPanel}
            active
            detail
            onSelect={setSelectedPanelId}
            onClose={() => setSelectedPanelId(null)}
          />
        </div>
      ) : (
        <div className={styles.statusGrid}>
          {mockChargerStatusPanels.map((panel) => (
            <ChargerStatusSectionCard
              key={panel.id}
              panel={panel}
              onSelect={setSelectedPanelId}
            />
          ))}
        </div>
      )}
    </section>
  );
};

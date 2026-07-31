import React from 'react';
import styles from './FilterBar.module.scss';
import { Search, RotateCcw } from 'lucide-react';
import { Input } from '../common/Input/Input';
import { Select } from '../common/Select/Select';
import { Button } from '../common/Button/Button';
import { useI18n } from '../../i18n/I18nContext';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  selectedConnector: string;
  onConnectorChange: (conn: string) => void;
  autoRefresh: boolean;
  onToggleAutoRefresh: () => void;
  onResetFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedRegion,
  onRegionChange,
  selectedConnector,
  onConnectorChange,
  autoRefresh,
  onToggleAutoRefresh,
  onResetFilters
}) => {
  const { t } = useI18n();
  const regionOptions = [
    { value: 'ALL', label: t('monitoring.allRegions') },
    { value: 'Tashkent', label: 'Tashkent' },
    { value: 'Samarkand', label: 'Samarkand' },
    { value: 'Seoul', label: 'Seoul' },
    { value: 'Busan', label: 'Busan' },
  ];

  const connectorOptions = [
    { value: 'ALL', label: t('monitoring.allConnectors') },
    { value: 'CCS2', label: 'CCS2' },
    { value: 'GB/T', label: 'GB/T' },
    { value: 'CHAdeMO', label: 'CHAdeMO' },
    { value: 'Type 2', label: 'Type 2' },
  ];

  return (
    <div className={styles.filterCard}>
      <div className={styles.searchInput}>
        <Input
          placeholder={t('monitoring.filter')}
          icon={<Search size={16} />}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className={styles.selectGroup}>
        <div style={{ width: 140 }}>
          <Select
            value={selectedRegion}
            options={regionOptions}
            onChange={(e) => onRegionChange(e.target.value)}
          />
        </div>
        <div style={{ width: 150 }}>
          <Select
            value={selectedConnector}
            options={connectorOptions}
            onChange={(e) => onConnectorChange(e.target.value)}
          />
        </div>
        <Button variant="ghost" icon={<RotateCcw size={14} />} onClick={onResetFilters}>
          {t('monitoring.reset')}
        </Button>
      </div>

      <div className={styles.autoRefreshToggle}>
        <input
          type="checkbox"
          id="autoRefreshCheck"
          checked={autoRefresh}
          onChange={onToggleAutoRefresh}
        />
        <label htmlFor="autoRefreshCheck" style={{ cursor: 'pointer' }}>
          {t('monitoring.autoRefresh')}
        </label>
      </div>
    </div>
  );
};

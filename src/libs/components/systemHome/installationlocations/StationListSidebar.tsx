import React from 'react';
import { Search, MapPin, Globe, ChevronRight, ChevronLeft, Zap, CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';
import type { Station } from '../../../../data/mockStations';
import styles from '../../../../scss/systemHome/InstallationLocationsView.module.scss';

interface StationListSidebarProps {
  stations: Station[];
  selectedStation: Station | null;
  onSelectStation: (station: Station) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCountry: string;
  onCountryChange: (country: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const StationListSidebar: React.FC<StationListSidebarProps> = ({
  stations,
  selectedStation,
  onSelectStation,
  searchQuery,
  onSearchChange,
  activeCountry,
  onCountryChange,
  isCollapsed,
  onToggleCollapse,
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Available':
        return <CheckCircle2 size={14} style={{ color: '#10b981' }} />;
      case 'Charging':
        return <Zap size={14} style={{ color: '#2563eb' }} />;
      case 'Faulted':
        return <AlertTriangle size={14} style={{ color: '#ef4444' }} />;
      case 'Offline':
        return <XCircle size={14} style={{ color: '#64748b' }} />;
      case 'Reserved':
        return <Clock size={14} style={{ color: '#8b5cf6' }} />;
      default:
        return <CheckCircle2 size={14} style={{ color: '#10b981' }} />;
    }
  };

  return (
    <aside className={`${styles.sidebarWrapper} ${isCollapsed ? styles.collapsed : ''}`}>
      {/* Collapse Toggle Button */}
      <button className={styles.collapseToggleBtn} onClick={onToggleCollapse} title="Toggle Station List">
        {isCollapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      {!isCollapsed && (
        <div className={styles.sidebarContent}>
          {/* Header */}
          <div className={styles.sidebarHeader}>
            <div className={styles.titleRow}>
              <MapPin size={18} className={styles.headerIcon} />
              <h3 className={styles.sidebarTitle}>Global Stations</h3>
              <span className={styles.stationCountBadge}>{stations.length}</span>
            </div>
          </div>

          {/* Country Quick Selector */}
          <div className={styles.countrySelectorRow}>
            <Globe size={14} className={styles.globeIcon} />
            <select
              value={activeCountry}
              onChange={(e) => onCountryChange(e.target.value)}
              className={styles.countrySelect}
            >
              <option value="ALL">🌐 All Countries (Global)</option>
              <option value="KR">🇰🇷 South Korea</option>
              <option value="UZ">🇺🇿 Uzbekistan</option>
              <option value="US">🇺🇸 United States</option>
              <option value="DE">🇩🇪 Germany (EU)</option>
              <option value="AE">🇦🇪 United Arab Emirates</option>
            </select>
          </div>

          {/* Search Box */}
          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search station, address, model..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* Station Cards List */}
          <div className={styles.stationList}>
            {stations.length === 0 ? (
              <div className={styles.emptyState}>No stations found matching filters.</div>
            ) : (
              stations.map((st) => {
                const isSelected = selectedStation?.id === st.id;
                return (
                  <div
                    key={st.id}
                    className={`${styles.stationCard} ${isSelected ? styles.selectedCard : ''}`}
                    onClick={() => onSelectStation(st)}
                  >
                    <div className={styles.cardTopRow}>
                      <span className={styles.cardCountryBadge}>{st.countryCode}</span>
                      <h4 className={styles.cardStationName}>{st.name}</h4>
                      <span className={styles.statusBadge}>
                        {getStatusIcon(st.status)}
                        <span>{st.status}</span>
                      </span>
                    </div>

                    <div className={styles.cardAddress}>{st.address}</div>

                    <div className={styles.cardFooterRow}>
                      <span className={styles.operatorTag}>{st.operator}</span>
                      <div className={styles.cardMetrics}>
                        <span className={styles.cpMetric}>{st.chargers.length} Chargers</span>
                        {st.activePowerKw > 0 && (
                          <span className={styles.kwMetric}>{st.activePowerKw.toFixed(0)} kW</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </aside>
  );
};

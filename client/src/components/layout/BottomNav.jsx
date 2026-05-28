import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// (auth store imported if needed for conditional tabs)

// Primary 5 tabs visible in the bottom bar
const PRIMARY_TABS = [
  { to: '/dashboard', icon: '🏠', fr: 'Accueil', en: 'Home', exact: true },
  { to: '/dashboard/crops', icon: '🌱', fr: 'Cultures', en: 'Crops' },
  { to: '/dashboard/weather', icon: '🌤️', fr: 'Météo', en: 'Weather' },
  { to: '/market', icon: '🛒', fr: 'Marché', en: 'Market' },
  { to: '#more', icon: '⋯', fr: 'Plus', en: 'More', isMore: true },
];

// Overflow items shown in the sheet
const MORE_ITEMS = [
  { to: '/dashboard/irrigation', icon: '💧', fr: 'Irrigation', en: 'Irrigation' },
  { to: '/dashboard/finance', icon: '💰', fr: 'Finances', en: 'Finance' },
  { to: '/dashboard/map', icon: '🗺️', fr: 'Carte', en: 'Map' },
  { to: '/dashboard/species', icon: '📚', fr: 'Espèces', en: 'Species' },
  { to: '/dashboard/greenbot', icon: '🤖', fr: 'GreenBot', en: 'GreenBot' },
  { to: '/dashboard/soil-advisor', icon: '🔍', fr: 'Conseiller', en: 'Advisor' },
  { to: '/dashboard/koob-assist', icon: '📱', fr: 'Koob Assist', en: 'Koob Assist' },
  { to: '/dashboard/business-plan', icon: '📋', fr: 'Biz Plan', en: 'Biz Plan' },
  { to: '/network', icon: '🌍', fr: 'Réseau', en: 'Network' },
];

export default function BottomNav() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const location = useLocation();
  const [sheetOpen, setSheetOpen] = useState(false);

  const isActive = (to, exact) => {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  const moreIsActive = MORE_ITEMS.some(item => location.pathname.startsWith(item.to));

  return (
    <>
      <nav className="bottom-nav" aria-label="Navigation principale">
        <div className="bottom-nav-inner">
          {PRIMARY_TABS.map(tab => {
            if (tab.isMore) {
              return (
                <button
                  key="more"
                  className={`bottom-nav-item bottom-nav-more ${moreIsActive ? 'active' : ''}`}
                  onClick={() => setSheetOpen(true)}
                  aria-label={lang === 'fr' ? 'Plus' : 'More'}
                >
                  <span className="bottom-nav-icon">
                    {moreIsActive ? '⋯' : '⋯'}
                  </span>
                  <span className="bottom-nav-label">{lang === 'fr' ? tab.fr : tab.en}</span>
                </button>
              );
            }
            return (
              <NavLink
                key={tab.to}
                to={tab.to}
                end={tab.exact}
                className={({ isActive: ia }) =>
                  `bottom-nav-item ${ia ? 'active' : ''}`
                }
                onClick={() => setSheetOpen(false)}
                aria-label={lang === 'fr' ? tab.fr : tab.en}
              >
                <span className="bottom-nav-icon">{tab.icon}</span>
                <span className="bottom-nav-label">{lang === 'fr' ? tab.fr : tab.en}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* More sheet */}
      {sheetOpen && (
        <>
          <div
            className="overflow-backdrop"
            onClick={() => setSheetOpen(false)}
          />
          <div className="bottom-nav-overflow">
            <div style={{
              width: 36, height: 4,
              background: 'var(--gray-light)',
              borderRadius: 2,
              margin: '0 auto 1.25rem',
            }} />
            <div className="overflow-grid">
              {MORE_ITEMS.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive: ia }) =>
                    `overflow-item ${ia ? 'overflow-item-active' : ''}`
                  }
                  onClick={() => setSheetOpen(false)}
                  style={({ isActive: ia }) => ({
                    background: ia ? 'var(--green-pale)' : '',
                    color: ia ? 'var(--green-deep)' : '',
                    borderRadius: 'var(--radius-md)',
                  })}
                >
                  <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 500 }}>
                    {lang === 'fr' ? item.fr : item.en}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

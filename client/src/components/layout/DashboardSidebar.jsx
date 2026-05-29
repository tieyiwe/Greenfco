import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../store/authStore';
import './DashboardSidebar.css';

const DASHBOARD_NAV = [
  { to: '/dashboard', icon: '🏠', key: 'overview', labelFr: 'Tableau de bord', labelEn: 'Dashboard' },
  { to: '/dashboard/crops', icon: '🌱', key: 'crops', labelFr: 'Mes Cultures', labelEn: 'My Crops' },
  { to: '/dashboard/irrigation', icon: '💧', key: 'irrigation', labelFr: 'Irrigation', labelEn: 'Irrigation' },
  { to: '/dashboard/finance', icon: '💰', key: 'finance', labelFr: 'Finances', labelEn: 'Finance' },
  { to: '/dashboard/map', icon: '🗺️', key: 'map', labelFr: 'Cartographie', labelEn: 'Farm Map' },
  { to: '/dashboard/weather', icon: '🌤️', key: 'weather', labelFr: 'Météo', labelEn: 'Weather' },
  { to: '/dashboard/species', icon: '📚', key: 'species', labelFr: 'Espèces', labelEn: 'Species' },
  { to: '/marketplace', icon: '🛒', key: 'market', labelFr: 'Marché', labelEn: 'Market' },
  { to: '/consulting', icon: '📋', key: 'consulting', labelFr: 'Consultation', labelEn: 'Consulting' },
  { to: '/dashboard/soil-advisor', icon: '🔍', key: 'ai_advisor', labelFr: 'Conseiller IA', labelEn: 'AI Advisor' },
  { to: '/dashboard/greenbot', icon: '🤖', key: 'greenbot', labelFr: 'GreenBot', labelEn: 'GreenBot' },
  { to: '/dashboard/koob-assist', icon: '📱', key: 'koob_assist', labelFr: 'Koob Assist', labelEn: 'Koob Assist' },
];

const MARKETPLACE_NAV = [
  { to: '/marketplace', icon: '🛒', key: 'browse', labelFr: 'Parcourir', labelEn: 'Browse' },
  { to: '/marketplace', icon: '❤️', key: 'saved', labelFr: 'Sauvegardés', labelEn: 'Saved' },
  { to: '/agropro', icon: '💼', key: 'agropro', labelFr: 'Agro Business', labelEn: 'Agro Business' },
];

const AGROPRO_NAV = [
  { to: '/agropro', icon: '📦', key: 'sell', labelFr: 'Publier', labelEn: 'Sell' },
  { to: '/agropro', icon: '📊', key: 'prices', labelFr: 'Prix marché', labelEn: 'Market Prices' },
  { to: '/agropro', icon: '📈', key: 'analytics', labelFr: 'Analytique', labelEn: 'Analytics' },
  { to: '/agropro', icon: '📋', key: 'records', labelFr: 'Mes Records', labelEn: 'My Records' },
  { to: '/marketplace', icon: '🛒', key: 'marketplace', labelFr: 'Marketplace', labelEn: 'Marketplace' },
];

export default function DashboardSidebar({ isOpen, onClose }) {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const isMarketplace = location.pathname === '/marketplace';
  const isAgroPro = location.pathname === '/agropro';

  let navItems;
  let sectionLabel;
  let backLink;

  if (isMarketplace) {
    navItems = MARKETPLACE_NAV;
    sectionLabel = lang === 'fr' ? 'Marketplace' : 'Marketplace';
    backLink = { to: '/dashboard', label: lang === 'fr' ? '← Tableau de bord' : '← Dashboard' };
  } else if (isAgroPro) {
    navItems = AGROPRO_NAV;
    sectionLabel = lang === 'fr' ? 'Agro Business' : 'Agro Business';
    backLink = { to: '/dashboard', label: lang === 'fr' ? '← Tableau de bord' : '← Dashboard' };
  } else {
    navItems = DASHBOARD_NAV;
    sectionLabel = null;
    backLink = null;
  }

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo" onClick={onClose}>
            🌿 <span>Green</span>FCO
          </Link>
        </div>

        {user && (
          <div className="sidebar-user">
            <div className="sidebar-avatar">{user.name?.charAt(0).toUpperCase()}</div>
            <div>
              <p className="sidebar-user-name">{user.name}</p>
              <p className="sidebar-user-type">{user.user_type}</p>
            </div>
          </div>
        )}

        {backLink && (
          <Link to={backLink.to} className="sidebar-link sidebar-back" onClick={onClose}>
            <span>{backLink.label}</span>
          </Link>
        )}

        {sectionLabel && (
          <div className="sidebar-section-label">{sectionLabel}</div>
        )}

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <Link
              key={item.key}
              to={item.to}
              className={`sidebar-link ${location.pathname === item.to ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{lang === 'fr' ? item.labelFr : item.labelEn}</span>
            </Link>
          ))}
        </nav>

        {!isMarketplace && !isAgroPro && (
          <div className="sidebar-footer">
            <Link to="/network" className="sidebar-link" onClick={onClose}>
              <span className="sidebar-icon">🌍</span>
              <span>{lang === 'fr' ? 'Réseau' : 'Network'}</span>
            </Link>
            <button onClick={logout} className="sidebar-link sidebar-logout">
              <span className="sidebar-icon">🚪</span>
              <span>{lang === 'fr' ? 'Déconnexion' : 'Sign Out'}</span>
            </button>
          </div>
        )}

        {(isMarketplace || isAgroPro) && (
          <div className="sidebar-footer">
            <button onClick={logout} className="sidebar-link sidebar-logout">
              <span className="sidebar-icon">🚪</span>
              <span>{lang === 'fr' ? 'Déconnexion' : 'Sign Out'}</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../store/authStore';
import './DashboardSidebar.css';

const NAV_ITEMS = [
  { to: '/dashboard', icon: '🏠', key: 'overview', labelFr: 'Tableau de bord', labelEn: 'Dashboard' },
  { to: '/dashboard/crops', icon: '🌱', key: 'crops', labelFr: 'Mes Cultures', labelEn: 'My Crops' },
  { to: '/dashboard/irrigation', icon: '💧', key: 'irrigation', labelFr: 'Irrigation', labelEn: 'Irrigation' },
  { to: '/dashboard/finance', icon: '💰', key: 'finance', labelFr: 'Finances', labelEn: 'Finance' },
  { to: '/dashboard/map', icon: '🗺️', key: 'map', labelFr: 'Cartographie', labelEn: 'Farm Map' },
  { to: '/dashboard/weather', icon: '🌤️', key: 'weather', labelFr: 'Météo', labelEn: 'Weather' },
  { to: '/dashboard/species', icon: '📚', key: 'species', labelFr: 'Espèces', labelEn: 'Species' },
  { to: '/market', icon: '🛒', key: 'market', labelFr: 'Marché', labelEn: 'Market' },
  { to: '/dashboard/business-plan', icon: '📋', key: 'business_plan', labelFr: 'Business Plan', labelEn: 'Business Plan' },
  { to: '/dashboard/soil-advisor', icon: '🔍', key: 'ai_advisor', labelFr: 'Conseiller IA', labelEn: 'AI Advisor' },
  { to: '/dashboard/greenbot', icon: '🤖', key: 'greenbot', labelFr: 'GreenBot', labelEn: 'GreenBot' },
  { to: '/dashboard/koob-assist', icon: '📱', key: 'koob_assist', labelFr: 'Koob Assist', labelEn: 'Koob Assist' },
];

export default function DashboardSidebar({ isOpen, onClose }) {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const location = useLocation();
  const { user, logout } = useAuthStore();

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

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebar-link ${location.pathname === item.to ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{lang === 'fr' ? item.labelFr : item.labelEn}</span>
            </Link>
          ))}
        </nav>

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
      </aside>
    </>
  );
}

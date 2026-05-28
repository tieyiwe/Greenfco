import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../store/authStore';
import LanguageToggle from './LanguageToggle';
import './Navbar.css';

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isDashboard = location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/network') ||
    location.pathname.startsWith('/market');

  const publicLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/about', label: t('nav.about') },
    { to: '/blog', label: t('nav.blog') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const authLinks = [
    { to: '/dashboard', label: t('nav.dashboard') },
    { to: '/market', label: t('nav.market') },
    { to: '/network', label: t('nav.network') },
    { to: '/blog', label: t('nav.blog') },
  ];

  const links = isAuthenticated ? authLinks : publicLinks;

  function handleLogout() {
    logout();
    setProfileOpen(false);
  }

  return (
    <header className={`navbar ${isDashboard ? 'navbar-dashboard' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setMobileOpen(false)}>
          <span className="logo-icon">🌿</span>
          <span className="logo-text">
            <span className="logo-green">Green</span>FCO
          </span>
        </Link>

        <nav className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="navbar-actions">
          <LanguageToggle />
          {isAuthenticated ? (
            <div className="profile-menu">
              <button
                className="profile-trigger"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <span className="profile-avatar">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
                <span className="profile-name">{user?.name?.split(' ')[0]}</span>
                <span className="profile-chevron">{profileOpen ? '▲' : '▼'}</span>
              </button>
              {profileOpen && (
                <div className="profile-dropdown">
                  <Link to="/profile" onClick={() => setProfileOpen(false)}>
                    {t('nav.profile')}
                  </Link>
                  <button onClick={handleLogout}>{t('nav.logout')}</button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary btn-sm">
                {t('nav.login')}
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                {t('nav.register')}
              </Link>
            </div>
          )}
        </div>

        <button
          className={`hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}
    </header>
  );
}

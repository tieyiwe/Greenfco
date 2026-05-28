import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../store/authStore';
import LanguageToggle from './LanguageToggle';
import './Navbar.css';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isDashboard = location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/network') ||
    location.pathname.startsWith('/market');

  const publicLinks = [
    { to: '/', icon: '🏠', label: t('nav.home'), exact: true },
    { to: '/services', icon: '🌿', label: t('nav.services') },
    { to: '/about', icon: '👥', label: t('nav.about') },
    { to: '/blog', icon: '📰', label: t('nav.blog') },
    { to: '/gallery', icon: '📷', label: t('nav.gallery') },
    { to: '/contact', icon: '✉️', label: t('nav.contact') },
  ];

  const authLinks = [
    { to: '/dashboard', icon: '📊', label: t('nav.dashboard'), exact: true },
    { to: '/market', icon: '🛒', label: t('nav.market') },
    { to: '/network', icon: '🌍', label: t('nav.network') },
    { to: '/blog', icon: '📰', label: t('nav.blog') },
  ];

  const links = isAuthenticated ? authLinks : publicLinks;

  function handleLogout() {
    logout();
    setProfileOpen(false);
    setMobileOpen(false);
  }

  return (
    <>
      <header className={`navbar ${isDashboard ? 'navbar-dashboard' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={() => setMobileOpen(false)}>
            <span className="logo-icon">🌿</span>
            <span className="logo-text">
              <span className="logo-green">Green</span>FCO
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="navbar-links">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </NavLink>
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
                  <span className="profile-name desktop-only">{user?.name?.split(' ')[0]}</span>
                  <span className="profile-chevron desktop-only">{profileOpen ? '▲' : '▼'}</span>
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
                <Link to="/register" className="btn btn-primary btn-sm mobile-only">
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger — mobile only on public pages */}
          <button
            className={`hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile bottom sheet menu */}
      {mobileOpen && (
        <>
          <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
          <nav className="mobile-sheet" role="navigation">
            {/* Sheet handle */}
            <div className="sheet-handle" />

            <div className="sheet-header">
              <span className="sheet-logo">🌿 <strong>GreenFCO</strong></span>
              <button className="sheet-close" onClick={() => setMobileOpen(false)}>✕</button>
            </div>

            <div className="sheet-links">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.exact}
                  className={({ isActive }) => `sheet-link ${isActive ? 'sheet-link-active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="sheet-link-icon">{link.icon}</span>
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>

            {!isAuthenticated && (
              <div className="sheet-auth">
                <Link
                  to="/register"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {lang === 'fr' ? 'Créer un compte gratuit' : 'Create free account'}
                </Link>
                <Link
                  to="/login"
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {t('nav.login')}
                </Link>
              </div>
            )}

            {isAuthenticated && (
              <div className="sheet-auth">
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'center', color: '#c00', borderColor: '#c00' }}
                >
                  {t('nav.logout')}
                </button>
              </div>
            )}
          </nav>
        </>
      )}
    </>
  );
}

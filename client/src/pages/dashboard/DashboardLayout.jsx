import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import BottomNav from '../../components/layout/BottomNav';
import LanguageToggle from '../../components/layout/LanguageToggle';
import useAuthStore from '../../store/authStore';
import './DashboardLayout.css';

const PAGE_TITLES_FR = {
  '/dashboard': 'Tableau de bord',
  '/dashboard/crops': 'Mes Cultures',
  '/dashboard/irrigation': 'Irrigation',
  '/dashboard/finance': 'Finances',
  '/dashboard/map': 'Cartographie',
  '/dashboard/weather': 'Météo Agricole',
  '/dashboard/species': 'Espèces',
  '/dashboard/greenbot': 'GreenBot',
  '/dashboard/soil-advisor': 'Conseiller IA',
  '/dashboard/koob-assist': 'Koob Assist',
  '/market': 'Marché Numérique',
  '/network': 'Réseau',
};

const PAGE_TITLES_EN = {
  '/dashboard': 'Dashboard',
  '/dashboard/crops': 'My Crops',
  '/dashboard/irrigation': 'Irrigation',
  '/dashboard/finance': 'Finance',
  '/dashboard/map': 'Farm Map',
  '/dashboard/weather': 'Weather',
  '/dashboard/species': 'Species Library',
  '/dashboard/greenbot': 'GreenBot',
  '/dashboard/soil-advisor': 'AI Advisor',
  '/dashboard/koob-assist': 'Koob Assist',
  '/market': 'Digital Market',
  '/network': 'Network',
};

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const location = useLocation();
  const { user } = useAuthStore();

  const titles = lang === 'fr' ? PAGE_TITLES_FR : PAGE_TITLES_EN;
  const pageTitle = titles[location.pathname] || 'GreenFCO';

  return (
    <div className="dashboard-layout">
      {/* Desktop sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          {/* Desktop: hamburger toggle */}
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>

          {/* Mobile: page title (like native app topbar) */}
          <div className="topbar-title">
            <Link to="/" className="topbar-logo">
              <span>🌿</span>
            </Link>
            <h2 className="topbar-page-title">{pageTitle}</h2>
          </div>

          <div className="topbar-right">
            <LanguageToggle />
            <a
              href="https://wa.me/22600000000"
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp btn-sm topbar-wa"
            >
              💬 Support
            </a>
          </div>
        </header>

        <div className="dashboard-content scroll-ios page-transition">
          <Outlet />
        </div>
      </div>

      {/* Mobile bottom navigation — replaces sidebar on mobile */}
      <BottomNav />
    </div>
  );
}

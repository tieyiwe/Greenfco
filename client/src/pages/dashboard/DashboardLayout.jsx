import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import './DashboardLayout.css';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <div className="topbar-right">
            <a href="https://wa.me/22600000000" target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-sm">
              💬 Support
            </a>
          </div>
        </header>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

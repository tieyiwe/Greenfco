import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

const ADMIN_ROLES = {
  super_admin: { label: 'Super Admin', color: '#EF4444', canManageUsers: true, canDeleteContent: true, canInvite: true, canAccessSettings: true },
  manager: { label: 'Manager', color: '#F59E0B', canManageUsers: true, canDeleteContent: false, canInvite: false, canAccessSettings: false },
  analyst: { label: 'Analyst', color: '#3B82F6', canManageUsers: false, canDeleteContent: false, canInvite: false, canAccessSettings: false },
};

const DEFAULT_ADMIN = { name: 'Admin GreenFCO', email: 'admin@greenfco.com', role: 'super_admin' };

const NAV_LINKS = [
  { to: '/admin', icon: '📊', label: 'Dashboard', end: true },
  { to: '/admin/users', icon: '👥', label: 'Users' },
  { to: '/admin/listings', icon: '📦', label: 'Listings' },
  { to: '/admin/blog', icon: '📰', label: 'Blog' },
  { to: '/admin/consulting', icon: '🗓️', label: 'Consulting' },
  { to: '/admin/transactions', icon: '🔗', label: 'Transactions' },
  { to: '/admin/messages', icon: '✉️', label: 'Messages' },
  { to: '/admin/settings', icon: '⚙️', label: 'Settings' },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('greenfco_admin_session'));
      if (stored && stored.role) return stored;
    } catch {
      // fall through to default
    }
    // No valid session — create default super_admin session
    const def = DEFAULT_ADMIN;
    localStorage.setItem('greenfco_admin_session', JSON.stringify(def));
    return def;
  });

  function handleLogout() {
    localStorage.removeItem('user');
    navigate('/');
  }

  function handleRoleSwitch(e) {
    const updated = { ...adminUser, role: e.target.value };
    localStorage.setItem('greenfco_admin_session', JSON.stringify(updated));
    setAdminUser(updated);
  }

  const roleInfo = ADMIN_ROLES[adminUser?.role] || ADMIN_ROLES.analyst;

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <span className="logo-leaf">🌿</span>
          <h2>GreenFCO Admin</h2>
          <p>Administration Panel</p>
        </div>

        <nav className="admin-nav">
          <div className="admin-nav-section">
            <span className="admin-nav-label">Main</span>
            {NAV_LINKS.slice(0, 5).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `admin-nav-link${isActive ? ' active' : ''}`
                }
              >
                <span className="nav-icon">{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="admin-nav-section">
            <span className="admin-nav-label">System</span>
            {NAV_LINKS.slice(5).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `admin-nav-link${isActive ? ' active' : ''}`
                }
              >
                <span className="nav-icon">{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="admin-sidebar-footer">
          GreenFCO &copy; 2026
        </div>
      </aside>

      {/* Main */}
      <div className="admin-main">
        {/* Top Bar */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <h1>Administration</h1>
          </div>
          <div className="admin-topbar-right">
            <div className="admin-user-badge">
              <div className="admin-avatar">
                {(adminUser?.name || 'A').charAt(0).toUpperCase()}
              </div>
              <div className="admin-user-info">
                <span className="admin-user-name">{adminUser?.name || 'Admin'}</span>
                <span
                  className="admin-role-badge"
                  style={{ background: roleInfo.color }}
                >
                  {roleInfo.label}
                </span>
              </div>
            </div>
            {/* Role switcher — demo only */}
            <select
              className="admin-role-switcher"
              value={adminUser?.role || 'super_admin'}
              onChange={handleRoleSwitch}
              title="Switch role (demo)"
            >
              <option value="super_admin">Super Admin</option>
              <option value="manager">Manager</option>
              <option value="analyst">Analyst</option>
            </select>
            <button className="admin-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

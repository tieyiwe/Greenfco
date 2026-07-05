import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import './AdminLayout.css';
import { ROLE_BASE_PERMISSIONS } from './adminPermissions';

const ADMIN_ROLES = {
  super_admin: { label: 'Super Admin', color: '#EF4444', canManageUsers: true, canDeleteContent: true, canInvite: true, canAccessSettings: true },
  manager: { label: 'Manager', color: '#F59E0B', canManageUsers: true, canDeleteContent: false, canInvite: false, canAccessSettings: false },
  analyst: { label: 'Analyst', color: '#3B82F6', canManageUsers: false, canDeleteContent: false, canInvite: false, canAccessSettings: false },
};

const DEFAULT_ADMIN = { name: 'Admin GreenFCO', email: 'admin@greenfco.com', role: 'super_admin' };

const NAV_LINKS = [
  { to: '/admin',              icon: '📊', label: 'Dashboard',    end: true,  permission: null },
  { to: '/admin/users',        icon: '👥', label: 'Users',                    permission: 'view_users' },
  { to: '/admin/listings',     icon: '📦', label: 'Listings',                 permission: 'view_listings' },
  { to: '/admin/transactions', icon: '🔗', label: 'Transactions',             permission: 'view_transactions' },
  { to: '/admin/blog',         icon: '📰', label: 'Blog',                     permission: 'view_blog' },
  { to: '/admin/consulting',   icon: '🗓️', label: 'Consulting',               permission: 'view_consulting' },
  { to: '/admin/gallery',      icon: '🖼️', label: 'Galerie',                  permission: null },
  { to: '/admin/projects',     icon: '📋', label: 'Projets',                  permission: 'view_projects' },
  { to: '/admin/activity',     icon: '📜', label: 'Activité',                 permission: 'view_activity' },
  { to: '/admin/messages',     icon: '💬', label: 'Messages',                 permission: null },
  { to: '/admin/settings',     icon: '⚙️', label: 'Settings',                 permission: 'view_settings' },
];

function hasPermission(adminUser, collaborators, permKey) {
  if (!adminUser || adminUser.role === 'super_admin') return true;
  const collab = collaborators.find(c => c.email === adminUser.email);
  if (!collab) return ROLE_BASE_PERMISSIONS[adminUser.role]?.includes(permKey) ?? false;
  const perms = collab.customPermissions ?? ROLE_BASE_PERMISSIONS[collab.role] ?? [];
  return perms.includes(permKey);
}

export default function AdminLayout() {
  const navigate = useNavigate();

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('greenfco_admin_session'));
      if (stored && stored.role && stored.verified) return stored;
    } catch {}
    return DEFAULT_ADMIN;
  });

  function handleLogout() {
    localStorage.removeItem('greenfco_admin_session');
    localStorage.removeItem('greenfco_admin_token');
    navigate('/admin/login');
  }

  function handleRoleSwitch(e) {
    const updated = { ...adminUser, role: e.target.value };
    localStorage.setItem('greenfco_admin_session', JSON.stringify(updated));
    setAdminUser(updated);
  }

  const roleInfo = ADMIN_ROLES[adminUser?.role] || ADMIN_ROLES.analyst;

  const collaborators = (() => {
    try {
      return JSON.parse(localStorage.getItem('greenfco_admin_collaborators')) || [];
    } catch {
      return [];
    }
  })();

  const visibleLinks = NAV_LINKS.filter(
    link => !link.permission || hasPermission(adminUser, collaborators, link.permission)
  );

  // Split visible links into "Main" (first 8 nav items max) and "System" (remainder)
  // We keep the original split point: links before messages/settings are "Main", the rest "System"
  const mainLinks   = visibleLinks.filter(l => !['💬', '⚙️'].includes(l.icon));
  const systemLinks = visibleLinks.filter(l => ['💬', '⚙️'].includes(l.icon));

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
            {mainLinks.map((link) => (
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
            {systemLinks.map((link) => (
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

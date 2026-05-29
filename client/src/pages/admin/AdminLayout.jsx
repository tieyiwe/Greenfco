import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

const NAV_LINKS = [
  { to: '/admin', icon: '📊', label: 'Dashboard', end: true },
  { to: '/admin/users', icon: '👥', label: 'Users' },
  { to: '/admin/listings', icon: '📦', label: 'Listings' },
  { to: '/admin/blog', icon: '📰', label: 'Blog' },
  { to: '/admin/consulting', icon: '🗓️', label: 'Consulting' },
  { to: '/admin/messages', icon: '✉️', label: 'Messages' },
  { to: '/admin/settings', icon: '⚙️', label: 'Settings' },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('user');
    navigate('/');
  }

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
              <div className="admin-avatar">A</div>
              <span>Admin</span>
            </div>
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

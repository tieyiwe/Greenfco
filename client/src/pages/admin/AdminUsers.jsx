import { useState } from 'react';

const FAKE_USERS = [
  { id: 1, name: 'Amadou Traoré', email: 'amadou.traore@example.com', role: 'farmer', country: 'Burkina Faso', joined: '2025-11-03', status: 'active' },
  { id: 2, name: 'Fatima Diallo', email: 'fatima.diallo@example.com', role: 'buyer', country: 'Sénégal', joined: '2025-12-15', status: 'active' },
  { id: 3, name: 'Ibrahim Coulibaly', email: 'ibrahim.c@example.com', role: 'seller', country: 'Mali', joined: '2025-10-27', status: 'active' },
  { id: 4, name: 'Marie Koné', email: 'marie.kone@example.com', role: 'buyer', country: 'Côte d\'Ivoire', joined: '2026-01-09', status: 'suspended' },
  { id: 5, name: 'Kofi Mensah', email: 'kofi.mensah@example.com', role: 'farmer', country: 'Ghana', joined: '2026-01-22', status: 'active' },
  { id: 6, name: 'Aicha Sow', email: 'aicha.sow@example.com', role: 'seller', country: 'Guinée', joined: '2026-02-04', status: 'active' },
  { id: 7, name: 'Oumarou Traoré', email: 'oumarou.t@example.com', role: 'farmer', country: 'Burkina Faso', joined: '2026-02-18', status: 'active' },
  { id: 8, name: 'Seydou Ouédraogo', email: 'seydou.o@example.com', role: 'buyer', country: 'Burkina Faso', joined: '2026-03-01', status: 'active' },
  { id: 9, name: 'Fatoumata Bah', email: 'fatoumata.bah@example.com', role: 'seller', country: 'Sénégal', joined: '2026-03-14', status: 'suspended' },
  { id: 10, name: 'Wendyam Compaoré', email: 'wendyam.c@example.com', role: 'farmer', country: 'Burkina Faso', joined: '2026-04-05', status: 'active' },
];

const ROLE_COLORS = {
  farmer: { bg: '#d1fae5', color: '#065f46' },
  buyer: { bg: '#dbeafe', color: '#1e40af' },
  seller: { bg: '#ffedd5', color: '#9a3412' },
};

const STATUS_COLORS = {
  active: { bg: '#d1fae5', color: '#065f46' },
  suspended: { bg: '#fee2e2', color: '#991b1b' },
};

const s = {
  page: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' },
  title: { fontSize: '1.4rem', fontWeight: 700, color: '#1B4332', fontFamily: 'var(--font-display)', margin: 0 },
  subtitle: { fontSize: '0.85rem', color: 'var(--gray-mid)', marginTop: '0.15rem' },
  searchBar: {
    padding: '0.55rem 0.9rem',
    border: '1px solid var(--gray-light)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.875rem',
    outline: 'none',
    width: '280px',
    fontFamily: 'var(--font-body)',
  },
  card: {
    background: 'white',
    border: '1px solid var(--gray-light)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-sm)',
  },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' },
  th: {
    textAlign: 'left',
    padding: '0.75rem 1rem',
    background: 'var(--off-white)',
    borderBottom: '1px solid var(--gray-light)',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--gray-mid)',
    fontWeight: 600,
  },
  td: {
    padding: '0.8rem 1rem',
    borderBottom: '1px solid #f5f5f0',
    color: '#3D3D35',
    verticalAlign: 'middle',
  },
  badge: (bg, color) => ({
    display: 'inline-block',
    background: bg,
    color: color,
    padding: '0.2rem 0.6rem',
    borderRadius: '99px',
    fontSize: '0.72rem',
    fontWeight: 600,
    textTransform: 'capitalize',
  }),
  actionBtn: (variant) => ({
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    padding: '0.3rem 0.65rem',
    fontSize: '0.75rem',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    ...(variant === 'suspend'
      ? { background: '#fff3cd', color: '#856404' }
      : { background: '#fee2e2', color: '#991b1b' }),
  }),
  actions: { display: 'flex', gap: '0.4rem' },
};

const adminRole = (() => {
  try { return JSON.parse(localStorage.getItem('greenfco_admin_session'))?.role || 'analyst'; } catch { return 'analyst'; }
})();

export default function AdminUsers() {
  const [search, setSearch] = useState('');

  const filtered = FAKE_USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  function handleSuspend(user) {
    alert(`[Demo] Suspend user: ${user.name}`);
  }

  function handleDelete(user) {
    alert(`[Demo] Delete user: ${user.name}`);
  }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h2 style={s.title}>User Management</h2>
          <p style={s.subtitle}>{FAKE_USERS.length} registered users</p>
        </div>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={s.searchBar}
        />
      </div>

      <div style={s.card}>
        <div style={{ overflowX: 'auto' }}>
          <table style={s.table}>
            <thead>
              <tr>
                {['Name', 'Email', 'Role', 'Country', 'Joined', 'Status', 'Actions'].map((h) => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ ...s.td, textAlign: 'center', color: 'var(--gray-mid)', padding: '2rem' }}>
                    No users found.
                  </td>
                </tr>
              ) : (
                filtered.map((user) => {
                  const role = ROLE_COLORS[user.role] || ROLE_COLORS.farmer;
                  const stat = STATUS_COLORS[user.status] || STATUS_COLORS.active;
                  return (
                    <tr key={user.id} style={{ transition: 'background var(--transition)' }}>
                      <td style={s.td}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{
                            width: 28, height: 28, borderRadius: '50%',
                            background: 'var(--green-pale)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.8rem', fontWeight: 700, color: '#1B4332', flexShrink: 0,
                          }}>
                            {user.name.charAt(0)}
                          </div>
                          <span style={{ fontWeight: 500, color: '#1A1A14' }}>{user.name}</span>
                        </div>
                      </td>
                      <td style={s.td}>{user.email}</td>
                      <td style={s.td}>
                        <span style={s.badge(role.bg, role.color)}>{user.role}</span>
                      </td>
                      <td style={s.td}>{user.country}</td>
                      <td style={s.td}>{new Date(user.joined).toLocaleDateString('en-GB')}</td>
                      <td style={s.td}>
                        <span style={s.badge(stat.bg, stat.color)}>{user.status}</span>
                      </td>
                      <td style={s.td}>
                        <div style={s.actions}>
                          {/* Only managers and super_admins can manage users */}
                          {(adminRole === 'super_admin' || adminRole === 'manager') && (
                            <button style={s.actionBtn('suspend')} onClick={() => handleSuspend(user)}>
                              Suspend
                            </button>
                          )}
                          {/* Only super_admin can delete */}
                          {adminRole === 'super_admin' && (
                            <button style={s.actionBtn('delete')} onClick={() => handleDelete(user)}>
                              Delete
                            </button>
                          )}
                          {adminRole === 'analyst' && (
                            <span style={{ fontSize: '0.75rem', color: 'var(--gray-mid)', fontStyle: 'italic' }}>
                              View only
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

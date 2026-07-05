import { useState, useEffect } from 'react';
import adminClient from '../../api/adminClient';

const ROLE_COLORS = {
  farmer: { bg: '#d1fae5', color: '#065f46' },
  buyer:  { bg: '#dbeafe', color: '#1e40af' },
  seller: { bg: '#ffedd5', color: '#9a3412' },
};
const STATUS_COLORS = {
  active:    { bg: '#d1fae5', color: '#065f46' },
  suspended: { bg: '#fee2e2', color: '#991b1b' },
};

const s = {
  page: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' },
  title: { fontSize: '1.4rem', fontWeight: 700, color: '#1B4332', fontFamily: 'var(--font-display)', margin: 0 },
  subtitle: { fontSize: '0.85rem', color: 'var(--gray-mid)', marginTop: '0.15rem' },
  searchBar: { padding: '0.55rem 0.9rem', border: '1px solid var(--gray-light)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', outline: 'none', width: '280px', fontFamily: 'var(--font-body)' },
  card: { background: 'white', border: '1px solid var(--gray-light)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' },
  th: { textAlign: 'left', padding: '0.75rem 1rem', background: 'var(--off-white)', borderBottom: '1px solid var(--gray-light)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--gray-mid)', fontWeight: 600 },
  td: { padding: '0.8rem 1rem', borderBottom: '1px solid #f5f5f0', color: '#3D3D35', verticalAlign: 'middle' },
  badge: (bg, color) => ({ display: 'inline-block', background: bg, color, padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.72rem', fontWeight: 600, textTransform: 'capitalize' }),
  btn: (bg, color) => ({ border: 'none', borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.65rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', background: bg, color, fontFamily: 'var(--font-body)' }),
  actions: { display: 'flex', gap: '0.4rem', flexWrap: 'wrap' },
  avatar: { width: 28, height: 28, borderRadius: '50%', background: 'var(--green-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#1B4332', flexShrink: 0 },
};

function getRole() {
  try { return JSON.parse(localStorage.getItem('greenfco_admin_session'))?.role || 'analyst'; } catch { return 'analyst'; }
}

export default function AdminUsers() {
  const adminRole = getRole();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 3000); }

  useEffect(() => {
    adminClient.get('/users')
      .then(r => setUsers(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleToggleSuspend(user) {
    const newStatus = user.status === 'suspended' ? 'active' : 'suspended';
    try {
      const res = await adminClient.put(`/users/${user.id}`, { status: newStatus });
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, ...res.data } : u));
      showToast(`Utilisateur ${newStatus === 'suspended' ? 'suspendu' : 'réactivé'}.`);
    } catch { showToast('Erreur lors de la mise à jour.'); }
  }

  async function handleDelete(user) {
    if (!window.confirm(`Supprimer définitivement ${user.name} ?`)) return;
    try {
      await adminClient.delete(`/users/${user.id}`);
      setUsers(prev => prev.filter(u => u.id !== user.id));
      showToast('Utilisateur supprimé.');
    } catch { showToast('Erreur lors de la suppression.'); }
  }

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h2 style={s.title}>Gestion des utilisateurs</h2>
          <p style={s.subtitle}>{users.length} utilisateur{users.length !== 1 ? 's' : ''} inscrit{users.length !== 1 ? 's' : ''}</p>
        </div>
        <input type="text" placeholder="Rechercher nom ou email…" value={search} onChange={e => setSearch(e.target.value)} style={s.searchBar} />
      </div>

      <div style={s.card}>
        {loading ? (
          <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--gray-mid)' }}>Chargement…</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={s.table}>
              <thead>
                <tr>{['Nom', 'Email', 'Type', 'Pays', 'Inscrit le', 'Statut', 'Actions'].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} style={{ ...s.td, textAlign: 'center', color: 'var(--gray-mid)', padding: '3rem' }}>
                    {users.length === 0 ? 'Aucun utilisateur inscrit pour le moment.' : 'Aucun résultat.'}
                  </td></tr>
                ) : filtered.map(user => {
                  const rc = ROLE_COLORS[user.user_type] || ROLE_COLORS.farmer;
                  const sc = STATUS_COLORS[user.status] || STATUS_COLORS.active;
                  return (
                    <tr key={user.id}>
                      <td style={s.td}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={s.avatar}>{(user.name || 'U').charAt(0).toUpperCase()}</div>
                          <span style={{ fontWeight: 500, color: '#1A1A14' }}>{user.name}</span>
                        </div>
                      </td>
                      <td style={{ ...s.td, color: 'var(--gray-mid)' }}>{user.email}</td>
                      <td style={s.td}><span style={s.badge(rc.bg, rc.color)}>{user.user_type || 'farmer'}</span></td>
                      <td style={s.td}>{user.country || '—'}</td>
                      <td style={{ ...s.td, fontSize: '0.8rem', color: 'var(--gray-mid)' }}>
                        {user.created_at ? new Date(user.created_at).toLocaleDateString('fr-FR') : '—'}
                      </td>
                      <td style={s.td}><span style={s.badge(sc.bg, sc.color)}>{user.status || 'active'}</span></td>
                      <td style={s.td}>
                        <div style={s.actions}>
                          {(adminRole === 'super_admin' || adminRole === 'manager') && (
                            <button style={s.btn('#fef9c3', '#854d0e')} onClick={() => handleToggleSuspend(user)}>
                              {user.status === 'suspended' ? '✅ Réactiver' : '⚠ Suspendre'}
                            </button>
                          )}
                          {adminRole === 'super_admin' && (
                            <button style={s.btn('#fee2e2', '#991b1b')} onClick={() => handleDelete(user)}>🗑 Supprimer</button>
                          )}
                          {adminRole === 'analyst' && <span style={{ fontSize: '0.75rem', color: 'var(--gray-mid)', fontStyle: 'italic' }}>Lecture seule</span>}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {toast && <div className="admin-toast">{toast}</div>}
    </div>
  );
}

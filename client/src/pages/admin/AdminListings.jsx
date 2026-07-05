import { useState, useEffect } from 'react';
import adminClient from '../../api/adminClient';

const STATUS_STYLES = {
  active:   { bg: '#d1fae5', color: '#065f46', label: 'Active' },
  inactive: { bg: '#fee2e2', color: '#991b1b', label: 'Retirée' },
};

const s = {
  page: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' },
  title: { fontSize: '1.4rem', fontWeight: 700, color: '#1B4332', fontFamily: 'var(--font-display)', margin: 0 },
  subtitle: { fontSize: '0.85rem', color: 'var(--gray-mid)', marginTop: '0.15rem' },
  controls: { display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' },
  searchBar: { padding: '0.55rem 0.9rem', border: '1px solid var(--gray-light)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', outline: 'none', fontFamily: 'var(--font-body)', width: '220px' },
  card: { background: 'white', border: '1px solid var(--gray-light)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' },
  th: { textAlign: 'left', padding: '0.75rem 1rem', background: 'var(--off-white)', borderBottom: '1px solid var(--gray-light)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--gray-mid)', fontWeight: 600 },
  td: { padding: '0.8rem 1rem', borderBottom: '1px solid #f5f5f0', color: '#3D3D35', verticalAlign: 'middle' },
  badge: (bg, color) => ({ display: 'inline-block', background: bg, color, padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.72rem', fontWeight: 600 }),
  btn: (bg, color) => ({ border: 'none', borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.65rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', background: bg, color, fontFamily: 'var(--font-body)' }),
  actions: { display: 'flex', gap: '0.4rem' },
};

function getRole() {
  try { return JSON.parse(localStorage.getItem('greenfco_admin_session'))?.role || 'analyst'; } catch { return 'analyst'; }
}

export default function AdminListings() {
  const adminRole = getRole();
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 3000); }

  useEffect(() => {
    adminClient.get('/listings')
      .then(r => setListings(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function toggleActive(listing) {
    const active = !listing.active;
    try {
      const res = await adminClient.put(`/listings/${listing.id}`, { active });
      setListings(prev => prev.map(l => l.id === listing.id ? { ...l, ...res.data } : l));
      showToast(`Annonce ${active ? 'activée' : 'désactivée'}.`);
    } catch { showToast('Erreur.'); }
  }

  async function handleDelete(listing) {
    if (!window.confirm(`Supprimer "${listing.crop_name || listing.product}" ?`)) return;
    try {
      await adminClient.delete(`/listings/${listing.id}`);
      setListings(prev => prev.filter(l => l.id !== listing.id));
      showToast('Annonce supprimée.');
    } catch { showToast('Erreur.'); }
  }

  const filtered = listings.filter(l => {
    const q = search.toLowerCase();
    return !q || (l.crop_name || '').toLowerCase().includes(q) || (l.user_name || '').toLowerCase().includes(q) || (l.location || '').toLowerCase().includes(q);
  });

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h2 style={s.title}>Gestion des annonces</h2>
          <p style={s.subtitle}>{listings.length} annonce{listings.length !== 1 ? 's' : ''} au total</p>
        </div>
        <div style={s.controls}>
          <input type="text" placeholder="Rechercher…" value={search} onChange={e => setSearch(e.target.value)} style={s.searchBar} />
        </div>
      </div>

      <div style={s.card}>
        {loading ? (
          <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--gray-mid)' }}>Chargement…</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={s.table}>
              <thead>
                <tr>{['Produit', 'Vendeur', 'Prix', 'Localisation', 'Publié le', 'Statut', 'Actions'].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} style={{ ...s.td, textAlign: 'center', color: 'var(--gray-mid)', padding: '3rem' }}>
                    {listings.length === 0 ? 'Aucune annonce publiée pour le moment.' : 'Aucun résultat.'}
                  </td></tr>
                ) : filtered.map(l => {
                  const status = l.active !== false ? 'active' : 'inactive';
                  const ss = STATUS_STYLES[status];
                  return (
                    <tr key={l.id}>
                      <td style={{ ...s.td, fontWeight: 500, color: '#1A1A14', minWidth: 140 }}>{l.crop_name || l.product || '—'}</td>
                      <td style={s.td}>{l.user_name || l.seller || '—'}</td>
                      <td style={{ ...s.td, fontWeight: 600, color: '#1B4332', whiteSpace: 'nowrap' }}>
                        {l.price ? `${Number(l.price).toLocaleString()} ${l.currency || 'FCFA'}/kg` : '—'}
                      </td>
                      <td style={s.td}>{l.location || '—'}</td>
                      <td style={{ ...s.td, fontSize: '0.8rem', color: 'var(--gray-mid)' }}>
                        {l.created_at ? new Date(l.created_at).toLocaleDateString('fr-FR') : '—'}
                      </td>
                      <td style={s.td}><span style={s.badge(ss.bg, ss.color)}>{ss.label}</span></td>
                      <td style={s.td}>
                        <div style={s.actions}>
                          {(adminRole === 'super_admin' || adminRole === 'manager') && (
                            <button style={s.btn(status === 'active' ? '#fef9c3' : '#d1fae5', status === 'active' ? '#854d0e' : '#065f46')} onClick={() => toggleActive(l)}>
                              {status === 'active' ? '⚠ Désactiver' : '✅ Activer'}
                            </button>
                          )}
                          {adminRole === 'super_admin' && (
                            <button style={s.btn('#fee2e2', '#991b1b')} onClick={() => handleDelete(l)}>🗑</button>
                          )}
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

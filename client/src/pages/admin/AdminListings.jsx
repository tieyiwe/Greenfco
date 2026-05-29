import { useState } from 'react';

const FAKE_LISTINGS = [
  { id: 1, product: 'Sésame Blanc Bio', seller: 'Amadou Traoré', category: 'Céréales & Graines', price: '850 FCFA/kg', location: 'Ouagadougou, BF', posted: '2026-05-20', status: 'active' },
  { id: 2, product: 'Maïs Local (50kg)', seller: 'Seydou Ouédraogo', category: 'Céréales & Graines', price: '18,000 FCFA', location: 'Bobo-Dioulasso, BF', posted: '2026-05-22', status: 'pending' },
  { id: 3, product: 'Mangues Amélie (1 tonne)', seller: 'Kofi Mensah', category: 'Fruits & Légumes', price: '250,000 FCFA', location: 'Accra, Ghana', posted: '2026-05-15', status: 'active' },
  { id: 4, product: 'Gombo Séché (20kg)', seller: 'Fatima Diallo', category: 'Fruits & Légumes', price: '12,000 FCFA', location: 'Dakar, Sénégal', posted: '2026-05-24', status: 'pending' },
  { id: 5, product: 'Engrais Organique (5 sacs)', seller: 'Ibrahim Coulibaly', category: 'Intrants Agricoles', price: '45,000 FCFA', location: 'Bamako, Mali', posted: '2026-05-10', status: 'active' },
  { id: 6, product: 'Mil Pénicillaire (100kg)', seller: 'Wendyam Compaoré', category: 'Céréales & Graines', price: '28,000 FCFA', location: 'Koupèla, BF', posted: '2026-05-18', status: 'removed' },
  { id: 7, product: 'Oignons Secs (500kg)', seller: 'Aicha Sow', category: 'Fruits & Légumes', price: '150,000 FCFA', location: 'Conakry, Guinée', posted: '2026-05-26', status: 'pending' },
  { id: 8, product: 'Semences Sorgho Amélioré', seller: 'Oumarou Traoré', category: 'Semences', price: '3,500 FCFA/kg', location: 'Dori, BF', posted: '2026-05-21', status: 'active' },
];

const CATEGORIES = ['All', 'Céréales & Graines', 'Fruits & Légumes', 'Intrants Agricoles', 'Semences'];

const STATUS_STYLES = {
  active: { bg: '#d1fae5', color: '#065f46' },
  pending: { bg: '#fef9c3', color: '#854d0e' },
  removed: { bg: '#fee2e2', color: '#991b1b' },
};

const s = {
  page: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' },
  title: { fontSize: '1.4rem', fontWeight: 700, color: '#1B4332', fontFamily: 'var(--font-display)', margin: 0 },
  subtitle: { fontSize: '0.85rem', color: 'var(--gray-mid)', marginTop: '0.15rem' },
  controls: { display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' },
  select: {
    padding: '0.55rem 0.75rem',
    border: '1px solid var(--gray-light)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.875rem',
    outline: 'none',
    fontFamily: 'var(--font-body)',
    color: '#3D3D35',
    background: 'white',
    cursor: 'pointer',
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
    textAlign: 'left', padding: '0.75rem 1rem',
    background: 'var(--off-white)', borderBottom: '1px solid var(--gray-light)',
    fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em',
    color: 'var(--gray-mid)', fontWeight: 600,
  },
  td: { padding: '0.8rem 1rem', borderBottom: '1px solid #f5f5f0', color: '#3D3D35', verticalAlign: 'middle' },
  badge: (st) => ({
    display: 'inline-block',
    background: (STATUS_STYLES[st] || STATUS_STYLES.pending).bg,
    color: (STATUS_STYLES[st] || STATUS_STYLES.pending).color,
    padding: '0.2rem 0.6rem',
    borderRadius: '99px',
    fontSize: '0.72rem',
    fontWeight: 600,
    textTransform: 'capitalize',
  }),
  approveBtn: {
    border: 'none', borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.65rem',
    fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
    background: '#d1fae5', color: '#065f46', fontFamily: 'var(--font-body)',
  },
  removeBtn: {
    border: 'none', borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.65rem',
    fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
    background: '#fee2e2', color: '#991b1b', fontFamily: 'var(--font-body)',
  },
  actions: { display: 'flex', gap: '0.4rem' },
};

const adminRole = (() => {
  try { return JSON.parse(localStorage.getItem('greenfco_admin_session'))?.role || 'analyst'; } catch { return 'analyst'; }
})();

export default function AdminListings() {
  const [category, setCategory] = useState('All');

  const filtered = FAKE_LISTINGS.filter(
    (l) => category === 'All' || l.category === category
  );

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h2 style={s.title}>Listing Management</h2>
          <p style={s.subtitle}>{FAKE_LISTINGS.length} total listings</p>
        </div>
        <div style={s.controls}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={s.select}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={s.card}>
        <div style={{ overflowX: 'auto' }}>
          <table style={s.table}>
            <thead>
              <tr>
                {['Product', 'Seller', 'Category', 'Price', 'Location', 'Posted', 'Status', 'Actions'].map((h) => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ ...s.td, textAlign: 'center', color: 'var(--gray-mid)', padding: '2rem' }}>
                    No listings found in this category.
                  </td>
                </tr>
              ) : (
                filtered.map((listing) => (
                  <tr key={listing.id}>
                    <td style={{ ...s.td, fontWeight: 500, color: '#1A1A14', minWidth: '160px' }}>{listing.product}</td>
                    <td style={s.td}>{listing.seller}</td>
                    <td style={s.td}>{listing.category}</td>
                    <td style={{ ...s.td, fontWeight: 600, color: '#1B4332', whiteSpace: 'nowrap' }}>{listing.price}</td>
                    <td style={s.td}>{listing.location}</td>
                    <td style={s.td}>{new Date(listing.posted).toLocaleDateString('en-GB')}</td>
                    <td style={s.td}>
                      <span style={s.badge(listing.status)}>{listing.status}</span>
                    </td>
                    <td style={s.td}>
                      <div style={s.actions}>
                        {/* Approve: manager+ */}
                        {(adminRole === 'super_admin' || adminRole === 'manager') && (
                          <button style={s.approveBtn} onClick={() => alert(`[Demo] Approve: ${listing.product}`)}>
                            Approve
                          </button>
                        )}
                        {/* Remove: super_admin only */}
                        {adminRole === 'super_admin' && (
                          <button style={s.removeBtn} onClick={() => alert(`[Demo] Remove: ${listing.product}`)}>
                            Remove
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

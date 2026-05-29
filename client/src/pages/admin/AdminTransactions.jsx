import { useState, useEffect } from 'react';

const DEMO_TRANSACTIONS = [
  {
    id: 'demo-001',
    token: 'demo-token-001',
    sellerId: 'seller',
    sellerName: 'Moussa Kaboré',
    buyerName: 'Aïssata Bambara',
    productName: 'Oignons',
    listingId: '1',
    agreedPrice: 250,
    finalPrice: 250,
    currency: 'FCFA',
    status: 'confirmed',
    createdAt: '2026-05-20T10:30:00.000Z',
    confirmedAt: '2026-05-20T11:15:00.000Z',
    location: 'Ouagadougou',
  },
  {
    id: 'demo-002',
    token: 'demo-token-002',
    sellerId: 'seller',
    sellerName: 'Mariam Traoré',
    buyerName: 'Paul Kinda',
    productName: 'Sésame',
    listingId: '6',
    agreedPrice: 600,
    finalPrice: 580,
    currency: 'FCFA',
    status: 'confirmed',
    createdAt: '2026-05-22T08:00:00.000Z',
    confirmedAt: '2026-05-22T08:45:00.000Z',
    location: 'Dédougou',
  },
  {
    id: 'demo-003',
    token: 'demo-token-003',
    sellerId: 'seller',
    sellerName: 'Ibrahim Sawadogo',
    buyerName: 'Acheteur Inconnu',
    productName: 'Tomates',
    listingId: '3',
    agreedPrice: 300,
    finalPrice: null,
    currency: 'FCFA',
    status: 'pending',
    createdAt: '2026-05-29T09:00:00.000Z',
    confirmedAt: null,
    location: 'Koudougou',
  },
];

const STATUS_COLORS = {
  pending:   { bg: '#fef9c3', color: '#854d0e', label: 'En attente' },
  confirmed: { bg: '#d1fae5', color: '#065f46', label: 'Confirmée' },
  disputed:  { bg: '#fee2e2', color: '#991b1b', label: 'Disputée' },
};

function exportCSV(rows) {
  const headers = ['ID', 'Vendeur', 'Acheteur', 'Produit', 'Prix convenu (FCFA)', 'Prix final (FCFA)', 'Statut', 'Lieu', 'Créée le', 'Confirmée le'];
  const lines = rows.map(t => [
    t.id.slice(0, 8).toUpperCase(),
    t.sellerName,
    t.buyerName || '—',
    t.productName,
    t.agreedPrice,
    t.finalPrice != null ? t.finalPrice : '—',
    t.status,
    t.location || '—',
    new Date(t.createdAt).toLocaleDateString('fr-FR'),
    t.confirmedAt ? new Date(t.confirmedAt).toLocaleDateString('fr-FR') : '—',
  ].map(v => '"' + String(v).replace(/"/g, '""') + '"').join(','));
  const csv = [headers.join(','), ...lines].join('\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'greenfco_transactions_' + new Date().toISOString().slice(0, 10) + '.csv';
  a.click();
  URL.revokeObjectURL(url);
}

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
  statsBar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
    gap: '1rem',
  },
  statCard: {
    background: 'white',
    border: '1px solid var(--gray-light)',
    borderRadius: 'var(--radius-md)',
    padding: '1.25rem 1.5rem',
    boxShadow: 'var(--shadow-sm)',
  },
  statLabel: { fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--gray-mid)', marginBottom: '0.4rem' },
  statValue: { fontSize: '1.6rem', fontWeight: 700, color: '#1B4332', lineHeight: 1 },
  statSub: { fontSize: '0.78rem', color: 'var(--gray-mid)', marginTop: '0.2rem' },
  card: {
    background: 'white',
    border: '1px solid var(--gray-light)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-sm)',
  },
  tableWrap: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' },
  th: {
    textAlign: 'left', padding: '0.75rem 1rem',
    background: 'var(--off-white)', borderBottom: '1px solid var(--gray-light)',
    fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em',
    color: 'var(--gray-mid)', fontWeight: 600, whiteSpace: 'nowrap',
  },
  td: { padding: '0.75rem 1rem', borderBottom: '1px solid var(--gray-light)', color: '#3D3D35', verticalAlign: 'middle' },
  actionBtn: {
    padding: '0.3rem 0.6rem',
    border: '1px solid var(--gray-light)',
    borderRadius: 'var(--radius-sm)',
    background: 'white',
    cursor: 'pointer',
    fontSize: '0.78rem',
    marginRight: '0.35rem',
    color: '#3D3D35',
  },
  exportBtn: {
    padding: '0.55rem 1rem',
    background: '#1B4332',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 600,
  },
  empty: { textAlign: 'center', padding: '3rem 1rem', color: 'var(--gray-mid)' },
};

function StatusBadge({ status }) {
  const cfg = STATUS_COLORS[status] || { bg: '#f3f4f6', color: '#6b7280', label: status };
  return (
    <span style={{
      display: 'inline-block',
      padding: '0.25rem 0.6rem',
      borderRadius: '999px',
      fontSize: '0.75rem',
      fontWeight: 600,
      background: cfg.bg,
      color: cfg.color,
      whiteSpace: 'nowrap',
    }}>
      {cfg.label}
    </span>
  );
}

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const stored = (() => {
      try { return JSON.parse(localStorage.getItem('greenfco_transactions')) || []; }
      catch { return []; }
    })();
    setTransactions(stored.length > 0 ? stored : DEMO_TRANSACTIONS);
  }, []);

  const filtered = filter === 'all' ? transactions : transactions.filter(t => t.status === filter);

  const confirmed = transactions.filter(t => t.status === 'confirmed');
  const totalVolume = confirmed.reduce((sum, t) => sum + (t.finalPrice || t.agreedPrice || 0), 0);
  const avgTxn = confirmed.length > 0 ? Math.round(totalVolume / confirmed.length) : 0;
  const thisMonth = transactions.filter(t => {
    const d = new Date(t.createdAt);
    const now = new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;

  function markDisputed(id) {
    const updated = transactions.map(t => t.id === id ? { ...t, status: 'disputed' } : t);
    setTransactions(updated);
    localStorage.setItem('greenfco_transactions', JSON.stringify(updated));
  }

  function deleteTxn(id) {
    if (!confirm('Supprimer cette transaction ? / Delete this transaction?')) return;
    const updated = transactions.filter(t => t.id !== id);
    const next = updated.length > 0 ? updated : DEMO_TRANSACTIONS;
    setTransactions(next);
    localStorage.setItem('greenfco_transactions', JSON.stringify(updated));
  }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h1 style={s.title}>🔗 Transactions QR</h1>
          <p style={s.subtitle}>Suivi des transactions en personne / In-person transaction tracking</p>
        </div>
        <div style={s.controls}>
          <select style={s.select} value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">Tous les statuts / All statuses</option>
            <option value="pending">En attente / Pending</option>
            <option value="confirmed">Confirmées / Confirmed</option>
            <option value="disputed">Disputées / Disputed</option>
          </select>
          <button style={s.exportBtn} onClick={() => exportCSV(filtered)}>
            ⬇ Export CSV
          </button>
        </div>
      </div>

      <div style={s.statsBar}>
        <div style={s.statCard}>
          <div style={s.statLabel}>Total Transactions</div>
          <div style={s.statValue}>{transactions.length}</div>
          <div style={s.statSub}>depuis le début / all time</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statLabel}>Volume Total</div>
          <div style={s.statValue}>{totalVolume.toLocaleString()}</div>
          <div style={s.statSub}>FCFA confirmés</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statLabel}>Moy. Transaction</div>
          <div style={s.statValue}>{avgTxn.toLocaleString()}</div>
          <div style={s.statSub}>FCFA par transaction</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statLabel}>Ce mois / This Month</div>
          <div style={s.statValue}>{thisMonth}</div>
          <div style={s.statSub}>transactions créées</div>
        </div>
      </div>

      <div style={s.card}>
        <div style={s.tableWrap}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>ID</th>
                <th style={s.th}>Vendeur</th>
                <th style={s.th}>Acheteur</th>
                <th style={s.th}>Produit</th>
                <th style={s.th}>Prix convenu</th>
                <th style={s.th}>Prix final</th>
                <th style={s.th}>Statut</th>
                <th style={s.th}>Date</th>
                <th style={s.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} style={s.empty}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔗</div>
                    Aucune transaction trouvée / No transactions found
                  </td>
                </tr>
              ) : filtered.map(t => (
                <tr key={t.id}>
                  <td style={s.td}>
                    <code style={{ fontSize: '0.78rem', background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                      {t.id.slice(0, 8).toUpperCase()}
                    </code>
                  </td>
                  <td style={s.td}>{t.sellerName}</td>
                  <td style={s.td}>{t.buyerName || <span style={{ color: 'var(--gray-mid)' }}>—</span>}</td>
                  <td style={s.td}>{t.productName}</td>
                  <td style={s.td}>{(t.agreedPrice || 0).toLocaleString()} {t.currency}</td>
                  <td style={s.td}>
                    {t.finalPrice != null
                      ? <strong>{t.finalPrice.toLocaleString()} {t.currency}</strong>
                      : <span style={{ color: 'var(--gray-mid)' }}>—</span>
                    }
                  </td>
                  <td style={s.td}><StatusBadge status={t.status} /></td>
                  <td style={s.td}>
                    {new Date(t.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td style={s.td}>
                    {t.status !== 'disputed' && (
                      <button style={s.actionBtn} onClick={() => markDisputed(t.id)} title="Marquer disputée">
                        ⚠ Dispute
                      </button>
                    )}
                    <button
                      style={{ ...s.actionBtn, borderColor: '#fca5a5', color: '#991b1b' }}
                      onClick={() => deleteTxn(t.id)}
                      title="Supprimer"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

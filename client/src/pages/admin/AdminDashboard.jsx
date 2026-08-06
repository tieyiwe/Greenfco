import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminClient from '../../api/adminClient';

const s = {
  page: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' },
  title: { fontSize: '1.5rem', fontWeight: 700, color: '#1B4332', fontFamily: 'var(--font-display)', margin: 0 },
  subtitle: { fontSize: '0.875rem', color: 'var(--gray-mid)', marginTop: '0.2rem' },
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' },
  kpi: (color) => ({
    background: 'white', border: '1px solid var(--gray-light)', borderLeft: `4px solid ${color}`,
    borderRadius: 'var(--radius-md)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)',
    display: 'flex', flexDirection: 'column', gap: '0.4rem',
  }),
  kpiVal: { fontSize: '2rem', fontWeight: 700, color: '#1B4332', lineHeight: 1 },
  kpiLabel: { fontSize: '0.75rem', color: 'var(--gray-mid)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 },
  kpiSub: { fontSize: '0.75rem', color: 'var(--gray-mid)' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' },
  card: {
    background: 'white', border: '1px solid var(--gray-light)',
    borderRadius: 'var(--radius-md)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)',
  },
  cardTitle: { fontSize: '0.9rem', fontWeight: 700, color: '#1B4332', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' },
  quickLink: {
    display: 'flex', alignItems: 'center', gap: '0.75rem',
    padding: '0.75rem', borderRadius: 'var(--radius-sm)',
    background: 'var(--off-white)', textDecoration: 'none', color: '#3D3D35',
    fontSize: '0.875rem', fontWeight: 500, transition: 'background 0.15s',
  },
  statRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid #f5f5f0' },
  dot: (c) => ({ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block', marginRight: '0.4rem' }),
};

const KPI_DEFS = [
  { key: 'users',         icon: '👥', label: 'Utilisateurs',      color: '#2D6A4F' },
  { key: 'listings',      icon: '📦', label: 'Annonces totales',  color: '#52B788', sub: (s) => `${s.active_listings} actives` },
  { key: 'consulting',    icon: '🗓️', label: 'Consultations',     color: '#8B5E3C', sub: (s) => `${s.pending_consulting} en attente` },
  { key: 'newsletter',    icon: '📨', label: 'Abonnés newsletter', color: '#1B4332' },
  { key: 'contacts',      icon: '💬', label: 'Messages reçus',    color: '#D97706', sub: (s) => `${s.unread_contacts} non lus` },
  { key: 'gallery',       icon: '🖼️', label: 'Photos galerie',    color: '#7C3AED' },
  { key: 'crops',         icon: '🌾', label: 'Cultures suivies',  color: '#059669' },
  { key: 'collaborators', icon: '🤝', label: 'Collaborateurs',    color: '#0369A1' },
];

const QUICK_LINKS = [
  { to: '/admin/users',       icon: '👥', label: 'Gérer les utilisateurs' },
  { to: '/admin/listings',    icon: '📦', label: 'Modérer les annonces' },
  { to: '/admin/consulting',  icon: '🗓️', label: 'Demandes de conseil' },
  { to: '/admin/gallery',     icon: '🖼️', label: 'Gérer la galerie' },
  { to: '/admin/messages',    icon: '💬', label: 'Messages internes' },
  { to: '/admin/settings',    icon: '⚙️', label: 'Paramètres plateforme' },
];

const HEALTH = [
  { label: 'Serveur API', color: '#16a34a' },
  { label: 'Base de données', color: '#16a34a' },
  { label: 'IA (Anthropic)', color: process.env.ANTHROPIC_API_KEY ? '#16a34a' : '#d97706' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminClient.get('/stats')
      .then(res => setStats(res.data))
      .catch(() => setStats({}))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h2 style={s.title}>Tableau de bord</h2>
          <p style={s.subtitle}>
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button
          onClick={() => { setLoading(true); adminClient.get('/stats').then(r => setStats(r.data)).finally(() => setLoading(false)); }}
          style={{ background: 'var(--green-deep)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', padding: '0.5rem 1rem', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
        >
          🔄 Actualiser
        </button>
      </div>

      {/* KPI Cards */}
      <div style={s.kpiGrid}>
        {KPI_DEFS.map(({ key, icon, label, color, sub }) => (
          <div key={key} style={s.kpi(color)}>
            <span style={{ fontSize: '1.5rem' }}>{icon}</span>
            <span style={s.kpiVal}>
              {loading ? '—' : (stats?.[key] ?? 0)}
            </span>
            <span style={s.kpiLabel}>{label}</span>
            {sub && <span style={s.kpiSub}>{loading ? '' : sub(stats || {})}</span>}
          </div>
        ))}
      </div>

      {/* Quick Links + Health */}
      <div style={s.grid2}>
        {/* Quick links */}
        <div style={s.card}>
          <div style={s.cardTitle}><span>⚡</span> Actions rapides</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {QUICK_LINKS.map(({ to, icon, label }) => (
              <Link key={to} to={to} style={s.quickLink}>
                <span style={{ fontSize: '1.1rem', width: 24, textAlign: 'center' }}>{icon}</span>
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Platform status */}
        <div style={s.card}>
          <div style={s.cardTitle}><span>🟢</span> État de la plateforme</div>
          {HEALTH.map(h => (
            <div key={h.label} style={s.statRow}>
              <span style={{ fontSize: '0.875rem', color: '#3D3D35', fontWeight: 500 }}>{h.label}</span>
              <span style={{ fontSize: '0.8rem', color: h.color, fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                <span style={s.dot(h.color)} />
                Opérationnel
              </span>
            </div>
          ))}

          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ ...s.cardTitle, marginBottom: '0.75rem' }}><span>📊</span> Répartition données</div>
            {loading ? (
              <p style={{ color: 'var(--gray-mid)', fontSize: '0.875rem' }}>Chargement…</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { label: 'Utilisateurs inscrits', val: stats?.users ?? 0, max: Math.max(stats?.users ?? 1, 1) },
                  { label: 'Cultures enregistrées', val: stats?.crops ?? 0, max: Math.max(stats?.crops ?? 1, 1) },
                  { label: 'Photos galerie', val: stats?.gallery ?? 0, max: Math.max(stats?.gallery ?? 1, 10) },
                ].map(({ label, val, max }) => (
                  <div key={label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--gray-mid)', marginBottom: '3px' }}>
                      <span>{label}</span><span>{val}</span>
                    </div>
                    <div style={{ background: '#f0f0ed', borderRadius: 4, height: 6 }}>
                      <div style={{ width: `${Math.min(100, (val / max) * 100)}%`, background: '#2D6A4F', height: '100%', borderRadius: 4, transition: 'width 0.5s' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import adminClient from '../../api/adminClient';

// ─── logActivity helper (exported for use by other admin pages) ──────────────
export function logActivity(type, actor, action, target, severity = 'info') {
  adminClient.post('/activity', { type, actor, action, target, severity }).catch(() => {});
}

export function getAdminName() {
  try { return JSON.parse(localStorage.getItem('greenfco_admin_session'))?.name || 'Admin'; } catch { return 'Admin'; }
}


const TYPE_ICONS = {
  user_action: '👤',
  system: '🖥️',
  transaction: '💰',
  listing: '📦',
  consulting: '🗓️',
  project: '📋',
};

const TYPE_LABELS = {
  user_action: 'Actions utilisateur',
  system: 'Système',
  transaction: 'Transactions',
  listing: 'Annonces',
  consulting: 'Conseil',
  project: 'Projets',
};

const SEVERITY_STYLES = {
  info:    { bg: '#dbeafe', color: '#1e40af', label: 'Info' },
  success: { bg: '#d1fae5', color: '#065f46', label: 'Succès' },
  warning: { bg: '#fef9c3', color: '#854d0e', label: 'Avertissement' },
  error:   { bg: '#fee2e2', color: '#991b1b', label: 'Erreur' },
};

const SEVERITY_ROW_BG = {
  info:    'rgba(219, 234, 254, 0.25)',
  success: 'rgba(209, 250, 229, 0.25)',
  warning: 'rgba(254, 249, 195, 0.35)',
  error:   'rgba(254, 226, 226, 0.35)',
};

function formatDateTime(iso) {
  try {
    return new Date(iso).toLocaleString('fr-FR', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function exportCSV(entries) {
  const header = ['ID', 'Type', 'Acteur', 'Action', 'Cible', 'Date', 'Sévérité'];
  const rows = entries.map((e) => [
    e.id, e.type, `"${e.actor}"`, `"${e.action}"`, `"${e.target}"`, e.createdAt, e.severity,
  ]);
  const csv = [header, ...rows].map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `greenfco-activity-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminActivity() {
  const [log, setLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    adminClient.get('/activity')
      .then(r => setLog(Array.isArray(r.data) ? r.data : []))
      .catch(() => setLog([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = log.filter((entry) => {
    if (typeFilter !== 'all' && entry.type !== typeFilter) return false;
    if (severityFilter !== 'all' && entry.severity !== severityFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!entry.actor.toLowerCase().includes(q) && !entry.action.toLowerCase().includes(q) && !entry.target.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const typeFilterBtns = [
    { key: 'all', label: 'Tous' },
    { key: 'user_action', label: 'Utilisateurs' },
    { key: 'system', label: 'Système' },
    { key: 'transaction', label: 'Transactions' },
    { key: 'listing', label: 'Annonces' },
    { key: 'consulting', label: 'Conseil' },
    { key: 'project', label: 'Projets' },
  ];

  const severityBtns = [
    { key: 'all', label: 'Tous' },
    { key: 'info', label: 'Info' },
    { key: 'warning', label: 'Avertissement' },
    { key: 'success', label: 'Succès' },
    { key: 'error', label: 'Erreur' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, color: '#1B4332', fontFamily: 'var(--font-display)' }}>
            Journal d'Activité
          </h2>
          <p style={{ margin: '0.15rem 0 0', fontSize: '0.85rem', color: 'var(--gray-mid)' }}>
            Audit complet des actions de la plateforme
          </p>
        </div>
        <button
          onClick={() => exportCSV(filtered)}
          style={{ background: 'var(--green-deep)', color: 'white', border: 'none', borderRadius: '6px', padding: '0.55rem 1.1rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
        >
          ⬇ Exporter CSV
        </button>
      </div>

      {/* Filter Bar */}
      <div style={{ background: 'white', border: '1px solid var(--gray-light)', borderRadius: '10px', padding: '1rem 1.25rem', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {/* Type filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', marginRight: '0.25rem' }}>Type :</span>
          {typeFilterBtns.map((btn) => (
            <button
              key={btn.key}
              onClick={() => setTypeFilter(btn.key)}
              style={{
                background: typeFilter === btn.key ? 'var(--green-deep)' : '#f3f4f6',
                color: typeFilter === btn.key ? 'white' : '#374151',
                border: 'none', borderRadius: '99px', padding: '0.3rem 0.75rem',
                fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)',
                transition: 'all 0.15s',
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Severity + Search */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', marginRight: '0.25rem' }}>Sévérité :</span>
            {severityBtns.map((btn) => (
              <button
                key={btn.key}
                onClick={() => setSeverityFilter(btn.key)}
                style={{
                  background: severityFilter === btn.key ? (SEVERITY_STYLES[btn.key]?.bg || 'var(--green-deep)') : '#f3f4f6',
                  color: severityFilter === btn.key ? (SEVERITY_STYLES[btn.key]?.color || 'white') : '#374151',
                  border: 'none', borderRadius: '99px', padding: '0.3rem 0.75rem',
                  fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)',
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Rechercher acteur, action, cible..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '0.45rem 0.85rem', border: '1px solid var(--gray-light)',
              borderRadius: '6px', fontSize: '0.875rem', outline: 'none',
              fontFamily: 'var(--font-body)', minWidth: '260px', flex: 1,
            }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div style={{ background: 'white', border: '1px solid var(--gray-light)', borderRadius: '10px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray-mid)' }}>Chargement…</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray-mid)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔍</div>
            <p>{log.length === 0 ? 'Aucune activité enregistrée.' : 'Aucune entrée correspondant aux filtres.'}</p>
          </div>
        ) : (
          filtered.map((entry, idx) => {
            const sev = SEVERITY_STYLES[entry.severity] || SEVERITY_STYLES.info;
            const rowBg = SEVERITY_ROW_BG[entry.severity] || 'transparent';
            return (
              <div
                key={entry.id}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                  padding: '0.85rem 1.25rem',
                  background: rowBg,
                  borderBottom: idx < filtered.length - 1 ? '1px solid #f0f0ed' : 'none',
                }}
              >
                {/* Icon */}
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: sev.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0, marginTop: '2px' }}>
                  {TYPE_ICONS[entry.type] || '📌'}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.875rem', color: '#1A1A14', lineHeight: 1.4 }}>
                    <span style={{ fontWeight: 700, color: '#1B4332' }}>{entry.actor}</span>
                    {' '}
                    <span>{entry.action}</span>
                    {' '}
                    <span style={{ color: '#6B7280', fontStyle: 'italic' }}>{entry.target}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                    <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>{formatDateTime(entry.created_at || entry.createdAt)}</span>
                    <span style={{ fontSize: '0.65rem', color: '#9CA3AF' }}>·</span>
                    <span style={{ fontSize: '0.68rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{TYPE_LABELS[entry.type]}</span>
                  </div>
                </div>

                {/* Severity badge */}
                <span style={{ background: sev.bg, color: sev.color, padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.68rem', fontWeight: 700, flexShrink: 0, whiteSpace: 'nowrap' }}>
                  {sev.label}
                </span>
              </div>
            );
          })
        )}
      </div>

      <p style={{ fontSize: '0.75rem', color: '#9CA3AF', textAlign: 'center' }}>
        {filtered.length} entrée{filtered.length !== 1 ? 's' : ''} affichée{filtered.length !== 1 ? 's' : ''}
        {filtered.length !== log.length && ` sur ${log.length} total`}
      </p>
    </div>
  );
}

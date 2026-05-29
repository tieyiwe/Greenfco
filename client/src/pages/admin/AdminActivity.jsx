import { useState } from 'react';

// ─── logActivity helper (exported for use by other admin pages) ──────────────
export function logActivity(type, actor, action, target, severity = 'info') {
  try {
    const existing = JSON.parse(localStorage.getItem('greenfco_activity_log')) || [];
    const entry = {
      id: crypto.randomUUID(),
      type,
      actor,
      action,
      target,
      createdAt: new Date().toISOString(),
      severity,
    };
    localStorage.setItem('greenfco_activity_log', JSON.stringify([entry, ...existing]));
  } catch {}
}

// ─── Default 20 activity entries ────────────────────────────────────────────
const DEFAULT_ACTIVITY = [
  { id: 'a1',  type: 'project',     actor: 'Admin GreenFCO',   action: 'a créé le projet',             target: 'Lancement GreenFCO v2',          createdAt: '2026-05-28T08:00:00Z', severity: 'info' },
  { id: 'a2',  type: 'user_action', actor: 'Système',           action: 'a enregistré un nouvel utilisateur', target: 'Amadou Traoré (Agriculteur)',   createdAt: '2026-05-28T08:15:00Z', severity: 'success' },
  { id: 'a3',  type: 'listing',     actor: 'Aïssata Kaboré',   action: 'a approuvé une annonce',       target: 'Tomates fraîches #224 — Ouagadougou', createdAt: '2026-05-28T09:00:00Z', severity: 'success' },
  { id: 'a4',  type: 'consulting',  actor: 'Moussa Traoré',    action: 'a confirmé une demande de conseil', target: 'Fatima Diallo — Irrigation avancée', createdAt: '2026-05-28T09:30:00Z', severity: 'success' },
  { id: 'a5',  type: 'transaction', actor: 'Système',           action: 'a traité une transaction',     target: 'TXN-20260528-0042 — 85 000 FCFA', createdAt: '2026-05-28T10:00:00Z', severity: 'success' },
  { id: 'a6',  type: 'user_action', actor: 'Admin GreenFCO',   action: 'a suspendu un compte',         target: 'Marie Koné (Acheteur)',           createdAt: '2026-05-28T10:20:00Z', severity: 'warning' },
  { id: 'a7',  type: 'user_action', actor: 'Aïssata Kaboré',   action: 'a invité un collaborateur',    target: 'souleymane.barry@greenfco.com',   createdAt: '2026-05-28T10:45:00Z', severity: 'info' },
  { id: 'a8',  type: 'listing',     actor: 'Moussa Traoré',    action: 'a rejeté une annonce',         target: 'Engrais non certifié #115 — Bobo', createdAt: '2026-05-28T11:00:00Z', severity: 'error' },
  { id: 'a9',  type: 'project',     actor: 'Aïssata Kaboré',   action: 'a mis à jour le statut du projet', target: 'Formation équipe terrain → Actif', createdAt: '2026-05-28T11:30:00Z', severity: 'info' },
  { id: 'a10', type: 'system',      actor: 'Système',           action: 'a effectué une sauvegarde automatique', target: 'Base de données — 09:00 UTC',  createdAt: '2026-05-28T11:45:00Z', severity: 'info' },
  { id: 'a11', type: 'transaction', actor: 'Système',           action: 'a signalé un paiement échoué', target: 'TXN-20260527-0039 — Kofi Mensah', createdAt: '2026-05-27T16:00:00Z', severity: 'error' },
  { id: 'a12', type: 'user_action', actor: 'Système',           action: 'a enregistré un nouvel utilisateur', target: 'Seydou Ouédraogo (Acheteur)',  createdAt: '2026-05-27T14:20:00Z', severity: 'success' },
  { id: 'a13', type: 'listing',     actor: 'Admin GreenFCO',   action: 'a approuvé une annonce',       target: 'Sésame bio 50kg #220 — Koudougou',createdAt: '2026-05-27T13:00:00Z', severity: 'success' },
  { id: 'a14', type: 'consulting',  actor: 'Aïssata Kaboré',   action: 'a annulé une demande de conseil', target: 'Ibrahim Coulibaly — Maraîchage', createdAt: '2026-05-27T11:15:00Z', severity: 'warning' },
  { id: 'a15', type: 'project',     actor: 'Moussa Traoré',    action: 'a ajouté une tâche au projet', target: 'Campagne Marketplace Q2 — Contacter coopératives', createdAt: '2026-05-27T10:00:00Z', severity: 'info' },
  { id: 'a16', type: 'system',      actor: 'Système',           action: 'a détecté une activité suspecte', target: 'Tentatives de connexion multiples — IP 41.82.x.x', createdAt: '2026-05-27T03:00:00Z', severity: 'error' },
  { id: 'a17', type: 'user_action', actor: 'Admin GreenFCO',   action: 'a modifié le rôle d\'un collaborateur', target: 'Moussa Traoré → Analyst',   createdAt: '2026-05-26T15:30:00Z', severity: 'info' },
  { id: 'a18', type: 'transaction', actor: 'Système',           action: 'a validé une transaction',     target: 'TXN-20260526-0031 — 120 000 FCFA',createdAt: '2026-05-26T12:00:00Z', severity: 'success' },
  { id: 'a19', type: 'listing',     actor: 'Aïssata Kaboré',   action: 'a mis en avant une annonce',   target: 'Ignames fraîches #198 — Gaoua',   createdAt: '2026-05-26T09:45:00Z', severity: 'info' },
  { id: 'a20', type: 'project',     actor: 'Admin GreenFCO',   action: 'a créé le projet',             target: 'Campagne Marketplace Q2',         createdAt: '2026-05-25T08:00:00Z', severity: 'info' },
];

function loadActivity() {
  try {
    const stored = JSON.parse(localStorage.getItem('greenfco_activity_log'));
    if (Array.isArray(stored) && stored.length > 0) return stored;
  } catch {}
  return DEFAULT_ACTIVITY;
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
  const [log] = useState(loadActivity);
  const [typeFilter, setTypeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [search, setSearch] = useState('');

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
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray-mid)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔍</div>
            <p>Aucune entrée correspondant aux filtres.</p>
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
                    <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>{formatDateTime(entry.createdAt)}</span>
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

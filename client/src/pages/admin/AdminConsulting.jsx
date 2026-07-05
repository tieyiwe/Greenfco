import { useState, useEffect } from 'react';
import adminClient from '../../api/adminClient';

const STATUS_STYLES = {
  pending:   { bg: '#fef9c3', color: '#854d0e', label: 'En attente' },
  confirmed: { bg: '#d1fae5', color: '#065f46', label: 'Confirmé' },
  cancelled: { bg: '#fee2e2', color: '#991b1b', label: 'Annulé' },
};

const CALENDAR_COLORS = { pending: '#fbbf24', confirmed: '#34d399', cancelled: '#f87171' };
const HOURS = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];

const s = {
  page: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' },
  title: { fontSize: '1.4rem', fontWeight: 700, color: '#1B4332', fontFamily: 'var(--font-display)', margin: 0 },
  subtitle: { fontSize: '0.85rem', color: 'var(--gray-mid)', marginTop: '0.15rem' },
  toggleRow: { display: 'flex', gap: '0.5rem' },
  viewBtn: (active) => ({
    border: active ? 'none' : '1px solid var(--gray-light)',
    background: active ? '#1B4332' : 'white', color: active ? 'white' : '#3D3D35',
    borderRadius: 'var(--radius-sm)', padding: '0.45rem 0.9rem',
    fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)',
  }),
  card: { background: 'white', border: '1px solid var(--gray-light)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' },
  th: { textAlign: 'left', padding: '0.75rem 1rem', background: 'var(--off-white)', borderBottom: '1px solid var(--gray-light)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--gray-mid)', fontWeight: 600 },
  td: { padding: '0.8rem 1rem', borderBottom: '1px solid #f5f5f0', color: '#3D3D35', verticalAlign: 'middle' },
  badge: (st) => {
    const style = STATUS_STYLES[st] || STATUS_STYLES.pending;
    return { display: 'inline-block', background: style.bg, color: style.color, padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.72rem', fontWeight: 600 };
  },
  btn: (bg, color) => ({ border: 'none', borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.6rem', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', background: bg, color, fontFamily: 'var(--font-body)' }),
  actions: { display: 'flex', gap: '0.35rem', flexWrap: 'wrap' },
  calendarWrap: { background: 'white', border: '1px solid var(--gray-light)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', overflow: 'auto' },
  calendarTitle: { padding: '1rem 1.25rem', borderBottom: '1px solid var(--gray-light)', fontWeight: 700, color: '#1B4332', fontSize: '0.9rem' },
};

function getRole() {
  try { return JSON.parse(localStorage.getItem('greenfco_admin_session'))?.role || 'analyst'; } catch { return 'analyst'; }
}

function buildCalendarDays(consulting) {
  const now = new Date();
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push({
      label: d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }),
      dateStr: d.toISOString().slice(0, 10),
    });
  }
  return days;
}

export default function AdminConsulting() {
  const adminRole = getRole();
  const [consulting, setConsulting] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('table');
  const [toast, setToast] = useState('');

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 3000); }

  useEffect(() => {
    adminClient.get('/consulting')
      .then(r => setConsulting(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleStatus(item, newStatus) {
    try {
      const res = await adminClient.put(`/consulting/${item.id}`, { status: newStatus });
      setConsulting(prev => prev.map(c => c.id === item.id ? { ...c, ...res.data } : c));
      showToast(`Statut mis à jour : ${STATUS_STYLES[newStatus]?.label || newStatus}`);
    } catch { showToast('Erreur.'); }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Supprimer la demande de ${item.name || item.full_name} ?`)) return;
    try {
      await adminClient.delete(`/consulting/${item.id}`);
      setConsulting(prev => prev.filter(c => c.id !== item.id));
      showToast('Demande supprimée.');
    } catch { showToast('Erreur.'); }
  }

  const days = buildCalendarDays(consulting);
  const pending = consulting.filter(c => !c.status || c.status === 'pending').length;

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h2 style={s.title}>Demandes de consulting</h2>
          <p style={s.subtitle}>{consulting.length} demande{consulting.length !== 1 ? 's' : ''} — {pending} en attente</p>
        </div>
        <div style={s.toggleRow}>
          <button style={s.viewBtn(view === 'table')} onClick={() => setView('table')}>Tableau</button>
          <button style={s.viewBtn(view === 'calendar')} onClick={() => setView('calendar')}>Calendrier</button>
        </div>
      </div>

      {view === 'table' ? (
        <div style={s.card}>
          {loading ? (
            <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--gray-mid)' }}>Chargement…</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={s.table}>
                <thead>
                  <tr>{['Nom', 'Email', 'Téléphone', 'Service', 'Date souhaitée', 'Message', 'Statut', 'Actions'].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {consulting.length === 0 ? (
                    <tr><td colSpan={8} style={{ ...s.td, textAlign: 'center', color: 'var(--gray-mid)', padding: '3rem' }}>Aucune demande de consulting pour le moment.</td></tr>
                  ) : consulting.map(item => {
                    const st = item.status || 'pending';
                    return (
                      <tr key={item.id}>
                        <td style={{ ...s.td, fontWeight: 500, color: '#1A1A14' }}>{item.name || item.full_name || '—'}</td>
                        <td style={{ ...s.td, color: 'var(--gray-mid)' }}>{item.email || '—'}</td>
                        <td style={s.td}>{item.phone || '—'}</td>
                        <td style={s.td}>{item.service || item.subject || '—'}</td>
                        <td style={{ ...s.td, fontSize: '0.8rem' }}>
                          {item.preferred_date ? new Date(item.preferred_date).toLocaleDateString('fr-FR') : '—'}
                          {item.preferred_time ? ` ${item.preferred_time}` : ''}
                        </td>
                        <td style={{ ...s.td, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.8rem', color: 'var(--gray-mid)' }}>
                          {item.message || '—'}
                        </td>
                        <td style={s.td}><span style={s.badge(st)}>{STATUS_STYLES[st]?.label || st}</span></td>
                        <td style={s.td}>
                          <div style={s.actions}>
                            {(adminRole === 'super_admin' || adminRole === 'manager') && (
                              <>
                                {st !== 'confirmed' && (
                                  <button style={s.btn('#d1fae5', '#065f46')} onClick={() => handleStatus(item, 'confirmed')}>✅ Confirmer</button>
                                )}
                                {st !== 'cancelled' && (
                                  <button style={s.btn('#fef9c3', '#854d0e')} onClick={() => handleStatus(item, 'cancelled')}>⚠ Annuler</button>
                                )}
                                {st !== 'pending' && (
                                  <button style={s.btn('#f0f0f0', '#6b7280')} onClick={() => handleStatus(item, 'pending')}>↩ En attente</button>
                                )}
                              </>
                            )}
                            {adminRole === 'super_admin' && (
                              <button style={s.btn('#fee2e2', '#991b1b')} onClick={() => handleDelete(item)}>🗑</button>
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
      ) : (
        <div style={s.calendarWrap}>
          <div style={s.calendarTitle}>7 prochains jours</div>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: `70px repeat(${days.length}, 1fr)`, minWidth: '700px' }}>
              <div style={{ padding: '0.5rem', background: 'var(--off-white)', borderBottom: '1px solid var(--gray-light)', borderRight: '1px solid #f0f0ed' }} />
              {days.map(d => (
                <div key={d.dateStr} style={{ padding: '0.5rem 0.25rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#1B4332', background: 'var(--off-white)', borderBottom: '1px solid var(--gray-light)', borderRight: '1px solid #f0f0ed' }}>{d.label}</div>
              ))}
              {HOURS.map(hour => (
                <>
                  <div key={`t-${hour}`} style={{ fontSize: '0.7rem', color: 'var(--gray-mid)', padding: '0.4rem 0.5rem', textAlign: 'right', borderBottom: '1px solid #f5f5f0', borderRight: '1px solid var(--gray-light)', lineHeight: 1 }}>{hour}</div>
                  {days.map(d => {
                    const appts = consulting.filter(c => c.preferred_date === d.dateStr && (c.preferred_time || '').startsWith(hour.slice(0, 2)));
                    return (
                      <div key={`c-${hour}-${d.dateStr}`} style={{ borderBottom: '1px solid #f5f5f0', borderRight: '1px solid #f0f0ed', minHeight: '38px', padding: '2px' }}>
                        {appts.map(a => (
                          <div key={a.id} style={{ background: CALENDAR_COLORS[a.status || 'pending'] || '#52B788', borderRadius: '3px', padding: '2px 5px', fontSize: '0.65rem', color: 'white', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: '1px' }} title={`${a.name || a.full_name} — ${a.service || a.subject}`}>
                            {(a.name || a.full_name || '?').split(' ')[0]}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === 'calendar' && (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {Object.entries(CALENDAR_COLORS).map(([status, color]) => (
            <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#3D3D35' }}>
              <span style={{ width: 12, height: 12, borderRadius: 3, background: color, display: 'inline-block' }} />
              {STATUS_STYLES[status]?.label || status}
            </div>
          ))}
        </div>
      )}

      {toast && <div className="admin-toast">{toast}</div>}
    </div>
  );
}

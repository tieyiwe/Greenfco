import { useState } from 'react';

const APPOINTMENTS = [
  { id: 1, name: 'Amadou Traoré', email: 'amadou@example.com', phone: '+226 70 11 22 33', service: 'Irrigation Planning', date: '2026-06-02', time: '09:00', dayIndex: 0, status: 'confirmed' },
  { id: 2, name: 'Fatima Diallo', email: 'fatima@example.com', phone: '+221 77 55 44 33', service: 'Soil Analysis', date: '2026-06-02', time: '11:00', dayIndex: 0, status: 'pending' },
  { id: 3, name: 'Ibrahim Coulibaly', email: 'ibrahim@example.com', phone: '+223 65 22 11 00', service: 'Carbon Finance', date: '2026-06-03', time: '14:00', dayIndex: 1, status: 'confirmed' },
  { id: 4, name: 'Marie Koné', email: 'marie@example.com', phone: '+225 07 88 66 55', service: 'Agroforestry', date: '2026-06-04', time: '10:00', dayIndex: 2, status: 'pending' },
  { id: 5, name: 'Kofi Mensah', email: 'kofi@example.com', phone: '+233 24 77 33 22', service: 'Crop Management', date: '2026-06-04', time: '15:00', dayIndex: 2, status: 'cancelled' },
  { id: 6, name: 'Aicha Sow', email: 'aicha@example.com', phone: '+224 62 44 55 66', service: 'Market Access', date: '2026-06-05', time: '09:00', dayIndex: 3, status: 'pending' },
  { id: 7, name: 'Oumarou Traoré', email: 'oumarou@example.com', phone: '+226 76 99 88 77', service: 'Business Plan', date: '2026-06-06', time: '13:00', dayIndex: 4, status: 'confirmed' },
  { id: 8, name: 'Wendyam Compaoré', email: 'wendyam@example.com', phone: '+226 71 33 44 55', service: 'Drone Survey', date: '2026-06-06', time: '16:00', dayIndex: 4, status: 'pending' },
];

const DAYS = ['Mon 2', 'Tue 3', 'Wed 4', 'Thu 5', 'Fri 6', 'Sat 7', 'Sun 8'];
const HOURS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

const STATUS_STYLES = {
  pending: { bg: '#fef9c3', color: '#854d0e', label: 'Pending' },
  confirmed: { bg: '#d1fae5', color: '#065f46', label: 'Confirmed' },
  cancelled: { bg: '#fee2e2', color: '#991b1b', label: 'Cancelled' },
};

const CALENDAR_COLORS = {
  pending: '#fbbf24',
  confirmed: '#34d399',
  cancelled: '#f87171',
};

const s = {
  page: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' },
  title: { fontSize: '1.4rem', fontWeight: 700, color: '#1B4332', fontFamily: 'var(--font-display)', margin: 0 },
  subtitle: { fontSize: '0.85rem', color: 'var(--gray-mid)', marginTop: '0.15rem' },
  toggleRow: { display: 'flex', gap: '0.5rem' },
  viewBtn: (active) => ({
    border: active ? 'none' : '1px solid var(--gray-light)',
    background: active ? '#1B4332' : 'white',
    color: active ? 'white' : '#3D3D35',
    borderRadius: 'var(--radius-sm)',
    padding: '0.45rem 0.9rem',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
  }),
  card: {
    background: 'white', border: '1px solid var(--gray-light)',
    borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)',
  },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' },
  th: {
    textAlign: 'left', padding: '0.75rem 1rem',
    background: 'var(--off-white)', borderBottom: '1px solid var(--gray-light)',
    fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em',
    color: 'var(--gray-mid)', fontWeight: 600,
  },
  td: { padding: '0.8rem 1rem', borderBottom: '1px solid #f5f5f0', color: '#3D3D35', verticalAlign: 'middle' },
  badge: (st) => {
    const style = STATUS_STYLES[st] || STATUS_STYLES.pending;
    return {
      display: 'inline-block', background: style.bg, color: style.color,
      padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.72rem', fontWeight: 600,
    };
  },
  confirmBtn: { border: 'none', borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.6rem', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', background: '#d1fae5', color: '#065f46', fontFamily: 'var(--font-body)' },
  cancelBtn: { border: 'none', borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.6rem', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', background: '#fef9c3', color: '#854d0e', fontFamily: 'var(--font-body)' },
  deleteBtn: { border: 'none', borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.6rem', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', background: '#fee2e2', color: '#991b1b', fontFamily: 'var(--font-body)' },
  actions: { display: 'flex', gap: '0.35rem', flexWrap: 'wrap' },

  // Calendar
  calendarWrap: {
    background: 'white', border: '1px solid var(--gray-light)',
    borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)',
    overflow: 'auto',
  },
  calendarTitle: { padding: '1rem 1.25rem', borderBottom: '1px solid var(--gray-light)', fontWeight: 700, color: '#1B4332', fontSize: '0.9rem' },
  calGrid: {
    display: 'grid',
    gridTemplateColumns: '60px repeat(7, 1fr)',
    minWidth: '700px',
  },
  dayHeader: {
    padding: '0.5rem 0.25rem',
    textAlign: 'center',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#1B4332',
    background: 'var(--off-white)',
    borderBottom: '1px solid var(--gray-light)',
    borderRight: '1px solid #f0f0ed',
  },
  timeLabel: {
    fontSize: '0.7rem',
    color: 'var(--gray-mid)',
    padding: '0.4rem 0.5rem',
    textAlign: 'right',
    borderBottom: '1px solid #f5f5f0',
    borderRight: '1px solid var(--gray-light)',
    lineHeight: 1,
  },
  cell: (hasAppt) => ({
    borderBottom: '1px solid #f5f5f0',
    borderRight: '1px solid #f0f0ed',
    minHeight: '40px',
    position: 'relative',
    padding: '2px',
    background: hasAppt ? 'transparent' : 'white',
  }),
  apptBlock: (status) => ({
    background: CALENDAR_COLORS[status] || '#52B788',
    borderRadius: '4px',
    padding: '3px 5px',
    fontSize: '0.65rem',
    color: 'white',
    fontWeight: 600,
    lineHeight: 1.3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    margin: '1px',
    cursor: 'default',
  }),
};

function CalendarView() {
  return (
    <div style={s.calendarWrap}>
      <div style={s.calendarTitle}>Week of June 2–8, 2026</div>
      <div style={s.calGrid}>
        {/* Top-left empty corner */}
        <div style={{ ...s.dayHeader, background: 'var(--off-white)' }} />
        {DAYS.map((d) => (
          <div key={d} style={s.dayHeader}>{d}</div>
        ))}

        {/* Rows for each hour */}
        {HOURS.map((hour) => (
          <>
            <div key={`time-${hour}`} style={s.timeLabel}>{hour}</div>
            {DAYS.map((_, dayIdx) => {
              const appts = APPOINTMENTS.filter(
                (a) => a.dayIndex === dayIdx && a.time === hour
              );
              return (
                <div key={`cell-${hour}-${dayIdx}`} style={s.cell(appts.length > 0)}>
                  {appts.map((a) => (
                    <div key={a.id} style={s.apptBlock(a.status)} title={`${a.name} — ${a.service}`}>
                      {a.name.split(' ')[0]}
                    </div>
                  ))}
                </div>
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
}

export default function AdminConsulting() {
  const [view, setView] = useState('table');

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h2 style={s.title}>Consulting Appointments</h2>
          <p style={s.subtitle}>{APPOINTMENTS.length} appointment requests</p>
        </div>
        <div style={s.toggleRow}>
          <button style={s.viewBtn(view === 'table')} onClick={() => setView('table')}>
            Table View
          </button>
          <button style={s.viewBtn(view === 'calendar')} onClick={() => setView('calendar')}>
            Calendar View
          </button>
        </div>
      </div>

      {view === 'table' ? (
        <div style={s.card}>
          <div style={{ overflowX: 'auto' }}>
            <table style={s.table}>
              <thead>
                <tr>
                  {['Name', 'Email', 'Phone', 'Service', 'Date', 'Status', 'Actions'].map((h) => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {APPOINTMENTS.map((appt) => (
                  <tr key={appt.id}>
                    <td style={{ ...s.td, fontWeight: 500, color: '#1A1A14' }}>{appt.name}</td>
                    <td style={s.td}>{appt.email}</td>
                    <td style={s.td}>{appt.phone}</td>
                    <td style={s.td}>{appt.service}</td>
                    <td style={s.td}>
                      {new Date(appt.date).toLocaleDateString('en-GB')} {appt.time}
                    </td>
                    <td style={s.td}>
                      <span style={s.badge(appt.status)}>
                        {STATUS_STYLES[appt.status]?.label || appt.status}
                      </span>
                    </td>
                    <td style={s.td}>
                      <div style={s.actions}>
                        <button style={s.confirmBtn} onClick={() => alert(`[Demo] Confirm: ${appt.name}`)}>Confirm</button>
                        <button style={s.cancelBtn} onClick={() => alert(`[Demo] Cancel: ${appt.name}`)}>Cancel</button>
                        <button style={s.deleteBtn} onClick={() => alert(`[Demo] Delete: ${appt.name}`)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <CalendarView />
      )}

      {/* Legend */}
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
    </div>
  );
}

import { useState } from 'react';

const KPI_CARDS = [
  { icon: '👥', label: 'Total Users', value: '1,240', change: '+42 this month', color: '#2D6A4F' },
  { icon: '📦', label: 'Active Listings', value: '385', change: '+18 this week', color: '#52B788' },
  { icon: '📰', label: 'Blog Articles', value: '12', change: '3 pending review', color: '#8B5E3C' },
  { icon: '🗓️', label: 'Consulting Requests', value: '47', change: '8 pending', color: '#1B4332' },
];

const RECENT_ACTIVITY = [
  { id: 1, type: 'user', icon: '👤', text: 'Amadou Traoré registered as a Farmer', time: '2 min ago' },
  { id: 2, type: 'listing', icon: '📦', text: 'New listing posted: 50kg Sesame — Ouagadougou', time: '14 min ago' },
  { id: 3, type: 'consulting', icon: '🗓️', text: 'Consulting request from Fatima Diallo (Irrigation)', time: '32 min ago' },
  { id: 4, type: 'user', icon: '👤', text: 'Marie Koné registered as a Buyer', time: '1h ago' },
  { id: 5, type: 'blog', icon: '📰', text: 'New article submitted: "Sorgho au Sahel 2026"', time: '3h ago' },
];

const PLATFORM_HEALTH = [
  { label: 'API Status', status: 'operational', color: '#52B788', dot: '#16a34a' },
  { label: 'Database', status: 'operational', color: '#52B788', dot: '#16a34a' },
  { label: 'Email Service', status: 'degraded', color: '#f59e0b', dot: '#d97706' },
];

const styles = {
  page: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  pageHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  pageTitle: { fontSize: '1.5rem', fontWeight: 700, color: '#1B4332', fontFamily: 'var(--font-display)', margin: 0 },
  pageSubtitle: { fontSize: '0.875rem', color: 'var(--gray-mid)', marginTop: '0.2rem' },
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' },
  kpiCard: (color) => ({
    background: 'white',
    border: '1px solid var(--gray-light)',
    borderRadius: 'var(--radius-md)',
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    boxShadow: 'var(--shadow-sm)',
    borderLeft: `4px solid ${color}`,
  }),
  kpiIcon: { fontSize: '1.75rem' },
  kpiValue: { fontSize: '2rem', fontWeight: 700, color: '#1B4332', lineHeight: 1 },
  kpiLabel: { fontSize: '0.8rem', color: 'var(--gray-mid)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 },
  kpiChange: { fontSize: '0.75rem', color: 'var(--gray-mid)', marginTop: '0.25rem' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' },
  card: {
    background: 'white',
    border: '1px solid var(--gray-light)',
    borderRadius: 'var(--radius-md)',
    padding: '1.25rem',
    boxShadow: 'var(--shadow-sm)',
  },
  cardTitle: { fontSize: '0.9rem', fontWeight: 700, color: '#1B4332', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
  activityItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    padding: '0.75rem 0',
    borderBottom: '1px solid #f0f0ed',
  },
  activityIcon: { fontSize: '1.1rem', marginTop: '2px', flexShrink: 0 },
  activityText: { fontSize: '0.85rem', color: '#3D3D35', lineHeight: 1.4, flex: 1 },
  activityTime: { fontSize: '0.75rem', color: 'var(--gray-mid)', flexShrink: 0 },
  healthRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.6rem 0',
    borderBottom: '1px solid #f0f0ed',
  },
  healthLabel: { fontSize: '0.875rem', color: '#3D3D35', fontWeight: 500 },
  healthBadge: (color, dot) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.8rem',
    color: dot,
    fontWeight: 600,
    background: `${color}20`,
    padding: '0.2rem 0.6rem',
    borderRadius: '99px',
  }),
  dot: (dot) => ({
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: dot,
    display: 'inline-block',
  }),
};

export default function AdminDashboard() {
  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <div>
          <h2 style={styles.pageTitle}>Dashboard Overview</h2>
          <p style={styles.pageSubtitle}>Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--gray-mid)' }}>
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>

      {/* KPI Cards */}
      <div style={styles.kpiGrid}>
        {KPI_CARDS.map((kpi) => (
          <div key={kpi.label} style={styles.kpiCard(kpi.color)}>
            <span style={styles.kpiIcon}>{kpi.icon}</span>
            <span style={styles.kpiValue}>{kpi.value}</span>
            <span style={styles.kpiLabel}>{kpi.label}</span>
            <span style={styles.kpiChange}>{kpi.change}</span>
          </div>
        ))}
      </div>

      {/* Activity + Health */}
      <div style={styles.grid2}>
        {/* Recent Activity */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>
            <span>🕐</span> Recent Activity
          </div>
          {RECENT_ACTIVITY.map((item) => (
            <div key={item.id} style={styles.activityItem}>
              <span style={styles.activityIcon}>{item.icon}</span>
              <span style={styles.activityText}>{item.text}</span>
              <span style={styles.activityTime}>{item.time}</span>
            </div>
          ))}
        </div>

        {/* Platform Health */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>
            <span>🟢</span> Platform Health
          </div>
          {PLATFORM_HEALTH.map((h) => (
            <div key={h.label} style={styles.healthRow}>
              <span style={styles.healthLabel}>{h.label}</span>
              <span style={styles.healthBadge(h.color, h.dot)}>
                <span style={styles.dot(h.dot)} />
                {h.status === 'operational' ? 'Operational' : 'Degraded'}
              </span>
            </div>
          ))}

          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ ...styles.cardTitle, marginBottom: '0.75rem' }}>
              <span>📈</span> Quick Stats
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {[
                { label: 'New Users Today', value: '7' },
                { label: 'Listings Today', value: '3' },
                { label: 'Messages Unread', value: '14' },
                { label: 'Uptime', value: '99.8%' },
              ].map((stat) => (
                <div key={stat.label} style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-sm)', padding: '0.65rem 0.75rem' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1B4332' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--gray-mid)', marginTop: '2px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

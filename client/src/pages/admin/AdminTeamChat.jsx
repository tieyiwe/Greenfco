import { useState, useEffect, useRef } from 'react';
import adminClient from '../../api/adminClient';

const AVATAR_COLORS = ['#2D6A4F', '#52B788', '#1B4332', '#8B5E3C', '#6366f1', '#ec4899'];

function getInitials(name = '') {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';
}

function getAvatarColor(name = '') {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

function formatTime(iso) {
  try { return new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }); }
  catch { return ''; }
}

function formatDateLabel(iso) {
  try {
    const d = new Date(iso);
    const today = new Date();
    if (d.toDateString() === today.toDateString()) return "Aujourd'hui";
    const yest = new Date(today); yest.setDate(today.getDate() - 1);
    if (d.toDateString() === yest.toDateString()) return 'Hier';
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch { return ''; }
}

function getCurrentUser() {
  try {
    const s = JSON.parse(localStorage.getItem('greenfco_admin_session'));
    if (s?.name) return s;
  } catch {}
  return { name: 'Admin', email: 'admin@greenfco.com', role: 'super_admin' };
}

const styles = {
  wrap: { display: 'flex', height: 'calc(100vh - 130px)', minHeight: 500, background: 'white', border: '1px solid var(--gray-light)', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' },
  sidebar: { width: 240, borderRight: '1px solid var(--gray-light)', display: 'flex', flexDirection: 'column', background: '#1B4332', color: 'white', flexShrink: 0 },
  sidebarHead: { padding: '1.1rem 1rem 0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)' },
  sidebarTitle: { fontSize: '1rem', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' },
  sidebarSub: { fontSize: '0.72rem', opacity: 0.6, marginTop: '0.15rem' },
  channelList: { flex: 1, overflowY: 'auto', padding: '0.5rem 0' },
  channelItem: (active) => ({
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.875rem',
    background: active ? 'rgba(255,255,255,0.15)' : 'transparent',
    borderRadius: active ? '6px' : 0,
    margin: active ? '0 0.5rem' : 0,
    transition: 'all 0.12s',
  }),
  channelHash: { opacity: 0.5, fontSize: '1rem', lineHeight: 1 },
  addChannelBtn: {
    margin: '0.5rem', padding: '0.45rem 0.75rem', background: 'rgba(255,255,255,0.1)',
    border: '1px dashed rgba(255,255,255,0.3)', borderRadius: '6px', color: 'white',
    fontSize: '0.78rem', cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s',
  },
  main: { flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 },
  chatHead: { padding: '0.9rem 1.25rem', borderBottom: '1px solid var(--gray-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' },
  chatHeadName: { fontWeight: 700, fontSize: '0.95rem', color: '#1A1A14' },
  chatHeadDesc: { fontSize: '0.78rem', color: 'var(--gray-mid)' },
  messages: { flex: 1, overflowY: 'auto', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.1rem' },
  dateLabel: { textAlign: 'center', fontSize: '0.72rem', color: '#9CA3AF', padding: '0.5rem 0', fontWeight: 600, letterSpacing: '0.04em' },
  msgRow: (isMine) => ({
    display: 'flex', gap: '0.6rem', alignItems: 'flex-start',
    flexDirection: isMine ? 'row-reverse' : 'row',
    marginBottom: '0.5rem',
  }),
  avatar: (name) => ({
    width: 30, height: 30, borderRadius: '50%', background: getAvatarColor(name),
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '0.68rem', fontWeight: 700, color: 'white', flexShrink: 0, marginTop: 2,
  }),
  bubble: (isMine) => ({
    maxWidth: '70%', padding: '0.55rem 0.85rem', borderRadius: isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
    background: isMine ? '#1B4332' : '#f3f4f6', color: isMine ? 'white' : '#1A1A14',
    fontSize: '0.875rem', lineHeight: 1.5, wordBreak: 'break-word',
  }),
  sender: { fontSize: '0.7rem', fontWeight: 700, color: 'var(--gray-mid)', marginBottom: '0.2rem' },
  time: (isMine) => ({ fontSize: '0.65rem', color: isMine ? 'rgba(255,255,255,0.55)' : '#9CA3AF', marginTop: '0.2rem', textAlign: isMine ? 'right' : 'left' }),
  inputBar: { borderTop: '1px solid var(--gray-light)', padding: '0.75rem 1.25rem', display: 'flex', gap: '0.5rem', background: 'white' },
  input: { flex: 1, padding: '0.6rem 1rem', border: '1px solid var(--gray-light)', borderRadius: '999px', fontSize: '0.875rem', outline: 'none', fontFamily: 'var(--font-body)', background: '#fafafa' },
  sendBtn: { background: '#1B4332', color: 'white', border: 'none', borderRadius: '999px', padding: '0.6rem 1.2rem', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' },
  noChannel: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-mid)', flexDirection: 'column', gap: '0.5rem' },
};

export default function AdminTeamChat() {
  const currentUser = getCurrentUser();
  const adminRole = currentUser.role;

  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newChanName, setNewChanName] = useState('');
  const [newChanDesc, setNewChanDesc] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const pollRef = useRef(null);

  // Load channels on mount
  useEffect(() => {
    adminClient.get('/channels')
      .then(r => {
        const chans = Array.isArray(r.data) ? r.data : [];
        setChannels(chans);
        if (chans.length > 0) setActiveChannel(chans[0]);
      })
      .catch(() => {});
  }, []);

  // Load messages when channel changes
  useEffect(() => {
    if (!activeChannel) return;
    loadMessages(activeChannel.id);
    // Poll every 5 seconds
    clearInterval(pollRef.current);
    pollRef.current = setInterval(() => loadMessages(activeChannel.id), 5000);
    return () => clearInterval(pollRef.current);
  }, [activeChannel?.id]);

  function loadMessages(channelId) {
    adminClient.get(`/channels/${channelId}/messages`)
      .then(r => {
        setMessages(Array.isArray(r.data) ? r.data : []);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
      })
      .catch(() => {});
  }

  async function handleSend(e) {
    e.preventDefault();
    if (!newMsg.trim() || !activeChannel || sending) return;
    setSending(true);
    try {
      const res = await adminClient.post(`/channels/${activeChannel.id}/messages`, { text: newMsg.trim() });
      setMessages(prev => [...prev, res.data]);
      setNewMsg('');
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    } catch {}
    finally { setSending(false); }
  }

  async function handleCreateChannel(e) {
    e.preventDefault();
    if (!newChanName.trim()) return;
    try {
      const res = await adminClient.post('/channels', { name: newChanName.trim(), description: newChanDesc.trim() });
      setChannels(prev => [...prev, res.data]);
      setActiveChannel(res.data);
      setNewChanName('');
      setNewChanDesc('');
      setShowCreate(false);
    } catch (err) {
      alert(err.response?.data?.error || 'Erreur lors de la création du canal.');
    }
  }

  async function handleDeleteChannel(ch) {
    if (!window.confirm(`Supprimer le canal #${ch.name} et tous ses messages ?`)) return;
    try {
      await adminClient.delete(`/channels/${ch.id}`);
      const remaining = channels.filter(c => c.id !== ch.id);
      setChannels(remaining);
      if (activeChannel?.id === ch.id) {
        setActiveChannel(remaining[0] || null);
        setMessages([]);
      }
    } catch {}
  }

  // Group messages by date
  const grouped = [];
  let lastDate = null;
  for (const msg of messages) {
    const dateLabel = formatDateLabel(msg.created_at);
    if (dateLabel !== lastDate) {
      grouped.push({ type: 'date', label: dateLabel });
      lastDate = dateLabel;
    }
    grouped.push({ type: 'msg', msg });
  }

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, color: '#1B4332', fontFamily: 'var(--font-display)' }}>
          Chat d'équipe
        </h2>
        <p style={{ margin: '0.15rem 0 0', fontSize: '0.85rem', color: 'var(--gray-mid)' }}>
          Communication interne — canaux par projet ou sujet
        </p>
      </div>

      <div style={styles.wrap}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarHead}>
            <p style={styles.sidebarTitle}>🌿 GreenFCO</p>
            <p style={styles.sidebarSub}>{channels.length} canal{channels.length !== 1 ? 'x' : ''}</p>
          </div>

          <div style={styles.channelList}>
            <p style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0.75rem 1rem 0.25rem' }}>
              Canaux
            </p>
            {channels.map(ch => (
              <div key={ch.id} style={styles.channelItem(activeChannel?.id === ch.id)} onClick={() => setActiveChannel(ch)}>
                <span style={styles.channelHash}>#</span>
                <span style={{ flex: 1 }}>{ch.name}</span>
                {adminRole === 'super_admin' && ch.name !== 'Général' && (
                  <button
                    onClick={e => { e.stopPropagation(); handleDeleteChannel(ch); }}
                    style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.75rem', padding: 0 }}
                    title="Supprimer le canal"
                  >✕</button>
                )}
              </div>
            ))}
          </div>

          {(adminRole === 'super_admin' || adminRole === 'manager') && (
            showCreate ? (
              <form onSubmit={handleCreateChannel} style={{ padding: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <input
                  autoFocus
                  placeholder="Nom du canal"
                  value={newChanName}
                  onChange={e => setNewChanName(e.target.value)}
                  style={{ width: '100%', marginBottom: '0.4rem', padding: '0.4rem 0.6rem', borderRadius: '6px', border: 'none', fontSize: '0.8rem', boxSizing: 'border-box' }}
                />
                <input
                  placeholder="Description (optionnel)"
                  value={newChanDesc}
                  onChange={e => setNewChanDesc(e.target.value)}
                  style={{ width: '100%', marginBottom: '0.4rem', padding: '0.4rem 0.6rem', borderRadius: '6px', border: 'none', fontSize: '0.8rem', boxSizing: 'border-box' }}
                />
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button type="submit" style={{ flex: 1, background: '#52B788', color: 'white', border: 'none', borderRadius: '6px', padding: '0.4rem', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>Créer</button>
                  <button type="button" onClick={() => setShowCreate(false)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '6px', padding: '0.4rem 0.6rem', fontSize: '0.78rem', cursor: 'pointer' }}>✕</button>
                </div>
              </form>
            ) : (
              <button style={styles.addChannelBtn} onClick={() => setShowCreate(true)}>
                + Nouveau canal
              </button>
            )
          )}

          <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ ...styles.avatar(currentUser.name), width: 24, height: 24, fontSize: '0.6rem' }}>
              {getInitials(currentUser.name)}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontWeight: 600, fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.name}</div>
              <div style={{ opacity: 0.5, fontSize: '0.65rem' }}>{currentUser.role?.replace('_', ' ')}</div>
            </div>
          </div>
        </aside>

        {/* Main Chat */}
        <div style={styles.main}>
          {activeChannel ? (
            <>
              <div style={styles.chatHead}>
                <span style={{ fontSize: '1.1rem', color: '#1B4332', fontWeight: 700 }}>#</span>
                <div>
                  <div style={styles.chatHeadName}>{activeChannel.name}</div>
                  {activeChannel.description && <div style={styles.chatHeadDesc}>{activeChannel.description}</div>}
                </div>
              </div>

              <div style={styles.messages}>
                {messages.length === 0 && (
                  <div style={{ textAlign: 'center', color: 'var(--gray-mid)', marginTop: 'auto', paddingTop: '3rem' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</div>
                    <p>Aucun message. Soyez le premier à écrire !</p>
                  </div>
                )}
                {grouped.map((item, i) => {
                  if (item.type === 'date') {
                    return <div key={`date-${i}`} style={styles.dateLabel}>{item.label}</div>;
                  }
                  const { msg } = item;
                  const isMine = msg.sender_email === currentUser.email;
                  return (
                    <div key={msg.id} style={styles.msgRow(isMine)}>
                      <div style={styles.avatar(msg.sender_name)}>
                        {getInitials(msg.sender_name)}
                      </div>
                      <div style={{ maxWidth: '70%' }}>
                        {!isMine && <div style={styles.sender}>{msg.sender_name}</div>}
                        <div style={styles.bubble(isMine)}>{msg.text}</div>
                        <div style={styles.time(isMine)}>{formatTime(msg.created_at)}</div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSend} style={styles.inputBar}>
                <input
                  style={styles.input}
                  placeholder={`Message #${activeChannel.name}…`}
                  value={newMsg}
                  onChange={e => setNewMsg(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e); } }}
                />
                <button type="submit" style={styles.sendBtn} disabled={sending || !newMsg.trim()}>
                  Envoyer
                </button>
              </form>
            </>
          ) : (
            <div style={styles.noChannel}>
              <span style={{ fontSize: '2.5rem' }}>💬</span>
              <p>Sélectionnez ou créez un canal pour commencer.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';

const DEFAULT_TEAM = [
  { id: '1', name: 'Aïssata Kaboré', email: 'akabore@greenfco.com', role: 'manager' },
  { id: '2', name: 'Moussa Traoré', email: 'mtraore@greenfco.com', role: 'analyst' },
  { id: '3', name: 'Admin GreenFCO', email: 'admin@greenfco.com', role: 'super_admin' },
];

const DEFAULT_MESSAGES = [
  { id: 'm1', from: { id: '3', name: 'Admin GreenFCO', role: 'super_admin' }, to: 'all', text: "Bonjour l'équipe ! La v2 de la plateforme est presque prête. Bravo à tous 🎉", createdAt: '2026-05-28T09:00:00Z', read: true },
  { id: 'm2', from: { id: '1', name: 'Aïssata Kaboré', role: 'manager' }, to: 'all', text: 'Super ! Les tests ont bien avancé hier. Quelques bugs mineurs à corriger côté mobile.', createdAt: '2026-05-28T09:15:00Z', read: true },
  { id: 'm3', from: { id: '2', name: 'Moussa Traoré', role: 'analyst' }, to: 'all', text: "J'ai contacté 12 nouvelles coopératives cette semaine. 8 sont intéressées par la marketplace.", createdAt: '2026-05-28T10:30:00Z', read: true },
  { id: 'm4', from: { id: '3', name: 'Admin GreenFCO', role: 'super_admin' }, to: 'all', text: 'Excellent travail Moussa ! On planifie une démo pour eux la semaine prochaine ?', createdAt: '2026-05-28T10:45:00Z', read: true },
  { id: 'm5', from: { id: '1', name: 'Aïssata Kaboré', role: 'manager' }, to: 'all', text: 'Je peux préparer la présentation. Je vous envoie un draft ce soir.', createdAt: '2026-05-28T11:00:00Z', read: false },
  // Direct conversation between Admin (id:3) and Aïssata (id:1)
  { id: 'm6', from: { id: '3', name: 'Admin GreenFCO', role: 'super_admin' }, to: { id: '1', name: 'Aïssata Kaboré' }, text: "Aïssata, tu peux me faire un point rapide sur les tests de régression ?", createdAt: '2026-05-28T14:00:00Z', read: true },
  { id: 'm7', from: { id: '1', name: 'Aïssata Kaboré', role: 'manager' }, to: { id: '3', name: 'Admin GreenFCO' }, text: "Bien sûr ! On est à 85% — reste 3 cas de test côté mobile. Je finis ça demain matin.", createdAt: '2026-05-28T14:12:00Z', read: false },
];

const AVATAR_COLORS = ['#2D6A4F', '#52B788', '#1B4332', '#8B5E3C', '#6366f1', '#ec4899'];

function getInitials(name) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function formatTime(iso) {
  try {
    return new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  } catch { return ''; }
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    const today = new Date();
    if (d.toDateString() === today.toDateString()) return "Aujourd'hui";
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (d.toDateString() === yesterday.toDateString()) return 'Hier';
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
  } catch { return ''; }
}

function loadMessages() {
  try {
    const stored = JSON.parse(localStorage.getItem('greenfco_team_messages'));
    if (Array.isArray(stored) && stored.length > 0) return stored;
  } catch {}
  return DEFAULT_MESSAGES;
}

function saveMessages(messages) {
  localStorage.setItem('greenfco_team_messages', JSON.stringify(messages));
}

function loadTeam() {
  try {
    const stored = JSON.parse(localStorage.getItem('greenfco_admin_collaborators'));
    if (Array.isArray(stored) && stored.length > 0) return stored;
  } catch {}
  return DEFAULT_TEAM;
}

function loadCurrentUser() {
  try {
    const stored = JSON.parse(localStorage.getItem('greenfco_admin_session'));
    if (stored && stored.name) return stored;
  } catch {}
  return { name: 'Admin GreenFCO', email: 'admin@greenfco.com', role: 'super_admin', id: '3' };
}

// Get conversation key for a conversation (null = general, member.id = direct)
function getConvKey(conv) {
  return conv === 'general' ? 'general' : conv.id;
}

// Filter messages for the current conversation
function filterMessages(messages, conv, currentUserId) {
  if (conv === 'general') {
    return messages.filter((m) => m.to === 'all');
  }
  // Direct message: between currentUser and conv.id
  return messages.filter((m) => {
    if (m.to === 'all') return false;
    const fromMe = m.from.id === currentUserId;
    const toThem = typeof m.to === 'object' && m.to.id === conv.id;
    const fromThem = m.from.id === conv.id;
    const toMe = typeof m.to === 'object' && m.to.id === currentUserId;
    return (fromMe && toThem) || (fromThem && toMe);
  });
}

function countUnread(messages, conv, currentUserId) {
  return filterMessages(messages, conv, currentUserId).filter((m) => !m.read && m.from.id !== currentUserId).length;
}

export default function AdminTeamChat() {
  const [messages, setMessages] = useState(loadMessages);
  const [team] = useState(loadTeam);
  const [currentUser] = useState(() => {
    const u = loadCurrentUser();
    // Make sure we have an id on currentUser
    if (!u.id) {
      const found = DEFAULT_TEAM.find((m) => m.email === u.email);
      return found ? { ...u, id: found.id } : { ...u, id: '3' };
    }
    return u;
  });
  const [activeConv, setActiveConv] = useState('general');
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeConv]);

  // Mark messages as read when switching conversation
  useEffect(() => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.read) return m;
        if (activeConv === 'general' && m.to === 'all' && m.from.id !== currentUser.id) return { ...m, read: true };
        if (activeConv !== 'general' && typeof activeConv === 'object') {
          if (m.from.id === activeConv.id && typeof m.to === 'object' && m.to.id === currentUser.id) return { ...m, read: true };
        }
        return m;
      })
    );
  }, [activeConv, currentUser.id]);

  function sendMessage(e) {
    e.preventDefault();
    if (!inputText.trim()) return;
    const msg = {
      id: crypto.randomUUID(),
      from: { id: currentUser.id, name: currentUser.name, role: currentUser.role || 'super_admin' },
      to: activeConv === 'general' ? 'all' : { id: activeConv.id, name: activeConv.name },
      text: inputText.trim(),
      createdAt: new Date().toISOString(),
      read: false,
    };
    setMessages((prev) => [...prev, msg]);
    setInputText('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  }

  const convMessages = filterMessages(messages, activeConv, currentUser.id);

  // Group messages by date
  function groupByDate(msgs) {
    const groups = [];
    let lastDate = null;
    msgs.forEach((m) => {
      const d = formatDate(m.createdAt);
      if (d !== lastDate) { groups.push({ type: 'date', label: d }); lastDate = d; }
      groups.push({ type: 'msg', msg: m });
    });
    return groups;
  }

  const grouped = groupByDate(convMessages);

  const convHeader = activeConv === 'general' ? '📢 Général' : activeConv.name;

  // Other team members (exclude current user for DM list)
  const otherMembers = team.filter((m) => m.id !== currentUser.id);

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 130px)', minHeight: '500px', background: 'white', border: '1px solid var(--gray-light)', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
      {/* Sidebar */}
      <aside style={{ width: 220, minWidth: 220, background: '#f9fafb', borderRight: '1px solid var(--gray-light)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ padding: '1rem 0.75rem 0.5rem', borderBottom: '1px solid var(--gray-light)' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: '#1B4332', fontFamily: 'var(--font-display)' }}>Messages</h3>
        </div>

        {/* General channel */}
        <div style={{ padding: '0.5rem 0.5rem 0.25rem' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 0.25rem' }}>Canaux</span>
        </div>
        <button
          onClick={() => setActiveConv('general')}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.55rem 0.75rem', margin: '0 0.5rem 0.25rem',
            borderRadius: '8px', border: 'none', cursor: 'pointer',
            background: activeConv === 'general' ? 'var(--green-light)' : 'transparent',
            color: activeConv === 'general' ? 'white' : '#374151',
            fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: activeConv === 'general' ? 700 : 500,
            textAlign: 'left', width: 'calc(100% - 1rem)',
          }}
        >
          <span>📢</span>
          <span style={{ flex: 1 }}>Général</span>
          {countUnread(messages, 'general', currentUser.id) > 0 && (
            <span style={{ background: '#EF4444', color: 'white', borderRadius: '99px', fontSize: '0.65rem', fontWeight: 700, padding: '0.1rem 0.4rem', minWidth: 16, textAlign: 'center' }}>
              {countUnread(messages, 'general', currentUser.id)}
            </span>
          )}
        </button>

        {/* Team DMs */}
        {otherMembers.length > 0 && (
          <>
            <div style={{ padding: '0.5rem 0.5rem 0.25rem', marginTop: '0.25rem' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 0.25rem' }}>👥 Équipe</span>
            </div>
            {otherMembers.map((member) => {
              const isActive = typeof activeConv === 'object' && activeConv.id === member.id;
              const unread = countUnread(messages, member, currentUser.id);
              return (
                <button
                  key={member.id}
                  onClick={() => setActiveConv(member)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.5rem 0.75rem', margin: '0 0.5rem 0.2rem',
                    borderRadius: '8px', border: 'none', cursor: 'pointer',
                    background: isActive ? 'var(--green-light)' : 'transparent',
                    color: isActive ? 'white' : '#374151',
                    fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: isActive ? 700 : 400,
                    textAlign: 'left', width: 'calc(100% - 1rem)',
                  }}
                >
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: isActive ? 'rgba(255,255,255,0.3)' : getAvatarColor(member.name), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.65rem', fontWeight: 700, flexShrink: 0 }}>
                    {getInitials(member.name)}
                  </div>
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{member.name}</span>
                  {unread > 0 && (
                    <span style={{ background: '#EF4444', color: 'white', borderRadius: '99px', fontSize: '0.65rem', fontWeight: 700, padding: '0.1rem 0.4rem', minWidth: 16, textAlign: 'center' }}>
                      {unread}
                    </span>
                  )}
                </button>
              );
            })}
          </>
        )}
      </aside>

      {/* Chat Panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Chat Header */}
        <div style={{ padding: '0.85rem 1.25rem', borderBottom: '1px solid var(--gray-light)', background: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1rem' }}>{activeConv === 'general' ? '📢' : '💬'}</span>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#1B4332', fontFamily: 'var(--font-display)' }}>
            {convHeader}
          </h3>
          <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#9CA3AF' }}>
            {convMessages.length} message{convMessages.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
          {convMessages.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#9CA3AF' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💬</div>
              <p style={{ fontSize: '0.875rem' }}>Aucun message pour l'instant. Commencez la conversation !</p>
            </div>
          ) : (
            grouped.map((item, idx) => {
              if (item.type === 'date') {
                return (
                  <div key={`date-${idx}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.75rem 0' }}>
                    <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
                    <span style={{ fontSize: '0.72rem', color: '#9CA3AF', fontWeight: 600, whiteSpace: 'nowrap' }}>{item.label}</span>
                    <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
                  </div>
                );
              }

              const { msg } = item;
              const isSelf = msg.from.id === currentUser.id;

              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex', flexDirection: isSelf ? 'row-reverse' : 'row',
                    alignItems: 'flex-end', gap: '0.5rem', marginBottom: '0.5rem',
                  }}
                >
                  {!isSelf && (
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: getAvatarColor(msg.from.name), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.65rem', fontWeight: 700, flexShrink: 0 }}>
                      {getInitials(msg.from.name)}
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: isSelf ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                    {!isSelf && (
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#6B7280', marginBottom: '0.2rem', paddingLeft: '0.2rem' }}>
                        {msg.from.name}
                      </span>
                    )}
                    <div style={{
                      background: isSelf ? 'var(--green-light)' : '#f3f4f6',
                      color: isSelf ? 'white' : '#1A1A14',
                      borderRadius: '12px',
                      borderBottomRightRadius: isSelf ? '4px' : '12px',
                      borderBottomLeftRadius: isSelf ? '12px' : '4px',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.875rem',
                      lineHeight: 1.45,
                      wordBreak: 'break-word',
                    }}>
                      {msg.text}
                    </div>
                    <span style={{ fontSize: '0.68rem', color: '#9CA3AF', marginTop: '0.15rem', paddingLeft: '0.2rem', paddingRight: '0.2rem' }}>
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} style={{ display: 'flex', gap: '0.5rem', padding: '0.85rem 1.25rem', borderTop: '1px solid var(--gray-light)', background: 'white', alignItems: 'flex-end' }}>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${activeConv === 'general' ? 'à l\'équipe' : `à ${activeConv.name}`}...`}
            rows={1}
            style={{
              flex: 1, padding: '0.6rem 0.9rem', border: '1px solid var(--gray-light)',
              borderRadius: '8px', fontSize: '0.875rem', fontFamily: 'var(--font-body)',
              outline: 'none', resize: 'none', color: '#3D3D35', lineHeight: 1.4,
            }}
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            style={{
              background: inputText.trim() ? 'var(--green-mid)' : '#e5e7eb',
              color: inputText.trim() ? 'white' : '#9CA3AF',
              border: 'none', borderRadius: '8px', padding: '0.6rem 1rem',
              fontSize: '0.875rem', fontWeight: 600, cursor: inputText.trim() ? 'pointer' : 'default',
              fontFamily: 'var(--font-body)', transition: 'all 0.15s', flexShrink: 0,
            }}
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}

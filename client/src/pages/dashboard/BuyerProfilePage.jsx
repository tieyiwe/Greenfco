import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../store/authStore';
import './BuyerProfilePage.css';

/* ─── Minimal demo data mirrored from MarketPage ──────────── */
const DEMO_LISTINGS = [
  { id: 1, crop_name: 'Oignons', category: 'legumes', quantity_kg: 500, price: 250, currency: 'FCFA', location: 'Ouagadougou', user_name: 'Moussa Kaboré', created_at: '2026-05-01' },
  { id: 2, crop_name: 'Pommes de terre', category: 'legumes', quantity_kg: 1000, price: 150, currency: 'FCFA', location: 'Bobo-Dioulasso', user_name: 'Aminata Diallo', created_at: '2026-05-05' },
  { id: 3, crop_name: 'Tomates', category: 'legumes', quantity_kg: 200, price: 300, currency: 'FCFA', location: 'Koudougou', user_name: 'Ibrahim Sawadogo', created_at: '2026-05-08' },
  { id: 4, crop_name: 'Maïs', category: 'cereales', quantity_kg: 2000, price: 120, currency: 'FCFA', location: "Fada N'Gourma", user_name: 'Fatimata Ouédraogo', created_at: '2026-05-10' },
  { id: 5, crop_name: 'Mil', category: 'cereales', quantity_kg: 800, price: 140, currency: 'FCFA', location: 'Dori', user_name: 'Hamidou Compaoré', created_at: '2026-05-12' },
  { id: 6, crop_name: 'Sésame', category: 'autres', quantity_kg: 300, price: 600, currency: 'FCFA', location: 'Dédougou', user_name: 'Mariam Traoré', created_at: '2026-05-14' },
  { id: 7, crop_name: 'Poulet (vif)', category: 'elevage', quantity_kg: 50, price: 1800, currency: 'FCFA', location: 'Ouahigouya', user_name: 'Salif Barro', created_at: '2026-05-15' },
  { id: 8, crop_name: 'Poisson fumé', category: 'poisson', quantity_kg: 80, price: 3000, currency: 'FCFA', location: 'Ouagadougou', user_name: 'Kadi Sawadogo', created_at: '2026-05-16' },
  { id: 9, crop_name: 'BioGrowth', category: 'intrants', quantity_kg: 100, price: 2500, currency: 'FCFA', location: 'Ouagadougou', user_name: 'GreenFCO', created_at: '2026-05-17' },
];

const CATEGORIES_MAP = {
  legumes: { fr: 'Légumes', en: 'Vegetables', icon: '🥬' },
  cereales: { fr: 'Céréales', en: 'Cereals', icon: '🌾' },
  fruits: { fr: 'Fruits', en: 'Fruits', icon: '🍊' },
  elevage: { fr: 'Élevage', en: 'Livestock', icon: '🐄' },
  poisson: { fr: 'Poisson', en: 'Fish', icon: '🐟' },
  intrants: { fr: 'Intrants', en: 'Inputs', icon: '🌱' },
  autres: { fr: 'Autres', en: 'Other', icon: '📦' },
};

const ALL_CATEGORIES = [
  { value: 'legumes', fr: 'Légumes', en: 'Vegetables', icon: '🥬' },
  { value: 'cereales', fr: 'Céréales', en: 'Cereals', icon: '🌾' },
  { value: 'fruits', fr: 'Fruits', en: 'Fruits', icon: '🍊' },
  { value: 'elevage', fr: 'Élevage', en: 'Livestock', icon: '🐄' },
  { value: 'poisson', fr: 'Poisson', en: 'Fish', icon: '🐟' },
  { value: 'intrants', fr: 'Intrants', en: 'Inputs', icon: '🌱' },
  { value: 'autres', fr: 'Autres', en: 'Other', icon: '📦' },
];

const DEMO_ORDERS = [
  { id: 'ord1', product: 'Oignons', seller: 'Moussa Kaboré', qty: 50, amount: 12500, date: '2026-05-12', currency: 'FCFA', status: 'completed' },
  { id: 'ord2', product: 'Sésame', seller: 'Mariam Traoré', qty: 25, amount: 15000, date: '2026-05-08', currency: 'FCFA', status: 'completed' },
  { id: 'ord3', product: 'Maïs', seller: 'Fatimata Ouédraogo', qty: 200, amount: 24000, date: '2026-04-25', currency: 'FCFA', status: 'completed' },
  { id: 'ord4', product: 'BioGrowth', seller: 'GreenFCO', qty: 5, amount: 12500, date: '2026-04-15', currency: 'FCFA', status: 'completed' },
];

export default function BuyerProfilePage() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [activeTab, setActiveTab] = useState('saved');

  // Buyer profile
  const [buyerProfile, setBuyerProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem('greenfco_buyer_profile')) || {}; } catch { return {}; }
  });

  // Saved listings
  const [savedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('greenfco_saved_listings')) || []; } catch { return []; }
  });

  // Conversations
  const [conversations, setConversations] = useState(() => {
    try { return JSON.parse(localStorage.getItem('greenfco_conversations')) || {}; } catch { return {}; }
  });

  const [activeChatId, setActiveChatId] = useState(null);
  const [msgText, setMsgText] = useState('');

  // Settings form
  const [settingsForm, setSettingsForm] = useState({
    name: buyerProfile.name || user?.name || '',
    location: buyerProfile.location || '',
    preferredCategories: buyerProfile.preferredCategories || [],
  });
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [pwMsg, setPwMsg] = useState('');
  const [pwError, setPwError] = useState('');
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [toast, setToast] = useState('');

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function saveSettings(e) {
    e.preventDefault();
    const updated = { ...buyerProfile, ...settingsForm };
    localStorage.setItem('greenfco_buyer_profile', JSON.stringify(updated));
    setBuyerProfile(updated);
    setSettingsSaved(true);
    showToast(lang === 'fr' ? 'Profil mis à jour avec succès.' : 'Profile updated successfully.');
    setTimeout(() => setSettingsSaved(false), 2000);
  }

  function handlePasswordReset(e) {
    e.preventDefault();
    setPwMsg('');
    setPwError('');
    if (!pwForm.current) {
      setPwError(lang === 'fr' ? 'Veuillez entrer votre mot de passe actuel.' : 'Please enter your current password.');
      return;
    }
    if (pwForm.newPw.length < 8) {
      setPwError(lang === 'fr' ? 'Le nouveau mot de passe doit comporter au moins 8 caractères.' : 'New password must be at least 8 characters.');
      return;
    }
    if (pwForm.newPw !== pwForm.confirm) {
      setPwError(lang === 'fr' ? 'Les mots de passe ne correspondent pas.' : 'Passwords do not match.');
      return;
    }
    setPwForm({ current: '', newPw: '', confirm: '' });
    setPwMsg(lang === 'fr' ? 'Mot de passe mis à jour avec succès.' : 'Password updated successfully.');
    showToast(lang === 'fr' ? 'Mot de passe mis à jour.' : 'Password updated.');
  }

  function sendMessage() {
    if (!msgText.trim() || !activeChatId) return;
    const now = new Date().toISOString();
    const myName = buyerProfile.name || user?.name || (lang === 'fr' ? 'Moi' : 'Me');
    const newMsg = { from: 'buyer', name: myName, text: msgText.trim(), ts: now };
    setConversations(prev => {
      const conv = prev[activeChatId];
      const updated = { ...prev, [activeChatId]: { ...conv, messages: [...conv.messages, newMsg] } };
      localStorage.setItem('greenfco_conversations', JSON.stringify(updated));
      return updated;
    });
    setMsgText('');
  }

  const savedListings = DEMO_LISTINGS.filter(l => savedIds.includes(l.id));
  const convEntries = Object.entries(conversations);
  const totalSpent = DEMO_ORDERS.reduce((s, o) => s + o.amount, 0);

  const TABS = [
    { key: 'saved', fr: '❤️ Sauvegardés', en: '❤️ Saved' },
    { key: 'messages', fr: '💬 Messages', en: '💬 Messages' },
    { key: 'history', fr: '📦 Historique', en: '📦 History' },
    { key: 'settings', fr: '⚙️ Paramètres', en: '⚙️ Settings' },
  ];

  return (
    <div className="buyer-profile-page">
      {/* Toast */}
      {toast && <div className="bp-toast">{toast}</div>}

      {/* Header */}
      <div className="bp-page-header">
        <button className="back-btn" onClick={() => navigate('/marketplace')}>
          ← {lang === 'fr' ? 'Retour Marketplace' : 'Back to Marketplace'}
        </button>
        <div className="bp-header-info">
          <div className="bp-avatar-lg">
            {(buyerProfile.name || user?.name || 'A').charAt(0).toUpperCase()}
          </div>
          <div>
            <h1>{buyerProfile.name || user?.name || (lang === 'fr' ? 'Mon Profil Acheteur' : 'My Buyer Profile')}</h1>
            {buyerProfile.location && <p className="bp-header-loc">📍 {buyerProfile.location}</p>}
            {(buyerProfile.preferredCategories?.length > 0) && (
              <p className="bp-header-cats">
                🛒 {buyerProfile.preferredCategories.map(c => {
                  const cat = ALL_CATEGORIES.find(x => x.value === c);
                  return cat ? (lang === 'fr' ? cat.fr : cat.en) : c;
                }).join(', ')}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="market-tabs">
        {TABS.map(t => (
          <button key={t.key} className={`market-tab ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>
            {lang === 'fr' ? t.fr : t.en}
          </button>
        ))}
      </div>

      {/* ══ TAB: SAVED ════════════════════════════════════════ */}
      {activeTab === 'saved' && (
        <div className="bp-tab-content">
          <div className="bp-tab-header">
            <h2>{lang === 'fr' ? `Annonces Sauvegardées (${savedListings.length})` : `Saved Listings (${savedListings.length})`}</h2>
            <Link to="/marketplace" className="btn btn-primary btn-sm">
              {lang === 'fr' ? 'Parcourir' : 'Browse'}
            </Link>
          </div>
          {savedListings.length === 0 ? (
            <div className="bp-empty card">
              <span className="bp-empty-icon">❤️</span>
              <p>{lang === 'fr' ? "Vous n'avez pas encore sauvegardé d'annonces. Cliquez sur ❤️ sur une annonce pour la sauvegarder." : "You haven't saved any listings yet. Click ❤️ on any listing to save it."}</p>
              <Link to="/marketplace" className="btn btn-primary">
                {lang === 'fr' ? 'Voir les annonces' : 'Browse listings'}
              </Link>
            </div>
          ) : (
            <div className="bp-saved-grid">
              {savedListings.map(l => {
                const cat = CATEGORIES_MAP[l.category] || CATEGORIES_MAP.autres;
                return (
                  <div key={l.id} className="bp-saved-card card">
                    <div className="bp-saved-topbar">
                      <span>{cat.icon} {lang === 'fr' ? cat.fr : cat.en}</span>
                    </div>
                    <div className="bp-saved-body">
                      <h3 className="bp-saved-name">{l.crop_name}</h3>
                      <p className="bp-saved-price">{Number(l.price).toLocaleString()} {l.currency}/kg</p>
                      <p className="bp-saved-meta">📍 {l.location} &middot; {Number(l.quantity_kg).toLocaleString()} kg</p>
                      <p className="bp-saved-seller">{l.user_name}</p>
                    </div>
                    <Link to="/marketplace" className="btn btn-secondary btn-sm bp-saved-btn">
                      {lang === 'fr' ? 'Voir l\'annonce' : 'View listing'}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ══ TAB: MESSAGES ═════════════════════════════════════ */}
      {activeTab === 'messages' && (
        <div className="bp-tab-content bp-messages-layout">
          <div className="bp-conv-list">
            <h2>{lang === 'fr' ? 'Conversations' : 'Conversations'}</h2>
            {convEntries.length === 0 ? (
              <div className="bp-empty card">
                <span className="bp-empty-icon">💬</span>
                <p>{lang === 'fr' ? 'Aucun message pour linstant.' : 'No messages yet.'}</p>
              </div>
            ) : (
              convEntries.map(([cid, conv]) => {
                const last = conv.messages[conv.messages.length - 1];
                const isActive = activeChatId === cid;
                return (
                  <button
                    key={cid}
                    className={`bp-conv-row ${isActive ? 'bp-conv-active' : ''}`}
                    onClick={() => setActiveChatId(cid)}
                  >
                    <div className="bp-conv-avatar">{conv.seller_name?.charAt(0) || '?'}</div>
                    <div className="bp-conv-info">
                      <div className="bp-conv-name">{conv.seller_name} <span className="bp-conv-product">&middot; {conv.listing?.crop_name}</span></div>
                      <div className="bp-conv-preview">{last ? last.text : (lang === 'fr' ? 'Pas encore de message' : 'No messages yet')}</div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {activeChatId && conversations[activeChatId] ? (
            <div className="bp-chat-panel card">
              <div className="bp-chat-header">
                <div className="bp-conv-avatar">{conversations[activeChatId].seller_name?.charAt(0) || '?'}</div>
                <div>
                  <strong>{conversations[activeChatId].seller_name}</strong>
                  <span className="bp-conv-product"> &middot; {conversations[activeChatId].listing?.crop_name}</span>
                </div>
                <button className="bp-chat-close" onClick={() => setActiveChatId(null)}>✕</button>
              </div>
              <div className="bp-chat-messages">
                {conversations[activeChatId].messages.length === 0 ? (
                  <p className="bp-chat-empty">{lang === 'fr' ? 'Aucun message.' : 'No messages.'}</p>
                ) : (
                  conversations[activeChatId].messages.map((m, i) => (
                    <div key={i} className={`chat-bubble ${m.from === 'buyer' ? 'chat-me' : 'chat-them'}`}>
                      <span className="chat-bubble-text">{m.text}</span>
                      <span className="chat-bubble-time">{new Date(m.ts).toLocaleTimeString(lang === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  ))
                )}
              </div>
              <div className="chat-input-row">
                <textarea
                  className="form-input chat-input"
                  rows="2"
                  placeholder={lang === 'fr' ? 'Écrivez votre message…' : 'Write your message…'}
                  value={msgText}
                  onChange={e => setMsgText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                />
                <button className="btn btn-primary chat-send-btn" onClick={sendMessage} disabled={!msgText.trim()}>
                  {lang === 'fr' ? 'Envoyer' : 'Send'}
                </button>
              </div>
            </div>
          ) : (
            <div className="bp-chat-placeholder card">
              <span>💬</span>
              <p>{lang === 'fr' ? 'Sélectionnez une conversation' : 'Select a conversation'}</p>
            </div>
          )}
        </div>
      )}

      {/* ══ TAB: HISTORY ══════════════════════════════════════ */}
      {activeTab === 'history' && (
        <div className="bp-tab-content">
          <h2>{lang === 'fr' ? 'Historique des commandes' : 'Order history'}</h2>
          <div className="bp-history-summary">
            <div className="bp-stat-card card">
              <span className="bp-stat-icon">💰</span>
              <span className="bp-stat-value">{totalSpent.toLocaleString()} FCFA</span>
              <span className="bp-stat-label">{lang === 'fr' ? 'Total dépensé' : 'Total spent'}</span>
            </div>
            <div className="bp-stat-card card">
              <span className="bp-stat-icon">📦</span>
              <span className="bp-stat-value">{DEMO_ORDERS.length}</span>
              <span className="bp-stat-label">{lang === 'fr' ? 'Commandes' : 'Orders'}</span>
            </div>
            <div className="bp-stat-card card">
              <span className="bp-stat-icon">🌾</span>
              <span className="bp-stat-value">{new Set(DEMO_ORDERS.map(o => o.product)).size}</span>
              <span className="bp-stat-label">{lang === 'fr' ? 'Produits achetés' : 'Products bought'}</span>
            </div>
          </div>
          <div className="card" style={{ padding: '1rem', overflowX: 'auto' }}>
            <table className="bp-table">
              <thead>
                <tr>
                  <th>{lang === 'fr' ? 'Produit' : 'Product'}</th>
                  <th>{lang === 'fr' ? 'Vendeur' : 'Seller'}</th>
                  <th>{lang === 'fr' ? 'Quantité' : 'Quantity'}</th>
                  <th>{lang === 'fr' ? 'Montant' : 'Amount'}</th>
                  <th>{lang === 'fr' ? 'Date' : 'Date'}</th>
                  <th>{lang === 'fr' ? 'Statut' : 'Status'}</th>
                </tr>
              </thead>
              <tbody>
                {DEMO_ORDERS.map(order => (
                  <tr key={order.id}>
                    <td><strong>{order.product}</strong></td>
                    <td>{order.seller}</td>
                    <td>{order.qty} kg</td>
                    <td>{order.amount.toLocaleString()} {order.currency}</td>
                    <td>{new Date(order.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short' })}</td>
                    <td><span className="bp-badge-completed">{lang === 'fr' ? 'Complété' : 'Completed'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══ TAB: SETTINGS ═════════════════════════════════════ */}
      {activeTab === 'settings' && (
        <div className="bp-tab-content">
          <h2>{lang === 'fr' ? 'Paramètres du profil' : 'Profile settings'}</h2>

          <div className="card bp-settings-card">
            <h3>{lang === 'fr' ? 'Informations personnelles' : 'Personal information'}</h3>
            <form onSubmit={saveSettings}>
              <div className="bp-settings-grid">
                <div className="form-group">
                  <label className="form-label">{lang === 'fr' ? 'Nom complet' : 'Full name'}</label>
                  <input type="text" className="form-input" value={settingsForm.name}
                    onChange={e => setSettingsForm(p => ({ ...p, name: e.target.value }))}
                    placeholder={lang === 'fr' ? 'Votre nom' : 'Your name'} />
                </div>
                <div className="form-group">
                  <label className="form-label">{lang === 'fr' ? 'Localisation' : 'Location'}</label>
                  <input type="text" className="form-input" value={settingsForm.location}
                    onChange={e => setSettingsForm(p => ({ ...p, location: e.target.value }))}
                    placeholder={lang === 'fr' ? 'Ville, quartier' : 'City, neighborhood'} />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">{lang === 'fr' ? 'Catégories préférées' : 'Preferred categories'}</label>
                  <div className="checkbox-group flex-wrap">
                    {ALL_CATEGORIES.map(c => (
                      <label key={c.value} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={settingsForm.preferredCategories.includes(c.value)}
                          onChange={e => setSettingsForm(p => ({
                            ...p,
                            preferredCategories: e.target.checked
                              ? [...p.preferredCategories, c.value]
                              : p.preferredCategories.filter(x => x !== c.value)
                          }))}
                        />
                        {c.icon} {lang === 'fr' ? c.fr : c.en}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary">
                  {settingsSaved ? (lang === 'fr' ? '✓ Enregistré' : '✓ Saved') : (lang === 'fr' ? 'Enregistrer les modifications' : 'Save changes')}
                </button>
              </div>
            </form>
          </div>

          <div className="card bp-settings-card">
            <h3>{lang === 'fr' ? 'Changer le mot de passe' : 'Change password'}</h3>
            {pwMsg && <div className="bp-pw-success">{pwMsg}</div>}
            {pwError && <div className="bp-pw-error">{pwError}</div>}
            <form onSubmit={handlePasswordReset}>
              <div className="bp-settings-grid">
                <div className="form-group">
                  <label className="form-label">{lang === 'fr' ? 'Mot de passe actuel' : 'Current password'}</label>
                  <input type="password" className="form-input" value={pwForm.current}
                    onChange={e => setPwForm(p => ({ ...p, current: e.target.value }))}
                    placeholder="••••••••" />
                </div>
                <div className="form-group">
                  <label className="form-label">{lang === 'fr' ? 'Nouveau mot de passe' : 'New password'}</label>
                  <input type="password" className="form-input" value={pwForm.newPw}
                    onChange={e => setPwForm(p => ({ ...p, newPw: e.target.value }))}
                    placeholder="••••••••" minLength={8} />
                </div>
                <div className="form-group">
                  <label className="form-label">{lang === 'fr' ? 'Confirmer le nouveau mot de passe' : 'Confirm new password'}</label>
                  <input type="password" className="form-input" value={pwForm.confirm}
                    onChange={e => setPwForm(p => ({ ...p, confirm: e.target.value }))}
                    placeholder="••••••••" />
                </div>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary">
                  {lang === 'fr' ? 'Mettre à jour le mot de passe' : 'Update password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

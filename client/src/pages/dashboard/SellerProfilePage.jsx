import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../store/authStore';
import './SellerProfilePage.css';

/* ─── Minimal demo data mirrored from MarketPage ──────────── */
const DEMO_LISTINGS = [
  { id: 1, crop_name: 'Oignons', category: 'legumes', quantity_kg: 500, price: 250, currency: 'FCFA', location: 'Ouagadougou', user_id: 'u1', user_name: 'Moussa Kaboré', created_at: '2026-05-01' },
  { id: 2, crop_name: 'Pommes de terre', category: 'legumes', quantity_kg: 1000, price: 150, currency: 'FCFA', location: 'Bobo-Dioulasso', user_id: 'u2', user_name: 'Aminata Diallo', created_at: '2026-05-05' },
  { id: 6, crop_name: 'Sésame', category: 'autres', quantity_kg: 300, price: 600, currency: 'FCFA', location: 'Dédougou', user_id: 'u6', user_name: 'Mariam Traoré', created_at: '2026-05-14' },
  { id: 9, crop_name: 'BioGrowth', category: 'intrants', quantity_kg: 100, price: 2500, currency: 'FCFA', location: 'Ouagadougou', user_id: 'u9', user_name: 'GreenFCO', created_at: '2026-05-17' },
];

const DEMO_SALES = [
  { id: 'sale1', product: 'Oignons', buyer: 'Kofi Traoré', qty: 200, amount: 50000, date: '2026-05-10', currency: 'FCFA' },
  { id: 'sale2', product: 'Sésame', buyer: 'Djamila Ouattara', qty: 50, amount: 30000, date: '2026-05-08', currency: 'FCFA' },
  { id: 'sale3', product: 'BioGrowth', buyer: 'Souleymane Belem', qty: 10, amount: 25000, date: '2026-05-15', currency: 'FCFA' },
  { id: 'sale4', product: 'Oignons', buyer: 'Aïssata Bambara', qty: 100, amount: 25000, date: '2026-04-28', currency: 'FCFA' },
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

export default function SellerProfilePage() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [activeTab, setActiveTab] = useState('listings');

  // Seller profile from localStorage
  const [sellerProfile, setSellerProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem('greenfco_seller_profile')) || {}; } catch { return {}; }
  });

  // Conversations from localStorage
  const [conversations, setConversations] = useState(() => {
    try { return JSON.parse(localStorage.getItem('greenfco_conversations')) || {}; } catch { return {}; }
  });

  // My listings (user's listings stored in component state, seeded from DEMO_LISTINGS for demo)
  const [myListings, setMyListings] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('greenfco_my_listings'));
      return saved || [];
    } catch { return []; }
  });

  // Active chat
  const [activeChatId, setActiveChatId] = useState(null);
  const [msgText, setMsgText] = useState('');

  // Settings form
  const [settingsForm, setSettingsForm] = useState({
    farmName: sellerProfile.farmName || '',
    location: sellerProfile.location || '',
    bio: sellerProfile.bio || '',
    phone: sellerProfile.phone || '',
  });
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [pwMsg, setPwMsg] = useState('');
  const [pwError, setPwError] = useState('');
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Toast
  const [toast, setToast] = useState('');

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function saveSettings(e) {
    e.preventDefault();
    const updated = { ...sellerProfile, ...settingsForm };
    localStorage.setItem('greenfco_seller_profile', JSON.stringify(updated));
    setSellerProfile(updated);
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

  function deleteListing(id) {
    const updated = myListings.filter(l => l.id !== id);
    setMyListings(updated);
    localStorage.setItem('greenfco_my_listings', JSON.stringify(updated));
    showToast(lang === 'fr' ? 'Annonce supprimée.' : 'Listing deleted.');
  }

  function sendMessage() {
    if (!msgText.trim() || !activeChatId) return;
    const now = new Date().toISOString();
    const newMsg = { from: 'seller', name: sellerProfile.farmName || user?.name || 'Vendeur', text: msgText.trim(), ts: now };
    setConversations(prev => {
      const conv = prev[activeChatId];
      const updated = { ...prev, [activeChatId]: { ...conv, messages: [...conv.messages, newMsg] } };
      localStorage.setItem('greenfco_conversations', JSON.stringify(updated));
      return updated;
    });
    setMsgText('');
  }

  // Stat computations
  const totalStock = myListings.reduce((s, l) => s + Number(l.quantity_kg || 0), 0);
  const estimatedRevenue = myListings.reduce((s, l) => s + Number(l.quantity_kg || 0) * Number(l.price || 0), 0);
  const totalSalesAmount = DEMO_SALES.reduce((s, sale) => s + sale.amount, 0);

  const TABS = [
    { key: 'listings', fr: '📋 Mes Annonces', en: '📋 My Listings' },
    { key: 'sales', fr: '💰 Ventes', en: '💰 Sales' },
    { key: 'messages', fr: '💬 Messages', en: '💬 Messages' },
    { key: 'stats', fr: '📊 Statistiques', en: '📊 Statistics' },
    { key: 'settings', fr: '⚙️ Paramètres', en: '⚙️ Settings' },
  ];

  const convEntries = Object.entries(conversations);

  return (
    <div className="seller-profile-page">
      {/* Toast */}
      {toast && <div className="sp-toast">{toast}</div>}

      {/* Header */}
      <div className="sp-page-header">
        <button className="back-btn" onClick={() => navigate('/agropro')}>
          ← {lang === 'fr' ? 'Retour AgroPro' : 'Back to AgroPro'}
        </button>
        <div className="sp-header-info">
          <div className="sp-avatar-lg">
            {(sellerProfile.farmName || user?.name || 'V').charAt(0).toUpperCase()}
          </div>
          <div>
            <h1>{sellerProfile.farmName || user?.name || (lang === 'fr' ? 'Mon Profil Vendeur' : 'My Seller Profile')}</h1>
            {sellerProfile.location && <p className="sp-header-loc">📍 {sellerProfile.location}</p>}
            {sellerProfile.bio && <p className="sp-header-bio">{sellerProfile.bio}</p>}
            <p className="sp-member-since">
              {lang === 'fr' ? `Membre depuis ${sellerProfile.memberSince || new Date().getFullYear()}` : `Member since ${sellerProfile.memberSince || new Date().getFullYear()}`}
            </p>
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

      {/* ══ TAB: LISTINGS ══════════════════════════════════════ */}
      {activeTab === 'listings' && (
        <div className="sp-tab-content">
          <div className="sp-tab-header">
            <h2>{lang === 'fr' ? 'Mes Annonces' : 'My Listings'}</h2>
            <Link to="/agropro" className="btn btn-primary btn-sm">
              + {lang === 'fr' ? 'Nouvelle annonce' : 'New listing'}
            </Link>
          </div>
          {myListings.length === 0 ? (
            <div className="sp-empty card">
              <span className="sp-empty-icon">📦</span>
              <p>{lang === 'fr' ? "Vous n'avez pas encore d'annonces." : "You have no listings yet."}</p>
              <Link to="/agropro" className="btn btn-primary">
                {lang === 'fr' ? 'Publier ma première annonce' : 'Post my first listing'}
              </Link>
            </div>
          ) : (
            <div className="sp-listings-list">
              {myListings.map(l => {
                const cat = CATEGORIES_MAP[l.category] || CATEGORIES_MAP.autres;
                return (
                  <div key={l.id} className="sp-listing-row card">
                    <div className="sp-listing-icon">{cat.icon}</div>
                    <div className="sp-listing-info">
                      <strong>{l.crop_name}</strong>
                      <span className="sp-listing-meta">
                        {Number(l.quantity_kg).toLocaleString()} kg &middot; {Number(l.price).toLocaleString()} {l.currency}/kg &middot; 📍 {l.location}
                      </span>
                      <span className="sp-listing-date">{new Date(l.created_at).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="sp-listing-actions">
                      <button className="btn btn-danger btn-sm" onClick={() => deleteListing(l.id)}>
                        {lang === 'fr' ? 'Supprimer' : 'Delete'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ══ TAB: SALES ════════════════════════════════════════ */}
      {activeTab === 'sales' && (
        <div className="sp-tab-content">
          <h2>{lang === 'fr' ? 'Historique des Ventes' : 'Sales History'}</h2>
          <div className="sp-sales-summary">
            <div className="sp-stat-card card">
              <span className="sp-stat-icon">💰</span>
              <span className="sp-stat-value">{totalSalesAmount.toLocaleString()} FCFA</span>
              <span className="sp-stat-label">{lang === 'fr' ? 'Revenus totaux' : 'Total revenue'}</span>
            </div>
            <div className="sp-stat-card card">
              <span className="sp-stat-icon">📦</span>
              <span className="sp-stat-value">{DEMO_SALES.length}</span>
              <span className="sp-stat-label">{lang === 'fr' ? 'Commandes complétées' : 'Completed orders'}</span>
            </div>
            <div className="sp-stat-card card">
              <span className="sp-stat-icon">👥</span>
              <span className="sp-stat-value">{new Set(DEMO_SALES.map(s => s.buyer)).size}</span>
              <span className="sp-stat-label">{lang === 'fr' ? 'Acheteurs uniques' : 'Unique buyers'}</span>
            </div>
          </div>
          <div className="sp-sales-list">
            <table className="sp-table">
              <thead>
                <tr>
                  <th>{lang === 'fr' ? 'Produit' : 'Product'}</th>
                  <th>{lang === 'fr' ? 'Acheteur' : 'Buyer'}</th>
                  <th>{lang === 'fr' ? 'Quantité' : 'Quantity'}</th>
                  <th>{lang === 'fr' ? 'Montant' : 'Amount'}</th>
                  <th>{lang === 'fr' ? 'Date' : 'Date'}</th>
                  <th>{lang === 'fr' ? 'Statut' : 'Status'}</th>
                </tr>
              </thead>
              <tbody>
                {DEMO_SALES.map(sale => (
                  <tr key={sale.id}>
                    <td><strong>{sale.product}</strong></td>
                    <td>{sale.buyer}</td>
                    <td>{sale.qty} kg</td>
                    <td>{sale.amount.toLocaleString()} {sale.currency}</td>
                    <td>{new Date(sale.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short' })}</td>
                    <td><span className="sp-badge-completed">{lang === 'fr' ? 'Complété' : 'Completed'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══ TAB: MESSAGES ═════════════════════════════════════ */}
      {activeTab === 'messages' && (
        <div className="sp-tab-content sp-messages-layout">
          <div className="sp-conv-list">
            <h2>{lang === 'fr' ? 'Conversations' : 'Conversations'}</h2>
            {convEntries.length === 0 ? (
              <div className="sp-empty card">
                <span className="sp-empty-icon">💬</span>
                <p>{lang === 'fr' ? 'Aucun message pour linstant.' : 'No messages yet.'}</p>
              </div>
            ) : (
              convEntries.map(([cid, conv]) => {
                const last = conv.messages[conv.messages.length - 1];
                const isActive = activeChatId === cid;
                return (
                  <button
                    key={cid}
                    className={`sp-conv-row ${isActive ? 'sp-conv-active' : ''}`}
                    onClick={() => setActiveChatId(cid)}
                  >
                    <div className="sp-conv-avatar">{conv.seller_name?.charAt(0) || '?'}</div>
                    <div className="sp-conv-info">
                      <div className="sp-conv-name">{conv.seller_name} <span className="sp-conv-product">&middot; {conv.listing?.crop_name}</span></div>
                      <div className="sp-conv-preview">{last ? last.text : (lang === 'fr' ? 'Pas encore de message' : 'No messages yet')}</div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {activeChatId && conversations[activeChatId] ? (
            <div className="sp-chat-panel card">
              <div className="sp-chat-header">
                <div className="sp-conv-avatar">{conversations[activeChatId].seller_name?.charAt(0) || '?'}</div>
                <div>
                  <strong>{conversations[activeChatId].seller_name}</strong>
                  <span className="sp-conv-product"> &middot; {conversations[activeChatId].listing?.crop_name}</span>
                </div>
                <button className="sp-chat-close" onClick={() => setActiveChatId(null)}>✕</button>
              </div>
              <div className="sp-chat-messages">
                {conversations[activeChatId].messages.length === 0 ? (
                  <p className="sp-chat-empty">{lang === 'fr' ? 'Aucun message.' : 'No messages.'}</p>
                ) : (
                  conversations[activeChatId].messages.map((m, i) => (
                    <div key={i} className={`chat-bubble ${m.from === 'buyer' ? 'chat-them' : 'chat-me'}`}>
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
                  placeholder={lang === 'fr' ? 'Écrivez votre réponse…' : 'Write your reply…'}
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
            <div className="sp-chat-placeholder card">
              <span>💬</span>
              <p>{lang === 'fr' ? 'Sélectionnez une conversation' : 'Select a conversation'}</p>
            </div>
          )}
        </div>
      )}

      {/* ══ TAB: STATS ════════════════════════════════════════ */}
      {activeTab === 'stats' && (
        <div className="sp-tab-content">
          <h2>{lang === 'fr' ? 'Statistiques' : 'Statistics'}</h2>
          <div className="sp-stats-grid">
            <div className="sp-stat-card card">
              <span className="sp-stat-icon">📋</span>
              <span className="sp-stat-value">{myListings.length}</span>
              <span className="sp-stat-label">{lang === 'fr' ? 'Annonces actives' : 'Active listings'}</span>
            </div>
            <div className="sp-stat-card card">
              <span className="sp-stat-icon">⚖️</span>
              <span className="sp-stat-value">{totalStock.toLocaleString()} kg</span>
              <span className="sp-stat-label">{lang === 'fr' ? 'Stock total' : 'Total stock'}</span>
            </div>
            <div className="sp-stat-card card">
              <span className="sp-stat-icon">👁</span>
              <span className="sp-stat-value">1 240</span>
              <span className="sp-stat-label">{lang === 'fr' ? 'Vues ce mois' : 'Views this month'}</span>
            </div>
            <div className="sp-stat-card card">
              <span className="sp-stat-icon">💰</span>
              <span className="sp-stat-value">{estimatedRevenue.toLocaleString()} FCFA</span>
              <span className="sp-stat-label">{lang === 'fr' ? 'Revenus estimés' : 'Estimated revenue'}</span>
            </div>
          </div>

          <div className="card sp-stats-detail">
            <h3>{lang === 'fr' ? 'Performance des annonces' : 'Listing performance'}</h3>
            {myListings.length === 0 ? (
              <p style={{ color: 'var(--gray-mid)' }}>{lang === 'fr' ? 'Publiez des annonces pour voir vos statistiques.' : 'Post listings to see your stats.'}</p>
            ) : (
              <div className="sp-perf-list">
                {myListings.map(l => (
                  <div key={l.id} className="sp-perf-row">
                    <span className="sp-perf-name">{l.crop_name}</span>
                    <span className="sp-perf-qty">{Number(l.quantity_kg).toLocaleString()} kg</span>
                    <span className="sp-perf-price">{Number(l.price).toLocaleString()} {l.currency}/kg</span>
                    <span className="sp-perf-val">{(Number(l.quantity_kg) * Number(l.price)).toLocaleString()} {l.currency}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card sp-stats-detail">
            <h3>{lang === 'fr' ? 'Résumé des ventes' : 'Sales summary'}</h3>
            <div className="sp-sales-mini">
              {DEMO_SALES.map(sale => (
                <div key={sale.id} className="sp-sales-mini-row">
                  <span>{sale.product}</span>
                  <span>{sale.qty} kg</span>
                  <span className="sp-sales-amount">{sale.amount.toLocaleString()} {sale.currency}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ TAB: SETTINGS ═════════════════════════════════════ */}
      {activeTab === 'settings' && (
        <div className="sp-tab-content">
          <h2>{lang === 'fr' ? 'Paramètres du profil' : 'Profile settings'}</h2>

          <div className="card sp-settings-card">
            <h3>{lang === 'fr' ? "Informations de l'exploitation" : 'Farm information'}</h3>
            <form onSubmit={saveSettings}>
              <div className="sp-settings-grid">
                <div className="form-group">
                  <label className="form-label">{lang === 'fr' ? "Nom de l'exploitation" : 'Farm name'}</label>
                  <input type="text" className="form-input" value={settingsForm.farmName}
                    onChange={e => setSettingsForm(p => ({ ...p, farmName: e.target.value }))}
                    placeholder={lang === 'fr' ? 'Ex : Ferme Kaboré' : 'E.g. Kaboré Farm'} />
                </div>
                <div className="form-group">
                  <label className="form-label">{lang === 'fr' ? 'Localisation' : 'Location'}</label>
                  <input type="text" className="form-input" value={settingsForm.location}
                    onChange={e => setSettingsForm(p => ({ ...p, location: e.target.value }))}
                    placeholder={lang === 'fr' ? 'Ville, région' : 'City, region'} />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">{lang === 'fr' ? 'Bio / Description' : 'Bio / Description'}</label>
                  <textarea className="form-input" rows="3" value={settingsForm.bio}
                    onChange={e => setSettingsForm(p => ({ ...p, bio: e.target.value }))}
                    placeholder={lang === 'fr' ? 'Décrivez votre exploitation…' : 'Describe your farm…'} />
                </div>
                <div className="form-group">
                  <label className="form-label">{lang === 'fr' ? 'Téléphone' : 'Phone'}</label>
                  <input type="tel" className="form-input" value={settingsForm.phone}
                    onChange={e => setSettingsForm(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+226 XX XX XX XX" />
                </div>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary">
                  {settingsSaved ? (lang === 'fr' ? '✓ Enregistré' : '✓ Saved') : (lang === 'fr' ? 'Enregistrer les modifications' : 'Save changes')}
                </button>
              </div>
            </form>
          </div>

          <div className="card sp-settings-card">
            <h3>{lang === 'fr' ? 'Changer le mot de passe' : 'Change password'}</h3>
            {pwMsg && <div className="sp-pw-success">{pwMsg}</div>}
            {pwError && <div className="sp-pw-error">{pwError}</div>}
            <form onSubmit={handlePasswordReset}>
              <div className="sp-settings-grid">
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

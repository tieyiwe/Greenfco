import { useState, useEffect } from 'react';
import axios from 'axios';
import { ALL_PERMISSIONS, ROLE_BASE_PERMISSIONS, ADMIN_ROLE_DEFINITIONS } from './adminPermissions';
import adminClient from '../../api/adminClient';
import { logActivity, getAdminName } from './AdminActivity';
import PasswordInput from '../../components/PasswordInput';

const plainApi = axios.create({ baseURL: '/api' });

export { ALL_PERMISSIONS, ROLE_BASE_PERMISSIONS };

const ADMIN_ROLES = ADMIN_ROLE_DEFINITIONS;

const INVITABLE_ROLES = [
  { value: 'manager',         label: 'Manager' },
  { value: 'analyst',         label: 'Analyst' },
  { value: 'staff',           label: 'Staff' },
  { value: 'assistant',       label: 'Assistant' },
  { value: 'technician',      label: 'Technicien' },
  { value: 'secretary',       label: 'Secrétaire' },
  { value: 'marketing_agent', label: 'Agent Marketing' },
];

const FEATURE_OPTIONS = [
  'Gestion des utilisateurs',
  'Gestion des annonces',
  'Gestion des transactions',
  'Gestion du blog',
  'Gestion des consultations',
  'Gestion des projets',
  'Journal d\'activité',
  'Paramètres plateforme',
  'Gestion de l\'équipe',
];

const PERM_CATEGORIES = ['Users', 'Listings', 'Transactions', 'Blog', 'Consulting', 'Projects', 'Activity', 'Settings'];

function getAdminUser() {
  try {
    const stored = JSON.parse(localStorage.getItem('greenfco_admin_session'));
    if (stored && stored.role) return stored;
  } catch { /* ignore */ }
  return { name: 'Super Admin', email: 'tieyiwebass@gmail.com', role: 'super_admin' };
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function AdminSettings() {
  const [adminUser, setAdminUser] = useState(getAdminUser);
  const adminRole = adminUser?.role || 'analyst';
  const roleInfo = ADMIN_ROLES[adminRole] || ADMIN_ROLES.analyst;

  // Profile edit state
  const [editName, setEditName] = useState(adminUser?.name || '');
  const [toast, setToast] = useState('');

  // Change-password state
  const [showPwForm, setShowPwForm] = useState(false);
  const [cpCurrent, setCpCurrent]   = useState('');
  const [cpNew, setCpNew]           = useState('');
  const [cpConfirm, setCpConfirm]   = useState('');
  const [cpError, setCpError]       = useState('');
  const [cpLoading, setCpLoading]   = useState(false);

  // Collaborators state
  const [collaborators, setCollaborators] = useState([]);
  const [collabError, setCollabError] = useState('');

  // Invite form state
  const [inviteName,  setInviteName]  = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole,  setInviteRole]  = useState('manager');
  const [inviteSuccess, setInviteSuccess] = useState(false);

  // Permissions modal state
  const [permModal, setPermModal] = useState(null);

  // Platform settings state
  const [platformSettings, setPlatformSettings] = useState(null);
  const [savingSettings, setSavingSettings] = useState(false);

  // Admin users state (super_admin only)
  const [adminUsers, setAdminUsers] = useState([]);

  // Access requests state
  const [accessRequests, setAccessRequests] = useState([]);
  const [reqFeature, setReqFeature] = useState(FEATURE_OPTIONS[0]);
  const [reqReason, setReqReason] = useState('');
  const [reqSuccess, setReqSuccess] = useState(false);

  // Sync admin user from localStorage when component mounts
  useEffect(() => {
    const user = getAdminUser();
    setAdminUser(user);
    setEditName(user.name || '');
    // Load platform settings
    adminClient.get('/settings')
      .then(r => setPlatformSettings(r.data))
      .catch(() => {});
    // Load collaborators from server
    adminClient.get('/collaborators')
      .then(r => setCollaborators(Array.isArray(r.data) ? r.data : []))
      .catch(() => setCollabError('Impossible de charger les collaborateurs.'));
    // Load admin users (super_admin only)
    adminClient.get('/admin-users')
      .then(r => setAdminUsers(Array.isArray(r.data) ? r.data : []))
      .catch(() => {});
    // Load access requests
    adminClient.get('/access-requests')
      .then(r => setAccessRequests(Array.isArray(r.data) ? r.data : []))
      .catch(() => {});
  }, []);

  async function handleSavePlatformSettings(e) {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const res = await adminClient.put('/settings', platformSettings);
      setPlatformSettings(res.data);
      showToast('Paramètres plateforme enregistrés !');
    } catch { showToast('Erreur lors de l\'enregistrement.'); }
    finally { setSavingSettings(false); }
  }

  function setPlatField(k, v) { setPlatformSettings(prev => ({ ...prev, [k]: v })); }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function handleSaveName(e) {
    e.preventDefault();
    if (!editName.trim()) return;
    const updated = { ...adminUser, name: editName.trim() };
    localStorage.setItem('greenfco_admin_session', JSON.stringify(updated));
    setAdminUser(updated);
    showToast('Nom mis à jour ! / Name updated!');
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setCpError('');
    if (cpNew.length < 8) { setCpError('Minimum 8 caractères requis.'); return; }
    if (cpNew !== cpConfirm) { setCpError('Les mots de passe ne correspondent pas.'); return; }
    setCpLoading(true);
    try {
      await plainApi.post('/admin/auth/change-password', {
        email: adminUser.email,
        current_password: cpCurrent,
        new_password: cpNew,
      });
      setCpCurrent(''); setCpNew(''); setCpConfirm('');
      setShowPwForm(false);
      showToast('Mot de passe mis à jour et sauvegardé !');
    } catch (err) {
      setCpError(err.response?.data?.error || 'Erreur lors de la mise à jour.');
    } finally {
      setCpLoading(false);
    }
  }

  async function handleRoleChange(id, newRole) {
    try {
      const res = await adminClient.put(`/collaborators/${id}`, { role: newRole });
      setCollaborators(prev => prev.map(c => c.id === id ? res.data : c));
      showToast('Rôle mis à jour ! / Role updated!');
    } catch { showToast('Erreur lors de la mise à jour du rôle.'); }
  }

  async function handleRevoke(id) {
    if (!window.confirm('Révoquer l\'accès de ce collaborateur ? / Revoke this collaborator\'s access?')) return;
    try {
      await adminClient.delete(`/collaborators/${id}`);
      setCollaborators(prev => prev.filter(c => c.id !== id));
      showToast('Accès révoqué. / Access revoked.');
    } catch { showToast('Erreur lors de la révocation.'); }
  }

  async function handleInvite(e) {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) return;
    try {
      const res = await adminClient.post('/collaborators', {
        name: inviteName.trim(),
        email: inviteEmail.trim(),
        role: inviteRole,
      });
      setCollaborators(prev => [...prev, res.data]);
      logActivity('user_action', getAdminName(), 'a invité un collaborateur',
        `${inviteName.trim()} (${inviteEmail.trim()}) — rôle : ${inviteRole}`, 'info');
      setInviteName('');
      setInviteEmail('');
      setInviteRole('manager');
      setInviteSuccess(true);
      setTimeout(() => setInviteSuccess(false), 4000);
    } catch (err) {
      showToast(err.response?.data?.error || 'Erreur lors de l\'invitation.');
    }
  }

  async function handleToggleAdminUser(adminUser) {
    const newActive = !adminUser.active;
    try {
      const res = await adminClient.put(`/admin-users/${adminUser.id}`, { active: newActive });
      setAdminUsers(prev => prev.map(u => u.id === adminUser.id ? res.data : u));
      logActivity('user_action', getAdminName(),
        newActive ? 'a réactivé un compte admin' : 'a désactivé un compte admin',
        `${adminUser.name} (${adminUser.email})`, newActive ? 'success' : 'warning');
      showToast(`Compte ${newActive ? 'réactivé' : 'désactivé'}.`);
    } catch { showToast('Erreur.'); }
  }

  async function handleAccessRequest(e) {
    e.preventDefault();
    try {
      const res = await adminClient.post('/access-requests', { feature: reqFeature, reason: reqReason.trim() });
      setAccessRequests(prev => [res.data, ...prev]);
      setReqReason('');
      setReqSuccess(true);
      setTimeout(() => setReqSuccess(false), 4000);
    } catch (err) {
      showToast(err.response?.data?.error || 'Erreur lors de la demande.');
    }
  }

  async function handleAccessDecision(req, status) {
    try {
      const res = await adminClient.put(`/access-requests/${req.id}`, { status });
      setAccessRequests(prev => prev.map(r => r.id === req.id ? res.data : r));
      logActivity('user_action', getAdminName(),
        status === 'approved' ? 'a approuvé une demande d\'accès' : 'a refusé une demande d\'accès',
        `${req.requester_name} — ${req.feature}`, status === 'approved' ? 'success' : 'warning');
      showToast(status === 'approved' ? 'Accès approuvé.' : 'Demande refusée.');
    } catch { showToast('Erreur.'); }
  }

  return (
    <div className="settings-page">
      <div style={{ marginBottom: '0.25rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1B4332', fontFamily: 'var(--font-display)', margin: 0 }}>
          Paramètres / Settings
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--gray-mid)', marginTop: '0.15rem' }}>
          Gérez votre profil et les accès de l'équipe.
        </p>
      </div>

      {/* ── Section 1: My Profile ── */}
      <section className="settings-section">
        <h2>Mon profil / My Profile</h2>

        <div className="profile-info">
          <div className="profile-avatar">
            {(adminUser?.name || 'A').charAt(0).toUpperCase()}
          </div>
          <div className="profile-meta">
            <strong>{adminUser?.name || 'Admin'}</strong>
            <span>{adminUser?.email}</span>
            <br />
            <span
              className="admin-role-badge"
              style={{ background: roleInfo.color, marginTop: '0.25rem', display: 'inline-block' }}
            >
              {roleInfo.label}
            </span>
          </div>
        </div>

        <form className="settings-form" onSubmit={handleSaveName}>
          <div>
            <label htmlFor="edit-name">Nom complet / Full name</label>
            <input
              id="edit-name"
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={adminUser?.email || ''}
              readOnly
              style={{ background: '#f9fafb', cursor: 'default' }}
            />
          </div>
          <div className="btn-row">
            <button type="submit" className="btn btn-primary">
              Enregistrer / Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => { setShowPwForm(v => !v); setCpError(''); }}
            >
              {showPwForm ? 'Annuler' : 'Changer le mot de passe / Change Password'}
            </button>
          </div>
        </form>

        {showPwForm && (
          <form
            onSubmit={handleChangePassword}
            style={{
              marginTop: '1.25rem',
              padding: '1.25rem',
              background: '#f0fdf4',
              borderRadius: '10px',
              border: '1px solid #bbf7d0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <h4 style={{ margin: 0, color: '#1B4332', fontSize: '0.95rem', fontWeight: 600 }}>
              Changer le mot de passe / Change Password
            </h4>
            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--gray-mid)', display: 'block', marginBottom: '0.3rem' }}>
                Mot de passe actuel
              </label>
              <PasswordInput
                value={cpCurrent}
                onChange={e => setCpCurrent(e.target.value)}
                required
                placeholder="Mot de passe actuel"
                inputStyle={{ padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--gray-mid)', display: 'block', marginBottom: '0.3rem' }}>
                Nouveau mot de passe (min. 8 caractères)
              </label>
              <PasswordInput
                value={cpNew}
                onChange={e => setCpNew(e.target.value)}
                required
                minLength={8}
                placeholder="Nouveau mot de passe"
                inputStyle={{ padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--gray-mid)', display: 'block', marginBottom: '0.3rem' }}>
                Confirmer le nouveau mot de passe
              </label>
              <PasswordInput
                value={cpConfirm}
                onChange={e => setCpConfirm(e.target.value)}
                required
                placeholder="Confirmer le mot de passe"
                inputStyle={{ padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
              />
            </div>
            {cpError && (
              <p style={{ color: '#e53e3e', fontSize: '0.85rem', margin: 0 }}>{cpError}</p>
            )}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" className="btn btn-primary" disabled={cpLoading}>
                {cpLoading ? 'Enregistrement…' : '💾 Enregistrer le nouveau mot de passe'}
              </button>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--gray-mid)', margin: 0 }}>
              Le nouveau mot de passe est sauvegardé et survivra aux redéploiements.
            </p>
          </form>
        )}
      </section>

      {/* ── Section 2: Collaborators ── */}
      <section className="settings-section">
        <h2>Collaborateurs / Collaborators</h2>

        {collabError && <p style={{ color: '#e53e3e', fontSize: '0.85rem' }}>{collabError}</p>}
        {collaborators.length === 0 ? (
          <p style={{ color: 'var(--gray-mid)', fontStyle: 'italic' }}>
            Aucun collaborateur. / No collaborators yet.
          </p>
        ) : (
          <div className="collab-table-wrap">
            <table className="collab-table">
              <thead>
                <tr>
                  {['Name', 'Email', 'Role', 'Status', 'Invited', 'Actions'].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {collaborators.map((collab) => {
                  const cr = ADMIN_ROLES[collab.role] || ADMIN_ROLES.analyst;
                  const hasCustomPerms = collab.customPermissions !== null && collab.customPermissions !== undefined;
                  return (
                    <tr key={collab.id}>
                      <td style={{ fontWeight: 500, color: '#1A1A14' }}>{collab.name}</td>
                      <td style={{ color: 'var(--gray-mid)' }}>{collab.email}</td>
                      <td>
                        <span
                          className="collab-role-badge"
                          style={{ background: cr.color }}
                        >
                          {cr.label}
                        </span>
                        {hasCustomPerms && (
                          <span className="perm-custom-tag">custom</span>
                        )}
                      </td>
                      <td>
                        <span className={`collab-status-badge ${collab.status === 'active' ? 'status-active' : 'status-pending'}`}>
                          {collab.status === 'active' ? 'Active' : 'Pending'}
                        </span>
                      </td>
                      <td style={{ color: 'var(--gray-mid)', fontSize: '0.82rem' }}>
                        {collab.created_at ? new Date(collab.created_at).toLocaleDateString('en-GB') : '—'}
                      </td>
                      <td>
                        {adminRole === 'super_admin' ? (
                          <div className="collab-actions">
                            <select
                              className="collab-role-select"
                              value={collab.role}
                              onChange={(e) => handleRoleChange(collab.id, e.target.value)}
                            >
                              {INVITABLE_ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                            </select>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => setPermModal(collab)}
                              title="Gérer les permissions"
                            >
                              🔐
                            </button>
                            <button
                              className="btn-revoke"
                              onClick={() => handleRevoke(collab.id)}
                            >
                              Révoquer / Revoke
                            </button>
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--gray-mid)', fontStyle: 'italic' }}>
                            View only
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ── Section 3: Invite Collaborator ── */}
      <section className="settings-section">
        <h3>Inviter un collaborateur / Invite a Collaborator</h3>
        {adminRole === 'super_admin' ? (
          <form onSubmit={handleInvite}>
            <div className="invite-form-row">
              <input
                placeholder="Nom complet / Full name"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
              />
              <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)}>
                {INVITABLE_ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
              <button type="submit" className="btn btn-primary">
                Inviter / Invite
              </button>
            </div>
          </form>
        ) : (
          <p className="perm-notice">
            🔒 Seul le Super Admin peut inviter des collaborateurs. / Only Super Admin can invite collaborators.
          </p>
        )}
        {inviteSuccess && (
          <div className="invite-success">
            Invitation envoyée ! Un lien d'accès a été généré. / Invitation sent!
          </div>
        )}
      </section>

      {/* ── Section 3b: Platform Settings ── */}
      {adminRole === 'super_admin' && (
        <section className="settings-section">
          <h2>Paramètres plateforme / Platform Settings</h2>
          {platformSettings === null ? (
            <p style={{ color: 'var(--gray-mid)', fontSize: '0.875rem' }}>Chargement…</p>
          ) : (
            <form onSubmit={handleSavePlatformSettings}>
              <div className="settings-form">
                <div>
                  <label>Nom de la plateforme</label>
                  <input type="text" value={platformSettings.platform_name || ''} onChange={e => setPlatField('platform_name', e.target.value)} />
                </div>
                <div>
                  <label>Email support</label>
                  <input type="email" value={platformSettings.support_email || ''} onChange={e => setPlatField('support_email', e.target.value)} />
                </div>
                <div>
                  <label>WhatsApp</label>
                  <input type="text" value={platformSettings.whatsapp || ''} onChange={e => setPlatField('whatsapp', e.target.value)} placeholder="+226 XX XX XX XX" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1rem 0' }}>
                {[
                  { key: 'allow_new_registrations', label: 'Autoriser les nouvelles inscriptions' },
                  { key: 'ai_features_enabled', label: 'Fonctionnalités IA activées' },
                  { key: 'marketplace_enabled', label: 'Marketplace activée' },
                  { key: 'network_enabled', label: 'Réseau professionnel activé' },
                  { key: 'maintenance_mode', label: '⚠ Mode maintenance' },
                ].map(({ key, label }) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.875rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={!!platformSettings[key]}
                      onChange={e => setPlatField(key, e.target.checked)}
                      style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                    />
                    {label}
                  </label>
                ))}
              </div>
              <div className="btn-row">
                <button type="submit" className="btn btn-primary" disabled={savingSettings}>
                  {savingSettings ? 'Enregistrement…' : '💾 Enregistrer les paramètres'}
                </button>
              </div>
            </form>
          )}
        </section>
      )}

      {/* ── Section 3c: Admin Users (super_admin only) ── */}
      {adminRole === 'super_admin' && (
        <section className="settings-section">
          <h2>Comptes Admin</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--gray-mid)', marginBottom: '1rem' }}>
            Gérez les comptes ayant accès au panneau d'administration.
          </p>
          {adminUsers.length === 0 ? (
            <p style={{ color: 'var(--gray-mid)', fontStyle: 'italic' }}>Chargement…</p>
          ) : (
            <div className="collab-table-wrap">
              <table className="collab-table">
                <thead><tr>{['Nom', 'Email', 'Rôle', 'Statut', 'Actions'].map(h => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>
                  {adminUsers.map(u => {
                    const rdef = ADMIN_ROLES[u.role] || { label: u.role, color: '#9CA3AF' };
                    return (
                      <tr key={u.id}>
                        <td style={{ fontWeight: 500, color: '#1A1A14' }}>{u.name}</td>
                        <td style={{ color: 'var(--gray-mid)' }}>{u.email}</td>
                        <td><span className="admin-role-badge" style={{ background: rdef.color }}>{rdef.label}</span></td>
                        <td>
                          <span className={`collab-status-badge ${u.active ? 'status-active' : 'status-pending'}`}>
                            {u.active ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                        <td>
                          {u.email !== adminUser?.email && (
                            <button
                              className={u.active ? 'btn-revoke' : 'btn btn-primary btn-sm'}
                              onClick={() => handleToggleAdminUser(u)}
                            >
                              {u.active ? 'Désactiver' : 'Réactiver'}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* ── Section 3d: Access Requests ── */}
      <section className="settings-section">
        <h2>Demandes d'accès</h2>

        {/* Super admin: view and approve/deny requests */}
        {adminRole === 'super_admin' ? (
          <>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-mid)', marginBottom: '1rem' }}>
              {accessRequests.filter(r => r.status === 'pending').length} demande(s) en attente.
            </p>
            {accessRequests.length === 0 ? (
              <p style={{ color: 'var(--gray-mid)', fontStyle: 'italic' }}>Aucune demande.</p>
            ) : (
              <div className="collab-table-wrap">
                <table className="collab-table">
                  <thead><tr>{['Demandeur', 'Fonctionnalité', 'Raison', 'Statut', 'Actions'].map(h => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>
                    {accessRequests.map(req => (
                      <tr key={req.id} style={{ background: req.status === 'pending' ? 'rgba(254,249,195,0.3)' : 'transparent' }}>
                        <td style={{ fontWeight: 500 }}>{req.requester_name}<br /><span style={{ fontSize: '0.75rem', color: 'var(--gray-mid)' }}>{req.requester_email}</span></td>
                        <td>{req.feature}</td>
                        <td style={{ color: 'var(--gray-mid)', fontSize: '0.85rem' }}>{req.reason || '—'}</td>
                        <td>
                          <span style={{
                            display: 'inline-block', padding: '0.15rem 0.5rem', borderRadius: '99px', fontSize: '0.72rem', fontWeight: 600,
                            background: req.status === 'approved' ? '#d1fae5' : req.status === 'denied' ? '#fee2e2' : '#fef9c3',
                            color: req.status === 'approved' ? '#065f46' : req.status === 'denied' ? '#991b1b' : '#854d0e',
                          }}>
                            {req.status === 'approved' ? 'Approuvé' : req.status === 'denied' ? 'Refusé' : 'En attente'}
                          </span>
                        </td>
                        <td>
                          {req.status === 'pending' && (
                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                              <button className="btn btn-primary btn-sm" onClick={() => handleAccessDecision(req, 'approved')}>✅ Approuver</button>
                              <button className="btn-revoke" onClick={() => handleAccessDecision(req, 'denied')}>✗ Refuser</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          /* Non-super-admin: submit a request */
          <form onSubmit={handleAccessRequest}>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-mid)', marginBottom: '1rem' }}>
              Demandez l'accès à une fonctionnalité. Le Super Admin sera notifié.
            </p>
            <div className="invite-form-row">
              <select value={reqFeature} onChange={e => setReqFeature(e.target.value)}>
                {FEATURE_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
              <input
                type="text"
                placeholder="Raison de la demande (optionnel)"
                value={reqReason}
                onChange={e => setReqReason(e.target.value)}
                style={{ flex: 2 }}
              />
              <button type="submit" className="btn btn-primary">Envoyer la demande</button>
            </div>
            {reqSuccess && <div className="invite-success">Demande envoyée ! Le Super Admin la traitera bientôt.</div>}
            {accessRequests.filter(r => r.requester_email === adminUser?.email).length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-mid)', marginBottom: '0.5rem' }}>Mes demandes précédentes</p>
                {accessRequests.filter(r => r.requester_email === adminUser?.email).map(req => (
                  <div key={req.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.85rem', padding: '0.4rem 0', borderBottom: '1px solid var(--gray-light)' }}>
                    <span style={{ flex: 1 }}>{req.feature}</span>
                    <span style={{
                      padding: '0.1rem 0.5rem', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 600,
                      background: req.status === 'approved' ? '#d1fae5' : req.status === 'denied' ? '#fee2e2' : '#fef9c3',
                      color: req.status === 'approved' ? '#065f46' : req.status === 'denied' ? '#991b1b' : '#854d0e',
                    }}>
                      {req.status === 'approved' ? 'Approuvé' : req.status === 'denied' ? 'Refusé' : 'En attente'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </form>
        )}
      </section>

      {/* ── Section 4: Danger Zone (super_admin only) ── */}
      {adminRole === 'super_admin' && (
        <section className="settings-section danger-zone">
          <h3>Zone Dangereuse / Danger Zone</h3>
          <div className="danger-row">
            <div>
              <strong>Réinitialiser les données de démonstration</strong>
              <p>Efface toutes les données de test de la plateforme.</p>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => alert('Action désactivée en production.')}
            >
              Réinitialiser
            </button>
          </div>
        </section>
      )}

      {/* Toast notification */}
      {toast && <div className="admin-toast">{toast}</div>}

      {/* ── Permissions Modal ── */}
      {permModal && (
        <div
          className="modal-overlay"
          onClick={e => { if (e.target === e.currentTarget) setPermModal(null); }}
        >
          <div className="perm-modal card">
            <div className="perm-modal-header">
              <h3>🔐 Permissions — {permModal.name}</h3>
              <button onClick={() => setPermModal(null)}>✕</button>
            </div>
            <p className="perm-modal-role">
              Rôle de base: <strong>{permModal.role}</strong> (permissions par défaut chargées)
            </p>

            {PERM_CATEGORIES.map(cat => (
              <div key={cat} className="perm-category">
                <h4 className="perm-cat-title">{cat}</h4>
                {ALL_PERMISSIONS.filter(p => p.category === cat).map(perm => {
                  const currentPerms = permModal.customPermissions ?? ROLE_BASE_PERMISSIONS[permModal.role] ?? [];
                  const isChecked = currentPerms.includes(perm.key);
                  const isBaseRole = (ROLE_BASE_PERMISSIONS[permModal.role] ?? []).includes(perm.key);
                  return (
                    <label key={perm.key} className="perm-checkbox-row">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={e => {
                          const base = permModal.customPermissions ?? [...(ROLE_BASE_PERMISSIONS[permModal.role] ?? [])];
                          const updated = e.target.checked
                            ? [...base, perm.key]
                            : base.filter(k => k !== perm.key);
                          setPermModal(prev => ({ ...prev, customPermissions: updated }));
                        }}
                      />
                      <span>{perm.label}</span>
                      {isBaseRole && <span className="perm-base-tag">défaut</span>}
                    </label>
                  );
                })}
              </div>
            ))}

            <div className="perm-modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setPermModal(prev => ({ ...prev, customPermissions: null }))}
              >
                🔄 Réinitialiser aux défauts
              </button>
              <button
                className="btn btn-primary"
                onClick={async () => {
                  try {
                    const res = await adminClient.put(`/collaborators/${permModal.id}`, { customPermissions: permModal.customPermissions });
                    setCollaborators(prev => prev.map(c => c.id === permModal.id ? res.data : c));
                    showToast('Permissions enregistrées ! / Permissions saved!');
                    setPermModal(null);
                  } catch { showToast('Erreur lors de l\'enregistrement des permissions.'); }
                }}
              >
                💾 Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

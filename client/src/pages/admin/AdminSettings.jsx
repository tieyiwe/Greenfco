import { useState, useEffect } from 'react';
import { ALL_PERMISSIONS, ROLE_BASE_PERMISSIONS } from './adminPermissions';
import adminClient from '../../api/adminClient';

export { ALL_PERMISSIONS, ROLE_BASE_PERMISSIONS };

const ADMIN_ROLES = {
  super_admin: { label: 'Super Admin', color: '#EF4444' },
  manager:     { label: 'Manager',     color: '#F59E0B' },
  analyst:     { label: 'Analyst',     color: '#3B82F6' },
};

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

  function handleChangePassword() {
    showToast('Feature coming soon / Fonctionnalité à venir');
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
      setInviteName('');
      setInviteEmail('');
      setInviteRole('manager');
      setInviteSuccess(true);
      setTimeout(() => setInviteSuccess(false), 4000);
    } catch (err) {
      showToast(err.response?.data?.error || 'Erreur lors de l\'invitation.');
    }
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
            <button type="button" className="btn btn-secondary" onClick={handleChangePassword}>
              Changer le mot de passe / Change Password
            </button>
          </div>
        </form>
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
                              <option value="super_admin">Super Admin</option>
                              <option value="manager">Manager</option>
                              <option value="analyst">Analyst</option>
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
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
              >
                <option value="manager">Manager</option>
                <option value="analyst">Analyst</option>
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

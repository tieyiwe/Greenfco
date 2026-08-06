import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import PasswordInput from '../../components/PasswordInput';
const plainApi = axios.create({ baseURL: '/api' });

const card = {
  background: 'white',
  padding: '2.5rem',
  borderRadius: '16px',
  boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
  width: '100%',
  maxWidth: '400px',
};

const wrap = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #0a1f12 0%, #1a5a35 100%)',
  padding: '1rem',
};

export default function AdminLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState('login'); // 'login' | 'change-password' | 'forgot-password'

  // Login form
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  // Change-password form (first-login / temp password)
  const [pendingEmail, setPendingEmail] = useState('');
  const [currentPass, setCurrentPass]   = useState('');
  const [newPass, setNewPass]           = useState('');
  const [confirmPass, setConfirmPass]   = useState('');

  // Forgot-password form
  const [fpEmail, setFpEmail]   = useState('');
  const [fpSent, setFpSent]     = useState(false);
  const [fpLink, setFpLink]     = useState('');

  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  function storeSession(token, user) {
    localStorage.setItem('greenfco_admin_token', token);
    localStorage.setItem('greenfco_admin_session', JSON.stringify({
      name: user.name,
      email: user.email,
      role: user.role,
      verified: true,
    }));
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await plainApi.post('/admin/auth', {
        email: email.trim(),
        password,
      });
      if (res.data.must_change_password) {
        setPendingEmail(res.data.user.email);
        setCurrentPass(password);
        setStep('change-password');
      } else {
        storeSession(res.data.token, res.data.user);
        navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Identifiants incorrects.');
    } finally {
      setLoading(false);
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setError('');
    if (newPass !== confirmPass) { setError('Les mots de passe ne correspondent pas.'); return; }
    if (newPass.length < 8) { setError('Minimum 8 caractères requis.'); return; }
    setLoading(true);
    try {
      const res = await plainApi.post('/admin/auth/change-password', {
        email: pendingEmail,
        current_password: currentPass,
        new_password: newPass,
      });
      storeSession(res.data.token, res.data.user);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors du changement de mot de passe.');
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await plainApi.post('/admin/auth/forgot-password', { email: fpEmail.trim() });
      if (res.data?.reset_link) setFpLink(res.data.reset_link);
      setFpSent(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de l\'envoi.');
    } finally {
      setLoading(false);
    }
  }

  // ── Forgot Password Step ───────────────────────────────────────
  if (step === 'forgot-password') {
    return (
      <div style={wrap}>
        <div style={card}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#1B4332', fontSize: '1.8rem' }}>🌿</Link>
            <h1 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '0.6rem', color: '#1B4332', fontFamily: 'var(--font-display)' }}>
              Mot de passe oublié
            </h1>
            <p style={{ color: '#6c757d', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Un lien de réinitialisation sera envoyé à votre adresse e-mail admin.
            </p>
          </div>

          {fpSent ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ padding: '1rem', background: '#d1fae5', borderRadius: '8px', color: '#065f46', fontSize: '0.9rem', textAlign: 'center' }}>
                ✅ Si ce compte existe, vous recevrez un lien de réinitialisation.
              </div>
              {fpLink && (
                <div style={{ padding: '0.85rem', background: '#fef9c3', borderRadius: '8px', border: '1px solid #fde047', fontSize: '0.82rem' }}>
                  <p style={{ color: '#854d0e', fontWeight: 600, marginBottom: '0.4rem' }}>⚠ Email non configuré — lien direct :</p>
                  <a href={fpLink} style={{ color: '#1B4332', wordBreak: 'break-all', fontSize: '0.78rem' }}>{fpLink}</a>
                </div>
              )}
              <button
                className="btn btn-secondary"
                style={{ width: '100%', marginTop: '0.5rem' }}
                onClick={() => { setStep('login'); setFpSent(false); setFpLink(''); setFpEmail(''); }}
              >
                ← Retour à la connexion
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgotPassword}>
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="email"
                  placeholder="Email administrateur"
                  value={fpEmail}
                  onChange={e => setFpEmail(e.target.value)}
                  required
                  className="form-input"
                  style={{ width: '100%', boxSizing: 'border-box' }}
                  autoFocus
                />
              </div>
              {error && <p style={{ color: '#e53e3e', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Envoi…' : 'Envoyer le lien'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ width: '100%', marginTop: '0.5rem' }}
                onClick={() => { setStep('login'); setError(''); }}
              >
                ← Retour
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // ── Change Password Step (temp password detected) ─────────────
  if (step === 'change-password') {
    return (
      <div style={wrap}>
        <div style={card}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{ fontSize: '2rem' }}>🔐</div>
            <h1 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '0.6rem', color: '#1B4332', fontFamily: 'var(--font-display)' }}>
              Définir votre mot de passe
            </h1>
            <div style={{
              background: '#fef9c3',
              border: '1px solid #fde047',
              borderRadius: '8px',
              padding: '0.65rem 0.9rem',
              marginTop: '0.75rem',
              fontSize: '0.82rem',
              color: '#854d0e',
              textAlign: 'left',
            }}>
              ⚠️ <strong>Mot de passe temporaire détecté.</strong><br />
              Vous devez créer un mot de passe personnel avant de continuer.
            </div>
          </div>
          <form onSubmit={handleChangePassword}>
            <div style={{ marginBottom: '0.85rem' }}>
              <PasswordInput
                placeholder="Nouveau mot de passe (min. 8 caractères)"
                value={newPass}
                onChange={e => setNewPass(e.target.value)}
                required
                className="form-input"
                autoFocus
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <PasswordInput
                placeholder="Confirmer le mot de passe"
                value={confirmPass}
                onChange={e => setConfirmPass(e.target.value)}
                required
                className="form-input"
              />
            </div>
            {error && <p style={{ color: '#e53e3e', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Enregistrement…' : 'Définir le mot de passe et accéder'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: '#9ca3af' }}>
            Connecté en tant que <strong>{pendingEmail}</strong>
          </p>
        </div>
      </div>
    );
  }

  // ── Login Step ────────────────────────────────────────────────
  return (
    <div style={wrap}>
      <div style={card}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <div style={{ fontSize: '2.5rem' }}>🌿</div>
            <p style={{ fontSize: '0.78rem', color: '#9ca3af', marginTop: '0.1rem' }}>← Retour à l'accueil</p>
          </Link>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 700, marginTop: '0.5rem', color: '#1B4332', fontFamily: 'var(--font-display)' }}>
            GreenFCO Admin
          </h1>
          <p style={{ color: '#6c757d', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Panneau d'administration — accès restreint
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '0.85rem' }}>
            <input
              type="email"
              placeholder="Email administrateur"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="form-input"
              style={{ width: '100%' }}
              autoFocus
            />
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <PasswordInput
              placeholder="Mot de passe"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
            <button
              type="button"
              onClick={() => { setStep('forgot-password'); setError(''); setFpEmail(email); }}
              style={{ background: 'none', border: 'none', color: '#1B4332', fontSize: '0.8rem', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
            >
              Mot de passe oublié ?
            </button>
          </div>
          {error && <p style={{ color: '#e53e3e', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Vérification…' : 'Accéder au panneau'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: '#9ca3af' }}>
          Email facultatif pour le super admin
        </p>
      </div>
    </div>
  );
}

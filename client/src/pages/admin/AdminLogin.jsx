import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';

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
  const [step, setStep] = useState('login'); // 'login' | 'change-password'

  // Login form
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  // Change-password form (first-login)
  const [pendingEmail, setPendingEmail] = useState('');
  const [currentPass, setCurrentPass]   = useState('');
  const [newPass, setNewPass]           = useState('');
  const [confirmPass, setConfirmPass]   = useState('');

  const [error, setError]   = useState('');
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
      const res = await api.post('/admin/auth', {
        email: email.trim() || undefined,
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
      const res = await api.post('/admin/auth/change-password', {
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

  if (step === 'change-password') {
    return (
      <div style={wrap}>
        <div style={card}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{ fontSize: '2rem' }}>🔐</div>
            <h1 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '0.6rem', color: '#1B4332', fontFamily: 'var(--font-display)' }}>
              Définir votre mot de passe
            </h1>
            <p style={{ color: '#6c757d', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Première connexion — choisissez un nouveau mot de passe sécurisé.
            </p>
          </div>
          <form onSubmit={handleChangePassword}>
            <div style={{ marginBottom: '0.85rem' }}>
              <input
                type="password"
                placeholder="Nouveau mot de passe (min. 8 caractères)"
                value={newPass}
                onChange={e => setNewPass(e.target.value)}
                required
                className="form-input"
                style={{ width: '100%' }}
                autoFocus
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="password"
                placeholder="Confirmer le mot de passe"
                value={confirmPass}
                onChange={e => setConfirmPass(e.target.value)}
                required
                className="form-input"
                style={{ width: '100%' }}
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

  return (
    <div style={wrap}>
      <div style={card}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🌿</div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 700, marginTop: '0.75rem', color: '#1B4332', fontFamily: 'var(--font-display)' }}>
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
              className="form-input"
              style={{ width: '100%' }}
              autoFocus
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="form-input"
              style={{ width: '100%' }}
            />
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

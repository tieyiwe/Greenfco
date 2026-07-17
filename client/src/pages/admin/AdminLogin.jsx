import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/admin/auth', { password });
      localStorage.setItem('greenfco_admin_token', res.data.token);
      localStorage.setItem('greenfco_admin_session', JSON.stringify({
        name: 'Super Admin',
        email: 'tieyiwebass@gmail.com',
        role: 'super_admin',
        verified: true,
      }));
      navigate('/admin');
    } catch {
      setError('Mot de passe incorrect.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a1f12 0%, #1a5a35 100%)',
    }}>
      <div style={{
        background: 'white',
        padding: '2.5rem',
        borderRadius: '16px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
        width: '100%',
        maxWidth: '380px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🌿</div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 700, marginTop: '0.75rem', color: '#1B4332', fontFamily: 'var(--font-display)' }}>
            GreenFCO Admin
          </h1>
          <p style={{ color: '#6c757d', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Panneau d'administration — accès restreint
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              placeholder="Mot de passe administrateur"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="form-input"
              style={{ width: '100%' }}
              autoFocus
            />
          </div>
          {error && (
            <p style={{ color: '#e53e3e', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Vérification…' : 'Accéder au panneau'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: '#9ca3af' }}>
          Mot de passe par défaut défini via la variable d'env <code>ADMIN_PASSWORD</code>
        </p>
      </div>
    </div>
  );
}

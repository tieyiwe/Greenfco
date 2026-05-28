import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login } from '../../api/auth';
import useAuthStore from '../../store/authStore';
import './Auth.css';

export default function Login() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const navigate = useNavigate();
  const setAuth = useAuthStore(s => s.setAuth);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await login(form);
      setAuth(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || (lang === 'fr' ? 'Identifiants incorrects.' : 'Invalid credentials.'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-side auth-side-brand">
        <Link to="/" className="auth-logo">🌿 <span>Green</span>FCO</Link>
        <div className="auth-brand-content">
          <h2>{lang === 'fr' ? 'Bienvenue sur GreenFCO' : 'Welcome to GreenFCO'}</h2>
          <p>
            {lang === 'fr'
              ? 'Votre plateforme agro-environnementale pour une agriculture durable en Afrique francophone.'
              : 'Your agro-environmental platform for sustainable agriculture in Francophone Africa.'}
          </p>
          <div className="auth-brand-features">
            {['🌱 Gestion de cultures', '💧 Irrigation intelligente', '🤖 Conseiller IA', '🛒 Marché numérique'].map(f => (
              <div key={f} className="auth-feature">{f}</div>
            ))}
          </div>
        </div>
        <p className="auth-slogan">"Cultiver un avenir durable, ensemble."</p>
      </div>

      <div className="auth-side auth-side-form">
        <div className="auth-form-container">
          <h1>{t('auth.login_title')}</h1>
          <p className="auth-subtitle">
            {t('auth.no_account')} <Link to="/register">{t('nav.register')}</Link>
          </p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">{t('auth.email')}</label>
              <input
                type="email"
                className="form-input"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                required
                placeholder="example@email.com"
              />
            </div>
            <div className="form-group">
              <label className="form-label">{t('auth.password')}</label>
              <input
                type="password"
                className="form-input"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                required
                placeholder="••••••••"
              />
            </div>
            <div className="auth-forgot">
              <Link to="/forgot-password">{t('auth.forgot_password')}</Link>
            </div>
            <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
              {loading ? (lang === 'fr' ? 'Connexion...' : 'Signing in...') : t('auth.login_btn')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

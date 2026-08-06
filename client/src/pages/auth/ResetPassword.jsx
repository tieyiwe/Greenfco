import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { resetPassword, adminResetPassword } from '../../api/auth';
import PasswordInput from '../../components/PasswordInput';
import './Auth.css';

export default function ResetPassword({ type = 'user' }) {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const isAdmin = type === 'admin';
  const loginPath = isAdmin ? '/admin/login' : '/login';

  if (!token) {
    return (
      <div className="auth-page">
        <div className="auth-side auth-side-brand">
          <Link to="/" className="auth-logo">🌿 <span>Green</span>FCO</Link>
          <div className="auth-brand-content">
            <h2>{lang === 'fr' ? 'Lien invalide' : 'Invalid link'}</h2>
          </div>
        </div>
        <div className="auth-side auth-side-form">
          <div className="auth-form-container">
            <h1>{lang === 'fr' ? 'Lien invalide' : 'Invalid link'}</h1>
            <p style={{ color: '#e53e3e', marginBottom: '1rem' }}>
              {lang === 'fr'
                ? "Ce lien de réinitialisation est invalide ou a expiré."
                : "This reset link is invalid or has expired."}
            </p>
            <Link to={isAdmin ? '/admin/login' : '/forgot-password'} className="btn btn-primary" style={{ display: 'inline-block' }}>
              {lang === 'fr' ? 'Faire une nouvelle demande' : 'Request a new link'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (newPassword.length < 8) {
      setError(lang === 'fr' ? 'Minimum 8 caractères.' : 'Minimum 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(lang === 'fr' ? 'Les mots de passe ne correspondent pas.' : 'Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      if (isAdmin) {
        await adminResetPassword(token, newPassword);
      } else {
        await resetPassword(token, newPassword);
      }
      setDone(true);
      setTimeout(() => navigate(loginPath), 3000);
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message;
      setError(msg || (lang === 'fr' ? 'Erreur. Lien expiré ou invalide.' : 'Error. Link expired or invalid.'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-side auth-side-brand">
        <Link to="/" className="auth-logo">🌿 <span>Green</span>FCO</Link>
        <div className="auth-brand-content">
          <h2>{lang === 'fr' ? 'Nouveau mot de passe' : 'New password'}</h2>
          <p>{lang === 'fr' ? 'Choisissez un mot de passe sécurisé d\'au moins 8 caractères.' : 'Choose a secure password of at least 8 characters.'}</p>
        </div>
        <p className="auth-slogan">"Cultiver un avenir durable, ensemble."</p>
      </div>
      <div className="auth-side auth-side-form">
        <div className="auth-form-container">
          <h1>{lang === 'fr' ? 'Réinitialiser le mot de passe' : 'Reset password'}</h1>
          <p className="auth-subtitle">
            <Link to={loginPath}>← {lang === 'fr' ? 'Retour à la connexion' : 'Back to sign in'}</Link>
          </p>

          {done ? (
            <div className="form-success" style={{ padding: '1.25rem', background: 'var(--green-pale)', borderRadius: 'var(--radius-md)', color: 'var(--green-deep)' }}>
              ✅ {lang === 'fr'
                ? 'Mot de passe réinitialisé ! Redirection en cours…'
                : 'Password reset! Redirecting…'}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Nouveau mot de passe' : 'New password'}</label>
                <PasswordInput
                  className="form-input"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder={lang === 'fr' ? 'Minimum 8 caractères' : 'Minimum 8 characters'}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Confirmer le mot de passe' : 'Confirm password'}</label>
                <PasswordInput
                  className="form-input"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  placeholder={lang === 'fr' ? 'Répétez le mot de passe' : 'Repeat your password'}
                />
              </div>
              {error && (
                <p style={{ color: '#e53e3e', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>
              )}
              <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
                {loading ? '…' : (lang === 'fr' ? 'Enregistrer le nouveau mot de passe' : 'Save new password')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

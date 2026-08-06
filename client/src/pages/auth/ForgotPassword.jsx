import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { forgotPassword } from '../../api/auth';
import './Auth.css';

export default function ForgotPassword() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [resetLink, setResetLink] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await forgotPassword(email);
      if (res.data?.reset_link) setResetLink(res.data.reset_link);
    } catch { /* show generic success regardless */ }
    finally {
      setSent(true);
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-side auth-side-brand">
        <Link to="/" className="auth-logo">🌿 <span>Green</span>FCO</Link>
        <div className="auth-brand-content">
          <h2>{lang === 'fr' ? 'Réinitialisation' : 'Password Reset'}</h2>
          <p>{lang === 'fr' ? "Nous vous enverrons un lien de réinitialisation par e-mail." : "We'll send you a reset link by email."}</p>
        </div>
        <p className="auth-slogan">"Cultiver un avenir durable, ensemble."</p>
      </div>
      <div className="auth-side auth-side-form">
        <div className="auth-form-container">
          <h1>{lang === 'fr' ? 'Mot de passe oublié ?' : 'Forgot password?'}</h1>
          <p className="auth-subtitle">
            <Link to="/login">← {lang === 'fr' ? 'Retour à la connexion' : 'Back to sign in'}</Link>
          </p>
          {sent ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="form-success" style={{ padding: '1.25rem', background: 'var(--green-pale)', borderRadius: 'var(--radius-md)', color: 'var(--green-deep)' }}>
                ✅ {lang === 'fr'
                  ? 'Si un compte existe avec cet e-mail, vous recevrez un lien de réinitialisation sous peu.'
                  : 'If an account exists with this email, you will receive a reset link shortly.'}
              </div>
              {resetLink && (
                <div style={{ padding: '1rem', background: '#fef9c3', borderRadius: 'var(--radius-md)', border: '1px solid #fde047', fontSize: '0.85rem' }}>
                  <p style={{ color: '#854d0e', fontWeight: 600, marginBottom: '0.4rem' }}>
                    {lang === 'fr' ? '⚠ Email non configuré — lien direct :' : '⚠ Email not configured — direct link:'}
                  </p>
                  <a href={resetLink} style={{ color: '#1B4332', wordBreak: 'break-all' }}>{resetLink}</a>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Adresse e-mail' : 'Email address'}</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="example@email.com"
                />
              </div>
              <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
                {loading ? '...' : (lang === 'fr' ? 'Envoyer le lien' : 'Send reset link')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

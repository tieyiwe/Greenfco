import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { register } from '../../api/auth';
import useAuthStore from '../../store/authStore';
import './Auth.css';

const USER_TYPES = ['farmer', 'expert', 'investor', 'organization'];

export default function Register() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const navigate = useNavigate();
  const setAuth = useAuthStore(s => s.setAuth);
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirm_password: '',
    country: '', user_type: 'farmer', language: lang,
  });
  const [marketRole, setMarketRole] = useState('buyer'); // 'buyer' | 'seller'
  const [sellerLocation, setSellerLocation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm_password) {
      setError(lang === 'fr' ? 'Les mots de passe ne correspondent pas.' : 'Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');

    // Save seller location to localStorage if role = seller
    if (marketRole === 'seller') {
      const existing = (() => { try { return JSON.parse(localStorage.getItem('greenfco_seller_profile')) || {}; } catch { return {}; } })();
      const sellerProfile = { ...existing, location: sellerLocation, memberSince: new Date().getFullYear().toString() };
      localStorage.setItem('greenfco_seller_profile', JSON.stringify(sellerProfile));
    }

    try {
      const res = await register({ ...form, market_role: marketRole });
      setAuth(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || (lang === 'fr' ? 'Erreur lors de la création du compte.' : 'Account creation failed.'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-side auth-side-brand">
        <Link to="/" className="auth-logo">🌿 <span>Green</span>FCO</Link>
        <div className="auth-brand-content">
          <h2>{lang === 'fr' ? 'Rejoignez la communauté' : 'Join the community'}</h2>
          <p>
            {lang === 'fr'
              ? "Agriculteurs, experts, investisseurs, organisations — GreenFCO rassemble tous les acteurs de l'agro-environnement."
              : "Farmers, experts, investors, organizations — GreenFCO brings together all agro-environmental actors."}
          </p>
          <div className="auth-brand-features">
            {(lang === 'fr'
              ? ['🌱 Agriculteur / Agripreneur', '🔬 Expert / Consultant', '💼 Investisseur', '🏢 Organisation / ONG']
              : ['🌱 Farmer / Agripreneur', '🔬 Expert / Consultant', '💼 Investor', '🏢 Organization / NGO']
            ).map(f => (
              <div key={f} className="auth-feature">{f}</div>
            ))}
          </div>
        </div>
        <p className="auth-slogan">"Cultiver un avenir durable, ensemble."</p>
      </div>

      <div className="auth-side auth-side-form">
        <div className="auth-form-container">
          <h1>{t('auth.register_title')}</h1>
          <p className="auth-subtitle">
            {t('auth.have_account')} <Link to="/login">{t('nav.login')}</Link>
          </p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">{t('auth.name')} *</label>
              <input type="text" name="name" className="form-input" value={form.name} onChange={handleChange} required placeholder="Jean Ouédraogo" />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">{t('auth.email')} *</label>
                <input type="email" name="email" className="form-input" value={form.email} onChange={handleChange} required placeholder="jean@email.com" />
              </div>
              <div className="form-group">
                <label className="form-label">{t('auth.country')}</label>
                <input type="text" name="country" className="form-input" value={form.country} onChange={handleChange} placeholder="Burkina Faso" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">{t('auth.user_type')} *</label>
              <select name="user_type" className="form-select" value={form.user_type} onChange={handleChange}>
                {USER_TYPES.map(type => (
                  <option key={type} value={type}>{t(`auth.${type}`)}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">{lang === 'fr' ? 'Je souhaite utiliser la plateforme comme' : 'I want to use the platform as'} *</label>
              <select className="form-select" value={marketRole} onChange={e => setMarketRole(e.target.value)}>
                <option value="buyer">{lang === 'fr' ? 'Acheteur (je cherche des produits)' : 'Buyer (I look for products)'}</option>
                <option value="seller">{lang === 'fr' ? 'Vendeur (je vends des produits)' : 'Seller (I sell products)'}</option>
              </select>
            </div>
            {marketRole === 'seller' && (
              <div className="form-group">
                <label className="form-label">
                  {lang === 'fr' ? 'Localisation (ville / région)' : 'Location (city / region)'}
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={sellerLocation}
                  onChange={e => setSellerLocation(e.target.value)}
                  placeholder={lang === 'fr' ? 'Ex : Ouagadougou, Plateau Central' : 'E.g. Ouagadougou, Plateau Central'}
                />
              </div>
            )}
            <div className="form-group">
              <label className="form-label">{t('auth.language_pref')}</label>
              <select name="language" className="form-select" value={form.language} onChange={handleChange}>
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">{t('auth.password')} *</label>
                <input type="password" name="password" className="form-input" value={form.password} onChange={handleChange} required placeholder="••••••••" minLength={8} />
              </div>
              <div className="form-group">
                <label className="form-label">{t('auth.confirm_password')} *</label>
                <input type="password" name="confirm_password" className="form-input" value={form.confirm_password} onChange={handleChange} required placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
              {loading ? (lang === 'fr' ? 'Création...' : 'Creating...') : t('auth.register_btn')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

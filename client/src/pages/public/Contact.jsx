import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../api/client';
import './Contact.css';

function setMeta(title, description) {
  document.title = title;
  const el = document.querySelector('meta[name="description"]');
  if (el) el.setAttribute('content', description);
}

export default function Contact() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', country: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lang === 'fr') {
      setMeta(
        'Contact | GreenFCO — Parlons de Votre Projet Agricole',
        "Contactez GreenFCO pour discuter de votre projet agro-environnemental. Notre équipe d'experts est basée à Ouagadougou, Burkina Faso et disponible du lundi au vendredi."
      );
    } else {
      setMeta(
        "Contact | GreenFCO — Let's Talk About Your Agricultural Project",
        "Contact GreenFCO to discuss your agro-environmental project. Our team of experts is based in Ouagadougou, Burkina Faso and available Monday to Friday."
      );
    }
  }, [lang]);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '', country: '' });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="contact-page">
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container">
          <span className="eyebrow">{t('contact.title')}</span>
          <h1>{lang === 'fr' ? 'Parlons de Votre Projet' : "Let's Talk About Your Project"}</h1>
          <p>{t('contact.subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-layout">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="info-block card">
              <div className="info-icon">📍</div>
              <h3>{lang === 'fr' ? 'Adresse' : 'Address'}</h3>
              <p>Ouagadougou, Burkina Faso</p>
              <p>{lang === 'fr' ? 'Afrique de l\'Ouest' : 'West Africa'}</p>
            </div>

            <div className="info-block card">
              <div className="info-icon">✉️</div>
              <h3>Email</h3>
              <a href="mailto:info@greenfco.com">info@greenfco.com</a>
            </div>

            <div className="info-block card whatsapp-block">
              <div className="info-icon">💬</div>
              <h3>WhatsApp</h3>
              <p>{lang === 'fr' ? 'Canal de communication privilégié' : 'Preferred communication channel'}</p>
              <a
                href="https://wa.me/22600000000"
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
              >
                💬 {t('contact.whatsapp')}
              </a>
            </div>

            <div className="info-block card">
              <div className="info-icon">🕐</div>
              <h3>{lang === 'fr' ? 'Disponibilité' : 'Availability'}</h3>
              <p>
                {lang === 'fr'
                  ? 'Lundi – Vendredi : 8h00 – 18h00 (GMT+0)'
                  : 'Monday – Friday: 8:00 AM – 6:00 PM (GMT+0)'}
              </p>
            </div>

            {/* Map Placeholder */}
            <div className="map-placeholder">
              <div className="img-placeholder" style={{ height: '250px', borderRadius: 'var(--radius-lg)' }}>
                <span>
                  🗺️ {lang === 'fr' ? 'Carte — Ouagadougou, Burkina Faso' : 'Map — Ouagadougou, Burkina Faso'}
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--gray-mid)', marginTop: '0.5rem', textAlign: 'center' }}>
                {lang === 'fr' ? 'Ouagadougou, Burkina Faso · +226 XX XX XX XX' : 'Ouagadougou, Burkina Faso · +226 XX XX XX XX'}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="card" style={{ padding: '2.5rem' }}>
              <h2 style={{ marginBottom: '0.5rem' }}>
                {lang === 'fr' ? 'Envoyez-nous un message' : 'Send us a message'}
              </h2>
              <p style={{ color: 'var(--gray-mid)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                {lang === 'fr'
                  ? "Nous vous répondons sous 24-48h (jours ouvrés)."
                  : "We respond within 24-48h (business days)."}
              </p>

              {status === 'success' && (
                <div className="form-success">
                  ✅ {t('contact.success')}
                </div>
              )}

              {status === 'error' && (
                <div className="form-error">
                  ❌ {t('contact.error')}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">{t('contact.form_name')} *</label>
                    <input
                      type="text"
                      name="name"
                      className="form-input"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder={lang === 'fr' ? 'Votre nom complet' : 'Your full name'}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('contact.form_country')}</label>
                    <input
                      type="text"
                      name="country"
                      className="form-input"
                      value={form.country}
                      onChange={handleChange}
                      placeholder={lang === 'fr' ? 'Burkina Faso' : 'Burkina Faso'}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">{t('contact.form_email')} *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="example@email.com"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('contact.form_subject')} *</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-input"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder={lang === 'fr' ? 'Sujet de votre message' : 'Subject of your message'}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('contact.form_message')} *</label>
                  <textarea
                    name="message"
                    className="form-input"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder={lang === 'fr' ? 'Décrivez votre projet ou votre demande...' : 'Describe your project or request...'}
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
                  {loading ? (lang === 'fr' ? 'Envoi...' : 'Sending...') : t('contact.form_submit')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Consulting.css';

const COUNTRIES = [
  'Bénin', 'Burkina Faso', 'Cameroun', 'Côte d\'Ivoire', 'Gambie',
  'Ghana', 'Guinée', 'Guinée-Bissau', 'Liberia', 'Mali', 'Mauritanie',
  'Niger', 'Nigeria', 'Sénégal', 'Sierra Leone', 'Togo',
  'Afrique du Sud', 'Kenya', 'Éthiopie', 'Tanzanie', 'Rwanda',
  'France', 'Belgique', 'Canada', 'Autre / Other',
];

const SERVICES = [
  {
    key: 'sol',
    icon: '🌱',
    fr: 'Analyse de sol & fertilité',
    en: 'Soil & Fertility Analysis',
    duration: '30 min',
    price_fr: 'Gratuit — 1ère session',
    price_en: 'Free — 1st session',
    free: true,
    desc_fr: 'Évaluation complète de vos sols pour optimiser la fertilité et les rendements.',
    desc_en: 'Complete evaluation of your soils to optimize fertility and yields.',
  },
  {
    key: 'business',
    icon: '📋',
    fr: 'Plan d\'affaires agricole',
    en: 'Agricultural Business Plan',
    duration: '60 min',
    price_fr: '15 000 FCFA',
    price_en: '15,000 FCFA',
    free: false,
    desc_fr: 'Élaboration d\'un plan d\'affaires solide pour votre projet agro-entrepreneurial.',
    desc_en: 'Development of a solid business plan for your agro-entrepreneurial project.',
  },
  {
    key: 'irrigation',
    icon: '💧',
    fr: 'Stratégie d\'irrigation',
    en: 'Irrigation Strategy',
    duration: '45 min',
    price_fr: '10 000 FCFA',
    price_en: '10,000 FCFA',
    free: false,
    desc_fr: 'Conception de systèmes d\'irrigation adaptés à votre contexte et à vos ressources.',
    desc_en: 'Design of irrigation systems adapted to your context and resources.',
  },
  {
    key: 'cultures',
    icon: '🌾',
    fr: 'Gestion des cultures',
    en: 'Crop Management',
    duration: '45 min',
    price_fr: '12 000 FCFA',
    price_en: '12,000 FCFA',
    free: false,
    desc_fr: 'Stratégies de gestion pour maximiser vos rendements de manière durable.',
    desc_en: 'Management strategies to maximize your yields sustainably.',
  },
];

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00',
];

const WHY_ITEMS = [
  {
    icon: '🌍',
    fr_title: 'Expertise locale',
    en_title: 'Local expertise',
    fr_desc: 'Nos experts connaissent les réalités agro-climatiques et économiques de l\'Afrique de l\'Ouest.',
    en_desc: 'Our experts know the agro-climatic and economic realities of West Africa.',
  },
  {
    icon: '📅',
    fr_title: 'Disponibilité',
    en_title: 'Availability',
    fr_desc: 'Sessions disponibles 6 jours sur 7, en Français et en Anglais, en présentiel ou à distance.',
    en_desc: 'Sessions available 6 days a week, in French and English, in person or remotely.',
  },
  {
    icon: '✅',
    fr_title: 'Résultats prouvés',
    en_title: 'Proven results',
    fr_desc: 'Des centaines d\'agripreneurs accompagnés, avec des améliorations mesurables de rentabilité.',
    en_desc: 'Hundreds of agripreneurs supported, with measurable profitability improvements.',
  },
];

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  country: '',
  service: '',
  date: '',
  time: '',
  message: '',
  language: 'fr',
};

export default function Consulting() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const [form, setForm] = useState({ ...EMPTY_FORM, language: lang });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const today = new Date().toISOString().split('T')[0];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = lang === 'fr' ? 'Nom requis' : 'Name required';
    if (!form.email.trim()) {
      newErrors.email = lang === 'fr' ? 'Email requis' : 'Email required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = lang === 'fr' ? 'Email invalide' : 'Invalid email';
    }
    if (!form.phone.trim()) newErrors.phone = lang === 'fr' ? 'Téléphone requis' : 'Phone required';
    if (!form.country) newErrors.country = lang === 'fr' ? 'Pays requis' : 'Country required';
    if (!form.service) newErrors.service = lang === 'fr' ? 'Service requis' : 'Service required';
    if (!form.date) newErrors.date = lang === 'fr' ? 'Date requise' : 'Date required';
    if (!form.time) newErrors.time = lang === 'fr' ? 'Créneau requis' : 'Time slot required';
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    // Simulate slight async save
    setTimeout(() => {
      const appointment = {
        ...form,
        id: `consult_${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'pending',
      };

      try {
        const existing = JSON.parse(localStorage.getItem('greenfco_consulting_requests') || '[]');
        existing.push(appointment);
        localStorage.setItem('greenfco_consulting_requests', JSON.stringify(existing));
      } catch (_) {
        // localStorage unavailable — silently skip
      }

      setSubmittedData(appointment);
      setSubmitted(true);
      setSubmitting(false);
    }, 600);
  }

  function handleReset() {
    setForm({ ...EMPTY_FORM, language: lang });
    setErrors({});
    setSubmitted(false);
    setSubmittedData(null);
  }

  const selectedService = SERVICES.find(s => s.key === form.service);

  return (
    <main className="consulting-page">

      {/* ── Hero ── */}
      <section className="consulting-hero">
        <div className="container">
          <span className="eyebrow">
            {lang === 'fr' ? 'Consultation Agro-Environnementale' : 'Agro-Environmental Consulting'}
          </span>
          <h1>
            {lang === 'fr'
              ? 'Réservez une Session avec nos Experts'
              : 'Book a Session with our Experts'}
          </h1>
          <p>
            {lang === 'fr'
              ? 'Réservez une session avec nos experts en agriculture durable et transformez votre projet agricole.'
              : 'Book a session with our sustainable agriculture experts and transform your agricultural project.'}
          </p>
          <div className="hero-badges">
            <span className="hero-badge">🕐 {lang === 'fr' ? 'Réponse sous 24h' : 'Response within 24h'}</span>
            <span className="hero-badge">🌍 {lang === 'fr' ? 'Français & Anglais' : 'French & English'}</span>
            <span className="hero-badge">💻 {lang === 'fr' ? 'En ligne ou présentiel' : 'Online or in-person'}</span>
          </div>
        </div>
      </section>

      {/* ── Services cards ── */}
      <section className="consulting-services-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="eyebrow">{lang === 'fr' ? 'Nos services' : 'Our services'}</span>
            <h2>{lang === 'fr' ? 'Choisissez votre type de consultation' : 'Choose your consultation type'}</h2>
            <div className="divider" />
          </div>
          <div className="consulting-services-grid">
            {SERVICES.map(svc => (
              <div
                key={svc.key}
                className="consulting-service-card"
                onClick={() => setForm(prev => ({ ...prev, service: svc.key }))}
                role="button"
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setForm(prev => ({ ...prev, service: svc.key })); }}
                style={form.service === svc.key ? { borderColor: '#1B4332', boxShadow: '0 8px 28px rgba(27,67,50,0.18)' } : {}}
              >
                <div className="csc-icon">{svc.icon}</div>
                <h3 className="csc-title">{lang === 'fr' ? svc.fr : svc.en}</h3>
                <div className="csc-duration">⏱ {svc.duration}</div>
                <p className="csc-desc">{lang === 'fr' ? svc.desc_fr : svc.desc_en}</p>
                <span className={`csc-price${svc.free ? ' free' : ''}`}>
                  {lang === 'fr' ? svc.price_fr : svc.price_en}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking form ── */}
      <section className="consulting-booking-section">
        <div className="container">
          <div className="consulting-layout">

            {/* Left info col */}
            <div className="consulting-info-col">
              <h2>{lang === 'fr' ? 'Comment ça marche ?' : 'How does it work?'}</h2>
              <p>
                {lang === 'fr'
                  ? 'Remplissez le formulaire de réservation. Notre équipe examinera votre demande et vous contactera pour confirmer la date et les détails de la session.'
                  : 'Fill in the booking form. Our team will review your request and contact you to confirm the date and session details.'}
              </p>
              <div className="info-steps">
                {(lang === 'fr'
                  ? [
                    'Remplissez le formulaire avec vos coordonnées et le service souhaité.',
                    'Notre équipe vous contacte sous 24 heures pour confirmer.',
                    'Participez à votre session de consultation personnalisée.',
                    'Recevez un rapport de recommandations et un plan d\'action.',
                  ]
                  : [
                    'Fill in the form with your details and desired service.',
                    'Our team contacts you within 24 hours to confirm.',
                    'Participate in your personalized consultation session.',
                    'Receive a recommendations report and action plan.',
                  ]
                ).map((step, i) => (
                  <div key={i} className="info-step">
                    <div className="step-num">{i + 1}</div>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right form col */}
            <div className="consulting-form-card">
              {submitted ? (
                <div className="success-message">
                  <div className="success-checkmark">
                    <svg viewBox="0 0 24 24">
                      <path d="M4 12l6 6L20 6" />
                    </svg>
                  </div>
                  <h3>
                    {lang === 'fr' ? 'Demande soumise avec succès !' : 'Request submitted successfully!'}
                  </h3>
                  <p>
                    {lang === 'fr'
                      ? 'Votre demande a été soumise ! Notre équipe vous contactera sous 24h pour confirmer votre rendez-vous.'
                      : 'Your request has been submitted! Our team will contact you within 24h to confirm your appointment.'}
                  </p>
                  {submittedData && (
                    <div className="success-meta">
                      <span>👤 {submittedData.name}</span>
                      <span>📧 {submittedData.email}</span>
                      {selectedService && (
                        <span>🌿 {lang === 'fr' ? selectedService.fr : selectedService.en}</span>
                      )}
                      <span>📅 {submittedData.date} — {submittedData.time}</span>
                    </div>
                  )}
                  <div className="success-actions">
                    <button className="btn-reset" onClick={handleReset}>
                      {lang === 'fr' ? 'Nouvelle réservation' : 'New booking'}
                    </button>
                    <Link to="/services" className="btn-outline-green">
                      {lang === 'fr' ? 'Voir nos services' : 'View our services'}
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="form-card-title">
                    📅 {lang === 'fr' ? 'Réserver une consultation' : 'Book a consultation'}
                  </div>
                  <form className="consulting-form" onSubmit={handleSubmit} noValidate>

                    {/* Name + Email */}
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">
                          {lang === 'fr' ? 'Nom complet' : 'Full name'}
                          <span className="req">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          className={`form-input${errors.name ? ' error' : ''}`}
                          value={form.name}
                          onChange={handleChange}
                          placeholder={lang === 'fr' ? 'Jean Ouédraogo' : 'Jean Ouédraogo'}
                        />
                        {errors.name && <span className="field-error">{errors.name}</span>}
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          Email<span className="req">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          className={`form-input${errors.email ? ' error' : ''}`}
                          value={form.email}
                          onChange={handleChange}
                          placeholder="jean@email.com"
                        />
                        {errors.email && <span className="field-error">{errors.email}</span>}
                      </div>
                    </div>

                    {/* Phone + Country */}
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">
                          {lang === 'fr' ? 'Téléphone' : 'Phone number'}
                          <span className="req">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          className={`form-input${errors.phone ? ' error' : ''}`}
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+226 70 00 00 00"
                        />
                        {errors.phone && <span className="field-error">{errors.phone}</span>}
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          {lang === 'fr' ? 'Pays' : 'Country'}
                          <span className="req">*</span>
                        </label>
                        <select
                          name="country"
                          className={`form-select${errors.country ? ' error' : ''}`}
                          value={form.country}
                          onChange={handleChange}
                        >
                          <option value="">{lang === 'fr' ? '— Sélectionner —' : '— Select —'}</option>
                          {COUNTRIES.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        {errors.country && <span className="field-error">{errors.country}</span>}
                      </div>
                    </div>

                    {/* Service */}
                    <div className="form-group">
                      <label className="form-label">
                        {lang === 'fr' ? 'Type de consultation' : 'Consultation type'}
                        <span className="req">*</span>
                      </label>
                      <select
                        name="service"
                        className={`form-select${errors.service ? ' error' : ''}`}
                        value={form.service}
                        onChange={handleChange}
                      >
                        <option value="">{lang === 'fr' ? '— Choisir un service —' : '— Choose a service —'}</option>
                        {SERVICES.map(svc => (
                          <option key={svc.key} value={svc.key}>
                            {lang === 'fr' ? svc.fr : svc.en} ({svc.duration} — {lang === 'fr' ? svc.price_fr : svc.price_en})
                          </option>
                        ))}
                      </select>
                      {errors.service && <span className="field-error">{errors.service}</span>}
                    </div>

                    {/* Date + Time */}
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">
                          {lang === 'fr' ? 'Date souhaitée' : 'Preferred date'}
                          <span className="req">*</span>
                        </label>
                        <input
                          type="date"
                          name="date"
                          className={`form-input${errors.date ? ' error' : ''}`}
                          value={form.date}
                          min={today}
                          onChange={handleChange}
                        />
                        {errors.date && <span className="field-error">{errors.date}</span>}
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          {lang === 'fr' ? 'Créneau horaire' : 'Time slot'}
                          <span className="req">*</span>
                        </label>
                        <select
                          name="time"
                          className={`form-select${errors.time ? ' error' : ''}`}
                          value={form.time}
                          onChange={handleChange}
                        >
                          <option value="">{lang === 'fr' ? '— Choisir —' : '— Choose —'}</option>
                          {TIME_SLOTS.map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        {errors.time && <span className="field-error">{errors.time}</span>}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="form-group">
                      <label className="form-label">
                        {lang === 'fr' ? 'Description / Message' : 'Description / Message'}
                      </label>
                      <textarea
                        name="message"
                        className="form-textarea"
                        value={form.message}
                        onChange={handleChange}
                        placeholder={
                          lang === 'fr'
                            ? 'Décrivez votre situation, vos objectifs ou vos questions...'
                            : 'Describe your situation, objectives, or questions...'
                        }
                        rows={3}
                      />
                    </div>

                    {/* Language preference */}
                    <div className="form-group">
                      <label className="form-label">
                        {lang === 'fr' ? 'Langue préférée' : 'Language preference'}
                      </label>
                      <div className="lang-toggle">
                        <button
                          type="button"
                          className={`lang-btn${form.language === 'fr' ? ' active' : ''}`}
                          onClick={() => setForm(prev => ({ ...prev, language: 'fr' }))}
                        >
                          Français
                        </button>
                        <button
                          type="button"
                          className={`lang-btn${form.language === 'en' ? ' active' : ''}`}
                          onClick={() => setForm(prev => ({ ...prev, language: 'en' }))}
                        >
                          English
                        </button>
                      </div>
                    </div>

                    <button type="submit" className="submit-btn" disabled={submitting}>
                      {submitting
                        ? (lang === 'fr' ? 'Envoi en cours...' : 'Sending...')
                        : (lang === 'fr' ? '📅 Soumettre ma demande' : '📅 Submit my request')}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why choose us ── */}
      <section className="consulting-why-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="eyebrow" style={{ background: 'rgba(255,255,255,0.15)', color: '#B7E4C7', border: '1px solid rgba(255,255,255,0.2)' }}>
              {lang === 'fr' ? 'Pourquoi nous choisir' : 'Why choose us'}
            </span>
            <h2 style={{ color: '#fff' }}>
              {lang === 'fr' ? 'L\'expertise GreenFCO à votre service' : 'GreenFCO expertise at your service'}
            </h2>
            <div className="divider" style={{ background: 'rgba(255,255,255,0.3)' }} />
          </div>
          <div className="why-grid">
            {WHY_ITEMS.map((item, i) => (
              <div key={i} className="why-card">
                <span className="why-icon">{item.icon}</span>
                <h3>{lang === 'fr' ? item.fr_title : item.en_title}</h3>
                <p>{lang === 'fr' ? item.fr_desc : item.en_desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

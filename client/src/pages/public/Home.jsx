import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../api/client';
import './Home.css';

function setMeta(title, description) {
  document.title = title;
  const el = document.querySelector('meta[name="description"]');
  if (el) el.setAttribute('content', description);
}

const SERVICES = [
  { key: 'conseil', icon: '🤝', color: '#1B4332' },
  { key: 'negoce', icon: '🌾', color: '#2D6A4F' },
  { key: 'formations', icon: '📚', color: '#52B788' },
  { key: 'etudes', icon: '🔬', color: '#8B5E3C' },
  { key: 'hydro', icon: '💧', color: '#2D6A4F' },
  { key: 'intrants', icon: '🌱', color: '#1B4332' },
  { key: 'projets', icon: '📋', color: '#52B788' },
];

const BLOG_PREVIEW = {
  slug: 'interview-elie-dipama-lefaso',
  title_fr: "L'Agriculture Intelligente au Burkina Faso : Vision et Ambition de GreenFCO",
  title_en: "Smart Agriculture in Burkina Faso: GreenFCO's Vision and Ambition",
  category: 'Actualités',
  author: 'Wenmanegda Elie DIPAMA',
  date: '2024-03-15',
  excerpt_fr: "Elie Dipama, co-fondateur de GreenFCO et Fellow Humboldt 2025, partage sa vision pour une agriculture durable et innovante en Afrique de l'Ouest.",
  excerpt_en: "Elie Dipama, co-founder of GreenFCO and 2025 Humboldt Fellow, shares his vision for sustainable and innovative agriculture in West Africa.",
};

export default function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lang === 'fr') {
      setMeta(
        'GreenFCO — Green Field Consortium | Agriculture Durable en Afrique',
        "Green Field Consortium (GreenFCO) — Plateforme agro-environnementale pour l'Afrique francophone. Conseil, formations, négoce et innovations agricoles durables au Burkina Faso et en Afrique de l'Ouest."
      );
    } else {
      setMeta(
        'GreenFCO — Green Field Consortium | Sustainable Agriculture in West Africa',
        'Green Field Consortium (GreenFCO) — Agro-environmental platform for West Africa. Advisory, training, trade, and sustainable agricultural innovations in Burkina Faso and across West Africa.'
      );
    }
  }, [lang]);

  async function handleNewsletter(e) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await api.post('/newsletter/subscribe', { email, language: lang });
      setSubscribed(true);
    } catch {
      setSubscribed(true); // graceful
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-photo" aria-hidden="true" />
          <div className="hero-overlay" aria-hidden="true" />
        </div>
        <div className="hero-content container">
          <div className="hero-eyebrow">
            <span className="badge badge-green">🌍 Afrique Francophone</span>
          </div>
          <h1 className="hero-slogan">{t('hero.slogan')}</h1>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>
          <div className="hero-cta">
            <Link to="/services" className="btn btn-primary btn-lg">
              {t('hero.cta_primary')}
            </Link>
            <Link to="/register" className="btn btn-secondary btn-lg">
              {t('hero.cta_secondary')}
            </Link>
          </div>
        </div>
        <div className="hero-scroll">
          <span>↓</span>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <StatItem label={t('stats.founded')} icon="📅" />
            <StatItem label={t('stats.fellows')} icon="🏅" />
            <StatItem label={t('stats.services')} icon="🌿" />
            <StatItem label={t('stats.presence')} icon="🌍" />
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section" id="services">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">{t('services.title')}</span>
            <h2>{lang === 'fr' ? 'Ce que nous faisons' : 'What We Do'}</h2>
            <div className="divider" />
            <p>{t('services.subtitle')}</p>
          </div>
          <div className="services-grid">
            {SERVICES.map((svc) => (
              <ServiceCard key={svc.key} service={svc} t={t} />
            ))}
          </div>
          <div className="services-cta">
            <Link to="/services" className="btn btn-secondary">
              {t('common.view_all')} services →
            </Link>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="who-we-are section">
        <div className="container">
          <div className="who-grid">
            <div className="who-image">
              <div className="img-placeholder" style={{ height: '420px' }}>
                <span>Photo co-fondateurs — 800×600px</span>
              </div>
              <div className="who-badge">
                <span>🏅</span>
                <span>Fondé au Burkina Faso · 2021</span>
              </div>
            </div>
            <div className="who-content">
              <span className="eyebrow">{t('about.title')}</span>
              <h2>{lang === 'fr' ? 'Deux frères, une mission' : 'Two Brothers, One Mission'}</h2>
              <div className="divider divider-left" />
              <p>
                {lang === 'fr'
                  ? "Fondée le 7 octobre 2021 par Elie et Elisée Dipama, Green Field Consortium (GreenFCO) est une entreprise agro-environnementale engagée dans la transformation durable du secteur agricole en Afrique francophone."
                  : "Founded on October 7, 2021 by Elie and Elisée Dipama, Green Field Consortium (GreenFCO) is an agro-environmental enterprise committed to the sustainable transformation of the agricultural sector in Francophone Africa."}
              </p>
              <p>
                {lang === 'fr'
                  ? "Portée par un double palmarès international — Mandela Washington Fellowship (YALI, Purdue 2023) et Alexander von Humboldt Foundation Fellowship (2025) — l'équipe GreenFCO allie expertise académique et terrain."
                  : "Backed by dual international recognition — Mandela Washington Fellowship (YALI, Purdue 2023) and Alexander von Humboldt Foundation Fellowship (2025) — the GreenFCO team combines academic expertise with field experience."}
              </p>
              <div className="who-fellowships">
                <div className="fellowship-badge">
                  <span>🏅</span>
                  <div>
                    <strong>Mandela Washington Fellow</strong>
                    <span>YALI · Purdue University · 2023</span>
                  </div>
                </div>
                <div className="fellowship-badge">
                  <span>🏅</span>
                  <div>
                    <strong>Alexander von Humboldt Fellow</strong>
                    <span>International Climate Protection · 2025</span>
                  </div>
                </div>
              </div>
              <Link to="/about" className="btn btn-primary">
                {t('common.learn_more')} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section blog-preview-section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Blog</span>
            <h2>{lang === 'fr' ? 'Dernière publication' : 'Latest Article'}</h2>
            <div className="divider" />
          </div>
          <div className="blog-preview-card card">
            <div className="blog-preview-inner">
              <div className="blog-preview-meta">
                <span className="badge badge-green">{BLOG_PREVIEW.category}</span>
                <span className="blog-date">
                  {new Date(BLOG_PREVIEW.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </span>
              </div>
              <h3>{BLOG_PREVIEW[`title_${lang}`]}</h3>
              <p>{BLOG_PREVIEW[`excerpt_${lang}`]}</p>
              <div className="blog-preview-author">
                <div className="author-avatar">{BLOG_PREVIEW.author.charAt(0)}</div>
                <span>{BLOG_PREVIEW.author}</span>
              </div>
              <Link to={`/blog/${BLOG_PREVIEW.slug}`} className="btn btn-secondary btn-sm">
                {t('blog.read_more')} →
              </Link>
            </div>
            <div className="blog-preview-image">
              <div className="img-placeholder" style={{ height: '100%', minHeight: '280px' }}>
                <span>Image article — 600×400px</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/blog" className="btn btn-secondary">
              {t('common.view_all')} articles →
            </Link>
          </div>
        </div>
      </section>

      {/* Innovation Preview */}
      <section className="section innovation-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Innovation</span>
            <h2>{lang === 'fr' ? 'En cours de développement' : 'In Development'}</h2>
            <div className="divider" />
            <p>
              {lang === 'fr'
                ? "Deux innovations majeures en préparation pour révolutionner l'agriculture en Afrique de l'Ouest."
                : "Two major innovations in preparation to revolutionize agriculture in West Africa."}
            </p>
          </div>
          <div className="grid-2">
            <div className="card innovation-card">
              <div className="innovation-icon">📱</div>
              <div className="badge badge-earth" style={{ marginBottom: '0.75rem' }}>
                {t('common.coming_soon')}
              </div>
              <h3>Koob Assist</h3>
              <p>
                {lang === 'fr'
                  ? "Application mobile d'assistance-conseil pour les entrepreneurs agricoles. Diagnostic, planification et suivi de votre activité, accessible depuis votre smartphone."
                  : "Mobile advisory app for agricultural entrepreneurs. Diagnosis, planning, and tracking of your business, accessible from your smartphone."}
              </p>
            </div>
            <div className="card innovation-card">
              <div className="innovation-icon">🌿</div>
              <div className="badge badge-earth" style={{ marginBottom: '0.75rem' }}>
                {t('common.in_development')}
              </div>
              <h3>BioGrowth</h3>
              <p>
                {lang === 'fr'
                  ? "Bio-fertilisant liquide innovant, conçu pour les sols ouest-africains. Une solution organique performante pour améliorer vos rendements tout en préservant l'environnement."
                  : "Innovative liquid bio-fertilizer designed for West African soils. A high-performance organic solution to improve your yields while preserving the environment."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-inner">
            <div className="newsletter-text">
              <h2>{t('blog.newsletter_cta')}</h2>
              <p>{t('blog.newsletter_text')}</p>
            </div>
            {subscribed ? (
              <div className="newsletter-success">
                <span>✅</span>
                <p>
                  {lang === 'fr'
                    ? 'Merci pour votre inscription !'
                    : 'Thank you for subscribing!'}
                </p>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleNewsletter}>
                <input
                  type="email"
                  className="form-input"
                  placeholder={lang === 'fr' ? 'Votre adresse e-mail' : 'Your email address'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? '...' : lang === 'fr' ? "S'abonner" : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function StatItem({ icon, label }) {
  return (
    <div className="stat-item">
      <span className="stat-icon">{icon}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function ServiceCard({ service, t }) {
  return (
    <div className="service-card card">
      <div className="service-icon" style={{ background: service.color + '15', color: service.color }}>
        {service.icon}
      </div>
      <h3 className="service-title">{t(`services.${service.key}.title`)}</h3>
      <p className="service-desc">{t(`services.${service.key}.desc`)}</p>
      <Link to="/services" className="service-link">
        {t(`services.${service.key}.cta`)} →
      </Link>
    </div>
  );
}

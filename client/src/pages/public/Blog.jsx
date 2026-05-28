import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Blog.css';

const ARTICLES = [
  {
    slug: 'interview-elie-dipama-lefaso',
    title_fr: "L'Agriculture Intelligente au Burkina Faso : Vision et Ambition de GreenFCO",
    title_en: "Smart Agriculture in Burkina Faso: GreenFCO's Vision and Ambition",
    excerpt_fr: "Dans une interview accordée à Lefaso.net, Elie Dipama, co-fondateur de GreenFCO et Fellow Humboldt 2025, partage sa vision pour une agriculture durable et innovante en Afrique de l'Ouest, son parcours exceptionnel et les projets de GreenFCO.",
    excerpt_en: "In an interview given to Lefaso.net, Elie Dipama, co-founder of GreenFCO and 2025 Humboldt Fellow, shares his vision for sustainable and innovative agriculture in West Africa, his exceptional journey, and GreenFCO's projects.",
    category: 'Actualités',
    author: 'Wenmanegda Elie DIPAMA',
    date: '2024-03-15',
    featured: true,
    readTime: '8 min',
  },
  {
    slug: 'agroecologie-burkina-faso-enjeux',
    title_fr: "Agroécologie au Burkina Faso : Enjeux et Perspectives pour 2025",
    title_en: "Agroecology in Burkina Faso: Challenges and Prospects for 2025",
    excerpt_fr: "Le Burkina Faso fait face à des défis climatiques et sécuritaires sans précédent. L'agroécologie émerge comme une réponse adaptée aux réalités du terrain sahélien.",
    excerpt_en: "Burkina Faso faces unprecedented climate and security challenges. Agroecology is emerging as a response adapted to Sahelian field realities.",
    category: 'Agriculture Durable',
    author: 'GreenFCO Team',
    date: '2024-04-10',
    featured: false,
    readTime: '6 min',
  },
  {
    slug: 'finance-carbone-afrique-opportunites',
    title_fr: "Finance Carbone en Afrique de l'Ouest : Opportunités pour les Agriculteurs",
    title_en: "Carbon Finance in West Africa: Opportunities for Farmers",
    excerpt_fr: "Les marchés volontaires du carbone ouvrent de nouvelles sources de revenus pour les agriculteurs africains pratiquant l'agroforesterie et les pratiques régénératives.",
    excerpt_en: "Voluntary carbon markets open new revenue streams for African farmers practicing agroforestry and regenerative practices.",
    category: 'Recherche & Innovation',
    author: 'Wenmanegda Elie DIPAMA',
    date: '2024-05-22',
    featured: false,
    readTime: '7 min',
  },
  {
    slug: 'faidherbia-albida-sahel',
    title_fr: "Faidherbia Albida : L'Arbre du Sahel qui Nourrit les Champs",
    title_en: "Faidherbia Albida: The Sahel Tree that Feeds the Fields",
    excerpt_fr: "Cette espèce agroforestière emblématique du Sahel joue un rôle crucial dans la fertilité des sols et l'adaptation au changement climatique. Un guide pratique.",
    excerpt_en: "This emblematic Sahelian agroforestry species plays a crucial role in soil fertility and climate change adaptation. A practical guide.",
    category: 'Environnement',
    author: 'GreenFCO Team',
    date: '2024-06-08',
    featured: false,
    readTime: '5 min',
  },
];

const CATEGORIES = ['Tous', 'Actualités', 'Recherche & Innovation', 'Agriculture Durable', 'Environnement'];

export default function Blog() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featured = ARTICLES.find(a => a.featured);
  const filtered = ARTICLES.filter(a =>
    !a.featured && (activeCategory === 'Tous' || a.category === activeCategory)
  );

  function handleSubscribe(e) {
    e.preventDefault();
    setSubscribed(true);
  }

  return (
    <main className="blog-page">
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container">
          <span className="eyebrow">Blog</span>
          <h1>{t('blog.title')}</h1>
          <p>{t('blog.subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container blog-layout">
          <div className="blog-main">
            {/* Featured Article */}
            {featured && (
              <div className="featured-article card">
                <div className="featured-badge">
                  <span>⭐ {lang === 'fr' ? 'Article à la une' : 'Featured article'}</span>
                </div>
                <div className="featured-image">
                  <div className="img-placeholder" style={{ height: '300px' }}>
                    <span>{lang === 'fr' ? 'Image article — 800×400px' : 'Article image — 800×400px'}</span>
                  </div>
                </div>
                <div className="featured-content">
                  <div className="article-meta">
                    <span className="badge badge-green">{featured.category}</span>
                    <span className="article-date">
                      {new Date(featured.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </span>
                    <span className="article-read-time">⏱ {featured.readTime}</span>
                  </div>
                  <h2>{featured[`title_${lang}`]}</h2>
                  <p>{featured[`excerpt_${lang}`]}</p>
                  <div className="article-footer">
                    <div className="article-author">
                      <div className="author-avatar">{featured.author.charAt(0)}</div>
                      <span>{featured.author}</span>
                    </div>
                    <Link to={`/blog/${featured.slug}`} className="btn btn-primary btn-sm">
                      {t('blog.read_more')} →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Categories Filter */}
            <div className="category-filter">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === 'Tous' ? t('blog.categories.all') : cat}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="articles-grid">
              {filtered.map(article => (
                <ArticleCard key={article.slug} article={article} lang={lang} t={t} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="blog-sidebar">
            {/* Newsletter */}
            <div className="sidebar-widget card">
              <h3>{t('blog.newsletter_cta')}</h3>
              <p>{t('blog.newsletter_text')}</p>
              {subscribed ? (
                <p className="success-msg">✅ {lang === 'fr' ? 'Merci !' : 'Thank you!'}</p>
              ) : (
                <form onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    className="form-input"
                    placeholder={lang === 'fr' ? 'Votre e-mail' : 'Your email'}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{ marginBottom: '0.75rem' }}
                  />
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    {lang === 'fr' ? "S'abonner" : 'Subscribe'}
                  </button>
                </form>
              )}
            </div>

            {/* Categories */}
            <div className="sidebar-widget card">
              <h3>{lang === 'fr' ? 'Catégories' : 'Categories'}</h3>
              <div className="sidebar-categories">
                {CATEGORIES.slice(1).map(cat => {
                  const count = ARTICLES.filter(a => a.category === cat).length;
                  return (
                    <button
                      key={cat}
                      className="sidebar-cat-btn"
                      onClick={() => setActiveCategory(cat)}
                    >
                      <span>{cat}</span>
                      <span className="cat-count">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Expert Highlight */}
            <div className="sidebar-widget expert-card">
              <div className="expert-avatar">E</div>
              <h4>Wenmanegda Elie DIPAMA</h4>
              <p>{lang === 'fr' ? 'Co-fondateur & Expert Agro-Environnemental' : 'Co-founder & Agro-Environmental Expert'}</p>
              <div className="expert-badges">
                <span className="badge badge-green">🏅 YALI Fellow 2023</span>
                <span className="badge badge-green">🔬 Humboldt Fellow 2025</span>
              </div>
              <a href="/about" className="btn btn-secondary btn-sm" style={{ width: '100%', textAlign: 'center', marginTop: '0.5rem' }}>
                {lang === 'fr' ? 'Voir profil' : 'View profile'}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function ArticleCard({ article, lang, t }) {
  return (
    <div className="article-card card">
      <div className="article-image">
        <div className="img-placeholder" style={{ height: '180px' }}>
          <span>Image — 400×200px</span>
        </div>
      </div>
      <div className="article-card-content">
        <div className="article-meta">
          <span className="badge badge-green">{article.category}</span>
          <span className="article-date">
            {new Date(article.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
              day: 'numeric', month: 'short', year: 'numeric'
            })}
          </span>
        </div>
        <h3>{article[`title_${lang}`]}</h3>
        <p>{article[`excerpt_${lang}`]}</p>
        <div className="article-footer">
          <span className="article-author-sm">{article.author.split(' ').slice(-1)[0]}</span>
          <Link to={`/blog/${article.slug}`} className="article-link">
            {t('blog.read_more')} →
          </Link>
        </div>
      </div>
    </div>
  );
}

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
  {
    slug: 'agroecologie-sahel-changement-climatique',
    title_fr: "L'agroécologie au Sahel : solutions face au changement climatique",
    title_en: "Agroecology in the Sahel: Solutions for Climate Change",
    excerpt_fr: "Face à des pluies de plus en plus imprévisibles et des sols dégradés, les techniques agroécologiques offrent aux agriculteurs sahéliens des réponses concrètes et abordables. Découvrez les pratiques qui transforment les exploitations de la région.",
    excerpt_en: "As rainfall becomes increasingly unpredictable and soils degrade, agroecological techniques offer Sahelian farmers concrete and affordable solutions. Discover the practices transforming farms across the region.",
    category: 'Agroécologie',
    author: 'Aminata Sawadogo',
    date: '2025-11-10',
    featured: false,
    readTime: '6 min',
  },
  {
    slug: 'prix-cereales-afrique-ouest-2026',
    title_fr: "Prix des céréales en Afrique de l'Ouest : analyse et perspectives 2026",
    title_en: "Cereal Prices in West Africa: Analysis and 2026 Outlook",
    excerpt_fr: "Le marché des céréales en Afrique de l'Ouest traverse une période de forte volatilité. Entre déficits pluviométriques, perturbations logistiques et demande urbaine croissante, les prix du mil, sorgho et maïs atteignent des niveaux préoccupants.",
    excerpt_en: "West Africa's cereal market is experiencing significant volatility. Between rainfall deficits, logistical disruptions, and growing urban demand, millet, sorghum, and maize prices are reaching concerning levels.",
    category: 'Marché',
    author: 'Oumarou Traoré',
    date: '2025-12-05',
    featured: false,
    readTime: '7 min',
  },
  {
    slug: 'drones-agricoles-surveillance-cultures',
    title_fr: "Les drones agricoles révolutionnent la surveillance des cultures",
    title_en: "Agricultural Drones Revolutionize Crop Monitoring",
    excerpt_fr: "En Afrique de l'Ouest, les drones agricoles commencent à transformer la gestion des exploitations. De la cartographie des parcelles à la détection précoce des maladies, cette technologie est désormais accessible aux coopératives et aux agripreneurs.",
    excerpt_en: "In West Africa, agricultural drones are starting to transform farm management. From plot mapping to early disease detection, this technology is now accessible to cooperatives and agripreneurs.",
    category: 'Innovation',
    author: 'Kofi Mensah',
    date: '2026-01-18',
    featured: false,
    readTime: '5 min',
  },
  {
    slug: 'financement-agricole-petits-exploitants',
    title_fr: "Financement agricole : nouvelles opportunités pour les petits exploitants",
    title_en: "Agricultural Financing: New Opportunities for Smallholder Farmers",
    excerpt_fr: "L'accès au crédit reste l'un des principaux freins au développement agricole en Afrique subsaharienne. Microfinance, fonds de garantie, financement participatif et crédit-carbone : un panorama des solutions qui émergent pour les petits producteurs.",
    excerpt_en: "Access to credit remains one of the main barriers to agricultural development in sub-Saharan Africa. Microfinance, guarantee funds, crowdfunding, and carbon credits: an overview of emerging solutions for smallholder farmers.",
    category: 'Financement',
    author: 'Fatoumata Diallo',
    date: '2026-02-07',
    featured: false,
    readTime: '6 min',
  },
  {
    slug: 'sesame-burkina-faso-chaine-valeur',
    title_fr: "La chaîne de valeur du sésame burkinabè : opportunités d'export",
    title_en: "The Burkinabe Sesame Value Chain: Export Opportunities",
    excerpt_fr: "Le Burkina Faso est l'un des premiers producteurs de sésame en Afrique de l'Ouest, avec plus de 400 000 tonnes par an. Pourtant, la majeure partie est exportée sans transformation. Analyse des opportunités pour créer plus de valeur localement.",
    excerpt_en: "Burkina Faso is one of West Africa's leading sesame producers, with over 400,000 tonnes per year. Yet most is exported unprocessed. Analysis of opportunities to create more value locally.",
    category: 'Export',
    author: 'Wendyam Compaoré',
    date: '2026-02-25',
    featured: false,
    readTime: '7 min',
  },
  {
    slug: 'irrigation-goutte-a-goutte-saison-seche',
    title_fr: "Irrigation goutte-à-goutte : économiser l'eau en saison sèche",
    title_en: "Drip Irrigation: Saving Water in the Dry Season",
    excerpt_fr: "Avec une saison sèche qui s'allonge et des ressources en eau qui se raréfient, l'irrigation goutte-à-goutte s'impose comme une solution incontournable pour les maraîchers de l'Afrique de l'Ouest. Guide technique et économique.",
    excerpt_en: "With a lengthening dry season and increasingly scarce water resources, drip irrigation is becoming an essential solution for West African market gardeners. A technical and economic guide.",
    category: 'Irrigation',
    author: 'Ibrahim Coulibaly',
    date: '2026-03-14',
    featured: false,
    readTime: '5 min',
  },
  {
    slug: 'marches-numeriques-agricoles-vendre-en-ligne',
    title_fr: "Marchés numériques agricoles : comment vendre en ligne",
    title_en: "Digital Agricultural Markets: How to Sell Online",
    excerpt_fr: "Les plateformes numériques agricoles se multiplient en Afrique de l'Ouest et offrent aux producteurs un accès direct aux acheteurs, sans intermédiaire. Présentation des outils disponibles et conseils pratiques pour se lancer.",
    excerpt_en: "Digital agricultural platforms are multiplying across West Africa, giving producers direct access to buyers without intermediaries. An overview of available tools and practical advice for getting started.",
    category: 'Numérique',
    author: 'Aicha Sow',
    date: '2026-04-02',
    featured: false,
    readTime: '6 min',
  },
  {
    slug: 'agroforesterie-arbres-rendements',
    title_fr: "Agroforesterie : planter des arbres pour améliorer les rendements",
    title_en: "Agroforestry: Planting Trees to Improve Yields",
    excerpt_fr: "L'intégration d'arbres dans les systèmes agricoles n'est pas une contrainte mais une opportunité : fertilité accrue, microclimats favorables, diversification des revenus. Retours d'expériences de producteurs au Sahel et en zone soudanienne.",
    excerpt_en: "Integrating trees into farming systems is not a constraint but an opportunity: improved fertility, favorable microclimates, and diversified income. Feedback from producers in the Sahel and Sudanian zone.",
    category: 'Agroforesterie',
    author: 'Seydou Ouédraogo',
    date: '2026-05-12',
    featured: false,
    readTime: '6 min',
  },
];

const CATEGORIES = ['Tous', 'Actualités', 'Recherche & Innovation', 'Agriculture Durable', 'Environnement', 'Agroécologie', 'Marché', 'Innovation', 'Financement', 'Export', 'Irrigation', 'Numérique', 'Agroforesterie'];

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

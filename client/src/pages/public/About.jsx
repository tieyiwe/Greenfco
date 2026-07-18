import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './About.css';

function setMeta(title, description) {
  document.title = title;
  const el = document.querySelector('meta[name="description"]');
  if (el) el.setAttribute('content', description);
}

const TIMELINE = [
  { year: '2021', icon: '🌱', fr: 'Fondation de GreenFCO le 7 octobre 2021 à Ouagadougou, Burkina Faso.', en: 'GreenFCO founded on October 7, 2021 in Ouagadougou, Burkina Faso.' },
  { year: '2022', icon: '🚀', fr: 'Déploiement des premières lignes de services — conseil et négoce agricole.', en: 'Deployment of first service lines — advisory and agricultural trading.' },
  { year: '2023', icon: '🏅', fr: "Elie Dipama sélectionné Mandela Washington Fellow — YALI, Purdue University. Expansion des activités vers l'Europe.", en: 'Elie Dipama selected as Mandela Washington Fellow — YALI, Purdue University. Expansion of activities to Europe.' },
  { year: '2024', icon: '🌍', fr: "Lancement du développement de la plateforme numérique GreenFCO et des outils smart farming.", en: 'Launch of GreenFCO digital platform development and smart farming tools.' },
  { year: '2025', icon: '🔬', fr: "Elie Dipama lauréat de l'Alexander von Humboldt Foundation Fellowship — Climate Protection. Partenariat avec Humboldt Universität zu Berlin.", en: 'Elie Dipama awarded Alexander von Humboldt Foundation Fellowship — Climate Protection. Partnership with Humboldt Universität zu Berlin.' },
];

const VALUES = [
  { key: 'durability', icon: '🌿', color: '#1B4332', fr_title: 'Durabilité', en_title: 'Sustainability', fr_desc: "Chaque action GreenFCO préserve les ressources naturelles pour les générations futures, en intégrant les pratiques agroécologiques au cœur de notre modèle.", en_desc: "Every GreenFCO action preserves natural resources for future generations, integrating agroecological practices at the heart of our model." },
  { key: 'innovation', icon: '💡', color: '#8B5E3C', fr_title: 'Innovation', en_title: 'Innovation', fr_desc: "Nous combinons les savoirs traditionnels africains et les technologies modernes pour créer des solutions adaptées aux réalités du terrain.", en_desc: "We combine traditional African knowledge and modern technologies to create solutions adapted to field realities." },
  { key: 'impact', icon: '🎯', color: '#52B788', fr_title: 'Impact', en_title: 'Impact', fr_desc: "Mesurable, concret, humain. GreenFCO agit pour transformer les vies des agriculteurs et des communautés rurales de l'Afrique de l'Ouest.", en_desc: "Measurable, concrete, human. GreenFCO acts to transform the lives of farmers and rural communities in West Africa." },
];

export default function About() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  useEffect(() => {
    if (lang === 'fr') {
      setMeta(
        'À Propos | GreenFCO — Notre Histoire et Mission Agro-Environnementale',
        "Découvrez l'histoire, la mission et les fondateurs de GreenFCO. Elie et Elisée Dipama, experts agro-environnementaux, Mandela Washington Fellows et Humboldt Fellows, engagés pour une agriculture durable en Afrique de l'Ouest."
      );
    } else {
      setMeta(
        'About | GreenFCO — Our Story and Agro-Environmental Mission',
        'Discover the story, mission, and founders of GreenFCO. Elie and Elisée Dipama, agro-environmental experts, Mandela Washington Fellows, and Humboldt Fellows, committed to sustainable agriculture in West Africa.'
      );
    }
  }, [lang]);

  return (
    <main className="about-page">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container">
          <span className="eyebrow">{t('about.title')}</span>
          <h1>{lang === 'fr' ? 'Notre Histoire, Notre Mission' : 'Our Story, Our Mission'}</h1>
          <p>{t('about.subtitle')}</p>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="section mvv-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">{t('about.values')}</span>
            <h2>{lang === 'fr' ? 'Ce qui nous guide' : 'What Guides Us'}</h2>
            <div className="divider" />
          </div>
          <div className="mvv-grid">
            <div className="mvv-card">
              <div className="mvv-icon">🌍</div>
              <h3>{t('about.mission')}</h3>
              <p>{t('about.mission_text')}</p>
            </div>
            <div className="mvv-card mvv-card-featured">
              <div className="mvv-icon">🔭</div>
              <h3>{t('about.vision')}</h3>
              <p>{t('about.vision_text')}</p>
            </div>
            <div className="mvv-card">
              <div className="mvv-icon">⚖️</div>
              <h3>{t('about.values')}</h3>
              <ul>
                <li>✦ {t('about.values_durability')}</li>
                <li>✦ {t('about.values_innovation')}</li>
                <li>✦ {t('about.values_impact')}</li>
              </ul>
            </div>
          </div>

          {/* Values Detail */}
          <div className="values-grid" style={{ marginTop: '3rem' }}>
            {VALUES.map((v) => (
              <div key={v.key} className="value-card card">
                <div className="value-icon" style={{ background: v.color + '15', color: v.color }}>
                  {v.icon}
                </div>
                <h4>{lang === 'fr' ? v.fr_title : v.en_title}</h4>
                <p>{lang === 'fr' ? v.fr_desc : v.en_desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="section founders-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">{t('about.founders')}</span>
            <h2>{lang === 'fr' ? 'Les Visages de GreenFCO' : 'The Faces of GreenFCO'}</h2>
            <div className="divider" />
          </div>
          {/* Joint cofounders photo */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <img
              src="/images/cofounders.jpg"
              alt="Elie et Elisée Dipama — Co-fondateurs GreenFCO"
              style={{
                width: '100%',
                maxWidth: '720px',
                borderRadius: '16px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                display: 'block',
                margin: '0 auto',
              }}
            />
            <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--gray-mid)', fontStyle: 'italic' }}>
              Wenmanegda Elie &amp; Wesmanegda Elisée DIPAMA — {lang === 'fr' ? 'Co-fondateurs de GreenFCO' : 'Co-founders of GreenFCO'}
            </p>
          </div>

          <div className="founders-grid">
            {/* Elie Dipama */}
            <div className="founder-card card">
              <div className="founder-content">
                <h3>Wenmanegda Elie DIPAMA</h3>
                <p className="founder-role">
                  {lang === 'fr' ? 'Co-fondateur & Expert Agro-Environnemental' : 'Co-founder & Agro-Environmental Expert'}
                </p>
                <div className="founder-fellowships">
                  <div className="fellowship-pill">
                    <span>🏅</span>
                    <div>
                      <strong>Mandela Washington Fellow</strong>
                      <span>YALI · Purdue University · 2023</span>
                    </div>
                  </div>
                  <div className="fellowship-pill fellowship-pill-humboldt">
                    <span>🔬</span>
                    <div>
                      <strong>Alexander von Humboldt Fellow</strong>
                      <span>International Climate Protection · 2025</span>
                    </div>
                  </div>
                  <div className="fellowship-pill">
                    <span>🎓</span>
                    <div>
                      <strong>Research Associate</strong>
                      <span>SLE · Humboldt Universität zu Berlin</span>
                    </div>
                  </div>
                </div>
                <div className="founder-bio">
                  <p>
                    {lang === 'fr'
                      ? "Agro-économiste et spécialiste en analyse des politiques agricoles et planification de projets, Elie Dipama est l'une des voix montantes de l'agriculture durable en Afrique de l'Ouest. Ses travaux portent sur l'agriculture climato-intelligente, l'agroécologie, la finance carbone et la méthodologie Formation de Formateurs (ToT)."
                      : "An agroeconomist and specialist in agricultural policy analysis and project planning, Elie Dipama is one of the rising voices in sustainable agriculture in West Africa. His work focuses on climate-smart agriculture, agroecology, carbon finance, and Training of Trainers (ToT) methodology."}
                  </p>
                  <p>
                    {lang === 'fr'
                      ? "Lauréat du prestigieux Fellowship Alexander von Humboldt pour la protection internationale du climat (2025) et ancien Mandela Washington Fellow — YALI (Purdue University, 2023), il incarne la nouvelle génération d'experts africains alliant rigueur académique et engagement de terrain."
                      : "Recipient of the prestigious Alexander von Humboldt Fellowship for International Climate Protection (2025) and former Mandela Washington Fellow — YALI (Purdue University, 2023), he embodies the new generation of African experts combining academic rigor with field commitment."}
                  </p>
                </div>
                <div className="founder-expertise">
                  <strong>{lang === 'fr' ? 'Domaines d\'expertise :' : 'Areas of expertise:'}</strong>
                  <div className="expertise-tags">
                    {['Agriculture climato-intelligente', 'Agroécologie', 'Finance carbone', 'Formation de Formateurs', 'Analyse des politiques agricoles'].map(tag => (
                      <span key={tag} className="badge badge-green">{tag}</span>
                    ))}
                  </div>
                </div>
                <a href="mailto:info@greenfco.com" className="btn btn-primary btn-sm">
                  {lang === 'fr' ? 'Contacter Elie' : 'Contact Elie'}
                </a>
              </div>
            </div>

            {/* Elisée Dipama */}
            <div className="founder-card card">
              <div className="founder-content">
                <h3>Wesmanegda Elisée DIPAMA</h3>
                <p className="founder-role">
                  {lang === 'fr' ? 'Co-fondateur & Responsable Opérations' : 'Co-founder & Operations Director'}
                </p>
                <div className="founder-bio">
                  <p>
                    {lang === 'fr'
                      ? "Jumeau d'Elie et co-fondateur opérationnel de GreenFCO, Elisée Dipama apporte son expertise en agronomie et génie environnemental pour transformer les idées en actions concrètes sur le terrain."
                      : "Elie's twin brother and operational co-founder of GreenFCO, Elisée Dipama brings his expertise in agronomy and environmental engineering to transform ideas into concrete actions in the field."}
                  </p>
                  <p>
                    {lang === 'fr'
                      ? "Sa maîtrise des aspects techniques et opérationnels — de la gestion des projets hydro-agricoles au développement des chaînes de valeur agricoles — fait de lui le pilier de l'exécution de la vision GreenFCO."
                      : "His mastery of technical and operational aspects — from hydro-agricultural project management to agricultural value chain development — makes him the pillar of GreenFCO's vision execution."}
                  </p>
                </div>
                <div className="founder-expertise">
                  <strong>{lang === 'fr' ? 'Domaines d\'expertise :' : 'Areas of expertise:'}</strong>
                  <div className="expertise-tags">
                    {['Agronomie', 'Génie Environnemental', 'Aménagements Hydro-Agricoles', 'Gestion de projets', 'Chaînes de valeur'].map(tag => (
                      <span key={tag} className="badge badge-green">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section timeline-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">{t('about.timeline_title')}</span>
            <h2>{lang === 'fr' ? 'Notre Chemin' : 'Our Path'}</h2>
            <div className="divider" />
          </div>
          <div className="timeline">
            {TIMELINE.map((item, i) => (
              <div key={item.year} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-year">
                  <span>{item.year}</span>
                </div>
                <div className="timeline-connector" />
                <div className="timeline-content card">
                  <span className="timeline-icon">{item.icon}</span>
                  <p>{lang === 'fr' ? item.fr : item.en}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

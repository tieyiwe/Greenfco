import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Services.css';

function setMeta(title, description) {
  document.title = title;
  const el = document.querySelector('meta[name="description"]');
  if (el) el.setAttribute('content', description);
}

const SERVICES_DATA = [
  {
    key: 'conseil',
    icon: '🤝',
    color: '#1B4332',
    fr_detail: "GreenFCO vous accompagne à chaque étape de la création et du développement de votre entreprise agricole ou agri-alimentaire. De l'étude de faisabilité à la mise en place des outils de gestion, notre équipe d'experts est à vos côtés. Linked to Koob Assist — notre application mobile d'assistance conseil (en développement).",
    en_detail: "GreenFCO supports you at every stage of creating and developing your agricultural or agri-food business. From feasibility studies to implementing management tools, our team of experts is by your side. Linked to Koob Assist — our mobile advisory app (in development).",
    tags_fr: ['Business Plan', 'Étude de faisabilité', 'Accompagnement PME', 'Koob Assist App'],
    tags_en: ['Business Plan', 'Feasibility Study', 'SME Support', 'Koob Assist App'],
  },
  {
    key: 'negoce',
    icon: '🌾',
    color: '#2D6A4F',
    fr_detail: "Nous facilitons le commerce de produits agricoles et agri-alimentaires de qualité entre producteurs, acheteurs et marchés. Spécialité dans les produits maraichers : oignons, pommes de terre et autres cultures à haute valeur commerciale.",
    en_detail: "We facilitate the trade of quality agricultural and agri-food products between producers, buyers, and markets. Specializing in market garden products: onions, potatoes, and other high-value commercial crops.",
    tags_fr: ['Oignons', 'Pommes de terre', 'Mise en marché', 'Commerce équitable'],
    tags_en: ['Onions', 'Potatoes', 'Market access', 'Fair trade'],
  },
  {
    key: 'formations',
    icon: '📚',
    color: '#52B788',
    fr_detail: "Des formations certifiantes animées par des experts reconnus, adaptées aux réalités du terrain africain. Trois filières : Agriculture Durable (pratiques agroécologiques), Agriculture Intelligente (smart farming, IoT, data), Agriculture Hors-sol (hydroponie, aquaponie). Formation de Formateurs (ToT) disponible.",
    en_detail: "Certified training led by recognized experts, adapted to African field realities. Three tracks: Sustainable Agriculture (agroecological practices), Smart Agriculture (smart farming, IoT, data), Soilless Agriculture (hydroponics, aquaponics). Training of Trainers (ToT) available.",
    tags_fr: ['Agriculture Durable', 'Agriculture Intelligente', 'Agriculture Hors-sol', 'Formation de Formateurs'],
    tags_en: ['Sustainable Agriculture', 'Smart Agriculture', 'Soilless Agriculture', 'Training of Trainers'],
  },
  {
    key: 'etudes',
    icon: '🔬',
    color: '#8B5E3C',
    fr_detail: "Des études rigoureuses pour éclairer vos décisions. Études d'impact environnemental, études de marché sectorielles, analyses de filières agricoles. Basées sur des méthodes éprouvées et une connaissance approfondie du contexte west-africain.",
    en_detail: "Rigorous studies to inform your decisions. Environmental impact studies, sectoral market research, agricultural value chain analyses. Based on proven methods and deep knowledge of the West African context.",
    tags_fr: ['Études environnementales', 'Études de marché', 'Analyse de filières', 'Rapports sectoriels'],
    tags_en: ['Environmental studies', 'Market research', 'Value chain analysis', 'Sectoral reports'],
  },
  {
    key: 'hydro',
    icon: '💧',
    color: '#2D6A4F',
    fr_detail: "Conception, planification et réalisation d'aménagements hydro-agricoles durables. Maîtrise de l'eau pour une agriculture productive même en période de sécheresse. Solutions adaptées aux zones sahéliennes et soudano-sahéliennes.",
    en_detail: "Design, planning, and implementation of sustainable hydro-agricultural developments. Water management for productive agriculture even in drought periods. Solutions adapted to Sahelian and Sudano-Sahelian zones.",
    tags_fr: ['Périmètres irrigués', 'Gestion de l\'eau', 'Zones sahéliennes', 'Infrastructures rurales'],
    tags_en: ['Irrigated perimeters', 'Water management', 'Sahelian zones', 'Rural infrastructure'],
  },
  {
    key: 'intrants',
    icon: '🌱',
    color: '#1B4332',
    fr_detail: "Fourniture d'intrants agricoles de qualité pour améliorer vos rendements de manière durable. Produit phare en développement : BioGrowth — bio-fertilisant liquide innovant formulé pour les sols ouest-africains. Solutions organiques en priorité, alignées avec notre vision agroécologique.",
    en_detail: "Supply of quality agricultural inputs to improve your yields sustainably. Flagship product in development: BioGrowth — innovative liquid bio-fertilizer formulated for West African soils. Organic solutions prioritized, aligned with our agroecological vision.",
    tags_fr: ['BioGrowth bio-fertilisant', 'Semences sélectionnées', 'Intrants bio', 'Solutions organiques'],
    tags_en: ['BioGrowth bio-fertilizer', 'Selected seeds', 'Bio inputs', 'Organic solutions'],
  },
  {
    key: 'projets',
    icon: '📋',
    color: '#52B788',
    fr_detail: "Développement de projets agricoles et agro-environnementaux bancables, du concept à la mise en œuvre. Études de marché, montage financier, recherche de partenaires et accompagnement à la levée de fonds. Expertise en financement carbone et projets d'impact.",
    en_detail: "Development of bankable agricultural and agro-environmental projects, from concept to implementation. Market studies, financial structuring, partner research, and fundraising support. Expertise in carbon finance and impact projects.",
    tags_fr: ['Montage de projets', 'Financement carbone', 'Partenariats', 'Levée de fonds'],
    tags_en: ['Project structuring', 'Carbon finance', 'Partnerships', 'Fundraising'],
  },
];

export default function Services() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  useEffect(() => {
    if (lang === 'fr') {
      setMeta(
        'Services | GreenFCO — 7 Lignes de Services Agro-Environnementaux',
        "GreenFCO offre 7 services intégrés : conseil agricole, négoce de produits agricoles, formations certifiantes, études environnementales, aménagements hydro-agricoles, intrants bio et développement de projets. Burkina Faso, Afrique de l'Ouest."
      );
    } else {
      setMeta(
        'Services | GreenFCO — 7 Integrated Agro-Environmental Service Lines',
        'GreenFCO offers 7 integrated services: agricultural advisory, commodity trading, certified training, environmental studies, hydro-agricultural development, bio-inputs, and project development. Burkina Faso, West Africa.'
      );
    }
  }, [lang]);

  return (
    <main className="services-page">
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container">
          <span className="eyebrow">{t('services.title')}</span>
          <h1>{lang === 'fr' ? '7 Lignes de Services Intégrés' : '7 Integrated Service Lines'}</h1>
          <p>{t('services.subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-list">
            {SERVICES_DATA.map((svc, i) => (
              <ServiceDetailCard key={svc.key} service={svc} index={i} t={t} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="section innovation-spotlight">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Innovation en cours</span>
            <h2>{lang === 'fr' ? 'Nos Produits en Développement' : 'Our Products in Development'}</h2>
            <div className="divider" />
          </div>
          <div className="grid-2">
            <div className="innovation-product-card card">
              <div className="product-status">
                <span className="badge badge-earth">
                  {lang === 'fr' ? '📱 App Mobile — Bientôt' : '📱 Mobile App — Coming Soon'}
                </span>
              </div>
              <h3>Koob Assist</h3>
              <p>
                {lang === 'fr'
                  ? "Application mobile d'assistance-conseil pour agripreneurs. Diagnostics, plans d'affaires, suivi de gestion — tout depuis votre téléphone. Connectée à notre réseau d'experts GreenFCO."
                  : "Mobile advisory app for agripreneurs. Diagnostics, business plans, management tracking — all from your phone. Connected to our GreenFCO expert network."}
              </p>
              <div className="product-features">
                {(lang === 'fr'
                  ? ['Diagnostic entreprise', 'Plan d\'affaires guidé', 'Suivi de gestion', 'Réseau d\'experts']
                  : ['Business diagnostic', 'Guided business plan', 'Management tracking', 'Expert network']
                ).map(f => <span key={f} className="badge badge-green">{f}</span>)}
              </div>
            </div>
            <div className="innovation-product-card card">
              <div className="product-status">
                <span className="badge badge-earth">
                  {lang === 'fr' ? '🌿 Produit — En développement' : '🌿 Product — In Development'}
                </span>
              </div>
              <h3>BioGrowth</h3>
              <p>
                {lang === 'fr'
                  ? "Bio-fertilisant liquide innovant formulé pour les sols et cultures de l'Afrique de l'Ouest. Solution organique performante pour améliorer la fertilité des sols et augmenter les rendements durablement."
                  : "Innovative liquid bio-fertilizer formulated for West African soils and crops. High-performance organic solution to improve soil fertility and sustainably increase yields."}
              </p>
              <div className="product-features">
                {(lang === 'fr'
                  ? ['100% Organique', 'Adapté sols africains', 'Certifié agroécologie', 'Rendement +30%*']
                  : ['100% Organic', 'Adapted for African soils', 'Agroecology certified', 'Yield +30%*']
                ).map(f => <span key={f} className="badge badge-green">{f}</span>)}
              </div>
              {lang === 'fr'
                ? <p className="product-disclaimer">*Résultats préliminaires, en cours de validation.</p>
                : <p className="product-disclaimer">*Preliminary results, under validation.</p>}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>{lang === 'fr' ? 'Prêt à travailler avec nous ?' : 'Ready to work with us?'}</h2>
            <p>
              {lang === 'fr'
                ? "Discutons de votre projet. Notre équipe est disponible pour vous accompagner."
                : "Let's discuss your project. Our team is available to support you."}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/consulting" className="btn btn-primary btn-lg">
                {lang === 'fr' ? 'Réserver une consultation' : 'Book a consultation'}
              </Link>
              <a href="/contact" className="btn btn-secondary btn-lg">
                {lang === 'fr' ? 'Contactez-nous' : 'Contact us'}
              </a>
              <a
                href="https://wa.me/22600000000"
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ServiceDetailCard({ service, index, t, lang }) {
  const isEven = index % 2 === 0;
  return (
    <div className={`service-detail-card card ${isEven ? '' : 'card-accent'}`} id={`service-${service.key}`}>
      <div className="service-detail-number">0{index + 1}</div>
      <div className="service-detail-icon" style={{ background: service.color + '15', color: service.color }}>
        {service.icon}
      </div>
      <div className="service-detail-body">
        <h2>{t(`services.${service.key}.title`)}</h2>
        <p>{lang === 'fr' ? service.fr_detail : service.en_detail}</p>
        <div className="service-detail-tags">
          {(lang === 'fr' ? service.tags_fr : service.tags_en).map((tag) => (
            <span key={tag} className="badge badge-green">{tag}</span>
          ))}
        </div>
        {service.key === 'conseil' ? (
          <Link to="/consulting" className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }}>
            {t(`services.${service.key}.cta`)} →
          </Link>
        ) : (
          <a href="/contact" className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }}>
            {t(`services.${service.key}.cta`)} →
          </a>
        )}
      </div>
    </div>
  );
}

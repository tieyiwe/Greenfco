import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function setMeta(title, description) {
  document.title = title;
  const el = document.querySelector('meta[name="description"]');
  if (el) el.setAttribute('content', description);
}

const EVENTS = [
  {
    id: 1,
    title_fr: 'Forum Agrobusiness Afrique de l\'Ouest 2026',
    title_en: 'West Africa Agribusiness Forum 2026',
    date: '2026-06-18',
    end_date: '2026-06-20',
    location_fr: 'Ouagadougou, Burkina Faso',
    location_en: 'Ouagadougou, Burkina Faso',
    category: 'Forum',
    icon: '🌍',
    desc_fr: 'Grand rassemblement des acteurs de l\'agrobusiness en Afrique de l\'Ouest. Opportunités de réseautage, panels d\'experts et présentation d\'innovations agricoles.',
    desc_en: 'Major gathering of agribusiness stakeholders in West Africa. Networking opportunities, expert panels, and presentation of agricultural innovations.',
    url: null,
  },
  {
    id: 2,
    title_fr: 'Salon International de l\'Agriculture Durable — SIAD 2026',
    title_en: 'International Sustainable Agriculture Fair — ISAF 2026',
    date: '2026-07-08',
    end_date: '2026-07-11',
    location_fr: 'Abidjan, Côte d\'Ivoire',
    location_en: 'Abidjan, Côte d\'Ivoire',
    category: 'Salon',
    icon: '🌱',
    desc_fr: 'Salon dédié aux pratiques agricoles durables, aux intrants bio et aux technologies de smart farming. Plus de 300 exposants de 20 pays africains.',
    desc_en: 'Fair dedicated to sustainable farming practices, bio-inputs, and smart farming technologies. Over 300 exhibitors from 20 African countries.',
    url: null,
  },
  {
    id: 3,
    title_fr: 'Conférence Internationale sur l\'Agroécologie au Sahel',
    title_en: 'International Conference on Agroecology in the Sahel',
    date: '2026-07-22',
    end_date: '2026-07-24',
    location_fr: 'Bamako, Mali',
    location_en: 'Bamako, Mali',
    category: 'Conférence',
    icon: '🔬',
    desc_fr: 'Conférence scientifique réunissant chercheurs, praticiens et décideurs autour des défis agroécologiques dans la zone sahélienne.',
    desc_en: 'Scientific conference bringing together researchers, practitioners, and policymakers around agroecological challenges in the Sahelian zone.',
    url: null,
  },
  {
    id: 4,
    title_fr: 'West Africa Green Economy Summit',
    title_en: 'West Africa Green Economy Summit',
    date: '2026-08-12',
    end_date: '2026-08-14',
    location_fr: 'Dakar, Sénégal',
    location_en: 'Dakar, Senegal',
    category: 'Sommet',
    icon: '♻️',
    desc_fr: 'Sommet régional sur l\'économie verte, la finance carbone et les investissements durables en Afrique de l\'Ouest. Accès aux marchés carbone pour les agriculteurs.',
    desc_en: 'Regional summit on green economy, carbon finance, and sustainable investments in West Africa. Carbon market access for farmers.',
    url: null,
  },
  {
    id: 5,
    title_fr: 'AGROFORUM Burkina 2026',
    title_en: 'AGROFORUM Burkina 2026',
    date: '2026-08-27',
    end_date: '2026-08-29',
    location_fr: 'Bobo-Dioulasso, Burkina Faso',
    location_en: 'Bobo-Dioulasso, Burkina Faso',
    category: 'Forum',
    icon: '🌾',
    desc_fr: 'Plateforme de dialogue entre agriculteurs, coopératives, entreprises agricoles et institutions financières du Burkina Faso.',
    desc_en: 'Dialogue platform between farmers, cooperatives, agricultural enterprises, and financial institutions in Burkina Faso.',
    url: null,
  },
  {
    id: 6,
    title_fr: 'Webinaire : Finance Carbone pour les Petits Exploitants',
    title_en: 'Webinar: Carbon Finance for Smallholder Farmers',
    date: '2026-09-10',
    end_date: '2026-09-10',
    location_fr: 'En ligne (Zoom)',
    location_en: 'Online (Zoom)',
    category: 'Webinaire',
    icon: '💻',
    desc_fr: 'Session en ligne sur les opportunités de la finance carbone pour les agriculteurs de l\'Afrique subsaharienne. Inscription gratuite.',
    desc_en: 'Online session on carbon finance opportunities for sub-Saharan African farmers. Free registration.',
    url: null,
  },
  {
    id: 7,
    title_fr: 'SIAO — Salon International de l\'Artisanat de Ouagadougou',
    title_en: 'SIAO — Ouagadougou International Arts & Crafts Fair',
    date: '2026-09-24',
    end_date: '2026-10-04',
    location_fr: 'Ouagadougou, Burkina Faso',
    location_en: 'Ouagadougou, Burkina Faso',
    category: 'Salon',
    icon: '🎨',
    desc_fr: 'L\'un des plus grands événements biennaux d\'Afrique, avec un volet agro-alimentaire et artisanat rural de plus en plus important.',
    desc_en: 'One of Africa\'s largest biennial events, with an increasingly prominent agri-food and rural crafts component.',
    url: null,
  },
  {
    id: 8,
    title_fr: 'Forum Mondial sur l\'Irrigation et la Gestion de l\'Eau en Afrique',
    title_en: 'World Forum on Irrigation and Water Management in Africa',
    date: '2026-10-07',
    end_date: '2026-10-09',
    location_fr: 'Lomé, Togo',
    location_en: 'Lomé, Togo',
    category: 'Forum',
    icon: '💧',
    desc_fr: 'Forum international axé sur les solutions d\'irrigation intelligentes, la gestion durable des bassins versants et les projets hydro-agricoles.',
    desc_en: 'International forum focused on smart irrigation solutions, sustainable watershed management, and hydro-agricultural projects.',
    url: null,
  },
  {
    id: 9,
    title_fr: 'Conférence Régionale sur la Sécurité Alimentaire en Afrique de l\'Ouest',
    title_en: 'Regional Conference on Food Security in West Africa',
    date: '2026-10-21',
    end_date: '2026-10-23',
    location_fr: 'Accra, Ghana',
    location_en: 'Accra, Ghana',
    category: 'Conférence',
    icon: '🍽️',
    desc_fr: 'Conférence de haut niveau sur les stratégies régionales pour renforcer la sécurité alimentaire et nutritionnelle dans le contexte des changements climatiques.',
    desc_en: 'High-level conference on regional strategies to strengthen food and nutritional security in the context of climate change.',
    url: null,
  },
  {
    id: 10,
    title_fr: 'Salon du Numérique Agricole — AgriTech Africa 2026',
    title_en: 'Digital Agriculture Fair — AgriTech Africa 2026',
    date: '2026-11-05',
    end_date: '2026-11-07',
    location_fr: 'Lagos, Nigeria',
    location_en: 'Lagos, Nigeria',
    category: 'Salon',
    icon: '📱',
    desc_fr: 'Vitrine des innovations numériques agricoles : plateformes, applications mobiles, capteurs IoT, IA appliquée à l\'agriculture et agriculture de précision.',
    desc_en: 'Showcase of digital agricultural innovations: platforms, mobile apps, IoT sensors, AI applied to agriculture, and precision farming.',
    url: null,
  },
  {
    id: 11,
    title_fr: 'Formation : Certification Agroécologie pour Formateurs',
    title_en: 'Training: Agroecology Certification for Trainers',
    date: '2026-11-16',
    end_date: '2026-11-20',
    location_fr: 'Ouagadougou, Burkina Faso',
    location_en: 'Ouagadougou, Burkina Faso',
    category: 'Formation',
    icon: '📚',
    desc_fr: 'Programme de 5 jours pour certifier des formateurs en agroécologie. Partenariat avec des universités africaines et européennes. Places limitées.',
    desc_en: '5-day program to certify agroecology trainers. Partnership with African and European universities. Limited places.',
    url: null,
  },
  {
    id: 12,
    title_fr: 'COP31 — Journée Thématique Agriculture & Sécurité Alimentaire',
    title_en: 'COP31 — Agriculture & Food Security Thematic Day',
    date: '2026-11-25',
    end_date: '2026-11-25',
    location_fr: 'En ligne / Side events',
    location_en: 'Online / Side events',
    category: 'Conférence',
    icon: '🌡️',
    desc_fr: 'Journée thématique de la COP31 consacrée à l\'agriculture climatiquement intelligente. Représentation des agriculteurs africains dans les négociations mondiales.',
    desc_en: 'COP31 thematic day dedicated to climate-smart agriculture. Representation of African farmers in global negotiations.',
    url: null,
  },
  {
    id: 13,
    title_fr: 'Expo Bio-Intrants & Fertilisants Organiques Afrique',
    title_en: 'Bio-Inputs & Organic Fertilizers Expo Africa',
    date: '2026-12-03',
    end_date: '2026-12-05',
    location_fr: 'Ouagadougou, Burkina Faso',
    location_en: 'Ouagadougou, Burkina Faso',
    category: 'Salon',
    icon: '🌿',
    desc_fr: 'Exposition spécialisée sur les bio-intrants, les fertilisants organiques et les solutions phytosanitaires naturelles adaptées aux marchés africains.',
    desc_en: 'Specialized exhibition on bio-inputs, organic fertilizers, and natural phytosanitary solutions adapted to African markets.',
    url: null,
  },
  {
    id: 14,
    title_fr: 'Forum des Coopératives Agricoles d\'Afrique Francophone 2027',
    title_en: 'Francophone Africa Agricultural Cooperatives Forum 2027',
    date: '2027-01-21',
    end_date: '2027-01-23',
    location_fr: 'Cotonou, Bénin',
    location_en: 'Cotonou, Benin',
    category: 'Forum',
    icon: '🤝',
    desc_fr: 'Rassemblement des coopératives agricoles francophones pour partager les bonnes pratiques, accéder aux financements et développer des partenariats commerciaux.',
    desc_en: 'Gathering of Francophone agricultural cooperatives to share best practices, access financing, and develop commercial partnerships.',
    url: null,
  },
  {
    id: 15,
    title_fr: 'Webinaire : Accès aux Marchés d\'Export pour les Producteurs Africains',
    title_en: 'Webinar: Export Market Access for African Producers',
    date: '2027-02-11',
    end_date: '2027-02-11',
    location_fr: 'En ligne',
    location_en: 'Online',
    category: 'Webinaire',
    icon: '🚢',
    desc_fr: 'Comment accéder aux marchés européens et asiatiques ? Normes, certifications, logistique et opportunités d\'export pour sésame, cajou, karité et légumineuses.',
    desc_en: 'How to access European and Asian markets? Standards, certifications, logistics, and export opportunities for sesame, cashew, shea, and legumes.',
    url: null,
  },
  {
    id: 16,
    title_fr: 'Salon Africain de l\'Agroforesterie et de la Reforestation',
    title_en: 'African Agroforestry and Reforestation Fair',
    date: '2027-03-04',
    end_date: '2027-03-06',
    location_fr: 'Niamey, Niger',
    location_en: 'Niamey, Niger',
    category: 'Salon',
    icon: '🌳',
    desc_fr: 'Salon dédié aux pratiques d\'agroforesterie, de régénération naturelle assistée (RNA) et de reforestation dans les zones sahéliennes et soudaniennes.',
    desc_en: 'Fair dedicated to agroforestry, assisted natural regeneration (ANR) and reforestation practices in Sahelian and Sudanian zones.',
    url: null,
  },
  {
    id: 17,
    title_fr: 'Conférence Internationale Smart Farming & IA Agricole',
    title_en: 'International Smart Farming & Agricultural AI Conference',
    date: '2027-04-16',
    end_date: '2027-04-18',
    location_fr: 'Abidjan, Côte d\'Ivoire',
    location_en: 'Abidjan, Côte d\'Ivoire',
    category: 'Conférence',
    icon: '🤖',
    desc_fr: 'Conférence internationale sur l\'intelligence artificielle appliquée à l\'agriculture, les plateformes d\'aide à la décision et le smart farming en contexte africain.',
    desc_en: 'International conference on artificial intelligence applied to agriculture, decision support platforms, and smart farming in an African context.',
    url: null,
  },
  {
    id: 18,
    title_fr: 'AGRIEXPO WEST AFRICA 2027 — Salon International Agro-Environnemental',
    title_en: 'AGRIEXPO WEST AFRICA 2027 — International Agro-Environmental Fair',
    date: '2027-05-14',
    end_date: '2027-05-17',
    location_fr: 'Ouagadougou, Burkina Faso',
    location_en: 'Ouagadougou, Burkina Faso',
    category: 'Salon',
    icon: '🏆',
    desc_fr: 'Le plus grand salon agro-environnemental d\'Afrique de l\'Ouest. Agriculture durable, innovations, partenariats public-privé et financement de projets agricoles.',
    desc_en: 'The largest agro-environmental fair in West Africa. Sustainable agriculture, innovations, public-private partnerships, and agricultural project financing.',
    url: null,
  },
];

const CATEGORY_COLORS = {
  Forum: '#1B4332',
  Salon: '#2D6A4F',
  Conférence: '#52B788',
  Sommet: '#8B5E3C',
  Webinaire: '#3B82F6',
  Formation: '#F59E0B',
};

const ALL_CATEGORIES_FR = ['Tous', 'Forum', 'Salon', 'Conférence', 'Sommet', 'Webinaire', 'Formation'];
const ALL_CATEGORIES_EN = ['All', 'Forum', 'Fair', 'Conference', 'Summit', 'Webinar', 'Training'];

function formatDateRange(start, end, lang) {
  const s = new Date(start);
  const e = new Date(end);
  const opts = { day: 'numeric', month: 'long' };
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US';

  if (start === end) {
    return s.toLocaleDateString(locale, { ...opts, year: 'numeric' });
  }
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${s.getDate()}–${e.toLocaleDateString(locale, { ...opts, year: 'numeric' })}`;
  }
  return `${s.toLocaleDateString(locale, opts)} – ${e.toLocaleDateString(locale, { ...opts, year: 'numeric' })}`;
}

export default function IndustryEvents() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const [activeCat, setActiveCat] = useState(0);

  useEffect(() => {
    if (lang === 'fr') {
      setMeta(
        'Événements Sectoriels | GreenFCO — Agriculture & Agroécologie en Afrique',
        "Calendrier des événements agricoles et agro-environnementaux en Afrique de l'Ouest : forums, salons, conférences, webinaires et formations."
      );
    } else {
      setMeta(
        'Industry Events | GreenFCO — Agriculture & Agroecology in Africa',
        'Calendar of agricultural and agro-environmental events in West Africa: forums, fairs, conferences, webinars, and training.'
      );
    }
  }, [lang]);

  const categories = lang === 'fr' ? ALL_CATEGORIES_FR : ALL_CATEGORIES_EN;
  const catKeyFr = ALL_CATEGORIES_FR[activeCat];

  const filtered = activeCat === 0
    ? EVENTS
    : EVENTS.filter(ev => ev.category === catKeyFr);

  return (
    <main style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container">
          <span className="eyebrow">{lang === 'fr' ? 'Agenda 2026–2027' : 'Agenda 2026–2027'}</span>
          <h1>
            {lang === 'fr'
              ? 'Événements du Secteur Agricole'
              : 'Agricultural Industry Events'}
          </h1>
          <p>
            {lang === 'fr'
              ? "Forums, salons, conférences et webinaires pour les acteurs de l'agriculture durable en Afrique de l'Ouest."
              : 'Forums, fairs, conferences, and webinars for sustainable agriculture stakeholders in West Africa.'}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Category filter */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {categories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActiveCat(i)}
                className={`filter-btn${activeCat === i ? ' active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count */}
          <p style={{ fontSize: '0.9rem', color: 'var(--gray-mid)', marginBottom: '1.5rem' }}>
            {filtered.length}{' '}
            {lang === 'fr'
              ? `événement${filtered.length > 1 ? 's' : ''} à venir`
              : `upcoming event${filtered.length > 1 ? 's' : ''}`}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
            {filtered.map(ev => (
              <EventCard key={ev.id} ev={ev} lang={lang} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function EventCard({ ev, lang }) {
  const catColor = CATEGORY_COLORS[ev.category] || '#2D6A4F';
  const dateStr = formatDateRange(ev.date, ev.end_date, lang);
  const isOnline = ev.location_fr.toLowerCase().includes('ligne') || ev.location_fr.toLowerCase().includes('zoom');

  return (
    <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
        <div style={{
          width: 48, height: 48, borderRadius: '10px',
          background: catColor + '18',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem', flexShrink: 0,
        }}>
          {ev.icon}
        </div>
        <span style={{
          fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.65rem',
          borderRadius: '99px', background: catColor + '15', color: catColor,
          flexShrink: 0,
        }}>
          {lang === 'fr' ? ev.category : ALL_CATEGORIES_EN[ALL_CATEGORIES_FR.indexOf(ev.category)] || ev.category}
        </span>
      </div>

      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--black)', lineHeight: 1.35, margin: 0 }}>
        {ev[`title_${lang}`]}
      </h3>

      <p style={{ fontSize: '0.875rem', color: 'var(--gray-mid)', lineHeight: 1.6, margin: 0 }}>
        {ev[`desc_${lang}`]}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid var(--gray-light)' }}>
        <span style={{ fontSize: '0.82rem', color: 'var(--gray-dark)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          📅 {dateStr}
        </span>
        <span style={{ fontSize: '0.82rem', color: 'var(--gray-dark)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {isOnline ? '💻' : '📍'} {ev[`location_${lang}`]}
        </span>
      </div>
    </div>
  );
}

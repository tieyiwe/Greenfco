import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Gallery.css';

const CATEGORIES_FR = ['Tout', 'Terrain', 'Formations', 'Événements', 'Ferme-École'];
const CATEGORIES_EN = ['All', 'Field', 'Training', 'Events', 'Farm School'];

const CATEGORY_MAP = {
  terrain: 'Terrain',
  formations: 'Formations',
  formation: 'Formations',
  evenements: 'Événements',
  evenement: 'Événements',
  'événements': 'Événements',
  'événement': 'Événements',
  events: 'Événements',
  'ferme-ecole': 'Ferme-École',
  'ferme-école': 'Ferme-École',
  'farm-school': 'Ferme-École',
  general: 'Terrain',
};

const PLACEHOLDERS = [
  { id: 1, cat: 'Terrain', w: 600, h: 400, label_fr: 'Visite terrain — Burkina Faso', label_en: 'Field visit — Burkina Faso' },
  { id: 2, cat: 'Formations', w: 600, h: 600, label_fr: 'Formation agriculture durable', label_en: 'Sustainable agriculture training' },
  { id: 3, cat: 'Terrain', w: 800, h: 500, label_fr: 'Parcelles maraîchères', label_en: 'Market garden plots' },
  { id: 4, cat: 'Événements', w: 600, h: 400, label_fr: 'Forum agro-environmental', label_en: 'Agro-environmental forum' },
  { id: 5, cat: 'Ferme-École', w: 600, h: 800, label_fr: 'Ferme-école — démonstration', label_en: 'Farm school — demonstration' },
  { id: 6, cat: 'Formations', w: 600, h: 400, label_fr: 'Agriculture hors-sol workshop', label_en: 'Soilless agriculture workshop' },
  { id: 7, cat: 'Terrain', w: 800, h: 600, label_fr: 'Aménagements hydro-agricoles', label_en: 'Hydro-agricultural development' },
  { id: 8, cat: 'Événements', w: 600, h: 400, label_fr: 'Rencontre avec partenaires', label_en: 'Partner meeting' },
  { id: 9, cat: 'Ferme-École', w: 600, h: 600, label_fr: 'Formation pratique — semences', label_en: 'Practical training — seeds' },
];

export default function Gallery() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [apiItems, setApiItems] = useState([]);

  useEffect(() => {
    fetch('/api/gallery')
      .then(r => r.ok ? r.json() : [])
      .then(data => setApiItems(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const cats = lang === 'fr' ? CATEGORIES_FR : CATEGORIES_EN;

  const apiMapped = apiItems.map(item => ({
    id: `api-${item.id}`,
    cat: item.category ? (CATEGORY_MAP[item.category.toLowerCase()] || 'Terrain') : 'Terrain',
    w: 600, h: 400,
    label_fr: item.title_fr || item.title,
    label_en: item.title,
    image_url: item.image_url,
  }));

  const allItems = [...apiMapped, ...PLACEHOLDERS];

  const filtered = active === 0
    ? allItems
    : allItems.filter(p => p.cat === CATEGORIES_FR[active]);

  return (
    <main className="gallery-page">
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container">
          <span className="eyebrow">{lang === 'fr' ? 'Galerie' : 'Gallery'}</span>
          <h1>{lang === 'fr' ? 'Nos Actions en Images' : 'Our Actions in Pictures'}</h1>
          <p>
            {lang === 'fr'
              ? "Découvrez nos activités de terrain, formations, événements et ferme-école à travers ces témoignages visuels."
              : "Discover our field activities, training, events, and farm school through these visual testimonials."}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-filter">
            {cats.map((cat, i) => (
              <button
                key={cat}
                className={`filter-btn ${active === i ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="masonry-grid">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className="masonry-item"
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => setLightbox(item)}
              >
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={lang === 'fr' ? item.label_fr : item.label_en}
                    className="gallery-img gallery-real-img"
                    style={{ width: '100%', display: 'block', borderRadius: 'inherit' }}
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="img-placeholder gallery-img"
                    style={{ paddingBottom: `${(item.h / item.w) * 100}%` }}
                  >
                    <span className="gallery-label">
                      {lang === 'fr' ? item.label_fr : item.label_en}
                    </span>
                  </div>
                )}
                <div className="gallery-overlay">
                  <span className="gallery-zoom">🔍</span>
                  <p>{lang === 'fr' ? item.label_fr : item.label_en}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Video Section */}
          <div className="video-section" style={{ marginTop: '4rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
              {lang === 'fr' ? 'Vidéos' : 'Videos'}
            </h2>
            <div className="grid-2">
              <div className="video-placeholder">
                <div className="img-placeholder" style={{ height: '220px' }}>
                  <span>🎬 {lang === 'fr' ? 'Vidéo présentation GreenFCO — YouTube/Vimeo' : 'GreenFCO presentation video — YouTube/Vimeo'}</span>
                </div>
              </div>
              <div className="video-placeholder">
                <div className="img-placeholder" style={{ height: '220px' }}>
                  <span>🎬 {lang === 'fr' ? 'Vidéo terrain — Formation agroécologie' : 'Field video — Agroecology training'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            {lightbox.image_url ? (
              <img src={lightbox.image_url} alt={lang === 'fr' ? lightbox.label_fr : lightbox.label_en} style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '8px', display: 'block' }} />
            ) : (
              <div className="img-placeholder" style={{ width: '100%', height: '400px' }}>
                <span>{lang === 'fr' ? lightbox.label_fr : lightbox.label_en}</span>
              </div>
            )}
            <p className="lightbox-caption">{lang === 'fr' ? lightbox.label_fr : lightbox.label_en}</p>
          </div>
        </div>
      )}
    </main>
  );
}

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './SpeciesLibrary.css';

const SPECIES = [
  {
    id: 1, name_fr: 'Maïs', name_en: 'Maize', name_local: 'Mais (Dioula)', icon: '🌽',
    soil: 'Limoneux, bien drainé', water: 'Modéré (500-800mm/an)', growth_days: '90-120',
    desc_fr: 'Céréale de base, très cultivée au Burkina Faso. Tolère les sols variés mais préfère les sols limoneux fertiles.',
    desc_en: 'Staple cereal, widely grown in Burkina Faso. Tolerates various soils but prefers fertile loamy soils.',
    pests_fr: 'Chenille légionnaire (Spodoptera frugiperda), foreurs de tige, pucerons',
    pests_en: 'Fall armyworm (Spodoptera frugiperda), stem borers, aphids',
    varieties_fr: 'ESPOIR, Barka (résistant à la sécheresse), SOKOURA',
    varieties_en: 'ESPOIR, Barka (drought resistant), SOKOURA',
  },
  {
    id: 2, name_fr: 'Sorgho', name_en: 'Sorghum', name_local: 'Dawa (Mooré)', icon: '🌾',
    soil: 'Argilo-limoneux, tolère sols pauvres', water: 'Faible (400-600mm/an)', growth_days: '90-150',
    desc_fr: 'Céréale très résistante à la sécheresse, adaptée aux zones sahéliennes. Alimentation de base et fourrage.',
    desc_en: 'Very drought-resistant cereal, adapted to Sahelian zones. Staple food and fodder.',
    pests_fr: 'Anthracnose, cécidomyie des fleurs, foreurs du sorgho',
    pests_en: 'Anthracnose, sorghum midge, stem borers',
    varieties_fr: 'Sariasso 14, ICSV 1049, Framida (tannin)',
    varieties_en: 'Sariasso 14, ICSV 1049, Framida (tannin)',
  },
  {
    id: 3, name_fr: 'Mil / Millet', name_en: 'Pearl Millet', name_local: 'Saa (Mooré)', icon: '🌿',
    soil: 'Sableux, bien drainé — tolère sols très pauvres', water: 'Faible (250-500mm/an)', growth_days: '60-90',
    desc_fr: 'Culture la plus adaptée aux zones sahéliennes arides. Excellente résilience aux aléas climatiques.',
    desc_en: 'Best adapted crop to arid Sahelian zones. Excellent resilience to climate variability.',
    pests_fr: 'Mildiou du mil (Sclerospora graminicola), foreurs, criquets',
    pests_en: 'Downy mildew (Sclerospora graminicola), borers, locusts',
    varieties_fr: 'HKP, IKMP5, Zatib',
    varieties_en: 'HKP, IKMP5, Zatib',
  },
  {
    id: 4, name_fr: 'Niébé', name_en: 'Cowpea', name_local: 'Wêndo (Mooré)', icon: '🫘',
    soil: 'Sableux à limoneux, légèrement acide', water: 'Faible (300-500mm/an)', growth_days: '60-90',
    desc_fr: 'Légumineuse essentielle qui fixe l\'azote atmosphérique. Compagne idéale des céréales en association culturale.',
    desc_en: 'Essential legume that fixes atmospheric nitrogen. Ideal companion crop for cereals in intercropping.',
    pests_fr: 'Thrips, bruches, mouche des gousses, pucerons noirs',
    pests_en: 'Thrips, bruchids, pod borer, black aphids',
    varieties_fr: 'KVX396, IT90K-277-2, Nkoumba (précoce)',
    varieties_en: 'KVX396, IT90K-277-2, Nkoumba (early)',
  },
  {
    id: 5, name_fr: 'Oignon', name_en: 'Onion', name_local: 'Zabre-man (Mooré)', icon: '🧅',
    soil: 'Limoneux, riche en matière organique', water: 'Modéré-élevé (régulier)', growth_days: '90-120',
    desc_fr: 'Culture maraîchère à haute valeur marchande. Très importante pour l\'exportation vers les pays côtiers.',
    desc_en: 'High-value market garden crop. Very important for export to coastal countries.',
    pests_fr: 'Mildiou, cercosporiose, thrips, mouche de l\'oignon',
    pests_en: 'Downy mildew, cercospora, thrips, onion fly',
    varieties_fr: 'Galmi violet (très export), Violet de Galmi, Safari',
    varieties_en: 'Galmi violet (highly exported), Violet de Galmi, Safari',
  },
  {
    id: 6, name_fr: 'Tomate', name_en: 'Tomato', name_local: 'Tomate', icon: '🍅',
    soil: 'Limoneux profond, bien drainé, pH 6-7', water: 'Élevé (régulier, 4-7L/plant/jour)', growth_days: '60-90',
    desc_fr: 'Culture maraîchère très rentable mais exigeante. Nécessite une irrigation régulière et contrôle phytosanitaire.',
    desc_en: 'Very profitable but demanding market garden crop. Requires regular irrigation and pest control.',
    pests_fr: 'Alternariose, mildiou, tuta absoluta, mouche blanche',
    pests_en: 'Alternaria blight, late blight, Tuta absoluta, whitefly',
    varieties_fr: 'Roma VF, Cal J (résistant), Mongal F1',
    varieties_en: 'Roma VF, Cal J (resistant), Mongal F1',
  },
  {
    id: 7, name_fr: 'Faidherbia albida', name_en: 'Winter Thorn', name_local: 'Zaanga (Mooré)', icon: '🌳',
    soil: 'Tous types, profond, tolère sols secs', water: 'Très faible (espèce agroforestière)', growth_days: 'Arbre (20-30 ans)',
    desc_fr: 'Arbre agroforestier emblématique du Sahel. La seule espèce qui garde ses feuilles en saison sèche et les perd en saison des pluies — permettant les cultures sous couvert. Fixe l\'azote, améliore la fertilité des sols.',
    desc_en: 'Emblematic Sahel agroforestry tree. The only species that keeps its leaves in the dry season and sheds them in the rainy season — allowing crops to grow in its shade. Fixes nitrogen, improves soil fertility.',
    pests_fr: 'Relativement résistant — capside, punaises en cas de stress',
    pests_en: 'Relatively resistant — capsid bugs under stress conditions',
    varieties_fr: 'Espèce unique — sélection de provenances locales recommandée',
    varieties_en: 'Single species — selection of local provenances recommended',
  },
  {
    id: 8, name_fr: 'Sésame', name_en: 'Sesame', name_local: 'Wulli (Mooré)', icon: '🌻',
    soil: 'Sableux à limoneux, bien drainé', water: 'Faible (350-500mm/an)', growth_days: '85-120',
    desc_fr: 'Culture de rente à haute valeur export. Très adapté aux zones sèches. Demande en plein essor sur les marchés internationaux.',
    desc_en: 'High-value export cash crop. Very adapted to dry zones. Booming demand on international markets.',
    pests_fr: 'Alternariose des feuilles, pourriture des racines, pucerons',
    pests_en: 'Leaf alternaria, root rot, aphids',
    varieties_fr: 'S42 (blanc, export), Yanfolila, Lalo (résistant)',
    varieties_en: 'S42 (white, export), Yanfolila, Lalo (resistant)',
  },
  {
    id: 9, name_fr: 'Moringa', name_en: 'Moringa', name_local: 'Arsandre (Mooré)', icon: '🌿',
    soil: 'Tous types, bien drainé', water: 'Faible-modéré (résistant sécheresse)', growth_days: '6 mois (feuilles)',
    desc_fr: '"L\'arbre miracle" — nutrition exceptionnelle (vitamines A, C, protéines). Pousse rapidement, résiste à la sécheresse. Feuilles, graines et huile valorisables.',
    desc_en: '"The miracle tree" — exceptional nutrition (vitamins A, C, protein). Grows quickly, drought resistant. Leaves, seeds, and oil all valorizable.',
    pests_fr: 'Pucerons, chenilles défoliatrices — généralement résistant',
    pests_en: 'Aphids, defoliating caterpillars — generally resistant',
    varieties_fr: 'PKM1 (graines grosses), locale (robuste)',
    varieties_en: 'PKM1 (large seeds), local variety (robust)',
  },
];

export default function SpeciesLibrary() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = SPECIES.filter(s =>
    s.name_fr.toLowerCase().includes(search.toLowerCase()) ||
    s.name_en.toLowerCase().includes(search.toLowerCase()) ||
    s.name_local.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="species-library">
      <div className="module-header">
        <div>
          <h1>{lang === 'fr' ? 'Bibliothèque des Espèces' : 'Species Library'}</h1>
          <p>{lang === 'fr' ? 'Cultures adaptées à l\'Afrique de l\'Ouest' : 'Crops adapted to West Africa'}</p>
        </div>
        <span className="badge badge-green">{SPECIES.length} espèces</span>
      </div>

      <div className="species-search card" style={{ padding: '1rem 1.5rem' }}>
        <input
          type="text"
          className="form-input"
          placeholder={lang === 'fr' ? '🔍 Rechercher une espèce...' : '🔍 Search a species...'}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="species-layout">
        <div className="species-list">
          {filtered.map(species => (
            <div
              key={species.id}
              className={`species-item card ${selected?.id === species.id ? 'selected' : ''}`}
              onClick={() => setSelected(species)}
            >
              <span className="species-icon">{species.icon}</span>
              <div>
                <h4>{lang === 'fr' ? species.name_fr : species.name_en}</h4>
                <p>{species.name_local}</p>
              </div>
              <span className="species-days">⏱ {species.growth_days}j</span>
            </div>
          ))}
        </div>

        <div className="species-detail">
          {!selected ? (
            <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
              <span style={{ fontSize: '3rem' }}>📚</span>
              <h3 style={{ marginTop: '1rem' }}>
                {lang === 'fr' ? 'Sélectionnez une espèce' : 'Select a species'}
              </h3>
              <p style={{ color: 'var(--gray-mid)' }}>
                {lang === 'fr' ? 'Cliquez sur une culture pour voir ses détails.' : 'Click on a crop to see its details.'}
              </p>
            </div>
          ) : (
            <div className="card species-detail-card">
              <div className="species-detail-header">
                <span className="species-detail-icon">{selected.icon}</span>
                <div>
                  <h2>{lang === 'fr' ? selected.name_fr : selected.name_en}</h2>
                  <p className="species-latin">{selected.name_local}</p>
                </div>
              </div>

              <p className="species-desc">
                {lang === 'fr' ? selected.desc_fr : selected.desc_en}
              </p>

              <div className="species-info-grid">
                <div className="species-info-item">
                  <span className="info-label">🌍 {lang === 'fr' ? 'Sol' : 'Soil'}</span>
                  <span>{selected.soil}</span>
                </div>
                <div className="species-info-item">
                  <span className="info-label">💧 {lang === 'fr' ? 'Eau' : 'Water'}</span>
                  <span>{selected.water}</span>
                </div>
                <div className="species-info-item">
                  <span className="info-label">⏱ {lang === 'fr' ? 'Durée cycle' : 'Cycle duration'}</span>
                  <span>{selected.growth_days} {lang === 'fr' ? 'jours' : 'days'}</span>
                </div>
              </div>

              <div className="species-section">
                <h4>🐛 {lang === 'fr' ? 'Ravageurs & maladies' : 'Pests & diseases'}</h4>
                <p>{lang === 'fr' ? selected.pests_fr : selected.pests_en}</p>
              </div>

              <div className="species-section">
                <h4>🌱 {lang === 'fr' ? 'Variétés recommandées' : 'Recommended varieties'}</h4>
                <p>{lang === 'fr' ? selected.varieties_fr : selected.varieties_en}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

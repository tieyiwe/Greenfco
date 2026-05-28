import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './NetworkPage.css';

const NETWORK_MODULES = [
  { icon: '💬', fr: 'Forums', en: 'Forums', desc_fr: 'Discussions par thème', desc_en: 'Discussions by topic', soon: false },
  { icon: '🔬', fr: 'Experts', en: 'Experts', desc_fr: 'Consultez des experts', desc_en: 'Consult experts', soon: false },
  { icon: '📅', fr: 'Événements', en: 'Events', desc_fr: 'Formations et webinaires', desc_en: 'Training and webinars', soon: false },
  { icon: '📚', fr: 'Ressources', en: 'Resources', desc_fr: 'Guides et fiches pratiques', desc_en: 'Guides and fact sheets', soon: false },
  { icon: '🌳', fr: 'Parrainage Plantes', en: 'Plant Sponsorship', desc_fr: 'Parrainer des arbres', desc_en: 'Sponsor trees', soon: true },
  { icon: '💼', fr: 'Hub Investisseurs', en: 'Investor Hub', desc_fr: 'Projets à financer', desc_en: 'Projects to fund', soon: true },
  { icon: '📊', fr: 'Impact', en: 'Impact', desc_fr: 'Mesurer votre impact', desc_en: 'Measure your impact', soon: true },
];

export default function NetworkPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  return (
    <div className="network-page">
      <div className="network-hero">
        <h1>{lang === 'fr' ? 'Réseau Agro-Environnemental' : 'Agro-Environmental Network'}</h1>
        <p>
          {lang === 'fr'
            ? 'Connectez-vous avec des experts, agriculteurs et organisations partageant la vision d\'une agriculture durable.'
            : 'Connect with experts, farmers, and organizations sharing the vision of sustainable agriculture.'}
        </p>
      </div>

      <div className="network-modules">
        {NETWORK_MODULES.map(mod => (
          <div key={mod.fr} className={`network-module-card card ${mod.soon ? 'coming-soon' : ''}`}>
            <span className="network-icon">{mod.icon}</span>
            <h3>{lang === 'fr' ? mod.fr : mod.en}</h3>
            <p>{lang === 'fr' ? mod.desc_fr : mod.desc_en}</p>
            {mod.soon ? (
              <span className="badge badge-earth">{lang === 'fr' ? 'Bientôt' : 'Coming soon'}</span>
            ) : (
              <button className="btn btn-secondary btn-sm">
                {lang === 'fr' ? 'Accéder' : 'Access'} →
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Elie Dipama Featured Expert */}
      <div className="featured-expert card">
        <div className="expert-header">
          <div className="expert-avatar-lg">E</div>
          <div>
            <span className="badge badge-green">{lang === 'fr' ? '⭐ Expert fondateur' : '⭐ Founding expert'}</span>
            <h2>Wenmanegda Elie DIPAMA</h2>
            <p>{lang === 'fr' ? 'Co-fondateur GreenFCO · Expert Agro-Environnemental' : 'GreenFCO Co-founder · Agro-Environmental Expert'}</p>
          </div>
        </div>
        <div className="expert-fellowships-inline">
          <span className="badge badge-green">🏅 Mandela Washington Fellow · YALI 2023</span>
          <span className="badge badge-green">🔬 Alexander von Humboldt Fellow 2025</span>
          <span className="badge badge-green">🎓 Research Associate · Humboldt Universität Berlin</span>
        </div>
        <div className="expert-specialties">
          {(lang === 'fr'
            ? ['Agriculture climato-intelligente', 'Agroécologie', 'Finance carbone', 'Formation de Formateurs', 'Analyse des politiques agricoles']
            : ['Climate-smart agriculture', 'Agroecology', 'Carbon finance', 'Training of Trainers', 'Agricultural policy analysis']
          ).map(s => <span key={s} className="badge badge-green">{s}</span>)}
        </div>
        <a href="mailto:dipelie@yahoo.fr" className="btn btn-primary btn-sm">
          {lang === 'fr' ? 'Demander une consultation' : 'Request a consultation'}
        </a>
      </div>
    </div>
  );
}

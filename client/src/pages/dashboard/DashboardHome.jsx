import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../store/authStore';
import './DashboardHome.css';

const MODULES = [
  { to: '/dashboard/crops', icon: '🌱', fr: 'Mes Cultures', en: 'My Crops', desc_fr: 'Gérer vos cycles de culture', desc_en: 'Manage your crop cycles' },
  { to: '/dashboard/irrigation', icon: '💧', fr: 'Irrigation', en: 'Irrigation', desc_fr: 'Planifier vos irrigations', desc_en: 'Plan your irrigation' },
  { to: '/dashboard/finance', icon: '💰', fr: 'Finances', en: 'Finance', desc_fr: 'Suivre vos revenus/dépenses', desc_en: 'Track income & expenses' },
  { to: '/dashboard/map', icon: '🗺️', fr: 'Cartographie', en: 'Farm Map', desc_fr: 'Cartographier vos parcelles', desc_en: 'Map your farm plots' },
  { to: '/dashboard/weather', icon: '🌤️', fr: 'Météo', en: 'Weather', desc_fr: 'Prévisions et alertes', desc_en: 'Forecasts and alerts' },
  { to: '/dashboard/species', icon: '📚', fr: 'Espèces', en: 'Species', desc_fr: 'Bibliothèque des cultures', desc_en: 'Crop species library' },
  { to: '/market', icon: '🛒', fr: 'Marché', en: 'Market', desc_fr: 'Vendre vos produits', desc_en: 'Sell your produce' },
  { to: '/dashboard/business-plan', icon: '📋', fr: 'Business Plan', en: 'Business Plan', desc_fr: 'Planifier votre activité', desc_en: 'Plan your business' },
  { to: '/dashboard/soil-advisor', icon: '🔍', fr: 'Conseiller IA', en: 'AI Advisor', desc_fr: 'Diagnostic maladies/sols', desc_en: 'Disease & soil diagnosis' },
  { to: '/dashboard/greenbot', icon: '🤖', fr: 'GreenBot', en: 'GreenBot', desc_fr: 'Votre assistant agricole IA', desc_en: 'Your AI farm assistant' },
  { to: '/dashboard/koob-assist', icon: '📱', fr: 'Koob Assist', en: 'Koob Assist', desc_fr: "Plan d'action IA pour votre exploitation", desc_en: 'AI action plan for your farm business' },
];

export default function DashboardHome() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const { user } = useAuthStore();

  const greeting = lang === 'fr'
    ? `Bonjour, ${user?.name?.split(' ')[0] || 'Utilisateur'} 👋`
    : `Hello, ${user?.name?.split(' ')[0] || 'User'} 👋`;

  return (
    <div className="dashboard-home">
      <div className="dashboard-greeting">
        <h1>{greeting}</h1>
        <p>
          {lang === 'fr'
            ? 'Que souhaitez-vous faire aujourd\'hui ?'
            : 'What would you like to do today?'}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="dashboard-stats">
        <StatCard icon="🌿" value="—" label={lang === 'fr' ? 'Cultures actives' : 'Active crops'} />
        <StatCard icon="🌍" value="—" label={lang === 'fr' ? 'Hectares suivis' : 'Hectares tracked'} />
        <StatCard icon="💰" value="—" label={lang === 'fr' ? 'Revenue ce mois' : 'Revenue this month'} color="earth" />
        <StatCard icon="🌤️" value="—°C" label={lang === 'fr' ? 'Température locale' : 'Local temperature'} />
      </div>

      {/* Modules Grid */}
      <div className="dashboard-modules-grid">
        {MODULES.map((mod) => (
          <Link key={mod.to} to={mod.to} className="module-card card">
            <span className="module-icon">{mod.icon}</span>
            <h3>{lang === 'fr' ? mod.fr : mod.en}</h3>
            <p>{lang === 'fr' ? mod.desc_fr : mod.desc_en}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions card">
        <h3>{lang === 'fr' ? 'Actions rapides' : 'Quick actions'}</h3>
        <div className="quick-actions-grid">
          <Link to="/dashboard/crops" className="btn btn-primary btn-sm">
            {lang === 'fr' ? '+ Nouvelle culture' : '+ New crop'}
          </Link>
          <Link to="/market" className="btn btn-secondary btn-sm">
            {lang === 'fr' ? '+ Publier annonce' : '+ Post listing'}
          </Link>
          <Link to="/dashboard/greenbot" className="btn btn-secondary btn-sm">
            {lang === 'fr' ? '💬 Demander à GreenBot' : '💬 Ask GreenBot'}
          </Link>
          <a
            href="https://wa.me/22600000000"
            target="_blank"
            rel="noreferrer"
            className="btn btn-whatsapp btn-sm"
          >
            💬 {lang === 'fr' ? 'Contacter expert' : 'Contact expert'}
          </a>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, color = 'green' }) {
  return (
    <div className={`stat-card stat-card-${color}`}>
      <span className="stat-card-icon">{icon}</span>
      <span className="stat-card-value">{value}</span>
      <span className="stat-card-label">{label}</span>
    </div>
  );
}

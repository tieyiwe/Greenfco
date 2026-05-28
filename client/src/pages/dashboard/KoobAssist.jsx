import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../api/client';
import './KoobAssist.css';

const ACTIVITIES = [
  { value: 'maraichage', fr: 'Maraîchage', en: 'Market Gardening', icon: '🥬' },
  { value: 'cereales', fr: 'Céréales', en: 'Cereals', icon: '🌾' },
  { value: 'elevage', fr: 'Élevage', en: 'Livestock', icon: '🐄' },
  { value: 'mixte', fr: 'Agri. Mixte', en: 'Mixed Farming', icon: '🌱' },
  { value: 'transformation', fr: 'Transformation', en: 'Agri-Processing', icon: '🏭' },
];

const BUDGET_OPTIONS = [
  { value: 'low', fr: '< 50 000 FCFA/mois', en: '< 50,000 FCFA/mo' },
  { value: 'medium', fr: '50 000 – 200 000 FCFA/mois', en: '50k–200k FCFA/mo' },
  { value: 'high', fr: '200 000 – 500 000 FCFA/mois', en: '200k–500k FCFA/mo' },
  { value: 'very_high', fr: '> 500 000 FCFA/mois', en: '> 500k FCFA/mo' },
];

const CHALLENGES = [
  { value: 'water', fr: "Accès à l'eau", en: 'Water access' },
  { value: 'inputs', fr: 'Intrants agricoles', en: 'Agricultural inputs' },
  { value: 'financing', fr: 'Financement', en: 'Financing' },
  { value: 'market', fr: 'Débouchés commerciaux', en: 'Market access' },
  { value: 'technique', fr: 'Techniques agricoles', en: 'Farming techniques' },
  { value: 'climate', fr: 'Changements climatiques', en: 'Climate variability' },
  { value: 'labor', fr: "Main d'œuvre", en: 'Labor shortage' },
];

const OBJECTIVES = [
  { value: 'income', fr: 'Augmenter mes revenus', en: 'Increase my income' },
  { value: 'costs', fr: 'Réduire mes coûts', en: 'Reduce my costs' },
  { value: 'diversify', fr: 'Diversifier mon activité', en: 'Diversify my business' },
  { value: 'funding', fr: 'Obtenir un financement', en: 'Secure financing' },
  { value: 'certify', fr: 'Me certifier / Me former', en: 'Get certified / Trained' },
];

const FALLBACK_PLAN_FR = `## 🎯 Actions Immédiates (0-2 semaines)
- Dresser l'inventaire complet de vos ressources actuelles (terres, équipements, semences)
- Identifier 2-3 marchés locaux les plus proches et leurs jours de marché
- Ouvrir un carnet de bord simplifié pour suivre vos dépenses et revenus
- Contacter GreenFCO pour une consultation gratuite initiale
- Vérifier l'état de vos sources d'eau avant la prochaine saison

## 📅 Plan 30 jours
- Établir un calendrier cultural pour les 6 prochains mois
- Calculer vos coûts de production par hectare (avec notre outil Finance)
- Identifier une culture à haute valeur marchande adaptée à votre zone
- Rejoindre au moins un groupement d'agriculteurs local
- Mettre en place un suivi des prix sur votre marché local
- Tester les outils du tableau de bord GreenFCO (météo, cultures, irrigation)
- Explorer les options de crédit agricole disponibles dans votre région

## 📈 Plan 90 jours
- Diversifier avec une culture de contre-saison si l'eau le permet
- Négocier des contrats d'approvisionnement avec des acheteurs locaux
- Soumettre un dossier à un programme de financement agricole
- Suivre une formation GreenFCO en Agriculture Durable

## 💡 Ressources GreenFCO Recommandées
- **Assistance-Conseil** : Accompagnement personnalisé pour votre plan d'affaires
- **Formations** : Agriculture Durable et Agriculture Intelligente pour votre région
- **Marché Numérique** : Publiez vos produits et trouvez des acheteurs directement
- **Intrants BioGrowth** : Bio-fertilisant liquide pour améliorer vos rendements

## ⚠️ Points de vigilance
- Suivez quotidiennement les prévisions météo (module Météo disponible)
- Maintenez un fonds de réserve d'au moins 10% de votre budget pour les imprévus
- Évitez de vous endetter au-delà de votre capacité de remboursement saisonnière`;

const FALLBACK_PLAN_EN = `## 🎯 Immediate Actions (0-2 weeks)
- Take a complete inventory of your current resources (land, equipment, seeds)
- Identify 2-3 nearest local markets and their market days
- Start a simple logbook to track expenses and income
- Contact GreenFCO for a free initial consultation
- Assess the state of your water sources before the next season

## 📅 30-Day Plan
- Build a 6-month crop calendar
- Calculate your production costs per hectare (using the Finance tool)
- Identify a high-value crop suited to your area
- Join at least one local farmer group
- Track prices at your local market weekly
- Explore GreenFCO dashboard tools (weather, crops, irrigation)
- Research available agricultural credit options in your region

## 📈 90-Day Plan
- Diversify with an off-season crop if water allows
- Negotiate supply agreements with local buyers
- Submit an application to an agricultural financing program
- Complete a GreenFCO Sustainable Agriculture training

## 💡 Recommended GreenFCO Resources
- **Advisory Services**: Personalized support for your business plan
- **Training Programs**: Sustainable and Smart Agriculture courses for your region
- **Digital Market**: List your products and find buyers directly
- **BioGrowth Inputs**: Liquid bio-fertilizer to improve your yields

## ⚠️ Key Risks to Monitor
- Track daily weather forecasts (Weather module available)
- Maintain a reserve fund of at least 10% of your budget for emergencies
- Avoid borrowing beyond your seasonal repayment capacity`;

export default function KoobAssist() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const [tab, setTab] = useState('diagnostic');
  const [form, setForm] = useState({ activity: '', surface: '', budget: '', challenges: [], objective: '' });
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState({});

  function toggleChallenge(val) {
    setForm(p => ({
      ...p,
      challenges: p.challenges.includes(val) ? p.challenges.filter(c => c !== val) : [...p.challenges, val],
    }));
  }

  async function handleGenerate(e) {
    e.preventDefault();
    if (!form.activity || !form.objective) return;
    setLoading(true);
    const actLbl = ACTIVITIES.find(a => a.value === form.activity)?.[lang] || form.activity;
    const budLbl = BUDGET_OPTIONS.find(b => b.value === form.budget)?.[lang] || '';
    const chalLbls = form.challenges.map(c => CHALLENGES.find(ch => ch.value === c)?.[lang]).filter(Boolean).join(', ');
    const objLbl = OBJECTIVES.find(o => o.value === form.objective)?.[lang] || form.objective;

    const prompt = lang === 'fr'
      ? `Activité: ${actLbl}\nSurface: ${form.surface || 'non précisé'} ha\nBudget mensuel: ${budLbl || 'non précisé'}\nDéfis: ${chalLbls || 'non précisés'}\nObjectif: ${objLbl}`
      : `Activity: ${actLbl}\nArea: ${form.surface || 'not specified'} ha\nMonthly budget: ${budLbl || 'not specified'}\nChallenges: ${chalLbls || 'none specified'}\nObjective: ${objLbl}`;

    try {
      const res = await api.post('/ai/koob-assist', { prompt, language: lang });
      setPlan(res.data.plan);
    } catch {
      setPlan(lang === 'fr' ? FALLBACK_PLAN_FR : FALLBACK_PLAN_EN);
    } finally {
      setLoading(false);
      setTab('plan');
      setChecked({});
    }
  }

  const planSections = plan
    ? plan.split(/\n(?=## )/).filter(s => s.trim())
    : [];

  return (
    <div className="koob-assist">
      <div className="module-header">
        <div>
          <span className="koob-badge">📱 Beta</span>
          <h1>Koob Assist</h1>
          <p>{lang === 'fr' ? 'Conseiller IA pour entrepreneurs agricoles' : 'AI Advisor for Agricultural Entrepreneurs'}</p>
        </div>
      </div>

      <div className="koob-tabs">
        <button className={`koob-tab ${tab === 'diagnostic' ? 'active' : ''}`} onClick={() => setTab('diagnostic')}>
          📋 {lang === 'fr' ? 'Diagnostic' : 'Assessment'}
        </button>
        <button
          className={`koob-tab ${tab === 'plan' ? 'active' : ''}`}
          onClick={() => setTab('plan')}
          disabled={!plan && tab !== 'plan'}
        >
          📈 {lang === 'fr' ? 'Mon Plan' : 'My Plan'}
          {plan && <span className="koob-dot" />}
        </button>
      </div>

      {tab === 'diagnostic' && (
        <form className="koob-form card" onSubmit={handleGenerate}>
          <h3>{lang === 'fr' ? 'Votre situation agricole' : 'Your Farming Situation'}</h3>
          <p className="koob-intro">
            {lang === 'fr'
              ? "Répondez à 5 questions pour recevoir un plan d'action personnalisé généré par IA."
              : 'Answer 5 questions to receive an AI-generated personalized action plan.'}
          </p>

          <div className="form-group">
            <label className="form-label">
              {lang === 'fr' ? "1. Type d'activité principale *" : '1. Main activity type *'}
            </label>
            <div className="activity-grid">
              {ACTIVITIES.map(act => (
                <button
                  key={act.value}
                  type="button"
                  className={`activity-btn ${form.activity === act.value ? 'selected' : ''}`}
                  onClick={() => setForm(p => ({ ...p, activity: act.value }))}
                >
                  <span className="activity-icon">{act.icon}</span>
                  <span>{lang === 'fr' ? act.fr : act.en}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              {lang === 'fr' ? '2. Surface exploitée (ha)' : '2. Farmed area (hectares)'}
            </label>
            <input
              type="number"
              className="form-input"
              placeholder={lang === 'fr' ? 'Ex : 2.5' : 'E.g. 2.5'}
              value={form.surface}
              onChange={e => setForm(p => ({ ...p, surface: e.target.value }))}
              min="0"
              step="0.1"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              {lang === 'fr' ? '3. Budget mensuel disponible' : '3. Available monthly budget'}
            </label>
            <div className="budget-options">
              {BUDGET_OPTIONS.map(opt => (
                <label key={opt.value} className={`budget-option ${form.budget === opt.value ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="budget"
                    value={opt.value}
                    checked={form.budget === opt.value}
                    onChange={() => setForm(p => ({ ...p, budget: opt.value }))}
                  />
                  {lang === 'fr' ? opt.fr : opt.en}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              {lang === 'fr' ? '4. Principaux défis (plusieurs choix)' : '4. Main challenges (multiple)'}
            </label>
            <div className="chips-grid">
              {CHALLENGES.map(ch => (
                <label key={ch.value} className={`chip ${form.challenges.includes(ch.value) ? 'selected' : ''}`}>
                  <input
                    type="checkbox"
                    checked={form.challenges.includes(ch.value)}
                    onChange={() => toggleChallenge(ch.value)}
                  />
                  {lang === 'fr' ? ch.fr : ch.en}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              {lang === 'fr' ? '5. Objectif principal *' : '5. Main objective *'}
            </label>
            <select
              className="form-select"
              value={form.objective}
              onChange={e => setForm(p => ({ ...p, objective: e.target.value }))}
              required
            >
              <option value="">{lang === 'fr' ? '— Sélectionner —' : '— Select —'}</option>
              {OBJECTIVES.map(obj => (
                <option key={obj.value} value={obj.value}>
                  {lang === 'fr' ? obj.fr : obj.en}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary koob-generate"
            disabled={loading || !form.activity || !form.objective}
          >
            {loading ? (
              <span className="koob-loading-text">
                <span className="koob-spinner">🌿</span>
                {lang === 'fr' ? 'Analyse en cours…' : 'Analyzing…'}
              </span>
            ) : (
              `✨ ${lang === 'fr' ? "Générer mon plan d'action IA" : 'Generate my AI action plan'}`
            )}
          </button>
        </form>
      )}

      {tab === 'plan' && plan && (
        <div className="koob-plan">
          <div className="koob-plan-meta card">
            <span className="koob-plan-badge">✨ {lang === 'fr' ? 'Plan généré par IA' : 'AI-generated plan'}</span>
            <button className="btn btn-secondary btn-sm" onClick={() => setTab('diagnostic')}>
              {lang === 'fr' ? '↩ Modifier' : '↩ Edit'}
            </button>
          </div>

          {planSections.map((section, i) => {
            const lines = section.split('\n').filter(Boolean);
            const title = lines[0]?.replace('## ', '');
            const items = lines.slice(1).filter(l => l.startsWith('- ') || l.startsWith('• '));
            const paras = lines.slice(1).filter(l => !l.startsWith('- ') && !l.startsWith('• ') && l.trim());

            return (
              <div key={i} className="plan-card card">
                <h3 className="plan-title">{title}</h3>
                {items.length > 0 && (
                  <ul className="plan-list">
                    {items.map((item, j) => {
                      const key = `${i}-${j}`;
                      return (
                        <li
                          key={j}
                          className={`plan-item ${checked[key] ? 'done' : ''}`}
                          onClick={() => setChecked(p => ({ ...p, [key]: !p[key] }))}
                        >
                          <span className="plan-check">{checked[key] ? '✅' : '⬜'}</span>
                          <span>{item.replace(/^[-•]\s+/, '').replace(/\*\*(.*?)\*\*/g, '$1')}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {paras.map((p, j) => (
                  <p key={j} className="plan-para">{p.replace(/\*\*(.*?)\*\*/g, '$1')}</p>
                ))}
              </div>
            );
          })}

          <div className="koob-cta">
            <a href="https://wa.me/22600000000" target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              💬 {lang === 'fr' ? 'Parler à un expert GreenFCO' : 'Talk to a GreenFCO expert'}
            </a>
            <button className="btn btn-secondary" onClick={() => { setTab('diagnostic'); setPlan(''); }}>
              {lang === 'fr' ? '🔄 Nouveau diagnostic' : '🔄 New assessment'}
            </button>
          </div>
        </div>
      )}

      {tab === 'plan' && !plan && (
        <div className="koob-empty card">
          <p>📋 {lang === 'fr' ? "Complétez d'abord le diagnostic." : 'Complete the assessment first.'}</p>
          <button className="btn btn-primary" onClick={() => setTab('diagnostic')}>
            {lang === 'fr' ? 'Commencer' : 'Start'}
          </button>
        </div>
      )}
    </div>
  );
}

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

// ─── PlantAnalysisResult component ────────────────────────────────────────────
function PlantAnalysisResult({ analysis, lang, onReset }) {
  const statusColor = { healthy: '#52B788', warning: '#F59E0B', critical: '#EF4444' };
  const severityLabel = { low: lang === 'fr' ? 'Faible' : 'Low', medium: lang === 'fr' ? 'Modérée' : 'Medium', high: lang === 'fr' ? 'Élevée' : 'High' };
  const urgencyLabel = {
    monitor: lang === 'fr' ? '👀 Surveiller' : '👀 Monitor',
    treat_soon: lang === 'fr' ? '⚠️ Traiter bientôt' : '⚠️ Treat soon',
    treat_immediately: lang === 'fr' ? '🚨 Traiter immédiatement' : '🚨 Treat immediately',
  };
  const urgencyColor = { monitor: '#52B788', treat_soon: '#F59E0B', treat_immediately: '#EF4444' };

  return (
    <div className="pa-results">
      {/* Header card */}
      <div className="card pa-result-header" style={{ borderLeft: `4px solid ${statusColor[analysis.healthStatus]}` }}>
        <div className="pa-result-plant">
          <span className="pa-result-name">🌿 {analysis.plantIdentified}</span>
          <span className="pa-confidence">{lang === 'fr' ? 'Confiance' : 'Confidence'}: {analysis.confidence}%</span>
        </div>
        <div className="pa-status-row">
          <span className="pa-status-badge" style={{ background: statusColor[analysis.healthStatus] }}>
            {analysis.healthStatus === 'healthy' ? (lang === 'fr' ? '✅ Saine' : '✅ Healthy')
             : analysis.healthStatus === 'warning' ? (lang === 'fr' ? '⚠️ Attention' : '⚠️ Warning')
             : (lang === 'fr' ? '🚨 Critique' : '🚨 Critical')}
          </span>
          {analysis.urgency && (
            <span className="pa-urgency-badge" style={{ background: urgencyColor[analysis.urgency] }}>
              {urgencyLabel[analysis.urgency]}
            </span>
          )}
        </div>
      </div>

      {/* Issues */}
      {analysis.issues?.length > 0 ? (
        <div className="card">
          <h4>🦠 {lang === 'fr' ? 'Problèmes détectés' : 'Detected Issues'}</h4>
          {analysis.issues.map((issue, i) => (
            <div key={i} className="pa-issue">
              <div className="pa-issue-header">
                <span className="pa-issue-name">{lang === 'fr' ? issue.nameFr || issue.name : issue.name}</span>
                <span className={`pa-severity pa-severity-${issue.severity}`}>
                  {severityLabel[issue.severity]}
                </span>
              </div>
              {issue.symptoms && <p className="pa-issue-detail">📋 {issue.symptoms}</p>}
              {issue.cause && <p className="pa-issue-detail">🔬 {lang === 'fr' ? 'Cause:' : 'Cause:'} {issue.cause}</p>}
              {issue.affectedParts?.length > 0 && (
                <div className="pa-affected">
                  {issue.affectedParts.map(p => <span key={p} className="pa-part">{p}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="card pa-healthy">
          <span>✅</span>
          <p>{lang === 'fr' ? 'Aucun problème détecté. Votre culture semble en bonne santé !' : 'No issues detected. Your crop appears healthy!'}</p>
        </div>
      )}

      {/* Treatments */}
      {analysis.organicTreatment && (
        <div className="card pa-treatment pa-organic">
          <h4>🌿 {lang === 'fr' ? 'Traitement organique (recommandé)' : 'Organic Treatment (recommended)'}</h4>
          <p>{analysis.organicTreatment}</p>
        </div>
      )}
      {analysis.conventionalTreatment && (
        <div className="card pa-treatment pa-conventional">
          <h4>💊 {lang === 'fr' ? 'Traitement conventionnel' : 'Conventional Treatment'}</h4>
          <p>{analysis.conventionalTreatment}</p>
        </div>
      )}
      {analysis.prevention && (
        <div className="card pa-treatment pa-prevention">
          <h4>🛡️ {lang === 'fr' ? 'Prévention' : 'Prevention'}</h4>
          <p>{analysis.prevention}</p>
        </div>
      )}

      {/* References */}
      {analysis.references?.length > 0 && (
        <div className="card pa-refs">
          <span>📚 {lang === 'fr' ? 'Sources:' : 'Sources:'} {analysis.references.join(' · ')}</span>
        </div>
      )}

      {/* Consult CTA */}
      {analysis.recommendConsultation && (
        <div className="card pa-consult-cta">
          <p>👨‍🌾 {lang === 'fr' ? 'Un diagnostic terrain est recommandé pour ce cas.' : 'An on-site diagnosis is recommended for this case.'}</p>
          <a href="/consulting" className="btn btn-primary btn-sm">{lang === 'fr' ? 'Prendre RDV expert' : 'Book Expert Consultation'}</a>
        </div>
      )}

      <button className="btn btn-secondary pa-reset" onClick={onReset}>
        🔄 {lang === 'fr' ? 'Nouvelle analyse' : 'New Analysis'}
      </button>
    </div>
  );
}

// ─── Main KoobAssist component ─────────────────────────────────────────────────
export default function KoobAssist() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const [tab, setTab] = useState('diagnostic');

  // Diagnostic / Plan state
  const [form, setForm] = useState({ activity: '', surface: '', budget: '', challenges: [], objective: '' });
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState({});

  // Plant analyser state
  const [plantImages, setPlantImages] = useState([]);
  const [plantType, setPlantType] = useState('');
  const [plantAnalysis, setPlantAnalysis] = useState(null);
  const [plantLoading, setPlantLoading] = useState(false);
  const [plantError, setPlantError] = useState('');
  const [dragOver, setDragOver] = useState(false);

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

  function handleImageFiles(files) {
    Array.from(files).slice(0, 4 - plantImages.length).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        setPlantImages(prev => [...prev, { preview: e.target.result, base64: e.target.result }].slice(0, 4));
      };
      reader.readAsDataURL(file);
    });
  }

  async function handlePlantAnalyze(e) {
    e.preventDefault();
    if (!plantImages.length) return;
    setPlantLoading(true);
    setPlantError('');
    setPlantAnalysis(null);
    try {
      const res = await api.post('/ai/plant-analyze', {
        images: plantImages.map(img => img.base64),
        plantType,
        language: lang,
      });
      setPlantAnalysis(res.data);
    } catch {
      setPlantError(lang === 'fr' ? "Erreur lors de l'analyse. Réessayez." : 'Analysis error. Please try again.');
    } finally {
      setPlantLoading(false);
    }
  }

  const planSections = plan
    ? plan.split(/\n(?=## )/).filter(s => s.trim())
    : [];

  return (
    <div className="koob-assist">
      <div className="koob-sticky-header">
        <div className="module-header" style={{ marginBottom: 0 }}>
          <div>
            <span className="koob-badge">📱 IA</span>
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
        <button className={`koob-tab ${tab === 'plant' ? 'active' : ''}`} onClick={() => setTab('plant')}>
          🔬 {lang === 'fr' ? 'Analyse Plante' : 'Plant Analysis'}
        </button>
        </div>
      </div>

      {/* ── Diagnostic tab ── */}
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

      {/* ── Plan tab ── */}
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

      {/* ── Plant Analyser tab ── */}
      {tab === 'plant' && (
        <div className="plant-analyser">
          <div className="pa-intro card">
            <h3>🔬 {lang === 'fr' ? 'Analyseur de Plantes IA' : 'AI Plant Analyser'}</h3>
            <p>{lang === 'fr'
              ? 'Prenez 1 à 4 photos de votre culture et notre IA détecte maladies, ravageurs et carences nutritionnelles.'
              : 'Take 1 to 4 photos of your crop and our AI detects diseases, pests and nutritional deficiencies.'
            }</p>
            <div className="pa-supported">
              <span>🌾 Maïs</span><span>🧅 Oignon</span><span>🍅 Tomate</span><span>🫘 Niébé</span>
              <span>🌿 Sésame</span><span>🌻 Tournesol</span><span>+ {lang === 'fr' ? 'plus' : 'more'}</span>
            </div>
          </div>

          <form onSubmit={handlePlantAnalyze} className="card pa-form">
            {/* Plant type field */}
            <div className="form-group">
              <label className="form-label">
                🌱 {lang === 'fr' ? 'Type de culture / plante' : 'Crop / plant type'}
              </label>
              <input
                type="text"
                className="form-input"
                placeholder={lang === 'fr' ? 'Ex: Tomate, Maïs, Oignon, Mil...' : 'E.g. Tomato, Maize, Onion, Millet...'}
                value={plantType}
                onChange={e => setPlantType(e.target.value)}
              />
            </div>

            {/* Image upload zone */}
            <div className="form-group">
              <label className="form-label">
                📸 {lang === 'fr' ? `Photos (${plantImages.length}/4 max)` : `Photos (${plantImages.length}/4 max)`}
              </label>
              <div
                className={`pa-dropzone ${dragOver ? 'drag-over' : ''} ${plantImages.length >= 4 ? 'full' : ''}`}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); handleImageFiles(e.dataTransfer.files); }}
                onClick={() => plantImages.length < 4 && document.getElementById('plant-img-input').click()}
              >
                {plantImages.length === 0 ? (
                  <>
                    <div className="pa-drop-icon">📷</div>
                    <p>{lang === 'fr' ? 'Cliquez ou glissez des photos ici' : 'Click or drag photos here'}</p>
                    <p className="pa-drop-hint">{lang === 'fr' ? 'JPG, PNG — 4 photos maximum' : 'JPG, PNG — 4 photos max'}</p>
                  </>
                ) : (
                  <div className="pa-thumbnails">
                    {plantImages.map((img, i) => (
                      <div key={i} className="pa-thumb">
                        <img src={img.preview} alt={`plant-${i}`} loading="lazy" decoding="async" />
                        <button
                          type="button"
                          className="pa-thumb-remove"
                          onClick={e => { e.stopPropagation(); setPlantImages(prev => prev.filter((_, idx) => idx !== i)); }}
                        >×</button>
                      </div>
                    ))}
                    {plantImages.length < 4 && (
                      <div className="pa-thumb pa-thumb-add">
                        <span>+</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <input
                id="plant-img-input"
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={e => handleImageFiles(e.target.files)}
              />
              {/* Camera capture — opens rear camera directly on mobile */}
              <input
                id="plant-camera-input"
                type="file"
                accept="image/*"
                capture="environment"
                style={{ display: 'none' }}
                onChange={e => handleImageFiles(e.target.files)}
              />
              {plantImages.length < 4 && (
                <button
                  type="button"
                  className="pa-camera-btn"
                  onClick={() => document.getElementById('plant-camera-input').click()}
                >
                  📷 {lang === 'fr' ? 'Prendre une photo' : 'Take a photo'}
                </button>
              )}
            </div>

            {plantError && <div className="pa-error">{plantError}</div>}

            <button type="submit" className="btn btn-primary pa-submit" disabled={plantLoading || !plantImages.length}>
              {plantLoading ? (
                <span>⏳ {lang === 'fr' ? 'Analyse en cours (30s)…' : 'Analyzing (30s)…'}</span>
              ) : (
                <span>🔍 {lang === 'fr' ? "Lancer l'analyse IA" : 'Run AI Analysis'}</span>
              )}
            </button>
          </form>

          {plantAnalysis && (
            <PlantAnalysisResult
              analysis={plantAnalysis}
              lang={lang}
              onReset={() => { setPlantAnalysis(null); setPlantImages([]); setPlantType(''); }}
            />
          )}
        </div>
      )}

    </div>
  );
}

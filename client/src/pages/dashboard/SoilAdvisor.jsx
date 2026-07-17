import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../api/client';
import './SoilAdvisor.css';

export default function SoilAdvisor() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const [form, setForm] = useState({ crop: '', description: '', symptoms: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError('');
    try {
      const res = await api.post('/ai/soil-advisor', { ...form, language: lang });
      setResult(res.data.diagnosis);
    } catch {
      setError(lang === 'fr' ? 'Erreur lors de l\'analyse. Veuillez réessayer.' : 'Analysis error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="soil-advisor">
      <div className="module-header">
        <div>
          <h1>{lang === 'fr' ? 'Conseiller IA — Sol & Ravageurs' : 'AI Advisor — Soil & Pests'}</h1>
          <p>{lang === 'fr' ? 'Diagnostic intelligent de vos problèmes agricoles' : 'Intelligent diagnosis of your farming problems'}</p>
        </div>
        <span className="badge badge-green">Claude AI</span>
      </div>

      <div className="advisor-layout">
        <div className="card advisor-form">
          <h3>{lang === 'fr' ? 'Décrire le problème' : 'Describe the problem'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">{lang === 'fr' ? 'Culture concernée' : 'Affected crop'} *</label>
              <input
                type="text"
                className="form-input"
                value={form.crop}
                onChange={e => setForm(p => ({ ...p, crop: e.target.value }))}
                required
                placeholder={lang === 'fr' ? 'Ex: Maïs, Tomate, Sorgho...' : 'Ex: Maize, Tomato, Sorghum...'}
              />
            </div>
            <div className="form-group">
              <label className="form-label">{lang === 'fr' ? 'Symptômes observés' : 'Observed symptoms'} *</label>
              <textarea
                className="form-input"
                value={form.symptoms}
                onChange={e => setForm(p => ({ ...p, symptoms: e.target.value }))}
                required
                rows={4}
                placeholder={lang === 'fr'
                  ? 'Décrivez les symptômes : couleur des feuilles, taches, flétrissement, présence d\'insectes...'
                  : 'Describe symptoms: leaf color, spots, wilting, insect presence...'}
              />
            </div>
            <div className="form-group">
              <label className="form-label">{lang === 'fr' ? 'Contexte (optionnel)' : 'Context (optional)'}</label>
              <textarea
                className="form-input"
                value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                rows={3}
                placeholder={lang === 'fr'
                  ? 'Type de sol, région, derniers intrants utilisés, météo récente...'
                  : 'Soil type, region, recent inputs used, recent weather...'}
              />
            </div>
            {error && <div style={{ color: '#c00', fontSize: '0.87rem', marginBottom: '0.75rem' }}>{error}</div>}
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
              {loading ? (lang === 'fr' ? '🔍 Analyse en cours...' : '🔍 Analyzing...') : (lang === 'fr' ? '🔍 Analyser' : '🔍 Analyze')}
            </button>
          </form>
        </div>

        <div className="advisor-result">
          {!result && !loading && (
            <div className="advisor-empty card">
              <span>🌿</span>
              <h3>{lang === 'fr' ? 'Diagnostic IA' : 'AI Diagnosis'}</h3>
              <p>{lang === 'fr'
                ? 'Décrivez votre problème agricole et notre IA vous fournira un diagnostic avec des recommandations de traitement adaptées à l\'Afrique de l\'Ouest.'
                : 'Describe your farming problem and our AI will provide a diagnosis with treatment recommendations adapted to West Africa.'}
              </p>
              <div className="advisor-capabilities">
                <span>✅ {lang === 'fr' ? 'Maladies des plantes' : 'Plant diseases'}</span>
                <span>✅ {lang === 'fr' ? 'Carences nutritives' : 'Nutrient deficiencies'}</span>
                <span>✅ {lang === 'fr' ? 'Ravageurs & insectes' : 'Pests & insects'}</span>
                <span>✅ {lang === 'fr' ? 'Problèmes de sol' : 'Soil problems'}</span>
                <span>✅ {lang === 'fr' ? 'Solutions organiques' : 'Organic solutions'}</span>
              </div>
            </div>
          )}

          {loading && (
            <div className="card" style={{ padding: '2rem' }}>
              <div className="skeleton" style={{ height: '24px', marginBottom: '1rem', width: '60%' }} />
              <div className="skeleton" style={{ height: '100px', marginBottom: '1rem' }} />
              <div className="skeleton" style={{ height: '80px', marginBottom: '1rem' }} />
              <div className="skeleton" style={{ height: '60px' }} />
            </div>
          )}

          {result && (
            <div className="diagnosis-result card">
              <div className="diagnosis-header">
                <span>🔬</span>
                <h3>{lang === 'fr' ? 'Résultat du diagnostic' : 'Diagnosis result'}</h3>
              </div>
              <div className="prose" style={{ fontSize: '0.9rem' }}>
                <div dangerouslySetInnerHTML={{ __html: renderDiagnosis(result) }} />
              </div>
              <div className="diagnosis-footer">
                <div className="badge badge-green">
                  {lang === 'fr' ? '✅ Recommandations organiques prioritaires' : '✅ Organic recommendations prioritized'}
                </div>
                <p>
                  {lang === 'fr'
                    ? 'Pour un suivi professionnel, contactez l\'équipe GreenFCO.'
                    : 'For professional follow-up, contact the GreenFCO team.'}
                </p>
                <a href="mailto:info@greenfco.com" className="btn btn-secondary btn-sm">
                  {lang === 'fr' ? 'Contacter un expert' : 'Contact an expert'}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function renderDiagnosis(text) {
  // Escape HTML entities first to prevent XSS from AI output, then apply markdown
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<h|<ul|<li)(.+)$/gm, (m, p1) => p1.startsWith('<') ? m : `<p>${p1}</p>`);
}

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './IrrigationManager.css';

const WATER_NEEDS = {
  'Maïs / Maize': { min: 500, max: 800, unit: 'mm/saison' },
  'Sorgho / Sorghum': { min: 400, max: 600, unit: 'mm/saison' },
  'Mil / Millet': { min: 250, max: 500, unit: 'mm/saison' },
  'Oignon / Onion': { min: 350, max: 550, unit: 'mm/saison' },
  'Tomate / Tomato': { min: 400, max: 600, unit: 'mm/saison' },
  'Niébé / Cowpea': { min: 300, max: 500, unit: 'mm/saison' },
};

export default function IrrigationManager() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const [crop, setCrop] = useState('');
  const [area, setArea] = useState('');
  const [logs, setLogs] = useState([
    { id: 1, date: '2024-06-10', amount_liters: 2000, method: lang === 'fr' ? 'Goutte-à-goutte' : 'Drip', notes: 'Maïs parcelle A' },
    { id: 2, date: '2024-06-08', amount_liters: 3500, method: lang === 'fr' ? 'Aspersion' : 'Sprinkler', notes: 'Oignons' },
  ]);
  const [showLog, setShowLog] = useState(false);
  const [logForm, setLogForm] = useState({ date: new Date().toISOString().slice(0, 10), amount_liters: '', method: 'Goutte-à-goutte', notes: '' });

  const selected = WATER_NEEDS[crop];
  const areaNum = parseFloat(area) || 0;

  function addLog(e) {
    e.preventDefault();
    setLogs(prev => [{ id: Date.now(), ...logForm, amount_liters: Number(logForm.amount_liters) }, ...prev]);
    setShowLog(false);
  }

  const totalWater = logs.reduce((s, l) => s + l.amount_liters, 0);

  return (
    <div className="irrigation-manager">
      <div className="module-header">
        <div>
          <h1>{lang === 'fr' ? 'Gestionnaire d\'Irrigation' : 'Irrigation Manager'}</h1>
          <p>{lang === 'fr' ? 'Calculez vos besoins en eau et planifiez vos irrigations' : 'Calculate your water needs and plan your irrigations'}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowLog(!showLog)}>
          {showLog ? '✕' : `+ ${lang === 'fr' ? 'Log irrigation' : 'Log irrigation'}`}
        </button>
      </div>

      {/* Calculator */}
      <div className="card" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.25rem' }}>{lang === 'fr' ? '💧 Calculateur de besoins en eau' : '💧 Water needs calculator'}</h3>
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">{lang === 'fr' ? 'Culture' : 'Crop'}</label>
            <select className="form-select" value={crop} onChange={e => setCrop(e.target.value)}>
              <option value="">{lang === 'fr' ? 'Sélectionner...' : 'Select...'}</option>
              {Object.keys(WATER_NEEDS).map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">{lang === 'fr' ? 'Superficie (ha)' : 'Area (ha)'}</label>
            <input type="number" className="form-input" value={area} onChange={e => setArea(e.target.value)} min="0" step="0.1" placeholder="Ex: 0.5" />
          </div>
        </div>
        {selected && areaNum > 0 && (
          <div className="water-result">
            <div className="water-result-item">
              <span>💧</span>
              <div>
                <p>{lang === 'fr' ? 'Besoin minimum' : 'Minimum need'}</p>
                <strong>{(selected.min * areaNum * 10).toLocaleString()} L/saison</strong>
              </div>
            </div>
            <div className="water-result-item">
              <span>💦</span>
              <div>
                <p>{lang === 'fr' ? 'Besoin maximum' : 'Maximum need'}</p>
                <strong>{(selected.max * areaNum * 10).toLocaleString()} L/saison</strong>
              </div>
            </div>
            <div className="water-result-item">
              <span>📅</span>
              <div>
                <p>{lang === 'fr' ? 'Fréquence recommandée' : 'Recommended frequency'}</p>
                <strong>{lang === 'fr' ? 'Tous les 2-3 jours' : 'Every 2-3 days'}</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Log Form */}
      {showLog && (
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.25rem' }}>{lang === 'fr' ? 'Enregistrer une irrigation' : 'Log an irrigation'}</h3>
          <form onSubmit={addLog}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Date' : 'Date'}</label>
                <input type="date" className="form-input" value={logForm.date} onChange={e => setLogForm(p => ({ ...p, date: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Quantité (litres)' : 'Amount (liters)'} *</label>
                <input type="number" className="form-input" value={logForm.amount_liters} onChange={e => setLogForm(p => ({ ...p, amount_liters: e.target.value }))} required min="0" />
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Méthode' : 'Method'}</label>
                <select className="form-select" value={logForm.method} onChange={e => setLogForm(p => ({ ...p, method: e.target.value }))}>
                  <option>{lang === 'fr' ? 'Goutte-à-goutte' : 'Drip'}</option>
                  <option>{lang === 'fr' ? 'Aspersion' : 'Sprinkler'}</option>
                  <option>{lang === 'fr' ? 'Submersion' : 'Flood'}</option>
                  <option>{lang === 'fr' ? 'Manuel' : 'Manual'}</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Notes</label>
                <input type="text" className="form-input" value={logForm.notes} onChange={e => setLogForm(p => ({ ...p, notes: e.target.value }))} placeholder={lang === 'fr' ? 'Parcelle, observations...' : 'Plot, observations...'} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="submit" className="btn btn-primary">{lang === 'fr' ? 'Enregistrer' : 'Save'}</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowLog(false)}>{lang === 'fr' ? 'Annuler' : 'Cancel'}</button>
            </div>
          </form>
        </div>
      )}

      {/* Summary */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1rem' }}>{lang === 'fr' ? 'Historique des irrigations' : 'Irrigation history'}</h3>
          <span className="badge badge-green">💧 {totalWater.toLocaleString()} L {lang === 'fr' ? 'total' : 'total'}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {logs.map(log => (
            <div key={log.id} className="irrigation-log">
              <span>{new Date(log.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US')}</span>
              <span className="log-amount">💧 {log.amount_liters.toLocaleString()} L</span>
              <span className="log-method">{log.method}</span>
              {log.notes && <span className="log-notes">{log.notes}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

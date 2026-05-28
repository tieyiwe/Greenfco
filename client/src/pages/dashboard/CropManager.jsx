import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../api/client';
import './CropManager.css';

const CROP_STATUS = {
  planned: { fr: 'Planifié', en: 'Planned', color: '#9A9A8E' },
  growing: { fr: 'En cours', en: 'Growing', color: '#52B788' },
  harvested: { fr: 'Récolté', en: 'Harvested', color: '#F4A261' },
};

const CROP_SPECIES = [
  'Maïs / Maize', 'Sorgho / Sorghum', 'Mil / Millet', 'Niébé / Cowpea',
  'Oignon / Onion', 'Pomme de terre / Potato', 'Tomate / Tomato',
  'Sésame / Sesame', 'Faidherbia albida', 'Moringa', 'Autre / Other',
];

export default function CropManager() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const [crops, setCrops] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '', species: '', field_name: '', planting_date: '', expected_harvest_date: '', notes: '', status: 'planned',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCrops();
  }, []);

  async function loadCrops() {
    try {
      const res = await api.get('/crops');
      setCrops(res.data);
    } catch {
      // Demo data when API not ready
      setCrops([
        { id: 1, name: 'Maïs Nord', species: 'Maïs / Maize', field_name: 'Parcelle A', planting_date: '2024-06-01', expected_harvest_date: '2024-09-15', status: 'growing', notes: '' },
        { id: 2, name: 'Oignons Est', species: 'Oignon / Onion', field_name: 'Parcelle B', planting_date: '2024-05-10', expected_harvest_date: '2024-08-20', status: 'growing', notes: 'Arrosage quotidien' },
      ]);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/crops', form);
      setCrops(prev => [res.data, ...prev]);
      setShowForm(false);
      setForm({ name: '', species: '', field_name: '', planting_date: '', expected_harvest_date: '', notes: '', status: 'planned' });
    } catch {
      setCrops(prev => [{ id: Date.now(), ...form }, ...prev]);
      setShowForm(false);
    } finally {
      setLoading(false);
    }
  }

  async function deleteCrop(id) {
    setCrops(prev => prev.filter(c => c.id !== id));
    try { await api.delete(`/crops/${id}`); } catch {}
  }

  function daysUntil(dateStr) {
    const diff = new Date(dateStr) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  return (
    <div className="crop-manager">
      <div className="module-header">
        <div>
          <h1>{lang === 'fr' ? 'Mes Cultures' : 'My Crops'}</h1>
          <p>{lang === 'fr' ? `${crops.length} cultures suivies` : `${crops.length} crops tracked`}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕' : `+ ${lang === 'fr' ? 'Nouvelle culture' : 'New crop'}`}
        </button>
      </div>

      {showForm && (
        <div className="card crop-form">
          <h3>{lang === 'fr' ? 'Ajouter une culture' : 'Add a crop'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Nom de la culture' : 'Crop name'} *</label>
                <input type="text" className="form-input" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required placeholder={lang === 'fr' ? 'Ex: Maïs Parcelle A' : 'Ex: Maize Plot A'} />
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Espèce' : 'Species'}</label>
                <select className="form-select" value={form.species} onChange={e => setForm(p => ({ ...p, species: e.target.value }))}>
                  <option value="">{lang === 'fr' ? 'Sélectionner...' : 'Select...'}</option>
                  {CROP_SPECIES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Parcelle / Champ' : 'Field / Plot'}</label>
                <input type="text" className="form-input" value={form.field_name} onChange={e => setForm(p => ({ ...p, field_name: e.target.value }))} placeholder={lang === 'fr' ? 'Ex: Parcelle A' : 'Ex: Plot A'} />
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Statut' : 'Status'}</label>
                <select className="form-select" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                  {Object.entries(CROP_STATUS).map(([k, v]) => (
                    <option key={k} value={k}>{lang === 'fr' ? v.fr : v.en}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Date de semis' : 'Planting date'}</label>
                <input type="date" className="form-input" value={form.planting_date} onChange={e => setForm(p => ({ ...p, planting_date: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Date de récolte prévue' : 'Expected harvest date'}</label>
                <input type="date" className="form-input" value={form.expected_harvest_date} onChange={e => setForm(p => ({ ...p, expected_harvest_date: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">{lang === 'fr' ? 'Notes' : 'Notes'}</label>
              <textarea className="form-input" value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={3} placeholder={lang === 'fr' ? 'Observations, variété, densité de semis...' : 'Observations, variety, sowing density...'} />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? '...' : lang === 'fr' ? 'Enregistrer' : 'Save'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                {lang === 'fr' ? 'Annuler' : 'Cancel'}
              </button>
            </div>
          </form>
        </div>
      )}

      {crops.length === 0 ? (
        <div className="empty-state card">
          <span>🌱</span>
          <h3>{lang === 'fr' ? 'Aucune culture enregistrée' : 'No crops recorded'}</h3>
          <p>{lang === 'fr' ? 'Ajoutez votre première culture pour commencer le suivi.' : 'Add your first crop to start tracking.'}</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            {lang === 'fr' ? '+ Ajouter une culture' : '+ Add a crop'}
          </button>
        </div>
      ) : (
        <div className="crops-grid">
          {crops.map(crop => {
            const status = CROP_STATUS[crop.status] || CROP_STATUS.planned;
            const daysLeft = crop.expected_harvest_date ? daysUntil(crop.expected_harvest_date) : null;
            return (
              <div key={crop.id} className="crop-card card">
                <div className="crop-card-header">
                  <div>
                    <h3>{crop.name}</h3>
                    <p className="crop-species">{crop.species}</p>
                  </div>
                  <span className="crop-status-badge" style={{ background: status.color + '20', color: status.color }}>
                    {lang === 'fr' ? status.fr : status.en}
                  </span>
                </div>
                {crop.field_name && (
                  <p className="crop-field">📍 {crop.field_name}</p>
                )}
                <div className="crop-dates">
                  {crop.planting_date && (
                    <div>
                      <span>{lang === 'fr' ? 'Semis' : 'Planted'}</span>
                      <strong>{new Date(crop.planting_date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US')}</strong>
                    </div>
                  )}
                  {crop.expected_harvest_date && (
                    <div>
                      <span>{lang === 'fr' ? 'Récolte' : 'Harvest'}</span>
                      <strong>{new Date(crop.expected_harvest_date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US')}</strong>
                    </div>
                  )}
                </div>
                {daysLeft !== null && daysLeft > 0 && (
                  <div className="crop-countdown">
                    🗓️ {daysLeft} {lang === 'fr' ? 'jours jusqu\'à la récolte' : 'days to harvest'}
                  </div>
                )}
                {crop.notes && <p className="crop-notes">{crop.notes}</p>}
                <button className="crop-delete" onClick={() => deleteCrop(crop.id)} title={lang === 'fr' ? 'Supprimer' : 'Delete'}>
                  🗑️
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../api/client';
import useAuthStore from '../../store/authStore';
import './MarketPage.css';

const DEMO_LISTINGS = [
  { id: 1, crop_name: 'Oignons', quantity_kg: 500, price: 250, currency: 'FCFA', location: 'Ouagadougou', contact: '+226 70 00 00 00', created_at: '2024-06-01', user_name: 'Moussa K.' },
  { id: 2, crop_name: 'Pommes de terre', quantity_kg: 1000, price: 150, currency: 'FCFA', location: 'Bobo-Dioulasso', contact: '+226 71 00 00 00', created_at: '2024-06-05', user_name: 'Aminata D.' },
  { id: 3, crop_name: 'Tomates', quantity_kg: 200, price: 300, currency: 'FCFA', location: 'Koudougou', contact: '+226 72 00 00 00', created_at: '2024-06-08', user_name: 'Ibrahim S.' },
  { id: 4, crop_name: 'Maïs', quantity_kg: 2000, price: 120, currency: 'FCFA', location: 'Fada N\'Gourma', contact: '+226 73 00 00 00', created_at: '2024-06-10', user_name: 'Fatimata O.' },
];

export default function MarketPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const { user } = useAuthStore();
  const [listings, setListings] = useState(DEMO_LISTINGS);
  const [showForm, setShowForm] = useState(false);
  const [filterCrop, setFilterCrop] = useState('');
  const [form, setForm] = useState({ crop_name: '', quantity_kg: '', price: '', currency: 'FCFA', location: '', contact: '' });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/market', form);
      setListings(prev => [res.data, ...prev]);
    } catch {
      setListings(prev => [{ id: Date.now(), ...form, user_name: user?.name, created_at: new Date().toISOString() }, ...prev]);
    }
    setShowForm(false);
    setForm({ crop_name: '', quantity_kg: '', price: '', currency: 'FCFA', location: '', contact: '' });
    setLoading(false);
  }

  const filtered = listings.filter(l =>
    !filterCrop || l.crop_name.toLowerCase().includes(filterCrop.toLowerCase())
  );

  return (
    <div className="market-page">
      <div className="module-header">
        <div>
          <h1>{lang === 'fr' ? 'Marché Numérique' : 'Digital Market'}</h1>
          <p>{lang === 'fr' ? 'Achetez et vendez des produits agricoles' : 'Buy and sell agricultural products'}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕' : `+ ${lang === 'fr' ? 'Publier une annonce' : 'Post a listing'}`}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.25rem' }}>{lang === 'fr' ? 'Nouvelle annonce' : 'New listing'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Produit' : 'Product'} *</label>
                <input type="text" className="form-input" value={form.crop_name} onChange={e => setForm(p => ({ ...p, crop_name: e.target.value }))} required placeholder={lang === 'fr' ? 'Ex: Oignons' : 'Ex: Onions'} />
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Quantité (kg)' : 'Quantity (kg)'} *</label>
                <input type="number" className="form-input" value={form.quantity_kg} onChange={e => setForm(p => ({ ...p, quantity_kg: e.target.value }))} required min="1" />
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Prix/kg' : 'Price/kg'} *</label>
                <input type="number" className="form-input" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} required min="0" />
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Devise' : 'Currency'}</label>
                <select className="form-select" value={form.currency} onChange={e => setForm(p => ({ ...p, currency: e.target.value }))}>
                  <option value="FCFA">FCFA (XOF)</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Localisation' : 'Location'}</label>
                <input type="text" className="form-input" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder={lang === 'fr' ? 'Ville, région' : 'City, region'} />
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Contact WhatsApp' : 'WhatsApp contact'}</label>
                <input type="text" className="form-input" value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} placeholder="+226 XX XX XX XX" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? '...' : lang === 'fr' ? 'Publier' : 'Publish'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                {lang === 'fr' ? 'Annuler' : 'Cancel'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="market-filters card" style={{ padding: '1rem 1.5rem' }}>
        <input
          type="text"
          className="form-input"
          placeholder={lang === 'fr' ? '🔍 Filtrer par produit...' : '🔍 Filter by product...'}
          value={filterCrop}
          onChange={e => setFilterCrop(e.target.value)}
          style={{ maxWidth: '300px' }}
        />
      </div>

      <div className="listings-grid">
        {filtered.map(listing => (
          <div key={listing.id} className="listing-card card">
            <div className="listing-header">
              <h3>{listing.crop_name}</h3>
              <span className="listing-price">
                {listing.price.toLocaleString()} {listing.currency}/kg
              </span>
            </div>
            <div className="listing-details">
              <span>⚖️ {Number(listing.quantity_kg).toLocaleString()} kg</span>
              {listing.location && <span>📍 {listing.location}</span>}
              <span>👤 {listing.user_name || 'Vendeur'}</span>
            </div>
            <div className="listing-date">
              {new Date(listing.created_at).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US')}
            </div>
            {listing.contact && (
              <a
                href={`https://wa.me/${listing.contact.replace(/\D/g, '')}?text=${encodeURIComponent(lang === 'fr' ? `Bonjour, je suis intéressé par votre annonce : ${listing.crop_name} (${listing.quantity_kg}kg)` : `Hello, I'm interested in your listing: ${listing.crop_name} (${listing.quantity_kg}kg)`)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp btn-sm listing-cta"
              >
                💬 WhatsApp
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../api/client';
import useAuthStore from '../../store/authStore';
import './MarketPage.css';

const CATEGORIES = [
  { value: 'all', fr: 'Tout', en: 'All', icon: '🌍' },
  { value: 'legumes', fr: 'Légumes', en: 'Vegetables', icon: '🥬' },
  { value: 'cereales', fr: 'Céréales', en: 'Cereals', icon: '🌾' },
  { value: 'fruits', fr: 'Fruits', en: 'Fruits', icon: '🍊' },
  { value: 'elevage', fr: 'Élevage', en: 'Livestock', icon: '🐄' },
  { value: 'intrants', fr: 'Intrants', en: 'Inputs', icon: '🌱' },
  { value: 'autres', fr: 'Autres', en: 'Other', icon: '📦' },
];

const DEMO_LISTINGS = [
  {
    id: 1, crop_name: 'Oignons', category: 'legumes', quantity_kg: 500, price: 250, currency: 'FCFA',
    location: 'Ouagadougou', contact: '+22670000001', created_at: '2024-06-01',
    user_name: 'Moussa Kaboré', description: 'Oignons frais de qualité supérieure, récoltés cette semaine. Stockage possible.',
  },
  {
    id: 2, crop_name: 'Pommes de terre', category: 'legumes', quantity_kg: 1000, price: 150, currency: 'FCFA',
    location: 'Bobo-Dioulasso', contact: '+22671000002', created_at: '2024-06-05',
    user_name: 'Aminata Diallo', description: 'Grande variété locale. Prix négociable pour grosses quantités.',
  },
  {
    id: 3, crop_name: 'Tomates', category: 'legumes', quantity_kg: 200, price: 300, currency: 'FCFA',
    location: 'Koudougou', contact: '+22672000003', created_at: '2024-06-08',
    user_name: 'Ibrahim Sawadogo', description: 'Tomates mûres, livraison possible dans un rayon de 50 km.',
  },
  {
    id: 4, crop_name: 'Maïs', category: 'cereales', quantity_kg: 2000, price: 120, currency: 'FCFA',
    location: "Fada N'Gourma", contact: '+22673000004', created_at: '2024-06-10',
    user_name: 'Fatimata Ouédraogo', description: 'Maïs jaune séché, bonne conservation. Idéal pour transformation.',
  },
  {
    id: 5, crop_name: 'Mil', category: 'cereales', quantity_kg: 800, price: 140, currency: 'FCFA',
    location: 'Dori', contact: '+22674000005', created_at: '2024-06-12',
    user_name: 'Hamidou Compaoré', description: 'Mil local de première qualité, récolte 2024. Possibilité de livraison.',
  },
  {
    id: 6, crop_name: 'Sésame', category: 'autres', quantity_kg: 300, price: 600, currency: 'FCFA',
    location: 'Dédougou', contact: '+22675000006', created_at: '2024-06-14',
    user_name: 'Mariam Traoré', description: 'Sésame blanc certifié bio, très demandé à l\'export. Qualité premium.',
  },
  {
    id: 7, crop_name: 'Moringa (feuilles)', category: 'autres', quantity_kg: 50, price: 1200, currency: 'FCFA',
    location: 'Ouahigouya', contact: '+22676000007', created_at: '2024-06-15',
    user_name: 'Salif Barro', description: 'Feuilles de moringa séchées et broyées. Production certifiée sans pesticide.',
  },
  {
    id: 8, crop_name: 'BioGrowth (bio-fertilisant)', category: 'intrants', quantity_kg: 100, price: 2500, currency: 'FCFA',
    location: 'Ouagadougou', contact: '+22677000008', created_at: '2024-06-16',
    user_name: 'GreenFCO', description: 'Bio-fertilisant liquide innovant, conçu pour les sols ouest-africains. Améliore les rendements.',
  },
];

export default function MarketPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const { user } = useAuthStore();

  const [listings, setListings] = useState(DEMO_LISTINGS);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sort, setSort] = useState('newest');
  const [contact, setContact] = useState(null); // listing being contacted
  const [msgText, setMsgText] = useState('');
  const [form, setForm] = useState({
    crop_name: '', category: 'legumes', quantity_kg: '', price: '', currency: 'FCFA',
    location: '', contact: '', description: '',
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const newListing = {
      id: Date.now(),
      ...form,
      user_name: user?.name || 'Vendeur',
      created_at: new Date().toISOString(),
    };
    try {
      const res = await api.post('/market', form);
      setListings(p => [res.data, ...p]);
    } catch {
      setListings(p => [newListing, ...p]);
    }
    setShowForm(false);
    setForm({ crop_name: '', category: 'legumes', quantity_kg: '', price: '', currency: 'FCFA', location: '', contact: '', description: '' });
    setLoading(false);
  }

  function openContact(listing) {
    const defaultMsg = lang === 'fr'
      ? `Bonjour ${listing.user_name}, je suis intéressé(e) par votre annonce : ${listing.crop_name} (${Number(listing.quantity_kg).toLocaleString()} kg à ${Number(listing.price).toLocaleString()} ${listing.currency}/kg). Êtes-vous disponible ?`
      : `Hello ${listing.user_name}, I'm interested in your listing: ${listing.crop_name} (${Number(listing.quantity_kg).toLocaleString()} kg at ${Number(listing.price).toLocaleString()} ${listing.currency}/kg). Are you available?`;
    setContact(listing);
    setMsgText(defaultMsg);
  }

  const filtered = listings.filter(l => {
    const matchSearch = !search || l.crop_name.toLowerCase().includes(search.toLowerCase()) || l.location?.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'all' || l.category === activeCategory;
    return matchSearch && matchCat;
  }).sort((a, b) => {
    if (sort === 'price_asc') return Number(a.price) - Number(b.price);
    if (sort === 'price_desc') return Number(b.price) - Number(a.price);
    if (sort === 'qty_desc') return Number(b.quantity_kg) - Number(a.quantity_kg);
    return new Date(b.created_at) - new Date(a.created_at);
  });

  return (
    <div className="market-page">
      {/* Header */}
      <div className="module-header">
        <div>
          <h1>{lang === 'fr' ? 'Marché Numérique' : 'Digital Market'}</h1>
          <p>{lang === 'fr' ? 'Achetez et vendez des produits agricoles directement' : 'Buy and sell agricultural products directly'}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(s => !s)}>
          {showForm ? '✕' : `+ ${lang === 'fr' ? 'Publier une annonce' : 'Post a listing'}`}
        </button>
      </div>

      {/* Post form */}
      {showForm && (
        <div className="card market-form-card">
          <h3>{lang === 'fr' ? 'Nouvelle annonce' : 'New listing'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid-3">
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Produit *' : 'Product *'}</label>
                <input type="text" className="form-input" value={form.crop_name}
                  onChange={e => setForm(p => ({ ...p, crop_name: e.target.value }))} required
                  placeholder={lang === 'fr' ? 'Ex : Oignons' : 'E.g. Onions'} />
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Catégorie' : 'Category'}</label>
                <select className="form-select" value={form.category}
                  onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                  {CATEGORIES.filter(c => c.value !== 'all').map(c => (
                    <option key={c.value} value={c.value}>{lang === 'fr' ? c.fr : c.en}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Quantité (kg) *' : 'Quantity (kg) *'}</label>
                <input type="number" className="form-input" value={form.quantity_kg}
                  onChange={e => setForm(p => ({ ...p, quantity_kg: e.target.value }))} required min="1" />
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Prix/kg *' : 'Price/kg *'}</label>
                <input type="number" className="form-input" value={form.price}
                  onChange={e => setForm(p => ({ ...p, price: e.target.value }))} required min="0" />
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Devise' : 'Currency'}</label>
                <select className="form-select" value={form.currency}
                  onChange={e => setForm(p => ({ ...p, currency: e.target.value }))}>
                  <option value="FCFA">FCFA (XOF)</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Localisation' : 'Location'}</label>
                <input type="text" className="form-input" value={form.location}
                  onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                  placeholder={lang === 'fr' ? 'Ville, région' : 'City, region'} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">{lang === 'fr' ? 'Description' : 'Description'}</label>
                <textarea className="form-input" rows="2" value={form.description}
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  placeholder={lang === 'fr' ? 'Qualité, conditions de vente, livraison possible...' : 'Quality, sale terms, delivery possible...'} />
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Contact WhatsApp' : 'WhatsApp contact'}</label>
                <input type="tel" className="form-input" value={form.contact}
                  onChange={e => setForm(p => ({ ...p, contact: e.target.value }))}
                  placeholder="+226 XX XX XX XX" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? '…' : lang === 'fr' ? 'Publier' : 'Publish'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                {lang === 'fr' ? 'Annuler' : 'Cancel'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search + sort bar */}
      <div className="market-search-bar card">
        <div className="market-search-input-wrap">
          <span className="market-search-icon">🔍</span>
          <input
            type="text"
            className="market-search-input"
            placeholder={lang === 'fr' ? 'Rechercher un produit agricole…' : 'Search for an agricultural product…'}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="market-search-clear" onClick={() => setSearch('')}>✕</button>
          )}
        </div>
        <select className="form-select market-sort" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="newest">{lang === 'fr' ? 'Plus récent' : 'Newest'}</option>
          <option value="price_asc">{lang === 'fr' ? 'Prix croissant' : 'Price ↑'}</option>
          <option value="price_desc">{lang === 'fr' ? 'Prix décroissant' : 'Price ↓'}</option>
          <option value="qty_desc">{lang === 'fr' ? 'Quantité' : 'Quantity'}</option>
        </select>
      </div>

      {/* Category tabs */}
      <div className="market-cats">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            className={`market-cat-btn ${activeCategory === cat.value ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.value)}
          >
            {cat.icon} {lang === 'fr' ? cat.fr : cat.en}
          </button>
        ))}
      </div>

      {/* Result count */}
      <p className="market-count">
        {filtered.length} {lang === 'fr' ? 'annonce(s)' : 'listing(s)'}
        {search && ` · "${search}"`}
      </p>

      {/* Listings grid */}
      {filtered.length === 0 ? (
        <div className="market-empty card">
          <p>🌾 {lang === 'fr' ? 'Aucune annonce trouvée.' : 'No listings found.'}</p>
        </div>
      ) : (
        <div className="listings-grid">
          {filtered.map(listing => (
            <ListingCard
              key={listing.id}
              listing={listing}
              lang={lang}
              categories={CATEGORIES}
              onContact={() => openContact(listing)}
            />
          ))}
        </div>
      )}

      {/* Contact modal */}
      {contact && (
        <>
          <div className="market-overlay" onClick={() => setContact(null)} />
          <div className="contact-modal card">
            <div className="contact-modal-header">
              <div>
                <h3>{lang === 'fr' ? 'Contacter le vendeur' : 'Contact seller'}</h3>
                <p>{contact.user_name} · {contact.crop_name}</p>
              </div>
              <button className="contact-modal-close" onClick={() => setContact(null)}>✕</button>
            </div>

            <div className="contact-modal-body">
              <label className="form-label">
                {lang === 'fr' ? 'Votre message' : 'Your message'}
              </label>
              <textarea
                className="form-input"
                rows="4"
                value={msgText}
                onChange={e => setMsgText(e.target.value)}
              />
            </div>

            <div className="contact-modal-actions">
              {contact.contact && (
                <a
                  href={`https://wa.me/${contact.contact.replace(/\D/g, '')}?text=${encodeURIComponent(msgText)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp"
                >
                  💬 {lang === 'fr' ? 'Envoyer via WhatsApp' : 'Send via WhatsApp'}
                </a>
              )}
              <button className="btn btn-secondary" onClick={() => setContact(null)}>
                {lang === 'fr' ? 'Fermer' : 'Close'}
              </button>
            </div>

            <p className="contact-modal-note">
              {lang === 'fr'
                ? '💡 WhatsApp est le moyen le plus rapide de contacter les producteurs en Afrique de l\'Ouest.'
                : '💡 WhatsApp is the fastest way to reach producers in West Africa.'}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function ListingCard({ listing, lang, categories, onContact }) {
  const [expanded, setExpanded] = useState(false);
  const cat = categories.find(c => c.value === listing.category);
  const totalValue = Number(listing.price) * Number(listing.quantity_kg);

  return (
    <div className="listing-card card">
      <div className="listing-cat-badge">
        <span>{cat?.icon || '📦'}</span>
        <span>{lang === 'fr' ? cat?.fr : cat?.en}</span>
      </div>

      <div className="listing-header">
        <h3 className="listing-name">{listing.crop_name}</h3>
        <span className="listing-price">{Number(listing.price).toLocaleString()} {listing.currency}/kg</span>
      </div>

      <div className="listing-stats">
        <span className="listing-stat">
          <span>⚖️</span> {Number(listing.quantity_kg).toLocaleString()} kg
        </span>
        <span className="listing-stat listing-total">
          <span>💰</span> {totalValue.toLocaleString()} {listing.currency}
        </span>
      </div>

      {listing.location && (
        <div className="listing-location">📍 {listing.location}</div>
      )}

      {listing.description && (
        <p className={`listing-desc ${expanded ? 'expanded' : ''}`} onClick={() => setExpanded(e => !e)}>
          {listing.description}
        </p>
      )}

      <div className="listing-footer">
        <div className="listing-seller">
          <div className="seller-avatar">{listing.user_name?.charAt(0) || 'V'}</div>
          <div>
            <span className="seller-name">{listing.user_name || lang === 'fr' ? 'Vendeur' : 'Seller'}</span>
            <span className="listing-date">
              {new Date(listing.created_at).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short' })}
            </span>
          </div>
        </div>

        <button className="btn btn-primary btn-sm listing-msg-btn" onClick={onContact}>
          💬 {lang === 'fr' ? 'Contacter' : 'Contact'}
        </button>
      </div>
    </div>
  );
}

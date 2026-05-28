import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend,
} from 'recharts';
import api from '../../api/client';
import useAuthStore from '../../store/authStore';
import './MarketPage.css';

/* ─── Helpers ─────────────────────────────────────────────── */
function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

function fmtDist(km) {
  if (km < 1) return '< 1 km';
  if (km < 10) return `~${km.toFixed(1)} km`;
  return `~${Math.round(km)} km`;
}

function distColor(km) {
  if (km < 20) return 'dist-near';
  if (km < 100) return 'dist-mid';
  return 'dist-far';
}

async function geocodeCity(query) {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=fr&format=json`
  );
  const data = await res.json();
  if (!data.results?.length) return null;
  const r = data.results[0];
  return { lat: r.latitude, lng: r.longitude, label: r.name };
}

/* ─── Static data ─────────────────────────────────────────── */
const CATEGORIES = [
  { value: 'all',      fr: 'Tout',       en: 'All',          icon: '🌍' },
  { value: 'legumes',  fr: 'Légumes',    en: 'Vegetables',   icon: '🥬' },
  { value: 'cereales', fr: 'Céréales',   en: 'Cereals',      icon: '🌾' },
  { value: 'fruits',   fr: 'Fruits',     en: 'Fruits',       icon: '🍊' },
  { value: 'elevage',  fr: 'Élevage',    en: 'Livestock',    icon: '🐄' },
  { value: 'poisson',  fr: 'Poisson',    en: 'Fish',         icon: '🐟' },
  { value: 'intrants', fr: 'Intrants',   en: 'Inputs',       icon: '🌱' },
  { value: 'autres',   fr: 'Autres',     en: 'Other',        icon: '📦' },
];

// ─── Regional market prices (FCFA/kg unless noted) ──────────
// Based on realistic West Africa commodity prices
const REGIONAL_PRICES = [
  {
    id: 'oignon', name_fr: 'Oignon', name_en: 'Onion', icon: '🧅', unit: 'kg',
    prices: { ouaga: 275, bobo: 240, koudougou: 260, fada: 290, dori: 310 },
    global_usd: 0.45,
    trend: '+8%',
    trend_up: true,
  },
  {
    id: 'mais', name_fr: 'Maïs', name_en: 'Maize', icon: '🌽', unit: 'kg',
    prices: { ouaga: 130, bobo: 115, koudougou: 120, fada: 125, dori: 145 },
    global_usd: 0.21,
    trend: '-3%',
    trend_up: false,
  },
  {
    id: 'mil', name_fr: 'Mil', name_en: 'Millet', icon: '🌾', unit: 'kg',
    prices: { ouaga: 150, bobo: 135, koudougou: 140, fada: 155, dori: 165 },
    global_usd: 0.25,
    trend: '+2%',
    trend_up: true,
  },
  {
    id: 'sorgho', name_fr: 'Sorgho', name_en: 'Sorghum', icon: '🌾', unit: 'kg',
    prices: { ouaga: 125, bobo: 110, koudougou: 118, fada: 130, dori: 140 },
    global_usd: 0.20,
    trend: 'stable',
    trend_up: null,
  },
  {
    id: 'niebe', name_fr: 'Niébé', name_en: 'Cowpea', icon: '🫘', unit: 'kg',
    prices: { ouaga: 420, bobo: 390, koudougou: 400, fada: 430, dori: 460 },
    global_usd: 0.70,
    trend: '+12%',
    trend_up: true,
  },
  {
    id: 'tomate', name_fr: 'Tomate', name_en: 'Tomato', icon: '🍅', unit: 'kg',
    prices: { ouaga: 310, bobo: 280, koudougou: 295, fada: 320, dori: 350 },
    global_usd: 0.52,
    trend: '-5%',
    trend_up: false,
  },
  {
    id: 'sesame', name_fr: 'Sésame', name_en: 'Sesame', icon: '🌿', unit: 'kg',
    prices: { ouaga: 620, bobo: 590, koudougou: 605, fada: 640, dori: 660 },
    global_usd: 1.05,
    trend: '+15%',
    trend_up: true,
  },
  {
    id: 'pomme_terre', name_fr: 'Pomme de terre', name_en: 'Potato', icon: '🥔', unit: 'kg',
    prices: { ouaga: 165, bobo: 145, koudougou: 155, fada: 180, dori: 200 },
    global_usd: 0.28,
    trend: '-2%',
    trend_up: false,
  },
  // ── Livestock & Animal Products ────────────────────────────
  {
    id: 'poulet', name_fr: 'Poulet (vif)', name_en: 'Live Chicken', icon: '🐔', unit: 'kg vif',
    prices: { ouaga: 1800, bobo: 1650, koudougou: 1700, fada: 1850, dori: 1900 },
    global_usd: 3.00,
    trend: '+5%',
    trend_up: true,
  },
  {
    id: 'boeuf', name_fr: 'Bœuf (carcasse)', name_en: 'Beef (carcass)', icon: '🐄', unit: 'kg',
    prices: { ouaga: 2800, bobo: 2600, koudougou: 2700, fada: 2900, dori: 3100 },
    global_usd: 4.65,
    trend: '+7%',
    trend_up: true,
  },
  {
    id: 'porc', name_fr: 'Porc (carcasse)', name_en: 'Pork (carcass)', icon: '🐖', unit: 'kg',
    prices: { ouaga: 2200, bobo: 2050, koudougou: 2100, fada: 2300, dori: 2500 },
    global_usd: 3.65,
    trend: '+3%',
    trend_up: true,
  },
  {
    id: 'mouton', name_fr: 'Mouton (vif)', name_en: 'Sheep (live)', icon: '🐑', unit: 'tête',
    prices: { ouaga: 45000, bobo: 40000, koudougou: 42000, fada: 47000, dori: 50000 },
    global_usd: 75,
    trend: '+10%',
    trend_up: true,
  },
  {
    id: 'poisson_frais', name_fr: 'Poisson frais', name_en: 'Fresh Fish', icon: '🐟', unit: 'kg',
    prices: { ouaga: 1400, bobo: 1250, koudougou: 1350, fada: 1500, dori: 1600 },
    global_usd: 2.30,
    trend: '+4%',
    trend_up: true,
  },
  {
    id: 'poisson_seche', name_fr: 'Poisson séché', name_en: 'Dried Fish', icon: '🐠', unit: 'kg',
    prices: { ouaga: 3200, bobo: 2900, koudougou: 3000, fada: 3300, dori: 3500 },
    global_usd: 5.30,
    trend: '+6%',
    trend_up: true,
  },
  {
    id: 'lait', name_fr: 'Lait local', name_en: 'Local Milk', icon: '🥛', unit: 'L',
    prices: { ouaga: 500, bobo: 450, koudougou: 470, fada: 520, dori: 550 },
    global_usd: 0.83,
    trend: 'stable',
    trend_up: null,
  },
];

// ─── Price trend simulation (last 6 months) ──────────────────
const MONTHS_FR = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function buildTrendData(basePrice, months = 6) {
  const now = new Date().getMonth();
  return Array.from({ length: months }, (_, i) => {
    const idx = (now - months + 1 + i + 12) % 12;
    const seasonal = 1 + 0.12 * Math.sin((idx / 12) * 2 * Math.PI);
    const noise = 1 + (Math.random() * 0.08 - 0.04);
    return { month: MONTHS_FR[(idx)] + '/' + MONTHS_EN[(idx)], price: Math.round(basePrice * seasonal * noise) };
  });
}

// ─── Market analytics simulation ─────────────────────────────
const MARKET_ANALYTICS = [
  { product_fr: 'Oignons',       product_en: 'Onions',    icon: '🧅', searches: 342, views: 1240, messages: 89, trend: '+18%' },
  { product_fr: 'Maïs',          product_en: 'Maize',     icon: '🌽', searches: 298, views: 980,  messages: 64, trend: '+5%'  },
  { product_fr: 'Poulet',        product_en: 'Chicken',   icon: '🐔', searches: 276, views: 860,  messages: 72, trend: '+22%' },
  { product_fr: 'Tomates',       product_en: 'Tomatoes',  icon: '🍅', searches: 254, views: 740,  messages: 55, trend: '-4%'  },
  { product_fr: 'Sésame',        product_en: 'Sesame',    icon: '🌿', searches: 198, views: 620,  messages: 48, trend: '+30%' },
  { product_fr: 'Poisson frais', product_en: 'Fresh Fish',icon: '🐟', searches: 187, views: 590,  messages: 61, trend: '+12%' },
  { product_fr: 'Niébé',         product_en: 'Cowpea',    icon: '🫘', searches: 165, views: 480,  messages: 39, trend: '+15%' },
  { product_fr: 'Bœuf',          product_en: 'Beef',      icon: '🐄', searches: 142, views: 410,  messages: 52, trend: '+8%'  },
];

const DEMO_LISTINGS = [
  { id: 1, crop_name: 'Oignons',        category: 'legumes',  quantity_kg: 500,  price: 250,  currency: 'FCFA', location: 'Ouagadougou',    lat: 12.3647,  lng: -1.5337, contact: '+22670000001', created_at: '2024-06-01', user_name: 'Moussa Kaboré',    description: 'Oignons frais de qualité supérieure, récoltés cette semaine.' },
  { id: 2, crop_name: 'Pommes de terre', category: 'legumes', quantity_kg: 1000, price: 150,  currency: 'FCFA', location: 'Bobo-Dioulasso',  lat: 11.1771,  lng: -4.2979, contact: '+22671000002', created_at: '2024-06-05', user_name: 'Aminata Diallo',   description: 'Grande variété locale. Prix négociable pour grosses quantités.' },
  { id: 3, crop_name: 'Tomates',         category: 'legumes', quantity_kg: 200,  price: 300,  currency: 'FCFA', location: 'Koudougou',       lat: 12.2487,  lng: -2.3622, contact: '+22672000003', created_at: '2024-06-08', user_name: 'Ibrahim Sawadogo', description: 'Tomates mûres. Livraison possible dans un rayon de 50 km.' },
  { id: 4, crop_name: 'Maïs',            category: 'cereales',quantity_kg: 2000, price: 120,  currency: 'FCFA', location: "Fada N'Gourma",   lat: 12.0603,  lng: 0.3464,  contact: '+22673000004', created_at: '2024-06-10', user_name: 'Fatimata Ouédraogo',description: 'Maïs jaune séché. Idéal pour transformation.' },
  { id: 5, crop_name: 'Mil',             category: 'cereales',quantity_kg: 800,  price: 140,  currency: 'FCFA', location: 'Dori',             lat: 14.0329,  lng: -0.0356, contact: '+22674000005', created_at: '2024-06-12', user_name: 'Hamidou Compaoré', description: 'Mil local de première qualité, récolte 2024.' },
  { id: 6, crop_name: 'Sésame',          category: 'autres',  quantity_kg: 300,  price: 600,  currency: 'FCFA', location: 'Dédougou',        lat: 12.4625,  lng: -3.4665, contact: '+22675000006', created_at: '2024-06-14', user_name: 'Mariam Traoré',    description: 'Sésame blanc certifié bio, qualité premium.' },
  { id: 7, crop_name: 'Poulet (vif)',    category: 'elevage', quantity_kg: 50,   price: 1800, currency: 'FCFA', location: 'Ouahigouya',      lat: 13.5782,  lng: -2.4215, contact: '+22676000007', created_at: '2024-06-15', user_name: 'Salif Barro',      description: 'Poulets de chair locaux, bien nourris, 1,8–2,2 kg/pièce.' },
  { id: 8, crop_name: 'Poisson fumé',    category: 'poisson', quantity_kg: 80,   price: 3000, currency: 'FCFA', location: 'Ouagadougou',     lat: 12.3647,  lng: -1.5337, contact: '+22677000008', created_at: '2024-06-16', user_name: 'Kadi Sawadogo',    description: 'Poisson fumé de qualité. Conditionnement soigné.' },
  { id: 9, crop_name: 'BioGrowth',       category: 'intrants',quantity_kg: 100,  price: 2500, currency: 'FCFA', location: 'Ouagadougou',     lat: 12.3647,  lng: -1.5337, contact: '+22678000009', created_at: '2024-06-17', user_name: 'GreenFCO',         description: 'Bio-fertilisant liquide innovant pour sols ouest-africains.' },
];

const CITIES = [
  { key: 'ouaga',     fr: 'Ouagadougou', en: 'Ouagadougou' },
  { key: 'bobo',      fr: 'Bobo-Dioulasso', en: 'Bobo-Dioulasso' },
  { key: 'koudougou', fr: 'Koudougou',  en: 'Koudougou' },
  { key: 'fada',      fr: "Fada N'Gourma", en: "Fada N'Gourma" },
  { key: 'dori',      fr: 'Dori',       en: 'Dori' },
];

/* ─── Main component ──────────────────────────────────────── */
export default function MarketPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const { user } = useAuthStore();

  const [activeTab, setActiveTab] = useState('listings');
  const [listings, setListings] = useState(DEMO_LISTINGS);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sort, setSort] = useState('newest');
  const [contactListing, setContactListing] = useState(null);
  const [msgText, setMsgText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(REGIONAL_PRICES[0]);
  const [buyerLoc, setBuyerLoc] = useState(null);
  const [locLoading, setLocLoading] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const [showCitySearch, setShowCitySearch] = useState(false);
  const [formLocLoading, setFormLocLoading] = useState(false);
  const [form, setForm] = useState({
    crop_name: '', category: 'legumes', quantity_kg: '', price: '', currency: 'FCFA',
    location: '', lat: null, lng: null, contact: '', description: '',
  });

  // Track analytics (simulated)
  const analyticsRef = useRef({ ...Object.fromEntries(MARKET_ANALYTICS.map(a => [a.product_fr, { ...a }])) });

  function trackSearch(q) {
    if (!q) return;
    const key = MARKET_ANALYTICS.find(a => a.product_fr.toLowerCase().includes(q.toLowerCase()))?.product_fr;
    if (key && analyticsRef.current[key]) analyticsRef.current[key].searches += 1;
  }

  useEffect(() => { const t = setTimeout(() => trackSearch(search), 600); return () => clearTimeout(t); }, [search]);

  /* ── Buyer location ──────────────────────────────────────── */
  function detectBuyerGPS() {
    if (!navigator.geolocation) { setShowCitySearch(true); return; }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      pos => { setBuyerLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude, label: lang === 'fr' ? 'Ma position' : 'My location' }); setLocLoading(false); if (sort === 'newest') setSort('nearest'); },
      () => { setLocLoading(false); setShowCitySearch(true); },
      { timeout: 8000 },
    );
  }

  async function handleCitySearch(e) {
    e.preventDefault();
    if (!cityInput.trim()) return;
    setLocLoading(true);
    const r = await geocodeCity(cityInput.trim());
    if (r) { setBuyerLoc(r); setShowCitySearch(false); setCityInput(''); if (sort === 'newest') setSort('nearest'); }
    setLocLoading(false);
  }

  /* ── Seller locate farm ──────────────────────────────────── */
  async function locateFarm() {
    setFormLocLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => { setForm(p => ({ ...p, lat: pos.coords.latitude, lng: pos.coords.longitude })); setFormLocLoading(false); },
        async () => {
          if (form.location.trim()) { const r = await geocodeCity(form.location.trim()); if (r) setForm(p => ({ ...p, lat: r.lat, lng: r.lng })); }
          setFormLocLoading(false);
        },
        { timeout: 6000 },
      );
    } else {
      if (form.location.trim()) { const r = await geocodeCity(form.location.trim()); if (r) setForm(p => ({ ...p, lat: r.lat, lng: r.lng })); }
      setFormLocLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const newListing = { id: Date.now(), ...form, user_name: user?.name || 'Vendeur', created_at: new Date().toISOString() };
    try { const res = await api.post('/market', form); setListings(p => [res.data, ...p]); }
    catch { setListings(p => [newListing, ...p]); }
    setShowForm(false);
    setForm({ crop_name: '', category: 'legumes', quantity_kg: '', price: '', currency: 'FCFA', location: '', lat: null, lng: null, contact: '', description: '' });
    setLoading(false);
  }

  function openContact(listing) {
    const dist = buyerLoc && listing.lat ? ` (${fmtDist(haversineKm(buyerLoc.lat, buyerLoc.lng, listing.lat, listing.lng))})` : '';
    const msg = lang === 'fr'
      ? `Bonjour ${listing.user_name}, je suis intéressé(e) par votre annonce : ${listing.crop_name}${dist}, ${Number(listing.quantity_kg).toLocaleString()} kg à ${Number(listing.price).toLocaleString()} ${listing.currency}/kg. Êtes-vous disponible ?`
      : `Hello ${listing.user_name}, I'm interested in your listing: ${listing.crop_name}${dist}, ${Number(listing.quantity_kg).toLocaleString()} kg at ${Number(listing.price).toLocaleString()} ${listing.currency}/kg. Are you available?`;
    setContactListing(listing); setMsgText(msg);
  }

  const filtered = listings
    .filter(l => {
      const ms = !search || l.crop_name.toLowerCase().includes(search.toLowerCase()) || l.location?.toLowerCase().includes(search.toLowerCase());
      const mc = activeCategory === 'all' || l.category === activeCategory;
      return ms && mc;
    })
    .map(l => ({ ...l, _dist: buyerLoc && l.lat != null ? haversineKm(buyerLoc.lat, buyerLoc.lng, l.lat, l.lng) : null }))
    .sort((a, b) => {
      if (sort === 'nearest') { if (a._dist == null) return 1; if (b._dist == null) return -1; return a._dist - b._dist; }
      if (sort === 'price_asc') return Number(a.price) - Number(b.price);
      if (sort === 'price_desc') return Number(b.price) - Number(a.price);
      if (sort === 'qty_desc') return Number(b.quantity_kg) - Number(a.quantity_kg);
      return new Date(b.created_at) - new Date(a.created_at);
    });

  const trendData = buildTrendData(selectedPrice.prices.ouaga);

  return (
    <div className="market-page">
      {/* Header */}
      <div className="module-header">
        <div>
          <h1>{lang === 'fr' ? 'Marché Numérique' : 'Digital Market'}</h1>
          <p>{lang === 'fr' ? 'Achetez, vendez et suivez les prix des marchés' : 'Buy, sell, and track market prices'}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(s => !s)}>
          {showForm ? '✕' : `+ ${lang === 'fr' ? 'Publier' : 'Post listing'}`}
        </button>
      </div>

      {/* Tabs */}
      <div className="market-tabs">
        {[
          { key: 'listings', fr: '🛒 Annonces', en: '🛒 Listings' },
          { key: 'prices',   fr: '📊 Prix du marché', en: '📊 Market Prices' },
          { key: 'analytics',fr: '📈 Analytics', en: '📈 Analytics' },
        ].map(t => (
          <button
            key={t.key}
            className={`market-tab ${activeTab === t.key ? 'active' : ''}`}
            onClick={() => setActiveTab(t.key)}
          >
            {lang === 'fr' ? t.fr : t.en}
          </button>
        ))}
      </div>

      {/* ── TAB: LISTINGS ────────────────────────────────────── */}
      {activeTab === 'listings' && (
        <>
          {showForm && (
            <div className="card market-form-card">
              <h3>{lang === 'fr' ? 'Nouvelle annonce' : 'New listing'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid-3">
                  <div className="form-group">
                    <label className="form-label">{lang === 'fr' ? 'Produit *' : 'Product *'}</label>
                    <input type="text" className="form-input" required value={form.crop_name}
                      onChange={e => setForm(p => ({ ...p, crop_name: e.target.value }))} placeholder={lang === 'fr' ? 'Ex : Oignons' : 'E.g. Onions'} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{lang === 'fr' ? 'Catégorie' : 'Category'}</label>
                    <select className="form-select" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                      {CATEGORIES.filter(c => c.value !== 'all').map(c => (
                        <option key={c.value} value={c.value}>{lang === 'fr' ? c.fr : c.en}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">{lang === 'fr' ? 'Quantité (kg) *' : 'Quantity (kg) *'}</label>
                    <input type="number" className="form-input" required min="1" value={form.quantity_kg}
                      onChange={e => setForm(p => ({ ...p, quantity_kg: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{lang === 'fr' ? 'Prix/kg *' : 'Price/kg *'}</label>
                    <input type="number" className="form-input" required min="0" value={form.price}
                      onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{lang === 'fr' ? 'Devise' : 'Currency'}</label>
                    <select className="form-select" value={form.currency} onChange={e => setForm(p => ({ ...p, currency: e.target.value }))}>
                      <option value="FCFA">FCFA (XOF)</option><option value="USD">USD</option><option value="EUR">EUR</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      {lang === 'fr' ? 'Localisation ferme/stockage' : 'Farm/storage location'}
                      {form.lat && <span className="loc-confirmed">✅</span>}
                    </label>
                    <div className="loc-input-row">
                      <input type="text" className="form-input" style={{ flex: 1 }}
                        value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value, lat: null, lng: null }))}
                        placeholder={lang === 'fr' ? 'Ville ou secteur' : 'City or area'} />
                      <button type="button" className="btn btn-secondary btn-sm loc-btn" onClick={locateFarm} disabled={formLocLoading}>
                        {formLocLoading ? '…' : '📍'}
                      </button>
                    </div>
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">{lang === 'fr' ? 'Description' : 'Description'}</label>
                    <textarea className="form-input" rows="2" value={form.description}
                      onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                      placeholder={lang === 'fr' ? 'Qualité, conditions de vente…' : 'Quality, sale terms…'} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{lang === 'fr' ? 'Contact WhatsApp' : 'WhatsApp'}</label>
                    <input type="tel" className="form-input" value={form.contact}
                      onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} placeholder="+226 XX XX XX XX" />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? '…' : lang === 'fr' ? 'Publier' : 'Publish'}</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>{lang === 'fr' ? 'Annuler' : 'Cancel'}</button>
                </div>
              </form>
            </div>
          )}

          {/* Buyer location bar */}
          <div className="buyer-loc-bar card">
            {buyerLoc ? (
              <div className="buyer-loc-active">
                <span className="buyer-loc-label">📍 {buyerLoc.label}</span>
                <button className="btn-link" onClick={() => { setBuyerLoc(null); setShowCitySearch(false); }}>{lang === 'fr' ? 'Changer' : 'Change'}</button>
              </div>
            ) : showCitySearch ? (
              <form className="buyer-city-form" onSubmit={handleCitySearch}>
                <input className="form-input buyer-city-input" placeholder={lang === 'fr' ? 'Votre ville…' : 'Your city…'} value={cityInput} onChange={e => setCityInput(e.target.value)} autoFocus />
                <button type="submit" className="btn btn-primary btn-sm" disabled={locLoading}>{locLoading ? '…' : 'OK'}</button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowCitySearch(false)}>✕</button>
              </form>
            ) : (
              <button className="buyer-loc-prompt" onClick={detectBuyerGPS} disabled={locLoading}>
                {locLoading ? (lang === 'fr' ? '🔍 Localisation…' : '🔍 Detecting…') : `📍 ${lang === 'fr' ? 'Voir la distance des producteurs' : 'Show distance to producers'}`}
              </button>
            )}
          </div>

          {/* Search + sort */}
          <div className="market-search-bar card">
            <div className="market-search-input-wrap">
              <span className="market-search-icon">🔍</span>
              <input type="text" className="market-search-input"
                placeholder={lang === 'fr' ? 'Rechercher un produit agricole…' : 'Search agricultural product…'}
                value={search} onChange={e => setSearch(e.target.value)} />
              {search && <button className="market-search-clear" onClick={() => setSearch('')}>✕</button>}
            </div>
            <select className="form-select market-sort" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="newest">{lang === 'fr' ? 'Plus récent' : 'Newest'}</option>
              {buyerLoc && <option value="nearest">{lang === 'fr' ? 'Plus proche' : 'Nearest'}</option>}
              <option value="price_asc">{lang === 'fr' ? 'Prix ↑' : 'Price ↑'}</option>
              <option value="price_desc">{lang === 'fr' ? 'Prix ↓' : 'Price ↓'}</option>
              <option value="qty_desc">{lang === 'fr' ? 'Quantité' : 'Quantity'}</option>
            </select>
          </div>

          {/* Category tabs */}
          <div className="market-cats">
            {CATEGORIES.map(cat => (
              <button key={cat.value} className={`market-cat-btn ${activeCategory === cat.value ? 'active' : ''}`} onClick={() => setActiveCategory(cat.value)}>
                {cat.icon} {lang === 'fr' ? cat.fr : cat.en}
              </button>
            ))}
          </div>

          <p className="market-count">{filtered.length} {lang === 'fr' ? 'annonce(s)' : 'listing(s)'}{search && ` · "${search}"`}</p>

          {filtered.length === 0 ? (
            <div className="market-empty card"><p>🌾 {lang === 'fr' ? 'Aucune annonce trouvée.' : 'No listings found.'}</p></div>
          ) : (
            <div className="listings-grid">
              {filtered.map(l => (
                <ListingCard key={l.id} listing={l} lang={lang} categories={CATEGORIES} buyerLoc={buyerLoc} onContact={() => openContact(l)} />
              ))}
            </div>
          )}
        </>
      )}

      {/* ── TAB: MARKET PRICES ───────────────────────────────── */}
      {activeTab === 'prices' && (
        <div className="prices-zone">
          {/* Regional price table */}
          <div className="card price-table-card">
            <h3>📊 {lang === 'fr' ? 'Prix régionaux — Semaine en cours' : 'Regional prices — Current week'}</h3>
            <p className="price-table-note">{lang === 'fr' ? 'Prix indicatifs en FCFA/kg (ou unité indiquée) sur les principaux marchés du Burkina Faso.' : 'Indicative prices in FCFA/kg (or stated unit) at major Burkina Faso markets.'}</p>
            <div className="price-table-wrap">
              <table className="price-table">
                <thead>
                  <tr>
                    <th>{lang === 'fr' ? 'Produit' : 'Product'}</th>
                    {CITIES.map(c => <th key={c.key}>{lang === 'fr' ? c.fr : c.en}</th>)}
                    <th>{lang === 'fr' ? 'Prix mondial (USD)' : 'Global price (USD)'}</th>
                    <th>{lang === 'fr' ? 'Tendance' : 'Trend'}</th>
                  </tr>
                </thead>
                <tbody>
                  {REGIONAL_PRICES.map(p => (
                    <tr key={p.id} className={`price-row ${selectedPrice.id === p.id ? 'selected' : ''}`} onClick={() => setSelectedPrice(p)}>
                      <td className="price-product"><span>{p.icon}</span> {lang === 'fr' ? p.name_fr : p.name_en}<span className="price-unit">/{p.unit}</span></td>
                      {CITIES.map(c => (
                        <td key={c.key} className="price-cell">
                          {p.prices[c.key]?.toLocaleString()}
                        </td>
                      ))}
                      <td className="price-global">${typeof p.global_usd === 'number' ? p.global_usd.toFixed(2) : p.global_usd}</td>
                      <td className={`price-trend ${p.trend_up === true ? 'up' : p.trend_up === false ? 'down' : ''}`}>
                        {p.trend_up === true ? '↑' : p.trend_up === false ? '↓' : '—'} {p.trend}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Price trend chart */}
          <div className="card price-trend-card">
            <h3>
              {selectedPrice.icon} {lang === 'fr' ? selectedPrice.name_fr : selectedPrice.name_en} — {lang === 'fr' ? 'Évolution des prix (6 mois)' : 'Price trend (6 months)'}
            </h3>
            <p className="price-table-note">{lang === 'fr' ? 'Cliquez sur un produit dans le tableau pour afficher son évolution.' : 'Click a product in the table to see its trend.'}</p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trendData} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-light)" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} tickFormatter={v => v.split('/')[0]} />
                <YAxis tick={{ fontSize: 10 }} unit=" F" />
                <Tooltip formatter={v => [`${v.toLocaleString()} FCFA`, lang === 'fr' ? 'Prix moyen' : 'Avg. price']} labelFormatter={v => v.split('/')[0]} />
                <Line type="monotone" dataKey="price" stroke="var(--green-mid)" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Highest vs lowest region */}
          <div className="price-insights">
            <div className="card price-insight-card">
              <h4>{lang === 'fr' ? '🔼 Marché le plus cher' : '🔼 Highest market'}</h4>
              {(() => {
                const best = CITIES.reduce((b, c) => selectedPrice.prices[c.key] > selectedPrice.prices[b.key] ? c : b);
                return <p>{lang === 'fr' ? best.fr : best.en} — <strong>{selectedPrice.prices[best.key]?.toLocaleString()} FCFA/{selectedPrice.unit}</strong></p>;
              })()}
            </div>
            <div className="card price-insight-card">
              <h4>{lang === 'fr' ? '🔽 Marché le moins cher' : '🔽 Lowest market'}</h4>
              {(() => {
                const best = CITIES.reduce((b, c) => selectedPrice.prices[c.key] < selectedPrice.prices[b.key] ? c : b);
                return <p>{lang === 'fr' ? best.fr : best.en} — <strong>{selectedPrice.prices[best.key]?.toLocaleString()} FCFA/{selectedPrice.unit}</strong></p>;
              })()}
            </div>
            <div className="card price-insight-card">
              <h4>{lang === 'fr' ? '🌍 Équivalent USD/kg' : '🌍 USD equivalent/kg'}</h4>
              <p><strong>${typeof selectedPrice.global_usd === 'number' ? selectedPrice.global_usd.toFixed(2) : selectedPrice.global_usd}</strong> {lang === 'fr' ? 'sur les marchés mondiaux' : 'on global markets'}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: ANALYTICS ───────────────────────────────────── */}
      {activeTab === 'analytics' && (
        <div className="analytics-zone">
          <div className="analytics-note card">
            <p>📡 {lang === 'fr' ? 'Données basées sur les recherches, clics, messages et annonces publiées sur la plateforme.' : 'Data based on searches, clicks, messages, and listings posted on the platform.'}</p>
          </div>

          {/* Top trending products */}
          <div className="card">
            <h3>🔥 {lang === 'fr' ? 'Produits les plus demandés' : 'Most demanded products'}</h3>
            <div className="analytics-grid">
              {MARKET_ANALYTICS.map((a, i) => (
                <div key={i} className="analytics-card">
                  <div className="analytics-rank">#{i + 1}</div>
                  <div className="analytics-icon">{a.icon}</div>
                  <div className="analytics-body">
                    <strong>{lang === 'fr' ? a.product_fr : a.product_en}</strong>
                    <div className="analytics-stats">
                      <span title={lang === 'fr' ? 'Recherches' : 'Searches'}>🔍 {a.searches}</span>
                      <span title={lang === 'fr' ? 'Vues' : 'Views'}>👁 {a.views}</span>
                      <span title={lang === 'fr' ? 'Messages' : 'Messages'}>💬 {a.messages}</span>
                    </div>
                    <span className={`analytics-trend ${a.trend.startsWith('+') ? 'up' : a.trend.startsWith('-') ? 'down' : ''}`}>
                      {a.trend.startsWith('+') ? '↑' : a.trend.startsWith('-') ? '↓' : '—'} {a.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bar chart: searches vs views */}
          <div className="card">
            <h3>{lang === 'fr' ? 'Recherches vs Vues vs Messages' : 'Searches vs Views vs Messages'}</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={MARKET_ANALYTICS} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-light)" />
                <XAxis dataKey={lang === 'fr' ? 'product_fr' : 'product_en'} tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '0.75rem' }} />
                <Bar dataKey="searches" name={lang === 'fr' ? 'Recherches' : 'Searches'} fill="#52B788" radius={[3,3,0,0]} />
                <Bar dataKey="views" name={lang === 'fr' ? 'Vues' : 'Views'} fill="#2D6A4F" radius={[3,3,0,0]} />
                <Bar dataKey="messages" name="Messages" fill="#f4a261" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Market activity summary */}
          <div className="analytics-summary">
            <div className="card analytics-sum-card">
              <span className="sum-icon">📋</span>
              <span className="sum-value">{listings.length}</span>
              <span className="sum-label">{lang === 'fr' ? 'Annonces actives' : 'Active listings'}</span>
            </div>
            <div className="card analytics-sum-card">
              <span className="sum-icon">🔍</span>
              <span className="sum-value">{MARKET_ANALYTICS.reduce((s, a) => s + a.searches, 0).toLocaleString()}</span>
              <span className="sum-label">{lang === 'fr' ? 'Recherches ce mois' : 'Searches this month'}</span>
            </div>
            <div className="card analytics-sum-card">
              <span className="sum-icon">💬</span>
              <span className="sum-value">{MARKET_ANALYTICS.reduce((s, a) => s + a.messages, 0).toLocaleString()}</span>
              <span className="sum-label">{lang === 'fr' ? 'Messages envoyés' : 'Messages sent'}</span>
            </div>
            <div className="card analytics-sum-card">
              <span className="sum-icon">🔥</span>
              <span className="sum-value">{MARKET_ANALYTICS[0][lang === 'fr' ? 'product_fr' : 'product_en']}</span>
              <span className="sum-label">{lang === 'fr' ? 'Produit vedette' : 'Top product'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Contact modal */}
      {contactListing && (
        <>
          <div className="market-overlay" onClick={() => setContactListing(null)} />
          <div className="contact-modal card">
            <div className="contact-modal-header">
              <div>
                <h3>{lang === 'fr' ? 'Contacter le producteur' : 'Contact producer'}</h3>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {contactListing.user_name} · {contactListing.crop_name}
                  {contactListing._dist != null && (
                    <span className={`dist-badge inline-dist ${distColor(contactListing._dist)}`}>📍 {fmtDist(contactListing._dist)}</span>
                  )}
                </p>
              </div>
              <button className="contact-modal-close" onClick={() => setContactListing(null)}>✕</button>
            </div>
            <div className="contact-modal-body">
              <label className="form-label">{lang === 'fr' ? 'Votre message' : 'Your message'}</label>
              <textarea className="form-input" rows="4" value={msgText} onChange={e => setMsgText(e.target.value)} />
            </div>
            <div className="contact-modal-actions">
              {contactListing.contact && (
                <a href={`https://wa.me/${contactListing.contact.replace(/\D/g, '')}?text=${encodeURIComponent(msgText)}`} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                  💬 {lang === 'fr' ? 'Envoyer via WhatsApp' : 'Send via WhatsApp'}
                </a>
              )}
              <button className="btn btn-secondary" onClick={() => setContactListing(null)}>{lang === 'fr' ? 'Fermer' : 'Close'}</button>
            </div>
            <p className="contact-modal-note">💡 {lang === 'fr' ? "WhatsApp est le moyen le plus rapide de contacter les producteurs en Afrique de l'Ouest." : 'WhatsApp is the fastest way to reach producers in West Africa.'}</p>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Listing Card ────────────────────────────────────────── */
function ListingCard({ listing, lang, categories, buyerLoc, onContact }) {
  const [expanded, setExpanded] = useState(false);
  const cat = categories.find(c => c.value === listing.category);
  const dist = listing._dist;
  return (
    <div className="listing-card card">
      <div className="listing-card-top">
        <span className="listing-cat-badge">{cat?.icon || '📦'} {lang === 'fr' ? cat?.fr : cat?.en}</span>
        {buyerLoc && (
          <span className={`dist-badge ${dist != null ? distColor(dist) : 'dist-unknown'}`}>
            {dist != null ? `📍 ${fmtDist(dist)}` : '📍 ?'}
          </span>
        )}
      </div>
      <div className="listing-header">
        <h3 className="listing-name">{listing.crop_name}</h3>
        <span className="listing-price">{Number(listing.price).toLocaleString()} {listing.currency}/kg</span>
      </div>
      <div className="listing-stats">
        <span className="listing-stat">⚖️ {Number(listing.quantity_kg).toLocaleString()} kg</span>
        <span className="listing-stat listing-total">💰 {(Number(listing.price) * Number(listing.quantity_kg)).toLocaleString()} {listing.currency}</span>
      </div>
      {listing.location && (
        <div className="listing-location">
          📍 {listing.location}
          {listing.lat && <span className="loc-dot" title="GPS confirmed">🟢</span>}
        </div>
      )}
      {listing.description && (
        <p className={`listing-desc ${expanded ? 'expanded' : ''}`} onClick={() => setExpanded(e => !e)}>
          {listing.description}
          {!expanded && <span className="read-more"> {lang === 'fr' ? 'Lire plus' : 'Read more'}</span>}
        </p>
      )}
      <div className="listing-footer">
        <div className="listing-seller">
          <div className="seller-avatar">{listing.user_name?.charAt(0) || 'V'}</div>
          <div>
            <span className="seller-name">{listing.user_name}</span>
            <span className="listing-date">{new Date(listing.created_at).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short' })}</span>
          </div>
        </div>
        <button className="btn btn-primary btn-sm" onClick={onContact}>💬 {lang === 'fr' ? 'Contacter' : 'Contact'}</button>
      </div>
    </div>
  );
}

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
  if (km < 20)  return 'dist-near';
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
function RatingStars({ rating = 0, count = 0, size = 'sm' }) {
  const full  = Math.floor(rating);
  const half  = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className={`rating-stars rating-${size}`}>
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(empty)}
      {count > 0 && <span className="rating-count">({count})</span>}
    </span>
  );
}
function CertBadge({ id, lang }) {
  const map = {
    organic: { fr: 'Bio', en: 'Organic', icon: '🌿', cls: 'cert-organic' },
    local:   { fr: 'Local', en: 'Local',  icon: '📍', cls: 'cert-local'  },
    premium: { fr: 'Premium', en: 'Premium', icon: '⭐', cls: 'cert-premium'},
    verified:{ fr: 'Vérifié', en: 'Verified', icon: '✅', cls: 'cert-verified'},
  };
  const c = map[id];
  if (!c) return null;
  return <span className={`cert-badge ${c.cls}`}>{c.icon} {lang === 'fr' ? c.fr : c.en}</span>;
}

/* ─── Static data ─────────────────────────────────────────── */
const CATEGORIES = [
  { value: 'all',      fr: 'Tout',       en: 'All',       icon: '🌍' },
  { value: 'legumes',  fr: 'Légumes',    en: 'Vegetables',icon: '🥬' },
  { value: 'cereales', fr: 'Céréales',   en: 'Cereals',   icon: '🌾' },
  { value: 'fruits',   fr: 'Fruits',     en: 'Fruits',    icon: '🍊' },
  { value: 'elevage',  fr: 'Élevage',    en: 'Livestock', icon: '🐄' },
  { value: 'poisson',  fr: 'Poisson',    en: 'Fish',      icon: '🐟' },
  { value: 'intrants', fr: 'Intrants',   en: 'Inputs',    icon: '🌱' },
  { value: 'autres',   fr: 'Autres',     en: 'Other',     icon: '📦' },
];

const CERT_LIST = [
  { id: 'organic', fr: 'Biologique', en: 'Organic',  icon: '🌿' },
  { id: 'local',   fr: 'Local',      en: 'Local',    icon: '📍' },
  { id: 'premium', fr: 'Premium',    en: 'Premium',  icon: '⭐' },
  { id: 'verified',fr: 'Vérifié',    en: 'Verified', icon: '✅' },
];

const DELIVERY_OPTS = [
  { id: 'pickup',   fr: 'Enlèvement sur place', en: 'On-site Pickup', icon: '📍' },
  { id: 'delivery', fr: 'Livraison',            en: 'Delivery',       icon: '🚚' },
];

const REGIONAL_PRICES = [
  { id:'oignon',      name_fr:'Oignon',          name_en:'Onion',          icon:'🧅', unit:'kg',   prices:{ouaga:275,bobo:240,koudougou:260,fada:290,dori:310}, global_usd:0.45, trend:'+8%',  trend_up:true  },
  { id:'mais',        name_fr:'Maïs',            name_en:'Maize',          icon:'🌽', unit:'kg',   prices:{ouaga:130,bobo:115,koudougou:120,fada:125,dori:145}, global_usd:0.21, trend:'-3%',  trend_up:false },
  { id:'mil',         name_fr:'Mil',             name_en:'Millet',         icon:'🌾', unit:'kg',   prices:{ouaga:150,bobo:135,koudougou:140,fada:155,dori:165}, global_usd:0.25, trend:'+2%',  trend_up:true  },
  { id:'sorgho',      name_fr:'Sorgho',          name_en:'Sorghum',        icon:'🌾', unit:'kg',   prices:{ouaga:125,bobo:110,koudougou:118,fada:130,dori:140}, global_usd:0.20, trend:'stable',trend_up:null },
  { id:'niebe',       name_fr:'Niébé',           name_en:'Cowpea',         icon:'🫘', unit:'kg',   prices:{ouaga:420,bobo:390,koudougou:400,fada:430,dori:460}, global_usd:0.70, trend:'+12%', trend_up:true  },
  { id:'tomate',      name_fr:'Tomate',          name_en:'Tomato',         icon:'🍅', unit:'kg',   prices:{ouaga:310,bobo:280,koudougou:295,fada:320,dori:350}, global_usd:0.52, trend:'-5%',  trend_up:false },
  { id:'sesame',      name_fr:'Sésame',          name_en:'Sesame',         icon:'🌿', unit:'kg',   prices:{ouaga:620,bobo:590,koudougou:605,fada:640,dori:660}, global_usd:1.05, trend:'+15%', trend_up:true  },
  { id:'pomme_terre', name_fr:'Pomme de terre',  name_en:'Potato',         icon:'🥔', unit:'kg',   prices:{ouaga:165,bobo:145,koudougou:155,fada:180,dori:200}, global_usd:0.28, trend:'-2%',  trend_up:false },
  { id:'poulet',      name_fr:'Poulet (vif)',     name_en:'Live Chicken',   icon:'🐔', unit:'kg vif',prices:{ouaga:1800,bobo:1650,koudougou:1700,fada:1850,dori:1900}, global_usd:3.00, trend:'+5%', trend_up:true },
  { id:'boeuf',       name_fr:'Bœuf (carcasse)', name_en:'Beef (carcass)', icon:'🐄', unit:'kg',   prices:{ouaga:2800,bobo:2600,koudougou:2700,fada:2900,dori:3100}, global_usd:4.65, trend:'+7%', trend_up:true },
  { id:'porc',        name_fr:'Porc (carcasse)', name_en:'Pork (carcass)', icon:'🐖', unit:'kg',   prices:{ouaga:2200,bobo:2050,koudougou:2100,fada:2300,dori:2500}, global_usd:3.65, trend:'+3%', trend_up:true },
  { id:'mouton',      name_fr:'Mouton (vif)',     name_en:'Sheep (live)',   icon:'🐑', unit:'tête', prices:{ouaga:45000,bobo:40000,koudougou:42000,fada:47000,dori:50000}, global_usd:75, trend:'+10%', trend_up:true },
  { id:'poisson_frais',name_fr:'Poisson frais',  name_en:'Fresh Fish',     icon:'🐟', unit:'kg',   prices:{ouaga:1400,bobo:1250,koudougou:1350,fada:1500,dori:1600}, global_usd:2.30, trend:'+4%', trend_up:true },
  { id:'poisson_seche',name_fr:'Poisson séché',  name_en:'Dried Fish',     icon:'🐠', unit:'kg',   prices:{ouaga:3200,bobo:2900,koudougou:3000,fada:3300,dori:3500}, global_usd:5.30, trend:'+6%', trend_up:true },
  { id:'lait',        name_fr:'Lait local',       name_en:'Local Milk',     icon:'🥛', unit:'L',    prices:{ouaga:500,bobo:450,koudougou:470,fada:520,dori:550},   global_usd:0.83, trend:'stable',trend_up:null },
];

const MONTHS_FR = ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc'];
const MONTHS_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function buildTrendData(basePrice, months = 6) {
  const now = new Date().getMonth();
  return Array.from({ length: months }, (_, i) => {
    const idx = (now - months + 1 + i + 12) % 12;
    const seasonal = 1 + 0.12 * Math.sin((idx / 12) * 2 * Math.PI);
    const noise = 1 + (Math.random() * 0.08 - 0.04);
    return { month: MONTHS_FR[idx] + '/' + MONTHS_EN[idx], price: Math.round(basePrice * seasonal * noise) };
  });
}

const MARKET_ANALYTICS = [
  { product_fr:'Oignons',       product_en:'Onions',    icon:'🧅', searches:342, views:1240, messages:89,  trend:'+18%' },
  { product_fr:'Maïs',          product_en:'Maize',     icon:'🌽', searches:298, views:980,  messages:64,  trend:'+5%'  },
  { product_fr:'Poulet',        product_en:'Chicken',   icon:'🐔', searches:276, views:860,  messages:72,  trend:'+22%' },
  { product_fr:'Tomates',       product_en:'Tomatoes',  icon:'🍅', searches:254, views:740,  messages:55,  trend:'-4%'  },
  { product_fr:'Sésame',        product_en:'Sesame',    icon:'🌿', searches:198, views:620,  messages:48,  trend:'+30%' },
  { product_fr:'Poisson frais', product_en:'Fresh Fish',icon:'🐟', searches:187, views:590,  messages:61,  trend:'+12%' },
  { product_fr:'Niébé',         product_en:'Cowpea',    icon:'🫘', searches:165, views:480,  messages:39,  trend:'+15%' },
  { product_fr:'Bœuf',          product_en:'Beef',      icon:'🐄', searches:142, views:410,  messages:52,  trend:'+8%'  },
];

const CITIES = [
  { key:'ouaga',     fr:'Ouagadougou',  en:'Ouagadougou'  },
  { key:'bobo',      fr:'Bobo-Dioulasso',en:'Bobo-Dioulasso'},
  { key:'koudougou', fr:'Koudougou',    en:'Koudougou'    },
  { key:'fada',      fr:"Fada N'Gourma",en:"Fada N'Gourma"},
  { key:'dori',      fr:'Dori',         en:'Dori'          },
];

// Enhanced listings with seller profiles, ratings, certifications
const DEMO_LISTINGS = [
  { id:1,  crop_name:'Oignons',         category:'legumes',  quantity_kg:500,  price:250,  currency:'FCFA', location:'Ouagadougou',   lat:12.3647,  lng:-1.5337, contact:'+22670000001', created_at:'2026-05-01', user_name:'Moussa Kaboré',     user_id:'u1', min_order_kg:20,  delivery:'both',     certifications:['organic','local'], harvest_date:'2026-04-28', seller_rating:4.8, seller_review_count:24, seller_bio:'Producteur maraîcher depuis 2010, spécialisé dans les oignons de qualité supérieure du Plateau Central.', seller_since:'2022', verified:true,  description:'Oignons frais de qualité supérieure, récoltés cette semaine.' },
  { id:2,  crop_name:'Pommes de terre', category:'legumes',  quantity_kg:1000, price:150,  currency:'FCFA', location:'Bobo-Dioulasso', lat:11.1771,  lng:-4.2979, contact:'+22671000002', created_at:'2026-05-05', user_name:'Aminata Diallo',    user_id:'u2', min_order_kg:50,  delivery:'pickup',   certifications:['local'],           harvest_date:'2026-05-02', seller_rating:4.5, seller_review_count:18, seller_bio:'Agricultrice engagée dans la production locale et durable à Bobo-Dioulasso.',                         seller_since:'2023', verified:true,  description:'Grande variété locale. Prix négociable pour grosses quantités.' },
  { id:3,  crop_name:'Tomates',         category:'legumes',  quantity_kg:200,  price:300,  currency:'FCFA', location:'Koudougou',      lat:12.2487,  lng:-2.3622, contact:'+22672000003', created_at:'2026-05-08', user_name:'Ibrahim Sawadogo',  user_id:'u3', min_order_kg:10,  delivery:'delivery', certifications:['organic'],         harvest_date:'2026-05-06', seller_rating:4.2, seller_review_count:9,  seller_bio:'Maraîcher certifié bio, culture sans pesticides chimiques depuis 5 ans.',                              seller_since:'2021', verified:false, description:'Tomates mûres. Livraison possible dans un rayon de 50 km.' },
  { id:4,  crop_name:'Maïs',            category:'cereales', quantity_kg:2000, price:120,  currency:'FCFA', location:"Fada N'Gourma",  lat:12.0603,  lng:0.3464,  contact:'+22673000004', created_at:'2026-05-10', user_name:'Fatimata Ouédraogo',user_id:'u4', min_order_kg:100, delivery:'pickup',   certifications:['local'],           harvest_date:'2026-04-15', seller_rating:4.6, seller_review_count:31, seller_bio:'Grande exploitation céréalière de la région Est, production de maïs et de sorgho.',                    seller_since:'2020', verified:true,  description:'Maïs jaune séché. Idéal pour transformation.' },
  { id:5,  crop_name:'Mil',             category:'cereales', quantity_kg:800,  price:140,  currency:'FCFA', location:'Dori',            lat:14.0329,  lng:-0.0356, contact:'+22674000005', created_at:'2026-05-12', user_name:'Hamidou Compaoré',  user_id:'u5', min_order_kg:50,  delivery:'both',     certifications:['local','organic'], harvest_date:'2026-04-20', seller_rating:4.4, seller_review_count:15, seller_bio:'Producteur du Sahel, spécialiste des céréales adaptées aux zones arides.',                             seller_since:'2022', verified:false, description:'Mil local de première qualité, récolte 2026.' },
  { id:6,  crop_name:'Sésame',          category:'autres',   quantity_kg:300,  price:600,  currency:'FCFA', location:'Dédougou',        lat:12.4625,  lng:-3.4665, contact:'+22675000006', created_at:'2026-05-14', user_name:'Mariam Traoré',     user_id:'u6', min_order_kg:25,  delivery:'pickup',   certifications:['organic','premium'],harvest_date:'2026-04-25', seller_rating:4.9, seller_review_count:42, seller_bio:'Productrice de sésame certifié bio, export vers l\'Europe. Qualité premium garantie.',                 seller_since:'2019', verified:true,  description:'Sésame blanc certifié bio, qualité premium export.' },
  { id:7,  crop_name:'Poulet (vif)',     category:'elevage',  quantity_kg:50,   price:1800, currency:'FCFA', location:'Ouahigouya',      lat:13.5782,  lng:-2.4215, contact:'+22676000007', created_at:'2026-05-15', user_name:'Salif Barro',       user_id:'u7', min_order_kg:5,   delivery:'pickup',   certifications:['local'],           harvest_date:null,         seller_rating:4.3, seller_review_count:11, seller_bio:'Éleveur avicole traditionnel, alimentation naturelle, sans hormones.',                                seller_since:'2023', verified:false, description:'Poulets de chair locaux, bien nourris, 1,8–2,2 kg/pièce.' },
  { id:8,  crop_name:'Poisson fumé',     category:'poisson',  quantity_kg:80,   price:3000, currency:'FCFA', location:'Ouagadougou',     lat:12.3647,  lng:-1.5337, contact:'+22677000008', created_at:'2026-05-16', user_name:'Kadi Sawadogo',     user_id:'u8', min_order_kg:10,  delivery:'both',     certifications:['local'],           harvest_date:null,         seller_rating:4.7, seller_review_count:28, seller_bio:'Transformatrice de poisson, technique de fumage traditionnel pour longue conservation.',               seller_since:'2021', verified:true,  description:'Poisson fumé de qualité. Conditionnement soigné.' },
  { id:9,  crop_name:'BioGrowth',        category:'intrants', quantity_kg:100,  price:2500, currency:'FCFA', location:'Ouagadougou',     lat:12.3647,  lng:-1.5337, contact:'+22678000009', created_at:'2026-05-17', user_name:'GreenFCO',          user_id:'u9', min_order_kg:5,   delivery:'delivery', certifications:['verified','premium'],harvest_date:null,        seller_rating:5.0, seller_review_count:67, seller_bio:'GreenFCO — plateforme officielle, bio-fertilisants et intrants naturels pour l\'Afrique de l\'Ouest.', seller_since:'2021', verified:true,  description:'Bio-fertilisant liquide innovant pour sols ouest-africains.' },
];

const DEMO_REVIEWS = [
  { seller_id:'u1', reviewer:'Aïssata Bambara',  rating:5, text:"Oignons de très bonne qualité, livraison respectée. Je recommande vivement!",      date:'2026-05-14' },
  { seller_id:'u1', reviewer:'Kofi Traore',       rating:5, text:"Produits conformes, Moussa est un vendeur sérieux. Commande de 200kg satisfaisante.", date:'2026-05-10' },
  { seller_id:'u1', reviewer:'Mariam Zongo',      rating:4, text:"Très frais, prix correct. Quelques oignons abîmés mais globalement bien.",            date:'2026-05-05' },
  { seller_id:'u6', reviewer:'Paul Kinda',        rating:5, text:"Sésame exceptionnel, acheté pour export. Qualité irréprochable, Mariam est pro!",     date:'2026-05-12' },
  { seller_id:'u6', reviewer:'Djamila Ouattara',  rating:5, text:"Bio certifié, exactement ce que je cherchais. Emballage parfait pour transport.",     date:'2026-05-08' },
  { seller_id:'u9', reviewer:'Souleymane Belem',  rating:5, text:"BioGrowth a transformé ma récolte. +40% de rendement sans chimie. Incroyable!",       date:'2026-05-15' },
  { seller_id:'u8', reviewer:'Fatou Kiendrebeogo',rating:5, text:"Poisson parfaitement fumé, conservation excellente. Kadi est une vraie professionnelle.",date:'2026-05-13'},
  { seller_id:'u4', reviewer:'Lassina Coulibaly', rating:4, text:"Maïs de bonne qualité, rendement satisfaisant. Quantité exacte, bonne communication.", date:'2026-05-09' },
];

/* ─── Default seller profile ──────────────────────────────── */
const DEFAULT_SELLER = { farmName: '', bio: '', phone: '', location: '', lat: null, lng: null, certifications: [], delivery: ['pickup'], memberSince: new Date().getFullYear().toString() };
const DEFAULT_BUYER  = { name: '', location: '', lat: null, lng: null, preferredCategories: [], memberSince: new Date().getFullYear().toString() };

/* ─── Main component ──────────────────────────────────────── */
export default function MarketPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const { user } = useAuthStore();

  // Tab state
  const [activeTab, setActiveTab] = useState('browse');

  // Listings
  const [listings, setListings]   = useState(DEMO_LISTINGS);
  const [search, setSearch]       = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sort, setSort]           = useState('newest');
  const [showForm, setShowForm]   = useState(false);
  const [loading, setLoading]     = useState(false);

  // Profiles
  const [sellerProfile, setSellerProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem('greenfco_seller_profile')) || null; } catch { return null; }
  });
  const [buyerProfile, setBuyerProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem('greenfco_buyer_profile')) || null; } catch { return null; }
  });
  const [showSellerSetup, setShowSellerSetup] = useState(false);
  const [showBuyerSetup,  setShowBuyerSetup]  = useState(false);
  const [sellerForm, setSellerForm] = useState(DEFAULT_SELLER);
  const [buyerForm,  setBuyerForm]  = useState(DEFAULT_BUYER);

  // Saved listings
  const [savedIds, setSavedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('greenfco_saved_listings')) || []; } catch { return []; }
  });

  // Seller profile sheet
  const [viewingSeller, setViewingSeller] = useState(null);

  // Contact modal
  const [contactListing, setContactListing] = useState(null);
  const [msgText, setMsgText]               = useState('');

  // Location
  const [buyerLoc, setBuyerLoc]     = useState(null);
  const [locLoading, setLocLoading] = useState(false);
  const [cityInput, setCityInput]   = useState('');
  const [showCitySearch, setShowCitySearch] = useState(false);

  // New listing form
  const [formLocLoading, setFormLocLoading] = useState(false);
  const [form, setForm] = useState({
    crop_name:'', category:'legumes', quantity_kg:'', price:'', currency:'FCFA',
    location:'', lat:null, lng:null, contact:'', description:'',
    min_order_kg:'', delivery:'pickup', certifications:[], harvest_date:'',
  });

  // Prices tab
  const [selectedPrice, setSelectedPrice] = useState(REGIONAL_PRICES[0]);
  const trendData = buildTrendData(selectedPrice.prices.ouaga);

  // Analytics
  const analyticsRef = useRef({ ...Object.fromEntries(MARKET_ANALYTICS.map(a => [a.product_fr, { ...a }])) });
  function trackSearch(q) {
    if (!q) return;
    const key = MARKET_ANALYTICS.find(a => a.product_fr.toLowerCase().includes(q.toLowerCase()))?.product_fr;
    if (key && analyticsRef.current[key]) analyticsRef.current[key].searches += 1;
  }
  useEffect(() => { const t = setTimeout(() => trackSearch(search), 600); return () => clearTimeout(t); }, [search]);

  /* ── Persist saved + profiles ──────────────────────────── */
  useEffect(() => { localStorage.setItem('greenfco_saved_listings', JSON.stringify(savedIds)); }, [savedIds]);
  function toggleSave(id) {
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  /* ── Buyer location ──────────────────────────────────────*/
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

  /* ── Seller locate farm ──────────────────────────────────*/
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

  /* ── Submit listing ──────────────────────────────────────*/
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const newListing = {
      id: Date.now(), ...form, user_name: sellerProfile?.farmName || user?.name || 'Vendeur',
      user_id: user?.id || 'me', created_at: new Date().toISOString(),
      seller_rating: 0, seller_review_count: 0,
      seller_bio: sellerProfile?.bio || '',
      seller_since: sellerProfile?.memberSince || new Date().getFullYear().toString(),
      verified: false,
    };
    try { const res = await api.post('/market', form); setListings(p => [res.data, ...p]); }
    catch { setListings(p => [newListing, ...p]); }
    setShowForm(false);
    setForm({ crop_name:'', category:'legumes', quantity_kg:'', price:'', currency:'FCFA', location:'', lat:null, lng:null, contact:'', description:'', min_order_kg:'', delivery:'pickup', certifications:[], harvest_date:'' });
    setLoading(false);
  }

  /* ── Contact ─────────────────────────────────────────────*/
  function openContact(listing) {
    const dist = buyerLoc && listing.lat ? ` (${fmtDist(haversineKm(buyerLoc.lat, buyerLoc.lng, listing.lat, listing.lng))})` : '';
    const msg = lang === 'fr'
      ? `Bonjour ${listing.user_name}, je suis intéressé(e) par : ${listing.crop_name}${dist}, ${Number(listing.quantity_kg).toLocaleString()} kg à ${Number(listing.price).toLocaleString()} ${listing.currency}/kg. Êtes-vous disponible ?`
      : `Hello ${listing.user_name}, I'm interested in: ${listing.crop_name}${dist}, ${Number(listing.quantity_kg).toLocaleString()} kg at ${Number(listing.price).toLocaleString()} ${listing.currency}/kg. Are you available?`;
    setContactListing(listing); setMsgText(msg);
  }

  /* ── Seller profile save ─────────────────────────────────*/
  function saveSellerProfile(e) {
    e.preventDefault();
    localStorage.setItem('greenfco_seller_profile', JSON.stringify(sellerForm));
    setSellerProfile(sellerForm);
    setShowSellerSetup(false);
  }
  function saveBuyerProfile(e) {
    e.preventDefault();
    localStorage.setItem('greenfco_buyer_profile', JSON.stringify(buyerForm));
    setBuyerProfile(buyerForm);
    setShowBuyerSetup(false);
  }

  /* ── Filtered listings ───────────────────────────────────*/
  const filtered = listings
    .filter(l => {
      const ms = !search || l.crop_name.toLowerCase().includes(search.toLowerCase()) || l.location?.toLowerCase().includes(search.toLowerCase());
      const mc = activeCategory === 'all' || l.category === activeCategory;
      return ms && mc;
    })
    .map(l => ({ ...l, _dist: buyerLoc && l.lat != null ? haversineKm(buyerLoc.lat, buyerLoc.lng, l.lat, l.lng) : null }))
    .sort((a, b) => {
      if (sort === 'nearest') { if (a._dist == null) return 1; if (b._dist == null) return -1; return a._dist - b._dist; }
      if (sort === 'price_asc')  return Number(a.price) - Number(b.price);
      if (sort === 'price_desc') return Number(b.price) - Number(a.price);
      if (sort === 'qty_desc')   return Number(b.quantity_kg) - Number(a.quantity_kg);
      if (sort === 'rating')     return (b.seller_rating || 0) - (a.seller_rating || 0);
      return new Date(b.created_at) - new Date(a.created_at);
    });

  const myListings  = listings.filter(l => l.user_id === (user?.id || 'me') || l.user_name === (sellerProfile?.farmName || user?.name));
  const savedListings = listings.filter(l => savedIds.includes(l.id));

  /* ── Tabs config ─────────────────────────────────────────*/
  const TABS = [
    { key:'browse',      fr:'🛒 Annonces',      en:'🛒 Browse' },
    { key:'sell',        fr:'📦 Vendre',        en:'📦 Sell' },
    { key:'saved',       fr:`❤️ Sauvegardés (${savedIds.length})`, en:`❤️ Saved (${savedIds.length})` },
    { key:'prices',      fr:'📊 Prix du marché', en:'📊 Prices' },
    { key:'analytics',   fr:'📈 Analytics',     en:'📈 Analytics' },
  ];

  return (
    <div className="market-page">
      {/* Header */}
      <div className="module-header">
        <div>
          <h1>{lang === 'fr' ? '🛒 Marché Numérique' : '🛒 Digital Market'}</h1>
          <p>{lang === 'fr' ? 'Achetez, vendez et suivez les prix des marchés agricoles' : 'Buy, sell, and track agricultural market prices'}</p>
        </div>
        <div style={{ display:'flex', gap:'0.5rem' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setShowBuyerSetup(true)}>👤 {lang === 'fr' ? 'Profil acheteur' : 'Buyer profile'}</button>
          <button className="btn btn-primary" onClick={() => { setActiveTab('sell'); setShowForm(true); }}>
            + {lang === 'fr' ? 'Publier' : 'Post listing'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="market-tabs">
        {TABS.map(t => (
          <button key={t.key} className={`market-tab ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>
            {lang === 'fr' ? t.fr : t.en}
          </button>
        ))}
      </div>

      {/* ══ TAB: BROWSE ════════════════════════════════════ */}
      {activeTab === 'browse' && (
        <>
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
              <option value="rating">{lang === 'fr' ? 'Mieux noté' : 'Top rated'}</option>
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
                <ListingCard key={l.id} listing={l} lang={lang} categories={CATEGORIES} buyerLoc={buyerLoc}
                  isSaved={savedIds.includes(l.id)} onToggleSave={() => toggleSave(l.id)}
                  onContact={() => openContact(l)}
                  onViewSeller={() => setViewingSeller(l)} />
              ))}
            </div>
          )}
        </>
      )}

      {/* ══ TAB: SELL ════════════════════════════════════════ */}
      {activeTab === 'sell' && (
        <div className="sell-zone">
          {/* Seller profile card */}
          {sellerProfile ? (
            <div className="card seller-profile-card">
              <div className="sp-header">
                <div className="sp-avatar">{(sellerProfile.farmName || 'V').charAt(0).toUpperCase()}</div>
                <div className="sp-info">
                  <h3>{sellerProfile.farmName || (lang === 'fr' ? 'Mon exploitation' : 'My farm')}</h3>
                  {sellerProfile.location && <p className="sp-location">📍 {sellerProfile.location}</p>}
                  {sellerProfile.bio && <p className="sp-bio">{sellerProfile.bio}</p>}
                  <div className="sp-badges">
                    {sellerProfile.certifications?.map(c => <CertBadge key={c} id={c} lang={lang} />)}
                    {sellerProfile.delivery?.includes('delivery') && <span className="cert-badge cert-local">🚚 {lang === 'fr' ? 'Livraison' : 'Delivery'}</span>}
                    {sellerProfile.delivery?.includes('pickup')   && <span className="cert-badge cert-local">📍 {lang === 'fr' ? 'Enlèvement' : 'Pickup'}</span>}
                  </div>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => { setSellerForm(sellerProfile); setShowSellerSetup(true); }}>
                  ✏️ {lang === 'fr' ? 'Modifier' : 'Edit'}
                </button>
              </div>
              {/* Stats */}
              <div className="sp-stats">
                <div className="sp-stat"><span className="sp-stat-val">{myListings.length}</span><span className="sp-stat-lbl">{lang === 'fr' ? 'Annonces' : 'Listings'}</span></div>
                <div className="sp-stat"><span className="sp-stat-val">{myListings.reduce((s,l)=>s+Number(l.quantity_kg),0).toLocaleString()} kg</span><span className="sp-stat-lbl">{lang === 'fr' ? 'Stock total' : 'Total stock'}</span></div>
                <div className="sp-stat"><span className="sp-stat-val">{lang === 'fr' ? `Depuis ${sellerProfile.memberSince}` : `Since ${sellerProfile.memberSince}`}</span><span className="sp-stat-lbl">{lang === 'fr' ? 'Membre' : 'Member'}</span></div>
              </div>
            </div>
          ) : (
            <div className="card seller-setup-prompt">
              <div className="setup-icon">🏪</div>
              <h3>{lang === 'fr' ? 'Créez votre profil vendeur' : 'Create your seller profile'}</h3>
              <p>{lang === 'fr' ? 'Ajoutez le nom de votre exploitation, vos certifications et vos options de livraison pour inspirer confiance aux acheteurs.' : 'Add your farm name, certifications, and delivery options to build buyer trust.'}</p>
              <button className="btn btn-primary" onClick={() => { setSellerForm(DEFAULT_SELLER); setShowSellerSetup(true); }}>
                + {lang === 'fr' ? 'Créer mon profil vendeur' : 'Create seller profile'}
              </button>
            </div>
          )}

          {/* New listing form toggle */}
          <div style={{ display:'flex', justifyContent:'flex-end' }}>
            <button className="btn btn-primary" onClick={() => setShowForm(s => !s)}>
              {showForm ? '✕ ' : '+ '}{lang === 'fr' ? 'Nouvelle annonce' : 'New listing'}
            </button>
          </div>

          {showForm && (
            <div className="card market-form-card">
              <h3>{lang === 'fr' ? 'Publier une annonce' : 'Post a listing'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid-3">
                  <div className="form-group">
                    <label className="form-label">{lang === 'fr' ? 'Produit *' : 'Product *'}</label>
                    <input type="text" className="form-input" required value={form.crop_name} onChange={e => setForm(p => ({ ...p, crop_name: e.target.value }))} placeholder={lang === 'fr' ? 'Ex : Oignons' : 'E.g. Onions'} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{lang === 'fr' ? 'Catégorie' : 'Category'}</label>
                    <select className="form-select" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                      {CATEGORIES.filter(c => c.value !== 'all').map(c => <option key={c.value} value={c.value}>{lang === 'fr' ? c.fr : c.en}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">{lang === 'fr' ? 'Quantité totale (kg) *' : 'Total quantity (kg) *'}</label>
                    <input type="number" className="form-input" required min="1" value={form.quantity_kg} onChange={e => setForm(p => ({ ...p, quantity_kg: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{lang === 'fr' ? 'Prix/kg (FCFA) *' : 'Price/kg *'}</label>
                    <input type="number" className="form-input" required min="0" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{lang === 'fr' ? 'Commande minimum (kg)' : 'Min order (kg)'}</label>
                    <input type="number" className="form-input" min="1" value={form.min_order_kg} onChange={e => setForm(p => ({ ...p, min_order_kg: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{lang === 'fr' ? 'Date de récolte' : 'Harvest date'}</label>
                    <input type="date" className="form-input" value={form.harvest_date} onChange={e => setForm(p => ({ ...p, harvest_date: e.target.value }))} />
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
                      {form.lat && <span className="loc-confirmed"> ✅</span>}
                    </label>
                    <div className="loc-input-row">
                      <input type="text" className="form-input" style={{ flex:1 }} value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value, lat:null, lng:null }))} placeholder={lang === 'fr' ? 'Ville ou secteur' : 'City or area'} />
                      <button type="button" className="btn btn-secondary btn-sm loc-btn" onClick={locateFarm} disabled={formLocLoading}>{formLocLoading ? '…' : '📍'}</button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">{lang === 'fr' ? 'Contact WhatsApp *' : 'WhatsApp *'}</label>
                    <input type="tel" className="form-input" required value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} placeholder="+226 XX XX XX XX" />
                  </div>

                  {/* Delivery options */}
                  <div className="form-group">
                    <label className="form-label">{lang === 'fr' ? 'Mode de remise' : 'Delivery options'}</label>
                    <div className="checkbox-group">
                      {DELIVERY_OPTS.map(d => (
                        <label key={d.id} className="checkbox-item">
                          <input type="radio" name="delivery" value={d.id} checked={form.delivery === d.id} onChange={e => setForm(p => ({ ...p, delivery: e.target.value }))} />
                          {d.icon} {lang === 'fr' ? d.fr : d.en}
                        </label>
                      ))}
                      <label className="checkbox-item">
                        <input type="radio" name="delivery" value="both" checked={form.delivery === 'both'} onChange={e => setForm(p => ({ ...p, delivery: e.target.value }))} />
                        📍🚚 {lang === 'fr' ? 'Les deux' : 'Both'}
                      </label>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="form-group">
                    <label className="form-label">{lang === 'fr' ? 'Certifications' : 'Certifications'}</label>
                    <div className="checkbox-group">
                      {CERT_LIST.filter(c => c.id !== 'verified').map(c => (
                        <label key={c.id} className="checkbox-item">
                          <input type="checkbox" checked={form.certifications.includes(c.id)}
                            onChange={e => setForm(p => ({ ...p, certifications: e.target.checked ? [...p.certifications, c.id] : p.certifications.filter(x => x !== c.id) }))} />
                          {c.icon} {lang === 'fr' ? c.fr : c.en}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group" style={{ gridColumn:'1 / -1' }}>
                    <label className="form-label">{lang === 'fr' ? 'Description' : 'Description'}</label>
                    <textarea className="form-input" rows="2" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder={lang === 'fr' ? 'Qualité, conditions de vente…' : 'Quality, sale terms…'} />
                  </div>
                </div>
                <div style={{ display:'flex', gap:'0.75rem', marginTop:'0.5rem' }}>
                  <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? '…' : lang === 'fr' ? 'Publier' : 'Publish'}</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>{lang === 'fr' ? 'Annuler' : 'Cancel'}</button>
                </div>
              </form>
            </div>
          )}

          {/* My listings */}
          <div className="card" style={{ padding:'1.5rem' }}>
            <h3 style={{ marginBottom:'1rem' }}>📋 {lang === 'fr' ? 'Mes annonces' : 'My listings'} ({myListings.length})</h3>
            {myListings.length === 0 ? (
              <p style={{ color:'var(--gray-mid)', fontSize:'0.9rem' }}>{lang === 'fr' ? 'Aucune annonce publiée.' : 'No listings published yet.'}</p>
            ) : (
              <div className="my-listings-list">
                {myListings.map(l => (
                  <div key={l.id} className="my-listing-row">
                    <div className="my-listing-info">
                      <span className="my-listing-name">{l.crop_name}</span>
                      <span className="my-listing-meta">{Number(l.quantity_kg).toLocaleString()} kg · {Number(l.price).toLocaleString()} {l.currency}/kg · {l.location}</span>
                    </div>
                    <div className="my-listing-actions">
                      <button className="btn btn-secondary btn-sm" onClick={() => openContact(l)}>💬</button>
                      <button className="btn btn-danger btn-sm" onClick={() => setListings(p => p.filter(x => x.id !== l.id))}>🗑</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══ TAB: SAVED ════════════════════════════════════════ */}
      {activeTab === 'saved' && (
        <div>
          {savedListings.length === 0 ? (
            <div className="market-empty card">
              <p>❤️ {lang === 'fr' ? 'Aucune annonce sauvegardée. Cliquez sur ❤️ sur une annonce pour la sauvegarder.' : "No saved listings. Click ❤️ on any listing to save it."}</p>
            </div>
          ) : (
            <>
              <p className="market-count">{savedListings.length} {lang === 'fr' ? 'annonce(s) sauvegardée(s)' : 'saved listing(s)'}</p>
              <div className="listings-grid">
                {savedListings.map(l => {
                  const lWithDist = { ...l, _dist: buyerLoc && l.lat ? haversineKm(buyerLoc.lat, buyerLoc.lng, l.lat, l.lng) : null };
                  return (
                    <ListingCard key={l.id} listing={lWithDist} lang={lang} categories={CATEGORIES} buyerLoc={buyerLoc}
                      isSaved={true} onToggleSave={() => toggleSave(l.id)}
                      onContact={() => openContact(l)}
                      onViewSeller={() => setViewingSeller(l)} />
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {/* ══ TAB: PRICES ══════════════════════════════════════ */}
      {activeTab === 'prices' && (
        <div className="prices-zone">
          <div className="card price-table-card">
            <h3>📊 {lang === 'fr' ? 'Prix régionaux — Semaine en cours' : 'Regional prices — Current week'}</h3>
            <p className="price-table-note">{lang === 'fr' ? 'Prix indicatifs en FCFA/kg sur les principaux marchés du Burkina Faso. Cliquez sur un produit pour voir son évolution.' : 'Indicative prices in FCFA/kg at major Burkina Faso markets. Click a product to see its trend.'}</p>
            <div className="price-table-wrap">
              <table className="price-table">
                <thead>
                  <tr>
                    <th>{lang === 'fr' ? 'Produit' : 'Product'}</th>
                    {CITIES.map(c => <th key={c.key}>{lang === 'fr' ? c.fr : c.en}</th>)}
                    <th>{lang === 'fr' ? 'Prix mondial (USD)' : 'Global (USD)'}</th>
                    <th>{lang === 'fr' ? 'Tendance' : 'Trend'}</th>
                  </tr>
                </thead>
                <tbody>
                  {REGIONAL_PRICES.map(p => (
                    <tr key={p.id} className={`price-row ${selectedPrice.id === p.id ? 'selected' : ''}`} onClick={() => setSelectedPrice(p)}>
                      <td className="price-product"><span>{p.icon}</span>{lang === 'fr' ? p.name_fr : p.name_en}<span className="price-unit">/{p.unit}</span></td>
                      {CITIES.map(c => <td key={c.key} className="price-cell">{p.prices[c.key]?.toLocaleString()}</td>)}
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

          <div className="card price-trend-card">
            <h3>{selectedPrice.icon} {lang === 'fr' ? selectedPrice.name_fr : selectedPrice.name_en} — {lang === 'fr' ? 'Évolution 6 mois (Ouagadougou)' : '6-month trend (Ouagadougou)'}</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trendData} margin={{ top:4, right:8, left:-8, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-light)" />
                <XAxis dataKey="month" tick={{ fontSize:10 }} tickFormatter={v => v.split('/')[0]} />
                <YAxis tick={{ fontSize:10 }} unit=" F" />
                <Tooltip formatter={v => [`${v.toLocaleString()} FCFA`, lang === 'fr' ? 'Prix moyen' : 'Avg. price']} labelFormatter={v => v.split('/')[0]} />
                <Line type="monotone" dataKey="price" stroke="var(--green-mid)" strokeWidth={2} dot={{ r:3 }} activeDot={{ r:5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="price-insights">
            {[
              { label_fr:'🔼 Marché le plus cher', label_en:'🔼 Highest market', fn: (a,b) => selectedPrice.prices[a.key] > selectedPrice.prices[b.key] ? a : b },
              { label_fr:'🔽 Marché le moins cher', label_en:'🔽 Lowest market',  fn: (a,b) => selectedPrice.prices[a.key] < selectedPrice.prices[b.key] ? a : b },
            ].map(insight => {
              const best = CITIES.reduce(insight.fn);
              return (
                <div key={insight.label_fr} className="card price-insight-card">
                  <h4>{lang === 'fr' ? insight.label_fr : insight.label_en}</h4>
                  <p>{lang === 'fr' ? best.fr : best.en} — <strong>{selectedPrice.prices[best.key]?.toLocaleString()} FCFA/{selectedPrice.unit}</strong></p>
                </div>
              );
            })}
            <div className="card price-insight-card">
              <h4>🌍 {lang === 'fr' ? 'Équivalent USD/kg' : 'USD equivalent/kg'}</h4>
              <p><strong>${typeof selectedPrice.global_usd === 'number' ? selectedPrice.global_usd.toFixed(2) : selectedPrice.global_usd}</strong> {lang === 'fr' ? 'marchés mondiaux' : 'global markets'}</p>
            </div>
          </div>
        </div>
      )}

      {/* ══ TAB: ANALYTICS ═══════════════════════════════════ */}
      {activeTab === 'analytics' && (
        <div className="analytics-zone">
          <div className="analytics-note card">
            <p>📡 {lang === 'fr' ? 'Données basées sur les recherches, clics, messages et annonces publiées sur la plateforme.' : 'Data based on searches, clicks, messages, and listings posted on the platform.'}</p>
          </div>
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
                      <span title="Messages">💬 {a.messages}</span>
                    </div>
                    <span className={`analytics-trend ${a.trend.startsWith('+') ? 'up' : a.trend.startsWith('-') ? 'down' : ''}`}>
                      {a.trend.startsWith('+') ? '↑' : a.trend.startsWith('-') ? '↓' : '—'} {a.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3>{lang === 'fr' ? 'Recherches vs Vues vs Messages' : 'Searches vs Views vs Messages'}</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={MARKET_ANALYTICS} margin={{ top:4, right:8, left:-8, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-light)" />
                <XAxis dataKey={lang === 'fr' ? 'product_fr' : 'product_en'} tick={{ fontSize:9 }} />
                <YAxis tick={{ fontSize:10 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize:'0.75rem' }} />
                <Bar dataKey="searches" name={lang === 'fr' ? 'Recherches' : 'Searches'} fill="#52B788" radius={[3,3,0,0]} />
                <Bar dataKey="views"    name={lang === 'fr' ? 'Vues' : 'Views'}            fill="#2D6A4F" radius={[3,3,0,0]} />
                <Bar dataKey="messages" name="Messages"                                    fill="#f4a261" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="analytics-summary">
            {[
              { icon:'📋', val:listings.length,                                                                      lbl_fr:'Annonces actives',      lbl_en:'Active listings'      },
              { icon:'🔍', val:MARKET_ANALYTICS.reduce((s,a)=>s+a.searches,0).toLocaleString(),                      lbl_fr:'Recherches ce mois',    lbl_en:'Searches this month'  },
              { icon:'💬', val:MARKET_ANALYTICS.reduce((s,a)=>s+a.messages,0).toLocaleString(),                      lbl_fr:'Messages envoyés',      lbl_en:'Messages sent'        },
              { icon:'🔥', val:MARKET_ANALYTICS[0][lang === 'fr' ? 'product_fr' : 'product_en'],                     lbl_fr:'Produit vedette',       lbl_en:'Top product'          },
            ].map((s,i) => (
              <div key={i} className="card analytics-sum-card">
                <span className="sum-icon">{s.icon}</span>
                <span className="sum-value">{s.val}</span>
                <span className="sum-label">{lang === 'fr' ? s.lbl_fr : s.lbl_en}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ SELLER PROFILE SHEET ═════════════════════════════ */}
      {viewingSeller && (
        <>
          <div className="market-overlay" onClick={() => setViewingSeller(null)} />
          <div className="seller-sheet card">
            <div className="seller-sheet-header">
              <div className="ss-avatar">{viewingSeller.user_name?.charAt(0)}</div>
              <div className="ss-info">
                <h3>{viewingSeller.user_name}</h3>
                {viewingSeller.location && <p className="ss-location">📍 {viewingSeller.location}</p>}
                <RatingStars rating={viewingSeller.seller_rating} count={viewingSeller.seller_review_count} size="md" />
                {viewingSeller.verified && <span className="verified-badge">✅ {lang === 'fr' ? 'Vendeur vérifié' : 'Verified seller'}</span>}
              </div>
              <button className="contact-modal-close" onClick={() => setViewingSeller(null)}>✕</button>
            </div>

            {viewingSeller.seller_bio && <p className="ss-bio">{viewingSeller.seller_bio}</p>}

            <div className="ss-badges">
              {(viewingSeller.certifications || []).map(c => <CertBadge key={c} id={c} lang={lang} />)}
              {viewingSeller.delivery === 'delivery' && <span className="cert-badge cert-local">🚚 {lang === 'fr' ? 'Livraison' : 'Delivery'}</span>}
              {viewingSeller.delivery === 'both'     && <><span className="cert-badge cert-local">🚚</span><span className="cert-badge cert-local">📍</span></>}
              <span className="cert-badge cert-local">📅 {lang === 'fr' ? `Depuis ${viewingSeller.seller_since}` : `Since ${viewingSeller.seller_since}`}</span>
            </div>

            {/* Their listings */}
            <h4 style={{ margin:'1rem 0 0.75rem' }}>📦 {lang === 'fr' ? 'Annonces de ce vendeur' : "This seller's listings"}</h4>
            <div className="ss-listings">
              {listings.filter(l => l.user_name === viewingSeller.user_name).map(l => (
                <div key={l.id} className="ss-listing-row">
                  <span className="ss-listing-name">{l.crop_name}</span>
                  <span className="ss-listing-price">{Number(l.price).toLocaleString()} {l.currency}/kg</span>
                  <span className="ss-listing-qty">{Number(l.quantity_kg).toLocaleString()} kg</span>
                  <button className="btn btn-primary btn-sm" onClick={() => { openContact(l); setViewingSeller(null); }}>💬</button>
                </div>
              ))}
            </div>

            {/* Reviews */}
            {DEMO_REVIEWS.filter(r => r.seller_id === viewingSeller.user_id).length > 0 && (
              <>
                <h4 style={{ margin:'1rem 0 0.75rem' }}>⭐ {lang === 'fr' ? 'Avis clients' : 'Customer reviews'}</h4>
                <div className="ss-reviews">
                  {DEMO_REVIEWS.filter(r => r.seller_id === viewingSeller.user_id).map((r, i) => (
                    <div key={i} className="review-item">
                      <div className="review-header">
                        <span className="review-author">{r.reviewer}</span>
                        <RatingStars rating={r.rating} size="sm" />
                        <span className="review-date">{new Date(r.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { day:'numeric', month:'short' })}</span>
                      </div>
                      <p className="review-text">{r.text}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            <button className="btn btn-whatsapp" onClick={() => openContact(viewingSeller)} style={{ width:'100%', justifyContent:'center', marginTop:'1rem' }}>
              💬 {lang === 'fr' ? 'Contacter ce vendeur' : 'Contact this seller'}
            </button>
          </div>
        </>
      )}

      {/* ══ CONTACT MODAL ════════════════════════════════════ */}
      {contactListing && (
        <>
          <div className="market-overlay" onClick={() => setContactListing(null)} />
          <div className="contact-modal card">
            <div className="contact-modal-header">
              <div>
                <h3>{lang === 'fr' ? 'Contacter le producteur' : 'Contact producer'}</h3>
                <p style={{ display:'flex', alignItems:'center', gap:'0.35rem', flexWrap:'wrap', color:'var(--gray-mid)', fontSize:'0.85rem' }}>
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
                <a href={`https://wa.me/${contactListing.contact.replace(/\D/g,'') }?text=${encodeURIComponent(msgText)}`} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                  💬 {lang === 'fr' ? 'Envoyer via WhatsApp' : 'Send via WhatsApp'}
                </a>
              )}
              <button className="btn btn-secondary" onClick={() => setContactListing(null)}>{lang === 'fr' ? 'Fermer' : 'Close'}</button>
            </div>
            <p className="contact-modal-note">💡 {lang === 'fr' ? "WhatsApp est le moyen le plus rapide de contacter les producteurs en Afrique de l'Ouest." : 'WhatsApp is the fastest way to reach producers in West Africa.'}</p>
          </div>
        </>
      )}

      {/* ══ SELLER SETUP MODAL ══════════════════════════════ */}
      {showSellerSetup && (
        <>
          <div className="market-overlay" onClick={() => setShowSellerSetup(false)} />
          <div className="profile-modal card">
            <div className="profile-modal-header">
              <h3>🏪 {lang === 'fr' ? 'Profil vendeur' : 'Seller profile'}</h3>
              <button className="contact-modal-close" onClick={() => setShowSellerSetup(false)}>✕</button>
            </div>
            <form onSubmit={saveSellerProfile}>
              <div className="profile-form-grid">
                <div className="form-group">
                  <label className="form-label">{lang === 'fr' ? "Nom de l'exploitation *" : 'Farm name *'}</label>
                  <input type="text" className="form-input" required value={sellerForm.farmName} onChange={e => setSellerForm(p => ({ ...p, farmName: e.target.value }))} placeholder={lang === 'fr' ? 'Ex : Ferme Kaboré' : 'E.g. Kaboré Farm'} />
                </div>
                <div className="form-group">
                  <label className="form-label">{lang === 'fr' ? 'Localisation' : 'Location'}</label>
                  <input type="text" className="form-input" value={sellerForm.location} onChange={e => setSellerForm(p => ({ ...p, location: e.target.value }))} placeholder={lang === 'fr' ? 'Ville, région' : 'City, region'} />
                </div>
                <div className="form-group" style={{ gridColumn:'1/-1' }}>
                  <label className="form-label">{lang === 'fr' ? 'Description de votre exploitation' : 'Farm description'}</label>
                  <textarea className="form-input" rows="3" value={sellerForm.bio} onChange={e => setSellerForm(p => ({ ...p, bio: e.target.value }))} placeholder={lang === 'fr' ? 'Types de cultures, expérience, particularités…' : 'Crop types, experience, specialties…'} />
                </div>
                <div className="form-group">
                  <label className="form-label">{lang === 'fr' ? 'Téléphone / WhatsApp' : 'Phone / WhatsApp'}</label>
                  <input type="tel" className="form-input" value={sellerForm.phone} onChange={e => setSellerForm(p => ({ ...p, phone: e.target.value }))} placeholder="+226 XX XX XX XX" />
                </div>
                <div className="form-group">
                  <label className="form-label">{lang === 'fr' ? 'Certifications' : 'Certifications'}</label>
                  <div className="checkbox-group">
                    {CERT_LIST.filter(c => c.id !== 'verified').map(c => (
                      <label key={c.id} className="checkbox-item">
                        <input type="checkbox" checked={(sellerForm.certifications||[]).includes(c.id)}
                          onChange={e => setSellerForm(p => ({ ...p, certifications: e.target.checked ? [...(p.certifications||[]), c.id] : (p.certifications||[]).filter(x => x !== c.id) }))} />
                        {c.icon} {lang === 'fr' ? c.fr : c.en}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">{lang === 'fr' ? 'Options de livraison' : 'Delivery options'}</label>
                  <div className="checkbox-group">
                    {DELIVERY_OPTS.map(d => (
                      <label key={d.id} className="checkbox-item">
                        <input type="checkbox" checked={(sellerForm.delivery||[]).includes(d.id)}
                          onChange={e => setSellerForm(p => ({ ...p, delivery: e.target.checked ? [...(p.delivery||[]), d.id] : (p.delivery||[]).filter(x => x !== d.id) }))} />
                        {d.icon} {lang === 'fr' ? d.fr : d.en}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display:'flex', gap:'0.75rem', marginTop:'1rem' }}>
                <button type="submit" className="btn btn-primary">{lang === 'fr' ? 'Enregistrer le profil' : 'Save profile'}</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowSellerSetup(false)}>{lang === 'fr' ? 'Annuler' : 'Cancel'}</button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* ══ BUYER SETUP MODAL ════════════════════════════════ */}
      {showBuyerSetup && (
        <>
          <div className="market-overlay" onClick={() => setShowBuyerSetup(false)} />
          <div className="profile-modal card">
            <div className="profile-modal-header">
              <h3>👤 {lang === 'fr' ? 'Profil acheteur' : 'Buyer profile'}</h3>
              <button className="contact-modal-close" onClick={() => setShowBuyerSetup(false)}>✕</button>
            </div>
            {buyerProfile && (
              <div className="buyer-profile-summary">
                <p>👤 <strong>{buyerProfile.name || (lang === 'fr' ? 'Acheteur anonyme' : 'Anonymous buyer')}</strong></p>
                {buyerProfile.location && <p>📍 {buyerProfile.location}</p>}
                {buyerProfile.preferredCategories?.length > 0 && (
                  <p>🛒 {lang === 'fr' ? 'Préférences : ' : 'Preferences: '}{buyerProfile.preferredCategories.map(c => CATEGORIES.find(x => x.value === c)?.[lang] || c).join(', ')}</p>
                )}
              </div>
            )}
            <form onSubmit={saveBuyerProfile}>
              <div className="profile-form-grid">
                <div className="form-group">
                  <label className="form-label">{lang === 'fr' ? 'Votre nom' : 'Your name'}</label>
                  <input type="text" className="form-input" value={buyerForm.name} onChange={e => setBuyerForm(p => ({ ...p, name: e.target.value }))} placeholder={lang === 'fr' ? 'Nom complet' : 'Full name'} />
                </div>
                <div className="form-group">
                  <label className="form-label">{lang === 'fr' ? 'Votre localisation' : 'Your location'}</label>
                  <input type="text" className="form-input" value={buyerForm.location} onChange={e => setBuyerForm(p => ({ ...p, location: e.target.value }))} placeholder={lang === 'fr' ? 'Ville, quartier' : 'City, neighborhood'} />
                </div>
                <div className="form-group" style={{ gridColumn:'1/-1' }}>
                  <label className="form-label">{lang === 'fr' ? 'Catégories préférées' : 'Preferred categories'}</label>
                  <div className="checkbox-group flex-wrap">
                    {CATEGORIES.filter(c => c.value !== 'all').map(c => (
                      <label key={c.value} className="checkbox-item">
                        <input type="checkbox" checked={(buyerForm.preferredCategories||[]).includes(c.value)}
                          onChange={e => setBuyerForm(p => ({ ...p, preferredCategories: e.target.checked ? [...(p.preferredCategories||[]), c.value] : (p.preferredCategories||[]).filter(x => x !== c.value) }))} />
                        {c.icon} {lang === 'fr' ? c.fr : c.en}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display:'flex', gap:'0.75rem', marginTop:'1rem' }}>
                <button type="submit" className="btn btn-primary">{lang === 'fr' ? 'Enregistrer' : 'Save'}</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowBuyerSetup(false)}>{lang === 'fr' ? 'Annuler' : 'Cancel'}</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Listing Card ────────────────────────────────────────── */
function ListingCard({ listing, lang, categories, buyerLoc, isSaved, onToggleSave, onContact, onViewSeller }) {
  const [expanded, setExpanded] = useState(false);
  const cat  = categories.find(c => c.value === listing.category);
  const dist = listing._dist;

  return (
    <div className="listing-card card">
      <div className="listing-card-top">
        <span className="listing-cat-badge">{cat?.icon || '📦'} {lang === 'fr' ? cat?.fr : cat?.en}</span>
        <div style={{ display:'flex', gap:'0.4rem', alignItems:'center' }}>
          {buyerLoc && (
            <span className={`dist-badge ${dist != null ? distColor(dist) : 'dist-unknown'}`}>
              {dist != null ? `📍 ${fmtDist(dist)}` : '📍 ?'}
            </span>
          )}
          <button className={`save-btn ${isSaved ? 'saved' : ''}`} onClick={onToggleSave} title={isSaved ? (lang === 'fr' ? 'Retirer' : 'Unsave') : (lang === 'fr' ? 'Sauvegarder' : 'Save')}>
            {isSaved ? '❤️' : '🤍'}
          </button>
        </div>
      </div>

      <div className="listing-header">
        <h3 className="listing-name">{listing.crop_name}</h3>
        <span className="listing-price">{Number(listing.price).toLocaleString()} {listing.currency}/kg</span>
      </div>

      <div className="listing-stats">
        <span className="listing-stat">⚖️ {Number(listing.quantity_kg).toLocaleString()} kg</span>
        <span className="listing-stat listing-total">💰 {(Number(listing.price) * Number(listing.quantity_kg)).toLocaleString()} {listing.currency}</span>
      </div>

      {/* Extra details */}
      <div className="listing-details">
        {listing.min_order_kg && (
          <span className="listing-detail-badge">📦 min {listing.min_order_kg} kg</span>
        )}
        {listing.delivery && (
          <span className="listing-detail-badge">
            {listing.delivery === 'pickup' ? '📍' : listing.delivery === 'delivery' ? '🚚' : '📍🚚'}
            {' '}{listing.delivery === 'pickup' ? (lang === 'fr' ? 'Sur place' : 'Pickup') : listing.delivery === 'delivery' ? (lang === 'fr' ? 'Livraison' : 'Delivery') : (lang === 'fr' ? 'Sur place / Livraison' : 'Pickup / Delivery')}
          </span>
        )}
        {listing.harvest_date && (
          <span className="listing-detail-badge">🗓 {new Date(listing.harvest_date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { day:'numeric', month:'short' })}</span>
        )}
      </div>

      {/* Certifications */}
      {listing.certifications?.length > 0 && (
        <div className="listing-certs">
          {listing.certifications.map(c => <CertBadge key={c} id={c} lang={lang} />)}
        </div>
      )}

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
        <button className="listing-seller" onClick={onViewSeller}>
          <div className="seller-avatar">{listing.user_name?.charAt(0) || 'V'}</div>
          <div>
            <span className="seller-name">{listing.user_name}{listing.verified && ' ✅'}</span>
            <RatingStars rating={listing.seller_rating} count={listing.seller_review_count} size="xs" />
          </div>
        </button>
        <button className="btn btn-primary btn-sm" onClick={onContact}>💬 {lang === 'fr' ? 'Contacter' : 'Contact'}</button>
      </div>
    </div>
  );
}

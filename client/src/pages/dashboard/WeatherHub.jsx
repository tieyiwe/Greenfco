import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './WeatherHub.css';

/* ─── Preloaded city list ────────────────────────────────── */
const PRESET_CITIES = [
  // Burkina Faso
  { name:'Ouagadougou',   country:'BF', lat:12.3647,  lng:-1.5337  },
  { name:'Bobo-Dioulasso',country:'BF', lat:11.1771,  lng:-4.2979  },
  { name:'Koudougou',     country:'BF', lat:12.2487,  lng:-2.3622  },
  { name:"Fada N'Gourma", country:'BF', lat:12.0603,  lng:0.3464   },
  { name:'Dédougou',      country:'BF', lat:12.4625,  lng:-3.4665  },
  { name:'Dori',          country:'BF', lat:14.0329,  lng:-0.0356  },
  { name:'Ouahigouya',    country:'BF', lat:13.5782,  lng:-2.4215  },
  { name:'Banfora',       country:'BF', lat:10.6333,  lng:-4.7500  },
  { name:'Tenkodogo',     country:'BF', lat:11.7833,  lng:-0.3667  },
  // West Africa
  { name:'Abidjan',       country:'CI', lat:5.3600,   lng:-4.0083  },
  { name:'Accra',         country:'GH', lat:5.5500,   lng:-0.2167  },
  { name:'Bamako',        country:'ML', lat:12.6500,  lng:-8.0000  },
  { name:'Conakry',       country:'GN', lat:9.5370,   lng:-13.6773 },
  { name:'Cotonou',       country:'BJ', lat:6.3654,   lng:2.4183   },
  { name:'Dakar',         country:'SN', lat:14.7167,  lng:-17.4677 },
  { name:'Lomé',          country:'TG', lat:6.1375,   lng:1.2123   },
  { name:'Niamey',        country:'NE', lat:13.5137,  lng:2.1098   },
  { name:'Nouakchott',    country:'MR', lat:18.0858,  lng:-15.9785 },
  { name:'Ouagadougou',   country:'BF', lat:12.3647,  lng:-1.5337  },
  { name:'Porto-Novo',    country:'BJ', lat:6.4969,   lng:2.6289   },
  { name:'Yamoussoukro',  country:'CI', lat:6.8276,   lng:-5.2893  },
  { name:'Kumasi',        country:'GH', lat:6.6885,   lng:-1.6244  },
  { name:'Tamale',        country:'GH', lat:9.4008,   lng:-0.8393  },
  { name:'Kankan',        country:'GN', lat:10.3833,  lng:-9.3000  },
  { name:'Sikasso',       country:'ML', lat:11.3167,  lng:-5.6667  },
  { name:'Ségou',         country:'ML', lat:13.4500,  lng:-6.2667  },
  { name:'Kayes',         country:'ML', lat:14.4500,  lng:-11.4333 },
  { name:'Zinder',        country:'NE', lat:13.8077,  lng:8.9881   },
  { name:'Maradi',        country:'NE', lat:13.5000,  lng:7.1000   },
  { name:'Parakou',       country:'BJ', lat:9.3500,   lng:2.6333   },
  { name:'Kara',          country:'TG', lat:9.5511,   lng:1.1833   },
  { name:'Saint-Louis',   country:'SN', lat:16.0167,  lng:-16.5000 },
  { name:'Thiès',         country:'SN', lat:14.7833,  lng:-16.9167 },
  { name:'Ziguinchor',    country:'SN', lat:12.5833,  lng:-16.2667 },
  { name:'Agadez',        country:'NE', lat:16.9742,  lng:7.9989   },
  { name:'Tahoua',        country:'NE', lat:14.8889,  lng:5.2675   },
  // Central/East/Southern Africa
  { name:'Nairobi',       country:'KE', lat:-1.2921,  lng:36.8219  },
  { name:'Lagos',         country:'NG', lat:6.5244,   lng:3.3792   },
  { name:'Abuja',         country:'NG', lat:9.0579,   lng:7.4951   },
  { name:'Kano',          country:'NG', lat:12.0000,  lng:8.5167   },
  { name:'Douala',        country:'CM', lat:4.0612,   lng:9.7761   },
  { name:'Yaoundé',       country:'CM', lat:3.8480,   lng:11.5021  },
  { name:'Kinshasa',      country:'CD', lat:-4.3276,  lng:15.3136  },
  { name:'Addis-Abeba',   country:'ET', lat:9.0250,   lng:38.7469  },
  { name:'Dar es Salaam', country:'TZ', lat:-6.7924,  lng:39.2083  },
  { name:'Johannesburg',  country:'ZA', lat:-26.2041, lng:28.0473  },
  { name:'Casablanca',    country:'MA', lat:33.5731,  lng:-7.5898  },
  { name:'Alger',         country:'DZ', lat:36.7372,  lng:3.0865   },
  { name:'Tunis',         country:'TN', lat:36.8190,  lng:10.1658  },
  { name:'Le Caire',      country:'EG', lat:30.0444,  lng:31.2357  },
  { name:'Kampala',       country:'UG', lat:0.3476,   lng:32.5825  },
  { name:'Lusaka',        country:'ZM', lat:-15.4167, lng:28.2833  },
  { name:'Harare',        country:'ZW', lat:-17.8292, lng:31.0522  },
  { name:'Antananarivo',  country:'MG', lat:-18.9137, lng:47.5361  },
  // World
  { name:'Paris',         country:'FR', lat:48.8534,  lng:2.3488   },
  { name:'London',        country:'GB', lat:51.5074,  lng:-0.1278  },
  { name:'Berlin',        country:'DE', lat:52.5200,  lng:13.4050  },
  { name:'Madrid',        country:'ES', lat:40.4168,  lng:-3.7038  },
  { name:'Rome',          country:'IT', lat:41.8919,  lng:12.5113  },
  { name:'Bruxelles',     country:'BE', lat:50.8503,  lng:4.3517   },
  { name:'Amsterdam',     country:'NL', lat:52.3676,  lng:4.9041   },
  { name:'New York',      country:'US', lat:40.7128,  lng:-74.0060 },
  { name:'Washington',    country:'US', lat:38.9072,  lng:-77.0369 },
  { name:'Los Angeles',   country:'US', lat:34.0522,  lng:-118.2437},
  { name:'Toronto',       country:'CA', lat:43.6532,  lng:-79.3832 },
  { name:'Montréal',      country:'CA', lat:45.5017,  lng:-73.5673 },
  { name:'São Paulo',     country:'BR', lat:-23.5505, lng:-46.6333 },
  { name:'Buenos Aires',  country:'AR', lat:-34.6037, lng:-58.3816 },
  { name:'Mexico City',   country:'MX', lat:19.4326,  lng:-99.1332 },
  { name:'Beijing',       country:'CN', lat:39.9042,  lng:116.4074 },
  { name:'Shanghai',      country:'CN', lat:31.2304,  lng:121.4737 },
  { name:'Tokyo',         country:'JP', lat:35.6762,  lng:139.6503 },
  { name:'Mumbai',        country:'IN', lat:19.0760,  lng:72.8777  },
  { name:'Dubai',         country:'AE', lat:25.2048,  lng:55.2708  },
  { name:'Riyadh',        country:'SA', lat:24.6877,  lng:46.7219  },
  { name:'Istanbul',      country:'TR', lat:41.0082,  lng:28.9784  },
  { name:'Moscou',        country:'RU', lat:55.7558,  lng:37.6176  },
  { name:'Sydney',        country:'AU', lat:-33.8688, lng:151.2093 },
];

/* ─── WMO code table ─────────────────────────────────────── */
const WMO = {
  0:  { fr: 'Ciel dégagé',           en: 'Clear sky',         icon: '☀️' },
  1:  { fr: 'Principalement dégagé', en: 'Mainly clear',      icon: '🌤️' },
  2:  { fr: 'Partiellement nuageux', en: 'Partly cloudy',     icon: '⛅' },
  3:  { fr: 'Couvert',               en: 'Overcast',           icon: '☁️' },
  45: { fr: 'Brouillard',            en: 'Fog',                icon: '🌫️' },
  48: { fr: 'Brouillard givrant',    en: 'Icy fog',            icon: '🌫️' },
  51: { fr: 'Bruine légère',         en: 'Light drizzle',      icon: '🌦️' },
  61: { fr: 'Pluie légère',          en: 'Slight rain',        icon: '🌧️' },
  63: { fr: 'Pluie modérée',         en: 'Moderate rain',      icon: '🌧️' },
  65: { fr: 'Pluie forte',           en: 'Heavy rain',         icon: '🌧️' },
  80: { fr: 'Averses légères',       en: 'Light showers',      icon: '🌦️' },
  81: { fr: 'Averses modérées',      en: 'Moderate showers',   icon: '🌦️' },
  95: { fr: 'Orage',                 en: 'Thunderstorm',       icon: '⛈️' },
  96: { fr: 'Orage + grêle',         en: 'Storm + hail',       icon: '⛈️' },
};
function wmo(code) { return WMO[code] || { fr: 'Variable', en: 'Variable', icon: '🌡️' }; }

/* ─── Crops ──────────────────────────────────────────────── */
const CROPS = [
  { value: 'mais',    fr: 'Maïs',    en: 'Maize',    icon: '🌽', tempMin: 18, tempMax: 35, rainMin: 4,
    fr_note: 'Sensible au stress hydrique et à la verse par vent fort.',
    en_note: 'Sensitive to water stress and wind lodging.' },
  { value: 'sorgho',  fr: 'Sorgho',  en: 'Sorghum',  icon: '🌾', tempMin: 20, tempMax: 38, rainMin: 3,
    fr_note: 'Très résistant à la sécheresse. Surveiller les pucerons après pluie.',
    en_note: 'Very drought-tolerant. Monitor aphids after rain.' },
  { value: 'mil',     fr: 'Mil',     en: 'Millet',   icon: '🌾', tempMin: 20, tempMax: 40, rainMin: 2,
    fr_note: 'Culture de mil adaptée aux zones semi-arides.',
    en_note: 'Adapted to semi-arid conditions.' },
  { value: 'niebe',   fr: 'Niébé',   en: 'Cowpea',   icon: '🫘', tempMin: 20, tempMax: 35, rainMin: 3,
    fr_note: 'Risque de moisissures si humidité > 80% prolongée.',
    en_note: 'Mold risk when humidity > 80% for extended periods.' },
  { value: 'oignon',  fr: 'Oignon',  en: 'Onion',    icon: '🧅', tempMin: 15, tempMax: 30, rainMin: 2,
    fr_note: 'Sensible aux maladies fongiques (mildiou). Éviter excès d\'humidité.',
    en_note: 'Susceptible to fungal disease (downy mildew). Avoid excess moisture.' },
  { value: 'tomate',  fr: 'Tomate',  en: 'Tomato',   icon: '🍅', tempMin: 18, tempMax: 32, rainMin: 5,
    fr_note: 'Risque élevé de mildiou si humidité > 75% + chaleur.',
    en_note: 'High blight risk when humidity > 75% + warm temps.' },
  { value: 'sesame',  fr: 'Sésame',  en: 'Sesame',   icon: '🌿', tempMin: 22, tempMax: 38, rainMin: 2,
    fr_note: 'Culture robuste. Éviter les sols gorgés d\'eau.',
    en_note: 'Robust crop. Avoid waterlogged soils.' },
  { value: 'moringa', fr: 'Moringa', en: 'Moringa',  icon: '🌱', tempMin: 20, tempMax: 40, rainMin: 1,
    fr_note: 'Très résistant à la chaleur et à la sécheresse.',
    en_note: 'Very heat and drought resistant.' },
];

const FARM_TYPES = [
  { value: 'maraichage',    fr: 'Maraîchage',        en: 'Market Gardening', icon: '🥬' },
  { value: 'cereales',      fr: 'Céréales',           en: 'Cereal Crops',    icon: '🌾' },
  { value: 'mixte',         fr: 'Mixte',              en: 'Mixed Farm',      icon: '🌱' },
  { value: 'elevage',       fr: 'Élevage',            en: 'Livestock',       icon: '🐄' },
  { value: 'agroforesterie',fr: 'Agroforesterie',     en: 'Agroforestry',    icon: '🌳' },
  { value: 'transformation',fr: 'Transformation',     en: 'Agri-Processing', icon: '🏭' },
];

/* ─── Seasonal context (West Africa Sahel) ───────────────── */
function getSeason(month) {
  if (month >= 11 || month <= 1) return {
    fr: 'Grande saison sèche', en: 'Dry Season',
    fr_tip: 'Préparez vos outils. Entreposez la récolte. Planifiez la prochaine saison.',
    en_tip: 'Prepare tools. Store harvest. Plan next season.', color: '#f59e0b',
  };
  if (month >= 2 && month <= 3) return {
    fr: 'Préchaleur — Préparation', en: 'Pre-season Preparation',
    fr_tip: 'Défrichez et labourez vos parcelles. Commandez vos semences et intrants à temps.',
    en_tip: 'Clear and till your plots. Order seeds and inputs early.', color: '#d97706',
  };
  if (month >= 4 && month <= 5) return {
    fr: 'Début saison des pluies', en: 'Start of Rainy Season',
    fr_tip: 'Les premières pluies arrivent — soyez prêts à semer dès 20mm cumulés.',
    en_tip: 'First rains arriving — be ready to plant once 20mm accumulated.', color: '#52B788',
  };
  if (month >= 6 && month <= 9) return {
    fr: "Hivernage — Pleine saison", en: 'Peak Growing Season',
    fr_tip: 'Pleine saison culturale. Surveiller maladies, ravageurs et drainage.',
    en_tip: 'Full growing season. Monitor diseases, pests, and drainage.', color: '#1B4332',
  };
  return {
    fr: 'Fin hivernage — Post-récolte', en: 'Post-Harvest Season',
    fr_tip: 'Récoltez et stockez correctement. Préparez les parcelles pour la prochaine saison.',
    en_tip: 'Harvest and store well. Prepare plots for the next season.', color: '#8B5E3C',
  };
}

/* ─── Agricultural calculators ──────────────────────────── */
function calcIrrigationNeed(et0, rain) {
  const net = (et0 || 0) - (rain || 0);
  if (net <= 0) return { level: 'none', mm: 0 };
  if (net < 3)  return { level: 'low', mm: Math.round(net) };
  if (net < 7)  return { level: 'medium', mm: Math.round(net) };
  return { level: 'high', mm: Math.round(net) };
}

function calcDiseaseRisk(humMax, tempMax, farmType, crops) {
  if (!humMax || !tempMax) return 'unknown';
  // Vegetables and wet crops have higher disease sensitivity
  const sensitive = farmType === 'maraichage'
    || crops.includes('tomate') || crops.includes('oignon') || crops.includes('niebe');
  const threshold = sensitive ? 70 : 80;
  if (humMax >= threshold + 10 && tempMax >= 18 && tempMax <= 34) return 'high';
  if (humMax >= threshold && tempMax >= 16) return 'medium';
  return 'low';
}

function calcSprayWindow(wind, rain) {
  if (rain > 2 || wind > 20) return 'poor';
  if (wind > 15) return 'caution';
  return 'good';
}

function calcWorkQuality(code, tempMax, wind) {
  if (code >= 95 || wind > 30) return 'poor';
  if (tempMax > 40 || code >= 61) return 'poor';
  if (tempMax > 36 || code >= 51) return 'caution';
  return 'good';
}

function dayActivity(code, rain, tempMax, wind) {
  if (code >= 95) return { type: 'storm', icon: '⛈️' };
  if (rain > 15)  return { type: 'rain',  icon: '🌧️' };
  if (tempMax > 38) return { type: 'heat', icon: '🌡️' };
  if (rain >= 5 && rain <= 15) return { type: 'plant', icon: '🌱' };
  if (wind < 15 && rain === 0) return { type: 'spray', icon: '💧' };
  return { type: 'work', icon: '✅' };
}

/* ─── Crop-specific advisory ─────────────────────────────── */
function getCropTips(selectedCrops, forecast, lang) {
  if (!selectedCrops.length || !forecast?.daily) return null;
  const tips = [];
  const rain = forecast.daily.precipitation_sum?.[0] || 0;
  const tempMax = forecast.daily.temperature_2m_max?.[0] || 0;
  const code = forecast.daily.weathercode?.[0] || 0;
  const hum = forecast.daily.relative_humidity_2m_max?.[0] || 0;

  selectedCrops.forEach(cropVal => {
    const p = CROPS.find(c => c.value === cropVal);
    if (!p) return;
    if (tempMax > p.tempMax) {
      tips.push(lang === 'fr'
        ? `🌡️ ${p.fr} : stress thermique (${Math.round(tempMax)}°C). Arrosez tôt.`
        : `🌡️ ${p.en}: heat stress (${Math.round(tempMax)}°C). Water early.`);
    } else if (code >= 95) {
      tips.push(lang === 'fr'
        ? `⛈️ ${p.fr} : inspectez vos plants après l'orage.`
        : `⛈️ ${p.en}: inspect plants after the storm.`);
    } else if (hum >= 75 && (p.value === 'tomate' || p.value === 'oignon' || p.value === 'niebe')) {
      tips.push(lang === 'fr'
        ? `🍄 ${p.fr} : risque fongique élevé (humidité ${Math.round(hum)}%). Traitez préventivement.`
        : `🍄 ${p.en}: high fungal risk (humidity ${Math.round(hum)}%). Apply preventive treatment.`);
    } else if (rain >= p.rainMin && rain < 15) {
      tips.push(lang === 'fr'
        ? `🌧️ ${p.fr} : pluies favorables. Bon moment pour semer ou repiquer.`
        : `🌧️ ${p.en}: favorable rain. Good time to sow or transplant.`);
    }
  });
  return tips.length ? tips : null;
}

/* ─── In-memory weather cache (module-level, persists across renders) ── */
const weatherCache = new Map(); // `${lat},${lon}` → { forecast, historical, timestamp }
const geocodeCache = new Map(); // city name → geocode result
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

/* ─── Main component ──────────────────────────────────────── */
export default function WeatherHub() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  // Farm profile — persisted in localStorage
  const [farmProfile, setFarmProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('greenfco_farm_profile');
      return saved ? JSON.parse(saved) : { crops: [], farmType: '', locationName: '' };
    } catch { return { crops: [], farmType: '', locationName: '' }; }
  });

  const [cityInput, setCityInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const citySearchRef = useRef(null);
  const [forecast, setForecast] = useState(null);
  const [historical, setHistorical] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locating, setLocating] = useState(true);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState('');
  const [showProfileEditor, setShowProfileEditor] = useState(false);

  function saveFarmProfile(patch) {
    const updated = { ...farmProfile, ...patch };
    setFarmProfile(updated);
    try { localStorage.setItem('greenfco_farm_profile', JSON.stringify(updated)); } catch {}
  }

  function toggleCrop(val) {
    const crops = farmProfile.crops.includes(val)
      ? farmProfile.crops.filter(c => c !== val)
      : [...farmProfile.crops, val];
    saveFarmProfile({ crops });
  }

  /* ── Data fetching ─────────────────────────────────────── */
  async function fetchWeather(lat, lon, name = '') {
    setLoading(true);
    setError(null);
    if (name) {
      setCityName(name);
      saveFarmProfile({ locationName: name });
    }

    // Check cache first
    const cacheKey = `${lat.toFixed(4)},${lon.toFixed(4)}`;
    const cached = weatherCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setForecast(cached.forecast);
      setHistorical(cached.historical);
      setLoading(false);
      return;
    }

    try {
      const daily = [
        'temperature_2m_max', 'temperature_2m_min',
        'precipitation_sum', 'precipitation_hours',
        'windspeed_10m_max', 'windgusts_10m_max',
        'weathercode',
        'relative_humidity_2m_max', 'relative_humidity_2m_min',
        'uv_index_max',
        'et0_fao_evapotranspiration',
      ].join(',');

      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 29);
      const fmt = d => d.toISOString().slice(0, 10);

      const [fRes, hRes] = await Promise.all([
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=${daily}&timezone=auto&forecast_days=10`),
        fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${fmt(start)}&end_date=${fmt(end)}&daily=precipitation_sum&timezone=auto`),
      ]);
      const forecastData  = await fRes.json();
      const historicalData = await hRes.json();
      setForecast(forecastData);
      setHistorical(historicalData);
      // Store in cache
      weatherCache.set(cacheKey, { forecast: forecastData, historical: historicalData, timestamp: Date.now() });
    } catch {
      setError(lang === 'fr' ? 'Impossible de charger la météo.' : 'Unable to load weather data.');
    } finally {
      setLoading(false);
    }
  }

  /* ── Auto-geolocate on mount ─────────────────────────────── */
  useEffect(() => {
    setLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setLocating(false);
          fetchWeather(
            pos.coords.latitude,
            pos.coords.longitude,
            lang === 'fr' ? 'Votre position' : 'Your location',
          );
        },
        () => {
          setLocating(false);
          // GPS denied → use saved location name or default Ouagadougou
          fetchWeather(12.3647, -1.5337, farmProfile.locationName || 'Ouagadougou');
        },
        { timeout: 6000, maximumAge: 300000 },
      );
    } else {
      setLocating(false);
      fetchWeather(12.3647, -1.5337, farmProfile.locationName || 'Ouagadougou');
    }
  }, []);

  /* ── City search — preset filter + API fallback ─────────── */
  function handleCityInput(val) {
    setCityInput(val);
    if (!val.trim()) { setSuggestions([]); setShowSuggestions(false); return; }
    const q = val.toLowerCase();
    const local = PRESET_CITIES.filter(c => c.name.toLowerCase().includes(q)).slice(0, 8);
    setSuggestions(local);
    setShowSuggestions(true);
    // Debounce API call for cities not found locally
    clearTimeout(citySearchRef.current);
    if (local.length < 3) {
      citySearchRef.current = setTimeout(async () => {
        try {
          const gcKey = val.toLowerCase();
          let data = geocodeCache.get(gcKey);
          if (!data) {
            const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(val)}&count=6&language=${lang}&format=json`);
            data = await res.json();
            geocodeCache.set(gcKey, data);
          }
          if (data.results?.length) {
            const apiResults = data.results.map(r => ({ name: r.name, country: r.country_code, lat: r.latitude, lng: r.longitude }));
            // merge: presets first, then API results not already in presets
            const merged = [...local, ...apiResults.filter(a => !local.find(l => l.name === a.name))].slice(0, 8);
            setSuggestions(merged);
          }
        } catch { /* silent */ }
      }, 400);
    }
  }

  function selectCity(city) {
    fetchWeather(city.lat, city.lng, city.name);
    setCityInput('');
    setSuggestions([]);
    setShowSuggestions(false);
  }

  async function searchCity(e) {
    e.preventDefault();
    if (suggestions.length > 0) { selectCity(suggestions[0]); return; }
    if (!cityInput.trim()) return;
    setLoading(true);
    try {
      const gcKey = cityInput.toLowerCase();
      let data = geocodeCache.get(gcKey);
      if (!data) {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityInput)}&count=1&language=${lang}&format=json`);
        data = await res.json();
        geocodeCache.set(gcKey, data);
      }
      if (data.results?.length) {
        const { latitude, longitude, name } = data.results[0];
        fetchWeather(latitude, longitude, name);
        setCityInput('');
        setSuggestions([]);
        setShowSuggestions(false);
      } else {
        setError(lang === 'fr' ? 'Ville introuvable.' : 'City not found.');
        setLoading(false);
      }
    } catch {
      setError(lang === 'fr' ? 'Erreur de recherche.' : 'Search error.');
      setLoading(false);
    }
  }

  /* ── Derived values ──────────────────────────────────────── */
  const d = forecast?.daily;
  const season = getSeason(new Date().getMonth());
  const cropTips = getCropTips(farmProfile.crops, forecast, lang);

  const irrToday = calcIrrigationNeed(d?.et0_fao_evapotranspiration?.[0], d?.precipitation_sum?.[0]);
  const diseaseRisk = calcDiseaseRisk(d?.relative_humidity_2m_max?.[0], d?.temperature_2m_max?.[0], farmProfile.farmType, farmProfile.crops);
  const sprayWindow = calcSprayWindow(d?.windspeed_10m_max?.[0], d?.precipitation_sum?.[0]);
  const workQuality = calcWorkQuality(d?.weathercode?.[0], d?.temperature_2m_max?.[0], d?.windspeed_10m_max?.[0]);

  const condLabel = {
    good:    { fr: 'Favorable',       en: 'Favorable',     cls: 'cond-good' },
    caution: { fr: 'Avec précaution', en: 'With caution',  cls: 'cond-caution' },
    poor:    { fr: 'Défavorable',     en: 'Unfavorable',   cls: 'cond-poor' },
    low:     { fr: 'Faible',          en: 'Low',           cls: 'cond-good' },
    medium:  { fr: 'Modéré',          en: 'Moderate',      cls: 'cond-caution' },
    high:    { fr: 'Élevé',           en: 'High',          cls: 'cond-poor' },
    none:    { fr: 'Non requise',     en: 'Not needed',    cls: 'cond-good' },
    unknown: { fr: '—',               en: '—',             cls: 'cond-neutral' },
  };

  const histData = historical?.daily?.time?.map((date, i) => ({
    date: date.slice(5),
    rain: historical.daily.precipitation_sum?.[i] ?? 0,
  })) || [];

  const ACT_LABELS = {
    storm: { fr: 'Orage',     en: 'Storm',      cls: 'act-storm' },
    rain:  { fr: 'Pluie',     en: 'Rain',       cls: 'act-rain' },
    heat:  { fr: 'Chaleur',   en: 'Heat',       cls: 'act-heat' },
    plant: { fr: 'Semer',     en: 'Plant',      cls: 'act-plant' },
    spray: { fr: 'Pulvériser',en: 'Spray',      cls: 'act-spray' },
    work:  { fr: 'Travaux',   en: 'Fieldwork',  cls: 'act-work' },
  };

  return (
    <div className="weather-hub">
      {/* Header */}
      <div className="weather-header">
        <div>
          <h1>{lang === 'fr' ? 'Météo Agricole' : 'Agricultural Weather'}</h1>
          <p>
            {locating
              ? (lang === 'fr' ? '🔍 Localisation en cours…' : '🔍 Detecting location…')
              : cityName ? `📍 ${cityName}` : ''}
          </p>
        </div>
        <div className="weather-controls">
          <div className="city-search-wrap">
            <form onSubmit={searchCity} className="city-search">
              <input
                className="form-input"
                placeholder={lang === 'fr' ? 'Rechercher une ville…' : 'Search a city…'}
                value={cityInput}
                onChange={e => handleCityInput(e.target.value)}
                onFocus={() => cityInput && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                autoComplete="off"
              />
              <button type="submit" className="btn btn-primary btn-sm">→</button>
            </form>
            {showSuggestions && suggestions.length > 0 && (
              <ul className="city-suggestions">
                {suggestions.map((c, i) => (
                  <li key={i}>
                    <button type="button" onMouseDown={() => selectCity(c)}>
                      <span className="city-sug-name">{c.name}</span>
                      <span className="city-sug-country">{c.country}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            className={`btn btn-secondary btn-sm ${showProfileEditor ? 'active-btn' : ''}`}
            onClick={() => setShowProfileEditor(p => !p)}
          >
            🌾 {lang === 'fr' ? 'Mon exploitation' : 'My farm'}
          </button>
        </div>
      </div>

      {/* Quick city chips */}
      <div className="city-chips">
        {['Ouagadougou','Bobo-Dioulasso','Abidjan','Dakar','Bamako','Accra','Niamey','Lagos','Nairobi','Paris'].map(name => {
          const c = PRESET_CITIES.find(p => p.name === name);
          return c ? (
            <button key={name} className={`city-chip ${cityName === name ? 'active' : ''}`} onClick={() => selectCity(c)}>
              {name}
            </button>
          ) : null;
        })}
      </div>

      {/* Farm Profile Editor */}
      {showProfileEditor && (
        <div className="farm-profile-card card">
          <div className="farm-profile-header">
            <h3>🌾 {lang === 'fr' ? 'Mon Exploitation Agricole' : 'My Farm Profile'}</h3>
            <button className="profile-close-btn" onClick={() => setShowProfileEditor(false)}>✕</button>
          </div>
          <p className="farm-profile-intro">
            {lang === 'fr'
              ? 'Personnalisez les recommandations météo en précisant votre exploitation.'
              : 'Customize weather recommendations by describing your farm.'}
          </p>

          <div className="form-group">
            <label className="form-label">{lang === 'fr' ? "Type d'exploitation" : 'Farm type'}</label>
            <div className="profile-chips">
              {FARM_TYPES.map(ft => (
                <button
                  key={ft.value}
                  type="button"
                  className={`profile-chip ${farmProfile.farmType === ft.value ? 'selected' : ''}`}
                  onClick={() => saveFarmProfile({ farmType: ft.value })}
                >
                  {ft.icon} {lang === 'fr' ? ft.fr : ft.en}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">
              {lang === 'fr' ? 'Mes cultures (sélection multiple)' : 'My crops (multiple selection)'}
            </label>
            <div className="profile-chips">
              {CROPS.map(c => (
                <button
                  key={c.value}
                  type="button"
                  className={`profile-chip ${farmProfile.crops.includes(c.value) ? 'selected' : ''}`}
                  onClick={() => toggleCrop(c.value)}
                >
                  {c.icon} {lang === 'fr' ? c.fr : c.en}
                </button>
              ))}
            </div>
          </div>

          {farmProfile.crops.length > 0 && (
            <div className="crop-notes">
              {farmProfile.crops.map(val => {
                const c = CROPS.find(cr => cr.value === val);
                return c ? (
                  <div key={val} className="crop-note-item">
                    <span>{c.icon} <strong>{lang === 'fr' ? c.fr : c.en}</strong></span>
                    <span>{lang === 'fr' ? c.fr_note : c.en_note}</span>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>
      )}

      {/* Seasonal banner */}
      <div className="season-banner" style={{ '--season-color': season.color }}>
        <span className="season-icon">🗓️</span>
        <div>
          <strong>{lang === 'fr' ? season.fr : season.en}</strong>
          <p>{lang === 'fr' ? season.fr_tip : season.en_tip}</p>
        </div>
      </div>

      {error && <div className="weather-error">{error}</div>}

      {(loading || locating) && (
        <div className="weather-loading">
          <div className="skeleton" style={{ height: '200px', borderRadius: 'var(--radius-lg)' }} />
          <div className="skeleton" style={{ height: '110px', marginTop: '0.5rem', borderRadius: 'var(--radius-md)' }} />
        </div>
      )}

      {!loading && !locating && forecast && (
        <>
          {/* Today Card */}
          <div className="today-card">
            <div className="today-main">
              <div className="today-icon">{wmo(d?.weathercode?.[0]).icon}</div>
              <div className="today-temp">
                <span className="temp-max">{Math.round(d?.temperature_2m_max?.[0] || 0)}°C</span>
                <span className="temp-min">{Math.round(d?.temperature_2m_min?.[0] || 0)}°C</span>
              </div>
              <div className="today-desc">
                <h3>{lang === 'fr' ? wmo(d?.weathercode?.[0]).fr : wmo(d?.weathercode?.[0]).en}</h3>
                <p>
                  🌧️ {d?.precipitation_sum?.[0] || 0}mm &nbsp;
                  💨 {Math.round(d?.windspeed_10m_max?.[0] || 0)} km/h &nbsp;
                  💧 {Math.round(d?.relative_humidity_2m_max?.[0] || 0)}%
                </p>
                {d?.uv_index_max?.[0] != null && (
                  <p>
                    ☀️ UV {Math.round(d?.uv_index_max?.[0] || 0)} &nbsp;
                    🌡️ ET₀ {(d?.et0_fao_evapotranspiration?.[0] || 0).toFixed(1)}mm
                  </p>
                )}
              </div>
            </div>

            {/* Crop-specific tips panel */}
            <div className="today-tips">
              {farmProfile.crops.length > 0 ? (
                <>
                  <strong className="today-tips-label">
                    {farmProfile.crops.map(v => CROPS.find(c => c.value === v)?.icon).join(' ')}
                    {' '}{lang === 'fr' ? 'Conseils pour vos cultures' : 'Advice for your crops'}
                  </strong>
                  {cropTips ? (
                    cropTips.map((tip, i) => <p key={i}>{tip}</p>)
                  ) : (
                    <p>✅ {lang === 'fr' ? 'Conditions acceptables pour vos cultures aujourd\'hui.' : 'Acceptable conditions for your crops today.'}</p>
                  )}
                </>
              ) : (
                <div className="today-tips-prompt">
                  <strong>{lang === 'fr' ? 'Personnalisez vos conseils' : 'Personalize your advice'}</strong>
                  <p>{lang === 'fr' ? 'Cliquez sur « Mon exploitation » pour sélectionner vos cultures et obtenir des conseils adaptés.' : 'Click "My farm" to select your crops and get tailored advice.'}</p>
                  <button className="btn btn-primary btn-sm" style={{ marginTop: '0.5rem' }} onClick={() => setShowProfileEditor(true)}>
                    🌾 {lang === 'fr' ? 'Configurer' : 'Set up'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Agricultural conditions grid */}
          <div className="agri-grid">
            <AgriCard
              icon="💧"
              title={lang === 'fr' ? "Besoin d'irrigation" : 'Irrigation need'}
              value={irrToday.level === 'none'
                ? condLabel.none[lang]
                : `${irrToday.mm}mm ${lang === 'fr' ? 'nécessaires' : 'needed'}`}
              level={irrToday.level === 'none' ? 'none' : irrToday.level}
              condLabel={condLabel}
              hint={lang === 'fr'
                ? `ET₀ ${(d?.et0_fao_evapotranspiration?.[0]||0).toFixed(1)}mm − Pluie ${d?.precipitation_sum?.[0]||0}mm`
                : `ET₀ ${(d?.et0_fao_evapotranspiration?.[0]||0).toFixed(1)}mm − Rain ${d?.precipitation_sum?.[0]||0}mm`}
            />
            <AgriCard
              icon="🍄"
              title={lang === 'fr' ? 'Risque fongique' : 'Fungal disease risk'}
              value={condLabel[diseaseRisk]?.[lang] || '—'}
              level={diseaseRisk}
              condLabel={condLabel}
              hint={lang === 'fr'
                ? `Humidité ${Math.round(d?.relative_humidity_2m_max?.[0]||0)}% — Temp ${Math.round(d?.temperature_2m_max?.[0]||0)}°C`
                : `Humidity ${Math.round(d?.relative_humidity_2m_max?.[0]||0)}% — Temp ${Math.round(d?.temperature_2m_max?.[0]||0)}°C`}
            />
            <AgriCard
              icon="🌬️"
              title={lang === 'fr' ? 'Fenêtre de pulvérisation' : 'Spraying window'}
              value={condLabel[sprayWindow]?.[lang] || '—'}
              level={sprayWindow}
              condLabel={condLabel}
              hint={lang === 'fr'
                ? `Vent ${Math.round(d?.windspeed_10m_max?.[0]||0)} km/h — Rafales ${Math.round(d?.windgusts_10m_max?.[0]||0)} km/h`
                : `Wind ${Math.round(d?.windspeed_10m_max?.[0]||0)} km/h — Gusts ${Math.round(d?.windgusts_10m_max?.[0]||0)} km/h`}
            />
            <AgriCard
              icon="⚒️"
              title={lang === 'fr' ? 'Conditions de travail' : 'Work conditions'}
              value={condLabel[workQuality]?.[lang] || '—'}
              level={workQuality}
              condLabel={condLabel}
              hint={lang === 'fr'
                ? `Pluie ${d?.precipitation_hours?.[0]||0}h — UV ${Math.round(d?.uv_index_max?.[0]||0)}`
                : `Rain ${d?.precipitation_hours?.[0]||0}h — UV ${Math.round(d?.uv_index_max?.[0]||0)}`}
            />
          </div>

          {/* 10-day Activity Planner */}
          <div className="forecast-section card">
            <h3>{lang === 'fr' ? 'Planificateur activités — 10 jours' : '10-Day Activity Planner'}</h3>
            <div className="activity-row">
              {d?.time?.slice(0, 10).map((date, i) => {
                const act = dayActivity(d.weathercode?.[i], d.precipitation_sum?.[i], d.temperature_2m_max?.[i], d.windspeed_10m_max?.[i]);
                const info = ACT_LABELS[act.type] || ACT_LABELS.work;
                return (
                  <div key={date} className={`activity-day ${info.cls}`}>
                    <span className="act-date">
                      {new Date(date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'short', day: 'numeric' })}
                    </span>
                    <span className="act-weather-icon">{wmo(d.weathercode?.[i]).icon}</span>
                    <span className="act-temp">
                      {Math.round(d.temperature_2m_max?.[i]||0)}° / {Math.round(d.temperature_2m_min?.[i]||0)}°
                    </span>
                    <span className="act-rain-badge">🌧️ {d.precipitation_sum?.[i]||0}mm</span>
                    <span className="act-type-badge">
                      {act.icon} {lang === 'fr' ? info.fr : info.en}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="act-legend">
              {[
                { cls: 'act-work',  icon: '✅', fr: 'Travaux',       en: 'Fieldwork' },
                { cls: 'act-plant', icon: '🌱', fr: 'Semer',         en: 'Plant' },
                { cls: 'act-spray', icon: '💧', fr: 'Pulvérisation', en: 'Spray' },
                { cls: 'act-heat',  icon: '🌡️', fr: 'Chaleur',       en: 'Heat' },
                { cls: 'act-rain',  icon: '🌧️', fr: 'Pluie',         en: 'Rain' },
                { cls: 'act-storm', icon: '⛈️', fr: 'Orage',         en: 'Storm' },
              ].map(l => (
                <span key={l.cls} className={`legend-item ${l.cls}`}>
                  {l.icon} {lang === 'fr' ? l.fr : l.en}
                </span>
              ))}
            </div>
          </div>

          {/* Historical Rainfall */}
          {histData.length > 0 && (
            <div className="rainfall-section card">
              <h3>{lang === 'fr' ? 'Pluies — 30 derniers jours' : 'Rainfall — last 30 days'}</h3>
              <div className="rainfall-total">
                <span>
                  {lang === 'fr' ? 'Total : ' : 'Total: '}
                  <strong>{histData.reduce((s, d) => s + d.rain, 0).toFixed(1)}mm</strong>
                </span>
                <span>
                  {lang === 'fr' ? 'Jours pluvieux : ' : 'Rainy days: '}
                  <strong>{histData.filter(d => d.rain > 1).length}</strong>
                </span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={histData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                  <XAxis dataKey="date" tick={{ fontSize: 9 }} interval={4} />
                  <YAxis tick={{ fontSize: 9 }} unit="mm" />
                  <Tooltip formatter={v => [`${v}mm`, lang === 'fr' ? 'Précipitations' : 'Rainfall']} />
                  <Bar dataKey="rain" radius={[3, 3, 0, 0]}>
                    {histData.map((entry, i) => (
                      <Cell key={i} fill={entry.rain > 10 ? '#2D6A4F' : '#74C69D'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ─── Agricultural condition card ────────────────────────── */
function AgriCard({ icon, title, value, level, condLabel, hint }) {
  const cls = condLabel[level]?.cls || 'cond-neutral';
  return (
    <div className={`agri-card ${cls}`}>
      <div className="agri-card-icon">{icon}</div>
      <div className="agri-card-body">
        <p className="agri-card-title">{title}</p>
        <p className="agri-card-value">{value}</p>
        {hint && <p className="agri-card-hint">{hint}</p>}
      </div>
    </div>
  );
}

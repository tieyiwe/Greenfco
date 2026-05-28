import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './WeatherHub.css';

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
      setForecast(await fRes.json());
      setHistorical(await hRes.json());
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

  /* ── Manual location search ──────────────────────────────── */
  async function searchCity(e) {
    e.preventDefault();
    if (!cityInput.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityInput)}&count=1&language=${lang}`);
      const data = await res.json();
      if (data.results?.length) {
        const { latitude, longitude, name } = data.results[0];
        fetchWeather(latitude, longitude, name);
        setCityInput('');
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
          <form onSubmit={searchCity} className="city-search">
            <input
              className="form-input"
              placeholder={lang === 'fr' ? 'Changer de ville…' : 'Change city…'}
              value={cityInput}
              onChange={e => setCityInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-sm">→</button>
          </form>
          <button
            className={`btn btn-secondary btn-sm ${showProfileEditor ? 'active-btn' : ''}`}
            onClick={() => setShowProfileEditor(p => !p)}
          >
            🌾 {lang === 'fr' ? 'Mon exploitation' : 'My farm'}
          </button>
        </div>
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

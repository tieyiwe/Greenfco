import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './WeatherHub.css';

const WMO_CODES = {
  0: { fr: 'Ciel dégagé', en: 'Clear sky', icon: '☀️' },
  1: { fr: 'Principalement dégagé', en: 'Mainly clear', icon: '🌤️' },
  2: { fr: 'Partiellement nuageux', en: 'Partly cloudy', icon: '⛅' },
  3: { fr: 'Couvert', en: 'Overcast', icon: '☁️' },
  45: { fr: 'Brouillard', en: 'Fog', icon: '🌫️' },
  48: { fr: 'Brouillard givrant', en: 'Icy fog', icon: '🌫️' },
  51: { fr: 'Bruine légère', en: 'Light drizzle', icon: '🌦️' },
  61: { fr: 'Pluie légère', en: 'Slight rain', icon: '🌧️' },
  63: { fr: 'Pluie modérée', en: 'Moderate rain', icon: '🌧️' },
  65: { fr: 'Pluie forte', en: 'Heavy rain', icon: '🌧️' },
  80: { fr: 'Averses légères', en: 'Light showers', icon: '🌦️' },
  81: { fr: 'Averses modérées', en: 'Moderate showers', icon: '🌦️' },
  95: { fr: 'Orage', en: 'Thunderstorm', icon: '⛈️' },
};

function getWeatherInfo(code) {
  return WMO_CODES[code] || { fr: 'Inconnu', en: 'Unknown', icon: '🌡️' };
}

function getAgriRecommendation(forecast, lang) {
  if (!forecast || !forecast.daily) return null;
  const todayRain = forecast.daily.precipitation_sum?.[0] || 0;
  const todayMax = forecast.daily.temperature_2m_max?.[0] || 0;
  const code = forecast.daily.weathercode?.[0] || 0;

  if (todayRain > 20) return lang === 'fr' ? '⚠️ Pluies abondantes — évitez les travaux de labour et les applications de produits phytosanitaires.' : '⚠️ Heavy rain — avoid tillage and pesticide applications.';
  if (todayMax > 38) return lang === 'fr' ? '🌡️ Chaleur extrême — arrosez le matin tôt ou en soirée. Surveillez le stress hydrique.' : '🌡️ Extreme heat — water early morning or evening. Monitor water stress.';
  if (code >= 95) return lang === 'fr' ? '⛈️ Orages prévus — rentrez le matériel agricole et surveillez vos parcelles.' : '⛈️ Thunderstorms expected — secure farm equipment and monitor your plots.';
  if (todayRain > 5) return lang === 'fr' ? '🌧️ Journée pluvieuse — profitez-en pour planter les cultures qui bénéficient de l\'humidité.' : '🌧️ Rainy day — good time to plant moisture-loving crops.';
  return lang === 'fr' ? '✅ Conditions favorables — journée idéale pour les travaux agricoles.' : '✅ Favorable conditions — ideal day for farm work.';
}

export default function WeatherHub() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const [location, setLocation] = useState(null);
  const [cityInput, setCityInput] = useState('');
  const [forecast, setForecast] = useState(null);
  const [historical, setHistorical] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState('');

  async function fetchWeather(lat, lon, name = '') {
    setLoading(true);
    setError(null);
    setCityName(name);
    try {
      const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode&timezone=auto&forecast_days=7`;
      const fRes = await fetch(forecastUrl);
      const fData = await fRes.json();
      setForecast(fData);

      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 29);
      const fmt = d => d.toISOString().slice(0, 10);
      const histUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${fmt(start)}&end_date=${fmt(end)}&daily=precipitation_sum&timezone=auto`;
      const hRes = await fetch(histUrl);
      const hData = await hRes.json();
      setHistorical(hData);
    } catch {
      setError(lang === 'fr' ? 'Impossible de charger les données météo.' : 'Unable to load weather data.');
    } finally {
      setLoading(false);
    }
  }

  function detectLocation() {
    if (!navigator.geolocation) {
      setError(lang === 'fr' ? 'Géolocalisation non supportée.' : 'Geolocation not supported.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        fetchWeather(pos.coords.latitude, pos.coords.longitude, lang === 'fr' ? 'Position actuelle' : 'Current location');
      },
      () => {
        setError(lang === 'fr' ? 'Accès à la localisation refusé.' : 'Location access denied.');
      }
    );
  }

  async function searchCity(e) {
    e.preventDefault();
    if (!cityInput.trim()) return;
    setLoading(true);
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityInput)}&count=1&language=${lang}`);
      const geoData = await geoRes.json();
      if (geoData.results?.length) {
        const { latitude, longitude, name } = geoData.results[0];
        setLocation({ lat: latitude, lon: longitude });
        fetchWeather(latitude, longitude, name);
        setCityInput('');
      } else {
        setError(lang === 'fr' ? 'Ville introuvable. Essayez "Ouagadougou".' : 'City not found. Try "Ouagadougou".');
        setLoading(false);
      }
    } catch {
      setError(lang === 'fr' ? 'Erreur de recherche.' : 'Search error.');
      setLoading(false);
    }
  }

  useEffect(() => {
    // Default to Ouagadougou
    fetchWeather(12.3647, -1.5337, 'Ouagadougou');
  }, []);

  const recommendation = getAgriRecommendation(forecast, lang);

  const histChartData = historical?.daily?.time?.map((date, i) => ({
    date: date.slice(5),
    rain: historical.daily.precipitation_sum?.[i] ?? 0,
  })) || [];

  return (
    <div className="weather-hub">
      <div className="weather-header">
        <div>
          <h1>{t('weather.title')}</h1>
          <p>{cityName && `📍 ${cityName}`}</p>
        </div>
        <div className="weather-controls">
          <button onClick={detectLocation} className="btn btn-secondary btn-sm">
            📍 {t('weather.detect_location')}
          </button>
          <form onSubmit={searchCity} className="city-search">
            <input
              type="text"
              className="form-input"
              placeholder={t('weather.manual_city')}
              value={cityInput}
              onChange={e => setCityInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-sm">→</button>
          </form>
        </div>
      </div>

      {error && <div className="weather-error">{error}</div>}

      {loading && (
        <div className="weather-loading">
          <div className="skeleton" style={{ height: '200px', borderRadius: 'var(--radius-lg)' }} />
        </div>
      )}

      {!loading && forecast && (
        <>
          {/* Today Card */}
          <div className="today-card">
            <div className="today-main">
              <div className="today-icon">
                {getWeatherInfo(forecast.daily.weathercode?.[0]).icon}
              </div>
              <div className="today-temp">
                <span className="temp-max">{Math.round(forecast.daily.temperature_2m_max?.[0] || 0)}°C</span>
                <span className="temp-min">{Math.round(forecast.daily.temperature_2m_min?.[0] || 0)}°C</span>
              </div>
              <div className="today-desc">
                <h3>{lang === 'fr'
                  ? getWeatherInfo(forecast.daily.weathercode?.[0]).fr
                  : getWeatherInfo(forecast.daily.weathercode?.[0]).en}
                </h3>
                <p>
                  🌧️ {forecast.daily.precipitation_sum?.[0] || 0}mm &nbsp;
                  💨 {Math.round(forecast.daily.windspeed_10m_max?.[0] || 0)} km/h
                </p>
              </div>
            </div>
            {recommendation && (
              <div className="today-recommendation">
                <strong>{t('weather.recommendation')}</strong>
                <p>{recommendation}</p>
              </div>
            )}
          </div>

          {/* 7-day Forecast */}
          <div className="forecast-section card">
            <h3>{t('weather.forecast_7days')}</h3>
            <div className="forecast-grid">
              {forecast.daily.time?.slice(0, 7).map((date, i) => {
                const info = getWeatherInfo(forecast.daily.weathercode?.[i]);
                return (
                  <div key={date} className="forecast-day">
                    <span className="forecast-date">
                      {new Date(date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'short', day: 'numeric' })}
                    </span>
                    <span className="forecast-icon">{info.icon}</span>
                    <span className="forecast-max">{Math.round(forecast.daily.temperature_2m_max?.[i] || 0)}°</span>
                    <span className="forecast-min">{Math.round(forecast.daily.temperature_2m_min?.[i] || 0)}°</span>
                    <span className="forecast-rain">🌧️ {forecast.daily.precipitation_sum?.[i] || 0}mm</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Historical Rainfall */}
          {histChartData.length > 0 && (
            <div className="rainfall-section card">
              <h3>{t('weather.rainfall_30days')}</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={histChartData}>
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={4} />
                  <YAxis tick={{ fontSize: 10 }} unit="mm" />
                  <Tooltip formatter={(v) => [`${v}mm`, lang === 'fr' ? 'Précipitations' : 'Rainfall']} />
                  <Bar dataKey="rain" fill="#52B788" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
}

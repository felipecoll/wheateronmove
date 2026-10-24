// --- ADAPTADORES DE DATOS ---

// 1. Adaptador para Open-Meteo (API 1)
export const adaptOpenMeteo = (data) => {
  const current = data.current_weather || {};
  const hourly = data.hourly || {};
  const daily = data.daily || {};

  const nowHour = new Date().getHours();

  // Intervalos +3h, +6h, +9h, +12h
  const hourlyIntervals = [3, 6, 9, 12].map((offset) => {
    const targetIndex = (nowHour + offset) % 24;
    return {
      label: `+${offset}h (${targetIndex}:00)`,
      temp: hourly.temperature_2m ? Math.round(hourly.temperature_2m[targetIndex]) : '--',
      rainProb: hourly.precipitation_probability ? hourly.precipitation_probability[targetIndex] : 0,
      windSpeed: hourly.windspeed_10m ? Math.round(hourly.windspeed_10m[targetIndex]) : Math.round(current.windspeed || 0)
    };
  });

  // Pronóstico extendido de 4 días
  const dailyForecast = (daily.time || []).slice(0, 4).map((time, index) => {
    const dateObj = new Date(time + 'T00:00:00');
    const dayName = index === 0 ? 'Hoy' : dateObj.toLocaleDateString('es-ES', { weekday: 'long' });
    
    return {
      day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
      maxTemp: daily.temperature_2m_max ? Math.round(daily.temperature_2m_max[index]) : '--',
      minTemp: daily.temperature_2m_min ? Math.round(daily.temperature_2m_min[index]) : '--',
      rainProb: daily.precipitation_probability_max ? daily.precipitation_probability_max[index] : 0
    };
  });

  return {
    source: 'Open-Meteo (Principal)',
    temp: Math.round(current.temperature || 0),
    windSpeed: Math.round(current.windspeed || 0),
    rainProb: hourly.precipitation_probability ? hourly.precipitation_probability[nowHour] : 0,
    humidity: hourly.relativehumidity_2m ? hourly.relativehumidity_2m[nowHour] : 0,
    uvIndex: hourly.uv_index ? Math.round(hourly.uv_index[nowHour]) : 0,
    elevation: Math.round(data.elevation || 0),
    hourlyForecast: hourlyIntervals,
    dailyForecast: dailyForecast
  };
};

// 2. Adaptador para WeatherAPI (API 2)
export const adaptWeatherApi = (data) => {
  const current = data.current || {};
  
  return {
    source: 'WeatherAPI (Respaldo 1)',
    temp: Math.round(current.temp_c || 0),
    windSpeed: Math.round(current.wind_kph || 0),
    rainProb: current.precip_mm > 0 ? 80 : 10,
    humidity: current.humidity || 0,
    uvIndex: current.uv || 0,
    elevation: 0,
    hourlyForecast: [],
    dailyForecast: []
  };
};

// 3. Adaptador para OpenWeatherMap (API 3)
export const adaptOpenWeather = (data) => {
  const current = data.current || {};
  
  return {
    source: 'OpenWeatherMap (Respaldo 2)',
    temp: Math.round(current.temp || 0),
    windSpeed: Math.round((current.wind_speed || 0) * 3.6),
    rainProb: current.pop ? Math.round(current.pop * 100) : 0,
    humidity: current.humidity || 0,
    uvIndex: current.uvi || 0,
    elevation: 0,
    hourlyForecast: [],
    dailyForecast: []
  };
};

// --- SERVICIO DE TRIANGULACIÓN ---

const fetchWithTimeout = async (url, options = {}, timeoutMs = 5000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

export const fetchWeatherWithFallback = async (lat, lon) => {
  const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_10m,uv_index&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&forecast_days=4&timezone=auto`;
  const weatherApiUrl = `${import.meta.env.VITE_WEATHER_API_URL || ''}?key=${import.meta.env.VITE_WEATHER_API_KEY || ''}&q=${lat},${lon}`;
  const openWeatherUrl = `${import.meta.env.VITE_OPENWEATHER_URL || ''}?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_KEY || ''}`;

  // 1. Intento API Principal: Open-Meteo
  try {
    const rawData = await fetchWithTimeout(openMeteoUrl, {}, 5000);
    const formattedData = adaptOpenMeteo(rawData);
    localStorage.setItem('cached_weather', JSON.stringify({ data: formattedData, timestamp: Date.now() }));
    return formattedData;
  } catch (errOpenMeteo) {
    console.warn('Falló Open-Meteo, pasando a WeatherAPI...', errOpenMeteo);
  }

  // 2. Intento Respaldo 1: WeatherAPI
  try {
    const rawData = await fetchWithTimeout(weatherApiUrl, {}, 5000);
    const formattedData = adaptWeatherApi(rawData);
    localStorage.setItem('cached_weather', JSON.stringify({ data: formattedData, timestamp: Date.now() }));
    return formattedData;
  } catch (errWeatherApi) {
    console.warn('Falló WeatherAPI, pasando a OpenWeatherMap...', errWeatherApi);
  }

  // 3. Intento Respaldo 2: OpenWeatherMap
  try {
    const rawData = await fetchWithTimeout(openWeatherUrl, {}, 5000);
    const formattedData = adaptOpenWeather(rawData);
    localStorage.setItem('cached_weather', JSON.stringify({ data: formattedData, timestamp: Date.now() }));
    return formattedData;
  } catch (errOpenWeather) {
    console.error('Todas las APIs fallaron. Buscando en caché local...', errOpenWeather);
  }

  // 4. Modo Offline (Caché local)
  const cached = localStorage.getItem('cached_weather');
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    const formattedTime = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return {
      ...data,
      source: `Modo Offline (Guardado ${formattedTime} hs)`,
      isOffline: true
    };
  }

  throw new Error('Sin conexión y sin datos previos guardados.');
};
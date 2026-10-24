// Adaptador para Open-Meteo
export const adaptOpenMeteo = (data) => {
  const current = data.current_weather || {};
  const hourly = data.hourly || {};
  const daily = data.daily || {};

  // 1. Obtener índice de la hora actual
  const nowHour = new Date().getHours();

  // 2. Mapear intervalos de 3h, 6h, 9h y 12h
  const hourlyIntervals = [3, 6, 9, 12].map((offset) => {
    const targetIndex = (nowHour + offset) % 24;
    const timeLabel = `+${offset}h (${targetIndex}:00)`;
    
    return {
      label: timeLabel,
      temp: hourly.temperature_2m ? Math.round(hourly.temperature_2m[targetIndex]) : '--',
      rainProb: hourly.precipitation_probability ? hourly.precipitation_probability[targetIndex] : 0,
      windSpeed: hourly.windspeed_10m ? Math.round(hourly.windspeed_10m[targetIndex]) : Math.round(current.windspeed || 0)
    };
  });

  // 3. Mapear próximos 4 días
  const dailyForecast = (daily.time || []).slice(0, 4).map((time, index) => {
    const dateObj = new Date(time + 'T00:00:00');
    const dayName = index === 0 ? 'Hoy' : dateObj.toLocaleDateString('es-ES', { weekday: 'long' });
    
    return {
      day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
      maxTemp: daily.temperature_2m_max ? Math.round(daily.temperature_2m_max[index]) : '--',
      minTemp: daily.temperature_2m_min ? Math.round(daily.temperature_2m_min[index]) : '--',
      rainProb: daily.precipitation_probability_max ? daily.precipitation_probability_max[index] : 0,
      code: daily.weathercode ? daily.weathercode[index] : 0
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
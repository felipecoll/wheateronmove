import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/footer';
import CurrentMetrics from './components/dashboard/CurrentMetrics';
import LocationSearch from './components/dashboard/LocationSearch';
import WeatherLog from './components/log/WeatherLog';
import Modal from './components/common/Modal';
import { fetchWeatherWithFallback } from './services/weatherService';
import { useGeolocation } from './hooks/useGeolocation';
import { CloudSun, Clock, Calendar } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState({ name: 'Felipe' });
  const [loading, setLoading] = useState(false);

  // Modal de Alertas (desactivado por defecto)
  const [modalAlert, setModalAlert] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // Lista de eventos para la Bitácora
  const [logs, setLogs] = useState([
    {
      id: 1,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'info',
      category: 'Sistema',
      message: 'MojoWeather iniciado y listo para operaciones.'
    }
  ]);

  // Función helper para agregar un nuevo evento a la Bitácora
  const addLogEntry = (type, category, message) => {
    const newEntry = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type,
      category,
      message
    };
    setLogs(prev => [newEntry, ...prev]);
  };

  // Ubicación activa inicial
  const [activeLocation, setActiveLocation] = useState({
    name: 'Sinsacate',
    region: 'Córdoba, Argentina',
    lat: -30.952,
    lon: -64.089,
    elevation: 160,
    isGPS: false
  });

  // Métricas de clima
  const [weatherData, setWeatherData] = useState({
    temp: '--',
    windSpeed: '--',
    rainProb: '--',
    humidity: '--',
    uvIndex: '--',
    elevation: '--',
    hourlyForecast: [],
    dailyForecast: []
  });

  // GPS Nativo
  const { location: gpsCoords, loading: gpsLoading, getPosition } = useGeolocation();

  // Función de carga de clima
  const loadWeatherForLocation = async (lat, lon, locationInfo = {}, actionType = 'refresh') => {
    setLoading(true);
    try {
      const weather = await fetchWeatherWithFallback(lat, lon);

      setWeatherData({
        temp: weather.temp,
        windSpeed: weather.windSpeed,
        rainProb: weather.rainProb,
        humidity: weather.humidity,
        uvIndex: weather.uvIndex,
        elevation: locationInfo.elevation || weather.elevation || '--',
        hourlyForecast: weather.hourlyForecast || [],
        dailyForecast: weather.dailyForecast || []
      });

      const locationName = locationInfo.name || activeLocation.name;
      setActiveLocation(prev => ({
        ...prev,
        ...locationInfo,
        lat,
        lon,
        elevation: locationInfo.elevation || weather.elevation || prev.elevation
      }));

      // Registro en la Bitácora según la acción
      if (actionType === 'search') {
        addLogEntry('search', 'Búsqueda', `Ubicación consultada: ${locationName} (${weather.temp}°C, Viento: ${weather.windSpeed} km/h). Fuente: ${weather.source}`);
      } else if (actionType === 'gps') {
        addLogEntry('gps', 'GPS', `Señal GPS fijada en (${lat.toFixed(3)}, ${lon.toFixed(3)}). Temp: ${weather.temp}°C.`);
      } else {
        addLogEntry('refresh', 'Sincronización', `Clima actualizado para ${locationName}. Fuente: ${weather.source}`);
      }

    } catch (err) {
      console.error('Error al cargar clima:', err);
      addLogEntry('danger', 'Error', 'Falla en la obtención de datos meteorológicos.');
    } finally {
      setLoading(false);
    }
  };

  // 1. Selección desde el Buscador con Autocompletado
  const handleSelectLocation = (selected) => {
    loadWeatherForLocation(selected.lat, selected.lon, {
      name: selected.name,
      region: selected.region,
      elevation: selected.elevation,
      isGPS: false
    }, 'search');
  };

  // 2. Botón de GPS en el Header
  const handleGPSClick = () => {
    addLogEntry('info', 'GPS', 'Buscando señal de satélite GPS...');
    getPosition();
  };

  // Escucha del GPS
  useEffect(() => {
    if (gpsCoords) {
      loadWeatherForLocation(gpsCoords.lat, gpsCoords.lon, {
        name: 'Ubicación GPS Actual',
        region: 'Coordenadas en vivo',
        isGPS: true
      }, 'gps');
    }
  }, [gpsCoords]);

  // Carga inicial
  useEffect(() => {
    loadWeatherForLocation(activeLocation.lat, activeLocation.lon, {}, 'init');
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-darkBg text-gray-900 dark:text-white transition-colors">
        
        {/* HEADER RESPONSIVO */}
        <Header 
          user={user} 
          onOpenLogin={() => {}} 
          onDetectGPS={handleGPSClick} 
          gpsLoading={gpsLoading}
        />

        {/* CONTENIDO PRINCIPAL (MOBILE-FIRST) */}
        <main className="flex-1 w-full max-w-md mx-auto px-3.5 sm:px-4 pt-3.5 sm:pt-5 md:max-w-2xl lg:max-w-4xl">
          
          {/* BUSCADOR */}
          <LocationSearch onSelectLocation={handleSelectLocation} />

          {/* TARJETA UBICACIÓN ACTIVA */}
          <div className="p-4 sm:p-5 bg-gradient-to-br from-accentLime/20 to-transparent dark:from-accentLime/10 border border-accentLime/30 rounded-2xl sm:rounded-3xl mb-3.5 sm:mb-4 relative overflow-hidden">
            {loading && (
              <div className="absolute inset-0 bg-white/60 dark:bg-cardDark/60 backdrop-blur-xs flex items-center justify-center z-10">
                <span className="text-xs font-semibold text-accentLime animate-pulse">
                  Sincronizando datos...
                </span>
              </div>
            )}

            <div className="flex justify-between items-start gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-accentLime font-bold">
                    Ubicación Activa
                  </span>
                  {activeLocation.isGPS && (
                    <span className="text-[9px] sm:text-[10px] bg-accentLime/20 text-accentLime px-2 py-0.5 rounded-full font-semibold">
                      GPS En Vivo
                    </span>
                  )}
                </div>
                
                <h2 className="text-lg sm:text-xl font-bold mt-0.5 text-gray-900 dark:text-white">
                  {activeLocation.name}
                </h2>
                
                <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  {activeLocation.region}
                </p>

                <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                  Lat: {activeLocation.lat.toFixed(3)}, Lon: {activeLocation.lon.toFixed(3)} 
                  {activeLocation.elevation && ` • Ele: ${activeLocation.elevation} msnm`}
                </p>
              </div>
              
              <CloudSun size={30} className="text-accentLime shrink-0 mt-1" />
            </div>
          </div>

          {/* MÉTRICAS CLAVE */}
          <CurrentMetrics weatherData={weatherData} />

          {/* EVOLUCIÓN POR HORAS (+3h, +6h, +9h, +12h) */}
          <section className="my-4 sm:my-6">
            <div className="flex items-center justify-between mb-2.5 sm:mb-3">
              <h3 className="text-xs sm:text-sm font-semibold flex items-center gap-2">
                <Clock size={16} className="text-accentLime" />
                <span>Evolución (+3h, +6h, +9h y +12h)</span>
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
              {weatherData.hourlyForecast?.map((item, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center justify-between p-2.5 sm:p-3 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl text-center shadow-xs"
                >
                  <span className="text-[10px] sm:text-[11px] font-medium text-gray-500 dark:text-gray-400">
                    {item.label}
                  </span>

                  <CloudSun size={20} className="my-1.5 text-accentLime" />

                  <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                    {item.temp}°C
                  </span>

                  <div className="mt-1 flex flex-col items-center text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400">
                    <span className="text-blue-400 font-semibold">{item.rainProb}% lluvia</span>
                    <span>{item.windSpeed} km/h</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PRONÓSTICO 4 DÍAS */}
          <section className="my-4 sm:my-6">
            <div className="flex items-center justify-between mb-2.5 sm:mb-3">
              <h3 className="text-xs sm:text-sm font-semibold flex items-center gap-2">
                <Calendar size={16} className="text-accentPurple" />
                <span>Pronóstico Extendido (4 Días)</span>
              </h3>
            </div>

            <div className="space-y-2">
              {weatherData.dailyForecast?.map((dayItem, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 sm:p-3.5 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl shadow-xs"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-xs text-accentPurple">
                      {dayItem.day.slice(0, 3)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white">
                        {dayItem.day}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-blue-400">
                        Lluvia: {dayItem.rainProb}%
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                      {dayItem.maxTemp}°C
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-400 ml-1.5">
                      / {dayItem.minTemp}°C
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BITÁCORA DE BÚSQUEDAS Y OPERACIONES */}
          <WeatherLog logs={logs} />

        </main>

        {/* FOOTER RESPONSIVO */}
        <Footer 
          lastUpdated="Sincronizado" 
          onRefresh={() => loadWeatherForLocation(activeLocation.lat, activeLocation.lon, {}, 'refresh')} 
        />

        {/* MODAL DE ALERTAS */}
        <Modal 
          isOpen={isAlertOpen} 
          onClose={() => setIsAlertOpen(false)} 
          alertData={modalAlert} 
        />

      </div>
    </ThemeProvider>
  );
}
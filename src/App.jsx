import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CurrentMetrics from './components/dashboard/CurrentMetrics';
import WeatherLog from './components/log/WeatherLog';
import Modal from './components/common/Modal';
import { CloudSun, Search, Calendar } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState({ name: 'Felipe' });
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [modalAlert, setModalAlert] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');

  // Datos meteorológicos individuales (preparados para la API)
  const weatherData = { 
    temp: 18, 
    windSpeed: 24, 
    rainProb: 15, 
    humidity: 45, 
    uvIndex: 6.2, 
    elevation: 2200 
  };
  
  const hourly = ['12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h'];
  const daily = [
    { day: 'Hoy', temp: '18° / 9°', cond: 'Soleado' },
    { day: 'Miércoles', temp: '15° / 6°', cond: 'Viento zonda' },
    { day: 'Jueves', temp: '12° / 4°', cond: 'Tormenta aislada' }
  ];

  const handleTriggerAlert = (alert) => {
    setModalAlert(alert);
    setIsAlertOpen(true);
  };

  return (
    <ThemeProvider>
      {/* Layout contenedor flex vertical */}
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-darkBg text-gray-900 dark:text-white transition-colors">
        
        {/* Header Superior */}
        <Header 
          user={user} 
          onOpenLogin={() => setIsLoginOpen(true)} 
          onDetectGPS={() => alert('GPS Sincronizado: Ubicación detectada.')} 
        />

        {/* Contenido Central Delimitado */}
        <main className="flex-1 w-full max-w-md mx-auto px-4 pt-4 md:max-w-2xl lg:max-w-4xl">
          
          {/* Búsqueda */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar cerro, refugio o ciudad (ej. Champaquí, Lanín)..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl text-sm focus:outline-none focus:border-accentLime shadow-sm"
            />
          </div>

          {/* Tarjeta de Ubicación */}
          <div className="p-5 bg-gradient-to-br from-accentLime/20 to-transparent dark:from-accentLime/10 border border-accentLime/30 rounded-3xl mb-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs uppercase tracking-wider text-accentLime font-bold">Ubicación Activa</span>
                <h2 className="text-xl font-bold mt-1">Base Cerro Champaquí</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Lat: -31.987, Lon: -64.932 • Ele: {weatherData.elevation} msnm
                </p>
              </div>
              <CloudSun size={32} className="text-accentLime" />
            </div>
          </div>

          {/* Métricas con Humedad y Lluvia Separadas + Altitud */}
          <CurrentMetrics weatherData={weatherData} />

          {/* Pronóstico 8 Horas */}
          <section className="my-6">
            <h3 className="text-sm font-semibold mb-3 flex items-center justify-between">
              <span>Pronóstico por hora (Próximas 8h)</span>
              <span className="text-xs text-accentLime font-normal">Actualizado hace 5m</span>
            </h3>
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none">
              {hourly.map((h, i) => (
                <div key={i} className="flex flex-col items-center justify-between p-3 min-w-[70px] bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl shrink-0">
                  <span className="text-xs text-gray-400">{h}</span>
                  <CloudSun size={20} className="my-2 text-yellow-400" />
                  <span className="text-sm font-bold">{16 + (i % 3)}°C</span>
                </div>
              ))}
            </div>
          </section>

          {/* Desglose Próximos Días */}
          <section className="my-6">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Calendar size={16} className="text-accentPurple" /> Desglose Próximos 3 Días
            </h3>
            <div className="space-y-2">
              {daily.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-xs">
                      {d.day.slice(0, 3)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{d.day}</h4>
                      <p className="text-xs text-gray-500">{d.cond}</p>
                    </div>
                  </div>
                  <span className="font-bold text-sm">{d.temp}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Bitácora de Eventos antes del Footer */}
          <WeatherLog onTriggerAlert={handleTriggerAlert} />

        </main>

        {/* Footer Similar al Header */}
        <Footer lastUpdated="16:45 hs" onRefresh={() => alert('Sincronizando con Open-Meteo...')} />

        {/* Modal de Alertas Flotante */}
        <Modal isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} alertData={modalAlert} />

      </div>
    </ThemeProvider>
  );
}
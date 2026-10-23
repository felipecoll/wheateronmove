import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldCheck, Clock } from 'lucide-react';

export default ({ onTriggerAlert }) => {
  const [logs, setLogs] = useState([
    { id: 1, time: '10:00', type: 'info', message: 'Sistema sincronizado con Open-Meteo (GPS Activo).' },
    { id: 2, time: '09:30', type: 'warning', message: 'Alerta preventiva: Ráfagas fuertes esperadas en cumbre a las 14:00.' }
  ]);

  // Simulación de escaneo de clima que dispara alerta si ocurre un cambio crítico
  useEffect(() => {
    const timer = setTimeout(() => {
      const newAlert = {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'danger',
        message: '¡Atención! Cambio imprevisto: Aumento repentino de velocidad de viento a 45 km/h.'
      };
      setLogs(prev => [newAlert, ...prev]);
      onTriggerAlert(newAlert); // Lanza el Popup Modal global
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="my-6 p-4 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Clock size={16} className="text-accentLime" /> Bitácora de Actualizaciones y Alertas
        </h3>
        <span className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full">En vivo</span>
      </div>
      
      <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
        {logs.map(log => (
          <div key={log.id} className="flex items-start space-x-2 text-xs p-2 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
            {log.type === 'danger' ? <AlertTriangle size={14} className="text-red-500 mt-0.5 shrink-0" /> : <ShieldCheck size={14} className="text-accentLime mt-0.5 shrink-0" />}
            <div>
              <span className="text-gray-400 mr-2 font-mono">{log.time}</span>
              <span className="text-gray-700 dark:text-gray-300">{log.message}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
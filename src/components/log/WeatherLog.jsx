import React from 'react';
import { Clock, MapPin, Navigation, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';

export default ({ logs = [] }) => {

  // Asigna un ícono según la categoría del registro en la bitácora
  const getLogIcon = (type) => {
    switch (type) {
      case 'search':
        return <MapPin size={14} className="text-accentLime mt-0.5 shrink-0" />;
      case 'gps':
        return <Navigation size={14} className="text-cyan-400 mt-0.5 shrink-0" />;
      case 'refresh':
        return <RefreshCw size={14} className="text-accentPurple mt-0.5 shrink-0" />;
      case 'danger':
      case 'warning':
        return <AlertTriangle size={14} className="text-red-500 mt-0.5 shrink-0" />;
      default:
        return <ShieldCheck size={14} className="text-green-400 mt-0.5 shrink-0" />;
    }
  };

  return (
    <section className="my-4 sm:my-6 p-3.5 sm:p-5 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl sm:rounded-3xl shadow-sm">
      <div className="flex items-center justify-between mb-2.5 sm:mb-3">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Clock size={16} className="text-accentLime" />
          <span>Bitácora de Operaciones y Clima</span>
        </h3>
        <span className="text-[10px] bg-accentLime/10 text-accentLime px-2 py-0.5 rounded-full font-medium">
          Activa
        </span>
      </div>
      
      {/* Lista de eventos con scroll interno y ajuste responsivo para texto móvil */}
      <div className="space-y-2 max-h-40 sm:max-h-48 overflow-y-auto pr-1 text-xs">
        {logs.length === 0 ? (
          <p className="text-[11px] text-gray-400 py-2 text-center">Sin registros recientes en esta sesión.</p>
        ) : (
          logs.map((log) => (
            <div 
              key={log.id} 
              className="flex items-start space-x-2.5 p-2 sm:p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800/80 transition-all"
            >
              {getLogIcon(log.type)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-mono text-[10px] text-gray-400 shrink-0">{log.time}</span>
                  <span className="text-[9px] uppercase font-bold text-gray-400 truncate">{log.category || 'Sistema'}</span>
                </div>
                <p className="text-[11px] sm:text-xs text-gray-700 dark:text-gray-300 font-medium leading-tight mt-0.5 break-words">
                  {log.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
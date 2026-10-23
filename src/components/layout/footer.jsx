import React from 'react';
import { ShieldCheck, Mountain, RefreshCw } from 'lucide-react';

export default ({ lastUpdated, onRefresh }) => {
  return (
    <footer className="w-full bg-white dark:bg-cardDark border-t border-gray-200 dark:border-cardBorder transition-colors mt-auto">
      <div className="max-w-md mx-auto px-4 py-3 md:max-w-2xl lg:max-w-4xl flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        
        {/* Izquierda: Marca y estado de red */}
        <div className="flex items-center space-x-2">
          <Mountain size={16} className="text-accentLime" />
          <span className="font-semibold text-gray-700 dark:text-gray-300">MojoWeather</span>
          <span className="hidden sm:inline-block text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full font-medium">
            PWA Sync
          </span>
        </div>

        {/* Centro: Última actualización */}
        <div className="flex items-center space-x-1">
          <ShieldCheck size={14} className="text-accentPurple" />
          <span>Act: {lastUpdated || 'Hace instantes'}</span>
        </div>

        {/* Derecha: Botón de refresco manual */}
        <button 
          onClick={onRefresh}
          className="flex items-center space-x-1 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-600 dark:text-gray-300"
          title="Forzar actualización de datos"
        >
          <RefreshCw size={14} />
          <span className="hidden sm:inline">Refrescar</span>
        </button>
      </div>
    </footer>
  );
};
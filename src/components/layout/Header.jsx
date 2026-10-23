import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, MapPin, User, Navigation } from 'lucide-react';

export default ({ user, onOpenLogin, onDetectGPS }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-cardDark border-b border-gray-200 dark:border-cardBorder sticky top-0 z-40 transition-colors">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="w-3 h-3 bg-accentLime rounded-full animate-pulse"></span>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white tracking-wide">Mojo Weather | Dashboard</h1>
      </div>

      {/* Controles centrales / Acciones rápidas en móvil */}
      <div className="flex items-center space-x-2">
        <button 
          onClick={onDetectGPS}
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
          title="Usar mi GPS"
        >
          <Navigation size={18} />
        </button>

        {/* Toggle Theme */}
        <button 
          onClick={toggleTheme}
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
        >
          {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-700" />}
        </button>

        {/* Perfil / Login */}
        <button 
          onClick={onOpenLogin}
          className="flex items-center space-x-1 pl-2 border-l border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200"
        >
          <div className="w-8 h-8 rounded-full bg-accentPurple flex items-center justify-center text-white font-semibold">
            {user ? user.name[0] : <User size={16} />}
          </div>
        </button>
      </div>
    </header>
  );
};
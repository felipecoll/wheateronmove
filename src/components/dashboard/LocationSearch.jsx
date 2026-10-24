import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Loader2 } from 'lucide-react';
import { searchLocations } from '../../services/geocodingService';

export default ({ onSelectLocation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  // Cerrar lista si el usuario hace clic fuera del buscador
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Evento al ir tipeando
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setLoading(true);
        const locations = await searchLocations(query);
        setResults(locations);
        setLoading(false);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (location) => {
    setQuery(`${location.name}`);
    setIsOpen(false);
    onSelectLocation(location); // Envía los datos completos al dashboard principal
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full mb-4 z-30">
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-gray-400" size={18} />
        
        <input 
          type="text" 
          placeholder="Buscar villa, pueblo o cerro (ej. Villa Alpina, La Cumbrecita)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-3 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl text-sm focus:outline-none focus:border-accentLime shadow-sm transition-all text-gray-900 dark:text-white"
        />

        {loading && (
          <Loader2 className="absolute right-3 text-accentLime animate-spin" size={18} />
        )}

        {!loading && query && (
          <button onClick={handleClear} className="absolute right-3 text-gray-400 hover:text-white">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Desplegable de Opciones al Tipear */}
      {isOpen && results.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl shadow-xl max-h-60 overflow-y-auto z-50 divide-y divide-gray-100 dark:divide-gray-800">
          {results.map((item) => (
            <li 
              key={item.id}
              onClick={() => handleSelect(item)}
              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/60 cursor-pointer transition"
            >
              <MapPin size={16} className="text-accentLime shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {item.region}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
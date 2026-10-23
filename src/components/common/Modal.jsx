import React from 'react';
import { AlertCircle, X } from 'lucide-react';

export default ({ isOpen, onClose, alertData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-cardDark border border-red-500/30 w-full max-w-sm rounded-3xl p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-4 animate-bounce">
            <AlertCircle size={28} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">¡Alerta Meteorológica!</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">{alertData?.message || 'Se detectó un cambio drástico en las condiciones de montaña.'}</p>
          <button 
            onClick={onClose}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition shadow-lg shadow-red-600/30"
          >
            Entendido, tomar precauciones
          </button>
        </div>
      </div>
    </div>
  );
};
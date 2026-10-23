import React from 'react';
import { Thermometer, Wind, CloudRain, Droplets, SunMedium, Mountain } from 'lucide-react';

export default ({ weatherData }) => {
  const { 
    temp = '--', 
    windSpeed = '--', 
    rainProb = '--', 
    humidity = '--', 
    uvIndex = '--', 
    elevation = '--' 
  } = weatherData || {};

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
      
      {/* 1. Temperatura */}
      <div className="p-4 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl shadow-sm">
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
          <span className="text-xs font-medium uppercase">Temperatura</span>
          <Thermometer size={18} className="text-red-400" />
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{temp}°C</div>
        <span className="text-[10px] text-green-500 font-medium">Sensación estable</span>
      </div>

      {/* 2. Viento */}
      <div className="p-4 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl shadow-sm">
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
          <span className="text-xs font-medium uppercase">Viento</span>
          <Wind size={18} className="text-blue-400" />
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {windSpeed} <span className="text-xs font-normal">km/h</span>
        </div>
        <span className="text-[10px] text-blue-400 font-medium">Ráfagas moderadas</span>
      </div>

      {/* 3. Lluvia (Probabilidad / Precipitación) */}
      <div className="p-4 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl shadow-sm">
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
          <span className="text-xs font-medium uppercase">Lluvia</span>
          <CloudRain size={18} className="text-purple-400" />
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{rainProb}%</div>
        <span className="text-[10px] text-purple-400 font-medium">Prob. próximas 8h</span>
      </div>

      {/* 4. Humedad relativa */}
      <div className="p-4 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl shadow-sm">
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
          <span className="text-xs font-medium uppercase">Humedad</span>
          <Droplets size={18} className="text-cyan-400" />
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{humidity}%</div>
        <span className="text-[10px] text-cyan-400 font-medium">Humedad relativa</span>
      </div>

      {/* 5. Sol / Índice UV */}
      <div className="p-4 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl shadow-sm">
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
          <span className="text-xs font-medium uppercase">Índice UV</span>
          <SunMedium size={18} className="text-yellow-400" />
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{uvIndex}</div>
        <span className="text-[10px] text-yellow-500 font-medium">Protección recomendada</span>
      </div>

      {/* 6. Altitud (msnm) */}
      <div className="p-4 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl shadow-sm">
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
          <span className="text-xs font-medium uppercase">Altitud</span>
          <Mountain size={18} className="text-accentLime" />
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {elevation} <span className="text-xs font-normal">m</span>
        </div>
        <span className="text-[10px] text-accentLime font-medium">Ajuste topo activo</span>
      </div>

    </div>
  );
};

// import React from 'react';
// import { Thermometer, Wind, CloudRain, SunMedium } from 'lucide-react';

// export default ({ weatherData }) => {
//   const { temp, windSpeed, precipitation, uvIndex } = weatherData || { temp: '--', windSpeed: '--', precipitation: '--', uvIndex: '--' };

//   return (
//     <div className="grid grid-cols-2 gap-3 my-4">
//       {/* Temperatura */}
//       <div className="p-4 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl shadow-sm">
//         <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
//           <span className="text-xs font-medium uppercase">Temperatura</span>
//           <Thermometer size={18} className="text-red-400" />
//         </div>
//         <div className="text-2xl font-bold text-gray-900 dark:text-white">{temp}°C</div>
//         <span className="text-[10px] text-green-500 font-medium">Sensación térmica estable</span>
//       </div>

//       {/* Viento */}
//       <div className="p-4 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl shadow-sm">
//         <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
//           <span className="text-xs font-medium uppercase">Viento</span>
//           <Wind size={18} className="text-blue-400" />
//         </div>
//         <div className="text-2xl font-bold text-gray-900 dark:text-white">{windSpeed} <span className="text-xs font-normal">km/h</span></div>
//         <span className="text-[10px] text-blue-400 font-medium">Ráfagas moderadas</span>
//       </div>

//       {/* Lluvia */}
//       <div className="p-4 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl shadow-sm">
//         <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
//           <span className="text-xs font-medium uppercase">Lluvia / Humedad</span>
//           <CloudRain size={18} className="text-purple-400" />
//         </div>
//         <div className="text-2xl font-bold text-gray-900 dark:text-white">{precipitation}%</div>
//         <span className="text-[10px] text-purple-400 font-medium">Probabilidad baja</span>
//       </div>

//       {/* Sol / UV */}
//       <div className="p-4 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl shadow-sm">
//         <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
//           <span className="text-xs font-medium uppercase">Índice UV</span>
//           <SunMedium size={18} className="text-yellow-400" />
//         </div>
//         <div className="text-2xl font-bold text-gray-900 dark:text-white">{uvIndex}</div>
//         <span className="text-[10px] text-yellow-500 font-medium">Protección requerida</span>
//       </div>
//     </div>
//   );
// };
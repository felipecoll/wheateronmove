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
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5 my-3 sm:my-5">
      
      {/* 1. Temperatura */}
      <div className="p-3 sm:p-4 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl shadow-xs">
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-1.5">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Temp</span>
          <Thermometer size={16} className="text-red-400" />
        </div>
        <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{temp}°C</div>
        <span className="text-[9px] sm:text-[10px] text-green-500 font-medium">Sensación estable</span>
      </div>

      {/* 2. Viento */}
      <div className="p-3 sm:p-4 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl shadow-xs">
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-1.5">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Viento</span>
          <Wind size={16} className="text-blue-400" />
        </div>
        <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          {windSpeed} <span className="text-xs font-normal">km/h</span>
        </div>
        <span className="text-[9px] sm:text-[10px] text-blue-400 font-medium">Ráfagas</span>
      </div>

      {/* 3. Lluvia */}
      <div className="p-3 sm:p-4 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl shadow-xs">
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-1.5">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Lluvia</span>
          <CloudRain size={16} className="text-purple-400" />
        </div>
        <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{rainProb}%</div>
        <span className="text-[9px] sm:text-[10px] text-purple-400 font-medium">Probabilidad</span>
      </div>

      {/* 4. Humedad */}
      <div className="p-3 sm:p-4 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl shadow-xs">
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-1.5">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Humedad</span>
          <Droplets size={16} className="text-cyan-400" />
        </div>
        <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{humidity}%</div>
        <span className="text-[9px] sm:text-[10px] text-cyan-400 font-medium">Relativa</span>
      </div>

      {/* 5. Índice UV */}
      <div className="p-3 sm:p-4 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl shadow-xs">
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-1.5">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Índice UV</span>
          <SunMedium size={16} className="text-yellow-400" />
        </div>
        <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{uvIndex}</div>
        <span className="text-[9px] sm:text-[10px] text-yellow-500 font-medium">Protección UV</span>
      </div>

      {/* 6. Altitud */}
      <div className="p-3 sm:p-4 bg-white dark:bg-cardDark border border-gray-200 dark:border-cardBorder rounded-2xl shadow-xs">
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-1.5">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Altitud</span>
          <Mountain size={16} className="text-accentLime" />
        </div>
        <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          {elevation} <span className="text-xs font-normal">m</span>
        </div>
        <span className="text-[9px] sm:text-[10px] text-accentLime font-medium">msnm topo</span>
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
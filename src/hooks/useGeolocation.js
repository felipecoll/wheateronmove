import { useState, useCallback } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState(null); // { lat, lon, accuracy }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError('La geolocalización no está soportada por tu navegador o dispositivo.');
      return;
    }

    setLoading(true);
    setError(null);

    // Opciones optimizadas para uso outdoor / montaña
    const options = {
      enableHighAccuracy: true, // Solicita el chip GPS nativo del teléfono
      timeout: 10000,           // Espera máxima de 10 segundos
      maximumAge: 0             // No usar posiciones en caché antiguas
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          accuracy: position.coords.accuracy // Precisión en metros
        };
        setLocation(coords);
        setLoading(false);
      },
      (err) => {
        let errorMessage = 'No se pudo obtener la ubicación GPS.';
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Permiso de GPS denegado por el usuario.';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Señal de GPS no disponible en esta zona.';
            break;
          case err.TIMEOUT:
            errorMessage = 'Tiempo de espera agotado al buscar señal GPS.';
            break;
        }
        setError(errorMessage);
        setLoading(false);
      },
      options
    );
  }, []);

  return { location, loading, error, getPosition };
};
// Servicio de búsqueda de lugares (Geocoding)
export const searchLocations = async (query) => {
  if (!query || query.trim().length < 2) return [];

  // Buscamos con un límite de 6 resultados en idioma español
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=es&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error en el servidor de geocodificación');
    const data = await response.json();

    if (!data.results) return [];

    // Mapeamos los resultados extrayendo datos clave
    return data.results.map((place) => ({
      id: place.id,
      name: place.name,
      region: place.admin1 ? `${place.admin1}${place.country ? ', ' + place.country : ''}` : (place.country || ''),
      lat: place.latitude,
      lon: place.longitude,
      elevation: place.elevation ? Math.round(place.elevation) : null
    }));
  } catch (error) {
    console.error('Error al buscar localización:', error);
    return [];
  }
};
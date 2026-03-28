// lib/api.js

export const searchIndiaLocation = async (query) => {
  // Adding 'countrycodes=in' restricts the search to India only
  const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&countrycodes=in&limit=5`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'AeroGradient-App' // Required by Nominatim policy
      }
    });
    return await response.json();
  } catch (error) {
    console.error("Search failed", error);
    return [];
  }
};
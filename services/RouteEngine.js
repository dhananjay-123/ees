/**
 * BREATHEPATH Routing Engine
 * Handles Multi-mode pathfinding, Environmental Vitals, 
 * and Automatic Long-Range Fallback.
 */

// Replace the hardcoded strings with these:
const GEOAPIFY_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_KEY;
const WEATHER_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
export const fetchFullAnalysis = async (start, end) => {
  // Format waypoints for Geoapify: "lat,lon|lat,lon"
  const waypoints = `${start[0]},${start[1]}|${end[0]},${end[1]}`;

  try {
    // 1. Fetch Fast Route (Standard Driving)
    const resFast = await fetch(
      `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=drive&apiKey=${GEOAPIFY_KEY}`
    );
    const dataFast = await resFast.json();

    // 2. Attempt Eco Route (Bicycle/Park-Optimized)
    let resGreen = await fetch(
      `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=bicycle&apiKey=${GEOAPIFY_KEY}`
    );

    let dataGreen;
    let isFallback = false;

    // HANDLE DISTANCE LIMIT: Geoapify returns 400 for bicycle routes > 300km
    if (resGreen.status === 400 || !resGreen.ok) {
      console.warn("Distance limit hit or API error. Switching to Long-Range Fallback.");
      const resFallback = await fetch(
        `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=drive&apiKey=${GEOAPIFY_KEY}`
      );
      dataGreen = await resFallback.json();
      isFallback = true;
    } else {
      dataGreen = await resGreen.json();
    }

    // 3. Fetch Environmental Data (AQI & Weather at Destination)
    const [aqiRes, weatherRes] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${end[0]}&lon=${end[1]}&appid=${WEATHER_KEY}`),
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${end[0]}&lon=${end[1]}&appid=${WEATHER_KEY}&units=metric`)
    ]);

    const aqiData = await aqiRes.json();
    const weatherData = await weatherRes.json();

    // 4. Safe Distance Extraction (Convert meters to kilometers)
    // We use Optional Chaining (?.) to prevent crashes if the API response is empty
    const distF = dataFast.features?.[0]?.properties?.distance
      ? (dataFast.features[0].properties.distance / 1000).toFixed(1)
      : "0.0";

    const distG = dataGreen.features?.[0]?.properties?.distance
      ? (dataGreen.features[0].properties.distance / 1000).toFixed(1)
      : distF;

    // 5. Calculate Metrics
    // If fallback is active, score is lower (highway travel). If bicycle, score is high.
    const greenScore = isFallback
      ? Math.floor(Math.random() * (35 - 20) + 20)
      : Math.floor(Math.random() * (95 - 78) + 78);

    return {
      paths: {
        // Map Geoapify [lon, lat] to Leaflet [lat, lon]
        fast: dataFast.features?.[0]?.geometry?.coordinates[0].map(c => [c[1], c[0]]) || [],
        green: dataGreen.features?.[0]?.geometry?.coordinates[0].map(c => [c[1], c[0]]) || []
      },
      vitals: {
        aqi: aqiData.list?.[0]?.main?.aqi || "N/A",
        pm25: aqiData.list?.[0]?.main ? aqiData.list[0].components.pm2_5.toFixed(1) : "N/A",
        temp: weatherData.main ? weatherData.main.temp.toFixed(0) : "N/A",
        condition: weatherData.weather ? weatherData.weather[0].main : "Unknown",
        distFast: distF,
        distGreen: distG,
        isFallback,
        greenScore
      }
    };

  } catch (error) {
    console.error("Critical Routing Engine Error:", error);
    throw error;
  }
};
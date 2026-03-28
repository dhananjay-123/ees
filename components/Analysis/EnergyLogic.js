// components/Analysis/EnergyLogic.js

export const calculateEcoScore = (elevations, distance, surfaceType) => {
  const frictionCoefficients = {
    asphalt: 1.0,
    gravel: 1.3,
    cobblestone: 1.5,
    default: 1.1
  };

  // Calculate cumulative elevation gain
  let totalClimb = 0;
  for (let i = 1; i < elevations.length; i++) {
    const diff = elevations[i].elevation - elevations[i-1].elevation;
    if (diff > 0) totalClimb += diff;
  }

  const surfaceMult = frictionCoefficients[surfaceType] || frictionCoefficients.default;
  
  // Work = (Rolling Resistance) + (Potential Energy Gain)
  const rollingWork = distance * surfaceMult;
  const gravityWork = totalClimb * 9.81; 

  const totalEnergy = (rollingWork + gravityWork).toFixed(2);
  const carbonOffset = (distance * 0.12).toFixed(2); // Grams of CO2 saved vs car

  return { totalEnergy, carbonOffset };
};
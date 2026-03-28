"use client";
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => { 
    if (center && center.length === 2) {
      map.flyTo(center, 12, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

export default function IndiaMap({ routes = { fast: [], green: [] } }) {
  return (
    <MapContainer 
      center={[20.5937, 78.9629]} 
      zoom={5} 
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer 
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" 
        attribution='&copy; CARTO'
      />
      
      <MapUpdater center={routes.green.length > 0 ? routes.green[0] : (routes.fast.length > 0 ? routes.fast[0] : null)} />
      
      {/* FAST PATH: Red Dotted (Pollution/Traffic Indicator) */}
      {routes.fast.length > 0 && (
        <Polyline 
          positions={routes.fast} 
          pathOptions={{ color: '#ef4444', weight: 3, dashArray: '5, 10', opacity: 0.6 }} 
        />
      )}

      {/* GREEN PATH: Solid Emerald (Clean/Eco Indicator) */}
      {routes.green.length > 0 && (
        <Polyline 
          positions={routes.green} 
          pathOptions={{ color: '#10b981', weight: 6, opacity: 1, lineJoin: 'round' }} 
        />
      )}
    </MapContainer>
  );
}
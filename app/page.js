"use client";
import { useState } from 'react';
import dynamic from 'next/dynamic';
import MapSearch from '../components/UI/MapSearch';
import { fetchFullAnalysis } from '../services/RouteEngine';

const IndiaMap = dynamic(() => import('../components/Map/IndiaMap'), { 
  ssr: false, // This is CRITICAL for Vercel deployment
  loading: () => (
    <div className="h-full w-full bg-slate-50 flex items-center justify-center">
      <p className="animate-pulse text-slate-400 font-bold uppercase tracking-widest text-xs">
        Establishing Map Connection...
      </p>
    </div>
  )
});

export default function Home() {
  const [coords, setCoords] = useState({ start: null, end: null });
  const [routes, setRoutes] = useState({ fast: [], green: [] });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const onRunAnalysis = async () => {
    if (!coords.start || !coords.end) return;
    setLoading(true);
    try {
      const result = await fetchFullAnalysis(coords.start, coords.end);
      setRoutes(result.paths);
      setData(result.vitals);
    } catch (err) {
      console.error("Analysis Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to safely calculate the Delta
  const calculateDelta = () => {
    if (!data) return "0.0";
    const green = parseFloat(data.distGreen) || 0;
    const fast = parseFloat(data.distFast) || 0;
    return (green - fast).toFixed(1);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* LEFT SIDEBAR (Original UI) */}
      <aside className="w-[380px] p-8 border-r border-slate-100 bg-white z-20 overflow-y-auto shadow-2xl">
        <div className="space-y-4 mb-8">
          <MapSearch label="Starting Point" onLocationSelect={(c) => setCoords(p => ({...p, start: c}))} />
          <MapSearch label="Destination" onLocationSelect={(c) => setCoords(p => ({...p, end: c}))} />
          <button 
            onClick={onRunAnalysis} 
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all active:scale-95 shadow-lg"
          >
            {loading ? "Optimizing..." : "Analyze Eco-Routes"}
          </button>
        </div>

        {data && (
          <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-[10px] font-bold text-emerald-600 uppercase">AQI Level</p>
                <p className="text-2xl font-black text-emerald-950">Level {data.aqi}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-[10px] font-bold text-blue-600 uppercase">Temp</p>
                <p className="text-2xl font-black text-blue-950">{data.temp}°C</p>
              </div>
            </div>

            <div className="p-6 bg-emerald-900 text-white rounded-3xl shadow-xl">
              <p className="text-[10px] font-bold uppercase opacity-60 mb-1">Greenery Score</p>
              <p className="text-4xl font-black mb-2">{data.greenScore}%</p>
              <div className="h-1.5 bg-emerald-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400" style={{ width: `${data.greenScore}%` }}></div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* RIGHT MAIN AREA (Map + Right Component Overlay) */}
      <main className="flex-1 relative bg-slate-50">
        <IndiaMap routes={routes} />
        
        {data && (
          <div className="absolute top-8 right-8 w-80 bg-white/90 backdrop-blur-xl border border-slate-200 p-8 rounded-[2rem] shadow-2xl z-[1000] animate-in slide-in-from-right-8 duration-700">
            <header className="flex justify-between items-center mb-6">
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Differential</p>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </header>
            
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-400 uppercase">Fast Path</span>
                  <span className="text-xs font-bold text-slate-900 leading-none">Traditional Drive</span>
                </div>
                <span className="text-lg font-black text-red-500">{data.distFast} <span className="text-[10px]">km</span></span>
              </div>

              <div className="flex justify-between items-end border-b border-slate-100 pb-5">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-emerald-600 uppercase">Eco Path</span>
                  <span className="text-xs font-bold text-slate-900 leading-none">Park-Optimized</span>
                </div>
                <span className="text-lg font-black text-emerald-600">{data.distGreen} <span className="text-[10px]">km</span></span>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-900 uppercase">Distance Delta</span>
                  <span className="text-2xl font-black tracking-tighter">
                    +{calculateDelta()} <span className="text-sm">km</span>
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-3 leading-relaxed italic">
                  Trade-off: Increased travel distance for higher canopy coverage and reduced atmospheric pollutant exposure.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
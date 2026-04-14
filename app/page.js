"use client";
import { useState } from 'react';
import dynamic from 'next/dynamic';
import MapSearch from '../components/UI/MapSearch';
import { fetchFullAnalysis } from '../services/RouteEngine';
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from "framer-motion";

const IndiaMap = dynamic(() => import('../components/Map/IndiaMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#F1F5F9] flex relative items-center justify-center overflow-hidden">
      {/* Background ripple loading effect */}
      <motion.div 
         className="absolute w-64 h-64 border border-[#059669]/20 rounded-full"
         animate={{ scale: [1, 2.5], opacity: [1, 0] }}
         transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <div className="relative z-10 flex flex-col items-center gap-4 bg-white/50 backdrop-blur-md p-8 rounded-3xl border border-white/60 shadow-xl">
        <div className="w-10 h-10 border-4 border-[#059669] border-t-transparent rounded-full animate-spin" />
        <p className="animate-pulse text-[#0F172A] font-black uppercase tracking-[0.3em] text-xs">
          Initializing Geospatial Engine...
        </p>
      </div>
    </div>
  )
});

function SpotlightCard({ children, className = "" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      className={`group relative overflow-hidden transition-all duration-300 ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 mix-blend-overlay z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.4),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

export default function Home() {
  const [coords, setCoords] = useState({ start: null, end: null });
  const [routes, setRoutes] = useState({ fast: [], green: [] });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const [isSearchingMobile, setIsSearchingMobile] = useState(true);

  const getAQIDetails = (level) => {
    const configs = {
      1: { label: "Good", range: "0-12 µg/m³", color: "text-[#059669]", bg: "bg-emerald-50/80 backdrop-blur-sm", border: "border-emerald-200" },
      2: { label: "Moderate", range: "12-35 µg/m³", color: "text-amber-600", bg: "bg-amber-50/80 backdrop-blur-sm", border: "border-amber-200" },
      3: { label: "Unhealthy (S)", range: "35-55 µg/m³", color: "text-orange-600", bg: "bg-orange-50/80 backdrop-blur-sm", border: "border-orange-200" },
      4: { label: "Unhealthy", range: "55-150 µg/m³", color: "text-red-600", bg: "bg-red-50/80 backdrop-blur-sm", border: "border-red-200" },
      5: { label: "Hazardous", range: "150+ µg/m³", color: "text-purple-600", bg: "bg-purple-50/80 backdrop-blur-sm", border: "border-purple-200" },
    };
    return configs[level] || { label: "Analyzing", range: "0-500 Scale", color: "text-[#64748B]", bg: "bg-white/80 backdrop-blur-sm", border: "border-[#E2E8F0]" };
  };

  const onRunAnalysis = async () => {
    if (!coords.start || !coords.end) return;
    setLoading(true);
    try {
      const result = await fetchFullAnalysis(coords.start, coords.end);
      setRoutes(result.paths);
      setData(result.vitals);
      setIsSearchingMobile(false);
      setShowMobileDetails(true);
    } catch (err) {
      console.error("Critical Engine Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateDelta = () => {
    if (!data) return "0.0";
    const green = parseFloat(data.distGreen) || 0;
    const fast = parseFloat(data.distFast) || 0;
    return (green - fast).toFixed(1);
  };

  const aqiInfo = getAQIDetails(data?.aqi);

  return (
    <div className="relative w-full h-[calc(100vh-64px)] mt-16 overflow-hidden bg-[#F1F5F9]">
      
      {/* 🌿 MAIN VIEWPORT (Map stays strictly in background) */}
      <main className="relative z-0 w-full h-full bg-[#F1F5F9] overflow-hidden">
        <IndiaMap routes={routes} />
      </main>

      {/* 🌿 DESKTOP FLOATING SIDEBAR */}
      <aside className="absolute top-0 left-0 hidden md:flex flex-col w-[420px] max-h-[calc(100vh-64px-3rem)] p-8 m-6 z-[100] overflow-y-auto bg-white/85 backdrop-blur-2xl rounded-[2.5rem] border border-white/50 shadow-[0_20px_80px_rgba(15,23,42,0.1)] pointer-events-auto">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-6 bg-[#059669]/10 w-max px-4 py-2 rounded-full border border-[#059669]/20 shadow-sm">
            <div className="w-2.5 h-2.5 bg-[#059669] rounded-full animate-pulse shadow-[0_0_10px_#059669]"></div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#059669]">Engine Ready</h2>
          </div>

          <div className="space-y-4">
            <MapSearch label="Departure" onLocationSelect={(c) => setCoords(p => ({ ...p, start: c }))} />
            <MapSearch label="Arrival" onLocationSelect={(c) => setCoords(p => ({ ...p, end: c }))} />
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRunAnalysis}
              disabled={loading}
              className="w-full relative overflow-hidden bg-[#0F172A] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-[0_10px_30px_rgba(15,23,42,0.2)] disabled:opacity-70 group"
            >
              {/* Premium Button Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10">{loading ? "Processing..." : "Execute Analysis"}</span>
            </motion.button>
          </div>
        </header>

        {/* Desktop Data Results */}
        <AnimatePresence mode="popLayout">
          {data && (
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.6, ease: "easeOut" }}
               className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <SpotlightCard className={`p-6 ${aqiInfo.bg} rounded-[2rem] border ${aqiInfo.border} shadow-sm`}>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${aqiInfo.color} mb-1`}>AQI Level {data.aqi}</p>
                  <p className="text-2xl font-black text-[#0F172A] leading-tight mb-2">{aqiInfo.label}</p>
                  <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">{aqiInfo.range}</p>
                </SpotlightCard>

                <SpotlightCard className="p-6 bg-blue-50/80 backdrop-blur-sm rounded-[2rem] border border-blue-200 shadow-sm flex flex-col justify-center">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Thermal</p>
                  <p className="text-3xl font-black text-blue-950 leading-tight">{data.temp}°C</p>
                </SpotlightCard>
              </div>

              <SpotlightCard className="p-8 bg-gradient-to-br from-[#059669] to-[#047857] text-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(5,150,105,0.4)] relative">
                <div className="relative z-10">
                  <p className="text-[10px] font-black uppercase text-emerald-100 mb-2 tracking-[0.2em]">Biophilic Density</p>
                  <p className="text-6xl font-black mb-6 tracking-tighter drop-shadow-md">{data.greenScore}%</p>
                  
                  <div className="h-2 bg-emerald-950/40 rounded-full overflow-hidden border border-emerald-400/30">
                    <motion.div 
                       initial={{ width: 0 }} 
                       animate={{ width: `${data.greenScore}%` }} 
                       transition={{ duration: 1.5, ease: "easeOut" }}
                       className="h-full bg-gradient-to-r from-emerald-400 to-white" 
                    />
                  </div>
                  
                  <div className="mt-6 flex justify-between items-center border-t border-emerald-400/30 pt-4">
                    <span className="text-[10px] font-black uppercase text-emerald-100 tracking-wider">Distance Delta</span>
                    <span className="text-xl font-black bg-white text-[#059669] px-3 py-1 rounded-lg shadow-sm">+{calculateDelta()} km</span>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>

      {/* 🌿 MOBILE OVERLAYS (Pointer events setup to interact over map) */}
      <div className="absolute inset-0 pointer-events-none z-[100] flex flex-col justify-between">
        
        {/* MOBILE: FLOATING SEARCH ENTRY */}
        <AnimatePresence>
          {isSearchingMobile && (
            <motion.div 
               initial={{ opacity: 0, y: -20, scale: 0.95 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: -20, scale: 0.95 }}
               className="md:hidden p-4 pointer-events-auto"
            >
              <div className="bg-white/90 backdrop-blur-2xl p-6 rounded-[2.5rem] shadow-[0_30px_60px_rgba(15,23,42,0.15)] border border-white">
                <div className="flex justify-center mb-5">
                  <span className="text-[10px] bg-[#F1F5F9] px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[#059669]">Configure Route</span>
                </div>
                <div className="space-y-4">
                  <MapSearch label="Departure" onLocationSelect={(c) => setCoords(p => ({ ...p, start: c }))} />
                  <MapSearch label="Arrival" onLocationSelect={(c) => setCoords(p => ({ ...p, end: c }))} />
                  <button onClick={onRunAnalysis} disabled={loading} className="w-full relative overflow-hidden bg-[#0F172A] text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all shadow-xl">
                    {loading ? "Calculating..." : "Find Eco Path"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MOBILE: NEW SEARCH CHICLET */}
        <AnimatePresence>
          {!isSearchingMobile && (
            <motion.button
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              onClick={() => setIsSearchingMobile(true)}
              className="md:hidden absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl px-6 py-3.5 rounded-full border border-white shadow-[0_15px_40px_rgba(15,23,42,0.15)] flex items-center gap-3 active:scale-95 transition-all pointer-events-auto"
            >
              <span className="w-2.5 h-2.5 bg-[#059669] rounded-full animate-pulse shadow-[0_0_10px_#059669]"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0F172A]">Modify</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* MOBILE: BOTTOM SHEET */}
        {data && (
          <div className={`md:hidden mt-auto bg-white/95 backdrop-blur-2xl border-t border-white shadow-[0_-20px_80px_rgba(15,23,42,0.15)] rounded-t-[3rem] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-auto ${showMobileDetails ? 'translate-y-0' : 'translate-y-[calc(100%-70px)]'}`}>
            <div className="w-full flex flex-col items-center py-4 cursor-pointer" onClick={() => setShowMobileDetails(!showMobileDetails)}>
              <div className="w-12 h-1.5 bg-[#CBD5E1] rounded-full mb-2" />
              <p className="text-[9px] font-black uppercase text-[#64748B] tracking-[0.3em]">{showMobileDetails ? 'Swipe Down' : 'Engine Vitals'}</p>
            </div>

            <div className="px-6 pb-10 space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-5 ${aqiInfo.bg} rounded-[2rem] border border-white shadow-sm`}>
                  <p className={`text-[8px] font-black uppercase tracking-widest ${aqiInfo.color} mb-1`}>AQI Level</p>
                  <p className="text-2xl font-black text-[#0F172A]">{aqiInfo.label}</p>
                </div>
                <div className="p-5 bg-blue-50/80 rounded-[2rem] border border-white shadow-sm flex flex-col justify-center">
                  <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest mb-1">Thermal</p>
                  <p className="text-2xl font-black text-blue-950">{data.temp}°C</p>
                </div>
              </div>
              <div className="p-8 bg-gradient-to-br from-[#059669] to-[#047857] text-white rounded-[2.5rem] relative overflow-hidden shadow-[0_15px_40px_rgba(5,150,105,0.4)]">
                <div className="flex justify-between items-end mb-5 relative z-10">
                  <div>
                    <p className="text-[9px] font-black uppercase text-emerald-100 tracking-widest mb-1">Biophilic</p>
                    <p className="text-5xl font-black drop-shadow-md">{data.greenScore}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black uppercase text-emerald-100 tracking-widest mb-1">Delta</p>
                    <p className="text-lg font-black bg-white text-[#059669] px-3 rounded-lg py-0.5 object-right">+{calculateDelta()}km</p>
                  </div>
                </div>
                <div className="h-2 bg-emerald-950/40 rounded-full overflow-hidden relative z-10">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-white" style={{ width: `${data.greenScore}%` }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 🌿 DESKTOP COMPARISON CARD */}
      <AnimatePresence>
        {data && (
          <motion.div 
             initial={{ opacity: 0, x: 40, scale: 0.9 }}
             animate={{ opacity: 1, x: 0, scale: 1 }}
             exit={{ opacity: 0, x: 40, scale: 0.9 }}
             transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
             className="hidden md:block absolute top-8 right-8 w-80 bg-white/85 backdrop-blur-2xl border border-white/60 p-8 rounded-[2.5rem] shadow-[0_20px_80px_rgba(15,23,42,0.12)] z-[1000]"
          >
            <header className="flex justify-between items-center mb-6">
              <p className="text-[10px] bg-[#059669]/10 px-3 py-1 rounded-full font-black text-[#059669] uppercase tracking-[0.3em]">Route Stats</p>
            </header>
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-[#F1F5F9] pb-4">
                 <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">Fast Path</span>
                 <span className="text-xl font-bold text-[#94A3B8] font-mono">{data.distFast}km</span>
              </div>
              <div className="flex justify-between items-end border-b border-[#F1F5F9] pb-4">
                 <span className="text-[10px] font-black text-[#059669] uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#059669] rounded-full" /> Breathe Path
                 </span>
                 <span className="text-2xl font-black text-[#059669] font-mono">{data.distGreen}km</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                 <span className="text-[10px] font-black text-[#0F172A] uppercase tracking-wider">Delta Variance</span>
                 <span className="text-3xl font-black text-[#0F172A] font-mono">+{calculateDelta()}km</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
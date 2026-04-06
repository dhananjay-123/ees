"use client";
import { useState } from 'react';
import dynamic from 'next/dynamic';
import MapSearch from '../components/UI/MapSearch';
import { fetchFullAnalysis } from '../services/RouteEngine';

const IndiaMap = dynamic(() => import('../components/Map/IndiaMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#F1F5F9] flex items-center justify-center">
      <p className="animate-pulse text-[#64748B] font-black uppercase tracking-[0.3em] text-[10px]">
        Initializing Geospatial Engine...
      </p>
    </div>
  )
});

export default function Home() {
  const [coords, setCoords] = useState({ start: null, end: null });
  const [routes, setRoutes] = useState({ fast: [], green: [] });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const [isSearchingMobile, setIsSearchingMobile] = useState(true);

  const getAQIDetails = (level) => {
    const configs = {
      1: { label: "Good", range: "0-12 µg/m³", color: "text-[#059669]", bg: "bg-emerald-50", border: "border-emerald-100" },
      2: { label: "Moderate", range: "12-35 µg/m³", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
      3: { label: "Unhealthy (S)", range: "35-55 µg/m³", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" },
      4: { label: "Unhealthy", range: "55-150 µg/m³", color: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
      5: { label: "Hazardous", range: "150+ µg/m³", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
    };
    return configs[level] || { label: "Analyzing", range: "0-500 Scale", color: "text-[#64748B]", bg: "bg-[#F8FAFC]", border: "border-[#E2E8F0]" };
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
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden bg-[#F1F5F9]">

      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-[400px] p-8 border-r border-[#E2E8F0] bg-white z-20 overflow-y-auto shadow-xl shrink-0">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-[#059669] rounded-full animate-pulse"></div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#64748B]">System Ready</h2>
          </div>

          <div className="space-y-3">
            <MapSearch label="Departure" onLocationSelect={(c) => setCoords(p => ({ ...p, start: c }))} />
            <MapSearch label="Arrival" onLocationSelect={(c) => setCoords(p => ({ ...p, end: c }))} />
            <button
              onClick={onRunAnalysis}
              disabled={loading}
              className="w-full bg-[#0F172A] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#059669] transition-all active:scale-95 shadow-lg"
            >
              {loading ? "Analyzing Vitals..." : "Execute Analysis"}
            </button>
          </div>
        </header>

        {/* Desktop Data Results */}
        {data && (
          <div className="space-y-4 animate-in fade-in slide-in-from-left-6 duration-700">
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-5 ${aqiInfo.bg} rounded-[2rem] border ${aqiInfo.border}`}>
                <p className={`text-[9px] font-black uppercase ${aqiInfo.color}`}>AQI Level {data.aqi}</p>
                <p className="text-xl font-black text-[#0F172A] leading-none mb-1">{aqiInfo.label}</p>
                <p className="text-[9px] font-bold text-[#64748B] italic">{aqiInfo.range}</p>
              </div>
              <div className="p-5 bg-blue-50 rounded-[2rem] border border-blue-100">
                <p className="text-[9px] font-black text-blue-600 uppercase">Thermal</p>
                <p className="text-2xl font-black text-blue-950 leading-none">{data.temp}°C</p>
              </div>
            </div>

            <div className="p-8 bg-[#059669] text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <p className="text-[10px] font-black uppercase opacity-40 mb-1 tracking-widest">Biophilic Density</p>
              <p className="text-5xl font-black mb-4 tracking-tighter">{data.greenScore}%</p>
              <div className="h-2 bg-emerald-900/50 rounded-full overflow-hidden border border-emerald-800">
                <div className="h-full bg-emerald-400" style={{ width: `${data.greenScore}%` }}></div>
              </div>
              <div className="mt-4 flex justify-between items-center border-t border-emerald-500/30 pt-4">
                <span className="text-[10px] font-black uppercase opacity-40">Distance Delta</span>
                <span className="text-xl font-black">+{calculateDelta()} km</span>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 relative bg-[#F1F5F9] overflow-hidden">
        <IndiaMap routes={routes} />

        {/* MOBILE: FLOATING SEARCH OVERLAY */}
        {isSearchingMobile && (
          <div className="md:hidden absolute inset-x-4 top-6 z-[1001] animate-in fade-in zoom-in duration-300">
            <div className="bg-white/95 backdrop-blur-xl p-5 rounded-[2.5rem] shadow-2xl border border-[#E2E8F0]">
              <p className="text-[9px] font-black uppercase tracking-widest text-[#64748B] mb-4 text-center">Configure Route</p>
              <div className="space-y-3">
                <MapSearch label="Departure" onLocationSelect={(c) => setCoords(p => ({ ...p, start: c }))} />
                <MapSearch label="Arrival" onLocationSelect={(c) => setCoords(p => ({ ...p, end: c }))} />
                <button onClick={onRunAnalysis} disabled={loading} className="w-full bg-[#0F172A] text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all">
                  {loading ? "Calculating..." : "Find Eco Path"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MOBILE: "NEW SEARCH" BUTTON */}
        {!isSearchingMobile && (
          <button
            onClick={() => setIsSearchingMobile(true)}
            className="md:hidden absolute top-6 left-1/2 -translate-x-1/2 z-[1001] bg-white px-6 py-3 rounded-full border border-[#E2E8F0] shadow-xl flex items-center gap-2 active:scale-95 transition-all"
          >
            <span className="w-2 h-2 bg-[#059669] rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#0F172A]">Modify Search</span>
          </button>
        )}

        {/* MOBILE: BOTTOM SHEET */}
        {data && (
          <div className={`md:hidden absolute bottom-0 left-0 right-0 z-[1002] bg-white rounded-t-[3rem] shadow-[0_-20px_60px_rgba(15,23,42,0.1)] transition-transform duration-700 ease-in-out ${showMobileDetails ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'}`}>
            <div className="w-full flex flex-col items-center py-5 cursor-pointer" onClick={() => setShowMobileDetails(!showMobileDetails)}>
              <div className={`transition-transform duration-500 ${showMobileDetails ? 'rotate-180' : 'rotate-0'}`}>
                <svg width="20" height="12" viewBox="0 0 20 12" fill="none" className="stroke-[#CBD5E1] stroke-[3px]"><path d="M2 10L10 2L18 10" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <p className="text-[8px] font-black uppercase text-[#64748B] tracking-[0.3em] mt-2">{showMobileDetails ? 'Hide Stats' : 'View Details'}</p>
            </div>

            <div className="px-8 pb-12 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-5 ${aqiInfo.bg} rounded-[2rem] border ${aqiInfo.border}`}>
                  <p className={`text-[8px] font-black uppercase ${aqiInfo.color}`}>AQI Level</p>
                  <p className="text-xl font-black text-[#0F172A]">{aqiInfo.label}</p>
                </div>
                <div className="p-5 bg-blue-50 rounded-[2rem] border border-blue-100">
                  <p className="text-[8px] font-black text-blue-600 uppercase">Thermal</p>
                  <p className="text-xl font-black text-blue-950">{data.temp}°C</p>
                </div>
              </div>
              <div className="p-8 bg-[#059669] text-white rounded-[2.5rem] relative overflow-hidden shadow-lg shadow-emerald-900/20">
                <div className="flex justify-between items-end mb-4">
                  <div><p className="text-[9px] font-black uppercase opacity-40">Biophilic Score</p><p className="text-4xl font-black">{data.greenScore}%</p></div>
                  <div className="text-right"><p className="text-[9px] font-black uppercase opacity-40">Delta</p><p className="text-xl font-black">+{calculateDelta()}km</p></div>
                </div>
                <div className="h-1.5 bg-emerald-900/50 rounded-full overflow-hidden"><div className="h-full bg-emerald-400" style={{ width: `${data.greenScore}%` }}></div></div>
              </div>
            </div>
          </div>
        )}

        {/* DESKTOP COMPARISON CARD */}
        {data && (
          <div className="hidden md:block absolute top-8 right-8 w-80 bg-white/80 backdrop-blur-2xl border border-[#E2E8F0] p-8 rounded-[2.5rem] shadow-2xl z-[1000] animate-in slide-in-from-right-8">
            <header className="flex justify-between items-center mb-6 border-b border-[#F1F5F9] pb-4">
              <p className="text-[10px] font-black text-[#059669] uppercase tracking-[0.4em]">Comparison</p>
            </header>
            <div className="space-y-6">
              <div className="flex justify-between items-end"><span className="text-[9px] font-black text-[#CBD5E1] uppercase">Fast Path</span><span className="text-xl font-black text-[#CBD5E1] italic">{data.distFast}km</span></div>
              <div className="flex justify-between items-end border-b border-[#F1F5F9] pb-6"><span className="text-[9px] font-black text-[#059669] uppercase tracking-widest">BREATHE Path</span><span className="text-2xl font-black text-[#059669]">{data.distGreen}km</span></div>
              <div className="flex justify-between items-center"><span className="text-[10px] font-black text-[#0F172A] uppercase">Delta</span><span className="text-3xl font-black text-[#0F172A]">+{calculateDelta()}km</span></div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
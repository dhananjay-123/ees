"use client";
import { useState, useEffect } from 'react';

const MapSearch = ({ label, onLocationSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const searchPlaces = async () => {
      if (query.length < 3) return setResults([]);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=in&limit=5`);
        const data = await res.json();
        setResults(data);
      } catch (err) { console.error(err); }
    };
    const debounce = setTimeout(searchPlaces, 400);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="relative w-full mb-4 text-slate-900">
      <label className="text-[10px] font-bold text-emerald-600 uppercase mb-1 block tracking-widest">
        {label}
      </label>
      <input
        type="text"
        className="w-full bg-white border border-slate-200 p-3 rounded-xl text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm placeholder:text-slate-400"
        placeholder="Search locality..."
        value={query}
        onFocus={() => setIsFocused(true)}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* FIXED SUGGESTIONS DROPDOWN */}
      {isFocused && results.length > 0 && (
        <ul className="absolute z-[2000] w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden ring-1 ring-black ring-opacity-5">
          {results.map((place) => (
            <li 
              key={place.place_id} 
              className="p-4 hover:bg-slate-50 cursor-pointer text-sm border-b border-slate-100 last:border-none flex items-start gap-3 transition-colors"
              onClick={() => { 
                setQuery(place.display_name); 
                onLocationSelect([parseFloat(place.lat), parseFloat(place.lon)]); 
                setIsFocused(false); 
              }}
            >
              <span className="text-emerald-500">📍</span>
              <span className="text-slate-700 leading-tight">{place.display_name}</span>
            </li>
          ))}
        </ul>
      )}
      
      {/* Click outside to close dropdown */}
      {isFocused && (
        <div 
          className="fixed inset-0 z-[1999]" 
          onClick={() => setIsFocused(false)}
        />
      )}
    </div>
  );
};

export default MapSearch;
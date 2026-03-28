"use client";
import { useState, useEffect } from 'react';

const SearchBar = ({ placeholder, onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }

      // Nominatim Free Search API - limited to India for accuracy
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=in&limit=5`
      );
      const data = await res.json();
      setSuggestions(data);
      setShowDropdown(true);
    };

    const timeoutId = setTimeout(fetchSuggestions, 500); // Debounce to save API hits
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-800 p-4 rounded-xl border border-slate-700 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
      />

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-[1000] w-full mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setQuery(item.display_name);
                onSelect(item.lat, item.lon);
                setShowDropdown(false);
              }}
              className="p-4 hover:bg-emerald-600 cursor-pointer text-sm border-b border-slate-800 last:border-none transition-colors"
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
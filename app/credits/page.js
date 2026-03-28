export default function CreditsPage() {
  const stack = [
    { name: "Next.js", type: "Framework", use: "App Router & SSR" },
    { name: "Leaflet", type: "Map Engine", use: "Path Rendering" },
    { name: "Geoapify", type: "Routing", use: "Pathfinding APIs" },
    { name: "OpenWeather", type: "Vitals", use: "AQI & Weather Data" }
  ];

  return (
    <div className="max-w-4xl mx-auto py-20 px-10 text-center">
      <h1 className="text-4xl font-black mb-16">The AeroGradient Stack</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stack.map((s, i) => (
          <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-black text-emerald-600 uppercase mb-2">{s.type}</p>
            <h3 className="font-bold text-lg mb-1">{s.name}</h3>
            <p className="text-[10px] text-slate-400 font-medium">{s.use}</p>
          </div>
        ))}
      </div>
      <div className="mt-20 p-10 border border-dashed border-slate-200 rounded-[3rem]">
        <p className="text-sm font-medium text-slate-500 italic">"Designed to bridge the gap between navigation and environmental health."</p>
      </div>
    </div>
  );
}
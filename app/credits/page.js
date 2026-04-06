"use client";
import React from 'react';

export default function CreditsPage() {
  const stack = [
    { name: "Next.js", type: "Framework", use: "App Router & SSR" },
    { name: "Leaflet", type: "Map Engine", use: "Path Rendering" },
    { name: "Geoapify", type: "Routing", use: "Pathfinding APIs" },
    { name: "OpenWeather", type: "Vitals", use: "AQI & Weather Data" }
  ];

  const team = [
    { name: "Dhananjay Agrawal", roll: "2025IMT026" },
    { name: "Eshan Thete", roll: "2025IMT028" },
    { name: "Harshit Gupta", roll: "2025IMT032" },
    { name: "Lavyansh Kushwah", roll: "2025IMT040" },
    { name: "Nikit Waghmode", roll: "2025IMT088" },
    { name: "Yash Agrawal", roll: "2025IMT089" },
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] transition-colors duration-500">
      <div className="max-w-6xl mx-auto py-12 md:py-24 px-6 md:px-10 text-center">

        {/* Tech Stack Section */}
        <section className="mb-24 md:mb-32">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#059669] mb-4">Core Architecture</h2>
          <h1 className="text-3xl md:text-5xl font-black mb-12 md:mb-16 tracking-tighter text-[#0F172A]">The BREATHEPATH Stack</h1>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stack.map((s, i) => (
              <div key={i} className="p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl border border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-xl hover:shadow-[#0F172A]/5 transition-all duration-500">
                <p className="text-[9px] md:text-[10px] font-black text-[#059669] uppercase mb-2 md:mb-3 tracking-widest">{s.type}</p>
                <h3 className="font-bold text-base md:text-xl mb-1 text-[#0F172A]">{s.name}</h3>
                <p className="text-[9px] md:text-[10px] text-[#64748B] font-medium uppercase tracking-tighter">{s.use}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Members Section */}
        <section className="mb-24">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#059669] mb-4">The Development Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <div key={i} className="group p-6 md:p-10 bg-white border border-[#E2E8F0] rounded-[2rem] hover:border-[#059669] transition-all relative overflow-hidden">


                <h3 className="font-black text-[#0F172A] text-sm md:text-lg mb-1 relative z-10">{member.name}</h3>
                <p className="text-[10px] md:text-xs font-bold text-[#64748B] tracking-widest uppercase relative z-10">
                  Roll: <span className="text-[#059669]">{member.roll}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy Footer */}
        <div className="mt-20 p-8 md:p-16 border border-dashed border-[#CBD5E1] rounded-[2.5rem] md:rounded-[4rem] max-w-3xl mx-auto bg-white/50">
          <p className="text-xs md:text-sm font-bold text-[#64748B] uppercase tracking-[0.2em] mb-4">Project Philosophy</p>
          <p className="text-base md:text-xl font-medium text-[#0F172A] italic leading-relaxed">
            "Designed to bridge the gap between navigation and environmental health, prioritizing human well-being in the urban landscape."
          </p>
        </div>

        <footer className="mt-20 opacity-40">
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#64748B]">BREATHEPATH &copy; 2026</p>
        </footer>
      </div>
    </div>
  );
}
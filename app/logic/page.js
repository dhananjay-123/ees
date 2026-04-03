"use client";
import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const LogicPage = () => {
  const technicalSections = [
    {
      index: "01",
      title: "Biophilic Cost Weighting",
      concept: "Modified A* Search Algorithm",
      description: "Standard GPS routing minimizes for Time (T). AeroGradient redefines the graph edge weight (w) by introducing a Biophilic Coefficient (G).",
      formula: "C = \\sum_{i=1}^{n} d_i \\times (1 - (G_i \\times \\phi))",
      variables: [
        { symbol: "C", desc: "Total weighted route cost" },
        { symbol: "d_i", desc: "Physical distance of segment i" },
        { symbol: "G_i", desc: "Greenery density (0 to 1) via OSM tags" },
        { symbol: "\\phi", desc: "Optimization constant (fixed at 0.40)" }
      ],
      insight: "When G=1, the perceived length of a road is reduced by 40%, forcing the pathfinder to prioritize green corridors."
    },
    {
      index: "02",
      title: "Atmospheric Vitals Indexing",
      concept: "Linear Interpolation of PM2.5",
      description: "We convert raw mass concentration (Cp) into a human-readable Air Quality Index (AQI) based on EPA-regulated breakpoints.",
      formula: "I_p = \\frac{I_{high} - I_{low}}{BP_{high} - BP_{low}} (C_p - BP_{low}) + I_{low}",
      variables: [
        { symbol: "I_p", desc: "Final calculated Pollutant Index" },
        { symbol: "C_p", desc: "Truncated concentration of pollutant p" },
        { symbol: "BP", desc: "Concentration breakpoints (High/Low)" },
        { symbol: "I", desc: "AQI category breakpoints (High/Low)" }
      ],
      insight: "This normalizes varying pollutant concentrations into a standard 1-5 health safety scale."
    },
    {
      index: "03",
      title: "Adaptive Fallback Logic",
      concept: "Conditional Mode Switching",
      description: "To handle the 300km limit of the bicycle routing API, we implement a piecewise logic gate.",
      formula: "f(d) = \\begin{cases} \\text{Bicycle} & d \\leq 300\\text{km} \\\\ \\text{Drive} & d > 300\\text{km} \\end{cases}",
      variables: [
        { symbol: "d", desc: "Geodesic distance between waypoints" },
        { symbol: "f(d)", desc: "Selected routing profile" }
      ],
      insight: "This ensures 100% uptime for long-distance travel while maintaining environmental analysis."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#0F172A] px-6 py-12 md:py-20 md:px-24">
      <header className="max-w-4xl mb-16 md:mb-24">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 md:mb-8 italic text-[#0F172A]">
          Technical <span className="text-[#059669] underline decoration-[#CBD5E1]">Logic</span>.
        </h1>
        <p className="text-lg md:text-xl text-[#64748B] font-medium leading-relaxed max-w-2xl">
          Detailed mathematical foundations of the AeroGradient engine.
        </p>
      </header>

      <div className="space-y-16 md:space-y-32">
        {technicalSections.map((section) => (
          <section key={section.index} className="grid lg:grid-cols-12 gap-8 md:gap-12 border-t border-[#E2E8F0] pt-10 md:pt-16">
            <div className="lg:col-span-4">
              <span className="text-4xl md:text-6xl font-black text-[#CBD5E1] block mb-2 md:mb-4">{section.index}</span>
              <h2 className="text-xl md:text-2xl font-black tracking-tight mb-2 uppercase text-[#0F172A]">{section.title}</h2>
              <p className="text-[10px] md:text-xs font-bold text-[#059669] uppercase tracking-widest">{section.concept}</p>
            </div>

            <div className="lg:col-span-8 space-y-6 md:space-y-8">
              <p className="text-base md:text-lg text-[#64748B] leading-relaxed">{section.description}</p>
              
              <div className="p-6 md:p-10 bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-[#E2E8F0] shadow-sm">
                <div className="text-xl md:text-3xl text-[#0F172A] mb-6 md:mb-10 overflow-x-auto py-4 scrollbar-hide">
                  <BlockMath math={section.formula} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 pt-6 md:pt-8 border-t border-[#F1F5F9]">
                  {section.variables.map((v, i) => (
                    <div key={i} className="flex gap-4 text-[10px] md:text-xs items-center">
                      <span className="font-black text-[#059669] min-w-[45px] md:min-w-[50px] bg-[#F1F5F9] p-1 rounded text-center border border-[#E2E8F0]">
                        <InlineMath math={v.symbol} />
                      </span>
                      <span className="text-[#64748B] font-medium uppercase tracking-tight">{v.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 md:p-6 bg-[#059669]/5 rounded-xl md:rounded-2xl border border-[#059669]/10 flex gap-4 items-center">
                <div className="shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#059669] flex items-center justify-center text-[8px] md:text-[10px] text-white font-black italic">i</div>
                <p className="text-[10px] md:text-[11px] font-black text-[#059669] leading-relaxed uppercase tracking-tighter">
                  System Insight: {section.insight}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-24 md:mt-40 text-center opacity-40 transition-opacity">
        <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.5em] text-[#64748B]">AeroGradient Mathematical Framework &copy; 2026</p>
      </footer>
    </div>
  );
};

export default LogicPage;
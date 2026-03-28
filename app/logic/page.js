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
    <div className="min-h-screen bg-white text-slate-900 px-6 py-20 lg:px-24">
      <header className="max-w-4xl mb-24">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12 bg-emerald-600"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-600">Computation v2.6.0</span>
        </div>
        <h1 className="text-7xl font-black tracking-tighter mb-8 italic">
          Technical <span className="text-emerald-600 underline decoration-slate-100">Logic</span>.
        </h1>
        <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
          Detailed mathematical foundations of the AeroGradient engine.
        </p>
      </header>

      <div className="space-y-32">
        {technicalSections.map((section) => (
          <section key={section.index} className="grid lg:grid-cols-12 gap-12 border-t border-slate-100 pt-16">
            <div className="lg:col-span-4">
              <span className="text-6xl font-black text-slate-50 block mb-4">{section.index}</span>
              <h2 className="text-2xl font-black tracking-tight mb-2 uppercase">{section.title}</h2>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{section.concept}</p>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <p className="text-lg text-slate-600 leading-relaxed">{section.description}</p>
              
              <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner">
                <div className="text-3xl text-slate-800 mb-10 overflow-x-auto py-4">
                  <BlockMath math={section.formula} />
                </div>
                
                <div className="grid md:grid-cols-2 gap-y-4 gap-x-8 pt-8 border-t border-slate-200">
                  {section.variables.map((v, i) => (
                    <div key={i} className="flex gap-4 text-xs items-center">
                      <span className="font-black text-emerald-600 min-w-[50px] bg-white p-1 rounded text-center border border-slate-100">
                        <InlineMath math={v.symbol} />
                      </span>
                      <span className="text-slate-500 font-medium uppercase tracking-tight">{v.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-4 items-center">
                <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] text-white font-black italic">i</div>
                <p className="text-[11px] font-black text-emerald-800 leading-relaxed uppercase tracking-tighter">
                  System Insight: {section.insight}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-40 text-center opacity-20 hover:opacity-100 transition-opacity">
        <p className="text-[9px] font-black uppercase tracking-[0.5em]">AeroGradient Mathematical Framework &copy; 2026</p>
      </footer>
    </div>
  );
};

export default LogicPage;
"use client";
import React, { useRef } from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";

function SpotlightCard({ children }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative rounded-[2rem] border border-[#E2E8F0] bg-white overflow-hidden shadow-sm"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(5, 150, 105, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative p-6 md:p-10">{children}</div>
    </div>
  );
}

const LogicPage = () => {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const technicalSections = [
    {
      index: "01",
      title: "Biophilic Cost Weighting",
      concept: "Modified A* Search Algorithm",
      description:
        "Standard GPS routing minimizes for Time (T). BREATHEPATH redefines the graph edge weight (w) by introducing a Biophilic Coefficient (G).",
      formula:
        "C = \\sum_{i=1}^{n} d_i \\times (1 - (G_i \\times \\phi))",
      variables: [
        { symbol: "C", desc: "Total weighted route cost" },
        { symbol: "d_i", desc: "Physical distance of segment i" },
        { symbol: "G_i", desc: "Greenery density (0 to 1) via OSM tags" },
        { symbol: "\\phi", desc: "Optimization constant (fixed at 0.40)" }
      ],
      insight:
        "When G=1, the perceived length of a road is reduced by 40%, forcing the pathfinder to prioritize green corridors."
    },
    {
      index: "02",
      title: "Atmospheric Vitals Indexing",
      concept: "Linear Interpolation of PM2.5",
      description:
        "We convert raw mass concentration (Cp) into a human-readable Air Quality Index (AQI) based on EPA-regulated breakpoints.",
      formula:
        "I_p = \\frac{I_{high} - I_{low}}{BP_{high} - BP_{low}} (C_p - BP_{low}) + I_{low}",
      variables: [
        { symbol: "I_p", desc: "Final calculated Pollutant Index" },
        { symbol: "C_p", desc: "Truncated concentration of pollutant p" },
        { symbol: "BP", desc: "Concentration breakpoints (High/Low)" },
        { symbol: "I", desc: "AQI category breakpoints (High/Low)" }
      ],
      insight:
        "This normalizes varying pollutant concentrations into a standard 1-5 health safety scale."
    },
    {
      index: "03",
      title: "Adaptive Fallback Logic",
      concept: "Conditional Mode Switching",
      description:
        "To handle the 300km limit of the bicycle routing API, we implement a piecewise logic gate.",
      formula:
        "f(d) = \\begin{cases} \\text{Bicycle} & d \\leq 300\\text{km} \\\\ \\text{Drive} & d > 300\\text{km} \\end{cases}",
      variables: [
        { symbol: "d", desc: "Geodesic distance between waypoints" },
        { symbol: "f(d)", desc: "Selected routing profile" }
      ],
      insight:
        "This ensures 100% uptime for long-distance travel while maintaining environmental analysis."
    }
  ];

  const fadeLeft = {
    hidden: { opacity: 0, x: -60, skewX: 5 },
    show: { opacity: 1, x: 0, skewX: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 60, skewX: -5 },
    show: { opacity: 1, x: 0, skewX: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="relative bg-[#F1F5F9] min-h-[100dvh] overflow-hidden text-[#0F172A]">
      
      {/* 🌿 ANIMATED PREMIUM BACKGROUND */}
      <motion.div 
        className="fixed inset-0 pointer-events-none opacity-30 mix-blend-multiply z-0"
        style={{
          backgroundImage: `radial-gradient(#059669 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          y: yBg,
        }}
      />
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#F1F5F9]/50 to-[#F1F5F9] z-0" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 md:py-40 md:px-12 lg:px-24">
        
        {/* Header */}
        <motion.header
          className="max-w-4xl mb-24 md:mb-32 relative"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div 
             className="absolute -left-10 -top-10 w-40 h-40 bg-[#059669]/20 rounded-full blur-3xl pointer-events-none"
             animate={{ scale: [1, 1.2, 1] }} 
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <h1 className="text-6xl md:text-[6rem] font-black tracking-tighter mb-6 md:mb-8 italic leading-[0.9]">
            Technical <br/>
            <span className="relative text-[#059669]">
              Logic.
              <svg className="absolute w-full h-[0.3em] -bottom-2 left-0 text-[#059669]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#64748B] font-medium leading-relaxed max-w-2xl">
            Detailed mathematical foundations of the BREATHEPATH engine. Hover over the formulas to reveal deep insight layers.
          </p>
        </motion.header>

        <div className="space-y-24 md:space-y-48">
          {technicalSections.map((section, idx) => (
            <motion.section
              key={section.index}
              className="grid lg:grid-cols-12 gap-12 lg:gap-20 relative group"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              
              {/* Massive faded background number */}
              <div className="absolute top-0 right-0 text-[15rem] leading-none font-black text-[#059669]/5 pointer-events-none z-[-1] select-none -translate-y-1/4 transition-transform duration-700 group-hover:scale-110">
                 {section.index}
              </div>

              {/* LEFT SIDE */}
              <motion.div className="lg:col-span-4 flex flex-col justify-center" variants={fadeLeft}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-12 h-1 bg-[#059669] rounded-full" />
                  <span className="text-lg md:text-xl font-black text-[#059669] tracking-[0.3em]">
                    {section.index}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 uppercase leading-none">
                  {section.title}
                </h2>
                <div className="inline-block px-4 py-2 bg-[#0F172A] text-white text-xs font-black uppercase tracking-widest rounded-lg mb-6 shadow-xl shadow-[#0F172A]/20">
                  {section.concept}
                </div>
                <p className="text-lg text-[#64748B] leading-relaxed mb-8">
                  {section.description}
                </p>
              </motion.div>

              {/* RIGHT SIDE */}
              <motion.div className="lg:col-span-8 flex flex-col gap-8" variants={fadeRight}>
                
                {/* SPOTLIGHT FORMULA CARD */}
                <motion.div
                   whileHover={{ scale: 1.02, rotateY: -2, rotateX: 2 }}
                   transition={{ type: "spring", stiffness: 400, damping: 30 }}
                   className="perspective-1000"
                >
                  <SpotlightCard>
                    <div className="text-lg md:text-3xl mb-8 md:mb-12 overflow-x-auto py-6 select-all font-serif">
                      <BlockMath math={section.formula} />
                    </div>

                    {/* VARIABLES */}
                    <motion.div
                      className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 pt-8 border-t border-[#F1F5F9]"
                      variants={stagger}
                    >
                      {section.variables.map((v, i) => (
                        <motion.div key={i} variants={fadeRight} className="flex gap-4 items-center group/var cursor-default">
                          <span className="font-black text-[#059669] min-w-[56px] min-h-[40px] bg-[#059669]/10 rounded-xl flex items-center justify-center transition duration-300 group-hover/var:bg-[#059669] group-hover/var:text-white">
                            <InlineMath math={v.symbol} />
                          </span>
                          <span className="text-[#64748B] text-xs font-bold uppercase tracking-tight transition duration-300 group-hover/var:text-[#0F172A]">
                            {v.desc}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </SpotlightCard>
                </motion.div>

                {/* INSIGHT */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative p-6 md:p-8 bg-gradient-to-r from-[#059669]/10 to-[#D1FAE5]/10 rounded-2xl border border-[#059669]/20 flex gap-6 items-center overflow-hidden hover:border-[#059669]/50 transition duration-500 shadow-sm"
                >
                  {/* Subtle sweep animation inside insight box */}
                  <motion.div 
                     className="absolute inset-0 bg-gradient-to-r from-transparent via-[#059669]/5 to-transparent w-[200%] mix-blend-overlay pointer-events-none"
                     animate={{ x: ["-100%", "100%"] }}
                     transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#059669] flex items-center justify-center shadow-lg shadow-[#059669]/30">
                    <span className="text-lg text-white font-black italic select-none">i</span>
                  </div>
                  <p className="relative z-10 text-xs md:text-sm font-black text-[#022c22] uppercase tracking-wider leading-relaxed">
                    <span className="text-[#059669] block mb-1">System Insight //</span>
                    {section.insight}
                  </p>
                </motion.div>
              </motion.div>

            </motion.section>
          ))}
        </div>

        {/* FOOTER */}
        <motion.footer
          className="mt-32 md:mt-48 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#CBD5E1] to-transparent mx-auto mb-8" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#94A3B8] transition duration-300 hover:text-[#059669]">
            BREATHEPATH Mathematical Framework &copy; 2026
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default LogicPage;
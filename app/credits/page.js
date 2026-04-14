"use client";
import React from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";

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
      whileHover={{ y: -4, scale: 1.02 }}
      className={`group relative rounded-[2rem] border border-[#E2E8F0] bg-white overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-lg ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(5, 150, 105, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative p-6 md:p-8 z-10">{children}</div>
    </motion.div>
  );
}

export default function CreditsPage() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

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

  const fadeUp = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const stagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <div className="relative bg-[#F1F5F9] min-h-[100dvh] overflow-hidden text-[#0F172A] pb-24 pt-32 md:pt-40">
      
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 text-center">

        {/* Tech Stack */}
        <motion.section
          className="mb-24 md:mb-40 relative group"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Massive Background Text */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[8rem] sm:text-[12rem] md:text-[18rem] leading-none font-black text-[#059669]/5 pointer-events-none z-[-1] select-none -translate-y-1/3 transition-transform duration-700 group-hover:scale-105">
             STACK
          </div>

          <motion.h2 className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-[#059669] mb-4" variants={fadeUp}>
            Core Architecture
          </motion.h2>

          <motion.h1 className="text-4xl md:text-6xl font-black mb-12 md:mb-16 tracking-tighter text-[#0F172A]" variants={fadeUp}>
            The BREATHEPATH Stack
          </motion.h1>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {stack.map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="perspective-1000">
                <SpotlightCard className="h-full text-left sm:text-center md:text-left flex flex-col justify-center">
                  <p className="inline-block px-2 py-1 bg-[#059669]/10 text-[9px] md:text-[10px] font-black text-[#059669] rounded uppercase mb-3 tracking-widest w-max sm:mx-auto md:mx-0">
                    {s.type}
                  </p>
                  <h3 className="font-bold text-xl md:text-2xl mb-1 text-[#0F172A]">
                    {s.name}
                  </h3>
                  <p className="text-[10px] md:text-[11px] text-[#64748B] font-bold uppercase tracking-tight">
                    {s.use}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Team */}
        <motion.section
          className="mb-24 relative group"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Massive Background Text */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[8rem] sm:text-[12rem] md:text-[18rem] leading-none font-black text-[#059669]/5 pointer-events-none z-[-1] select-none -translate-y-1/3 transition-transform duration-700 group-hover:scale-105">
             TEAM
          </div>

          <motion.h2 className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-[#059669] mb-4" variants={fadeUp}>
            The Development Team
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {team.map((member, i) => (
              <motion.div key={i} variants={fadeUp} className="perspective-1000">
                <SpotlightCard>
                  <h3 className="font-black text-[#0F172A] text-lg md:text-xl mb-2">
                    {member.name}
                  </h3>
                  <div className="mx-auto w-max px-3 py-1 bg-[#F1F5F9] rounded-lg">
                    <p className="text-[10px] md:text-xs font-bold text-[#64748B] tracking-widest uppercase flex gap-2">
                      Roll: <span className="text-[#059669]">{member.roll}</span>
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Philosophy */}
        <motion.div
          className="mt-20 md:mt-32 p-8 md:p-16 border border-dashed border-[#CBD5E1] rounded-[2.5rem] md:rounded-[4rem] max-w-3xl mx-auto bg-white/50 relative overflow-hidden group"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Light sweep hover effect */}
          <motion.div 
             className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 mix-blend-overlay transition duration-700"
             animate={{ x: ["-100%", "100%"] }}
             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          <p className="text-xs md:text-sm font-bold text-[#64748B] uppercase tracking-[0.2em] mb-6 inline-block bg-white px-4 py-2 border border-[#E2E8F0] shadow-sm rounded-full">
            Project Philosophy
          </p>
          <p className="text-lg md:text-2xl font-medium text-[#0F172A] italic leading-relaxed">
            "Designed to bridge the gap between navigation and environmental health, prioritizing human well-being in the urban landscape."
          </p>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-24 md:mt-32"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#CBD5E1] to-transparent mx-auto mb-8" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#64748B] transition duration-300 hover:text-[#059669]">
            BREATHEPATH &copy; 2026
          </p>
        </motion.footer>

      </div>
    </div>
  );
}
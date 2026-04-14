"use client";

import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[6000] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* DEEP PREMIUM BACKGROUND */}
      <div className="absolute inset-0 bg-[#022c22]" />

      {/* 🌿 CONCENTRIC GLOWING RINGS */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border border-[#059669]/30 rounded-full"
          style={{ width: `${(i + 1) * 30}vw`, height: `${(i + 1) * 30}vw` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 - i * 0.2 }}
          transition={{
            duration: 1.5,
            delay: i * 0.2,
            ease: "easeOut",
          }}
        />
      ))}

      {/* 🌿 CENTER LOGO (HUGE) */}
      <motion.div
        initial={{ scale: 0, rotate: -15, opacity: 0, y: 50 }}
        animate={{ scale: 1, rotate: 0, opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: 0.2,
        }}
        className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 bg-white p-8 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_100px_rgba(5,150,105,0.6)] overflow-hidden"
      >
        {/* SHIMMER GLARE inside logo box */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-80 mix-blend-overlay z-20"
          initial={{ x: "-200%", skewX: "-20deg" }}
          animate={{ x: "200%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        
        <img src="/logo.webp" className="relative z-10 w-full h-full object-contain" />
      </motion.div>
    </motion.div>
  );
}
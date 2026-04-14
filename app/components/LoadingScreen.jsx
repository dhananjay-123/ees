"use client";

import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[5000] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ backdropFilter: "blur(6px)" }}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[#F1F5F9]" />

      {/* 🌿 GRADIENT SWEEP */}
      <motion.div
        className="absolute inset-0"
        initial={{ x: "-40%" }}
        animate={{ x: "40%" }}
        transition={{
          duration: 0.9,
          ease: [0.25, 0.8, 0.25, 1],
        }}
        style={{
          background:
            "linear-gradient(120deg, transparent, #D1FAE5, transparent)",
          opacity: 0.6,
        }}
      />

      {/* 🌿 CENTER LOGO */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="relative z-10 w-12 h-12 bg-[#059669] rounded-xl flex items-center justify-center shadow-lg"
      >
        <img src="/logo.webp" className="w-full h-full object-contain" />
      </motion.div>
    </motion.div>
  );
}
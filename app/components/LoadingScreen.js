"use client";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[3000] bg-[#F1F5F9] flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* 🔥 SHARED LOGO */}
      <motion.div
        layoutId="app-logo"
        className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl"
      >
        <img src="/logo.webp" className="w-16 h-16 object-contain" />
      </motion.div>
    </motion.div>
  );
}
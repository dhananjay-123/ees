"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTransition } from "./TransitionProvider";

export default function PageTransition() {
  const { isTransitioning } = useTransition();

  const columns = 10;
  const rows = 10;
  const blocks = Array.from({ length: columns * rows });

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div 
          className="fixed inset-0 z-[5000] grid pointer-events-none"
          style={{ 
            gridTemplateColumns: `repeat(${columns}, 1fr)`, 
            gridTemplateRows: `repeat(${rows}, 1fr)` 
          }}
        >
          {blocks.map((_, i) => {
            const col = i % columns;
            const row = Math.floor(i / columns);
            
            // Creates a cascading diamond/ripple delay pattern from center
            const delay = (Math.abs(col - 4.5) * 0.03) + (Math.abs(row - 4.5) * 0.03);

            return (
              <motion.div
                key={i}
                className="bg-[#059669] w-full h-full"
                style={{
                  border: "1px solid rgba(255,255,255,0.03)" // faint tech grid lines
                }}
                initial={{ opacity: 0, scale: 0, borderRadius: "50%" }}
                animate={{ opacity: 1, scale: 1.05, borderRadius: "0%" }}
                exit={{ opacity: 0, scale: 0, borderRadius: "50%" }}
                transition={{
                  duration: 0.5,
                  delay: delay,
                  ease: "circInOut", 
                }}
              />
            );
          })}
          
          {/* Central Animated Logo (HUGE) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5001]"
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.5, rotate: 90 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "backOut" }}
          >
             <div className="relative w-36 h-36 sm:w-48 sm:h-48 bg-white p-6 rounded-[2rem] shadow-[0_0_80px_rgba(5,150,105,0.8)] flex items-center justify-center overflow-hidden">
                 {/* SHIMMER GLARE */}
                 <motion.div
                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-80 mix-blend-overlay z-20"
                   initial={{ x: "-200%", skewX: "-20deg" }}
                   animate={{ x: "200%" }}
                   transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                 />
                 <img src="/logo.webp" className="relative z-10 w-full h-full object-contain" />
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
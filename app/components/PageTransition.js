"use client";

import { motion } from "framer-motion";
import { useTransition } from "./TransitionProvider";

export default function PageTransition() {
  const { isTransitioning } = useTransition();

  if (!isTransitioning) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[5000] bg-[#F1F5F9]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.8, 0.25, 1],
      }}
    />
  );
}
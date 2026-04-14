"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{
        opacity: 0,
        y: 6,
        scale: 0.995,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.28,
        ease: [0.25, 0.8, 0.25, 1], // smooth, not dramatic
      }}
    >
      {children}
    </motion.div>
  );
}
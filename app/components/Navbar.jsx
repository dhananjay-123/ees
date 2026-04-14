"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useTransition } from "./TransitionProvider";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const { setIsTransitioning } = useTransition();

  const links = [
    { name: "Navigator", href: "/" },
    { name: "Technical Logic", href: "/logic" },
    { name: "Credits", href: "/credits" },
  ];

  const handleNav = (href) => {
    if (href === pathname) return;

    setIsOpen(false);
    setIsTransitioning(true);

    // 🔥 SHOW transition FIRST
    setTimeout(() => {
      router.push(href);

      // 🔥 HOLD AFTER navigation (to allow page to mount before exit)
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 700); // 👈 Waited for grid cells to ripple in
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full h-16 bg-[#F1F5F9]/70 backdrop-blur-xl border-b border-[#E2E8F0] z-[2000] px-6 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <motion.div
            layoutId="app-logo"
            className="w-8 h-8 bg-[#059669] rounded-lg flex items-center justify-center"
          >
            <img src="/logo.webp" className="w-full h-full object-contain" />
          </motion.div>

          <span className="font-black text-xl italic uppercase">
            BREATHE<span className="text-[#059669]">PATH</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex gap-10">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className={`text-[10px] font-bold uppercase tracking-[0.2em] transition ${
                pathname === link.href
                  ? "text-[#059669]"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="sm:hidden p-2 rounded-xl active:scale-90 transition"
        >
          <Menu size={20} />
        </button>
      </nav>

      {/* 🔥 MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-md z-[1998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* PANEL */}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100) setIsOpen(false);
              }}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="fixed bottom-0 left-0 w-full h-[75vh] bg-white/80 backdrop-blur-2xl border-t border-[#E2E8F0] rounded-t-[2.5rem] z-[1999] p-8 flex flex-col"
            >
              {/* HANDLE */}
              <div className="w-12 h-1.5 bg-[#CBD5E1] rounded-full mx-auto mb-6" />

              {/* CLOSE */}
              <div className="flex justify-end mb-6">
                <button onClick={() => setIsOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              {/* LINKS */}
              <div className="flex flex-col gap-6 mt-4">
                {links.map((link, i) => (
                  <motion.button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileTap={{ scale: 0.95 }}
                    className={`text-lg font-black uppercase tracking-[0.2em] text-left ${
                      pathname === link.href
                        ? "text-[#059669]"
                        : "text-[#0F172A]"
                    }`}
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
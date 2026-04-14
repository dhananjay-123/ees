"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import LoadingScreen from "./components/LoadingScreen";
import { TransitionProvider } from "./components/TransitionProvider";

export default function RootLayout({ children }) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body className="bg-[#F1F5F9] overflow-x-hidden">
        <TransitionProvider>
          <AnimatePresence mode="wait">
            {isInitialLoading && <LoadingScreen />}
          </AnimatePresence>
          <PageTransition />
          <Navbar />
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
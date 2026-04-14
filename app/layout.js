"use client";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import "./globals.css";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import LoadingScreen from "./components/LoadingScreen";
import Cursor from "./components/Cursor";
export default function RootLayout({ children }) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body className="bg-[#F1F5F9] overflow-x-hidden">
        <Cursor />

        {/* Loader */}
        <AnimatePresence mode="wait">
          {isInitialLoading && <LoadingScreen key="loader" />}
        </AnimatePresence>

        {/* Main App */}
        {!isInitialLoading && (
          <>
            <Navbar />

            {/* ✅ FIXED WRAPPER */}
            <div className="relative pt-16">
              <PageTransition>{children}</PageTransition>
            </div>
          </>
        )}

      </body>
    </html>
  );
}
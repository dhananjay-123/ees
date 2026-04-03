"use client";
import { useState, useEffect } from "react";
import "./globals.css";
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";

export default function RootLayout({ children }) {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Confirms we are now on the client
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Prevent hydration mismatch by returning a consistent shell 
  // until the client-side mounting is confirmed.
  if (!mounted) {
    return (
      <html lang="en">
        <body className="bg-[#F1F5F9]"><LoadingScreen /></body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="antialiased bg-[#F1F5F9] text-[#0F172A] font-sans overflow-x-hidden">
        {isAppLoading && <LoadingScreen />}
        
        <div 
          className={`transition-opacity duration-1000 ease-in-out ${
            isAppLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          <Navbar />
          <main className="h-screen pt-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
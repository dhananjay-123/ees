"use client";
import React from 'react';



export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[3000] bg-[#F1F5F9] flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#059669]/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] animate-pulse delay-700" />

      <div className="relative flex flex-col items-center">
        {/* Logo Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-[#059669] rounded-2xl blur-xl opacity-20 animate-ping" />
          <div className="relative w-16 h-16 bg-[#059669] rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-[#059669]/20">
            <img src="../../logo.webp" alt="" className='animate-pulse' />
          </div>
        </div>

        {/* Brand & Tagline */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase text-[#0F172A]">
            BREATH<span className="text-[#059669]">PATH</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#64748B]">
            Navigation Re-Engineered
          </p>
        </div>

        {/* Technical Progress Bar - Switched to a standard Tailwind animation */}
        <div className="mt-12 w-48 h-[2px] bg-[#E2E8F0] rounded-full overflow-hidden">
          <div className="h-full bg-[#059669] w-full animate-progress-slide" />
        </div>

        <p className="mt-4 text-[8px] font-bold uppercase tracking-widest text-[#CBD5E1]">
          Initializing Geospatial Vitals
        </p>
      </div>
    </div>
  );
}
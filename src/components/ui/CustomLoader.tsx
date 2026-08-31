"use client";
import React, { useState, useEffect } from "react";

export default function CustomLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 6;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden pointer-events-auto select-none">
      {/* Subtle ambient neon glow */}
      <div className="absolute w-[250px] h-[250px] bg-[#38bdf8]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-5 z-10">
        {/* Minimalist Monogram Header */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#38bdf8]"></span>
          </span>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-[0.4em] text-[#e2e8f0]">
            JISHAN<span className="text-[#38bdf8]">.</span>
          </h1>
        </div>

        {/* Sleek Minimal Progress Line */}
        <div className="w-36 h-[2px] bg-[#334155] rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[#38bdf8] transition-all duration-300 ease-out shadow-[0_0_10px_#38bdf8]"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Minimal Numerical Counter */}
        <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#94a3b8] uppercase">
          {String(Math.min(progress, 100)).padStart(2, "0")}%
        </span>
      </div>
    </div>
  );
}

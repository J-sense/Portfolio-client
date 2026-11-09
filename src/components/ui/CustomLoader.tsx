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
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center text-white overflow-hidden pointer-events-auto select-none"
      style={{
        background: `
          radial-gradient(ellipse 90% 80% at 15% 18%, rgba(23, 40, 244, 0.85) 0%, transparent 65%),
          radial-gradient(ellipse 85% 75% at 85% 22%, rgba(205, 205, 231, 0.42) 0%, transparent 62%),
          radial-gradient(ellipse 90% 80% at 50% 62%, rgba(153, 150, 254, 0.55) 0%, transparent 68%),
          linear-gradient(155deg, #1728F4 0%, #5E64FD 36%, #575DA7 72%, #9996FE 100%)
        `,
      }}
    >
      {/* Subtle ambient accent glow */}
      <div className="absolute w-[280px] h-[280px] bg-white/20 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-5 z-10">
        {/* Minimalist Monogram Header */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BCED34] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#BCED34]"></span>
          </span>
          <h1 className="font-syne text-xl sm:text-2xl font-extrabold uppercase tracking-[0.35em] text-white">
            JISHAN<span className="text-[#BCED34]">.</span>
          </h1>
        </div>

        {/* Sleek Minimal Progress Line */}
        <div className="w-36 h-[2px] bg-white/25 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-white via-[#CDCDE7] to-[#BCED34] transition-all duration-300 ease-out shadow-[0_0_12px_rgba(188,237,52,0.8)]"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Minimal Numerical Counter */}
        <span className="font-space text-[10px] font-bold tracking-[0.3em] text-white/85 uppercase">
          {String(Math.min(progress, 100)).padStart(2, "0")}%
        </span>
      </div>
    </div>
  );
}

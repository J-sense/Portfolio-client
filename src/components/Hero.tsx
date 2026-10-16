/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Award, FolderGit, Download } from "lucide-react";

const Hero = () => {
  const [totalDays, setTotalDays] = useState<number>(0);

  useEffect(() => {
    const start = new Date("2025-07-21T00:00:00");
    const update = () => {
      const now = new Date();
      const diffMs = Math.max(0, now.getTime() - start.getTime());
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      setTotalDays(days);
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col justify-center text-left py-12 pointer-events-auto">
      {/* Background Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-[#38bdf8]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-[#e2e8f0]/5 blur-[120px] rounded-full" />
      </div>

      {/* Identity Summary Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-flex w-fit mb-4 p-px rounded-full bg-gradient-to-r from-sky-400 via-sky-400/30 to-transparent select-none">
          <span className="inline-flex items-center gap-2 rounded-full bg-black px-3.5 py-1.5 text-[10px] font-bold tracking-[0.3em] uppercase text-sky-300">
            CORE FOCUS
          </span>
        </span>
        {/* Title */}
        <h1 className="font-bricolage text-4xl sm:text-6xl font-black uppercase tracking-tighter text-[#e2e8f0] leading-[1.05] mb-6">
          FRONTEND FOCUSED<br />
          <span className="text-[#94a3b8]">FULL STACK DEVELOPER</span>
        </h1>

        <p className="text-[#94a3b8] text-sm leading-relaxed max-w-xl mb-10">
          Designing and deploying responsive, high-performance web systems with clean code, surgical integrations, and modern aesthetic choices.
        </p>
      </motion.div>

      {/* Metrics Row */}
      <motion.div
        className="grid grid-cols-3 gap-4 border-y border-[#334155]/60 py-8 mb-10 max-w-xl"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Stat 1 */}
        <div className="flex flex-col gap-1">
          <span className="text-2xl sm:text-3xl font-black text-[#e2e8f0] flex items-center gap-1.5">
            +{totalDays}d <Award size={16} className="text-[#38bdf8]" />
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#94a3b8] flex flex-col">
            <span>Experience</span>
          </span>
        </div>

        {/* Stat 2 */}
        <div className="flex flex-col gap-1 border-x border-[#334155]/60 px-4">
          <span className="text-2xl sm:text-3xl font-black text-[#e2e8f0] flex items-center gap-1.5">
            +6 <FolderGit size={16} className="text-[#38bdf8]" />
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#94a3b8]">
            Projects<br />Completed
          </span>
        </div>

        {/* Stat 3: Worldwide Clients with colorful image flag stack */}
        <div className="flex flex-col gap-1.5 pl-2 justify-center">
          <div className="flex items-center -space-x-2 py-1">
            {[
              { code: "us", name: "United States", flag: "https://flagcdn.com/w40/us.png" },
              { code: "gb", name: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png" },
              { code: "ca", name: "Canada", flag: "https://flagcdn.com/w40/ca.png" },
              { code: "de", name: "Germany", flag: "https://flagcdn.com/w40/de.png" },
              { code: "au", name: "Australia", flag: "https://flagcdn.com/w40/au.png" },
            ].map((country, idx) => (
              <div
                key={idx}
                title={country.name}
                className="w-7 h-7 rounded-full bg-[#121212] border-2 border-[#050505] overflow-hidden shadow-lg transform hover:scale-125 hover:z-30 hover:border-[#38bdf8] transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0"
              >
                <img
                  src={country.flag}
                  alt={country.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#94a3b8]">
            Worldwide<br />Clients
          </span>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        className="flex flex-wrap gap-4 items-center"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <a
          href="/jishan-resume.pdf"
          download="Jishan-Resume.pdf"
          className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full select-none
    text-[#04121C] font-black text-xs uppercase tracking-[0.2em]
    bg-gradient-to-b from-[#7DD3FC] to-[#0EA5E9]
    border border-white/30
    shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-3px_6px_rgba(3,60,100,0.35)]
    [text-shadow:0_1px_0_rgba(255,255,255,0.4)]
    transition-all duration-200 hover:brightness-110 active:scale-[0.97]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <Download size={14} className="transition-transform duration-200 group-hover:translate-y-0.5" />
          Download Resume
        </a>

        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full select-none
    text-[#e2e8f0] hover:text-white font-bold text-xs uppercase tracking-[0.15em]
    bg-gradient-to-b from-[#1E2530] to-[#0B0E13]
    border border-[#334155] hover:border-[#38bdf8]/50
    shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-3px_6px_rgba(0,0,0,0.45)]
    [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]
    transition-all duration-300 hover:brightness-110 active:scale-[0.97]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <span>Get in Touch</span>
          <ArrowUpRight
            size={14}
            className="text-[#94a3b8] group-hover:text-sky-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
          />
        </Link>
      </motion.div>
    </div>
  );
};

export default Hero;

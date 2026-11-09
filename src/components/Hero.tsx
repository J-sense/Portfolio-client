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
    <div className="relative flex flex-col justify-center text-left py-8 pointer-events-auto">
      {/* Identity Summary Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="kail-glass-pill font-space inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-bold tracking-[0.24em] uppercase text-white mb-5 select-none">
          <span className="w-2 h-2 rounded-full bg-[#BCED34] shadow-[0_0_8px_#BCED34]" />
          CORE FOCUS
        </span>

        {/* Title */}
        <h1 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white leading-[1.05] mb-6">
          FRONTEND FOCUSED<br />
          <span className="bg-gradient-to-r from-[#BCED34] via-[#FFFFFF] to-[#CDCDE7] bg-clip-text text-transparent">
            FULL STACK DEVELOPER
          </span>
        </h1>

        <p className="font-outfit text-white/90 text-sm sm:text-base font-normal leading-relaxed max-w-xl mb-10">
          Designing and deploying responsive, high-performance web systems with clean code, surgical integrations, and modern aesthetic choices.
        </p>
      </motion.div>

      {/* Metrics Row */}
      <motion.div
        className="kail-glass rounded-3xl grid grid-cols-3 gap-4 px-5 py-6 mb-10 max-w-xl"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Stat 1 */}
        <div className="flex flex-col gap-1">
          <span className="font-syne text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-1.5">
            +{totalDays}d <Award size={16} className="text-[#BCED34]" />
          </span>
          <span className="font-space text-[9px] font-bold uppercase tracking-[0.18em] text-white/80 flex flex-col">
            <span>Experience</span>
          </span>
        </div>

        {/* Stat 2 */}
        <div className="flex flex-col gap-1 border-x border-white/20 px-4">
          <span className="font-syne text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-1.5">
            +6 <FolderGit size={16} className="text-[#BCED34]" />
          </span>
          <span className="font-space text-[9px] font-bold uppercase tracking-[0.18em] text-white/80">
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
                className="w-7 h-7 rounded-full bg-[#1728F4] border-2 border-white/60 overflow-hidden shadow-lg transform hover:scale-125 hover:z-30 hover:border-[#BCED34] transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0"
              >
                <img
                  src={country.flag}
                  alt={country.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <span className="font-space text-[9px] font-bold uppercase tracking-[0.18em] text-white/80">
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
          className="font-space group inline-flex items-center gap-3 px-7 py-3.5 rounded-full select-none
    text-[#1728F4] font-bold text-xs uppercase tracking-[0.18em]
    bg-[#BCED34] hover:bg-white
    border border-white/40
    shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_12px_30px_-6px_rgba(23,40,244,0.45)]
    transition-all duration-200 active:scale-[0.97]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Download size={14} className="transition-transform duration-200 group-hover:translate-y-0.5" />
          Download Resume
        </a>

        <Link
          href="/contact"
          className="font-space group inline-flex items-center gap-2 px-6 py-3.5 rounded-full select-none
    text-white hover:text-[#BCED34] font-bold text-xs uppercase tracking-[0.18em]
    kail-glass hover:border-[#BCED34]/60
    transition-all duration-300 active:scale-[0.97]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span>Get in Touch</span>
          <ArrowUpRight
            size={14}
            className="text-[#BCED34] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
          />
        </Link>
      </motion.div>
    </div>
  );
};

export default Hero;

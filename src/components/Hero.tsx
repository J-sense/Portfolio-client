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
    <section className="relative flex flex-col justify-center text-left pb-24 md:pb-32 pointer-events-auto">
      {/* Identity Summary Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="spec-section-tag w-fit">
          <span className="w-[7px] h-[7px] rounded-full bg-[#BCED34] shadow-[0_0_10px_#BCED34]" />
          <span>CORE FOCUS</span>
        </div>

        {/* Title — Figma Spec Display/H2 */}
        <h1 className="spec-display-h2 mt-[18px] mb-6">
          FRONTEND FOCUSED
          <br />
          <span className="text-[#BCED34]">FULL STACK DEVELOPER</span>
        </h1>

        <p className="spec-body-lead max-w-2xl mb-10">
          Designing and deploying responsive, high-performance web systems with clean code, surgical integrations, and modern aesthetic choices.
        </p>
      </motion.div>

      {/* Metrics Row */}
      <motion.div
        className="kail-glass grid grid-cols-3 gap-4 px-6 py-6 mb-10 max-w-2xl"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Stat 1 */}
        <div className="flex flex-col gap-1.5">
          <span className="spec-unit-number flex items-center gap-1.5">
            +{totalDays}d <Award size={18} className="text-[#BCED34]" />
          </span>
          <span className="spec-mono-unit">Experience</span>
        </div>

        {/* Stat 2 */}
        <div className="flex flex-col gap-1.5 border-x border-white/20 px-4">
          <span className="spec-unit-number flex items-center gap-1.5">
            +6 <FolderGit size={18} className="text-[#BCED34]" />
          </span>
          <span className="spec-mono-unit">
            Projects Completed
          </span>
        </div>

        {/* Stat 3: Worldwide Clients with colorful image flag stack */}
        <div className="flex flex-col gap-1.5 pl-2 justify-center">
          <div className="flex items-center -space-x-2 py-0.5">
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
                className="w-7 h-7 rounded-full bg-[#1B2BF4] border-2 border-white/60 overflow-hidden shadow-lg transform hover:scale-125 hover:z-30 hover:border-[#BCED34] transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0"
              >
                <img
                  src={country.flag}
                  alt={country.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <span className="spec-mono-unit">
            Worldwide Clients
          </span>
        </div>
      </motion.div>

      {/* Actions — Figma Spec 2.6 Buttons */}
      <motion.div
        className="flex flex-wrap gap-4 items-center"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <a
          href="/jishan-resume.pdf"
          download="Jishan-Resume.pdf"
          className="spec-btn-primary group select-none cursor-pointer"
        >
          <Download size={15} className="transition-transform duration-200 group-hover:translate-y-0.5" />
          <span>Download Resume</span>
        </a>

        <Link
          href="/contact"
          className="spec-btn-secondary group select-none"
        >
          <span>Get in Touch</span>
          <ArrowUpRight
            size={15}
            className="text-[#BCED34] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
          />
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;

"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal, ArrowUpRight, Award, FolderGit, Users } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative flex flex-col justify-center text-left py-12 pointer-events-auto">
      {/* Background Glows (Inside parent column) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-[#c5ff41]/3 blur-[100px] rounded-full" />
        <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-[#f46c38]/3 blur-[100px] rounded-full" />
      </div>

      {/* Identity Summary Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-flex items-center gap-2 text-[9px] font-black tracking-[0.3em] text-[#c5ff41] uppercase mb-4 border border-[#c5ff41]/20 bg-[#c5ff41]/5 px-3 py-1 rounded-full w-fit">
          CORE FOCUS
        </span>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white leading-[1.05] mb-6">
          MERN STACK<br />
          <span className="text-[#998f8f]">DEVELOPER</span>
        </h1>

        <p className="text-[#998f8f] text-sm leading-relaxed max-w-xl mb-10">
          Designing and deploying responsive, high-performance web systems with clean code, surgical integrations, and modern aesthetic choices.
        </p>
      </motion.div>

      {/* Metrics Row */}
      <motion.div
        className="grid grid-cols-3 gap-4 border-y border-white/[0.05] py-8 mb-10 max-w-xl"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Stat 1 */}
        <div className="flex flex-col gap-1">
          <span className="text-2xl sm:text-3xl font-black text-white flex items-center gap-1.5">
            +3 <Award size={16} className="text-[#c5ff41]" />
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#998f8f]">
            Years of<br />Experience
          </span>
        </div>
        
        {/* Stat 2 */}
        <div className="flex flex-col gap-1 border-x border-white/[0.05] px-4">
          <span className="text-2xl sm:text-3xl font-black text-white flex items-center gap-1.5">
            +15 <FolderGit size={16} className="text-[#f46c38]" />
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#998f8f]">
            Projects<br />Completed
          </span>
        </div>

        {/* Stat 3 */}
        <div className="flex flex-col gap-1 pl-2">
          <span className="text-2xl sm:text-3xl font-black text-white flex items-center gap-1.5">
            +10 <Users size={16} className="text-[#c5ff41]" />
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#998f8f]">
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
        <Link
          href="/jishan's-resume.pdf"
          download
          className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#c5ff41] text-black font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-[#c5ff41]/5"
        >
          <Terminal size={12} />
          Download Resume
        </Link>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/10 bg-[#1b1918]/50 hover:bg-[#1b1918] hover:border-white/20 text-white font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 group"
        >
          <span>Get in Touch</span>
          <ArrowUpRight size={14} className="text-[#998f8f] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
};

export default Hero;

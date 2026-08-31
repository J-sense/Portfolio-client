"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Coffee, GraduationCap, Clock } from "lucide-react";

const AboutPage = () => {
  return (
    <section className="relative py-12 text-left pointer-events-auto">
      <div className="flex flex-col gap-12 max-w-2xl">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-[9px] font-black tracking-[0.3em] text-[#38bdf8] uppercase mb-4 border border-[#38bdf8]/30 bg-[#38bdf8]/10 px-3 py-1 rounded-full w-fit">
            Biography
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-[#e2e8f0] leading-none">
            ACADEMIC &<br />
            <span className="text-[#94a3b8]">DEVELOPER PATH</span>
          </h1>
        </motion.div>

        {/* Narrative bio snippet */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-[#94a3b8] text-sm leading-relaxed"
        >
          I started my coding journey in late 2022, focusing on frontend interfaces and full-stack solutions. Below is a summary of my academic history and technical path.
        </motion.div>

        {/* Academic History */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#38bdf8] flex items-center gap-2 mb-2">
            <GraduationCap size={16} />
            Academic Background
          </h2>

          {/* Diploma Card */}
          <div className="p-6 rounded-3xl border border-[#334155] bg-[#121212] shadow-2xl">
            <div className="flex justify-between items-start gap-4 mb-2">
              <h3 className="text-base font-black text-[#e2e8f0] uppercase tracking-tight">
                Diploma in Computer Science
              </h3>
              <span className="px-2.5 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[8px] font-black text-[#38bdf8] tracking-widest whitespace-nowrap">
                CGPA 3.61/4
              </span>
            </div>
            <p className="text-xs text-[#94a3b8] font-semibold mb-3 uppercase tracking-wider">
              Feni Polytechnic Institute • Graduating 2025
            </p>
            <p className="text-[#94a3b8] text-xs leading-relaxed">
              Academic studies focused deeply on software methodologies, logic structures, networking systems, databases, and general computer science theory, laying the foundation for modern web engineering.
            </p>
          </div>

          {/* SSC Card */}
          <div className="p-6 rounded-3xl border border-[#334155] bg-[#121212] shadow-2xl">
            <div className="flex justify-between items-start gap-4 mb-2">
              <h3 className="text-base font-black text-[#e2e8f0] uppercase tracking-tight">
                Secondary School Certificate (SSC)
              </h3>
              <span className="px-2.5 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[8px] font-black text-[#38bdf8] tracking-widest whitespace-nowrap">
                GPA 4.61
              </span>
            </div>
            <p className="text-xs text-[#94a3b8] font-semibold mb-3 uppercase tracking-wider">
              Captain Shamsul Huda High School • Graduated 2020
            </p>
          </div>
        </motion.div>

        {/* Coding Journey */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="space-y-4"
        >
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#38bdf8] flex items-center gap-2 mb-2">
            <Clock size={16} />
            My Coding Journey
          </h2>

          <div className="p-6 rounded-3xl border border-[#334155] bg-[#121212] shadow-2xl space-y-4">
            <p className="text-[#94a3b8] text-xs leading-relaxed">
              I began coding in late 2022, diving into basic frontend structures. Through active practice, building complete interfaces, and tackling backend integrations, I transitioned into full-stack development using the MERN stack.
            </p>
            <p className="text-[#94a3b8] text-xs leading-relaxed">
              Since mid-2025, I have worked as a Frontend Developer at Join Venture AI, designing responsive client interfaces with React and Next.js, integrating socket-driven real-time communications, and working alongside cross-functional teams to build enterprise-grade portals.
            </p>
          </div>
        </motion.div>

        {/* Coffee CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-start mt-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full border border-[#334155] bg-[#121212] hover:bg-[#38bdf8] hover:text-[#050505] hover:border-transparent text-[#e2e8f0] font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 group shadow-md"
          >
            <Coffee size={14} className="text-[#38bdf8] group-hover:text-[#050505]" />
            <span>Connect With Me</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutPage;

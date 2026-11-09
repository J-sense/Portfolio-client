"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Coffee, GraduationCap, Clock, GitCommit } from "lucide-react";
import ContributionGrid from "@/components/ContributionGrid";

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
          <span className="inline-flex items-center gap-2 font-space text-[9px] font-bold tracking-[0.28em] text-[#BCED34] uppercase mb-4 kail-glass-pill px-3.5 py-1.5 rounded-full w-fit">
            Biography
          </span>
          <h1 className="font-syne text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#F4F4FE] leading-[1.04]">
            ACADEMIC &<br />
            <span className="text-[#9996FE]">DEVELOPER PATH</span>
          </h1>
        </motion.div>

        {/* Narrative bio snippet */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-outfit text-[#8E92BC] text-sm leading-relaxed"
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
          <h2 className="font-space text-xs font-bold uppercase tracking-[0.22em] text-[#BCED34] flex items-center gap-2 mb-2">
            <GraduationCap size={16} />
            Academic Background
          </h2>

          {/* Diploma Card */}
          <div className="p-6 rounded-3xl kail-glass">
            <div className="flex justify-between items-start gap-4 mb-2">
              <h3 className="font-syne text-base font-extrabold text-[#F4F4FE] uppercase tracking-tight">
                Diploma in Computer Science
              </h3>
              <span className="px-3 py-1 rounded-full kail-glass-pill font-space text-[8px] font-bold text-[#BCED34] tracking-[0.2em] whitespace-nowrap">
                CGPA 3.61/4
              </span>
            </div>
            <p className="font-space text-[10px] text-[#9996FE] font-bold mb-3 uppercase tracking-[0.18em]">
              Feni Polytechnic Institute • Graduating 2025
            </p>
            <p className="font-outfit text-[#8E92BC] text-xs leading-relaxed">
              Academic studies focused deeply on software methodologies, logic structures, networking systems, databases, and general computer science theory, laying the foundation for modern web engineering.
            </p>
          </div>

          {/* SSC Card */}
          <div className="p-6 rounded-3xl kail-glass">
            <div className="flex justify-between items-start gap-4 mb-2">
              <h3 className="font-syne text-base font-extrabold text-[#F4F4FE] uppercase tracking-tight">
                Secondary School Certificate (SSC)
              </h3>
              <span className="px-3 py-1 rounded-full kail-glass-pill font-space text-[8px] font-bold text-[#BCED34] tracking-[0.2em] whitespace-nowrap">
                GPA 4.61
              </span>
            </div>
            <p className="font-space text-[10px] text-[#9996FE] font-bold mb-1 uppercase tracking-[0.18em]">
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
          <h2 className="font-space text-xs font-bold uppercase tracking-[0.22em] text-[#BCED34] flex items-center gap-2 mb-2">
            <Clock size={16} />
            My Coding Journey
          </h2>

          <div className="p-6 rounded-3xl kail-glass space-y-4">
            <p className="font-outfit text-[#CDCDE7] text-xs leading-relaxed">
              I began coding in late 2022, diving into basic frontend structures. Through active practice, building complete interfaces, and tackling backend integrations, I transitioned into full-stack development using the MERN stack.
            </p>
            <p className="font-outfit text-[#8E92BC] text-xs leading-relaxed">
              Since mid-2025, I have worked as a Frontend Developer at Join Venture AI, designing responsive client interfaces with React and Next.js, integrating socket-driven real-time communications, and working alongside cross-functional teams to build enterprise-grade portals.
            </p>
          </div>
        </motion.div>

        {/* Real-time GitHub Activity */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="space-y-4"
        >
          <h2 className="font-space text-xs font-bold uppercase tracking-[0.22em] text-[#BCED34] flex items-center gap-2 mb-2">
            <GitCommit size={16} />
            GitHub Contributions
          </h2>

          <ContributionGrid />
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
            className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full kail-glass-pill hover:bg-[#5E64FD] text-[#F4F4FE] font-space font-bold text-xs uppercase tracking-[0.18em] transition-all duration-300 group shadow-md"
          >
            <Coffee size={14} className="text-[#BCED34]" />
            <span>Connect With Me</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutPage;

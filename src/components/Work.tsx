"use client";
import React, { useState } from "react";
import { EXPERIENCES } from "@/lib/data/index";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ─── Type ──────────────────────────────────────────────────────────────────────
interface Experience {
  company: string;
  role: string;
  year: string;
  description: string;
  location?: string;
  link?: string;
  highlights?: string[];
  type?: "work" | "education";
}

// ─── Enriched static highlights mapped per company ────────────────────────────
const HIGHLIGHTS: Record<string, string[]> = {
  "Join Venture AI.": [
    "Built full-stack features using React.js, Next.js & Node.js",
    "Integrated real-time chat & video via sockets & ZEGOCLOUD",
    "Connected Cal.com scheduling & third-party REST APIs",
    "Delivered high-performance, responsive UI components",
  ],
};

// ─── Component ─────────────────────────────────────────────────────────────────
const ExperienceRow = ({
  exp,
  index,
  total,
}: {
  exp: Experience;
  index: number;
  total: number;
}) => {
  const [expanded, setExpanded] = useState(false);
  const isLast = index === total - 1;
  const isEdu =
    exp.company.toLowerCase().includes("academy") ||
    exp.company.toLowerCase().includes("university") ||
    exp.company.toLowerCase().includes("polytechnic") ||
    exp.type === "education";

  const highlights = HIGHLIGHTS[exp.company] ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      className="relative"
    >
      {/* Top divider */}
      <div className="h-px w-full bg-white/[0.07]" />

      <div className="py-6 group">
        {/* ── Main row ── */}
        <div className="flex items-start gap-5">
          {/* Icon node */}
          <div className="relative shrink-0 mt-0.5">
            <div className="w-9 h-9 rounded-xl bg-[#1a1917] border border-white/[0.07] group-hover:border-[#c5ff41]/30 flex items-center justify-center transition-all duration-300">
              {isEdu ? (
                <GraduationCap size={15} className="text-[#c5ff41]" />
              ) : (
                <Briefcase size={15} className="text-[#c5ff41]" />
              )}
            </div>
            {/* Soft glow */}
            <div className="absolute inset-0 rounded-xl bg-[#c5ff41]/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Top line: type label + year badge */}
            <div className="flex items-center justify-between gap-3 mb-1.5 flex-wrap">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#f46c38]">
                {isEdu ? "Education" : "Employment"}
              </span>

              <div className="flex items-center gap-3">
                {exp.location && (
                  <span className="hidden sm:flex items-center gap-1 text-[9px] text-[#998f8f] uppercase tracking-wider">
                    <MapPin size={9} />
                    {exp.location}
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-[9px] font-black text-[#c5ff41] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#c5ff41]/5 border border-[#c5ff41]/20">
                  <Calendar size={9} />
                  {exp.year}
                </span>
              </div>
            </div>

            {/* Company + Role */}
            <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-[#c5ff41] transition-colors duration-300 uppercase tracking-tight leading-none">
              {exp.company}
            </h3>
            <p className="text-[11px] font-bold text-[#998f8f] uppercase tracking-widest mt-1.5">
              {exp.role}
            </p>

            {/* Description — collapsible */}
            <motion.div
              initial={false}
              animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="text-[#998f8f] text-[11px] sm:text-xs leading-relaxed mt-4 max-w-2xl">
                {exp.description}
              </p>

              {/* Highlight tags */}
              {highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {highlights.map((h, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 text-[9px] font-bold text-white/70 uppercase tracking-wide px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#c5ff41] shrink-0" />
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Expand / collapse toggle */}
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1.5 mt-3 text-[9px] font-black uppercase tracking-widest text-[#998f8f] hover:text-[#c5ff41] transition-colors duration-200"
            >
              {expanded ? (
                <>
                  <ChevronUp size={11} /> Collapse
                </>
              ) : (
                <>
                  <ChevronDown size={11} /> View Details
                </>
              )}
            </button>
          </div>

          {/* External link */}
          {exp.link && (
            <a
              href={exp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 mt-1 flex items-center justify-center w-8 h-8 rounded-full border border-white/[0.08] bg-[#1a1917] text-[#998f8f] hover:bg-[#c5ff41] hover:text-black hover:border-transparent transition-all duration-300"
            >
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>

      {/* Bottom divider for last item */}
      {isLast && <div className="h-px w-full bg-white/[0.07]" />}
    </motion.div>
  );
};

// ─── MAIN ──────────────────────────────────────────────────────────────────────
const Work = () => {
  const experiences: Experience[] = EXPERIENCES as Experience[];

  return (
    <section
      id="experience"
      className="relative py-16 bg-[#151312] overflow-hidden pointer-events-auto"
    >
      {/* Ambient glow */}
      <div className="absolute top-[20%] left-[-8%] w-80 h-80 bg-[#c5ff41]/[0.02] blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-end justify-between">
            <div>
              <span className="inline-block px-3 py-1 mb-3 text-[9px] font-black tracking-[0.3em] text-[#c5ff41] uppercase bg-[#c5ff41]/5 border border-[#c5ff41]/20 rounded-full">
                Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase leading-none">
                WORK <span className="text-[#998f8f]">EXPERIENCE</span>
              </h2>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#998f8f]">
              {experiences.length} {experiences.length === 1 ? "Position" : "Positions"}
            </span>
          </div>
        </motion.div>

        {/* Timeline rows */}
        <div>
          {experiences.map((exp, i) => (
            <ExperienceRow key={i} exp={exp} index={i} total={experiences.length} />
          ))}
        </div>

        {/* End marker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mt-8"
        >
          <div className="flex-1 h-px bg-white/[0.04]" />
          <span className="text-[8px] font-black tracking-[0.35em] uppercase text-white/20 select-none">
            Timeline Start
          </span>
          <div className="flex-1 h-px bg-white/[0.04]" />
        </motion.div>
      </div>
    </section>
  );
};

export default Work;

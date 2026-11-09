"use client";
import React, { useState, useEffect } from "react";
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
  Clock,
  Zap,
} from "lucide-react";

// ─── Type ──────────────────────────────────────────────────────────────────────
interface Experience {
  company: string;
  role: string;
  year: string;
  startDate?: string;
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

// ─── Realtime Hook ────────────────────────────────────────────────────────────
function useRealtimeTracker(startDateString: string = "2025-07-21") {
  const [stats, setStats] = useState({
    totalDays: 0,
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const start = new Date(`${startDateString}T00:00:00`);

    const update = () => {
      const now = new Date();
      const diffMs = Math.max(0, now.getTime() - start.getTime());

      const totalSecs = Math.floor(diffMs / 1000);
      const totalMins = Math.floor(totalSecs / 60);
      const totalHrs = Math.floor(totalMins / 60);
      const totalDays = Math.floor(totalHrs / 24);

      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();

      if (days < 0) {
        months -= 1;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      setStats({
        totalDays,
        years,
        months,
        days,
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startDateString]);

  return stats;
}

// ─── Realtime Ticker Component ───────────────────────────────────────────────
const RealtimeExperienceTicker = ({ startDate = "2025-07-21" }: { startDate?: string }) => {
  const time = useRealtimeTracker(startDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="kail-glass relative mb-12 overflow-hidden rounded-3xl p-6 sm:p-8"
    >
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 rounded-full bg-[#5E64FD]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 rounded-full bg-[#BCED34]/10 blur-3xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/20">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BCED34] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#BCED34]"></span>
          </span>
          <span className="font-space text-[10px] font-bold tracking-[0.25em] text-[#BCED34] uppercase">
            REALTIME EXPERIENCE COUNTER
          </span>
        </div>

        <div className="kail-glass-pill font-space flex items-center gap-2 text-[10px] font-semibold text-white uppercase tracking-wider px-3 py-1 rounded-full">
          <Clock size={11} className="text-[#BCED34]" />
          <span>Joined: July 21, 2025</span>
        </div>
      </div>

      {/* Counter Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-6">
        {/* Total Days Highlight Card */}
        <div className="col-span-2 sm:col-span-4 md:col-span-2 bg-white/15 border border-white/30 rounded-2xl p-3.5 flex flex-col justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
          <span className="font-space text-[9px] font-bold uppercase tracking-widest text-white/90 mb-1 flex items-center gap-1">
            <Zap size={10} className="text-[#BCED34]" /> Total Active Days
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-syne text-3xl sm:text-4xl font-extrabold text-[#BCED34] tracking-tight">
              {time.totalDays}
            </span>
            <span className="font-space text-xs font-bold text-white uppercase tracking-widest">Days</span>
          </div>
        </div>

        {/* Years */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
          <span className="font-syne text-2xl font-extrabold text-white">{time.years}</span>
          <span className="font-space text-[9px] font-semibold uppercase tracking-wider text-white/80">Years</span>
        </div>

        {/* Months */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
          <span className="font-syne text-2xl font-extrabold text-white">{time.months}</span>
          <span className="font-space text-[9px] font-semibold uppercase tracking-wider text-white/80">Months</span>
        </div>

        {/* Days */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
          <span className="font-syne text-2xl font-extrabold text-white">{time.days}</span>
          <span className="font-space text-[9px] font-semibold uppercase tracking-wider text-white/80">Days</span>
        </div>

        {/* Hours */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
          <span className="font-syne text-2xl font-extrabold text-white">
            {String(time.hours).padStart(2, "0")}
          </span>
          <span className="font-space text-[9px] font-semibold uppercase tracking-wider text-white/80">Hours</span>
        </div>

        {/* Seconds (Live Ticker) */}
        <div className="bg-[#BCED34]/20 border border-[#BCED34]/45 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
          <span className="font-syne text-2xl font-extrabold text-[#BCED34] animate-pulse">
            {String(time.seconds).padStart(2, "0")}
          </span>
          <span className="font-space text-[9px] font-bold uppercase tracking-wider text-[#BCED34]">Secs (Live)</span>
        </div>
      </div>

      {/* Bottom info text */}
      <div className="font-space flex items-center justify-between text-[10px] font-semibold text-white/80 uppercase tracking-wider">
        <span>Company: <strong className="text-white">Join Venture AI.</strong></span>
        <span className="hidden sm:inline text-[#BCED34]">⚡ Every day & second counted live</span>
      </div>
    </motion.div>
  );
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
  const time = useRealtimeTracker(exp.startDate || "2025-07-21");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      className="relative"
    >
      {/* Top divider */}
      <div className="h-px w-full bg-white/20" />

      <div className="py-6 group">
        {/* ── Main row ── */}
        <div className="flex items-start gap-5">
          {/* Icon node */}
          <div className="relative shrink-0 mt-0.5">
            <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 group-hover:border-[#BCED34]/70 flex items-center justify-center transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]">
              {isEdu ? (
                <GraduationCap size={16} className="text-white" />
              ) : (
                <Briefcase size={16} className="text-[#BCED34]" />
              )}
            </div>
            {/* Soft glow */}
            <div className="absolute inset-0 rounded-xl bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Top line: type label + year badge */}
            <div className="flex items-center justify-between gap-3 mb-1.5 flex-wrap">
              <span className="font-space text-[9px] font-bold uppercase tracking-[0.25em] text-[#BCED34]">
                {isEdu ? "Education" : "Employment"}
              </span>

              <div className="flex items-center gap-3">
                {exp.location && (
                  <span className="font-space hidden sm:flex items-center gap-1 text-[9px] text-white/80 uppercase tracking-wider">
                    <MapPin size={9} />
                    {exp.location}
                  </span>
                )}

                {exp.startDate && (
                  <span className="font-space flex items-center gap-1.5 text-[9px] font-bold text-[#BCED34] bg-[#BCED34]/15 px-2.5 py-0.5 rounded-full border border-[#BCED34]/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#BCED34] animate-ping" />
                    Live: {time.totalDays} Days
                  </span>
                )}

                <span className="kail-glass-pill font-space flex items-center gap-1.5 text-[9px] font-bold text-white uppercase tracking-widest px-2.5 py-1 rounded-full">
                  <Calendar size={9} className="text-[#BCED34]" />
                  {exp.year}
                </span>
              </div>
            </div>

            {/* Company + Role */}
            <h3 className="font-syne text-lg sm:text-xl font-extrabold text-white group-hover:text-[#BCED34] transition-colors duration-300 uppercase tracking-tight leading-none">
              {exp.company}
            </h3>
            <p className="font-space text-[11px] font-semibold text-white/80 uppercase tracking-widest mt-1.5">
              {exp.role}
            </p>

            {/* Description — collapsible */}
            <motion.div
              initial={false}
              animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="font-outfit text-white/90 text-xs leading-relaxed mt-4 max-w-2xl font-normal">
                {exp.description}
              </p>

              {/* Highlight tags */}
              {highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {highlights.map((h, i) => (
                    <span
                      key={i}
                      className="kail-glass-pill font-space flex items-center gap-1.5 text-[9px] font-semibold text-white uppercase tracking-wide px-3 py-1.5 rounded-full"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#BCED34] shrink-0" />
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Expand / collapse toggle */}
            <button
              onClick={() => setExpanded((v) => !v)}
              className="font-space flex items-center gap-1.5 mt-3 text-[9px] font-bold uppercase tracking-widest text-white/80 hover:text-[#BCED34] transition-colors duration-200"
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
              className="shrink-0 mt-1 flex items-center justify-center w-8 h-8 rounded-full border border-white/25 bg-white/15 text-white hover:bg-[#BCED34] hover:text-[#1728F4] hover:border-transparent transition-all duration-300"
            >
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>

      {/* Bottom divider for last item */}
      {isLast && <div className="h-px w-full bg-white/20" />}
    </motion.div>
  );
};

// ─── MAIN ──────────────────────────────────────────────────────────────────────
const Work = () => {
  const experiences: Experience[] = EXPERIENCES as Experience[];

  return (
    <section
      id="experience"
      className="relative py-16 bg-transparent overflow-hidden pointer-events-auto"
    >
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-end justify-between">
            <div>
              <span className="kail-glass-pill font-space inline-flex items-center gap-2 px-3.5 py-1.5 mb-3 text-[10px] font-bold tracking-[0.28em] text-white uppercase rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BCED34] shadow-[0_0_8px_#BCED34]" />
                Journey
              </span>
              <h2 className="font-syne text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase leading-none">
                WORK <span className="text-[#BCED34]">EXPERIENCE</span>
              </h2>
            </div>
            <span className="font-space text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
              {experiences.length} {experiences.length === 1 ? "Position" : "Positions"}
            </span>
          </div>
        </motion.div>

        {/* Realtime Live Counter Banner */}
        <RealtimeExperienceTicker startDate="2025-07-21" />

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
          <div className="flex-1 h-px bg-white/20" />
          <span className="font-space text-[8px] font-bold tracking-[0.35em] uppercase text-white/70 select-none">
            Timeline Start
          </span>
          <div className="flex-1 h-px bg-white/20" />
        </motion.div>
      </div>
    </section>
  );
};

export default Work;

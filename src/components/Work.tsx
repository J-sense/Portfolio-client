"use client";
import React, { useState, useEffect } from "react";
import { EXPERIENCES } from "@/lib/data/index";
import { motion } from "framer-motion";

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

// ─── Realtime Hook (Figma Spec 3.5 Logic Note) ────────────────────────────────
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

// ─── Card A, ExperienceCounter (Figma Spec 3.5, padding 36) ──────────────────
const ExperienceCounterCard = ({ startDate = "2025-07-21" }: { startDate?: string }) => {
  const time = useRealtimeTracker(startDate);

  const units = [
    { value: time.years, label: "YEARS" },
    { value: time.months, label: "MONTHS" },
    { value: time.days, label: "DAYS" },
    { value: String(time.hours).padStart(2, "0"), label: "HOURS" },
    { value: String(time.seconds).padStart(2, "0"), label: "SECS" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="kail-glass p-6 sm:p-[36px]"
    >
      {/* 1. Label: REALTIME EXPERIENCE COUNTER in Mono/Label Lime */}
      <div className="spec-mono-label-lime">
        REALTIME EXPERIENCE COUNTER
      </div>

      {/* 2. Joined line: Joined: July 21, 2025 in Mono/Label Muted, margin top 12 */}
      <div className="spec-mono-label-muted mt-[12px]">
        Joined: July 21, 2025
      </div>

      {/* 3. Counter: number in Display/Counter followed by TOTAL ACTIVE DAYS in Mono/Label with Text/Dim, margin left 10. Margin 14 above, 24 below */}
      <div className="flex flex-wrap items-baseline mt-[14px] mb-[24px]">
        <span className="spec-counter">{time.totalDays}</span>
        <span className="spec-mono-label !text-white/70 ml-[10px]">
          TOTAL ACTIVE DAYS
        </span>
      </div>

      {/* 4. UnitRow: 5 equal tiles, gap 8. Each UnitTile: padding 14 / 4, radius 12, fill Fill/White 10, stroke 1 px Line/Soft */}
      <div className="grid grid-cols-5 gap-[8px]">
        {units.map((u) => (
          <div
            key={u.label}
            className="py-[14px] px-[4px] rounded-[12px] bg-white/[0.10] border border-white/[0.20] flex flex-col items-center justify-center text-center"
          >
            <span className="spec-unit-number">{u.value}</span>
            <span className="spec-mono-unit mt-1">{u.label}</span>
          </div>
        ))}
      </div>

      {/* 5. Footer text, margin top 20, Inter 14, Text/Muted: Company: Join Venture AI. ⚡ Every day & second counted live. */}
      <p className="mt-[20px] font-outfit text-[14px] text-white/[0.84]">
        Company: <span className="text-white font-semibold">Join Venture AI.</span> ⚡ Every day & second counted live.
      </p>
    </motion.div>
  );
};

// ─── Card B, EmploymentCard (Figma Spec 3.5, padding 36) ──────────────────────
const EmploymentCard = ({
  exp,
  index,
}: {
  exp: Experience;
  index: number;
}) => {
  const [showBullets, setShowBullets] = useState(true);
  const highlights = HIGHLIGHTS[exp.company] ?? [];
  const time = useRealtimeTracker(exp.startDate || "2025-07-21");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="kail-glass p-6 sm:p-[36px]"
    >
      {/* 1. Row, space between: PillB Lime reading LIVE: N DAYS on the left, 07/2025 – PRESENT in Mono/Label Muted on the right */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="spec-pill-lime">
          LIVE: {time.totalDays} DAYS
        </span>
        <span className="spec-mono-label-muted">
          {exp.year}
        </span>
      </div>

      {/* 2. Display/H3: Join Venture AI. (margin 16 above, 4 below) */}
      <h3 className="spec-display-h3 mt-[16px] mb-[4px]">
        {exp.company}
      </h3>

      {/* 3. Role: FRONTEND DEVELOPER in Mono/Label Lime */}
      <div className="spec-mono-label-lime">
        {exp.role}
      </div>

      {/* 4. Paragraph in Body/Experience, margin 16 0 */}
      <p className="spec-body-experience my-[16px]">
        {exp.description}
      </p>

      {/* 5. Bullet list, gap 10, text Inter 16.5, each bullet starts with a lime arrow (→, gap 12) */}
      {showBullets && highlights.length > 0 && (
        <ul className="flex flex-col gap-[10px]">
          {highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-[12px] spec-body-card">
              <span className="text-[#BCED34] font-bold shrink-0">→</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {/* 6. Button Secondary: VIEW DETAILS. Margin top 26 */}
      <button
        type="button"
        onClick={() => setShowBullets((v) => !v)}
        className="spec-btn-secondary mt-[26px] cursor-pointer"
      >
        {showBullets ? "VIEW DETAILS" : "SHOW DETAILS"}
      </button>
    </motion.div>
  );
};

// ─── MAIN (Figma Spec 3.5 Work Experience) ────────────────────────────────────
const Work = () => {
  const experiences: Experience[] = EXPERIENCES as Experience[];

  return (
    <section
      id="experience"
      className="relative pb-24 md:pb-[128px] bg-transparent pointer-events-auto"
    >
      {/* Header: Tag: JOURNEY. Title: WORK / EXPERIENCE. Right: Count, text 1 POSITION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[46px]"
      >
        <div className="flex flex-col items-start">
          <div className="spec-section-tag">
            <span className="w-[7px] h-[7px] rounded-full bg-[#BCED34] shadow-[0_0_10px_#BCED34]" />
            <span>JOURNEY</span>
          </div>
          <h2 className="spec-display-h2 mt-[18px]">
            WORK
            <br />
            <span className="text-[#BCED34]">EXPERIENCE</span>
          </h2>
        </div>

        <span className="spec-mono-label-muted">
          {experiences.length} {experiences.length === 1 ? "POSITION" : "POSITIONS"}
        </span>
      </motion.div>

      {/* Two GlassCards stacked vertically, gap 14 */}
      <div className="flex flex-col gap-[14px]">
        <ExperienceCounterCard startDate="2025-07-21" />
        {experiences.map((exp, i) => (
          <EmploymentCard key={i} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Work;

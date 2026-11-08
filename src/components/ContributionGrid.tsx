"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Github, RefreshCw, AlertCircle, Flame, CalendarDays } from "lucide-react";

export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

interface ContributionGridProps {
  className?: string;
  showProfileLink?: boolean;
  showSectionHeader?: boolean;
}

// Map GitHub's default light-mode GraphQL colors to dark-theme equivalents
const DARK_THEME_COLOR_MAP: Record<string, string> = {
  "#ebedf0": "rgba(255, 255, 255, 0.05)",
  "#9be9a8": "#0e4429",
  "#40c463": "#006d32",
  "#30a14e": "#26a641",
  "#216e39": "#39d353",
};

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const glossyCard =
  "bg-gradient-to-b from-[#1A1F29] to-[#0C0F14] border border-[#334155] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-3px_6px_rgba(0,0,0,0.45)]";

export default function ContributionGrid({
  className = "",
  showProfileLink = true,
  showSectionHeader = false,
}: ContributionGridProps) {
  const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fetchContributions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/github-contributions");
      if (!res.ok) {
        throw new Error(`Failed to load contributions (HTTP ${res.status})`);
      }
      const data = await res.json();
      if (!data || !Array.isArray(data.weeks)) {
        throw new Error("Invalid contribution data format received");
      }
      setCalendar(data);
    } catch (err: any) {
      console.error("ContributionGrid fetch error:", err);
      setError(err?.message || "Failed to load GitHub contributions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  // Auto-scroll to the most recent week on smaller viewports
  useEffect(() => {
    if (calendar && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [calendar]);

  // Compute summary metrics & month column headers
  const { activeDays, maxDayCount, monthHeaders } = useMemo(() => {
    if (!calendar?.weeks) {
      return { activeDays: 0, maxDayCount: 0, monthHeaders: [] as Array<{ weekIdx: number; label: string }> };
    }

    let active = 0;
    let peak = 0;
    const headers: Array<{ weekIdx: number; label: string }> = [];
    let lastMonth = -1;

    calendar.weeks.forEach((week, wIdx) => {
      const firstDay = week.contributionDays[0];
      if (firstDay?.date) {
        const month = new Date(`${firstDay.date}T00:00:00Z`).getUTCMonth();
        if (month !== lastMonth) {
          // Avoid overlapping the very first label if the month changes within the first 2 weeks
          if (headers.length > 0 && wIdx - headers[headers.length - 1].weekIdx < 3) {
            headers[headers.length - 1] = { weekIdx: wIdx, label: MONTH_NAMES[month] };
          } else {
            headers.push({ weekIdx: wIdx, label: MONTH_NAMES[month] });
          }
          lastMonth = month;
        }
      }

      week.contributionDays.forEach((day) => {
        if (day.contributionCount > 0) active += 1;
        if (day.contributionCount > peak) peak = day.contributionCount;
      });
    });

    return { activeDays: active, maxDayCount: peak, monthHeaders: headers };
  }, [calendar]);

  const getCellColor = (day: ContributionDay) => {
    if (day.contributionCount === 0) {
      return "rgba(255, 255, 255, 0.05)";
    }
    const normalized = day.color?.toLowerCase();
    if (normalized && DARK_THEME_COLOR_MAP[normalized]) {
      return DARK_THEME_COLOR_MAP[normalized];
    }
    return day.color || "#26a641";
  };

  const formatDate = (dateStr: string) => {
    return new Date(`${dateStr}T00:00:00`).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const sectionHeaderNode = showSectionHeader ? (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-8 text-left"
    >
      <span
        className="inline-flex items-center gap-2 w-fit mb-3 px-3.5 py-1.5 rounded-full select-none
          text-[10px] font-bold tracking-[0.3em] uppercase text-slate-200
          bg-white/[0.06] border border-white/15
          shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#39d353] animate-pulse" />
        Open Source & Commits
      </span>

      <div className="flex items-end justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-[#e2e8f0] uppercase leading-none">
          GITHUB <span className="text-[#94a3b8]">ACTIVITY</span>
        </h2>
        <span className="hidden sm:inline text-[10px] font-black uppercase tracking-[0.2em] text-[#94a3b8]">
          Real-Time Graph
        </span>
      </div>
    </motion.div>
  ) : null;

  // Loading Skeleton State
  if (isLoading) {
    return (
      <section className={`relative w-full ${showSectionHeader ? "py-8" : ""} ${className}`}>
        {sectionHeaderNode}
        <div className={`p-6 sm:p-7 rounded-3xl text-white animate-pulse ${glossyCard}`}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
                <Github size={18} />
              </div>
              <div>
                <div className="h-4 w-48 bg-white/10 rounded-md mb-1.5" />
                <div className="h-3 w-28 bg-white/5 rounded-md" />
              </div>
            </div>
            <div className="h-7 w-28 bg-white/5 rounded-full" />
          </div>

          <div
            className="grid gap-[3px] w-full opacity-40 py-2"
            style={{ gridTemplateColumns: "repeat(53, minmax(0, 1fr))" }}
          >
            {Array.from({ length: 53 }).map((_, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, dIdx) => (
                  <div
                    key={dIdx}
                    className="aspect-square w-full rounded-[2px] bg-white/10"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error State with Retry
  if (error || !calendar) {
    return (
      <section className={`relative w-full ${showSectionHeader ? "py-8" : ""} ${className}`}>
        {sectionHeaderNode}
        <div
          className={`p-6 rounded-3xl border border-rose-500/30 bg-[#121212] text-white shadow-2xl`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <AlertCircle size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-rose-200">GitHub Contributions</h4>
                <p className="text-xs text-rose-400/80">
                  {error || "Unable to display contribution activity."}
                </p>
              </div>
            </div>
            <button
              onClick={fetchContributions}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition-all cursor-pointer"
            >
              <RefreshCw size={13} />
              <span>Retry</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  const monthByWeek = new Map(monthHeaders.map((m) => [m.weekIdx, m.label]));

  return (
    <section
      id="github-contributions"
      className={`relative w-full pointer-events-auto ${showSectionHeader ? "py-8" : ""} ${className}`}
    >
      {sectionHeaderNode}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className={`p-6 sm:p-7 rounded-3xl text-white transition-colors duration-300 hover:border-[#38bdf8]/50 ${glossyCard}`}
      >
        {/* Top Bar: Total Contributions + Metric Pills + Profile CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-5 border-b border-[#334155]/60">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8] shrink-0">
              <Github size={19} />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#e2e8f0] leading-none">
                  {calendar.totalContributions.toLocaleString()}
                </h3>
                <span className="text-xs font-black uppercase tracking-wider text-[#38bdf8]">
                  Contributions
                </span>
              </div>
              <p className="text-[10px] font-bold tracking-widest text-[#94a3b8] uppercase mt-1">
                Committed across the last 12 months
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Active days pill */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-[#334155] text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
              <CalendarDays size={11} className="text-[#38bdf8]" />
              <span>
                <strong className="text-[#e2e8f0]">{activeDays}</strong> Active Days
              </span>
            </div>

            {/* Peak day pill */}
            {maxDayCount > 0 && (
              <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-[#334155] text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                <Flame size={11} className="text-[#39d353]" />
                <span>
                  Peak: <strong className="text-[#e2e8f0]">{maxDayCount}</strong>/day
                </span>
              </div>
            )}

            {showProfileLink && (
              <a
                href="https://github.com/J-sense"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#38bdf8]/30 bg-[#38bdf8]/10 text-[#38bdf8] hover:bg-[#38bdf8] hover:text-[#050505] text-[10px] font-black uppercase tracking-widest transition-all duration-300"
              >
                <span>@J-sense</span>
                <Github size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Scrollable Heatmap Wrapper (fits 100% edge-to-edge on desktop, scrolls on small phones) */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent select-none"
        >
          <div className="min-w-[540px] w-full">
            {/* Month Labels Row */}
            <div
              className="grid gap-[3px] mb-2 h-4"
              style={{
                gridTemplateColumns: `repeat(${calendar.weeks.length}, minmax(0, 1fr))`,
              }}
            >
              {calendar.weeks.map((_, wIdx) => {
                const monthLabel = monthByWeek.get(wIdx);
                return (
                  <div key={wIdx} className="relative">
                    {monthLabel && (
                      <span className="absolute left-0 top-0 text-[9px] font-bold uppercase tracking-wider text-[#94a3b8] whitespace-nowrap">
                        {monthLabel}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 53-Week Contribution Grid */}
            <div
              className="grid gap-[3px] w-full"
              style={{
                gridTemplateColumns: `repeat(${calendar.weeks.length}, minmax(0, 1fr))`,
              }}
              onMouseLeave={() => setHoveredDay(null)}
            >
              {calendar.weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.contributionDays.map((day, dIdx) => {
                    const count = day.contributionCount;
                    const tooltip = `${count} contribution${
                      count === 1 ? "" : "s"
                    } on ${formatDate(day.date)}`;

                    return (
                      <div
                        key={dIdx}
                        onMouseEnter={() => setHoveredDay(day)}
                        className="aspect-square w-full rounded-[2.5px] transition-transform duration-150 hover:scale-125 hover:z-10 hover:ring-1 hover:ring-white/60 cursor-pointer"
                        style={{
                          backgroundColor: getCellColor(day),
                        }}
                        title={tooltip}
                        aria-label={tooltip}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grid Footer: Live Hover Readout & Color Scale Legend */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider pt-4 border-t border-[#334155]/60 mt-3">
          <div className="flex items-center gap-2 min-h-[16px]">
            <span className="w-2 h-2 rounded-full bg-[#39d353] animate-pulse shrink-0" />
            {hoveredDay ? (
              <span className="text-[#e2e8f0]">
                <strong className="text-[#39d353]">{hoveredDay.contributionCount}</strong>{" "}
                contribution{hoveredDay.contributionCount === 1 ? "" : "s"} on{" "}
                <span className="text-[#38bdf8]">{formatDate(hoveredDay.date)}</span>
              </span>
            ) : (
              <span>Hover any square to inspect daily commits</span>
            )}
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <span>Less</span>
            <div className="w-2.5 h-2.5 rounded-[2px] bg-white/[0.05]" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-[#0e4429]" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-[#006d32]" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-[#26a641]" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-[#39d353]" />
            <span>More</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

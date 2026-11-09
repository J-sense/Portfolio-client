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

// Studio KAIL heatmap palette on translucent indigo/periwinkle glass
const HEATMAP_LEVELS = {
  empty: "rgba(255, 255, 255, 0.14)",
  level1: "#9996FE",
  level2: "#CDCDE7",
  level3: "#96B739",
  level4: "#BCED34",
};

const KAIL_HEATMAP_SCALE: Record<string, string> = {
  "#ebedf0": HEATMAP_LEVELS.empty,
  "#161b22": HEATMAP_LEVELS.empty,
  "#9be9a8": HEATMAP_LEVELS.level1,
  "#0e4429": HEATMAP_LEVELS.level1,
  "#40c463": HEATMAP_LEVELS.level2,
  "#006d32": HEATMAP_LEVELS.level2,
  "#30a14e": HEATMAP_LEVELS.level3,
  "#26a641": HEATMAP_LEVELS.level3,
  "#216e39": HEATMAP_LEVELS.level4,
  "#39d353": HEATMAP_LEVELS.level4,
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

const glassyCard = "kail-glass";

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
      return {
        activeDays: 0,
        maxDayCount: 0,
        monthHeaders: [] as Array<{ weekIdx: number; label: string }>,
      };
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
      return HEATMAP_LEVELS.empty;
    }
    const normalized = day.color?.toLowerCase();
    if (normalized && KAIL_HEATMAP_SCALE[normalized]) {
      return KAIL_HEATMAP_SCALE[normalized];
    }
    if (maxDayCount > 0) {
      const ratio = day.contributionCount / maxDayCount;
      if (ratio >= 0.75) return HEATMAP_LEVELS.level4;
      if (ratio >= 0.45) return HEATMAP_LEVELS.level3;
      if (ratio >= 0.2) return HEATMAP_LEVELS.level2;
    }
    return HEATMAP_LEVELS.level1;
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
        className="kail-glass-pill font-space inline-flex items-center gap-2 w-fit mb-3 px-3.5 py-1.5 rounded-full select-none
          text-[10px] font-bold tracking-[0.24em] uppercase text-white"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#BCED34] animate-pulse shadow-[0_0_8px_#BCED34]" />
        Open Source & Commits
      </span>

      <div className="flex items-end justify-between gap-4">
        <h2 className="font-syne text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase leading-none">
          GITHUB <span className="text-[#BCED34]">ACTIVITY</span>
        </h2>
        <span className="hidden sm:inline font-space text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
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
        <div className={`p-6 sm:p-7 rounded-3xl text-white animate-pulse ${glassyCard}`}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center text-white">
                <Github size={18} />
              </div>
              <div>
                <div className="h-4 w-48 bg-white/20 rounded-md mb-1.5" />
                <div className="h-3 w-28 bg-white/15 rounded-md" />
              </div>
            </div>
            <div className="h-7 w-28 bg-white/15 rounded-full" />
          </div>

          <div
            className="grid gap-[3px] w-full opacity-50 py-2"
            style={{ gridTemplateColumns: "repeat(53, minmax(0, 1fr))" }}
          >
            {Array.from({ length: 53 }).map((_, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, dIdx) => (
                  <div
                    key={dIdx}
                    className="aspect-square w-full rounded-[2px] bg-white/20"
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
        <div className={`p-6 rounded-3xl border border-rose-300/40 text-white ${glassyCard}`}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-300/40 flex items-center justify-center text-rose-200">
                <AlertCircle size={18} />
              </div>
              <div>
                <h4 className="font-syne text-sm font-bold text-white">GitHub Contributions</h4>
                <p className="text-xs text-white/80">
                  {error || "Unable to display contribution activity."}
                </p>
              </div>
            </div>
            <button
              onClick={fetchContributions}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl kail-glass-pill text-xs font-semibold text-white transition-all cursor-pointer"
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
        className={`p-6 sm:p-7 rounded-3xl text-white transition-colors duration-300 ${glassyCard}`}
      >
        {/* Top Bar: Total Contributions + Metric Pills + Profile CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-5 border-b border-white/20">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl kail-glass-pill flex items-center justify-center text-[#BCED34] shrink-0">
              <Github size={19} />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="font-syne text-lg sm:text-xl font-extrabold uppercase tracking-tight text-white leading-none">
                  {calendar.totalContributions.toLocaleString()}
                </h3>
                <span className="font-space text-xs font-bold uppercase tracking-wider text-[#BCED34]">
                  Contributions
                </span>
              </div>
              <p className="font-space text-[10px] font-medium tracking-[0.16em] text-white/80 uppercase mt-1">
                Committed across the last 12 months
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Active days pill */}
            <div className="kail-glass-pill font-space hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold text-white uppercase tracking-wider">
              <CalendarDays size={11} className="text-[#BCED34]" />
              <span>
                <strong className="text-[#BCED34]">{activeDays}</strong> Active Days
              </span>
            </div>

            {/* Peak day pill */}
            {maxDayCount > 0 && (
              <div className="kail-glass-pill font-space hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold text-white uppercase tracking-wider">
                <Flame size={11} className="text-[#BCED34]" />
                <span>
                  Peak: <strong className="text-[#BCED34]">{maxDayCount}</strong>/day
                </span>
              </div>
            )}

            {showProfileLink && (
              <a
                href="https://github.com/J-sense"
                target="_blank"
                rel="noopener noreferrer"
                className="font-space inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full kail-glass-pill text-white hover:bg-[#BCED34] hover:text-[#1728F4] text-[10px] font-bold uppercase tracking-widest transition-all duration-300"
              >
                <span>@J-sense</span>
                <Github size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Scrollable Heatmap Wrapper */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent select-none"
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
                      <span className="font-space absolute left-0 top-0 text-[9px] font-semibold uppercase tracking-wider text-white/80 whitespace-nowrap">
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
                        className="aspect-square w-full rounded-[2.5px] transition-transform duration-150 hover:scale-125 hover:z-10 hover:ring-1 hover:ring-[#BCED34] cursor-pointer"
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

        {/* Grid Footer: Live Hover Readout & Studio KAIL Color Scale Legend */}
        <div className="font-space flex flex-wrap items-center justify-between gap-2 text-[10px] font-semibold text-white/80 uppercase tracking-wider pt-4 border-t border-white/20 mt-3">
          <div className="flex items-center gap-2 min-h-[16px]">
            <span className="w-2 h-2 rounded-full bg-[#BCED34] animate-pulse shrink-0 shadow-[0_0_8px_#BCED34]" />
            {hoveredDay ? (
              <span className="text-white">
                <strong className="text-[#BCED34]">{hoveredDay.contributionCount}</strong>{" "}
                contribution{hoveredDay.contributionCount === 1 ? "" : "s"} on{" "}
                <span className="text-white/90">{formatDate(hoveredDay.date)}</span>
              </span>
            ) : (
              <span>Hover any square to inspect daily commits</span>
            )}
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <span>Less</span>
            <div
              className="w-2.5 h-2.5 rounded-[2px]"
              style={{ backgroundColor: HEATMAP_LEVELS.empty }}
            />
            <div
              className="w-2.5 h-2.5 rounded-[2px]"
              style={{ backgroundColor: HEATMAP_LEVELS.level1 }}
            />
            <div
              className="w-2.5 h-2.5 rounded-[2px]"
              style={{ backgroundColor: HEATMAP_LEVELS.level2 }}
            />
            <div
              className="w-2.5 h-2.5 rounded-[2px]"
              style={{ backgroundColor: HEATMAP_LEVELS.level3 }}
            />
            <div
              className="w-2.5 h-2.5 rounded-[2px]"
              style={{ backgroundColor: HEATMAP_LEVELS.level4 }}
            />
            <span>More</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

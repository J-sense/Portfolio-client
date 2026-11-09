"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, AlertCircle } from "lucide-react";

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

// Figma Build Spec 1.1 — Heat/L0 to Heat/L4
const HEATMAP_LEVELS = {
  empty: "rgba(255, 255, 255, 0.14)", // Heat/L0
  level1: "rgba(188, 237, 52, 0.28)", // Heat/L1
  level2: "rgba(188, 237, 52, 0.50)", // Heat/L2
  level3: "rgba(188, 237, 52, 0.78)", // Heat/L3
  level4: "#BCED34",                  // Heat/L4 (100%)
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

export default function ContributionGrid({
  className = "",
  showSectionHeader = false,
}: ContributionGridProps) {
  const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  // Slice to the last 27 weeks per Figma Build Spec 3.1 ("grid of 27 columns by 7 rows")
  const recentWeeks = calendar?.weeks ? calendar.weeks.slice(-27) : [];

  const maxDayCount = React.useMemo(() => {
    let peak = 0;
    recentWeeks.forEach((week) => {
      week.contributionDays.forEach((day) => {
        if (day.contributionCount > peak) peak = day.contributionCount;
      });
    });
    return peak;
  }, [recentWeeks]);

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

  // Figma Build Spec 3.1 — Header: SectionHeader (Tag: OPEN SOURCE & COMMITS, Title: GITHUB / ACTIVITY, Right: PillLime REAL-TIME GRAPH)
  const sectionHeaderNode = showSectionHeader ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[46px] text-left"
    >
      <div className="flex flex-col items-start">
        <div className="spec-section-tag">
          <span className="w-[7px] h-[7px] rounded-full bg-[#BCED34] shadow-[0_0_10px_#BCED34]" />
          <span>OPEN SOURCE & COMMITS</span>
        </div>
        <h2 className="spec-display-h2 mt-[18px]">
          GITHUB
          <br />
          <span className="text-[#BCED34]">ACTIVITY</span>
        </h2>
      </div>

      <span className="spec-pill-lime shrink-0 self-start md:self-end">
        REAL-TIME GRAPH
      </span>
    </motion.div>
  ) : null;

  // Loading Skeleton State
  if (isLoading) {
    return (
      <section className={`relative w-full ${showSectionHeader ? "pb-24 md:pb-[128px]" : ""} ${className}`}>
        {sectionHeaderNode}
        <div className="kail-glass p-6 sm:p-[32px] animate-pulse">
          <div className="flex items-center justify-between gap-3 mb-[20px]">
            <div className="h-4 w-64 bg-white/20 rounded" />
            <div className="h-4 w-16 bg-white/20 rounded" />
          </div>
          <div
            className="grid gap-[5px] w-full"
            style={{ gridTemplateColumns: "repeat(27, minmax(0, 1fr))" }}
          >
            {Array.from({ length: 27 }).map((_, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[5px]">
                {Array.from({ length: 7 }).map((_, dIdx) => (
                  <div
                    key={dIdx}
                    className="aspect-square w-full rounded-[3px] bg-white/14"
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
      <section className={`relative w-full ${showSectionHeader ? "pb-24 md:pb-[128px]" : ""} ${className}`}>
        {sectionHeaderNode}
        <div className="kail-glass p-6 sm:p-[32px] border border-rose-300/40 text-white">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-300/40 flex items-center justify-center text-rose-200">
                <AlertCircle size={18} />
              </div>
              <div>
                <h4 className="spec-card-title">GitHub Contributions</h4>
                <p className="spec-body-card">
                  {error || "Unable to display contribution activity."}
                </p>
              </div>
            </div>
            <button
              onClick={fetchContributions}
              className="spec-pill-default gap-2 cursor-pointer"
            >
              <RefreshCw size={12} />
              <span>Retry</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="github-contributions"
      className={`relative w-full pointer-events-auto ${showSectionHeader ? "pb-24 md:pb-[128px]" : ""} ${className}`}
    >
      {sectionHeaderNode}

      {/* Figma Build Spec 3.1 — Card: GitHubActivityCard (GlassCard, width 778, padding 32) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="kail-glass p-6 sm:p-[32px] text-white"
      >
        {/* 1. Top row, space between, margin bottom 20 */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-[20px]">
          <span className="spec-mono-label-muted">
            GitHub Contributions · Last 27 weeks ({calendar.totalContributions.toLocaleString()} total)
          </span>
          <a
            href="https://github.com/J-sense"
            target="_blank"
            rel="noopener noreferrer"
            className="spec-mono-label-lime hover:opacity-80 transition-opacity"
          >
            ● Live
          </a>
        </div>

        {/* 2. Heatmap: grid of 27 columns by 7 rows, gap 5 both ways */}
        <div className="overflow-x-auto pb-1">
          <div
            className="grid gap-[5px] min-w-[560px] w-full"
            style={{
              gridTemplateColumns: `repeat(${recentWeeks.length || 27}, minmax(0, 1fr))`,
            }}
          >
            {recentWeeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[5px]">
                {week.contributionDays.map((day, dIdx) => {
                  const count = day.contributionCount;
                  const tooltip = `${count} contribution${
                    count === 1 ? "" : "s"
                  } on ${formatDate(day.date)}`;

                  return (
                    <motion.div
                      key={dIdx}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.45,
                        delay: (wIdx * 7 + dIdx) * 0.003,
                      }}
                      className="aspect-square w-full rounded-[3px] transition-transform duration-150 hover:scale-125 hover:z-10 hover:ring-1 hover:ring-[#BCED34] cursor-pointer"
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

        {/* 3. Legend, margin top 16, horizontal, right aligned, gap 6, text Mono/Label in Text/Dim */}
        <div className="flex items-center justify-end gap-[6px] mt-[16px]">
          <span className="spec-mono-label !text-white/70">Less</span>
          <div
            className="w-[12px] h-[12px] rounded-[3px]"
            style={{ backgroundColor: HEATMAP_LEVELS.empty }}
          />
          <div
            className="w-[12px] h-[12px] rounded-[3px]"
            style={{ backgroundColor: HEATMAP_LEVELS.level1 }}
          />
          <div
            className="w-[12px] h-[12px] rounded-[3px]"
            style={{ backgroundColor: HEATMAP_LEVELS.level2 }}
          />
          <div
            className="w-[12px] h-[12px] rounded-[3px]"
            style={{ backgroundColor: HEATMAP_LEVELS.level3 }}
          />
          <div
            className="w-[12px] h-[12px] rounded-[3px]"
            style={{ backgroundColor: HEATMAP_LEVELS.level4 }}
          />
          <span className="spec-mono-label !text-white/70">More</span>
        </div>
      </motion.div>
    </section>
  );
}

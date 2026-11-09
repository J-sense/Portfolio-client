"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Clock,
  Copy,
  Cpu,
  Facebook,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Sparkles,
  Terminal,
  Zap
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type TabMode = "profile" | "terminal" | "stack";

export default function InteractiveSidebar() {
  const [activeTab, setActiveTab] = useState<TabMode>("profile");
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState("");
  const [commandInput, setCommandInput] = useState("");
  const [commandLog, setCommandLog] = useState<string[]>([
    "system: boot sequence initialized...",
    "status: available for contract & full-time roles",
  ]);

  // Live Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("jishan1873@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    let response = `bash: command not found: ${cmd}`;
    if (cmd === "help") response = "commands: skills, contact, bio, clear, date";
    else if (cmd === "skills") response = "core: React, Next.js 15, TypeScript, Tailwind, Node.js";
    else if (cmd === "contact") response = "email: jishan1873@gmail.com | phone: +8801914667297";
    else if (cmd === "bio") response = "Full-stack engineer crafting high-performance interactive interfaces.";
    else if (cmd === "date") response = `system time: ${new Date().toISOString()}`;
    else if (cmd === "clear") {
      setCommandLog([]);
      setCommandInput("");
      return;
    }

    setCommandLog((prev) => [...prev.slice(-4), `> ${cmd}`, response]);
    setCommandInput("");
  };

  return (
    <aside className="lg:sticky lg:top-20 lg:self-start flex flex-col w-full max-w-[370px] mx-auto select-none">
      {/* ── Main Unified Glass Capsule ── */}
      <div className="kail-glass p-4 sm:p-5 flex flex-col rounded-[26px] shadow-2xl relative overflow-hidden backdrop-blur-2xl border border-white/[0.30]">

        {/* Top Control Bar: HUD Telemetry & Mode Switcher */}
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/[0.18]">
          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BCED34] opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BCED34]" />
            </span>
            <span className="spec-mono-label-lime !text-[10px] tracking-widest">
              SYS.ONLINE
            </span>
          </div>

          {/* Micro Segmented Tab Switcher */}
          <div className="flex items-center p-1 rounded-full bg-white/[0.10] border border-white/[0.20]">
            <button
              onClick={() => setActiveTab("profile")}
              title="ID Card Mode"
              className={`px-2.5 py-1 rounded-full text-[9px] font-space font-bold uppercase transition-all ${activeTab === "profile"
                  ? "bg-[#BCED34] text-[#10127A] shadow-sm"
                  : "text-white/70 hover:text-white"
                }`}
            >
              ID
            </button>
            <button
              onClick={() => setActiveTab("terminal")}
              title="Interactive Terminal"
              className={`px-2.5 py-1 rounded-full text-[9px] font-space font-bold uppercase transition-all flex items-center gap-1 ${activeTab === "terminal"
                  ? "bg-[#BCED34] text-[#10127A] shadow-sm"
                  : "text-white/70 hover:text-white"
                }`}
            >
              <Terminal size={10} />
              CLI
            </button>
            <button
              onClick={() => setActiveTab("stack")}
              title="Quick Stack Matrix"
              className={`px-2.5 py-1 rounded-full text-[9px] font-space font-bold uppercase transition-all flex items-center gap-1 ${activeTab === "stack"
                  ? "bg-[#BCED34] text-[#10127A] shadow-sm"
                  : "text-white/70 hover:text-white"
                }`}
            >
              <Cpu size={10} />
              VIBE
            </button>
          </div>
        </div>

        {/* ── Mode 1: Compact Cyber Identity View ── */}
        <AnimatePresence mode="wait">
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col"
            >
              {/* Compact Holographic Portrait */}
              <div className="relative w-full h-[190px] sm:h-[210px] rounded-[18px] overflow-hidden group mb-3.5 bg-[#0E1276]/60 border border-white/[0.25]">
                <Image
                  src="/images/my-profile-card.png"
                  alt="Najmul Hassan Jishan"
                  fill
                  sizes="(min-width: 1024px) 370px, 100vw"
                  className="object-cover object-top transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                  priority
                />

                {/* Scanline / Grid overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-25 group-hover:opacity-40 transition-opacity"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(188, 237, 52, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Gradient vignette */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0E1276]/95 via-[#0E1276]/40 to-transparent pointer-events-none" />

                {/* Floating Corner Badges */}
                <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-[9px] font-space font-bold uppercase tracking-wider">
                  <span className="px-2 py-0.5 rounded-md bg-[#1B2BF4]/80 border border-white/30 text-white backdrop-blur-md">
                    LVL.99 FULL STACK
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#BCED34]/90 text-[#10127A]">
                    PRO VERIFIED
                  </span>
                </div>
              </div>

              {/* Title & Micro Bio */}
              <div className="flex flex-col text-left mb-3">
                <h2 className="spec-display-h3 uppercase !text-[23px] tracking-tight leading-none mb-1 text-white">
                  JISHAN HASSAN
                </h2>
                <div className="flex items-center justify-between gap-2">
                  <p className="spec-mono-subtitle !text-[11px] text-white/80">
                    Software Engineer
                  </p>
                  <span className="spec-mono-label-lime !text-[9px] px-2 py-0.5 rounded-full bg-[#BCED34]/15 border border-[#BCED34]/30">
                    OPEN FOR ROLES
                  </span>
                </div>
              </div>

              <p className="spec-body-card !text-[12.5px] leading-relaxed text-white/85 mb-3.5 line-clamp-2">
                Engineering high-performance web systems, surgical integrations, and modern aesthetic digital experiences.
              </p>
            </motion.div>
          )}

          {/* ── Mode 2: Interactive Cyber Terminal (CLI) ── */}
          {activeTab === "terminal" && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-[280px] bg-[#07082A]/90 rounded-[18px] p-3 border border-white/[0.22] font-space mb-3 text-left overflow-hidden"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[9px] text-white/60">
                <span className="flex items-center gap-1.5 text-[#BCED34]">
                  <Terminal size={11} /> jish-sh v1.0
                </span>
                <span>type &apos;help&apos;</span>
              </div>

              {/* Terminal Logs */}
              <div className="flex-1 overflow-y-auto space-y-1.5 text-[10px] pr-1 scrollbar-none">
                {commandLog.map((log, i) => (
                  <div
                    key={i}
                    className={
                      log.startsWith(">")
                        ? "text-[#BCED34] font-bold"
                        : "text-white/80"
                    }
                  >
                    {log}
                  </div>
                ))}
              </div>

              {/* Terminal Input */}
              <form onSubmit={handleCommand} className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5">
                <span className="text-[#BCED34] text-xs font-bold">&gt;</span>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="type command..."
                  className="bg-transparent flex-1 text-white text-[11px] focus:outline-none placeholder-white/30"
                />
                <button
                  type="submit"
                  className="p-1 rounded bg-[#BCED34] text-[#10127A] hover:opacity-90"
                >
                  <Send size={10} />
                </button>
              </form>
            </motion.div>
          )}

          {/* ── Mode 3: Radar / Vibe Card ── */}
          {activeTab === "stack" && (
            <motion.div
              key="stack"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-[280px] rounded-[18px] p-4 bg-white/[0.06] border border-white/[0.20] mb-3 text-left justify-between"
            >
              <div>
                <span className="spec-mono-label-lime !text-[10px]">
                  ARCHITECTURAL DNA
                </span>
                <h3 className="spec-card-title mt-1 mb-3">Core Radar</h3>

                <div className="space-y-2">
                  {[
                    { name: "Frontend Mastery (Next.js)", val: 96 },
                    { name: "Full Stack & Realtime APIs", val: 90 },
                    { name: "State Architecture (Redux)", val: 88 },
                    { name: "Database & ORM Systems", val: 84 },
                  ].map((s) => (
                    <div key={s.name} className="flex flex-col gap-1">
                      <div className="flex justify-between text-[10px] font-space text-white/80">
                        <span>{s.name}</span>
                        <span className="text-[#BCED34] font-bold">{s.val}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/15 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#BCED34] to-[#7A7EF1] rounded-full"
                          style={{ width: `${s.val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-2 rounded-xl bg-white/[0.08] border border-white/10 flex items-center gap-2">
                <Zap size={14} className="text-[#BCED34] shrink-0" />
                <span className="text-[10px] font-space text-white/90">
                  Real-time sockets & low latency performance optimized.
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Always Visible Live Meta Strip ── */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="py-2 px-3 rounded-xl bg-white/[0.08] border border-white/[0.18] flex items-center gap-2">
            <MapPin size={12} className="text-[#BCED34] shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[8px] font-space uppercase text-white/60">Base</span>
              <span className="text-[11px] font-space font-bold text-white">Dhaka, BD</span>
            </div>
          </div>

          <div className="py-2 px-3 rounded-xl bg-white/[0.08] border border-white/[0.18] flex items-center gap-2">
            <Clock size={12} className="text-[#BCED34] shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[8px] font-space uppercase text-white/60">Local Time</span>
              <span className="text-[11px] font-space font-bold text-[#BCED34] tabular-nums">
                {localTime || "12:00:00 PM"}
              </span>
            </div>
          </div>
        </div>

        {/* ── Direct Clipboard Action Button ── */}
        <button
          onClick={handleCopyEmail}
          className="w-full mb-3.5 py-2.5 px-3 rounded-full bg-white/[0.12] hover:bg-[#BCED34] hover:text-[#10127A] border border-white/[0.30] hover:border-[#BCED34] text-white transition-all duration-300 flex items-center justify-between group cursor-pointer text-xs font-space font-bold uppercase tracking-wider select-none shadow-sm"
        >
          <span className="flex items-center gap-2 truncate">
            <Mail size={13} className="text-[#BCED34] group-hover:text-[#10127A] shrink-0" />
            <span className="truncate text-[11px]">jishan1873@gmail.com</span>
          </span>
          <span className="shrink-0 flex items-center gap-1 text-[9px] pl-2">
            {copied ? (
              <>
                <Check size={11} className="text-emerald-400 group-hover:text-[#10127A]" />
                <span>COPIED!</span>
              </>
            ) : (
              <>
                <Copy size={11} />
                <span>COPY</span>
              </>
            )}
          </span>
        </button>

        {/* ── Footer Social Icons & Quick CTA ── */}
        <div className="flex items-center justify-between pt-3 border-t border-white/20">
          <div className="flex gap-2">
            <a
              href="https://github.com/j-sense/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white kail-glass-pill hover:bg-[#BCED34] hover:text-[#10127A] hover:border-[#BCED34] transition-all duration-200"
            >
              <Github size={15} />
            </a>
            <a
              href="https://www.linkedin.com/in/najmul-hasan-222b43273/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white kail-glass-pill hover:bg-[#BCED34] hover:text-[#10127A] hover:border-[#BCED34] transition-all duration-200"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="https://www.facebook.com/mdnajmulhasan.jishan/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white kail-glass-pill hover:bg-[#BCED34] hover:text-[#10127A] hover:border-[#BCED34] transition-all duration-200"
            >
              <Facebook size={15} />
            </a>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#BCED34] hover:bg-white text-[#10127A] font-space font-bold text-[10px] uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(188,237,52,0.35)]"
          >
            <Sparkles size={11} />
            <span>LET&apos;S TALK</span>
          </a>
        </div>
      </div>
    </aside>
  );
}

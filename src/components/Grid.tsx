"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, ShieldCheck, Database, CheckCircle } from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const techCategories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: <Monitor size={14} />,
    color: "lime" as const,
    techs: [
      {
        name: "React & Next.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        role: "Web Applications",
        level: 95,
        badge: "Core",
      },
      {
        name: "React Native & Expo",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        role: "Mobile Apps",
        level: 90,
        badge: "Expert",
      },
      {
        name: "TypeScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        role: "Type-Safe Logic",
        level: 95,
        badge: "Core",
      },
      {
        name: "Tailwind CSS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        role: "Interface Design",
        level: 95,
        badge: "Core",
      },
    ],
  },
  {
    id: "auth",
    label: "Auth & State",
    icon: <ShieldCheck size={14} />,
    color: "orange" as const,
    techs: [
      {
        name: "Redux & RTK Query",
        logo: "https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo-title-dark.png",
        role: "State & Query Cache",
        level: 90,
        badge: "Core",
      },
      {
        name: "NextAuth.js",
        logo: "https://next-auth.js.org/img/logo/logo-sm.png",
        role: "Session Shield",
        level: 85,
        badge: "Stable",
      },
      {
        name: "JWT Validation",
        logo: "https://jwt.io/img/pic_logo.svg",
        role: "API Protection",
        level: 95,
        badge: "Core",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend & DB",
    icon: <Database size={14} />,
    color: "lime" as const,
    techs: [
      {
        name: "Node.js & Express",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        role: "REST API Servers",
        level: 90,
        badge: "Core",
      },
      {
        name: "MongoDB & Mongoose",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        role: "NoSQL DB & ODM",
        level: 90,
        badge: "Core",
      },
      {
        name: "Firebase Cloud",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        role: "Cloud Storage & Auth",
        level: 85,
        badge: "Stable",
      },
    ],
  },
];

const tools = [
  {
    name: "VS Code",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    category: "IDE / Workspace",
    useCase: "Primary workspace with custom snippet expansions.",
  },
  {
    name: "Git & GitHub",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    category: "Version Control",
    useCase: "Manages branching strategy and secure code storage.",
  },
  {
    name: "Postman",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    category: "API Sandbox",
    useCase: "Simulates HTTP payloads and endpoint assertions.",
  },
  {
    name: "Vercel",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    category: "Cloud Deployment",
    useCase: "Automated frontend preview builds and Edge routing.",
  },
  {
    name: "Docker Engine",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    category: "Containers",
    useCase: "Isolates execution stacks to match production nodes.",
  },
  {
    name: "Expo CLI",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Mobile Tooling",
    useCase: "Compiles React Native bundles into native binaries.",
  },
  {
    name: "Prisma ORM",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
    category: "SQL Data Layer",
    useCase: "Type-safe database migrations and client generation.",
  },
  {
    name: "GitHub Actions",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    category: "CI/CD",
    useCase: "Triggers tests and builds code quality pipelines.",
  },
];

// ─── RADIAL PROFICIENCY RING ───────────────────────────────────────────────────

const ProficiencyRing = ({
  level,
  color,
}: {
  level: number;
  color: "lime" | "orange";
}) => {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const dash = (level / 100) * circ;
  const accent = color === "lime" ? "#c5ff41" : "#f46c38";

  return (
    <svg width="44" height="44" className="shrink-0 -rotate-90">
      <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
      <motion.circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        whileInView={{ strokeDashoffset: circ - dash }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <text
        x="22"
        y="22"
        textAnchor="middle"
        dominantBaseline="central"
        className="rotate-90"
        style={{
          fill: accent,
          fontSize: "7px",
          fontWeight: 900,
          fontFamily: "inherit",
          transform: "rotate(90deg)",
          transformOrigin: "22px 22px",
        }}
      >
        {level}%
      </text>
    </svg>
  );
};

// ─── TECH CARD ─────────────────────────────────────────────────────────────────

const TechCard = ({
  tech,
  color,
  i,
}: {
  tech: (typeof techCategories)[0]["techs"][0];
  color: "lime" | "orange";
  i: number;
}) => {
  const badgeCls =
    color === "lime"
      ? "bg-[#c5ff41]/8 border-[#c5ff41]/20 text-[#c5ff41]"
      : "bg-[#f46c38]/8 border-[#f46c38]/20 text-[#f46c38]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, delay: i * 0.07 }}
      className="group flex items-center gap-4 p-4 rounded-2xl bg-[#1a1917] border border-white/[0.05] hover:border-white/10 transition-all duration-300"
    >
      {/* Logo */}
      <div className="w-9 h-9 relative shrink-0 rounded-xl bg-black/30 flex items-center justify-center p-1.5">
        <Image
          src={tech.logo}
          alt={tech.name}
          fill
          className="object-contain p-1.5 grayscale group-hover:grayscale-0 transition-all duration-500"
          unoptimized
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-[11px] font-black text-white uppercase tracking-wide truncate">
          {tech.name}
        </h4>
        <p className="text-[9px] text-[#998f8f] uppercase tracking-wider truncate mt-0.5">
          {tech.role}
        </p>
      </div>

      {/* Badge */}
      <span
        className={`text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border shrink-0 ${badgeCls}`}
      >
        {tech.badge}
      </span>

      {/* Ring */}
      <ProficiencyRing level={tech.level} color={color} />
    </motion.div>
  );
};

// ─── TOOL ROW ──────────────────────────────────────────────────────────────────

const ToolRow = ({
  tool,
  i,
}: {
  tool: (typeof tools)[0];
  i: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -12 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.4, delay: i * 0.06 }}
    className="group flex items-center gap-4 py-3.5 border-b border-white/[0.05] hover:bg-white/[0.015] px-2 -mx-2 rounded-lg transition-all duration-200 cursor-default"
  >
    {/* Logo */}
    <div className="w-7 h-7 relative shrink-0">
      <Image
        src={tool.logo}
        alt={tool.name}
        fill
        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-400"
        unoptimized
      />
    </div>

    {/* Name + use case */}
    <div className="flex-1 min-w-0">
      <span className="text-[11px] font-black text-white uppercase tracking-wide">
        {tool.name}
      </span>
      <span className="hidden sm:inline text-[#998f8f] text-[10px] ml-3">
        — {tool.useCase}
      </span>
    </div>

    {/* Category pill */}
    <span className="text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/[0.07] bg-white/[0.03] text-[#998f8f] shrink-0">
      {tool.category}
    </span>

    {/* Dot indicator */}
    <CheckCircle
      size={12}
      className="text-[#c5ff41]/40 group-hover:text-[#c5ff41] transition-colors duration-300 shrink-0"
    />
  </motion.div>
);

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

const SkillSection = () => {
  const [activeTab, setActiveTab] = useState("frontend");
  const active = techCategories.find((c) => c.id === activeTab)!;

  return (
    <section id="skills" className="relative py-20 bg-[#151312] overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,255,65,0.03)_0%,transparent_60%)] pointer-events-none -z-10" />

      <div className="relative z-10">

        {/* ── TECHNICAL STACK ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="inline-block px-3 py-1 mb-3 text-[9px] font-black tracking-[0.3em] text-[#c5ff41] uppercase bg-[#c5ff41]/5 border border-[#c5ff41]/20 rounded-full">
            Technical Stack
          </span>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase leading-none">
              ARCHITECTURE <span className="text-[#998f8f]">CANVAS</span>
            </h2>
            <p className="hidden sm:block text-[#998f8f] text-[11px] max-w-[260px] text-right leading-relaxed">
              Full-stack toolchain for web, mobile & backend systems.
            </p>
          </div>
        </motion.div>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-6 p-1 rounded-2xl bg-[#1a1917] border border-white/[0.05] w-fit">
          {techCategories.map((cat) => {
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-250 ${
                  isActive
                    ? cat.color === "lime"
                      ? "bg-[#c5ff41] text-black"
                      : "bg-[#f46c38] text-black"
                    : "text-[#998f8f] hover:text-white"
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Tech cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-16 min-h-[180px]">
          <AnimatePresence mode="wait">
            {active.techs.map((tech, i) => (
              <TechCard key={`${activeTab}-${tech.name}`} tech={tech} color={active.color} i={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* ── UTILITIES MATRIX ─────────────────────────────────── */}
        <div className="border-t border-white/[0.06] pt-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-8"
          >
            <span className="inline-block px-3 py-1 mb-3 text-[9px] font-black tracking-[0.3em] text-[#f46c38] uppercase bg-[#f46c38]/5 border border-[#f46c38]/20 rounded-full">
              Utilities Matrix
            </span>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase leading-none">
                DEV <span className="text-[#998f8f]">PIPELINES</span>
              </h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#998f8f]">
                {tools.length} Tools Active
              </span>
            </div>
          </motion.div>

          {/* Two-column tool list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            {tools.map((tool, i) => (
              <ToolRow key={tool.name} tool={tool} i={i} />
            ))}
            {/* last bottom border */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillSection;

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

// ─── DATA (Figma Build Spec 3.2 & 3.3) ─────────────────────────────────────────

const techCategories = [
  {
    id: "frontend",
    label: "FRONTEND",
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
    label: "AUTH & STATE",
    techs: [
      {
        name: "NextAuth / JWT",
        logo: "https://next-auth.js.org/img/logo/logo-sm.png",
        role: "Authentication",
        level: 85,
        badge: "Solid",
      },
      {
        name: "Redux & Zustand",
        logo: "https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo-title-dark.png",
        role: "State Management",
        level: 88,
        badge: "Solid",
      },
      {
        name: "Socket.io",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
        role: "Real-time State",
        level: 85,
        badge: "Solid",
      },
      {
        name: "React Query",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        role: "Server State",
        level: 88,
        badge: "Solid",
      },
    ],
  },
  {
    id: "backend",
    label: "BACKEND & DB",
    techs: [
      {
        name: "Node.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        role: "Server Runtime",
        level: 80,
        badge: "Solid",
      },
      {
        name: "Prisma ORM",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
        role: "Type-safe SQL",
        level: 82,
        badge: "Solid",
      },
      {
        name: "PostgreSQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        role: "Relational Data",
        level: 78,
        badge: "Working",
      },
      {
        name: "REST APIs",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        role: "Integrations",
        level: 90,
        badge: "Core",
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

// ─── RADIAL PROFICIENCY RING (Figma Spec 3.2: 66 × 66, stroke width 4) ────────

const ProficiencyRing = ({ level }: { level: number }) => {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (level / 100) * circ;

  return (
    <div className="relative w-[66px] h-[66px] shrink-0 flex items-center justify-center">
      <svg width="66" height="66" className="-rotate-90">
        <circle
          cx="33"
          cy="33"
          r={r}
          fill="none"
          stroke="rgba(255, 255, 255, 0.22)"
          strokeWidth="4"
        />
        <motion.circle
          cx="33"
          cy="33"
          r={r}
          fill="none"
          stroke="#BCED34"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: circ - dash }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <span className="spec-ring-pct absolute inset-0 flex items-center justify-center">
        {level}%
      </span>
    </div>
  );
};

// ─── SKILL CARD (Figma Spec 3.2: padding 26, gap 18, IconTile Square 56) ──────

const TechCard = ({
  tech,
  i,
}: {
  tech: (typeof techCategories)[0]["techs"][0];
  i: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: i * 0.08 }}
      className="kail-glass group flex items-center gap-[18px] p-[26px] select-none hover:-translate-y-[3px]"
    >
      {/* 1. IconTile Square (56 × 56, radius 16, Fill/White 88) */}
      <div className="w-[56px] h-[56px] relative shrink-0 rounded-[16px] flex items-center justify-center bg-white/[0.88]">
        <Image
          src={tech.logo}
          alt={tech.name}
          fill
          className="object-contain p-3"
          unoptimized
        />
      </div>

      {/* 2. Text stack: Title (Display/Card Title), Subtitle (Mono/Subtitle, margin 4 0 12), PillB Default */}
      <div className="flex-1 min-w-0 flex flex-col items-start">
        <h4 className="spec-card-title truncate max-w-full">
          {tech.name}
        </h4>
        <p className="spec-mono-subtitle mt-[4px] mb-[12px] truncate max-w-full">
          {tech.role}
        </p>
        <span className="spec-pill-default">
          {tech.badge}
        </span>
      </div>

      {/* 3. Ring 66 × 66 */}
      <ProficiencyRing level={tech.level} />
    </motion.div>
  );
};

// ─── TOOL ROW (Figma Spec 3.3: padding 28 / 6, IconTile Circle 52) ────────────

const ToolRow = ({
  tool,
  i,
}: {
  tool: (typeof tools)[0];
  i: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.45, delay: i * 0.07 }}
    className="group flex items-start gap-[18px] py-[28px] px-[6px] border-b border-white/[0.20] hover:bg-white/[0.08] transition-colors duration-200 cursor-default select-none"
  >
    {/* 1. IconTile Circle (52 × 52, radius 50%, Fill/White 88) */}
    <div className="w-[52px] h-[52px] relative shrink-0 rounded-full bg-white/[0.88] flex items-center justify-center">
      <Image
        src={tool.logo}
        alt={tool.name}
        fill
        className="object-contain p-3"
        unoptimized
      />
    </div>

    {/* 2. Stack: Title (Display/Tool Title), Description (Body/Card, margin 6 0 14), PillB Default */}
    <div className="flex-1 min-w-0 flex flex-col items-start">
      <h4 className="spec-tool-title">
        {tool.name}
      </h4>
      <p className="spec-body-card mt-[6px] mb-[14px]">
        {tool.useCase}
      </p>
      <span className="spec-pill-default">
        {tool.category}
      </span>
    </div>

    {/* 3. Check icon, 18 px, Brand/Lime */}
    <Check
      size={18}
      className="text-[#BCED34] shrink-0 mt-1"
    />
  </motion.div>
);

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

const SkillSection = () => {
  const [activeTab, setActiveTab] = useState("frontend");
  const active = techCategories.find((c) => c.id === activeTab)!;

  return (
    <div className="flex flex-col">
      {/* ── 3.2 ARCHITECTURE CANVAS ─────────────────────────────────── */}
      <section
        id="skills"
        className="relative pb-24 md:pb-[128px] bg-transparent"
      >
        {/* Header: Tag: TECHNICAL STACK. Title: ARCHITECTURE / CANVAS. Right: Sub */}
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
              <span>TECHNICAL STACK</span>
            </div>
            <h2 className="spec-display-h2 mt-[18px]">
              ARCHITECTURE
              <br />
              <span className="text-[#BCED34]">CANVAS</span>
            </h2>
          </div>

          <p className="spec-body-sub max-w-[340px] md:text-right">
            Full-stack toolchain for web, mobile & backend systems.
          </p>
        </motion.div>

        {/* Tabs (component TabBar): padding 6, gap 4, radius 99, Fill/White 12, stroke Line/Strong */}
        <div
          role="tablist"
          className="inline-flex flex-wrap gap-[4px] mb-[20px] p-[6px] rounded-full bg-white/[0.12] border border-white/[0.34] backdrop-blur-[12px]"
        >
          {techCategories.map((cat) => {
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(cat.id)}
                className={`spec-mono-tab h-[48px] px-[24px] rounded-full transition-all duration-300 cursor-pointer select-none ${
                  isActive
                    ? "bg-[#BCED34] text-[#10127A]"
                    : "text-white/[0.84] hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Grid: 2 columns, gap 14 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-[14px]"
          >
            {active.techs.map((tech, i) => (
              <TechCard key={`${activeTab}-${tech.name}`} tech={tech} i={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── 3.3 DEV PIPELINES ───────────────────────────────────────── */}
      <section className="relative pb-24 md:pb-[128px] bg-transparent">
        {/* Header: Tag: UTILITIES MATRIX. Title: DEV / PIPELINES. Right: Count, 8 TOOLS ACTIVE */}
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
              <span>UTILITIES MATRIX</span>
            </div>
            <h2 className="spec-display-h2 mt-[18px]">
              DEV
              <br />
              <span className="text-[#BCED34]">PIPELINES</span>
            </h2>
          </div>

          <span className="spec-mono-label-muted">
            {tools.length} TOOLS ACTIVE
          </span>
        </motion.div>

        {/* Grid: 2 columns, column gap 30, no row gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[30px]">
          {tools.map((tool, i) => (
            <ToolRow key={tool.name} tool={tool} i={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default SkillSection;

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

// ─── SECTION BADGE (Studio KAIL frosted glass pill) ───────────────────────────

const SectionBadge = ({ children }: { children: React.ReactNode }) => (
  <span
    className="kail-glass-pill font-space inline-flex items-center gap-2 w-fit mb-3 px-3.5 py-1.5 rounded-full select-none
      text-[10px] font-bold tracking-[0.28em] uppercase text-white"
  >
    <span className="w-1.5 h-1.5 rounded-full bg-[#BCED34] shadow-[0_0_8px_#BCED34]" />
    {children}
  </span>
);

// ─── RADIAL PROFICIENCY RING ───────────────────────────────────────────────────

const ProficiencyRing = ({ level }: { level: number }) => {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const dash = (level / 100) * circ;
  const accent = "#BCED34";

  return (
    <svg width="44" height="44" className="shrink-0 -rotate-90">
      <circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="3"
      />
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
          fill: "#FFFFFF",
          fontSize: "7px",
          fontWeight: 800,
          fontFamily: "var(--font-space), sans-serif",
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
  i,
}: {
  tech: (typeof techCategories)[0]["techs"][0];
  i: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: i * 0.07 }}
      className="kail-glass group flex items-center gap-4 p-4 rounded-2xl select-none
        hover:border-white/50 transition-colors duration-300"
    >
      {/* Logo tile */}
      <div
        className="w-10 h-10 relative shrink-0 rounded-xl flex items-center justify-center
          bg-white/15 border border-white/25
          shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
      >
        <Image
          src={tech.logo}
          alt={tech.name}
          fill
          className="object-contain p-2 grayscale group-hover:grayscale-0 transition-all duration-500"
          unoptimized
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-syne text-xs font-extrabold text-white uppercase tracking-tight truncate">
          {tech.name}
        </h4>
        <p className="font-space text-[10px] text-white/80 uppercase tracking-wider truncate mt-0.5">
          {tech.role}
        </p>
      </div>

      {/* Badge */}
      <span
        className="kail-glass-pill font-space text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0
          text-white"
      >
        {tech.badge}
      </span>

      {/* Ring */}
      <ProficiencyRing level={tech.level} />
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
    className="group flex items-center gap-4 py-3.5 border-b border-white/20 hover:bg-white/10 px-2.5 -mx-2.5 rounded-xl transition-colors duration-200 cursor-default select-none"
  >
    {/* Logo tile */}
    <div
      className="w-8 h-8 relative shrink-0 rounded-lg
        bg-white/15 border border-white/25
        shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]"
    >
      <Image
        src={tool.logo}
        alt={tool.name}
        fill
        className="object-contain p-1.5 grayscale group-hover:grayscale-0 transition-all duration-500"
        unoptimized
      />
    </div>

    {/* Name + use case */}
    <div className="flex-1 min-w-0">
      <span className="font-syne text-xs font-bold text-white uppercase tracking-tight">
        {tool.name}
      </span>
      <span className="font-outfit hidden sm:inline text-white/80 text-[11px] ml-3 font-normal">
        — {tool.useCase}
      </span>
    </div>

    {/* Category pill */}
    <span
      className="kail-glass-pill font-space text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0
        text-white"
    >
      {tool.category}
    </span>

    {/* Check indicator */}
    <CheckCircle
      size={12}
      className="text-white/60 group-hover:text-[#BCED34] transition-colors duration-300 shrink-0"
    />
  </motion.div>
);

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

const SkillSection = () => {
  const [activeTab, setActiveTab] = useState("frontend");
  const active = techCategories.find((c) => c.id === activeTab)!;

  return (
    <section
      id="skills"
      className="relative py-16 bg-transparent overflow-hidden"
    >
      <div className="relative z-10">
        {/* ── TECHNICAL STACK ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <SectionBadge>Technical Stack</SectionBadge>
          <div className="flex items-end justify-between">
            <h2 className="font-syne text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase leading-none">
              ARCHITECTURE <span className="text-[#BCED34]">CANVAS</span>
            </h2>
            <p className="font-outfit hidden sm:block text-white/85 text-xs max-w-[260px] text-right leading-relaxed font-normal">
              Full-stack toolchain for web, mobile & backend systems.
            </p>
          </div>
        </motion.div>

        {/* Tab switcher */}
        <div
          role="tablist"
          className="kail-glass flex gap-2 mb-6 p-1.5 rounded-2xl w-fit max-w-full overflow-x-auto"
        >
          {techCategories.map((cat) => {
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(cat.id)}
                className={`font-space flex shrink-0 items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.18em]
                  transition-all duration-200 cursor-pointer select-none
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BCED34] ${
                    isActive
                      ? "text-[#1728F4] bg-[#BCED34] shadow-[0_8px_20px_rgba(188,237,52,0.35)]"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Tech cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12 min-h-[180px]"
          >
            {active.techs.map((tech, i) => (
              <TechCard key={`${activeTab}-${tech.name}`} tech={tech} i={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── UTILITIES MATRIX ─────────────────────────────────── */}
        <div className="border-t border-white/20 pt-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-8"
          >
            <SectionBadge>Utilities Matrix</SectionBadge>
            <div className="flex items-end justify-between">
              <h3 className="font-syne text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase leading-none">
                DEV <span className="text-[#BCED34]">PIPELINES</span>
              </h3>
              <span className="font-space text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                {tools.length} Tools Active
              </span>
            </div>
          </motion.div>

          {/* Two-column tool list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            {tools.map((tool, i) => (
              <ToolRow key={tool.name} tool={tool} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillSection;

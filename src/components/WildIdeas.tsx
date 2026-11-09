"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface Idea {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  initialVotes: number;
  pitch: string;
}

const IDEAS: Idea[] = [
  {
    id: "ghostwriter",
    title: "Ghostwriter for Your Real Life",
    subtitle: "Human API for Social Awkwardness",
    category: "Human API",
    initialVotes: 142,
    pitch: "A subscription service where you delegate awkward real-life social interactions to trained actors wearing hidden earpieces.",
  },
  {
    id: "alarm-clock",
    title: "Existential Alarm Clock & Bet Platform",
    subtitle: "Anti-Snooze Financial Punishment",
    category: "Fintech Trap",
    initialVotes: 218,
    pitch: "An alarm app connected to your bank account that punishes snoozing with mandatory hate-donations.",
  },
  {
    id: "reverse-crowdfund",
    title: "Reverse Crowdfunding",
    subtitle: "Destroy & Bounty on Target",
    category: "Anti-Crowdfund",
    initialVotes: 189,
    pitch: "A platform where people pool money NOT to build something, but to pay creators NOT to release a project.",
  },
  {
    id: "unsent-drafts",
    title: "The Bureau of Unsent Drafts",
    subtitle: "Marketplace for Unfinished IP & Deleted Code",
    category: "IP Vault",
    initialVotes: 305,
    pitch: "An anonymous marketplace to buy and sell unreleased code, half-finished projects, deleted tweets, and unsent emails.",
  },
];

// Figma Build Spec 3.6 — Component IdeaCard (GlassCard, padding 32, min height 390, vertical, gap 12)
const IdeaCard = ({ idea, index }: { idea: Idea; index: number }) => {
  const [votes, setVotes] = useState(idea.initialVotes);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (hasVoted) {
      setVotes((v) => v - 1);
      setHasVoted(false);
    } else {
      setVotes((v) => v + 1);
      setHasVoted(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="kail-glass p-6 sm:p-[32px] min-h-[390px] flex flex-col gap-[12px] hover:-translate-y-[3px]"
    >
      {/* 1. Top row, space between: concept name in Mono/Label Muted, and VotePill */}
      <div className="flex items-center justify-between gap-3">
        <span className="spec-mono-label-muted">
          {idea.category}
        </span>

        <motion.span
          key={votes}
          initial={{ scale: 1.35 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 14 }}
          className="inline-flex items-center justify-center h-[32px] px-[14px] rounded-full border border-[#BCED34] text-[#BCED34] font-space font-bold text-[13px] select-none"
        >
          ▲ {votes}
        </motion.span>
      </div>

      {/* 2. Display/H3 title (31, can wrap to 3 lines) */}
      <h3 className="spec-display-h3">
        {idea.title}
      </h3>

      {/* 3. Subtitle: mono 700 12.5, +10%, UPPER, Brand/Lime */}
      <p className="font-space font-bold text-[12.5px] tracking-[0.10em] uppercase text-[#BCED34]">
        {idea.subtitle}
      </p>

      {/* 4. Description Body/Card, takes the remaining height */}
      <p className="spec-body-card flex-1">
        {idea.pitch}
      </p>

      {/* 5. Button full width: height 54, radius 99, stroke Line/Strong, fill Fill/White 10, text mono 700 13, +12%, UPPER */}
      <button
        type="button"
        onClick={handleVote}
        aria-pressed={hasVoted}
        className={`w-full h-[54px] rounded-full font-space font-bold text-[13px] tracking-[0.12em] uppercase transition-all duration-200 cursor-pointer select-none ${
          hasVoted
            ? "bg-[#BCED34] border border-[#BCED34] text-[#10127A]"
            : "bg-white/[0.10] border border-white/[0.34] text-white hover:border-[#BCED34] hover:text-[#BCED34]"
        }`}
      >
        {hasVoted ? "VOTED ✓" : "VIEW FULL CONCEPT"}
      </button>
    </motion.div>
  );
};

const WildIdeas = () => {
  return (
    <section
      id="wild-ideas"
      className="relative pb-24 md:pb-[128px] bg-transparent pointer-events-auto"
    >
      {/* Figma Build Spec 3.6 — Header: Tag: LAB & BRAINSTORMS. Title: WILD STARTUP / IDEAS. Right: Count */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6"
      >
        <div className="flex flex-col items-start">
          <div className="spec-section-tag">
            <span className="w-[7px] h-[7px] rounded-full bg-[#BCED34] shadow-[0_0_10px_#BCED34]" />
            <span>LAB & BRAINSTORMS</span>
          </div>

          <h2 className="spec-display-h2 mt-[18px]">
            WILD STARTUP
            <br />
            <span className="text-[#BCED34]">IDEAS</span>
          </h2>
        </div>

        <span className="spec-mono-label-muted shrink-0">
          {IDEAS.length} CONCEPTS ACTIVE
        </span>
      </motion.div>

      {/* Intro line under the header (Body/Lead, margin 0 0 30) */}
      <p className="spec-body-lead mb-[30px]">
        Unconventional startup blueprints, human-in-the-loop APIs, and chaos-driven product concepts open for vote & feedback.
      </p>

      {/* Grid: 2 columns, gap 14 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
        {IDEAS.map((idea, index) => (
          <IdeaCard key={idea.id} idea={idea} index={index} />
        ))}
      </div>
    </section>
  );
};

export default WildIdeas;

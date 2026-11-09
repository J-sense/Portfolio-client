"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ChevronDown, ChevronUp, Sparkles, Code2 } from "lucide-react";

interface Idea {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tagColor: string;
  initialVotes: number;
  techStack: string[];
  pitch: string;
  details: string;
}

const IDEAS: Idea[] = [
  {
    id: "ghostwriter",
    title: "Ghostwriter for Your Real Life",
    subtitle: "Human API for Social Awkwardness",
    category: "Human API",
    tagColor: "text-[#BCED34] bg-[#BCED34]/15 border-[#BCED34]/40",
    initialVotes: 142,
    techStack: ["WebSockets", "Live Audio Streams", "Earpiece Hardware", "Stripe Billing"],
    pitch: "A subscription service where you delegate awkward real-life social interactions to trained actors wearing hidden earpieces.",
    details: "Need to break up with someone, ask for a raise, or negotiate with a landlord? You stand nearby; trained actors execute the conversation live based on your prompt inputs.",
  },
  {
    id: "alarm-clock",
    title: "Existential Alarm Clock & Bet Platform",
    subtitle: "Anti-Snooze Financial Punishment",
    category: "Fintech Trap",
    tagColor: "text-white bg-white/15 border-white/30",
    initialVotes: 218,
    techStack: ["Stripe Webhooks", "Micro-Donations", "Mobile Sensors", "Anti-Tamper Lock"],
    pitch: "An alarm app connected to your bank account that punishes snoozing with mandatory hate-donations.",
    details: "Every minute you snooze, a random micro-donation is transferred directly from your bank account to an organization or political party you passionately despise.",
  },
  {
    id: "reverse-crowdfund",
    title: "Reverse Crowdfunding",
    subtitle: "Destroy & Bounty on Target",
    category: "Anti-Crowdfund",
    tagColor: "text-[#BCED34] bg-[#BCED34]/15 border-[#BCED34]/40",
    initialVotes: 189,
    techStack: ["Escrow Contracts", "Target Bounty Pooling", "Verified IP Agreements"],
    pitch: "A platform where people pool money NOT to build something, but to pay creators NOT to release a project.",
    details: "Pool money together (e.g., pooling $5M to stop a terrible movie sequel or unwanted software rewrite from being released to the public).",
  },
  {
    id: "unsent-drafts",
    title: "The Bureau of Unsent Drafts",
    subtitle: "Marketplace for Unfinished IP & Deleted Code",
    category: "IP Vault",
    tagColor: "text-white bg-white/15 border-white/30",
    initialVotes: 305,
    techStack: ["Anonymous Indexing", "Crypto Escrow", "IP Rights Transfer", "Markdown Engine"],
    pitch: "An anonymous marketplace to buy and sell unreleased code, half-finished projects, deleted tweets, and unsent emails.",
    details: "Buyers can purchase rights to finish abandoned projects, publish discarded code repos, or simply read unsent draft manuscripts.",
  },
];

// Studio KAIL frosted glass pill
const glassPill = "kail-glass-pill text-white";

const IdeaCard = ({ idea, index }: { idea: Idea; index: number }) => {
  const [votes, setVotes] = useState(idea.initialVotes);
  const [hasVoted, setHasVoted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="kail-glass relative group rounded-3xl p-6 sm:p-7 flex flex-col justify-between
        hover:border-white/50 transition-colors duration-300"
    >
      {/* Top Bar */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <span
            className={`font-space text-[10px] font-bold uppercase tracking-[0.22em] px-3 py-1 rounded-full border select-none ${idea.tagColor}`}
          >
            {idea.category}
          </span>

          <button
            onClick={handleVote}
            aria-pressed={hasVoted}
            aria-label={hasVoted ? "Remove vote" : "Vote for this idea"}
            className={`font-space flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold select-none cursor-pointer
              transition-all duration-200 active:scale-95
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BCED34] ${
                hasVoted
                  ? "text-[#1728F4] bg-[#BCED34] border border-transparent shadow-[0_0_20px_rgba(188,237,52,0.35)]"
                  : "text-white hover:text-[#BCED34] kail-glass-pill hover:border-white/50"
              }`}
          >
            <ThumbsUp size={12} className={hasVoted ? "fill-[#1728F4]" : ""} />
            <span>{votes}</span>
          </button>
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-syne text-xl sm:text-2xl font-extrabold text-white group-hover:text-[#BCED34] transition-colors duration-300 uppercase tracking-tight mb-1">
          {idea.title}
        </h3>
        <p className="font-space text-[10px] font-semibold uppercase tracking-widest text-white/80 mb-4">
          {idea.subtitle}
        </p>

        {/* Pitch */}
        <p className="font-outfit text-white/90 text-xs font-normal leading-relaxed mb-4">
          {idea.pitch}
        </p>
      </div>

      {/* Expandable Details Area */}
      <div>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-white/20 pt-4 mt-2"
            >
              <p className="font-outfit text-xs text-white/95 font-normal leading-relaxed mb-4">
                {idea.details}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {idea.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className={`font-space flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full select-none ${glassPill}`}
                  >
                    <Code2 size={10} className="text-[#BCED34]" />
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand / Collapse Button */}
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="font-space flex items-center gap-1.5 mt-4 text-[10px] font-bold uppercase tracking-widest text-white/80 hover:text-[#BCED34] transition-colors duration-200 cursor-pointer select-none
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BCED34] rounded"
        >
          {expanded ? (
            <>
              <ChevronUp size={12} /> Hide Blueprint
            </>
          ) : (
            <>
              <ChevronDown size={12} /> View Full Concept
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

const WildIdeas = () => {
  return (
    <section
      id="wild-ideas"
      className="relative py-16 bg-transparent overflow-hidden pointer-events-auto border-t border-white/20"
    >
      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-left"
        >
          <span
            className="kail-glass-pill font-space inline-flex items-center gap-2 w-fit mb-3 px-3.5 py-1.5 rounded-full select-none
              text-[10px] font-bold tracking-[0.28em] uppercase text-white"
          >
            <Sparkles size={11} className="text-[#BCED34]" />
            LAB & BRAINSTORMS
          </span>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-syne text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase leading-none">
                WILD <span className="text-[#BCED34]">STARTUP IDEAS</span>
              </h2>
              <p className="font-outfit text-xs text-white/85 font-normal max-w-xl mt-3 leading-relaxed">
                Unconventional startup blueprints, human-in-the-loop APIs, and chaos-driven product concepts open for vote & feedback.
              </p>
            </div>

            <span className="font-space text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 shrink-0">
              {IDEAS.length} Concepts Active
            </span>
          </div>
        </motion.div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {IDEAS.map((idea, index) => (
            <IdeaCard key={idea.id} idea={idea} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WildIdeas;

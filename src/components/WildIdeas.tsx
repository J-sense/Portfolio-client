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
    tagColor: "text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/30",
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
    tagColor: "text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/30",
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
    tagColor: "text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/30",
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
    tagColor: "text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/30",
    initialVotes: 305,
    techStack: ["Anonymous Indexing", "Crypto Escrow", "IP Rights Transfer", "Markdown Engine"],
    pitch: "An anonymous marketplace to buy and sell unreleased code, half-finished projects, deleted tweets, and unsent emails.",
    details: "Buyers can purchase rights to finish abandoned projects, publish discarded code repos, or simply read unsent draft manuscripts.",
  },
];

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
      className="relative group rounded-3xl border border-[#334155] bg-[#121212] p-6 sm:p-7 flex flex-col justify-between shadow-2xl hover:border-[#38bdf8]/50 transition-all duration-300"
    >
      {/* Top Bar */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className={`text-[9px] font-black uppercase tracking-[0.25em] px-3 py-1 rounded-full border ${idea.tagColor}`}>
            {idea.category}
          </span>

          <button
            onClick={handleVote}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black transition-all duration-300 ${
              hasVoted
                ? "bg-[#38bdf8] text-[#050505] border-[#38bdf8] shadow-md shadow-[#38bdf8]/30"
                : "bg-[#050505] text-[#94a3b8] border-[#334155] hover:text-[#e2e8f0] hover:border-[#38bdf8]/50"
            }`}
          >
            <ThumbsUp size={11} className={hasVoted ? "fill-[#050505]" : ""} />
            <span>{votes}</span>
          </button>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl sm:text-2xl font-black text-[#e2e8f0] group-hover:text-[#38bdf8] transition-colors duration-300 uppercase tracking-tight mb-1">
          {idea.title}
        </h3>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] mb-4">
          {idea.subtitle}
        </p>

        {/* Pitch */}
        <p className="text-[#94a3b8] text-xs leading-relaxed mb-4">
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
              className="overflow-hidden border-t border-[#334155]/60 pt-4 mt-2"
            >
              <p className="text-xs text-[#e2e8f0]/90 leading-relaxed mb-4">
                {idea.details}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {idea.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 text-[9px] font-bold text-[#94a3b8] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#050505] border border-[#334155]"
                  >
                    <Code2 size={9} className="text-[#38bdf8]" />
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
          className="flex items-center gap-1.5 mt-4 text-[9px] font-black uppercase tracking-widest text-[#94a3b8] hover:text-[#38bdf8] transition-colors duration-200"
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
    <section id="wild-ideas" className="relative py-16 bg-[#050505] overflow-hidden pointer-events-auto border-t border-[#334155]/40">
      {/* Ambient glow */}
      <div className="absolute top-[30%] right-[-10%] w-96 h-96 bg-[#38bdf8]/[0.03] blur-[140px] rounded-full -z-10 pointer-events-none" />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-left"
        >
          <span className="inline-flex items-center gap-2 text-[9px] font-black tracking-[0.3em] text-[#38bdf8] uppercase bg-[#38bdf8]/10 border border-[#38bdf8]/30 px-3 py-1 rounded-full mb-3">
            <Sparkles size={11} className="text-[#38bdf8]" />
            LAB & BRAINSTORMS
          </span>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-[#e2e8f0] uppercase leading-none">
                WILD <span className="text-[#94a3b8]">STARTUP IDEAS</span>
              </h2>
              <p className="text-xs text-[#94a3b8] max-w-xl mt-3 leading-relaxed">
                Unconventional startup blueprints, human-in-the-loop APIs, and chaos-driven product concepts open for vote & feedback.
              </p>
            </div>

            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94a3b8] shrink-0">
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

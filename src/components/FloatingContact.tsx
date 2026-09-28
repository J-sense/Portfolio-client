"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Facebook, Instagram, X, Sparkles, ArrowRight } from "lucide-react";
import AIChatModal from "./AIChatModal";

const FloatingContact = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  // Web Audio notification chime generator
  const playNotificationSound = () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const playNote = (freq: number, startTime: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);

        gain.gain.setValueAtTime(0.1, ctx.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + startTime);
        osc.stop(ctx.currentTime + startTime + duration);
      };

      playNote(659.25, 0, 0.2); // E5
      playNote(880.00, 0.1, 0.3); // A5
    } catch (e) {
      console.log("Audio blocked until interaction:", e);
    }
  };

  // Pop up greeting bubble on site entrance after 1.8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasBeenSeen = sessionStorage.getItem("ai_greeting_popup_seen");
      if (!hasBeenSeen) {
        setShowGreeting(true);
        playNotificationSound();
        sessionStorage.setItem("ai_greeting_popup_seen", "true");
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const socials = [
    {
      name: "WhatsApp",
      href: "https://wa.me/8801405438389",
      icon: <MessageCircle size={18} />,
      color: "bg-[#25D366] text-white hover:shadow-[#25D366]/40 border border-white/10",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/mdnajmulhasan.jishan/",
      icon: <Facebook size={16} />,
      color: "bg-[#1877F2] text-white hover:shadow-[#1877F2]/40 border border-white/10",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/",
      icon: <Instagram size={18} />,
      color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white hover:shadow-[#ee2a7b]/40 border border-white/10",
    },
  ];

  return (
    <>
      <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40 flex flex-col items-end gap-3 select-none pointer-events-none">
        
        {/* --- ELEGANT ENTRANCE GREETING POPUP --- */}
        <AnimatePresence>
          {showGreeting && !isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 360, damping: 26 }}
              onClick={() => {
                setIsChatOpen(true);
                setShowGreeting(false);
              }}
              className="pointer-events-auto max-w-[260px] bg-[#0c0e17]/95 border border-[#38bdf8]/50 backdrop-blur-2xl rounded-2xl p-3.5 shadow-2xl text-white cursor-pointer relative group transition-transform hover:scale-[1.02]"
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowGreeting(false);
                }}
                className="absolute top-2 right-2 p-1 text-[#94a3b8] hover:text-white rounded-lg transition-colors"
                title="Dismiss"
              >
                <X size={14} />
              </button>

              <div className="flex items-start gap-3">
                {/* Modern AI Sparkles Icon */}
                <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#38bdf8] to-[#0284c7] p-0.5 flex items-center justify-center shrink-0 shadow-md">
                  <div className="w-full h-full bg-[#0c0e17] rounded-full flex items-center justify-center">
                    <Sparkles size={15} className="text-[#38bdf8]" />
                  </div>
                </div>

                <div className="flex-1 pr-2">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#38bdf8]">
                      JishAI
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#e2e8f0] leading-snug">
                    Hi! 👋 Ask JishAI anything about Jishan!
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-[#38bdf8] group-hover:translate-x-1 transition-transform">
                    <span>Ask JishAI</span>
                    <ArrowRight size={11} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social Icons Stack when secondary menu open */}
        <AnimatePresence>
          {isMenuOpen && !isChatOpen && (
            <div className="flex flex-col gap-2.5 mb-1 pointer-events-auto">
              {socials.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.name}
                  initial={{ opacity: 0, y: 15, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.8 }}
                  transition={{ duration: 0.25, delay: (socials.length - 1 - idx) * 0.05 }}
                  className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 ${item.color}`}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* AI Chat Launcher FAB */}
        <div className="relative flex items-center gap-3 pointer-events-auto">
          {/* Subtle Badge Pill */}
          {!isChatOpen && !showGreeting && (
            <motion.button
              onClick={() => {
                setIsChatOpen(true);
                setShowGreeting(false);
              }}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0c0e17]/90 border border-[#38bdf8]/40 text-[#e2e8f0] text-xs font-semibold shadow-lg backdrop-blur-xl hover:border-[#38bdf8] transition-all cursor-pointer group"
            >
              <Sparkles size={13} className="text-[#38bdf8]" />
              <span className="text-[11px] text-white">Ask JishAI</span>
            </motion.button>
          )}

          {/* Main Trigger FAB */}
          <button
            onClick={() => {
              setIsChatOpen(!isChatOpen);
              setIsMenuOpen(false);
              setShowGreeting(false);
            }}
            aria-label="Toggle AI Chat"
            className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#38bdf8] to-[#0284c7] text-[#05060a] shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none border border-white/20"
          >
            {!isChatOpen && (
              <span className="absolute inset-0 rounded-full bg-[#38bdf8]/30 animate-ping opacity-60 pointer-events-none" />
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={isChatOpen ? "close" : "open"}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center text-[#05060a] font-black"
              >
                {isChatOpen ? (
                  <X size={22} />
                ) : (
                  <Sparkles size={24} className="text-[#05060a]" />
                )}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* AI Chat Modal */}
      <AIChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default FloatingContact;

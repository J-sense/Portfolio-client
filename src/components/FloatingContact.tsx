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
      color: "kail-glass-pill text-[#9996FE] hover:text-[#BCED34] hover:border-[#BCED34]/50",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/mdnajmulhasan.jishan/",
      icon: <Facebook size={16} />,
      color: "kail-glass-pill text-[#9996FE] hover:text-[#BCED34] hover:border-[#BCED34]/50",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/",
      icon: <Instagram size={18} />,
      color: "kail-glass-pill text-[#9996FE] hover:text-[#BCED34] hover:border-[#BCED34]/50",
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
              className="pointer-events-auto max-w-[260px] kail-glass rounded-2xl p-3.5 text-[#F4F4FE] cursor-pointer relative group transition-transform hover:scale-[1.02]"
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowGreeting(false);
                }}
                className="absolute top-2 right-2 p-1 text-[#8E92BC] hover:text-[#F4F4FE] rounded-lg transition-colors"
                title="Dismiss"
              >
                <X size={14} />
              </button>

              <div className="flex items-start gap-3">
                {/* Modern AI Sparkles Icon */}
                <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#9996FE] via-[#5E64FD] to-[#BCED34] p-0.5 flex items-center justify-center shrink-0 shadow-md">
                  <div className="w-full h-full bg-[#0E101B] rounded-full flex items-center justify-center">
                    <Sparkles size={15} className="text-[#BCED34]" />
                  </div>
                </div>

                <div className="flex-1 pr-2">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="font-space text-[10px] font-bold uppercase tracking-[0.2em] text-[#BCED34]">
                      JishAI
                    </span>
                  </div>
                  <p className="font-outfit text-xs font-medium text-[#F4F4FE] leading-snug">
                    Hi! 👋 Ask JishAI anything about Jishan!
                  </p>
                  <div className="mt-2 flex items-center gap-1 font-space text-[10px] font-bold text-[#9996FE] group-hover:text-[#BCED34] group-hover:translate-x-1 transition-all">
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
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full kail-glass-pill text-[#F4F4FE] font-space text-[10px] font-bold uppercase tracking-[0.18em] shadow-lg hover:border-[#9996FE]/50 transition-all cursor-pointer group"
            >
              <Sparkles size={13} className="text-[#BCED34]" />
              <span className="text-[#F4F4FE]">Ask JishAI</span>
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
            className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#9996FE] via-[#5E64FD] to-[#1728F4] text-[#F4F4FE] shadow-[0_12px_32px_rgba(94,100,253,0.45)] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none border border-white/25"
          >
            {!isChatOpen && (
              <span className="absolute inset-0 rounded-full bg-[#5E64FD]/40 animate-ping opacity-60 pointer-events-none" />
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={isChatOpen ? "close" : "open"}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center text-[#F4F4FE] font-black"
              >
                {isChatOpen ? (
                  <X size={22} />
                ) : (
                  <Sparkles size={24} className="text-[#BCED34]" />
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

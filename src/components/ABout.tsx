"use client";
import { ABOUT } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Rocket, Target, Zap } from "lucide-react";
import Image from "next/image";
import React from "react";

const MicroLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn("text-[10px] font-black uppercase tracking-[0.4em] text-[#94a3b8]", className)}>
    {children}
  </span>
);

const HighlightCard = ({ icon: Icon, title, desc, delay }: { icon: any; title: string; desc: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="relative group p-6 rounded-2xl border border-[#334155] bg-[#121212] backdrop-blur-2xl transition-all duration-300 hover:border-[#38bdf8]/50 shadow-2xl"
  >
    <div className="w-10 h-10 mb-4 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8]">
      <Icon size={18} />
    </div>
    <h4 className="text-[#e2e8f0] text-xs font-black uppercase tracking-widest mb-2">{title}</h4>
    <p className="text-[#94a3b8] text-[10px] leading-relaxed tracking-wider">{desc}</p>
  </motion.div>
);

const About = () => {
  return (
    <section id="about" className="relative py-20 px-6 sm:px-12 lg:px-24 bg-[#050505] overflow-hidden pointer-events-auto">
      {/* Background Glow */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-[#38bdf8]/[0.05] blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left: Technical Portrait Frame */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto group">
                {/* GLOW */}
                <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12)_0%,transparent_70%)] blur-[80px] rounded-full z-0 pointer-events-none" />

                {/* Technical Corner Markers */}
                <div className="absolute -top-3 -left-3 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-[#38bdf8] z-30" />
                <div className="absolute -top-3 -right-3 w-6 h-6 border-t-[1.5px] border-r-[1.5px] border-[#38bdf8] z-30" />
                <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-[1.5px] border-l-[1.5px] border-[#38bdf8] z-30" />
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-[#38bdf8] z-30" />

                <div className="relative h-full overflow-hidden rounded-2xl border border-[#334155] bg-[#121212] backdrop-blur-3xl group">
                   <Image
                     src="/images/my-profile-card.png"
                     alt="Najmul Hassan Jishan"
                     fill
                     className="object-contain object-bottom transition-all duration-1000 grayscale hover:grayscale-0 scale-[1.02]"
                   />
                   
                   {/* Technical Overlay Markers */}
                   <div className="absolute top-6 right-6 flex flex-col items-end gap-1 z-30">
                      <MicroLabel>Access: Granted</MicroLabel>
                      <div className="w-12 h-[1px] bg-[#38bdf8]/40" />
                   </div>
                </div>

                {/* System Status Display */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-30 px-6 py-2 rounded-full bg-[#121212] border border-[#334155] flex items-center gap-4 shadow-2xl">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-ping" />
                      <span className="text-[9px] font-black tracking-[0.2em] text-[#e2e8f0]">SYS_ONLINE</span>
                   </div>
                   <div className="h-2 w-[1px] bg-[#334155]" />
                   <span className="text-[9px] font-black tracking-[0.2em] text-[#94a3b8]">FULL STACK</span>
                </div>
            </div>
          </motion.div>

          {/* Right: Architectural Narrative */}
          <div className="lg:col-span-7 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <MicroLabel className="text-[#38bdf8] mb-6 block">Case Study: Human Interface</MicroLabel>
              <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter text-[#e2e8f0] uppercase leading-tight">
                ENGINEERING <span className="text-[#94a3b8]">DIGITAL</span> ARCHITECTURE
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative p-8 border-l border-[#334155] mb-12 group hover:border-[#38bdf8]/50 transition-colors"
            >
              <div className="absolute top-0 left-0 w-[2px] h-10 bg-[#38bdf8]" />
              <p className="text-[#94a3b8] text-xs md:text-sm leading-relaxed font-medium tracking-wide">
                {ABOUT}
              </p>
            </motion.div>

            {/* Micro-Modern Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <HighlightCard 
                icon={Zap} 
                title="Performance" 
                desc="Optimized execution and scale" 
                delay={0.4}
              />
              <HighlightCard 
                icon={Target} 
                title="Surgical" 
                desc="Precision in every component" 
                delay={0.5}
              />
              <HighlightCard 
                icon={Rocket} 
                title="Visionary" 
                desc="Pushing architectural limits" 
                delay={0.6}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

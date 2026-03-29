/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ABOUT } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Rocket, Target, Zap } from "lucide-react";
import Image from "next/image";
import React from "react";

const MicroLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn("text-[10px] font-black uppercase tracking-[0.4em] text-white/30", className)}>
    {children}
  </span>
);

const HighlightCard = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="relative group p-6 rounded-xl border border-white/[0.03] bg-black-200 backdrop-blur-2xl transition-all duration-300 hover:border-purple/20"
  >
    <div className="w-10 h-10 mb-4 rounded-lg bg-purple/10 border border-purple/20 flex items-center justify-center text-purple">
      <Icon size={18} />
    </div>
    <h4 className="text-white text-xs font-black uppercase tracking-widest mb-2">{title}</h4>
    <p className="text-white-100 text-[10px] opacity-40 leading-relaxed tracking-wider">{desc}</p>
  </motion.div>
);

const About = () => {
  return (
    <section id="about" className="relative py-40 px-6 sm:px-12 lg:px-24 bg-[#030303] overflow-hidden pointer-events-auto">
      {/* Surgical Technical Background */}
      <div className="fixed inset-0 w-full h-full bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:32px_32px] -z-10" />
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left: Technical Portrait Frame with Code-based Glow */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto group">
                {/* ADVANCED CODE-BASED GLOW (Neon Aura) */}
                <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)] blur-[80px] rounded-full animate-pulse z-0" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple/5 blur-[120px] rounded-full -z-10" />

                {/* Technical Corner Markers */}
                <div className="absolute -top-3 -left-3 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-purple/40 z-30" />
                <div className="absolute -top-3 -right-3 w-6 h-6 border-t-[1.5px] border-r-[1.5px] border-purple/40 z-30" />
                <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-[1.5px] border-l-[1.5px] border-purple/40 z-30" />
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-purple/40 z-30" />

                <div className="relative h-full overflow-hidden rounded-xl border border-white/5 bg-black-200 backdrop-blur-3xl group">
                   <Image
                     src="/images/about-me-real.png"
                     alt="Real Portrait"
                     fill
                     className="object-contain object-bottom transition-all duration-1000 grayscale hover:grayscale-0 scale-[1.02]"
                     style={{ 
                       maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                       WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)"
                     }}
                   />
                   
                   {/* Technical Overlay Markers */}
                   <div className="absolute top-6 right-6 flex flex-col items-end gap-1 z-30">
                      <MicroLabel>Access: Internal</MicroLabel>
                      <div className="w-12 h-[1px] bg-purple/30" />
                   </div>
                </div>

                {/* System Status Display */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-30 px-6 py-2 rounded-full bg-black/80 backdrop-blur-2xl border border-white/10 flex items-center gap-4 shadow-2xl">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[9px] font-black tracking-[0.2em] text-white">SYS_ONLINE</span>
                   </div>
                   <div className="h-2 w-[1px] bg-white/10" />
                   <span className="text-[9px] font-black tracking-[0.2em] text-white/40">MERN_ENGINEER</span>
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
              <MicroLabel className="text-purple mb-8">Case Study: Human Interface</MicroLabel>
              <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter text-white uppercase leading-tight">
                Engineering <span className="opacity-40">Digital</span> Architecture
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative p-10 border-l border-white/5 mb-20 group hover:border-purple/20 transition-colors"
            >
              <div className="absolute top-0 left-0 w-[2px] h-10 bg-purple" />
              <p className="text-white-100 text-sm md:text-base leading-relaxed opacity-50 font-medium tracking-wide">
                {ABOUT}
              </p>
            </motion.div>

            {/* Micro-Modern Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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

            <div className="mt-20 pt-10 border-t border-white/5 flex items-center justify-between opacity-20">
               <MicroLabel>UID: JS-0x4FF2</MicroLabel>
               <div className="flex items-center gap-4">
                  <div className="w-10 h-[1px] bg-white/50" />
                  <MicroLabel>v.2.0.4</MicroLabel>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

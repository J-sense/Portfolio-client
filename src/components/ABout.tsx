"use client";
import { ABOUT } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Rocket, Target, Zap } from "lucide-react";
import Image from "next/image";
import React from "react";

const MicroLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn("font-space text-[10px] font-bold uppercase tracking-[0.35em] text-white/80", className)}>
    {children}
  </span>
);

const HighlightCard = ({ icon: Icon, title, desc, delay }: { icon: any; title: string; desc: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="relative group p-6 rounded-2xl kail-glass transition-all duration-300"
  >
    <div className="w-10 h-10 mb-4 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center text-white group-hover:text-[#BCED34] group-hover:border-[#BCED34]/50 transition-colors">
      <Icon size={18} />
    </div>
    <h4 className="font-syne text-white text-xs font-extrabold uppercase tracking-widest mb-2">{title}</h4>
    <p className="font-outfit text-white/80 text-[11px] leading-relaxed">{desc}</p>
  </motion.div>
);

const About = () => {
  return (
    <section id="about" className="relative py-20 px-6 sm:px-12 lg:px-24 bg-transparent overflow-hidden pointer-events-auto">
      {/* Background Glow */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-white/10 blur-[140px] rounded-full pointer-events-none" />

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
                <div
                  className="absolute -inset-10 blur-[80px] rounded-full z-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%)",
                  }}
                />

                {/* Technical Corner Markers */}
                <div className="absolute -top-3 -left-3 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-[#BCED34] z-30" />
                <div className="absolute -top-3 -right-3 w-6 h-6 border-t-[1.5px] border-r-[1.5px] border-[#BCED34] z-30" />
                <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-[1.5px] border-l-[1.5px] border-[#BCED34] z-30" />
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-[#BCED34] z-30" />

                <div className="relative h-full overflow-hidden rounded-2xl kail-glass group">
                   <Image
                     src="/images/my-profile-card.png"
                     alt="Najmul Hassan Jishan"
                     fill
                     className="object-contain object-bottom transition-all duration-1000 grayscale hover:grayscale-0 scale-[1.02]"
                   />
                   
                   {/* Technical Overlay Markers */}
                   <div className="absolute top-6 right-6 flex flex-col items-end gap-1 z-30">
                      <MicroLabel>Access: Granted</MicroLabel>
                      <div className="w-12 h-[1px] bg-[#BCED34]/50" />
                   </div>
                </div>

                {/* System Status Display */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-30 px-6 py-2 rounded-full kail-glass-pill flex items-center gap-4 shadow-2xl">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#BCED34] animate-ping" />
                      <span className="font-space text-[9px] font-bold tracking-[0.2em] text-white">SYS_ONLINE</span>
                   </div>
                   <div className="h-2 w-[1px] bg-white/25" />
                   <span className="font-space text-[9px] font-bold tracking-[0.2em] text-[#BCED34]">FULL STACK</span>
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
              <MicroLabel className="text-[#BCED34] mb-6 block">Case Study: Human Interface</MicroLabel>
              <h2 className="font-syne text-3xl md:text-5xl font-extrabold mb-8 tracking-tight text-white uppercase leading-tight">
                ENGINEERING <span className="text-[#BCED34]">DIGITAL</span> ARCHITECTURE
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative p-8 border-l border-white/25 mb-12 group hover:border-[#BCED34]/70 transition-colors"
            >
              <div className="absolute top-0 left-0 w-[2px] h-10 bg-[#BCED34]" />
              <p className="font-outfit text-white/90 text-xs md:text-sm leading-relaxed">
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

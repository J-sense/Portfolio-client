/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Compass, Terminal } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Spotlight } from "./ui/Spotlight";

const KineticLetter = ({ children, index, mouseX, mouseY }: { children: string, index: number, mouseX: any, mouseY: any }) => {
  const x = useTransform(mouseX, [-10, 10], [index * -5, index * 5]);
  const y = useTransform(mouseY, [-10, 10], [index * -3, index * 3]);
  const rotateX = useTransform(mouseY, [-10, 10], [index * -1, index * 1]);
  const rotateY = useTransform(mouseX, [-10, 10], [index * 1, index * -1]);

  return (
    <motion.span
      style={{ x: useSpring(x), y: useSpring(y), rotateX, rotateY }}
      className="inline-block transition-colors hover:text-purple duration-700 select-none cursor-default"
    >
      {children}
    </motion.span>
  );
};

const IdentityTag = ({ label, value, className, delay = 0 }: { label: string, value: string, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, delay }}
    className={cn(
      "flex flex-col gap-1 border-l border-white/10 pl-4 py-1 select-none pointer-events-none",
      className
    )}
  >
    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/10">{label}</span>
    <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase italic">{value}</span>
  </motion.div>
);

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) / 20);
      mouseY.set((e.clientY - window.innerHeight / 2) / 20);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const name = "JISHAN";

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center p-8 pointer-events-auto font-sans">
      
      {/* Liquid Lighting & Atmospheric Depth */}
      <div className="absolute inset-0 w-full h-full -z-20 overflow-hidden">
        <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="rgba(255,255,255,0.03)" />
        <Spotlight className="h-[80vh] w-[50vw] top-10 left-full" fill="purple" />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
        
        {/* Moving Nebula Background Accent */}
        <motion.div 
           animate={{ 
              scale: [1, 1.1, 1],
              x: [0, 10, 0],
              y: [0, 10, 0]
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.05),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.03),transparent_40%)] opacity-60"
        />

        {/* Cursor Glow Hub */}
        <motion.div 
           style={{ x: mouseX, y: mouseY }}
           className="w-[120%] h-[120%] absolute -z-10 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_60%)] blur-[80px]"
        />
        <div className="absolute inset-0 bg-grid-white/[0.015] [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]" />
      </div>

      {/* Main Identity Composition */}
      <main className="container mx-auto max-w-5xl relative z-10 flex flex-col items-center text-center group">
         
         {/* Identity Meta Tags */}
         <div className="absolute -top-32 left-1/2 -translate-x-1/2 flex items-center gap-12 opacity-40">
            <IdentityTag label="Kernel_Ref" value="MERN.v2.0" delay={0.8} />
            <IdentityTag label="Build_State" value="Deployment_Ready" delay={1} />
         </div>

         {/* Section Header */}
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="mb-14 flex flex-col items-center gap-4"
         >
            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/30 border-b border-white/10 pb-2">Selected_Identity</span>
         </motion.div>

         {/* KINETIC NAME CENTERPIECE */}
         <div className="perspective-1000">
            <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               className="text-7xl md:text-[12rem] font-black tracking-[-0.08em] text-white leading-none uppercase italic flex justify-center"
            >
               {name.split("").map((char, index) => (
                  <KineticLetter key={index} index={index} mouseX={mouseX} mouseY={mouseY}>
                    {char}
                  </KineticLetter>
               ))}
            </motion.h1>
         </div>

         {/* SURGICAL DESIGNATION LABEL */}
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-8 relative group/desc"
         >
            <div className="absolute -inset-x-8 -inset-y-3 bg-white/[0.03] backdrop-blur-3xl rounded-full border border-white/10 opacity-0 group-hover/desc:opacity-100 transition-all duration-700" />
            <h2 className="relative z-10 text-[10px] md:text-xs font-black uppercase tracking-[1em] text-purple drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
               MERN_STACK_ARCHITECT
            </h2>
         </motion.div>

         {/* Narrative Hub */}
         <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 max-w-2xl text-white-100 text-lg md:text-xl leading-relaxed opacity-30 font-medium tracking-tight uppercase px-4"
         >
            Designing and building professional-grade digital interfaces with surgical code precision and high-impact aesthetics.
         </motion.p>

         {/* Technical CTA Array */}
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8"
         >
            <Link 
               href="https://drive.google.com/uc?export=download&id=1y_GKj2by5yxgD1fkXRFMtqx4aEj90oN1"
               download
            >
               <button className="group relative bg-white text-black font-black px-12 py-5 rounded-2xl text-[10px] uppercase tracking-[0.4em] shadow-2xl hover:bg-purple hover:text-white transition-all overflow-hidden flex items-center gap-4 border-b-4 border-b-black/10">
                  <Terminal size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                  Request Resume
               </button>
            </Link>

            <Link href="#projects" className="group flex items-center gap-6 py-5 px-10 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all backdrop-blur-3xl">
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 group-hover:text-white transition-colors">Workspace_Index</span>
               <Compass size={16} className="text-white/10 group-hover:text-purple transition-all" />
            </Link>
         </motion.div>
      </main>

      {/* Finishing Corner Brackets */}
      <div className="absolute top-12 left-12 w-10 h-10 border-t border-l border-white/10 opacity-20 pointer-events-none select-none" />
      <div className="absolute top-12 right-12 w-10 h-10 border-t border-r border-white/10 opacity-20 pointer-events-none select-none" />
      <div className="absolute bottom-12 left-12 w-10 h-10 border-b border-l border-white/10 opacity-20 pointer-events-none select-none" />
      <div className="absolute bottom-12 right-12 w-10 h-10 border-b border-r border-white/10 opacity-20 pointer-events-none select-none" />

      {/* Identity Discovery Footer */}
      <footer className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-8 opacity-10 pointer-events-none select-none">
         <div className="h-[0.5px] w-12 bg-white" />
         <span className="text-[8px] font-black uppercase tracking-[1em] text-white whitespace-nowrap">Explore_Identity</span>
         <div className="h-[0.5px] w-12 bg-white" />
      </footer>
    </div>
  );
};

export default Hero;

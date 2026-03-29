"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, Rocket, Monitor, Smartphone, Layout, Minimize2, Cpu, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const MicroLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn("text-[10px] font-black uppercase tracking-[0.4em] text-white/30", className)}>
    {children}
  </span>
);

const TechnicalFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative group">
    {/* Corner Markers */}
    <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-purple z-30 opacity-40 group-hover:opacity-100 transition-opacity" />
    <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-purple z-30 opacity-40 group-hover:opacity-100 transition-opacity" />
    <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-purple z-30 opacity-40 group-hover:opacity-100 transition-opacity" />
    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-purple z-30 opacity-40 group-hover:opacity-100 transition-opacity" />
    
    <div className="relative overflow-hidden rounded-sm border border-white/5 bg-black/20 backdrop-blur-3xl">
       {children}
    </div>
  </div>
);

const BentoMicro = ({ children, className, label, icon: Icon }: { children: React.ReactNode; className?: string, label?: string, icon?: any }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className={cn(
      "relative p-6 rounded-xl border border-white/[0.03] bg-black-200 backdrop-blur-2xl hover:border-purple/20 transition-all duration-500",
      className
    )}
  >
    {label && (
      <div className="flex items-center gap-3 mb-6">
        {Icon && <Icon size={12} className="text-purple opacity-50" />}
        <MicroLabel>{label}</MicroLabel>
      </div>
    )}
    {children}
  </motion.div>
);

const ViewDetails = ({ data }: { data: any }) => {
  return (
    <div className="min-h-screen bg-[#030303] text-white relative overflow-x-hidden pointer-events-auto font-sans">
      {/* Surgical Background: Small Grid + Sharp Glows */}
      <div className="fixed inset-0 w-full h-full bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] -z-10" />
      <div className="fixed inset-0 w-full h-full bg-black/40 -z-10" />
      
      {/* Electric Thin Lines */}
      <div className="fixed top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent -z-10" />
      <div className="fixed top-0 left-[80%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent -z-10" />

      {/* Atmospheric Micro-Glows */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple/5 blur-[120px] rounded-full -z-10" />

      <main className="container mx-auto max-w-6xl pt-32 pb-60 px-6 sm:px-12 relative z-10">
        
        {/* Micro-Modern Header */}
        <div className="flex flex-col gap-12 mb-24">
          <div className="flex items-center justify-between border-b border-white/5 pb-8">
            <Link 
              href="/"
              className="flex items-center gap-4 group"
            >
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-purple group-hover:bg-purple/10 transition-all">
                <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <MicroLabel className="group-hover:text-white/60 transition-colors">Catalog / Index</MicroLabel>
            </Link>
            
            <div className="flex items-center gap-8">
               <div className="hidden sm:flex flex-col items-end">
                  <MicroLabel>Status: Integrated</MicroLabel>
                  <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest mt-1">Direct Link Ready</span>
               </div>
               {data?._id && (
                 <span className="text-[10px] font-bold opacity-20 hidden md:block">UID: {data._id.toUpperCase()}</span>
               )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <MicroLabel className="text-purple mb-4">Project Overview</MicroLabel>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight uppercase">
                {data?.title}
              </h1>
            </motion.div>

            {data?.liveLink && (
              <Link
                href={data.liveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 bg-white text-black font-black py-4 px-10 rounded-sm text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-purple hover:text-white transition-all cursor-pointer"
                >
                  Enter Experience
                  <ExternalLink size={14} />
                </motion.button>
              </Link>
            )}
          </div>
        </div>

        {/* Technical Frame Visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24"
        >
          <TechnicalFrame>
            <div className="relative aspect-video w-full overflow-hidden">
               <Image
                 src={data?.image || "/fallback.jpg"}
                 alt="Technical Visual"
                 fill
                 className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000"
                 priority
               />
               
               {/* Technical Micro-text overlay */}
               <div className="absolute top-6 left-6 z-30 p-4 border-l border-white/20 bg-black/40 backdrop-blur-xl">
                  <div className="flex flex-col gap-1">
                     <MicroLabel className="text-[8px] tracking-[0.5em] text-white">System: Web Interface</MicroLabel>
                     <MicroLabel className="text-[8px] tracking-[0.5em] text-white">Scale: Scalable Vector</MicroLabel>
                  </div>
               </div>
               
               <div className="absolute bottom-6 right-6 z-30 flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-black/60 border border-white/10 text-[9px] font-black text-white/40 uppercase tracking-widest">
                     Res: Adaptive
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-black/60 border border-white/10 text-[9px] font-black text-white/40 uppercase tracking-widest">
                     Enc: UTF-8
                  </div>
               </div>
            </div>
          </TechnicalFrame>
        </motion.div>

        {/* Bento-Micro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <BentoMicro 
            label="System Narrative" 
            icon={Layout}
            className="lg:col-span-8"
          >
            <p className="text-white-100 text-sm md:text-base leading-relaxed opacity-60 font-medium">
              {data?.description || "A technical deep-dive into the architecture and execution of this dynamic web system."}
            </p>
          </BentoMicro>

          <BentoMicro 
            label="Technological Stack" 
            icon={Cpu}
            className="lg:col-span-4"
          >
            <div className="flex flex-wrap gap-2">
              {data?.technologies?.map((tech: any, index: any) => (
                <div
                  key={index}
                  className="bg-white/[0.03] border border-white/[0.08] text-white-200 py-1.5 px-4 rounded-sm text-[9px] font-black uppercase tracking-[0.3em] hover:bg-purple/10 hover:border-purple/40 transition-all"
                >
                  {tech}
                </div>
              ))}
            </div>
          </BentoMicro>

          <BentoMicro className="lg:col-span-12 py-8 border-none bg-transparent px-0">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 border-t border-white/5 pt-12">
              <div className="flex items-center gap-12">
                <div className="flex flex-col gap-2">
                  <MicroLabel>Deployment Date</MicroLabel>
                  <div className="flex items-center gap-4">
                     <Calendar size={12} className="text-purple opacity-40" />
                     <span className="text-xs font-bold text-white tracking-[0.2em] uppercase">
                       {data?.createdAt ? new Date(data.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "N/A"}
                     </span>
                  </div>
                </div>
                
                <div className="h-4 w-[1px] bg-white/10" />
                
                <div className="flex flex-col gap-2">
                  <MicroLabel>Global Access</MicroLabel>
                  <div className="flex items-center gap-3">
                     <Globe size={12} className="text-purple opacity-40" />
                     <span className="text-xs font-bold text-white tracking-[0.2em] uppercase">Enabled</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                 <div className="w-2 h-2 rounded-full bg-purple opacity-40 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20">
                    J-SENSE.EXE / {data?._id?.slice(-8).toUpperCase() || "CORE"}
                 </span>
              </div>
            </div>
          </BentoMicro>
        </div>
      </main>

      {/* Finishing "Electric" Markers */}
      <div className="fixed bottom-10 left-10 flex flex-col gap-2 pointer-events-none opacity-20">
         <div className="w-10 h-[1px] bg-white" />
         <div className="w-1 h-1 bg-white rounded-full" />
      </div>
    </div>
  );
};

export default ViewDetails;

"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Cpu, ExternalLink, Globe, Layout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MicroLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn("font-space text-[10px] font-bold uppercase tracking-[0.35em] text-white/80", className)}>
    {children}
  </span>
);

const TechnicalFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative group">
    {/* Corner Markers */}
    <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#BCED34] z-30 opacity-60 group-hover:opacity-100 transition-opacity" />
    <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#BCED34] z-30 opacity-60 group-hover:opacity-100 transition-opacity" />
    <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#BCED34] z-30 opacity-60 group-hover:opacity-100 transition-opacity" />
    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#BCED34] z-30 opacity-60 group-hover:opacity-100 transition-opacity" />
    
    <div className="relative overflow-hidden rounded-2xl kail-glass">
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
      "relative p-6 rounded-2xl kail-glass transition-all duration-500",
      className
    )}
  >
    {label && (
      <div className="flex items-center gap-3 mb-6">
        {Icon && <Icon size={12} className="text-[#BCED34]" />}
        <MicroLabel>{label}</MicroLabel>
      </div>
    )}
    {children}
  </motion.div>
);

const ViewDetails = ({ data }: { data: any }) => {
  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-x-hidden pointer-events-auto font-outfit">
      {/* Studio KAIL Gradient Backdrop */}
      <div
        className="fixed inset-0 w-full h-full -z-10"
        style={{
          background: `
            radial-gradient(ellipse 90% 80% at 15% 18%, rgba(23, 40, 244, 0.85) 0%, transparent 65%),
            radial-gradient(ellipse 85% 75% at 85% 22%, rgba(205, 205, 231, 0.42) 0%, transparent 62%),
            radial-gradient(ellipse 90% 80% at 50% 62%, rgba(153, 150, 254, 0.55) 0%, transparent 68%),
            linear-gradient(155deg, #1728F4 0%, #5E64FD 36%, #575DA7 72%, #9996FE 100%)
          `,
        }}
      />
      
      {/* Electric Thin Lines */}
      <div className="fixed top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/15 to-transparent -z-10" />
      <div className="fixed top-0 left-[80%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/15 to-transparent -z-10" />

      <main className="container mx-auto max-w-6xl pt-32 pb-60 px-6 sm:px-12 relative z-10">
        
        {/* Micro-Modern Header */}
        <div className="flex flex-col gap-12 mb-24">
          <div className="flex items-center justify-between border-b border-white/20 pb-8">
            <Link 
              href="/"
              className="flex items-center gap-4 group"
            >
              <div className="w-8 h-8 rounded-full kail-glass-pill flex items-center justify-center group-hover:border-[#BCED34]/60 group-hover:text-[#BCED34] transition-all">
                <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <MicroLabel className="group-hover:text-white transition-colors">Catalog / Index</MicroLabel>
            </Link>
            
            <div className="flex items-center gap-8">
               <div className="hidden sm:flex flex-col items-end">
                  <MicroLabel>Status: Integrated</MicroLabel>
                  <span className="font-space text-[10px] font-bold text-[#BCED34] uppercase tracking-widest mt-1">Direct Link Ready</span>
               </div>
               {data?._id && (
                 <span className="font-space text-[10px] font-bold text-white/70 hidden md:block">UID: {data._id.toUpperCase()}</span>
               )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <MicroLabel className="text-[#BCED34] mb-4 block">Project Overview</MicroLabel>
              <h1 className="font-syne text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight uppercase">
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
                  className="flex items-center gap-4 bg-[#BCED34] hover:bg-white text-[#1728F4] font-space font-bold py-4 px-10 rounded-full text-xs uppercase tracking-[0.2em] shadow-[0_12px_32px_rgba(188,237,52,0.35)] transition-all cursor-pointer"
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
               <div className="absolute top-6 left-6 z-30 p-4 border-l border-[#BCED34]/50 kail-glass-pill rounded-r-xl">
                  <div className="flex flex-col gap-1">
                     <MicroLabel className="text-[8px] tracking-[0.35em] text-[#F4F4FE]">System: Web Interface</MicroLabel>
                     <MicroLabel className="text-[8px] tracking-[0.35em] text-[#9996FE]">Scale: Scalable Vector</MicroLabel>
                  </div>
               </div>
               
               <div className="absolute bottom-6 right-6 z-30 flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full kail-glass-pill font-space text-[9px] font-bold text-[#CDCDE7] uppercase tracking-widest">
                     Res: Adaptive
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full kail-glass-pill font-space text-[9px] font-bold text-[#CDCDE7] uppercase tracking-widest">
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
            <p className="font-outfit text-[#CDCDE7] text-sm md:text-base leading-relaxed">
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
                    className="kail-glass-pill text-[#F4F4FE] py-1.5 px-4 rounded-full font-space text-[9px] font-bold uppercase tracking-[0.2em] hover:border-[#BCED34]/50 hover:text-[#BCED34] transition-all"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </BentoMicro>

            <BentoMicro className="lg:col-span-12 py-8 border-none bg-transparent shadow-none px-0">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12 border-t border-white/10 pt-12">
                <div className="flex items-center gap-12">
                  <div className="flex flex-col gap-2">
                    <MicroLabel>Deployment Date</MicroLabel>
                    <div className="flex items-center gap-4">
                       <Calendar size={12} className="text-[#BCED34]" />
                       <span className="font-space text-xs font-bold text-[#F4F4FE] tracking-[0.2em] uppercase">
                         {data?.createdAt ? new Date(data.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "N/A"}
                       </span>
                    </div>
                  </div>
                  
                  <div className="h-4 w-[1px] bg-white/15" />
                  
                  <div className="flex flex-col gap-2">
                    <MicroLabel>Global Access</MicroLabel>
                    <div className="flex items-center gap-3">
                       <Globe size={12} className="text-[#9996FE]" />
                       <span className="font-space text-xs font-bold text-[#F4F4FE] tracking-[0.2em] uppercase">Enabled</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                   <div className="w-2 h-2 rounded-full bg-[#BCED34] animate-pulse" />
                 <span className="font-space text-[10px] font-bold uppercase tracking-[0.4em] text-[#8E92BC]/60">
                    J-SENSE.EXE / {data?._id?.slice(-8).toUpperCase() || "CORE"}
                 </span>
              </div>
            </div>
          </BentoMicro>
        </div>
      </main>
    </div>
  );
};

export default ViewDetails;

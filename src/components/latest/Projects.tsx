
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// MotionLink for animated Link
const MotionLink = motion(Link);

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    setMouseX(clientX - left);
    setMouseY(clientY - top);
  };

  // Improved Bento Logic for 3-column balancing
  const isLarge = index % 3 === 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className={cn(
        "group relative flex flex-col rounded-[2rem] border border-white/[0.1] bg-black-200 backdrop-blur-xl hover:border-purple/50 transition-all duration-500 overflow-hidden isolate",
        isLarge ? "md:col-span-2" : "md:col-span-1"
      )}
    >
      {/* Premium Spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(203, 172, 249, 0.15), transparent 40%)`,
        }}
      />

      <div className="p-8 sm:p-10 flex flex-col h-full">
        {/* Standardized Project Image Box */}
        <div className={cn(
          "relative w-full rounded-3xl overflow-hidden mb-10 group/img aspect-video",
          isLarge ? "max-h-[200px]" : "max-h-[200px]"
        )}>
          <Image
            src={project.image}
            fill
            alt={project.title}
            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <div className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <ExternalLink className="text-white" size={28} />
             </div>
          </div>
          {/* Enhanced Badge */}
          <div className="absolute top-5 left-5 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[10px] uppercase font-bold text-white tracking-[0.2em]">
            {project.technologies.length} Stack
          </div>
        </div>

        {/* Project Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple transition-all duration-300 tracking-tight line-clamp-1">
              {project.title}
            </h3>
          </div>

          <p className="text-white-100 text-base sm:text-md leading-relaxed mb-8 line-clamp-3 opacity-70 group-hover:opacity-100 transition-opacity">
            {project.description}
          </p>

          {/* Unified Technology Space */}
          <div className="flex flex-wrap gap-2.5 mb-auto pb-8 items-start">
            {project.technologies.slice(0, 6).map((tech: any, idx: number) => (
              <span
                key={idx}
                className="px-4 py-1.5 text-[11px] font-bold bg-white/[0.03] border border-white/[0.05] text-purple-200 rounded-full uppercase tracking-widest shadow-sm"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 6 && (
              <span className="px-4 py-1.5 text-[11px] font-bold bg-white/[0.03] border border-white/[0.05] text-white-100 rounded-full">
                +{project.technologies.length - 6}
              </span>
            )}
          </div>

          {/* Redesigned Button Layout - Stacked with Primary/Secondary Hierarchy */}
          <div className="space-y-3 w-full">
            {/* Primary Action - View Live */}
            <Link 
              href={project.liveLink}
              className="group/btn relative block w-full"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-30 group-hover/btn:opacity-60 transition duration-300" />
              <div className="relative flex items-center justify-center gap-3 w-full h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-white transition-all duration-300 group-hover/btn:shadow-lg group-hover/btn:shadow-purple/50">
                <span className="text-base">View Live Project</span>
                <ExternalLink size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Secondary Action - Details */}
            <MotionLink
              href={`/projects/${project._id}`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="flex items-center justify-center gap-3 w-full h-12 rounded-xl border border-white/[0.15] bg-white/[0.05] backdrop-blur-sm text-sm font-semibold text-white/90 transition-all hover:bg-white/[0.1] hover:border-white/[0.25]"
            >
              <Info size={18} className="text-purple" />
              <span>View Details</span>
            </MotionLink>
          </div>
        </div>
      </div>

      {/* Signature corner glow */}
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-purple/10 blur-[120px] rounded-full group-hover:bg-purple/25 transition-all duration-1000 -z-10" />
    </motion.div>
  );
};

const Projects = ({ pr }: { pr: any[] }) => {
  if (!pr || pr.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-white-100 text-xl font-medium">No projects to display at the moment.</p>
      </div>
    );
  }

  return (
    <section id="projects" className="relative py-40 px-6 sm:px-12 lg:px-24 bg-black overflow-hidden pointer-events-auto">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 w-full h-full bg-grid-white/[0.02] -z-10" />
      <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] -z-10" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
           className="text-center mb-32"
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-5 py-2 mb-8 text-xs font-black tracking-[0.3em] text-purple uppercase bg-purple/10 border border-purple/20 rounded-full">
            Showcase
          </span>
          <h2 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter text-white leading-none">
            Selected <span className="text-purple">Works</span>
          </h2>
          <p className="text-white-100 max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed opacity-60">
            A proper collection of modern developments where design meets functional excellence.
          </p>
        </motion.div>

        {/* Improved Bento Grid with tighter gaps and proper "Shape" */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-stretch">
          {pr.map((project, index) => (
            <ProjectCard key={project._id || index} project={project} index={index} />
          ))}
        </div>

        {/* Footer shimmer line */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="mt-40 text-center"
        >
          <div className="inline-flex h-[1px] w-40 bg-gradient-to-r from-transparent via-purple/40 to-transparent mb-10" />
          <p className="text-white-200 text-sm font-semibold opacity-30 uppercase tracking-widest">
            Always Building & Learning
          </p>
        </motion.div>
      </div>
      
      {/* Dynamic Background Orbs */}
      <div className="absolute top-[15%] -left-[10%] w-[500px] h-[500px] bg-purple/5 blur-[200px] rounded-full -z-10" />
      <div className="absolute bottom-[20%] -right-[15%] w-[600px] h-[600px] bg-blue-500/5 blur-[200px] rounded-full -z-10" />
    </section>
  );
};

export default Projects;
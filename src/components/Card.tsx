"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Info, ArrowUpRight } from "lucide-react";

type ProjectType = {
  id?: number;
  title: string;
  slug?: string;
  category?: string;
  description: string;
  image: string;
  technologies: string[];
  features?: string[];
  liveUrl?: string;
  liveLink?: string;
  githubUrl?: string;
  featured?: boolean;
  status?: string;
  _id?: string;
};

const Card = ({ project }: { project: ProjectType }) => {
  const destinationLive = project.liveUrl || project.liveLink || "#";
  const specificationUrl = project.slug 
    ? `/projects/${project.slug}` 
    : `/projects/${project._id || project.id || ""}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="group relative flex flex-col rounded-3xl border border-[#334155] bg-[#121212] transition-all duration-500 hover:border-[#38bdf8]/50 overflow-hidden isolate shadow-2xl w-full h-full"
    >
      {/* Background Hover Glow Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

      {/* Image box with padding */}
      <div className="p-4">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/40 border border-[#334155]">
          <Image
            src={project.image || "/images/about-me.png"}
            fill
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] grayscale group-hover:grayscale-0"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            {destinationLive !== "#" ? (
              <a
                href={destinationLive}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 bg-black/85 backdrop-blur-md rounded-full border border-[#334155] text-[#38bdf8]"
              >
                <ExternalLink size={20} />
              </a>
            ) : (
              <div className="p-3.5 bg-black/85 backdrop-blur-md rounded-full border border-[#334155] text-[#94a3b8]">
                <Info size={20} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 pt-2 flex-1 flex flex-col">
        <div className="mb-4">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#38bdf8]">
            {project.category || "Showcase Project"}
          </span>
          <h3 className="text-xl font-black text-[#e2e8f0] group-hover:text-[#38bdf8] transition-colors duration-300 tracking-tight uppercase mt-1">
            {project.title}
          </h3>
        </div>

        <p className="text-[#94a3b8] text-xs leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies List */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {project.technologies?.slice(0, 4).map((tech: string, idx: number) => (
            <span
              key={idx}
              className="px-3 py-1 text-[8px] font-bold bg-[#050505] border border-[#334155] text-[#94a3b8] rounded-full uppercase tracking-wider"
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 4 && (
            <span className="px-2.5 py-1 text-[8px] font-bold bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#38bdf8] rounded-full">
              +{project.technologies.length - 4} MORE
            </span>
          )}
        </div>

        {/* Actions Bottom */}
        <div className="mt-auto pt-4 border-t border-[#334155]/60 flex items-center justify-between">
          {destinationLive !== "#" ? (
            <a
              href={destinationLive}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#e2e8f0] hover:text-[#38bdf8] transition-colors group/link"
            >
              <span>Live Project</span>
              <ArrowUpRight size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          ) : (
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94a3b8]">
              Coming Soon
            </span>
          )}

          <Link
            href={specificationUrl}
            className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#94a3b8] hover:text-[#e2e8f0] transition-colors"
          >
            <Info size={12} />
            <span>Specifications</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;

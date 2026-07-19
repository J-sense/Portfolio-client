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
      className="group relative flex flex-col rounded-3xl border border-white/[0.05] bg-[#1b1918] transition-all duration-500 hover:border-[#c5ff41]/30 overflow-hidden isolate shadow-lg w-full h-full"
    >
      {/* Background Hover Glow Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,255,65,0.02)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

      {/* Image box with padding */}
      <div className="p-4">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/40">
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
                className="p-3.5 bg-black/85 backdrop-blur-md rounded-full border border-white/20 text-[#c5ff41]"
              >
                <ExternalLink size={20} />
              </a>
            ) : (
              <div className="p-3.5 bg-black/85 backdrop-blur-md rounded-full border border-white/20 text-[#f46c38]">
                <Info size={20} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 pt-2 flex-1 flex flex-col">
        <div className="mb-4">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#c5ff41]">
            {project.category || "Showcase Project"}
          </span>
          <h3 className="text-xl font-black text-white group-hover:text-[#c5ff41] transition-colors duration-300 tracking-tight uppercase mt-1">
            {project.title}
          </h3>
        </div>

        <p className="text-[#998f8f] text-xs leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies List */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {project.technologies?.slice(0, 4).map((tech: string, idx: number) => (
            <span
              key={idx}
              className="px-3 py-1 text-[8px] font-bold bg-white/[0.03] border border-white/[0.04] text-white/60 rounded-full uppercase tracking-wider"
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 4 && (
            <span className="px-2.5 py-1 text-[8px] font-bold bg-white/[0.03] border border-white/[0.04] text-[#c5ff41] rounded-full">
              +{project.technologies.length - 4} MORE
            </span>
          )}
        </div>

        {/* Actions Bottom */}
        <div className="mt-auto pt-4 border-t border-white/[0.05] flex items-center justify-between">
          {destinationLive !== "#" ? (
            <a
              href={destinationLive}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-[#c5ff41] transition-colors group/link"
            >
              <span>Live Project</span>
              <ArrowUpRight size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          ) : (
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#998f8f]">
              Coming Soon
            </span>
          )}

          <Link
            href={specificationUrl}
            className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#998f8f] hover:text-white transition-colors"
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

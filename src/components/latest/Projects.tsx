"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Project = {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  status: string;
};

const ProjectRow = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      {/* Top divider */}
      <div className="h-px w-full bg-white/[0.07] group-hover:bg-[#c5ff41]/20 transition-colors duration-500" />

      <div className="flex items-center gap-6 py-6 cursor-default">
        {/* Index number */}
        <span className="text-[11px] font-black text-[#998f8f] uppercase tracking-[0.2em] w-6 shrink-0 select-none">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Thumbnail — slides in on hover */}
        <div
          className={`relative overflow-hidden rounded-xl shrink-0 transition-all duration-500 ease-out ${
            hovered ? "w-28 h-16 opacity-100" : "w-0 h-16 opacity-0"
          }`}
        >
          <Image
            src={project.image}
            fill
            alt={project.title}
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Main content */}
        <div className="flex flex-1 items-center gap-6 min-w-0">
          {/* Left: category + title + description */}
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#c5ff41] mb-1.5">
              {project.category}
            </p>
            <h3
              className={`font-black uppercase tracking-tight transition-colors duration-300 leading-none truncate ${
                hovered ? "text-[#c5ff41]" : "text-white"
              } text-xl md:text-2xl`}
            >
              {project.title}
            </h3>
            <p className="text-[#998f8f] text-[11px] leading-relaxed mt-2 line-clamp-1 max-w-sm">
              {project.description}
            </p>
          </div>

          {/* Tech pills — hidden on small, visible on md+ */}
          <div className="hidden md:flex flex-wrap gap-1.5 shrink-0 max-w-[220px]">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-[8px] font-bold bg-white/[0.04] border border-white/[0.07] text-white/50 rounded-full uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 text-[8px] font-bold text-[#c5ff41] border border-[#c5ff41]/20 bg-[#c5ff41]/5 rounded-full">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Status badge */}
          <span
            className={`hidden lg:flex shrink-0 items-center gap-1 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
              project.status === "Completed"
                ? "text-[#c5ff41] border-[#c5ff41]/25 bg-[#c5ff41]/5"
                : "text-[#f46c38] border-[#f46c38]/25 bg-[#f46c38]/5"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                project.status === "Completed"
                  ? "bg-[#c5ff41]"
                  : "bg-[#f46c38] animate-pulse"
              }`}
            />
            {project.status}
          </span>

          {/* Arrow CTA */}
          <div className="shrink-0">
            {project.liveUrl ? (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.08] bg-[#1b1918] text-[#998f8f] group-hover:bg-[#c5ff41] group-hover:text-black group-hover:border-transparent transition-all duration-300"
              >
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </Link>
            ) : (
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.05] bg-[#1b1918] text-[#998f8f]/40">
                <ArrowUpRight size={16} />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = ({ pr, showAll = false }: { pr: Project[]; showAll?: boolean }) => {
  if (!pr || pr.length === 0) return null;

  const displayProjects = showAll ? pr : pr.slice(0, 3);

  return (
    <section
      id="projects"
      className="relative py-16 bg-[#151312] overflow-hidden"
    >
      {/* Subtle ambient */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#f46c38]/[0.025] blur-[100px] rounded-full -z-10 pointer-events-none" />

      {/* Section header */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-end justify-between">
          <div>
            <span className="inline-block px-3 py-1 mb-3 text-[9px] font-black tracking-[0.3em] text-[#f46c38] uppercase bg-[#f46c38]/5 border border-[#f46c38]/20 rounded-full">
              {showAll ? "Showcase" : "Selected Works"}
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase leading-none">
              {showAll ? "ALL WORKS" : "RECENT PROJECTS"}
            </h2>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#998f8f]">
            {displayProjects.length} Projects
          </span>
        </div>
      </motion.div>

      {/* Project rows */}
      <div>
        {displayProjects.map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} />
        ))}
        {/* Bottom border */}
        <div className="h-px w-full bg-white/[0.07]" />
      </div>
    </section>
  );
};

export default Projects;
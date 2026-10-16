"use client";
import React from "react";
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

// Neutral glass pill (reads cleanly on black)
const glassPill =
  "text-slate-300 bg-white/[0.06] border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]";

const ProjectRow = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const isCompleted = project.status === "Completed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Top divider */}
      <div className="h-px w-full bg-[#334155]/60 group-hover:bg-[#38bdf8]/40 transition-colors duration-500" />

      <div className="flex items-center gap-6 py-6 cursor-default">
        {/* Index number */}
        <span className="text-xs font-black text-[#94a3b8] uppercase tracking-[0.2em] w-6 shrink-0 select-none">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Thumbnail: slides in on hover */}
        <div
          className="relative overflow-hidden rounded-xl shrink-0 h-16 w-0 opacity-0
            border border-[#334155]
            shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
            transition-all duration-500 ease-out
            group-hover:w-28 group-hover:opacity-100"
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
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#38bdf8] mb-1.5">
              {project.category}
            </p>
            <h3 className="font-black uppercase tracking-tight transition-colors duration-300 leading-none truncate text-[#e2e8f0] group-hover:text-[#38bdf8] text-xl md:text-2xl">
              {project.title}
            </h3>
            <p className="text-[#94a3b8] text-xs leading-relaxed mt-2 line-clamp-1 max-w-sm">
              {project.description}
            </p>
          </div>

          {/* Tech pills: hidden on small, visible on md+ */}
          <div className="hidden md:flex flex-wrap gap-1.5 shrink-0 max-w-[220px]">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className={`px-2.5 py-1 text-[9px] font-bold rounded-full uppercase tracking-wider select-none ${glassPill}`}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span
                className={`px-2 py-1 text-[9px] font-bold rounded-full select-none text-sky-300 bg-white/[0.06] border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]`}
              >
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Status badge */}
          <span
            className={`hidden lg:flex shrink-0 items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full select-none ${glassPill}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${isCompleted ? "bg-[#38bdf8]" : "bg-[#94a3b8] animate-pulse"
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
                aria-label={`Open ${project.title} live site`}
                className="flex items-center justify-center w-10 h-10 rounded-full select-none
                  text-[#94a3b8] group-hover:text-[#04121C]
                  bg-gradient-to-b from-[#1E2530] to-[#0B0E13]
                  group-hover:from-[#7DD3FC] group-hover:to-[#38BDF8]
                  border border-[#334155] group-hover:border-white/30
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-3px_6px_rgba(0,0,0,0.4)]
                  group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(3,60,100,0.3)]
                  transition-all duration-300 active:scale-95
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </Link>
            ) : (
              <div
                aria-hidden="true"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#334155]/60 bg-[#121212] text-[#94a3b8]/40"
              >
                <ArrowUpRight size={16} />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = ({
  pr,
  showAll = false,
}: {
  pr: Project[];
  showAll?: boolean;
}) => {
  if (!pr || pr.length === 0) return null;

  const displayProjects = showAll ? pr : pr.slice(0, 3);

  return (
    <section
      id="projects"
      className="relative py-16 bg-[#050505] overflow-hidden"
    >
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
            <span
              className="inline-flex items-center gap-2 w-fit mb-3 px-3.5 py-1.5 rounded-full select-none
                text-[10px] font-bold tracking-[0.3em] uppercase text-slate-200
                bg-white/[0.06] border border-white/15
                shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              {showAll ? "Showcase" : "Selected Works"}
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-[#e2e8f0] uppercase leading-none">
              {showAll ? "ALL WORKS" : "RECENT PROJECTS"}
            </h2>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94a3b8]">
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
        <div className="h-px w-full bg-[#334155]/60" />
      </div>
    </section>
  );
};

export default Projects;
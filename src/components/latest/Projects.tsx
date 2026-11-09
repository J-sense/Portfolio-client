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

// Studio KAIL frosted glass pill
const glassPill = "kail-glass-pill text-white";

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
      <div className="h-px w-full bg-white/20 group-hover:bg-[#BCED34]/70 transition-colors duration-500" />

      <div className="flex items-center gap-6 py-6 px-3 -mx-3 rounded-2xl group-hover:bg-white/10 transition-colors duration-300 cursor-default">
        {/* Index number */}
        <span className="font-space text-xs font-bold text-white/75 uppercase tracking-[0.2em] w-6 shrink-0 select-none">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Thumbnail: slides in on hover */}
        <div
          className="relative overflow-hidden rounded-xl shrink-0 h-16 w-0 opacity-0
            border border-white/30
            shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]
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
            <p className="font-space text-[10px] font-bold uppercase tracking-[0.24em] text-[#BCED34] mb-1.5">
              {project.category}
            </p>
            <h3 className="font-syne font-extrabold uppercase tracking-tight transition-colors duration-300 leading-none truncate text-white group-hover:text-[#BCED34] text-xl md:text-2xl">
              {project.title}
            </h3>
            <p className="font-outfit text-white/80 text-xs font-normal leading-relaxed mt-2 line-clamp-1 max-w-sm">
              {project.description}
            </p>
          </div>

          {/* Tech pills: hidden on small, visible on md+ */}
          <div className="hidden md:flex flex-wrap gap-1.5 shrink-0 max-w-[220px]">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className={`font-space px-2.5 py-1 text-[9px] font-semibold rounded-full uppercase tracking-wider select-none ${glassPill}`}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span
                className={`font-space px-2 py-1 text-[9px] font-semibold rounded-full select-none ${glassPill}`}
              >
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Status badge */}
          <span
            className={`font-space hidden lg:flex shrink-0 items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full select-none ${glassPill}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isCompleted
                  ? "bg-[#BCED34] shadow-[0_0_8px_#BCED34]"
                  : "bg-white animate-pulse"
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
                  text-white group-hover:text-[#1728F4]
                  bg-white/15 backdrop-blur-xl
                  group-hover:bg-[#BCED34]
                  border border-white/25 group-hover:border-transparent
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]
                  group-hover:shadow-[0_0_20px_rgba(188,237,52,0.4)]
                  transition-all duration-300 active:scale-95
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BCED34]"
              >
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </Link>
            ) : (
              <div
                aria-hidden="true"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-white/10 text-white/40"
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
      className="relative py-16 bg-transparent overflow-hidden"
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
              className="kail-glass-pill font-space inline-flex items-center gap-2 w-fit mb-3 px-3.5 py-1.5 rounded-full select-none
                text-[10px] font-bold tracking-[0.28em] uppercase text-white"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#BCED34] shadow-[0_0_8px_#BCED34]" />
              {showAll ? "Showcase" : "Selected Works"}
            </span>
            <h2 className="font-syne text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase leading-none">
              {showAll ? (
                <>
                  ALL <span className="text-[#BCED34]">WORKS</span>
                </>
              ) : (
                <>
                  RECENT <span className="text-[#BCED34]">PROJECTS</span>
                </>
              )}
            </h2>
          </div>
          <span className="font-space text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
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
        <div className="h-px w-full bg-white/20" />
      </div>
    </section>
  );
};

export default Projects;

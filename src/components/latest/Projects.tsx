"use client";
import React from "react";
import { motion } from "framer-motion";
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

// Figma Build Spec 3.4 — ProjectRow
const ProjectRow = ({
  project,
  index,
  isLast,
}: {
  project: Project;
  index: number;
  isLast: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className={`group relative border-t border-white/[0.20] ${
        isLast ? "border-b border-white/[0.20]" : ""
      } py-[40px] px-[10px] hover:bg-white/[0.10] transition-colors duration-300`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-[26px]">
        {/* 1. Index: Mono/Index, aligned to the top with 6 px top padding (01, 02, 03), width 56 */}
        <span className="spec-mono-index pt-[6px] w-[56px] shrink-0 self-start select-none">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* 2. Content stack: Category in Mono/Label Lime (mb 8), Title in Display/Project Title (mb 10), Description in Body/Project (max-w 56ch, mb 16, full text), Chip row (gap 8, wrap) */}
        <div className="flex-1 min-w-0 flex flex-col items-start">
          <p className="spec-mono-label-lime mb-[8px]">
            {project.category}
          </p>

          <h3 className="spec-project-title mb-[10px]">
            {project.title}
          </h3>

          <p className="spec-body-project max-w-[56ch] mb-[16px]">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-[8px]">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <span key={i} className="spec-chip">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="spec-chip">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* 3. Right column, vertical, gap 16, align right: PillB Lime with status, then ArrowButton: 58 × 58 circle */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-[16px] shrink-0">
          <span className="spec-pill-lime">
            {project.status}
          </span>

          {project.liveUrl ? (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} live site`}
              className="flex items-center justify-center w-[58px] h-[58px] rounded-full select-none
                text-white bg-white/[0.14] border border-white/[0.34]
                group-hover:bg-[#BCED34] group-hover:border-[#BCED34] group-hover:text-[#10127A]
                transition-all duration-300"
            >
              <ArrowUpRight
                size={22}
                className="group-hover:rotate-45 transition-transform duration-300"
              />
            </Link>
          ) : (
            <div
              aria-hidden="true"
              className="flex items-center justify-center w-[58px] h-[58px] rounded-full border border-white/[0.20] bg-white/[0.08] text-white/40"
            >
              <ArrowUpRight size={22} />
            </div>
          )}
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
      className="relative pb-24 md:pb-[128px] bg-transparent"
    >
      {/* Figma Build Spec 3.4 — Header: Tag: SELECTED WORKS. Title: RECENT / PROJECTS. Right: Count */}
      <motion.div
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[46px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-start">
          <div className="spec-section-tag">
            <span className="w-[7px] h-[7px] rounded-full bg-[#BCED34] shadow-[0_0_10px_#BCED34]" />
            <span>{showAll ? "SHOWCASE" : "SELECTED WORKS"}</span>
          </div>

          <h2 className="spec-display-h2 mt-[18px]">
            {showAll ? (
              <>
                ALL
                <br />
                <span className="text-[#BCED34]">WORKS</span>
              </>
            ) : (
              <>
                RECENT
                <br />
                <span className="text-[#BCED34]">PROJECTS</span>
              </>
            )}
          </h2>
        </div>

        <span className="spec-mono-label-muted">
          {displayProjects.length} PROJECTS
        </span>
      </motion.div>

      {/* Project rows */}
      <div className="flex flex-col">
        {displayProjects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            isLast={index === displayProjects.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;

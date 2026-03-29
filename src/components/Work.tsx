"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EXPERIENCES } from "@/lib/data/index";
import { motion } from "framer-motion";
import { Briefcase, Calendar, GraduationCap } from "lucide-react";

const ExperienceCard = ({ experience, index }: { experience: any; index: number }) => {
  const isEdu = experience.company.toLowerCase().includes("academy") || experience.company.toLowerCase().includes("university");

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="relative flex gap-8 group"
    >
      {/* Timeline Node/Dot */}
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-black-200 backdrop-blur-md z-10 group-hover:border-purple/50 transition-colors duration-500">
          {isEdu ? (
            <GraduationCap className="text-purple w-6 h-6" />
          ) : (
            <Briefcase className="text-purple w-6 h-6" />
          )}
          {/* Node Glow */}
          <div className="absolute inset-0 rounded-full bg-purple/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        </div>
        {/* Line Segment below node (if not last) */}
        <div className="w-px h-full bg-gradient-to-bottom from-purple/50 to-transparent mt-4 opacity-30" />
      </div>

      {/* Card Content */}
      <div className="flex-1 pb-20 pt-1">
        <div className="relative p-8 rounded-3xl border border-white/[0.08] bg-black-200 backdrop-blur-xl hover:border-purple/30 transition-all duration-700 isolate group">
          {/* Card Hover Background Glow */}
          <div className="absolute -inset-px bg-gradient-to-br from-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 rounded-3xl" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white group-hover:text-purple transition-colors duration-300 tracking-tight">
                {experience.company}
              </h3>
              <p className="text-lg font-medium text-purple/80 mt-1">
                {experience.role}
              </p>
            </div>
            {/* Year Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-bold text-white-100 uppercase tracking-widest whitespace-nowrap self-start md:self-center">
              <Calendar size={14} className="text-purple" />
              {experience.year}
            </div>
          </div>

          <p className="text-white-100 text-lg leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity duration-500">
            {experience.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Work = () => {

  return (
    <section id="experience" className="relative py-40 px-6 sm:px-12 lg:px-24 bg-black overflow-hidden pointer-events-auto mt-[-100px]">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 w-full h-full bg-grid-white/[0.02] bg-grid-small-white/[0.01] -z-10" />
      <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] -z-10" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
           className="text-center mb-32"
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-white">
            Professional <span className="text-purple">Journey</span>
          </h2>
          <p className="text-white-100 max-w-2xl mx-auto text-lg md:text-xl opacity-60 leading-relaxed">
            A linear progression of my technical expertise and industry experience.
          </p>
        </motion.div>

        <div className="relative mt-20 ml-4 sm:ml-6 md:ml-0">
          {/* Vertical Timeline Drawing Line */}
          <div className="absolute left-6 md:left-6 top-0 bottom-0 w-px bg-white/10 hidden sm:block" />
          
          <div className="space-y-4">
            {EXPERIENCES.map((experience: any, id: number) => (
              <ExperienceCard key={id} experience={experience} index={id} />
            ))}
          </div>
        </div>

        {/* Shimmer footer for experience */}
        <div className="mt-20 text-center opacity-20">
          <p className="text-xs uppercase font-bold tracking-[0.5em] text-white-100">
            End of Timeline
          </p>
        </div>
      </div>

      {/* Background Orbs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple/10 blur-[150px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-500/10 blur-[150px] rounded-full -z-10" />
    </section>
  );
};

export default Work;

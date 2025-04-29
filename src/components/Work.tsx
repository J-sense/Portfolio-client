"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { motion } from "framer-motion";
import { EXPERIENCES } from "@/lib/data/index";

const Work = () => {
  return (
    <section
      id="experience"
      className="py-16 px-8  md:px-16 lg:px-24 bg-black text-white overflow-hidden"
    >
      <div className="flex justify-center">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold text-center mb-16 relative inline-block"
          initial={{ opacity: 0, y: -60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#CBACF9] to-purple-500">
            Work Experience
          </span>
        </motion.h2>
      </div>

      <div className="mx-auto max-w-6xl space-y-14">
        {EXPERIENCES.map((experience: any, id: any) => (
          <motion.div
            key={id}
            className="relative p-8 sm:p-10 rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(155,81,224,0.25)] hover:shadow-[0_8px_64px_0_rgba(155,81,224,0.35)] transition-all duration-700 ease-out"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: id * 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-semibold text-2xl md:text-3xl text-white mb-2">
              {experience.company}
            </h2>
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <p className="tracking-wide text-lg md:text-xl text-gray-300">
                {experience.role}
              </p>
              <p className="text-sm md:text-base text-gray-400">
                {experience.year}
              </p>
            </div>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
              {experience.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Work;

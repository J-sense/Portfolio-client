"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { motion } from "framer-motion";
import { EXPERIENCES } from "@/lib/data/index";

const Work = () => {
  return (
    <motion.div
      id="experience"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="text-5xl md:text-7xl lg:text-6xl font-extrabold text-center mb-10 relative inline-block"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="bg-clip-text text-transparent text-center bg-gradient-to-r from-[#CBACF9] to-purple-500">
          Work Experience
        </span>
      </motion.h2>
      <div className="mx-auto max-w-6xl">
        {EXPERIENCES.map((experience: any, id: any) => (
          <motion.div
            key={id}
            className="mx-4 mb-20 p-6 rounded-xl border bg-zinc-900/80 shadow-lg hover:bg-zinc-950 transition-colors"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: id * 0.1 }}
          >
            <h2 className="font-medium lg:text-2xl text-white">
              {experience.company}
            </h2>
            <div className="flex justify-between items-center">
              <p className="py-4 tracking-wide lg:text-xl text-gray-300">
                {experience.role}
              </p>
              <p className="py-4 lg:text-xl text-gray-400">{experience.year}</p>
            </div>
            <p className="font-sans text-gray-400">{experience.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Work;

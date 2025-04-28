/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProjectData } from "@/types/types";
import Link from "next/link";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Card = ({ project }: { project: ProjectData }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      className="group relative flex h-[500px] w-[350px] mt-20 flex-col overflow-hidden rounded-xl border border-gray-700 bg-zinc-950 p-4 shadow-lg transition-transform  hover:border-lime-400 hover:shadow-lime-400/40"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden rounded-lg">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-2 text-white">
        <div>
          <h3 className="mt-4 text-2xl font-bold">{project.title}</h3>
          <p className="mt-2 text-sm text-gray-400">
            {project.description.substring(0, 80)}...
          </p>

          {/* Technologies */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech: any, index) => (
              <span
                key={index}
                className="rounded-md bg-lime-400 px-2 py-1 text-xs font-semibold text-black"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex items-center justify-between">
          <Link href={project.liveLink} target="_blank">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="rounded-md bg-lime-500 px-4 py-2 text-sm font-semibold text-black hover:bg-lime-600"
            >
              Live Demo
            </motion.button>
          </Link>

          <Link href={`/projects/${project._id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="rounded-md bg-lime-500 px-4 py-2 text-sm font-semibold text-black hover:bg-lime-600"
            >
              View Details
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;

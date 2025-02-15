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
    <div className=" border border-white rounded-md bg-zinc-900 mt-40 h-64">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.05 }}
        className="relative overflow-hidden rounded-lg  shadow-lg transition duration-300"
      >
        {/* Image */}
        <div className="relative h-64 w-full">
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>

        {/* Content */}
        <div className="p-5 text-white">
          <h3 className="mb-2 text-2xl font-bold">{project.title}</h3>
          <p className="mb-4 text-gray-400">
            {project.description.substring(0, 50)}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: any, index) => (
              <span
                key={index}
                className="rounded-md bg-lime-400 px-2 py-1 text-xs font-semibold text-black"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Live Demo Button */}
          <div className="flex justify-between">
            <motion.a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="mt-4 inline-block rounded-lg bg-lime-500 px-4 py-2 font-semibold text-black transition hover:bg-lime-600"
            >
              Live Demo
            </motion.a>
            <motion.a
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="mt-4 inline-block rounded-lg bg-lime-500 px-4 py-2 font-semibold text-black transition hover:bg-lime-600"
            >
              <Link href={`/projects/${project._id}`}>View Details</Link>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;

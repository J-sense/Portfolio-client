/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react"; // You can use any icon

const Projects = ({ pr }: { pr: any[] }) => {
  if (!pr || pr.length === 0) {
    return <p>No projects to display</p>;
  }

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2.2, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3.2, spacing: 32 },
      },
    },
  });

  const handlePrev = () => {
    instanceRef.current?.prev();
  };

  const handleNext = () => {
    instanceRef.current?.next();
  };

  return (
    <section
      id="projects"
      className="relative py-24 px-4 sm:px-8 md:px-16 lg:px-24 bg-black text-white overflow-hidden"
    >
      {/* Heading */}
      <motion.h2
        className="text-4xl md:text-6xl font-extrabold text-center mb-10"
        initial={{ opacity: 0, y: -60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#CBACF9] to-purple-500">
          Latest Projects
        </span>
      </motion.h2>

      {/* Arrows */}
      <div className="absolute top-1/2 left-4 z-10 hidden md:flex items-center">
        <button
          onClick={handlePrev}
          className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full text-white"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="absolute top-1/2 right-4 z-10 hidden md:flex items-center">
        <button
          onClick={handleNext}
          className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full text-white"
        >
          <ArrowRight size={24} />
        </button>
      </div>

      {/* Projects Slider */}
      <div ref={sliderRef} className="keen-slider">
        {pr.map((project, idx) => (
          <motion.div
            key={project._id || idx}
            className="keen-slider__slide bg-black/30 border border-white/10 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(155,81,224,0.25)] rounded-2xl p-8 hover:shadow-[0_8px_64px_0_rgba(155,81,224,0.35)] transition-all duration-700 ease-out"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Project Image */}
            <Image
              src={project.image}
              width={450}
              height={450}
              alt="project_img"
              className="rounded-lg mb-4"
            />

            {/* Project Title */}
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>

            {/* Project Description */}
            <p className="text-gray-400 mb-4">
              {project.description.substring(0, 50)}...
            </p>

            {/* Project Technologies */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map(
                (tech: any, index: React.Key | null | undefined) => (
                  <span
                    key={index}
                    className="rounded-md bg-lime-400 px-2 py-1 text-xs font-semibold text-black"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>

            {/* Project Links */}
            <div className="flex justify-between">
              <motion.a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="mt-2 inline-block rounded-lg bg-lime-500 px-4 py-2 font-semibold text-black transition hover:bg-lime-600"
              >
                Live Demo
              </motion.a>
              <motion.a
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="mt-2 inline-block rounded-lg bg-lime-500 px-4 py-2 font-semibold text-black transition hover:bg-lime-600"
              >
                View Details
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ProjectData } from "@/types/types";
import Link from "next/link";
import {
  ExternalLink,
  Info,
  Sparkles,
  Zap,
  ArrowUpRight,
  Code2,
} from "lucide-react";
// import { cn } from "@/lib/utils";

const MotionLink = motion(Link);

const Card = ({ project }: { project: ProjectData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Advanced 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["7.5deg", "-7.5deg"],
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-7.5deg", "7.5deg"],
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative mt-20 flex flex-col rounded-3xl overflow-hidden isolate h-full perspective-1000"
    >
      {/* Animated Border Gradient */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
      <div
        className="absolute -inset-[1px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-100 animate-spin-slow transition-opacity duration-500"
        style={{ animationDuration: "3s" }}
      />

      {/* Main Card Container */}
      <div className="relative bg-gradient-to-br from-black via-black/95 to-purple-950/20 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 flex flex-col h-full z-10">
        {/* Mesh Gradient Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        {/* Floating Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute -top-3 -right-3 z-20"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-md opacity-70 animate-pulse" />
            <div className="relative px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full border border-white/20 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                  Live
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Image with Glass Morphism */}
        <div
          className="relative w-full rounded-2xl overflow-hidden mb-6 group/img aspect-video z-10"
          style={{ transform: "translateZ(50px)" }}
        >
          {/* Image Container */}
          <div className="relative w-full h-full">
            <Image
              src={project.image}
              fill
              alt={project.title}
              className="object-cover transition-all duration-700 group-hover/img:scale-110 group-hover/img:rotate-1"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

            {/* Hover Glass Panel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 backdrop-blur-[2px]"
            />

            {/* Floating Icon on Hover */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{
                scale: isHovered ? 1 : 0,
                rotate: isHovered ? 0 : -180,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="p-5 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
                <Zap className="text-white" size={32} fill="currentColor" />
              </div>
            </motion.div>
          </div>

          {/* Corner Tech Badge */}
          <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/80 backdrop-blur-xl rounded-full border border-purple/30 shadow-lg">
            <div className="flex items-center gap-2">
              <Code2 size={12} className="text-purple" />
              <span className="text-[10px] font-black text-white uppercase tracking-wider">
                {project.technologies.length} Tech
              </span>
            </div>
          </div>

          {/* Scan Line Effect */}
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear",
              repeatDelay: 2,
            }}
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-30"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col relative z-10">
          {/* Title with Gradient */}
          <motion.h3
            className="text-2xl sm:text-3xl font-black mb-3 tracking-tight line-clamp-2 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-blue-300 transition-all duration-500"
            style={{ transform: "translateZ(30px)" }}
          >
            {project.title}
          </motion.h3>

          {/* Description with Frosted Glass */}
          <div className="relative mb-6">
            <div className="absolute -inset-2 bg-white/[0.02] rounded-xl blur-sm" />
            <p className="relative text-white-100 text-sm leading-relaxed line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity">
              {project.description}
            </p>
          </div>

          {/* Technologies - Holographic Style */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies
              .slice(0, 5)
              .map((tech: string, idx: number) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="relative group/tech"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-0 group-hover/tech:opacity-75 transition duration-300" />
                  <span className="relative px-3 py-1.5 text-[10px] font-black bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.1] text-purple-200 rounded-lg uppercase tracking-wider backdrop-blur-sm hover:border-purple/50 transition-all duration-300 block">
                    {tech}
                  </span>
                </motion.span>
              ))}
            {project.technologies.length > 5 && (
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1.5 text-[10px] font-black bg-white/[0.05] border border-white/[0.1] text-white-100 rounded-lg backdrop-blur-sm"
              >
                +{project.technologies.length - 5}
              </motion.span>
            )}
          </div>

          {/* Futuristic Button Layout */}
          <div
            className="space-y-3 w-full mt-auto"
            style={{ transform: "translateZ(40px)" }}
          >
            {/* Primary Action - Neon Glow */}
            <Link
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative block w-full"
            >
              {/* Animated Background Layers */}
              {/* <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl blur-lg opacity-40 group-hover/btn:opacity-100 transition duration-500 animate-gradient-xy" />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover/btn:opacity-100 transition duration-300" /> */}

              {/* Button Content */}
              <div className="relative flex items-center justify-center gap-2.5 w-full h-14 border border-indigo-200 rounded-xl font-black text-white text-sm tracking-wide uppercase overflow-hidden">
                {/* Shimmer Effect */}
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear",
                    repeatDelay: 1,
                  }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                />

                <Sparkles
                  size={16}
                  className="group-hover/btn:rotate-180 transition-transform duration-500"
                />
                <span>Launch Project</span>
                <ArrowUpRight
                  size={18}
                  className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
                />
              </div>
            </Link>

            {/* Secondary Action - Glass Morphism */}
            <MotionLink
              href={`/projects/${project._id}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group/details flex items-center justify-center gap-2.5 w-full h-12 rounded-xl border border-white/[0.15] bg-white/[0.03] backdrop-blur-xl text-sm font-bold text-white/90 overflow-hidden transition-all hover:border-purple/50"
            >
              {/* Hover Gradient Fill */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover/details:opacity-100 transition-opacity duration-300" />

              <Info
                size={16}
                className="text-purple relative z-10 group-hover/details:rotate-12 transition-transform"
              />
              <span className="relative z-10">Explore Details</span>
              <ArrowUpRight
                size={14}
                className="opacity-0 group-hover/details:opacity-100 -translate-x-2 group-hover/details:translate-x-0 transition-all relative z-10"
              />
            </MotionLink>
          </div>
        </div>

        {/* Corner Accent Glows */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 group-hover:bg-purple-500/40 transition-all duration-1000" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 group-hover:bg-blue-500/40 transition-all duration-1000" />
      </div>

      {/* Outer Glow Ring */}
      <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-blue-600/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
    </motion.div>
  );
};

export default Card;

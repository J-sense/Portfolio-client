"use client";
import React from "react";
import { ArticleData } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";

const BlogCard = ({
  blog,
  index = 0,
}: {
  blog: ArticleData;
  index?: number;
}) => {
  const readingTime = Math.ceil(blog.content.split(" ").length / 200);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex flex-col rounded-3xl kail-glass transition-all duration-500 overflow-hidden isolate max-w-sm w-full mx-auto"
    >
      {/* Background Hover Accent */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(94, 100, 253, 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Image container */}
      <div className="p-4">
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/10">
          <Image
            src={blog.image || "/images/about-me.png"}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700 grayscale group-hover:grayscale-0"
            sizes="(max-width: 640px) 100vw, 33vw"
            unoptimized
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080E]/85 via-transparent to-transparent" />
          
          {/* Date Badge */}
          <div className="absolute bottom-4 left-4 z-20 px-3 py-1 kail-glass-pill rounded-full flex items-center gap-1.5">
            <Calendar size={10} className="text-[#BCED34]" />
            <time className="font-space text-[9px] font-bold text-[#F4F4FE] uppercase tracking-[0.18em]">
              {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              }) : "Recent"}
            </time>
          </div>
        </div>
      </div>

      {/* Content Box */}
      <div className="p-6 pt-2 flex-1 flex flex-col">
        {/* Reading stats */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-space text-[9px] font-bold uppercase tracking-[0.22em] text-[#BCED34]">
            Thought
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
          <div className="flex items-center gap-1 text-[#8E92BC]">
            <Clock size={10} />
            <span className="font-space text-[9px] font-bold uppercase tracking-wider">{readingTime} MIN READ</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-syne text-lg font-extrabold text-[#F4F4FE] group-hover:text-[#9996FE] transition-colors duration-300 tracking-tight uppercase leading-snug mb-3">
          {blog.title}
        </h3>

        {/* Description */}
        <p className="font-outfit text-[#8E92BC] text-xs leading-relaxed mb-6 line-clamp-3">
          {blog.content}
        </p>

        {/* Bottom CTA Link */}
        <div className="mt-auto pt-4 border-t border-white/10">
          <Link
            href={`/blogs/${blog._id}`}
            className="flex items-center gap-1.5 font-space text-[10px] font-bold uppercase tracking-[0.2em] text-[#F4F4FE] hover:text-[#BCED34] transition-colors group/link"
          >
            <span>Read Article</span>
            <ArrowUpRight size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;

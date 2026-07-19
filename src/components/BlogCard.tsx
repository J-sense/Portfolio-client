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
      className="group relative flex flex-col rounded-3xl border border-white/[0.05] bg-[#1b1918] transition-all duration-500 hover:border-[#f46c38]/30 overflow-hidden isolate shadow-lg max-w-sm w-full mx-auto"
    >
      {/* Background Hover Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,108,56,0.02)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

      {/* Image container */}
      <div className="p-4">
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/40">
          <Image
            src={blog.image || "/images/about-me.png"}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700 grayscale group-hover:grayscale-0"
            sizes="(max-width: 640px) 100vw, 33vw"
            unoptimized
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#151312]/80 via-transparent to-transparent" />
          
          {/* Date Badge */}
          <div className="absolute bottom-4 left-4 z-20 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-1.5">
            <Calendar size={10} className="text-[#f46c38]" />
            <time className="text-[9px] font-bold text-white/90 uppercase tracking-wider">
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
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#f46c38]">
            Thought
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="flex items-center gap-1 text-[#998f8f]">
            <Clock size={10} />
            <span className="text-[9px] font-bold uppercase tracking-wider">{readingTime} MIN READ</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-black text-white group-hover:text-[#f46c38] transition-colors duration-300 tracking-tight uppercase leading-snug mb-3">
          {blog.title}
        </h3>

        {/* Description */}
        <p className="text-[#998f8f] text-xs leading-relaxed mb-6 line-clamp-3">
          {blog.content}
        </p>

        {/* Bottom CTA Link */}
        <div className="mt-auto pt-4 border-t border-white/[0.05]">
          <Link
            href={`/blogs/${blog._id}`}
            className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-[#f46c38] transition-colors group/link"
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

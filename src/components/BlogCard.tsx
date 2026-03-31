"use client";

import { ArticleData } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowUpRight,
  Bookmark,
  Share2,
  Heart,
} from "lucide-react";
import { useState } from "react";

const BlogCard = ({
  blog,
  index = 0,
}: {
  blog: ArticleData;
  index?: number;
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = ({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    setMouseX(clientX - left);
    setMouseY(clientY - top);
  };

  // Calculate reading time
  const readingTime = Math.ceil(blog.content.split(" ").length / 200);

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group relative w-full max-w-md mx-auto my-28"
    >
      {/* Main Container */}
      <div className="relative">
        {/* Floating Image Container */}
        <div className="relative z-20 -mb-16 px-4 sm:px-6">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/20 group-hover:shadow-purple-900/40 transition-shadow duration-500">
            {/* Image */}
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Floating Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="p-2.5 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 hover:bg-black/80 transition-colors"
              >
                <Bookmark
                  size={16}
                  className={`${isBookmarked ? "fill-purple-400 text-purple-400" : "text-white"} transition-colors`}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 hover:bg-black/80 transition-colors"
              >
                <Share2 size={16} className="text-white" />
              </motion.button>
            </div>

            {/* Category Badge */}
            <div className="absolute bottom-4 left-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-md opacity-70" />
                <div className="relative px-4 py-1.5 bg-black/90 backdrop-blur-xl rounded-full border border-white/20">
                  <span className="text-xs font-black text-white uppercase tracking-widest">
                    Featured
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Card - Overlaps Image */}
        <div
          className="relative pt-20 pb-8 px-6 sm:px-8 rounded-3xl bg-gradient-to-br from-black via-black/98 to-purple-950/30 border border-white/[0.08] backdrop-blur-xl overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(139, 92, 246, 0.1), transparent 50%)`,
          }}
        >
          {/* Mesh Background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
          </div>

          <div className="relative z-10 space-y-5">
            {/* Meta Row */}
            <div className="flex items-center gap-4 flex-wrap">
              {blog.createdAt && (
                <div className="flex items-center gap-2 text-white-100/60">
                  <Calendar size={14} className="text-purple-400" />
                  <time className="text-xs font-semibold">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
              )}

              <div className="w-1 h-1 rounded-full bg-white/20" />

              <div className="flex items-center gap-2 text-white-100/60">
                <Clock size={14} className="text-blue-400" />
                <span className="text-xs font-semibold">
                  {readingTime} min read
                </span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-blue-300 transition-all duration-500">
                {blog.title}
              </span>
            </h2>

            {/* Description */}
            <p className="text-white-100/70 text-sm sm:text-base leading-relaxed line-clamp-3 group-hover:text-white-100/90 transition-colors">
              {blog.content}
            </p>

            {/* Divider */}
            <div className="pt-2">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Bottom Row - Stats & CTA */}
            <div className="flex items-center justify-between gap-4 pt-2">
              {/* Engagement Stats */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-white-100/50">
                  <Heart size={16} className="text-pink-400" />
                  <span className="text-xs font-bold">234</span>
                </div>
                <div className="flex items-center gap-1.5 text-white-100/50">
                  <svg
                    className="w-4 h-4 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="text-xs font-bold">45</span>
                </div>
              </div>

              {/* Read Button */}
              <Link href={`/blogs/${blog._id}`} className="group/btn relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-30 group-hover/btn:opacity-60 transition duration-300" />

                <div className="relative flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-white text-sm transition-all duration-300 group-hover/btn:shadow-lg">
                  <span>Read</span>
                  <ArrowUpRight
                    size={16}
                    className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* Corner Glow */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/40 transition-all duration-1000" />
        </div>
      </div>

      {/* Outer Glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-blue-600/0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
    </motion.article>
  );
};

export default BlogCard;

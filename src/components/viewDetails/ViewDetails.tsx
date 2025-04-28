/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ViewDetails = ({ data }: { data: any }) => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-[#0e0e0e] border border-gray-800 rounded-2xl p-8 shadow-lg space-y-10"
      >
        {/* Project Image */}
        {data?.image && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden rounded-2xl"
          >
            <Image
              src={data.image || "/fallback.jpg"}
              alt="Project Image"
              width={1200}
              height={600}
              className="w-full h-72 md:h-96 object-cover object-center bg-black"
            />
          </motion.div>
        )}

        {/* Title and Live Link */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold tracking-tight"
          >
            {data?.title}
          </motion.h1>

          {data?.liveLink && (
            <Link
              href={data.liveLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-md"
              >
                View Live
              </motion.button>
            </Link>
          )}
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-300 text-lg leading-relaxed"
        >
          <h2 className="text-2xl font-semibold mb-3 text-violet-400">
            Description
          </h2>
          <p>{data?.description || "No description provided."}</p>
        </motion.div>

        {/* Technologies */}
        {data?.technologies?.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold text-violet-400">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-3">
              {data.technologies.map((tech: any, index: any) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="bg-gray-900 text-violet-300 py-1 px-4 rounded-full text-sm border border-gray-700 transition-all duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Dates */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row md:justify-between text-sm text-gray-500 pt-6 border-t border-gray-800"
        >
          <p>
            Created:{" "}
            {data?.createdAt
              ? new Date(data.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            Updated:{" "}
            {data?.updatedAt
              ? new Date(data.updatedAt).toLocaleDateString()
              : "N/A"}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ViewDetails;

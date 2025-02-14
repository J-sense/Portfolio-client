"use client";

import { motion } from "framer-motion";
import { ABOUT } from "@/lib/data";

const About = () => {
  return (
    <section
      id="about"
      className="relative py-20 px-6 bg-gradient-to-b  text-white text-center"
    >
      <div className="container mx-auto max-w-5xl text-center">
        <motion.h2
          className="text-5xl md:text-7xl lg:text-6xl font-extrabold mb-10 relative inline-block"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#CBACF9] to-purple-500">
            About Me
          </span>
        </motion.h2>

        <motion.div
          className="relative mx-4 mb-20 p-6 rounded-xl border bg-zinc-900/80 shadow-lg hover:bg-zinc-950 transition-colors"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            {ABOUT}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

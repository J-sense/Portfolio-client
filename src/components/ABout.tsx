"use client";

import { motion } from "framer-motion";
import { ABOUT } from "@/lib/data";

const About = () => {
  return (
    <section
      id="about"
      className="relative py-10 md:px-16  bg-black text-white overflow-hidden"
    >
      <div className="container mx-auto md:max-w-6xl text-center">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold mb-16 relative inline-block"
          initial={{ opacity: 0, y: -60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#CBACF9] to-purple-500">
            About Me
          </span>
        </motion.h2>

        <motion.div
          className="relative mx-auto p-3 sm:p-10  md:p-12 rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(155,81,224,0.25)] hover:shadow-[0_8px_64px_0_rgba(155,81,224,0.35)] transition-all duration-700 ease-out max-w-4xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-lg md:text-xl text-gray-300 text-center leading-relaxed tracking-wide"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {ABOUT}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

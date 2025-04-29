"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import profile from "@/assets/profile.jpg";
import MagicButton from "@/components/MagicButton";
import { Coffee } from "lucide-react";

const page = () => {
  return (
    <section className="bg-black text-white py-12 px-6 md:px-16 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row items-center">
        {/* Profile Image with animation and glowing effect */}
        <motion.div
          className="mb-8 md:mb-0 md:w-1/3 flex justify-center"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="glow-effect"
            whileHover={{
              boxShadow: "0 0 25px rgba(238, 130, 238, 1)", // Violet glowing effect when hovered
            }}
            transition={{
              boxShadow: { duration: 0.6, ease: "easeInOut" },
            }}
          >
            <Image
              src={profile}
              alt="Profile"
              className="object-cover rounded-lg shadow-lg"
              height={500}
              width={350}
            />
          </motion.div>
        </motion.div>

        {/* Text Content with animation */}
        <motion.div
          className="md:w-2/3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-[#CBACF9] to-purple-500 text-2xl font-bold">
            About Me
          </h1>
          <p className=" text-gray-300 mb-6 text-base">
            Hi! I’m{" "}
            <span className="text-lime-400 text-lg">Najmul Hassan Jishan</span>,
            a passionate software developer with a focus on frontend
            technologies like React.js, Next.js, and the MERN stack. I started
            my coding journey in late 2022 and since then, I’ve been dedicated
            to building and learning web development to create seamless and
            scalable web applications.
          </p>

          <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-[#CBACF9] to-purple-500 text-2xl font-bold">
            Academic Background
          </h2>
          <p className="text-gray-400 mb-4 text-base">
            I completed my <strong>SSC</strong> in 2020 from Captain Shamsul
            Huda High School with a GPA of 4.61. Currently, I am pursuing a{" "}
            <strong>Diploma in Computer Science</strong> from Feni Polytechnic
            Institute, expecting to graduate in 2025 with a CGPA of 3.61/4. My
            academic journey has been deeply intertwined with my passion for
            technology, and I aim to leverage these skills to contribute to
            innovative software solutions.
          </p>

          <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-[#CBACF9] to-purple-500 text-2xl font-bold">
            My Coding Journey
          </h2>
          <p className="text-gray-400 text-base">
            I began coding at the end of 2022, diving into the world of frontend
            development. Since then, I’ve worked on several projects, including
            building functional web applications with React, Next.js, and
            Tailwind CSS. I’m always eager to learn new technologies and improve
            my skills to build impactful solutions.
          </p>

          {/* Contact Button with animation */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link href={"/contact"}>
              <MagicButton
                title="Buy me a coffee"
                icon={<Coffee />}
                position="right"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default page;

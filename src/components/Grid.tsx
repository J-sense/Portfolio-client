"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { cn } from "@/lib/utils";

const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      {
        name: "JavaScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "React",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Next.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "Tailwind CSS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      {
        name: "Node.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Express.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      },
      {
        name: "Mongoose",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "Firebase",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      },
    ],
  },
  {
    title: "Architecture & Tools",
    skills: [
      {
        name: "Redux Toolkit",
        logo: "https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo-title-dark.png",
      },
      {
        name: "RTK Query",
        logo: "https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo-title-dark.png",
      },
      {
        name: "NextAuth.js",
        logo: "https://next-auth.js.org/img/logo/logo-sm.png",
      },
      { name: "JWT", logo: "https://jwt.io/img/pic_logo.svg" },
    ],
  },
];

const otherTools = [
  { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Prisma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
];

const SkillSection = () => {
  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 w-full h-full bg-grid-white/[0.03] bg-grid-small-white/[0.02] -z-10" />
      <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
           className="text-center mb-20"
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Technical <span className="text-purple">Skillset</span>
          </h2>
          <p className="text-white-100 max-w-2xl mx-auto text-lg">
            A comprehensive overview of my technological stack and expertise in modern web development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="group p-8 rounded-3xl border border-white/[0.1] bg-black-200 backdrop-blur-xl hover:border-purple/50 transition-all duration-500"
            >
              <h3 className="text-2xl font-bold mb-8 text-white group-hover:text-purple transition-colors">
                {category.title}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="flex flex-col items-center p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] transition-colors"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-12 h-12 mb-3 relative">
                      <Image
                        src={skill.logo}
                        alt={skill.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium text-white-200 text-center">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scrolling Tools Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-12"
        >
          <h3 className="text-xl font-semibold mb-8 text-center text-white-100 opacity-50 uppercase tracking-widest">
            Other Tools & Technologies
          </h3>
          <InfiniteMovingCards
            items={otherTools}
            direction="right"
            speed="slow"
          />
        </motion.div>
      </div>

      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-purple/10 blur-[120px] rounded-full -z-10" />
    </section>
  );
};

export default SkillSection;

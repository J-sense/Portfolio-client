"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const skills = [
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
  { name: "Redux Toolkit", logo: "https://redux-toolkit.js.org/img/redux.svg" },
  {
    name: "RTK Query",
    logo: "https://redux-toolkit.js.org/img/query-logo.svg",
  },
  {
    name: "NextAuth.js",
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
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
  { name: "JWT", logo: "https://jwt.io/img/pic_logo.svg" },
];

const SkillSection = () => {
  return (
    <section className="py-12 text-white">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-6xl font-bold mb-12 text-[#CBACF9]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Skills
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center p-6 rounded-xl border shadow-lg bg-zinc-900/80 hover:bg-zinc-950 transition-colors"
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={skill.logo}
                alt={skill.name}
                width={64}
                height={64}
                className="w-16 h-16"
              />
              <span className="text-lg mt-3 font-medium">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillSection;

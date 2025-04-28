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

  {
    name: "Redux Toolkit",
    logo: "https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo-title-dark.png",
  }, // fixed RTK logo
  {
    name: "RTK Query",
    logo: "https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo-title-dark.png",
  }, // using same redux logo
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
  {
    name: "Firebase",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  }, // added Firebase
];

const SkillSection = () => {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto text-center px-6">
        <motion.h2
          className="text-5xl md:text-7xl font-extrabold mb-14 relative inline-block"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-600">
            Skills
          </span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="relative p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-lg shadow-md hover:shadow-violet-500/40 transition-all hover:border-violet-500 group overflow-hidden"
              whileHover={{ scale: 1.08 }}
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {/* Smooth hover glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />

              <Image
                src={skill.logo}
                alt={skill.name}
                width={64}
                height={64}
                className="w-16 h-16 mb-4 object-contain"
              />
              <span className="text-lg font-semibold">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillSection;

"use client";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa"; // Using FaBars from the correct icon source
// import { LINKS } from "@/lib/data";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link"; // Correct Link from Next.js
const user = true; // This can be any condition based on whether the user exists or not

export const LINKS = [
  { id: "projects", name: "projects" },
  { id: "about", name: "about" },
  ...(user ? [{ id: "dashboard", name: "dashboard" }] : []), // Conditionally add 'experience' link
  { id: "contact", name: "Contact" },
];

console.log(LINKS);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const containerVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: "50%" },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <nav className="fixed top-0 right-0 z-30 p-4">
        <button onClick={toggleMenu} className="rounded-md p-2">
          {isOpen ? (
            <FaTimes className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="fixed inset-0 z-20 flex flex-col items-center justify-center bg-black text-white"
          >
            <ul className="space-y-6 text-2xl">
              {LINKS.map((link) => (
                <motion.li key={link.id} variants={linkVariants}>
                  <Link
                    href={`${link.id}`} // Use 'href' with anchor link for Next.js routing
                    onClick={toggleMenu}
                    className="text-3xl font-semibold uppercase tracking-wide hover:text-lime-300 lg:text-9xl"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;

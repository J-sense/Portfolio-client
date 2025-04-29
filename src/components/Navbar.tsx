"use client";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa"; // Using FaBars from the correct icon source
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link"; // Correct Link from Next.js
import { TUser } from "@/types/types";

const Navbar = ({ session }: { session: TUser }) => {
  const user = session?.user; // This can be any condition based on whether the user exists or not

  // Define links with absolute paths
  const LINKS = [
    { id: "/", name: "Home" },
    { id: "/projects", name: "Projects" },
    { id: "/about", name: "About" },
    ...(user ? [{ id: "/dashboard", name: "Dashboard" }] : []),
    ...(!user ? [{ id: "/login", name: "Login" }] : []),
    { id: "/blogs", name: "Blogs" },
    { id: "/contact", name: "Contact" },
  ];

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
                    href={link.id} // Absolute paths ensure correct routing
                    onClick={toggleMenu}
                    className="text-xl font-semibold uppercase tracking-wide hover:text-lime-300 lg:text-6xl"
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

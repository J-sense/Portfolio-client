"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FolderGit,
  User,
  BookOpen,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const LINKS = [
    { id: "/", name: "Home", icon: Home },
    { id: "/projects", name: "Projects", icon: FolderGit },
    { id: "/about", name: "About", icon: User },
    { id: "/blogs", name: "Blogs", icon: BookOpen },
    { id: "/contact", name: "Contact", icon: MessageSquare },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* DESKTOP TOP NAVBAR */}
      <header className="hidden md:block fixed top-0 inset-x-0 z-50 transition-all duration-300 py-4 px-4">
        <nav
          className={`mx-auto max-w-5xl rounded-full transition-all duration-500 kail-glass ${
            scrolled
              ? "py-2.5 px-6 bg-white/[0.18]"
              : "py-3 px-6"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group select-none">
              <span className="font-syne text-xl font-extrabold tracking-[0.08em] text-white transition-all group-hover:text-[#BCED34]">
                JISHAN<span className="text-[#BCED34]">.</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="flex items-center gap-6">
              {LINKS.slice(0, 4).map((link) => {
                const isActive = pathname === link.id;
                return (
                  <Link
                    key={link.id}
                    href={link.id}
                    className={`font-space text-xs font-bold tracking-[0.18em] uppercase transition-colors relative py-1 ${
                      isActive
                        ? "text-white"
                        : "text-white/75 hover:text-white"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#BCED34] rounded-full shadow-[0_0_12px_#BCED34]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Let's Talk CTA */}
            <div>
              <Link
                href="/contact"
                className={`font-space inline-flex items-center gap-2 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] rounded-full border transition-all duration-300 group ${
                  pathname === "/contact"
                    ? "bg-[#BCED34] text-[#1728F4] border-transparent shadow-[0_0_20px_rgba(188,237,52,0.45)]"
                    : "bg-[#BCED34] text-[#1728F4] border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_20px_rgba(23,40,244,0.28)] hover:bg-white hover:text-[#1728F4]"
                }`}
              >
                Let&apos;s Talk
                <ArrowUpRight
                  size={12}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* MOBILE BOTTOM APP-STYLE TAB BAR */}
      <div className="block md:hidden fixed bottom-6 inset-x-4 z-50 flex justify-center pointer-events-none">
        <nav className="w-full max-w-md kail-glass rounded-[2rem] p-2 flex items-center justify-around pointer-events-auto">
          {LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.id;

            return (
              <Link
                key={link.id}
                href={link.id}
                className="relative flex flex-col items-center justify-center py-2 px-3 w-16 transition-all rounded-2xl"
              >
                {/* Active Backdrop Bubble */}
                {isActive && (
                  <motion.span
                    layoutId="mobileActiveTab"
                    className="absolute inset-0 bg-[#1728F4]/80 border border-white/30 rounded-2xl -z-10 shadow-lg"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}

                {/* Tab Icon */}
                <Icon
                  size={18}
                  className={`transition-colors duration-300 ${
                    isActive ? "text-[#BCED34]" : "text-white/80"
                  }`}
                />

                {/* Tab Label */}
                <span
                  className={`font-space text-[8px] font-bold uppercase tracking-wider mt-1.5 transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/80"
                  }`}
                >
                  {link.name}
                </span>

                {/* Active Top Accent Dot */}
                {isActive && (
                  <span className="absolute -top-1 w-1 h-1 rounded-full bg-[#BCED34]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* MOBILE TOP STATUS BAR HEADER */}
      <header className="block md:hidden fixed top-0 inset-x-0 z-40 kail-glass border-b border-white/20 py-4 px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 select-none">
          <span className="font-syne text-lg font-extrabold tracking-[0.08em] text-white">
            JISHAN<span className="text-[#BCED34]">.</span>
          </span>
        </Link>
        <span className="font-space text-[9px] font-bold text-[#BCED34] uppercase tracking-[0.2em] kail-glass-pill px-2.5 py-0.5 rounded-full">
          SYS_ONLINE
        </span>
      </header>
    </>
  );
};

export default Navbar;

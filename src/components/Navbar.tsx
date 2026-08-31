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
  ArrowUpRight
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
          className={`mx-auto max-w-5xl rounded-full transition-all duration-500 border ${
            scrolled 
              ? "bg-[#121212]/90 backdrop-blur-xl border-[#334155] shadow-2xl shadow-black/80 py-2.5 px-6" 
              : "bg-[#121212]/75 backdrop-blur-md border-[#334155]/60 shadow-lg py-3 px-6"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group select-none">
              <span className="text-xl font-black tracking-[0.15em] text-[#e2e8f0] transition-all group-hover:text-[#38bdf8]">
                JISHAN<span className="text-[#38bdf8]">.</span>
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
                    className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors relative py-1 ${
                      isActive ? "text-[#38bdf8]" : "text-[#94a3b8] hover:text-[#e2e8f0]"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#38bdf8] rounded-full shadow-[0_0_8px_#38bdf8]"
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
                className={`inline-flex items-center gap-2 px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border transition-all duration-300 group ${
                  pathname === "/contact"
                    ? "bg-[#38bdf8] text-[#050505] border-transparent shadow-lg shadow-[#38bdf8]/20"
                    : "bg-[#e2e8f0] text-[#050505] border-transparent hover:bg-[#38bdf8] hover:text-[#050505]"
                }`}
              >
                Let&apos;s Talk
                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* MOBILE BOTTOM APP-STYLE TAB BAR */}
      <div className="block md:hidden fixed bottom-6 inset-x-4 z-50 flex justify-center pointer-events-none">
        <nav className="w-full max-w-md bg-[#121212]/95 backdrop-blur-2xl border border-[#334155] rounded-[2rem] shadow-2xl p-2 flex items-center justify-around pointer-events-auto">
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
                    className="absolute inset-0 bg-[#38bdf8] rounded-2xl -z-10 shadow-lg shadow-[#38bdf8]/30"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}

                {/* Tab Icon */}
                <Icon 
                  size={18} 
                  className={`transition-colors duration-300 ${
                    isActive ? "text-[#050505]" : "text-[#94a3b8]"
                  }`} 
                />

                {/* Tab Label */}
                <span 
                  className={`text-[8px] font-black uppercase tracking-wider mt-1.5 transition-colors duration-300 ${
                    isActive ? "text-[#050505]" : "text-[#94a3b8]"
                  }`}
                >
                  {link.name}
                </span>

                {/* Active Top Accent Dot */}
                {isActive && (
                  <span className="absolute -top-1 w-1 h-1 rounded-full bg-[#050505]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* MOBILE TOP STATUS BAR HEADER */}
      <header className="block md:hidden fixed top-0 inset-x-0 z-40 bg-[#050505]/80 backdrop-blur-md border-b border-[#334155]/50 py-4 px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 select-none">
          <span className="text-lg font-black tracking-[0.15em] text-[#e2e8f0]">
            JISHAN<span className="text-[#38bdf8]">.</span>
          </span>
        </Link>
        <span className="text-[9px] font-bold text-[#38bdf8] uppercase tracking-[0.2em] border border-[#38bdf8]/30 bg-[#38bdf8]/10 px-2.5 py-0.5 rounded-full">
          SYS_ONLINE
        </span>
      </header>
    </>
  );
};

export default Navbar;

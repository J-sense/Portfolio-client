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
      {/* DESKTOP TOP NAVBAR: Hidden on mobile (md:block) */}
      <header className="hidden md:block fixed top-0 inset-x-0 z-50 transition-all duration-300 py-4 px-4">
        <nav
          className={`mx-auto max-w-5xl rounded-full transition-all duration-500 border ${
            scrolled 
              ? "bg-[#1b1918]/85 backdrop-blur-xl border-white/[0.08] shadow-2xl shadow-black/40 py-2.5 px-6" 
              : "bg-[#1b1918]/70 backdrop-blur-md border-white/[0.05] shadow-lg py-3 px-6"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group select-none">
              <span className="text-xl font-black tracking-[0.15em] text-white transition-all group-hover:text-[#c5ff41]">
                JISHAN<span className="text-[#c5ff41]">.</span>
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
                      isActive ? "text-[#c5ff41]" : "text-[#998f8f] hover:text-white"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5ff41] rounded-full"
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
                    ? "bg-[#c5ff41] text-black border-transparent"
                    : "bg-white text-black border-transparent hover:bg-transparent hover:text-white hover:border-white/20"
                }`}
              >
                Let&apos;s Talk
                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* MOBILE BOTTOM APP-STYLE TAB BAR: Visible only on mobile (block md:hidden) */}
      <div className="block md:hidden fixed bottom-6 inset-x-4 z-50 flex justify-center pointer-events-none">
        <nav className="w-full max-w-md bg-[#1b1918]/85 backdrop-blur-2xl border border-white/[0.08] rounded-[2rem] shadow-2xl p-2 flex items-center justify-around pointer-events-auto">
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
                    className="absolute inset-0 bg-[#c5ff41] rounded-2xl -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}

                {/* Tab Icon */}
                <Icon 
                  size={18} 
                  className={`transition-colors duration-300 ${
                    isActive ? "text-black" : "text-[#998f8f]"
                  }`} 
                />

                {/* Tab Label */}
                <span 
                  className={`text-[8px] font-black uppercase tracking-wider mt-1.5 transition-colors duration-300 ${
                    isActive ? "text-black" : "text-[#998f8f]"
                  }`}
                >
                  {link.name}
                </span>

                {/* Active Top Accent Dot */}
                {isActive && (
                  <span className="absolute -top-1 w-1 h-1 rounded-full bg-black" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* MOBILE TOP STATUS BAR HEADER (Logo representation at the top) */}
      <header className="block md:hidden fixed top-0 inset-x-0 z-40 bg-[#151312]/60 backdrop-blur-md border-b border-white/[0.03] py-4 px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 select-none">
          <span className="text-lg font-black tracking-[0.15em] text-white">
            JISHAN<span className="text-[#c5ff41]">.</span>
          </span>
        </Link>
        <span className="text-[9px] font-bold text-[#c5ff41] uppercase tracking-[0.2em] border border-[#c5ff41]/20 bg-[#c5ff41]/5 px-2.5 py-0.5 rounded-full">
          SYS_ONLINE
        </span>
      </header>
    </>
  );
};

export default Navbar;

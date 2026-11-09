"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FolderGit,
  Sparkles,
  Briefcase,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const NAV_ITEMS = [
    { id: "home", name: "Home", href: "/#", icon: Home },
    { id: "skills", name: "Skills", href: "/#skills", icon: Sparkles },
    { id: "projects", name: "Projects", href: "/#projects", icon: FolderGit },
    { id: "experience", name: "Journey", href: "/#experience", icon: Briefcase },
    { id: "wild-ideas", name: "Ideas", href: "/#wild-ideas", icon: Lightbulb },
  ];

  // Scrollspy: detect which section is currently in view when on the homepage
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (pathname !== "/") return;

      const sections = ["home", "skills", "projects", "experience", "wild-ideas"];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        if (id === "home") {
          if (window.scrollY < 300) {
            setActiveSection("home");
            break;
          }
        } else {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      if (!targetId) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveSection("home");
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          setActiveSection(targetId);
        }
      }
    }
  };

  return (
    <>
      {/* ── DESKTOP TOP FLOATING PILL NAVBAR ── */}
      <header className="hidden md:block fixed top-0 inset-x-0 z-50 transition-all duration-300 py-3.5 px-4 pointer-events-none">
        <nav
          className={`mx-auto max-w-4xl rounded-full transition-all duration-300 pointer-events-auto flex items-center justify-between border border-white/20 bg-white/[0.08] backdrop-blur-md ${
            scrolled ? "py-2 px-4 bg-white/[0.14]" : "py-2 px-5"
          }`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={(e) => scrollToSection(e, "/#")}
            className="flex items-center gap-1.5 group select-none pl-1"
          >
            <span className="font-syne text-base font-extrabold tracking-[0.06em] text-white transition-colors group-hover:text-[#BCED34]">
              JISHAN<span className="text-[#BCED34]">.</span>
            </span>
          </Link>

          {/* Desktop Nav Button Segmented Pill List (Raw, crisp, clean) */}
          <div className="flex items-center p-1 rounded-full bg-white/[0.06] border border-white/15 gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === "/" ? activeSection === item.id : pathname === item.href;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`relative px-4 py-1.5 rounded-full font-space text-[11px] font-bold tracking-[0.12em] uppercase transition-colors duration-150 select-none ${
                    isActive ? "text-[#10127A]" : "text-white/70 hover:text-white"
                  }`}
                >
                  {/* Raw Solid Active Button Pill — No Blur, No Outer Glow */}
                  {isActive && (
                    <motion.span
                      layoutId="desktopActiveNavPill"
                      className="absolute inset-0 bg-[#BCED34] rounded-full -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 38,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Clean Raw Action Button */}
          <div>
            <Link
              href="#contact"
              onClick={(e) => scrollToSection(e, "/#contact")}
              className="font-space inline-flex items-center gap-1.5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] rounded-full bg-white/10 hover:bg-[#BCED34] hover:text-[#10127A] border border-white/25 hover:border-[#BCED34] text-white transition-colors select-none"
            >
              <span>Contact</span>
              <ArrowUpRight
                size={12}
                className="text-[#BCED34] group-hover:text-[#10127A]"
              />
            </Link>
          </div>
        </nav>
      </header>

      {/* ── MOBILE BOTTOM FLOATING BUTTON BAR ── */}
      <div className="block md:hidden fixed bottom-5 inset-x-3 z-50 flex justify-center pointer-events-none">
        <nav className="w-full max-w-md rounded-full p-1.5 flex items-center justify-between pointer-events-auto border border-white/20 bg-black/40 backdrop-blur-md">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === "/" ? activeSection === item.id : pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`relative flex-1 flex flex-col items-center justify-center py-1.5 px-1 transition-colors rounded-full select-none ${
                  isActive ? "text-[#10127A]" : "text-white/70"
                }`}
              >
                {/* Raw Solid Active Pill */}
                {isActive && (
                  <motion.span
                    layoutId="mobileActiveNavPill"
                    className="absolute inset-0 bg-[#BCED34] rounded-full -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 38,
                    }}
                  />
                )}

                <Icon size={15} className="relative z-10" />
                <span className="font-space text-[8px] font-bold uppercase tracking-wider mt-0.5 relative z-10">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ── MOBILE TOP STATUS HEADER ── */}
      <header className="block md:hidden fixed top-0 inset-x-0 z-40 bg-black/40 backdrop-blur-md border-b border-white/15 py-3 px-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5 select-none">
          <span className="font-syne text-base font-extrabold tracking-[0.08em] text-white">
            JISHAN<span className="text-[#BCED34]">.</span>
          </span>
        </Link>
        <Link
          href="#contact"
          onClick={(e) => scrollToSection(e, "/#contact")}
          className="spec-mono-label-lime !text-[10px] px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#BCED34]"
        >
          CONTACT
        </Link>
      </header>
    </>
  );
}

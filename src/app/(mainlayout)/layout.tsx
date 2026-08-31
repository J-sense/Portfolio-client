"use client";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import FloatingContact from "@/components/FloatingContact";
import Image from "next/image";
import { Github, Linkedin, Facebook } from "lucide-react";

const CommonLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="antialiased bg-[#050505] text-[#e2e8f0] min-h-screen">
      <Navbar />
      <FloatingContact />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* LEFT: Persistent Sticky Profile Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-6 w-full">
            {/* Portrait notch card */}
            <div className="relative w-full aspect-[4/5] rounded-3xl border border-[#334155] bg-[#121212] p-4 overflow-hidden group shadow-2xl">
              {/* Corner brackets */}
              <div className="absolute -top-1 -left-1 w-5 h-5 border-t border-l border-[#38bdf8] z-20" />
              <div className="absolute -top-1 -right-1 w-5 h-5 border-t border-r border-[#38bdf8] z-20" />
              <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b border-l border-[#38bdf8] z-20" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b border-r border-[#38bdf8] z-20" />

              {/* Portrait image overlay */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/50">
                <Image
                  src="/images/my-profile-card.png"
                  alt="Najmul Hassan Jishan"
                  fill
                  className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700"
                  priority
                />
              </div>

              {/* Glowing ice blue aura */}
              <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12)_0%,transparent_60%)] blur-[40px] pointer-events-none -z-10 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Profile Info details */}
            <div className="rounded-3xl border border-[#334155] bg-[#121212] p-6 text-left shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                <span className="text-[9px] font-black tracking-[0.2em] text-[#38bdf8] uppercase">
                  FULL STACK ARCHITECT
                </span>
              </div>

              <h2 className="text-xl font-black uppercase tracking-tight text-[#e2e8f0] mb-1">
                JISHAN HASSAN
              </h2>
              <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest mb-4">
                Software Engineer
              </p>

              <p className="text-[#94a3b8] text-[11px] leading-relaxed mb-6">
                Specializing in full-stack web architectures, dynamic user interfaces, and high-performance applications.
              </p>

              {/* Social icons */}
              <div className="flex gap-2.5 pt-4 border-t border-[#334155]">
                <a
                  href="https://github.com/j-sense/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#334155] bg-[#050505] flex items-center justify-center text-[#94a3b8] hover:text-[#38bdf8] hover:border-[#38bdf8]/50 transition-all"
                >
                  <Github size={14} />
                </a>
                <a
                  href="https://www.linkedin.com/in/najmul-hasan-222b43273/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#334155] bg-[#050505] flex items-center justify-center text-[#94a3b8] hover:text-[#38bdf8] hover:border-[#38bdf8]/50 transition-all"
                >
                  <Linkedin size={14} />
                </a>
                <a
                  href="https://www.facebook.com/mdnajmulhasan.jishan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#334155] bg-[#050505] flex items-center justify-center text-[#94a3b8] hover:text-[#38bdf8] hover:border-[#38bdf8]/50 transition-all"
                >
                  <Facebook size={14} />
                </a>
              </div>
            </div>

            {/* Status Pill */}

          </aside>

          {/* RIGHT: Scrollable Content Column */}
          <main className="lg:col-span-8 w-full flex flex-col gap-12">
            <div className="min-h-[70vh] flex flex-col gap-16">
              {children}
            </div>

            {/* Persistent clipboard contact & footer */}
            <Contact />
          </main>

        </div>
      </div>
    </div>
  );
};

export default CommonLayout;

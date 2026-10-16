"use client";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import FloatingContact from "@/components/FloatingContact";
import Image from "next/image";
import { Github, Linkedin, Facebook } from "lucide-react";

// Shared glossy dark surface (inset depth, no outer glow)
const glossyCard =
  "bg-gradient-to-b from-[#1A1F29] to-[#0C0F14] border border-[#334155] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-3px_6px_rgba(0,0,0,0.45)]";

// Round social button
const socialBtn =
  "w-10 h-10 rounded-full flex items-center justify-center select-none text-white " +
  "bg-gradient-to-b from-[#007AFF] to-[#0B60BD] border border-[#007AFF4D] " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(0,0,0,0.35)] " +
  "transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

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
            {/* Portrait card */}
            <div
              className={`relative w-full aspect-[4/5] rounded-3xl overflow-hidden group ${glossyCard}`}
            >
              <Image
                src="/images/my-profile-card.png"
                alt="Najmul Hassan Jishan"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                priority
              />

              {/* Soft bottom fade */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

              {/* Inset edge above the image */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-3px_6px_rgba(0,0,0,0.35)]" />
            </div>

            {/* Profile Info details */}
            <div className={`rounded-3xl p-6 text-left ${glossyCard}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.2em] text-[#38bdf8] uppercase">
                  FULL STACK ARCHITECT
                </span>
              </div>

              <h2 className="text-xl font-black uppercase tracking-tight text-[#e2e8f0] mb-1 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                JISHAN HASSAN
              </h2>
              <p className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-widest mb-4">
                Software Engineer
              </p>

              <p className="text-[#94a3b8] text-xs leading-relaxed mb-6">
                Specializing in full-stack web architectures, dynamic user interfaces, and high-performance applications.
              </p>

              {/* Social icons */}
              <div className="flex gap-3 pt-4 border-t border-[#334155]">
                <a
                  href="https://github.com/j-sense/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={socialBtn}
                >
                  <Github size={16} className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]" />
                </a>
                <a
                  href="https://www.linkedin.com/in/najmul-hasan-222b43273/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={socialBtn}
                >
                  <Linkedin size={16} className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]" />
                </a>
                <a
                  href="https://www.facebook.com/mdnajmulhasan.jishan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className={socialBtn}
                >
                  <Facebook size={16} className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]" />
                </a>
              </div>
            </div>
          </aside>

          {/* RIGHT: Scrollable Content Column */}
          <main className="lg:col-span-8 w-full flex flex-col gap-12">
            <div className="min-h-[70vh] flex flex-col gap-16">{children}</div>

            {/* Persistent clipboard contact & footer */}
            <Contact />
          </main>
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
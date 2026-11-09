"use client";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import FloatingContact from "@/components/FloatingContact";
import Image from "next/image";
import { Github, Linkedin, Facebook } from "lucide-react";

// Shared Studio KAIL frosted glass surface
const glassyCard = "kail-glass";

// Round Studio KAIL glassy social button
const socialBtn =
  "w-10 h-10 rounded-full flex items-center justify-center select-none text-white " +
  "kail-glass-pill hover:bg-[#BCED34] hover:text-[#1728F4] hover:border-[#BCED34] " +
  "transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BCED34]";

const CommonLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="relative antialiased text-white min-h-screen">
      {/* Studio KAIL Full-Viewport Fixed Gradient Canvas */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 10% 15%, #1728F4 0%, transparent 52%), radial-gradient(circle at 88% 12%, #9996FE 0%, transparent 48%), radial-gradient(circle at 50% 45%, #5E64FD 0%, transparent 58%), radial-gradient(circle at 85% 85%, #575DA7 0%, transparent 55%), radial-gradient(circle at 14% 88%, #9996FE 0%, transparent 52%), radial-gradient(circle at 68% 28%, rgba(188, 237, 52, 0.22) 0%, transparent 38%), linear-gradient(135deg, #1728F4 0%, #5E64FD 36%, #575DA7 70%, #9996FE 100%)",
        }}
      >
        <div className="absolute -top-24 left-[6%] w-[480px] h-[480px] rounded-full bg-[#1728F4]/50 blur-[130px]" />
        <div className="absolute top-[30%] right-[4%] w-[440px] h-[440px] rounded-full bg-[#9996FE]/45 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[25%] w-[420px] h-[420px] rounded-full bg-[#CDCDE7]/35 blur-[130px]" />
        <div className="absolute top-[15%] left-[42%] w-[280px] h-[280px] rounded-full bg-[#BCED34]/20 blur-[110px]" />
      </div>

      <Navbar />
      <FloatingContact />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Fixed / Persistent Sticky Profile Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start flex flex-col gap-5 w-full">
            {/* Portrait card */}
            <div
              className={`relative w-full aspect-[4/4.1] max-h-[320px] rounded-3xl overflow-hidden group ${glassyCard}`}
            >
              <Image
                src="/images/my-profile-card.png"
                alt="Najmul Hassan Jishan"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover object-top transition-all duration-700 group-hover:scale-[1.03]"
                priority
              />

              {/* Soft indigo-periwinkle bottom fade */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#283094]/75 to-transparent pointer-events-none" />

              {/* Specular glass rim */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_6px_rgba(23,40,244,0.25)]" />
            </div>

            {/* Profile Info details */}
            <div className={`rounded-3xl p-5 sm:p-6 text-left ${glassyCard}`}>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-[#BCED34] animate-pulse shadow-[0_0_8px_#BCED34]" />
                <span className="font-space text-[10px] font-bold tracking-[0.22em] text-[#BCED34] uppercase">
                  FULL STACK ARCHITECT
                </span>
              </div>

              <h2 className="font-syne text-2xl font-extrabold uppercase tracking-tight text-white mb-1">
                JISHAN HASSAN
              </h2>
              <p className="font-space text-[11px] font-semibold text-[#E2E4FA] uppercase tracking-[0.18em] mb-3">
                Software Engineer
              </p>

              <p className="font-outfit text-white/85 text-xs leading-relaxed mb-5">
                Specializing in full-stack web architectures, dynamic user interfaces, and high-performance applications.
              </p>

              {/* Social icons */}
              <div className="flex gap-3 pt-4 border-t border-white/20">
                <a
                  href="https://github.com/j-sense/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={socialBtn}
                >
                  <Github size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/najmul-hasan-222b43273/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={socialBtn}
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="https://www.facebook.com/mdnajmulhasan.jishan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className={socialBtn}
                >
                  <Facebook size={16} />
                </a>
              </div>
            </div>
          </aside>

          {/* RIGHT: Scrollable Content Column */}
          <main className="lg:col-span-8 w-full flex flex-col gap-12 min-w-0">
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

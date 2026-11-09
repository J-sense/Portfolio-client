"use client";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import FloatingContact from "@/components/FloatingContact";
import InteractiveSidebar from "@/components/InteractiveSidebar";

const CommonLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="relative antialiased text-white min-h-screen">
      {/* Figma Build Spec 1.2 — Page background + Decor layers (Dot Grid, Blob Lime, Blob Lavender) */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
        style={{
          background:
            "radial-gradient(900px 700px at 100% 100%, rgba(160, 160, 250, 0.40) 0%, rgba(160, 160, 250, 0) 100%), radial-gradient(900px 600px at 0% 0%, rgba(14, 20, 230, 0.55) 0%, rgba(14, 20, 230, 0) 100%), linear-gradient(105deg, #1B2BF4 0%, #4350F7 30%, #7A7EF1 62%, #8C8AEE 100%)",
        }}
      >
        {/* Decor/Dot Grid: 34 px grid of 1 px white dots at 28%, layer opacity 55%, masked to ellipse at 72% / 28% */}
        <div
          className="absolute inset-0 opacity-55"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255, 255, 255, 0.28) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
            maskImage:
              "radial-gradient(ellipse 65% 55% at 72% 28%, #000 0%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 65% 55% at 72% 28%, #000 0%, transparent 100%)",
          }}
        />
        {/* Decor/Blob Lime: ellipse 440 × 440 at x 806, y 54, fill #BCED34 at 16%, blur 90 */}
        <div
          className="absolute w-[440px] h-[440px] rounded-full blur-[90px]"
          style={{
            left: "56%",
            top: "54px",
            backgroundColor: "rgba(188, 237, 52, 0.16)",
          }}
        />
        {/* Decor/Blob Lavender: ellipse 560 × 560 at x -144, y 52%, fill rgb(140,150,255) at 40%, blur 90 */}
        <div
          className="absolute w-[560px] h-[560px] rounded-full blur-[90px]"
          style={{
            left: "-144px",
            top: "52%",
            backgroundColor: "rgba(140, 150, 255, 0.40)",
          }}
        />
      </div>

      <Navbar />
      <FloatingContact />

      {/* Figma Build Spec 1.6 Spacing and Grid: 2 columns, left 370 (sidebar), gap 64, right 778 */}
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-7 pt-24 pb-32 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[370px_minmax(0,778px)] justify-center gap-12 lg:gap-16 items-start">
          {/* LEFT: Fixed / Interactive Sticky Profile Sidebar */}
          <InteractiveSidebar />

          {/* RIGHT: 778px Scrollable Content Column */}
          <main className="w-full max-w-[778px] flex flex-col min-w-0">
            <div className="flex flex-col">{children}</div>

            {/* Persistent clipboard contact & footer */}
            <Contact />
          </main>
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;

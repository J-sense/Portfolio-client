import type { Metadata } from "next";
import {
  Sora,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  DM_Sans,
} from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const bricolage = Sora({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jishan's Portfolio",
  description: "Frontend Focused Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        cz-shortcut-listen="true"
        className={`${sora.variable} ${bricolage.variable} ${plusJakarta.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased text-white selection:bg-[#BCED34] selection:text-[#1728F4]`}
      >
        {children}
      </body>
    </html>
  );

}

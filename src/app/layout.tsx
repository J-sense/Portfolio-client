import type { Metadata } from "next";
import { Poppins, Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jishan's Portfolio",
  description: "MERN Stack Architect Portfolio inspired by Sawad template design",
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
        className={`${poppins.variable} ${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-[#151312] text-white`}
      >
        {children}
      </body>
    </html>
  );
}

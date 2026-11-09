"use client";
import React, { useState } from "react";
import { CONTACT } from "@/lib/data";
import { motion } from "framer-motion";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export const SOCIAL_MEDIA_LINKS = [
  {
    name: "FACEBOOK",
    href: "https://www.facebook.com/mdnajmulhasan.jishan/",
    icon: <FaFacebook />,
  },
  {
    name: "GITHUB",
    href: "https://github.com/j-sense/",
    icon: <FaGithub />,
  },
  {
    name: "LINKEDIN",
    href: "https://www.linkedin.com/in/najmul-hasan-222b43273/",
    icon: <FaLinkedin />,
  },
  {
    name: "X",
    href: "https://x.com/",
    icon: <FaInstagram />,
  },
];

// Figma Build Spec 3.7 — Component CopyCard (GlassCard, padding 34, vertical)
const CopyCard = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      onClick={handleCopy}
      className="kail-glass p-6 sm:p-[34px] flex flex-col items-start text-left cursor-pointer select-none"
    >
      {/* label in Mono/Label Muted (E-MAIL ADDRESS / PHONE NUMBER) */}
      <span className="spec-mono-label-muted">
        {label}
      </span>

      {/* value in Display/H3 at 29 (margin 12 / 16, break anywhere) */}
      <h3 className="spec-display-h3 !text-[22px] sm:!text-[29px] mt-[12px] mb-[16px] break-all">
        {value}
      </h3>

      {/* hint in Mono/Label Lime reading CLICK TO COPY / COPIED ✓ */}
      <span className="spec-mono-label-lime mt-auto">
        {copied ? "COPIED ✓" : "CLICK TO COPY"}
      </span>
    </motion.div>
  );
};

const Contact = () => {
  return (
    <section
      id="contact-info"
      className="relative bg-transparent pointer-events-auto"
    >
      {/* 3.7 Direct Channels Header (no right slot): Tag: COMMUNICATION. Title: DIRECT / CHANNELS, 20 px below tag block */}
      <div className="flex flex-col items-start text-left">
        <div className="spec-section-tag">
          <span className="w-[7px] h-[7px] rounded-full bg-[#BCED34] shadow-[0_0_10px_#BCED34]" />
          <span>COMMUNICATION</span>
        </div>

        <h2 className="spec-display-h2 mt-[18px] mb-[20px]">
          DIRECT
          <br />
          <span className="text-[#BCED34]">CHANNELS</span>
        </h2>

        {/* Paragraph in Body/Lead */}
        <p className="spec-body-lead">
          {CONTACT.text}
        </p>
      </div>

      {/* Cards: 2 columns, gap 14, margin top 30 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px] mt-[30px]">
        <CopyCard label="E-MAIL ADDRESS" value={CONTACT.email} />
        <CopyCard label="PHONE NUMBER" value={CONTACT.phone} />
      </div>

      {/* Social row: margin top 24, gap 8. SocialPill: height 40, padding 0 / 17, radius 99 */}
      <div className="flex flex-wrap items-center gap-[8px] mt-[24px]">
        {SOCIAL_MEDIA_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-[40px] px-[17px] rounded-full
              bg-white/[0.10] border border-white/[0.34]
              font-space font-semibold text-[12.5px] tracking-[0.10em] uppercase text-white
              hover:bg-[#BCED34] hover:border-[#BCED34] hover:text-[#10127A]
              transition-all duration-200 select-none"
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* 3.8 Footer: Top border 1 px Line/Soft, padding top 22, margin top 40 */}
      <footer className="border-t border-white/[0.20] pt-[22px] mt-[40px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <span className="spec-mono-label !text-white/70">
          &copy; {new Date().getFullYear()} JISHAN HASSAN. ALL RIGHTS RESERVED.
        </span>
        <span className="spec-mono-label !text-white/70">
          JISHAN. — SYS_ONLINE
        </span>
      </footer>
    </section>
  );
};

export default Contact;

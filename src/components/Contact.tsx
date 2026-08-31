"use client";
import React, { useState } from "react";
import { CONTACT } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Mail, Phone, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const SOCIAL_MEDIA_LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/mdnajmulhasan.jishan/",
    icon: <FaFacebook />,
    color: "hover:text-[#1877F2] hover:border-[#1877F2]/50",
  },
  {
    name: "GitHub",
    href: "https://github.com/j-sense/",
    icon: <FaGithub />,
    color: "hover:text-white hover:border-white/50",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/najmul-hasan-222b43273/",
    icon: <FaLinkedin />,
    color: "hover:text-[#0A66C2] hover:border-[#0A66C2]/50",
  },
  {
    name: "Instagram",
    href: "https://x.com/",
    icon: <FaInstagram />,
    color: "hover:text-[#E4405F] hover:border-[#E4405F]/50",
  },
];

const ContactCard = ({ 
  icon: Icon, 
  label, 
  value
}: { 
  icon: any; 
  label: string; 
  value: string; 
  color?: "lime" | "orange";
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const accentColor = "text-[#38bdf8]";
  const borderHoverClass = "group-hover:border-[#38bdf8]/60";
  const bgAccent = "bg-[#38bdf8]/10 border-[#38bdf8]/30 text-[#38bdf8]";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative group cursor-pointer w-full"
      onClick={handleCopy}
    >
      <div className="absolute -inset-px bg-gradient-to-r from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className={cn(
        "relative p-6 sm:p-8 rounded-3xl border border-[#334155] bg-[#121212] flex flex-col items-center text-center transition-all duration-500 shrink-0 h-full shadow-2xl",
        borderHoverClass
      )}>
        <div className={cn("w-12 h-12 mb-4 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105 border", bgAccent)}>
          <Icon size={20} />
        </div>
        
        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#94a3b8] mb-1">
          {label}
        </span>
        
        <h3 className={cn(
          "text-base font-bold text-[#e2e8f0] mb-4 tracking-tight transition-colors duration-300 break-all px-2 uppercase",
          copied ? accentColor : "group-hover:text-white"
        )}>
          {value}
        </h3>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050505] border border-[#334155] text-[9px] font-bold text-[#94a3b8] uppercase tracking-widest transition-all duration-300 hover:bg-[#121212] mt-auto">
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className={cn("flex items-center gap-1.5", accentColor)}
              >
                <Check size={10} />
                Copied!
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1.5"
              >
                <Copy size={10} />
                Click to Copy
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const Contact = () => {
  return (
    <section id="contact-info" className="relative py-16 px-4 bg-transparent overflow-hidden pointer-events-auto border-t border-[#334155]/60 mt-12">
      <div className="container mx-auto max-w-4xl relative z-10 p-0">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-[#38bdf8] uppercase mb-4 border border-[#38bdf8]/30 bg-[#38bdf8]/10 px-3 py-1 rounded-full w-fit">
            COMMUNICATION
          </span>
          
          <h2 className="text-3xl sm:text-4xl font-black text-[#e2e8f0] mb-4 tracking-tighter uppercase">
            DIRECT <span className="text-[#94a3b8]">CHANNELS</span>
          </h2>
          
          <p className="text-[#94a3b8] text-xs max-w-md opacity-90 leading-relaxed">
            {CONTACT.text}
          </p>
        </div>

        {/* Contact Interaction Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-xl mx-auto items-stretch">
          <ContactCard 
            icon={Mail} 
            label="E-mail Address" 
            value={CONTACT.email} 
            color="lime"
          />
          <ContactCard 
            icon={Phone} 
            label="Phone Number" 
            value={CONTACT.phone} 
            color="orange"
          />
        </div>

        {/* Social Connect Sector */}
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {SOCIAL_MEDIA_LINKS.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -3 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={cn(
                  "p-3 text-lg border border-[#334155] bg-[#121212] rounded-xl transition-all duration-300 text-[#94a3b8]"
                )}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <p className="mt-16 text-center text-white/20 text-[9px] font-black uppercase tracking-[0.4em]">
          &copy; {new Date().getFullYear()} JISHAN HASSAN. ALL RIGHTS RESERVED.
        </p>
      </div>
    </section>
  );
};

export default Contact;

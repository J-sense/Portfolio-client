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
    color: "hover:text-[#9996FE] hover:border-[#5E64FD]/50",
  },
  {
    name: "GitHub",
    href: "https://github.com/j-sense/",
    icon: <FaGithub />,
    color: "hover:text-[#F4F4FE] hover:border-white/40",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/najmul-hasan-222b43273/",
    icon: <FaLinkedin />,
    color: "hover:text-[#9996FE] hover:border-[#5E64FD]/50",
  },
  {
    name: "Instagram",
    href: "https://x.com/",
    icon: <FaInstagram />,
    color: "hover:text-[#BCED34] hover:border-[#BCED34]/50",
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
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative group cursor-pointer w-full"
      onClick={handleCopy}
    >
      <div className="absolute -inset-px bg-gradient-to-r from-[#5E64FD]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-6 sm:p-8 rounded-3xl kail-glass flex flex-col items-center text-center transition-all duration-500 shrink-0 h-full">
        <div className="w-12 h-12 mb-4 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105 bg-white/15 border border-white/25 text-white group-hover:text-[#BCED34] group-hover:border-[#BCED34]/50">
          <Icon size={20} />
        </div>
        
        <span className="font-space text-[9px] font-bold uppercase tracking-[0.25em] text-white/80 mb-1">
          {label}
        </span>
        
        <h3 className={cn(
          "font-syne text-base font-extrabold text-white mb-4 tracking-tight transition-colors duration-300 break-all px-2 uppercase",
          copied ? "text-[#BCED34]" : "group-hover:text-[#BCED34]"
        )}>
          {value}
        </h3>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full kail-glass-pill font-space text-[9px] font-bold text-white/85 uppercase tracking-[0.2em] transition-all duration-300 group-hover:text-white mt-auto">
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1.5 text-[#BCED34]"
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
    <section id="contact-info" className="relative py-16 px-4 bg-transparent overflow-hidden pointer-events-auto border-t border-white/20 mt-12">
      <div className="container mx-auto max-w-4xl relative z-10 p-0">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="inline-flex items-center gap-2 font-space text-[10px] font-bold tracking-[0.28em] text-[#BCED34] uppercase mb-4 kail-glass-pill px-3.5 py-1.5 rounded-full w-fit">
            COMMUNICATION
          </span>
          
          <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight uppercase">
            DIRECT <span className="text-[#BCED34]">CHANNELS</span>
          </h2>
          
          <p className="font-outfit text-white/85 text-xs max-w-md leading-relaxed">
            {CONTACT.text}
          </p>
        </div>

        {/* Contact Interaction Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-xl mx-auto items-stretch">
          <ContactCard 
            icon={Mail} 
            label="E-mail Address" 
            value={CONTACT.email} 
          />
          <ContactCard 
            icon={Phone} 
            label="Phone Number" 
            value={CONTACT.phone} 
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
                className="p-3 text-lg kail-glass-pill rounded-xl transition-all duration-300 text-white hover:text-[#BCED34] hover:border-[#BCED34]/50 hover:bg-white/20"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <p className="mt-16 text-center font-space text-white/70 text-[9px] font-bold uppercase tracking-[0.35em]">
          &copy; {new Date().getFullYear()} JISHAN HASSAN. ALL RIGHTS RESERVED.
        </p>
      </div>
    </section>
  );
};

export default Contact;

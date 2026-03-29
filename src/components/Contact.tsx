"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative group cursor-pointer w-full"
      onClick={handleCopy}
    >
      <div className="absolute -inset-px bg-gradient-to-r from-purple/20 to-blue-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-8 px-10 rounded-3xl border border-white/[0.08] bg-black-200 backdrop-blur-xl flex flex-col items-center text-center transition-all duration-500 group-hover:border-purple/40 shrink-0 h-full">
        <div className="w-16 h-16 mb-6 rounded-2xl bg-purple/10 border border-purple/20 flex items-center justify-center text-purple transition-transform duration-500 group-hover:scale-110">
          <Icon size={32} />
        </div>
        
        <span className="text-xs font-black uppercase tracking-[0.3em] text-white-200 mb-2 opacity-50">
          {label}
        </span>
        
        <h3 className={cn(
          "text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight transition-colors duration-300 break-all px-2",
          copied ? "text-purple" : "group-hover:text-purple"
        )}>
          {value}
        </h3>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-bold text-white-100 uppercase tracking-widest transition-all duration-300 hover:bg-white/[0.1] mt-auto">
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-2 text-purple"
              >
                <Check size={14} />
                Copied!
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-2"
              >
                <Copy size={14} />
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
    <section id="contact" className="relative py-40 px-6 sm:px-12 lg:px-24 bg-black overflow-hidden pointer-events-auto">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 w-full h-full bg-grid-white/[0.02] bg-grid-small-white/[0.01] -z-10" />
      <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] -z-10" />

      <div className="container mx-auto max-w-6xl relative z-10 p-0">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 mb-8 rounded-full bg-purple/10 border border-purple/20 text-xs font-black tracking-[0.4em] text-purple uppercase"
          >
            Get In Touch
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-[0.9] lg:leading-[0.9]"
          >
            Ready to <span className="text-purple">start</span> a <br className="hidden md:block" /> project together?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white-100 text-lg md:text-2xl max-w-2xl opacity-60 leading-relaxed font-medium"
          >
            {CONTACT.text}
          </motion.p>
        </div>

        {/* Contact Interaction Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-4xl mx-auto items-stretch">
          <ContactCard 
            icon={Mail} 
            label="E-mail" 
            value={CONTACT.email} 
          />
          <ContactCard 
            icon={Phone} 
            label="Phone" 
            value={CONTACT.phone} 
          />
        </div>

        {/* Social Connect Sector */}
        <div className="flex flex-col items-center">
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-purple/50 to-transparent mb-12" />
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            {SOCIAL_MEDIA_LINKS.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5, scale: 1.1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={cn(
                  "p-5 text-3xl border border-white/[0.1] bg-white/[0.03] backdrop-blur-md rounded-2xl transition-all duration-300 text-white-100",
                  link.color
                )}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <motion.p
          className="mt-32 text-center text-white-100/30 text-xs font-bold uppercase tracking-[0.5em]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          &copy; {new Date().getFullYear()} J-Sense Portfolio. All rights reserved.
        </motion.p>
      </div>

      {/* Finishing Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple/10 blur-[200px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple/5 to-transparent -z-10" />
    </section>
  );
};

export default Contact;

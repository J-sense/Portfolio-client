"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import { MessageCircle, X } from "lucide-react";

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socials = [
    {
      name: "WhatsApp",
      href: "https://wa.me/8801405438389",
      icon: <FaWhatsapp size={18} />,
      color: "bg-[#25D366] text-white hover:shadow-[#25D366]/40",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/mdnajmulhasan.jishan/",
      icon: <FaFacebookF size={16} />,
      color: "bg-[#1877F2] text-white hover:shadow-[#1877F2]/40",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/",
      icon: <FaInstagram size={18} />,
      color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white hover:shadow-[#ee2a7b]/40",
    },
  ];

  return (
    <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40 flex flex-col items-end gap-3 select-none pointer-events-none">
      
      {/* Expanded Social Icons */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col gap-2.5 mb-1 pointer-events-auto">
            {socials.map((item, idx) => (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                title={item.name}
                initial={{ opacity: 0, y: 15, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.8 }}
                transition={{ duration: 0.25, delay: (socials.length - 1 - idx) * 0.05 }}
                className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 ${item.color}`}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Trigger FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto relative w-12 h-12 rounded-full bg-[#c5ff41] hover:bg-[#b0e637] text-black shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none"
      >
        {/* Pulsing Aura Glow when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#c5ff41]/40 animate-ping opacity-75" />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
          </motion.div>
        </AnimatePresence>
      </button>
    </div>
  );
};

export default FloatingContact;

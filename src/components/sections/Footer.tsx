"use client";

import { motion } from "framer-motion";
import { EASE_APPLE } from "@/lib/motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE_APPLE }}
      className="relative py-16 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto w-full select-none flex flex-col items-center justify-center gap-6 text-xs text-[#9E9E9E]"
    >
      {/* Starry sky border divider - Glowing electric wire drawing a Pikachu tail line */}
      <div className="w-full flex items-center justify-center relative mb-4">
        {/* Left segment line */}
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#FFD93D]/30" />
        
        {/* Glowing electric Pikachu tail connector SVG */}
        <div className="mx-4 relative flex items-center justify-center">
          <svg 
            className="w-14 h-8 text-[#FFD93D] filter drop-shadow-[0_0_8px_rgba(255,217,61,0.5)] hover:scale-110 transition-transform cursor-pointer"
            viewBox="0 0 100 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Draw electric lightning path leading to center */}
            <path d="M 0,25 L 25,25 L 18,15 L 45,15 L 35,5 L 75,5 L 55,45 L 85,45 L 100,25" />
          </svg>
          
          {/* Small electric particle ring */}
          <div className="absolute inset-0 w-full h-full rounded-full border border-dashed border-[#FFD93D]/10 animate-[spin_20s_linear_infinite] scale-125 pointer-events-none" />
        </div>
        
        {/* Right segment line */}
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#FFD93D]/30" />
      </div>

      {/* Details info */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 pt-2">
        <div>
          &copy; {currentYear} <span className="text-white font-semibold">Shivani Tiwari</span>. 
          All rights reserved. Deployed with Vercel.
        </div>
        
        <div className="flex gap-6 font-mono text-[10px]">
          <a href="#" className="hover:text-[#FFD93D] transition-colors duration-300 relative group">
            Privacy Policy
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#FFD93D] transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#" className="hover:text-[#FFD93D] transition-colors duration-300 relative group">
            Terms of Service
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#FFD93D] transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}

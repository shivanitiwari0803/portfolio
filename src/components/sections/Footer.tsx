"use client";

import { motion } from "framer-motion";
import { EASE_APPLE } from "@/lib/motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE_APPLE }}
      className="py-12 px-8 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto w-full select-none border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted font-medium"
    >
      <div>&copy; {new Date().getFullYear()} Shivani Tiwari. All rights reserved.</div>
      <div className="flex gap-6">
        <a href="#" className="hover:text-white transition-colors duration-300 relative group">
          Privacy Policy
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
        </a>
        <a href="#" className="hover:text-white transition-colors duration-300 relative group">
          Terms of Service
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
        </a>
      </div>
    </motion.footer>
  );
}

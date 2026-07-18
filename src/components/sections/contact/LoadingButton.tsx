"use client";

import React from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface LoadingButtonProps {
  type: "button" | "submit";
  disabled: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
  onClick?: () => void;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  type,
  disabled,
  isSubmitting,
  isSubmitted,
  onClick,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`relative overflow-hidden w-full py-4.5 rounded-2xl border text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer font-mono flex items-center justify-center gap-2.5 min-h-[52px] group
        ${
          isSubmitted
            ? "border-[#A5FF6A]/30 bg-[#A5FF6A]/5 text-[#A5FF6A] hover:bg-[#A5FF6A]/10 shadow-[0_0_15px_rgba(165,255,106,0.15)]"
            : isSubmitting
            ? "border-white/5 bg-white/[0.01] text-white/40 cursor-not-allowed"
            : "border-white/10 hover:border-[#FFD93D]/30 hover:bg-[#FFD93D]/5 text-white hover:text-[#FFD93D] disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:bg-transparent disabled:hover:text-white disabled:cursor-not-allowed"
        }
      `}
    >
      {/* Loading slide glow overlay */}
      {isSubmitting && (
        <motion.div
          initial={{ left: "-100%" }}
          animate={{ left: "100%" }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#FFD93D]/10 to-transparent pointer-events-none"
        />
      )}

      {isSubmitted ? (
        <motion.span
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-2"
        >
          <CheckCircle2 size={14} className="text-[#A5FF6A] shrink-0" />
          Message Sent
        </motion.span>
      ) : isSubmitting ? (
        <span className="flex items-center gap-2.5">
          <Loader2 size={14} className="animate-spin text-[#FFD93D] shrink-0" />
          Sending...
        </span>
      ) : (
        <>
          <Send size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
          Send Message
        </>
      )}
    </button>
  );
};

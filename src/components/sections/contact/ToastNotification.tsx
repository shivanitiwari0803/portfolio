"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[999999] flex flex-col gap-3 max-w-sm w-full px-4 sm:px-0 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className={`pointer-events-auto p-4 rounded-2xl border flex items-start gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 ${
              toast.type === "success"
                ? "bg-[#171717]/95 border-[#A5FF6A]/20 text-white"
                : toast.type === "error"
                ? "bg-[#171717]/95 border-red-500/20 text-white"
                : "bg-[#171717]/95 border-[#4FC3F7]/20 text-white"
            }`}
          >
            {/* Icon */}
            <div className="shrink-0 mt-0.5">
              {toast.type === "success" && <CheckCircle size={16} className="text-[#A5FF6A]" />}
              {toast.type === "error" && <AlertTriangle size={16} className="text-red-500" />}
              {toast.type === "info" && <Info size={16} className="text-[#4FC3F7]" />}
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-xs font-mono tracking-wide leading-relaxed font-light">
                {toast.message}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => onRemove(toast.id)}
              className="shrink-0 text-white/30 hover:text-white transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

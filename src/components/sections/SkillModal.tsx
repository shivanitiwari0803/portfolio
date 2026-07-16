"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Folder } from "lucide-react";
import { SkillItem } from "@/data/skillsData";

interface SkillModalProps {
  skill: SkillItem | null;
  onClose: () => void;
}

export const SkillModal: React.FC<SkillModalProps> = ({ skill, onClose }) => {
  return (
    <AnimatePresence>
      {skill && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4 select-none">
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="relative w-full max-w-md bg-[#080808] border border-white/5 rounded-3xl p-6 shadow-[0_24px_50px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Subtle internal gold gradient glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FFD84D]/5 rounded-full blur-[45px] pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-[#FFD84D] border border-white/5">
                  <span className="w-5 h-5 flex items-center justify-center">
                    {skill.icon}
                  </span>
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white font-display tracking-tight">
                    {skill.name}
                  </h3>
                  <span className="text-[9px] font-mono text-[#FFD84D]/80 uppercase tracking-widest bg-[#FFD84D]/5 border border-[#FFD84D]/10 rounded-full px-2 py-0.5 mt-0.5 inline-block">
                    {skill.category}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/5 border border-white/5 text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-5">
              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] text-white/35 font-mono uppercase tracking-widest flex items-center gap-1">
                  <Sparkles size={9} className="text-[#FFD84D]" />
                  Technology overview
                </span>
                <p className="text-sm text-white/80 leading-relaxed font-light">
                  {skill.description}
                </p>
              </div>

              {/* Projects Used In */}
              {skill.projects.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] text-white/35 font-mono uppercase tracking-widest flex items-center gap-1">
                    <Folder size={9} className="text-[#FFD84D]" />
                    Used In Projects
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {skill.projects.map((proj) => (
                      <span
                        key={proj}
                        className="text-xs text-white/95 bg-white/[0.03] border border-white/5 px-3.5 py-1.5 rounded-full font-mono font-medium"
                      >
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Details */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] text-white/35 font-mono uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[#FFD84D] inline-block" />
                  Practical experience
                </span>
                <p className="text-sm text-white/70 leading-relaxed font-light border-l border-white/5 pl-3.5 italic">
                  {skill.experience}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default SkillModal;

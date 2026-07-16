"use client";

import React, { useCallback } from "react";
import { SkillItem } from "@/data/skillsData";

interface PhysicsCardProps {
  skill: SkillItem;
  cardRef: (el: HTMLDivElement | null) => void;
  onDoubleClick: (skill: SkillItem) => void;
  isMobile: boolean;
}

export const PhysicsCard: React.FC<PhysicsCardProps> = React.memo(({
  skill,
  cardRef,
  onDoubleClick,
  isMobile,
}) => {
  const handleDoubleClick = useCallback(() => {
    onDoubleClick(skill);
  }, [skill, onDoubleClick]);

  return (
    <div
      ref={cardRef}
      onDoubleClick={handleDoubleClick}
      className="physics-card absolute select-none transform-gpu z-20"
      style={{
        touchAction: "none",
      }}
    >
      <div 
        className={`inner-card flex flex-col items-center justify-center text-center border border-white/5 bg-[#0a0a0a]/90 hover:border-[#FFD84D]/35 transition-all duration-300 transform-gpu relative ${
          isMobile 
            ? "w-20 h-20 p-2.5 gap-1.5 rounded-2xl" 
            : "w-28 h-28 p-3.5 gap-2 rounded-3xl"
        }`}
        style={{
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.75)",
          "--glow-color": "#FFD84D",
        } as React.CSSProperties}
      >
        {/* Subtle gold experience dot indicator at the top right */}
        <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#FFD84D] shadow-[0_0_6px_#FFD84D]" />

        {/* Technology logo wrapper */}
        <span className="icon-wrapper flex items-center justify-center text-white/80 transition-colors duration-300">
          {skill.icon}
        </span>
        
        {/* Skill label below logo */}
        <span className="font-sans font-bold text-[10px] sm:text-xs text-white/95 leading-tight tracking-wide font-medium mt-1">
          {skill.name}
        </span>
      </div>

      <style jsx global>{`
        .physics-card {
          transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity;
        }

        .inner-card {
          cursor: grab;
        }

        .inner-card:hover {
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.85), 0 0 16px rgba(255, 216, 77, 0.15) !important;
          border-color: rgba(255, 216, 77, 0.38) !important;
        }

        .inner-card svg {
          width: ${isMobile ? "1.625rem" : "2.25rem"};
          height: ${isMobile ? "1.625rem" : "2.25rem"};
          fill: currentColor;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .inner-card:hover svg {
          transform: scale(1.08);
          color: #FFD84D;
        }

        /* Dragging state styled via class injection on tick */
        .dragging-active .inner-card {
          cursor: grabbing !important;
          transform: scale(1.05) rotate(1.5deg);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 216, 77, 0.25) !important;
          border-color: rgba(255, 216, 77, 0.5) !important;
        }
      `}</style>
    </div>
  );
});

PhysicsCard.displayName = "PhysicsCard";

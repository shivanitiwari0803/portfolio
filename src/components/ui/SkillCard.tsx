import React, { useCallback } from "react";
import { SkillItem } from "@/data/skillsData";

interface SkillCardProps {
  skill: SkillItem;
  cardRef: (el: HTMLDivElement | null) => void;
  onDoubleClick: (id: string) => void;
  isMobile: boolean;
}

export const SkillCard: React.FC<SkillCardProps> = React.memo(({
  skill,
  cardRef,
  onDoubleClick,
  isMobile,
}) => {
  // Stable double click handler
  const handleDoubleClick = useCallback(() => {
    onDoubleClick(skill.id);
  }, [skill.id, onDoubleClick]);

  return (
    <div
      ref={cardRef}
      onDoubleClick={handleDoubleClick}
      className="outer-card absolute select-none transform-gpu"
    >
      <div 
        className={`inner-card flex flex-col items-center justify-center text-center rounded-[1.25rem] border border-black/5 shadow-lg transition-all duration-300 transform-gpu ${
          isMobile 
            ? "w-20 h-20 p-2 gap-1.5" 
            : "w-24 h-24 p-3.5 gap-2 hover:scale-[1.06]"
        }`}
        style={{
          backgroundColor: skill.bgColor,
          color: skill.textColor,
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
          "--glow-color": skill.bgColor,
        } as React.CSSProperties}
      >
        <span className="icon-wrapper flex items-center justify-center transition-transform duration-300">
          {skill.icon}
        </span>
        <span className="font-sans font-extrabold tracking-tight text-[10px] md:text-xs leading-none">
          {skill.name}
        </span>
      </div>

      {/* CSS styling for decoupled layout, premium hover, and smooth filter transitions */}
      <style jsx global>{`
        .outer-card {
          touch-action: none;
          transition: opacity 0.32s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .inner-card {
          cursor: grab;
        }
        
        .inner-card:hover {
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45), 0 0 20px var(--glow-color);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .inner-card svg {
          width: ${isMobile ? "1.75rem" : "2.125rem"};
          height: ${isMobile ? "1.75rem" : "2.125rem"};
          transition: transform 0.3s ease;
        }

        .inner-card:hover svg {
          transform: scale(1.08);
        }

        /* Styling state when card is actively grabbed */
        .dragging-active .inner-card {
          cursor: grabbing !important;
          transform: scale(1.05) rotate(2deg);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.55), 0 0 25px var(--glow-color);
          border-color: rgba(255, 255, 255, 0.25) !important;
        }
      `}</style>
    </div>
  );
});

SkillCard.displayName = "SkillCard";

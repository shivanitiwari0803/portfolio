"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface ScrollIndicatorProps {
  onClick: (e: React.MouseEvent) => void;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ onClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite breathing opacity for the entire indicator
      gsap.to(containerRef.current, {
        opacity: 0.45,
        duration: 2.0,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Endless vertical drift loop for the inner dot
      gsap.to(dotRef.current, {
        y: 8,
        opacity: 0.2,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-30 select-none opacity-80"
    >
      {/* Apple capsule outline */}
      <div className="w-5.5 h-9.5 border-[1.5px] border-white/25 rounded-full flex justify-center p-[4px]">
        <div
          ref={dotRef}
          className="w-1.2 h-2.2 bg-[#FFD84D] rounded-full"
        />
      </div>
      <span className="text-[9px] text-white/40 tracking-widest font-mono uppercase">
        Scroll
      </span>
    </div>
  );
};

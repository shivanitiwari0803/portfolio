"use client";

import React, { useEffect, useState } from "react";

interface ScrollIndicatorProps {
  onClick: (e: React.MouseEvent) => void;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ onClick }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate rotation based on scroll displacement
      const scrollY = window.scrollY;
      setRotation(scrollY * 0.45); // Adjust multiplier for spin speed
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      onClick={onClick}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 cursor-pointer z-30 select-none group"
    >
      {/* Rotating Pokéball */}
      <div 
        className="w-10 h-10 flex items-center justify-center transition-transform duration-100 ease-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <svg 
          className="w-8 h-8 drop-shadow-[0_0_8px_rgba(255,217,61,0.25)] group-hover:drop-shadow-[0_0_12px_rgba(255,217,61,0.5)] transition-all duration-300"
          viewBox="0 0 100 100"
        >
          {/* Top Half - Red */}
          <path d="M 50,10 A 40 40 0 0 1 90,50 L 78,50 A 28 28 0 0 0 50,22 Z" fill="#E53935" />
          
          {/* Bottom Half - White */}
          <path d="M 90,50 A 40 40 0 0 1 50,90 L 50,78 A 28 28 0 0 0 78,50 Z" fill="#ECEFF1" />
          
          {/* Outlines & Inner Band */}
          <circle cx="50" cy="50" r="40" stroke="#171717" strokeWidth="4" fill="none" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="#171717" strokeWidth="5" />
          
          {/* Outer Center Button */}
          <circle cx="50" cy="50" r="12" fill="#171717" />
          
          {/* Inner Center Button (Pikachu Yellow) */}
          <circle cx="50" cy="50" r="6" fill="#FFD93D" stroke="#FFFFFF" strokeWidth="1" />
        </svg>
      </div>
      
      <span className="text-[9px] text-white/40 tracking-[0.25em] font-mono uppercase group-hover:text-[#FFD93D] transition-colors duration-300">
        Scroll
      </span>
    </div>
  );
};

export default ScrollIndicator;


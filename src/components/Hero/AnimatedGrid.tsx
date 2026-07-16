"use client";

import React from "react";

export const AnimatedGrid: React.FC = () => {
  return (
    <>
      <div 
        className="absolute inset-0 w-[115%] h-full pointer-events-none opacity-[0.025] z-10 bg-grid animate-grid-drift" 
        style={{
          left: "-7%",
        }}
      />
      <style jsx>{`
        .bg-grid {
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 1px, transparent 1px);
          background-size: 80px 80px;
          
          /* Fade out grids near margins for high-end cinematic vignettes */
          mask-image: radial-gradient(ellipse 70% 55% at 50% 50%, black 40%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 70% 55% at 50% 50%, black 40%, transparent 100%);
        }
        
        @keyframes gridDrift {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-40px, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        
        .animate-grid-drift {
          animation: gridDrift 30s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
    </>
  );
};

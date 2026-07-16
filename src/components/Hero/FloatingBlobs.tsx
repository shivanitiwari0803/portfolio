"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const FloatingBlobs: React.FC = () => {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Yellow Accent Blob - Diagonal yoyo drift
      gsap.to(blob1Ref.current, {
        x: "80",
        y: "-60",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Soft White Blob - Vertical yoyo drift
      gsap.to(blob2Ref.current, {
        x: "-40",
        y: "90",
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.5,
      });

      // Soft Gray Blob - Slow opposite diagonal yoyo drift
      gsap.to(blob3Ref.current, {
        x: "50",
        y: "40",
        duration: 24,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.0,
      });
    });

    return () => ctx.revert(); // Prevent animation memory leaks on component unmount
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none">
      {/* Accent color Blob */}
      <div
        ref={blob1Ref}
        className="absolute top-[10%] right-[10%] w-[480px] h-[480px] max-w-[50vw] max-h-[50vw] rounded-full bg-[#FFD84D]/4 blur-[130px] transform-gpu"
      />
      {/* Soft White Blob */}
      <div
        ref={blob2Ref}
        className="absolute bottom-[12%] left-[5%] w-[420px] h-[420px] max-w-[45vw] max-h-[45vw] rounded-full bg-white/[0.035] blur-[120px] transform-gpu"
      />
      {/* Soft Gray Blob */}
      <div
        ref={blob3Ref}
        className="absolute top-[35%] left-[35%] w-[380px] h-[380px] max-w-[40vw] max-h-[40vw] rounded-full bg-white/[0.02] blur-[110px] transform-gpu"
      />
    </div>
  );
};

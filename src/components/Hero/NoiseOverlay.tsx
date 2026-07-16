"use client";

import React, { useEffect, useRef } from "react";

export const NoiseOverlay: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate a procedural 128x128 film grain noise block once
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = ctx.createImageData(128, 128);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      // Gray noise value
      const val = Math.floor(Math.random() * 255);
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      // Ultra-soft opacity (around 4%)
      data[i + 3] = 10; 
    }

    ctx.putImageData(imgData, 0, 0);
    const dataUrl = canvas.toDataURL();

    const overlay = overlayRef.current;
    if (overlay) {
      overlay.style.backgroundImage = `url(${dataUrl})`;
    }
  }, []);

  return (
    <>
      <div
        ref={overlayRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.3] z-40 bg-repeat animate-noise"
        style={{
          backgroundSize: "128px 128px",
          mixBlendMode: "overlay",
        }}
      />
      <style jsx>{`
        @keyframes noiseShift {
          0% { background-position: 0px 0px; }
          20% { background-position: 20px 40px; }
          40% { background-position: -40px 20px; }
          60% { background-position: 50px -10px; }
          80% { background-position: -20px -30px; }
          100% { background-position: 0px 0px; }
        }
        
        .animate-noise {
          animation: noiseShift 0.7s steps(6) infinite;
          will-change: background-position;
        }
      `}</style>
    </>
  );
};

"use client";

import React from "react";
import { ParticleField } from "./ParticleField";
import { FloatingBlobs } from "./FloatingBlobs";
import { AnimatedGrid } from "./AnimatedGrid";
import { NoiseOverlay } from "./NoiseOverlay";

interface HeroBackgroundProps {
  particlesRef: React.RefObject<HTMLDivElement | null>;
  blobsRef: React.RefObject<HTMLDivElement | null>;
  gridRef: React.RefObject<HTMLDivElement | null>;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  particlesRef,
  blobsRef,
  gridRef,
}) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#050505] z-0 select-none">
      {/* Layer 3: Grid */}
      <div ref={gridRef} className="absolute inset-0 w-full h-full z-10 transform-gpu">
        <AnimatedGrid />
      </div>

      {/* Layer 2: Floating Blobs */}
      <div ref={blobsRef} className="absolute inset-0 w-full h-full z-0 transform-gpu">
        <FloatingBlobs />
      </div>

      {/* Layer 1 & 5: Particle Canvas (Space dust and accent dots) */}
      <div ref={particlesRef} className="absolute inset-0 w-full h-full z-20 transform-gpu">
        <ParticleField />
      </div>

      {/* Layer 4: Film Grain Noise Overlay (keeps absolute top level of background) */}
      <NoiseOverlay />
    </div>
  );
};

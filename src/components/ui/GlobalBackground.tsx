"use client";

import React from "react";
import { ParticleField } from "../Hero/ParticleField";
import { FloatingBlobs } from "../Hero/FloatingBlobs";
import { AnimatedGrid } from "../Hero/AnimatedGrid";
import { NoiseOverlay } from "../Hero/NoiseOverlay";

export const GlobalBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#0A0A0A] z-0 select-none pointer-events-none">
      {/* Layer 3: Grid */}
      <div className="absolute inset-0 w-full h-full z-10 transform-gpu global-grid">
        <AnimatedGrid />
      </div>

      {/* Layer 2: Floating Blobs */}
      <div className="absolute inset-0 w-full h-full z-0 transform-gpu global-blobs">
        <FloatingBlobs />
      </div>

      {/* Layer 1 & 5: Particle Canvas (Space dust and accent dots) */}
      <div className="absolute inset-0 w-full h-full z-20 transform-gpu global-particles">
        <ParticleField />
      </div>

      {/* Layer 4: Film Grain Noise Overlay */}
      <NoiseOverlay />
    </div>
  );
};

export default GlobalBackground;

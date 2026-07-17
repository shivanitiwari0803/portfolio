"use client";

import React, { useRef } from "react";
import { HeroContent } from "./HeroContent";
import { ScrollIndicator } from "./ScrollIndicator";
import { useHeroAnimations } from "./useHeroAnimations";
import { HeroRunner } from "./HeroRunner";

export default function Hero() {
  // Main section container ref
  const containerRef = useRef<HTMLDivElement>(null);

  // Content-level refs for animations
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const pikachuRef = useRef<HTMLDivElement>(null);

  // Mount the choreographed GSAP timelines and scroll pinning
  useHeroAnimations({
    containerRef,
    contentRef,
    badgeRef,
    headlineRef,
    descRef,
    ctasRef,
    socialsRef,
    pikachuRef,
  });

  // Scroll to helper
  const handleScrollTo = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-transparent z-0"
    >
      {/* Pikachu Running Mascot Background Layer (z-10, behind content but above background) */}
      <div 
        ref={pikachuRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden transform-gpu"
      >
        <HeroRunner />
      </div>

      {/* Mask-animated Hero Content Overlay */}
      <HeroContent
        contentRef={contentRef}
        badgeRef={badgeRef}
        headlineRef={headlineRef}
        descRef={descRef}
        ctasRef={ctasRef}
        socialsRef={socialsRef}
        onScrollToProjects={(e) => handleScrollTo(e, "#projects")}
      />

      {/* breathing vertical looping Scroll Indicator */}
      <ScrollIndicator onClick={(e) => handleScrollTo(e, "#about")} />
    </section>
  );
}

"use client";

import React, { useRef } from "react";
import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { ScrollIndicator } from "./ScrollIndicator";
import { useHeroAnimations } from "./useHeroAnimations";

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

  // Background layer refs for parallax scrolling
  const particlesRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Mount the choreographed GSAP timelines and scroll pinning
  useHeroAnimations({
    containerRef,
    contentRef,
    badgeRef,
    headlineRef,
    descRef,
    ctasRef,
    socialsRef,
    particlesRef,
    blobsRef,
    gridRef,
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
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505] z-10"
    >
      {/* Layered Background Parallax Elements */}
      <HeroBackground
        particlesRef={particlesRef}
        blobsRef={blobsRef}
        gridRef={gridRef}
      />

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

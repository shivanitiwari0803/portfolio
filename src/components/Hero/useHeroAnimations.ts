"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface UseHeroAnimationsProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  badgeRef: React.RefObject<HTMLDivElement | null>;
  headlineRef: React.RefObject<HTMLHeadingElement | null>;
  descRef: React.RefObject<HTMLParagraphElement | null>;
  ctasRef: React.RefObject<HTMLDivElement | null>;
  socialsRef: React.RefObject<HTMLDivElement | null>;
  particlesRef: React.RefObject<HTMLDivElement | null>;
  blobsRef: React.RefObject<HTMLDivElement | null>;
  gridRef: React.RefObject<HTMLDivElement | null>;
}

export const useHeroAnimations = ({
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
}: UseHeroAnimationsProps) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use gsap.context to record all animations and dispose them automatically on cleanup
    const ctx = gsap.context(() => {
      // 1. Initial State resets
      gsap.set(".line-inner", { yPercent: 104 });
      gsap.set(badgeRef.current, { opacity: 0, y: 15 });
      gsap.set(descRef.current, { opacity: 0, y: 20 });
      gsap.set(ctasRef.current, { opacity: 0, y: 20 });
      gsap.set(".social-icon", { opacity: 0, y: 15 });

      // 2. Entrance Timeline Choreography
      const entranceTimeline = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.0 },
      });

      entranceTimeline
        // Fade in grid and blobs first
        .fromTo(
          [gridRef.current, blobsRef.current],
          { opacity: 0 },
          { opacity: 1, duration: 1.6, ease: "sine.inOut" }
        )
        // Reveal masked headline letters (SplitText effect)
        .fromTo(
          ".line-inner",
          { yPercent: 104 },
          { yPercent: 0, duration: 1.4, ease: "power4.out", stagger: 0.15 },
          "-=1.0"
        )
        // Fade in badge
        .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.9")
        // Fade & slide description upward
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.8")
        // Slide CTA buttons upward
        .to(ctasRef.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.7")
        // Stagger social icons sliding in
        .to(
          ".social-icon",
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 },
          "-=0.65"
        );

      // 3. Scroll Pinning ScrollTrigger
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=65%", // Pins briefly for scroll interaction feedback
        pin: true,
        pinSpacing: false, // Subsequent components slide over hero (overlay parallax)
        scrub: true,
        invalidateOnRefresh: true,
      });

      // 4. Parallax Background & Content Scrubbing
      // Blobs parallax - moves faster
      gsap.to(blobsRef.current, {
        yPercent: -28,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Particle Canvas parallax - moves medium
      gsap.to(particlesRef.current, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Grid parallax - moves very slow
      gsap.to(gridRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Main Text Content parallax - moves up faster and fades out
      gsap.to(contentRef.current, {
        yPercent: -22,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => {
      ctx.revert(); // Automatically kills all timelines and ScrollTriggers created inside context
    };
  }, [
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
  ]);
};

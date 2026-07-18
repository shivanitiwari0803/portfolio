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
  pikachuRef: React.RefObject<HTMLDivElement | null>;
}

export const useHeroAnimations = ({
  containerRef,
  contentRef,
  badgeRef,
  headlineRef,
  descRef,
  ctasRef,
  socialsRef,
  pikachuRef,
}: UseHeroAnimationsProps) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if loader is already finished (either because we skipped it or it completed)
    const isLoaderFinished =
      typeof window !== "undefined" &&
      (document.documentElement.classList.contains("loading-complete") ||
        localStorage.getItem("skip-intro") === "true");

    let ctx: any;

    const startAnimations = () => {
      ctx = gsap.context(() => {
        // 1. Initial State resets
        gsap.set(".line-inner", { yPercent: 104 });
        gsap.set(badgeRef.current, { opacity: 0, y: 15 });
        gsap.set(descRef.current, { opacity: 0, y: 20 });
        gsap.set(ctasRef.current, { opacity: 0, y: 20 });
        gsap.set(".social-icon", { opacity: 0, y: 15 });
        gsap.set(pikachuRef.current, { opacity: 0, x: 45, scale: 0.95 });
        gsap.set("header", { y: -80, opacity: 0 }); // Navigation initial state
        gsap.set(".scroll-indicator", { opacity: 0 }); // Scroll indicator initial state

        // 2. Entrance Timeline Choreography
        const entranceTimeline = gsap.timeline({
          defaults: { ease: "power3.out", duration: 1.0 },
        });

        entranceTimeline
          // Fade in grid and blobs first
          .fromTo(
            [".global-grid", ".global-blobs"],
            { opacity: 0 },
            { opacity: 1, duration: 1.6, ease: "sine.inOut" }
          )
          // Navigation slides down
          .to("header", { y: 0, opacity: 1, duration: 1.0, ease: "power3.out" }, "-=1.0")
          // Reveal masked headline letters
          .fromTo(
            ".line-inner",
            { yPercent: 104 },
            { yPercent: 0, duration: 1.4, ease: "power4.out", stagger: 0.15 },
            "-=0.9"
          )
          // Fade in badge
          .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=1.0")
          // Fade & slide description upward
          .to(descRef.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.8")
          // Slide CTA buttons upward
          .to(ctasRef.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.7")
          // Stagger social icons sliding in
          .to(
            ".social-icon",
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 },
            "-=0.65"
          )
          // Slide & fade in Pikachu illustration on the right
          .to(
            pikachuRef.current,
            { opacity: 1, x: 0, scale: 1, duration: 1.3, ease: "power3.out" },
            "-=1.2"
          )
          // Scroll indicator fades in
          .to(".scroll-indicator", { opacity: 0.6, duration: 0.8 }, "-=0.5");

        // Main Content parallax - moves up faster and fades out
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
    };

    if (isLoaderFinished) {
      startAnimations();
    } else {
      window.addEventListener("loading-complete", startAnimations);
    }

    return () => {
      if (ctx) ctx.revert();
      window.removeEventListener("loading-complete", startAnimations);
    };
  }, [
    containerRef,
    contentRef,
    badgeRef,
    headlineRef,
    descRef,
    ctasRef,
    socialsRef,
    pikachuRef,
  ]);
};
export default useHeroAnimations;

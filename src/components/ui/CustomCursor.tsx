"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device is mobile/touch
    const checkDevice = () => {
      const mobileOrTouch =
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 768;
      setIsMobile(mobileOrTouch);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    // Track mouse position
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setIsVisible(true);

      // Dot moves instantly
      gsap.to(cursorDotRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      // Ring follows with slight delay
      gsap.to(cursorRingRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // Hover states for links and interactive elements
    const handleMouseEnterLink = () => {
      gsap.to(cursorRingRef.current, {
        scale: 1.8,
        backgroundColor: "rgba(251, 191, 36, 0.1)",
        borderColor: "#fbbf24",
        duration: 0.3,
      });
      gsap.to(cursorDotRef.current, {
        scale: 0.5,
        backgroundColor: "#fbbf24",
        duration: 0.3,
      });
    };

    const handleMouseLeaveLink = () => {
      gsap.to(cursorRingRef.current, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(255, 255, 255, 0.3)",
        duration: 0.3,
      });
      gsap.to(cursorDotRef.current, {
        scale: 1,
        backgroundColor: "#fbbf24",
        duration: 0.3,
      });
    };

    // Add event listeners to all interactive elements
    const addLinkListeners = () => {
      const links = document.querySelectorAll("a, button, [role='button'], input, textarea, .interactive-card");
      links.forEach((link) => {
        link.addEventListener("mouseenter", handleMouseEnterLink);
        link.addEventListener("mouseleave", handleMouseLeaveLink);
      });
    };

    addLinkListeners();

    // Create a MutationObserver to listen for dynamically added links/buttons
    const observer = new MutationObserver(() => {
      addLinkListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      observer.disconnect();

      const links = document.querySelectorAll("a, button, [role='button'], input, textarea, .interactive-card");
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnterLink);
        link.removeEventListener("mouseleave", handleMouseLeaveLink);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          body, a, button, [role='button'], input, textarea {
            cursor: none !important;
          }
        }
      `}</style>
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}

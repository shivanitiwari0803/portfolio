"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const HeroRunner: React.FC = () => {
  const xWrapperRef = useRef<HTMLDivElement>(null);
  const jumpWrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Animation values refs
  const speedRef = useRef(1.0); // target speed multiplier
  const currentSpeedRef = useRef(1.0); // interpolated speed multiplier
  const runTweenRef = useRef<gsap.core.Tween | null>(null);
  
  // Interactive triggers
  const rafIdRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const jumpTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isIntersectingRef = useRef(true);

  useEffect(() => {
    const xWrapper = xWrapperRef.current;
    const jumpWrapper = jumpWrapperRef.current;
    const img = imgRef.current;
    if (!xWrapper || !jumpWrapper || !img) return;

    // 1. Setup horizontal run loop (Right to Left translation)
    const startRunning = () => {
      if (!xWrapper || !img) return;
      const w = window.innerWidth;
      const runnerWidth = img.offsetWidth || 380;

      // Translate from right side of the screen to completely off-screen on the left
      const tween = gsap.fromTo(xWrapper,
        { x: w },
        {
          x: -runnerWidth,
          duration: 6.5 + Math.random() * 1.5, // 6.5 - 8 seconds
          ease: "none",
          onComplete: startRunning,
        }
      );

      runTweenRef.current = tween;
      tween.timeScale(currentSpeedRef.current);
    };

    // Wait a tick for layout sizes to register, then start horizontal cycle
    const initTimer = setTimeout(startRunning, 100);

    // 2. Setup continuous bounce & float rotation cycle on the inner image
    const bounceTween = gsap.fromTo(img,
      { y: 0, rotation: -2.5, scaleX: -1 }, // Flipped horizontally to face leftwards
      {
        y: -10, // vertical bounce
        rotation: 2.5, // float sway
        scaleX: -1,
        duration: 0.24,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      }
    );

    // 3. Setup random jumping loop on the middle wrapper (avoids tween conflicts)
    const triggerJump = () => {
      if (!jumpWrapper || !isIntersectingRef.current) {
        jumpTimeoutRef.current = setTimeout(triggerJump, 4000 + Math.random() * 3000);
        return;
      }

      const jumpTimeline = gsap.timeline();
      
      jumpTimeline
        // Squash (anticipation)
        .to(jumpWrapper, { scaleY: 0.8, scaleX: 1.15, duration: 0.12, ease: "power1.out" })
        // Stretch and Lift Off
        .to(jumpWrapper, {
          y: -55,
          scaleY: 1.18,
          scaleX: 0.85,
          duration: 0.28,
          ease: "power2.out",
        })
        // Fall back down
        .to(jumpWrapper, {
          y: 0,
          scaleY: 0.85,
          scaleX: 1.12,
          duration: 0.24,
          ease: "power2.in",
        })
        // Recovery
        .to(jumpWrapper, { scaleY: 1.0, scaleX: 1.0, duration: 0.12, ease: "power1.out" });

      // Reschedule next jump
      jumpTimeoutRef.current = setTimeout(triggerJump, 4000 + Math.random() * 3000);
    };
    jumpTimeoutRef.current = setTimeout(triggerJump, 3000);

    // 4. Scroll listener speeds up horizontal translation
    const handleScroll = () => {
      speedRef.current = 1.95; // accelerate to 1.95x speed
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      
      scrollTimeoutRef.current = setTimeout(() => {
        speedRef.current = 1.0;
      }, 180);
    };
    window.addEventListener("scroll", handleScroll);

    // 5. 60 FPS Render Tick
    const tick = () => {
      if (!isIntersectingRef.current) {
        rafIdRef.current = requestAnimationFrame(tick);
        return;
      }

      // Smoothly interpolate current speed towards target speed
      currentSpeedRef.current += (speedRef.current - currentSpeedRef.current) * 0.1;

      // Update horizontal running speed
      if (runTweenRef.current) {
        runTweenRef.current.timeScale(currentSpeedRef.current);
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };
    tick();

    // 6. Intersection Observer to pause calculations when scrolled out of view
    const intersectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersectingRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.01 }
    );
    intersectObserver.observe(xWrapper);

    // Cleanups on unmount
    return () => {
      clearTimeout(initTimer);
      window.removeEventListener("scroll", handleScroll);
      intersectObserver.disconnect();
      
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
      
      if (runTweenRef.current) runTweenRef.current.kill();
      bounceTween.kill();
      gsap.killTweensOf(jumpWrapper);
    };
  }, []);

  return (
    <div
      ref={xWrapperRef}
      className="absolute top-[48%] sm:top-[50%] left-0 w-auto h-auto pointer-events-none select-none z-10 transform-gpu"
      style={{ willChange: "transform" }}
    >
      <div ref={jumpWrapperRef} className="transform-gpu" style={{ willChange: "transform" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src="/gifs/pikachu-run.gif"
          alt="Mascot running"
          className="hero-runner object-contain pointer-events-none select-none will-change-transform transform-gpu w-[185px] sm:w-[300px] lg:w-[420px]"
        />
      </div>
    </div>
  );
};
export default HeroRunner;

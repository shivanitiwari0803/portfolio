"use client";

import React from "react";
import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import PikachuSilhouette from "./PikachuSilhouette";

interface HeroContentProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
  badgeRef: React.RefObject<HTMLDivElement | null>;
  headlineRef: React.RefObject<HTMLHeadingElement | null>;
  descRef: React.RefObject<HTMLParagraphElement | null>;
  ctasRef: React.RefObject<HTMLDivElement | null>;
  socialsRef: React.RefObject<HTMLDivElement | null>;
  onScrollToProjects: (e: React.MouseEvent) => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  contentRef,
  badgeRef,
  headlineRef,
  descRef,
  ctasRef,
  onScrollToProjects,
}) => {
  const handleScrollTo = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div 
      ref={contentRef}
      className="relative z-30 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-20 px-6 sm:px-12 text-left"
    >
      {/* Left Column: Heading, Subtitle, CTAs (col-span-7) */}
      <div className="col-span-12 lg:col-span-7 flex flex-col gap-6 items-start">
        {/* Availability Badge */}
        <div 
          ref={badgeRef}
          className="opacity-0 translate-y-4"
        >
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#FFD93D]/25 bg-[#FFD93D]/5 text-[#FFD93D] text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD93D] animate-ping" />
            Trainer Class: Full Stack Developer
          </div>
        </div>

        {/* Hero Headline */}
        <h1 
          ref={headlineRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none text-white font-display uppercase flex flex-col"
        >
          <span className="line-mask block overflow-hidden relative h-[1.15em] w-full">
            <span className="line-inner block">Hi, I&apos;m</span>
          </span>
          <span className="line-mask block overflow-hidden relative h-[1.15em] w-full text-[#FFD93D] drop-shadow-[0_0_12px_rgba(255,217,61,0.2)]">
            <span className="line-inner block">Shivani.</span>
          </span>
        </h1>

        {/* Description & Role */}
        <div 
          ref={descRef}
          className="opacity-0 flex flex-col gap-3"
        >
          <p className="text-xl sm:text-2xl font-bold tracking-tight text-red-700 font-mono">
            Full Stack Developer
          </p>
          <p className="max-w-xl text-sm sm:text-base md:text-lg text-[#9E9E9E] leading-relaxed font-light">
            Building modern web experiences. I craft highly performant, interactive web applications and integrate AI-enabled solutions that feel smooth, intentional, and premium.
          </p>
        </div>

        {/* Call to Actions (Slide & Scale) */}
        <div 
          ref={ctasRef}
          className="opacity-0 flex flex-wrap gap-4 mt-2"
        >
          {/* Start Journey CTA */}
          <motion.button
            onClick={(e) => handleScrollTo(e, "#about")}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="cta-button-primary group relative overflow-hidden flex items-center gap-2.5 px-8 py-4 bg-[#FFD93D] text-black font-semibold text-sm rounded-full transition-all duration-300 transform-gpu cursor-pointer shadow-[0_4px_20px_rgba(255,217,61,0.15)] hover:shadow-[0_0_24px_rgba(255,217,61,0.45)]"
          >
            {/* Ripple ring effect */}
            <span className="absolute inset-0 w-full h-full rounded-full border-2 border-[#FFD93D] opacity-0 group-hover:animate-[ping_1.5s_infinite] pointer-events-none" />
            
            Start Journey
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </motion.button>

          {/* View Projects CTA */}
          <motion.button
            onClick={onScrollToProjects}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="cta-button-secondary group relative overflow-hidden flex items-center gap-2.5 px-8 py-4 bg-white/[0.03] text-white font-semibold text-sm rounded-full border border-white/10 transition-all duration-300 transform-gpu cursor-pointer hover:border-[#FFD93D]/30 hover:bg-white/[0.05] hover:shadow-[0_0_20px_rgba(255,217,61,0.15)]"
          >
            {/* Ripple ring effect */}
            <span className="absolute inset-0 w-full h-full rounded-full border-2 border-white/20 opacity-0 group-hover:animate-[ping_1.5s_infinite] pointer-events-none" />
            
            View Projects
          </motion.button>
        </div>
      </div>

      {/* Right Column: Floating Pikachu Silhouette (col-span-5) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end items-center select-none"
      >
        <PikachuSilhouette />
      </motion.div>
    </div>
  );
};
export default HeroContent;

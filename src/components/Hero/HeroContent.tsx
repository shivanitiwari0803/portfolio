"use client";

import React from "react";
import { FileText, Mail } from "lucide-react";
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
}) => {
  return (
    <div 
      ref={contentRef}
      className="relative z-30 w-full max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-28 lg:mt-24 px-6 sm:px-12 text-center lg:text-left"
    >
      {/* Left Column: Heading, Subtitle, CTAs (col-span-7) */}
      <div className="col-span-12 lg:col-span-7 flex flex-col gap-6 items-center lg:items-start w-full">
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
          className="text-[clamp(2.5rem,8vw,5.5rem)] font-black tracking-tight leading-[1.05] text-white font-display uppercase flex flex-col w-full text-center lg:text-left"
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
          className="opacity-0 flex flex-col gap-3 items-center lg:items-start w-full text-center lg:text-left"
        >
          <p className="text-xl sm:text-2xl font-bold tracking-tight text-red-700 font-mono">
            Full Stack Developer
          </p>
          <p className="max-w-xl text-base md:text-lg text-[#9E9E9E] leading-relaxed font-light px-4 lg:px-0">
            Building modern web experiences. I craft highly performant, interactive web applications and integrate AI-enabled solutions that feel smooth, intentional, and premium.
          </p>
        </div>

        {/* Call to Actions Action Panel (Slide & Scale) */}
        <div 
          ref={ctasRef}
          className="opacity-0 flex flex-col gap-5 mt-2 w-full items-center lg:items-start"
        >
          {/* DESKTOP ONLY: All buttons in one row/wrap */}
          <div className="hidden lg:flex flex-row flex-wrap gap-3 w-full lg:w-auto justify-start">
            {/* GitHub */}
            <motion.a
              href="https://github.com/shivanitiwari0803"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="social-icon btn-link btn-github group flex items-center justify-center gap-2 px-4.5 py-3 rounded-full bg-white/[0.03] text-white font-semibold text-xs sm:text-sm border border-white/10 w-auto"
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-[15px] h-[15px] group-hover:text-white transition-colors"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span>GitHub</span>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/shivani-tiwari-8571a729a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="social-icon btn-link btn-linkedin group flex items-center justify-center gap-2 px-4.5 py-3 rounded-full bg-white/[0.03] text-white font-semibold text-xs sm:text-sm border border-white/10 w-auto"
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-[15px] h-[15px] group-hover:text-[#4FC3F7] transition-colors"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span>LinkedIn</span>
            </motion.a>

            {/* X (Twitter) */}
            <motion.a
              href="https://x.com/ishivanitwr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X Profile"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="social-icon btn-link btn-x group flex items-center justify-center gap-2 px-4.5 py-3 rounded-full bg-white/[0.03] text-white font-semibold text-xs sm:text-sm border border-white/10 w-auto"
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-[15px] h-[15px] group-hover:text-white transition-colors"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>X.com</span>
            </motion.a>

            {/* Resume */}
           <motion.a
  href="/resume/Shivani_Tiwari_Software_Engineer_Resume.pdf"
  download="Shivani_Tiwari_Resume.pdf"
  aria-label="Download Resume"
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.98 }}
  className="btn-link btn-resume group flex items-center justify-center gap-2 px-4.5 py-3 rounded-full bg-white/[0.03] text-white font-semibold text-xs sm:text-sm border border-white/10 w-auto"
>
  <FileText
    size={15}
    className="group-hover:text-[#FFD93D] transition-colors"
  />
  <span>Resume</span>
</motion.a>

            {/* Email */}
            <motion.a
              href="mailto:shivanitwr0803@gmail.com"
              aria-label="Send Email"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-link btn-email group flex items-center justify-center gap-2 px-4.5 py-3 rounded-full bg-white/[0.03] text-white font-semibold text-xs sm:text-sm border border-white/10 w-auto"
            >
              <Mail size={15} className="group-hover:text-[#FFD93D] transition-colors" />
              <span>Email</span>
            </motion.a>
          </div>

          {/* MOBILE & TABLET ONLY: Stacks CTA buttons full-width, socials in a horizontal row below */}
          <div className="flex lg:hidden flex-col gap-4 w-full px-4">
            {/* CTA Buttons: Full Width */}
            <div className="flex flex-col gap-3 w-full">
              {/* Resume */}
              <motion.a
                href="/Shivani_Tiwari_Resume.pdf"
                download="/resume/Shivani_Tiwari_Software_Engineer_Resume.pdf"
                aria-label="Download Resume"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-link btn-resume group flex items-center justify-center gap-2 px-4.5 py-3.5 rounded-full bg-white/[0.03] text-white font-semibold text-xs sm:text-sm border border-white/10 w-full"
              >
                <FileText size={15} className="group-hover:text-[#FFD93D] transition-colors" />
                <span>Resume</span>
              </motion.a>

              {/* Email */}
              <motion.a
                href="mailto:shivanitwr0803@gmail.com"
                aria-label="Send Email"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-link btn-email group flex items-center justify-center gap-2 px-4.5 py-3.5 rounded-full bg-white/[0.03] text-white font-semibold text-xs sm:text-sm border border-white/10 w-full"
              >
                <Mail size={15} className="group-hover:text-[#FFD93D] transition-colors" />
                <span>Email</span>
              </motion.a>
            </div>

            {/* Social Icons Row */}
            <div className="flex flex-row justify-center items-center gap-4 w-full mt-2">
              {/* GitHub */}
              <motion.a
                href="https://github.com/shivanitiwari0803"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="social-icon w-12 h-12 rounded-full bg-white/[0.03] text-white flex items-center justify-center border border-white/10 hover:border-[#FFD93D] transition-colors duration-300"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/shivani-tiwari-8571a729a/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="social-icon w-12 h-12 rounded-full bg-white/[0.03] text-white flex items-center justify-center border border-white/10 hover:border-[#4FC3F7] transition-colors duration-300"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </motion.a>

              {/* X (formerly Twitter) */}
              <motion.a
                href="https://x.com/ishivanitwr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X Profile"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="social-icon w-12 h-12 rounded-full bg-white/[0.03] text-white flex items-center justify-center border border-white/10 hover:border-white transition-colors duration-300"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Secondary CTA: Modern Status Badge Panel */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-3.5 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md max-w-xl text-center sm:text-left items-center sm:items-stretch select-none mx-auto lg:mx-0">
            <div className="flex items-center gap-2.5 shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A5FF6A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A5FF6A]"></span>
              </span>
              <span className="text-[10px] font-bold font-mono text-[#A5FF6A] uppercase tracking-wider">
                Open to Work
              </span>
            </div>
            <div className="hidden sm:block w-[1px] h-4.5 bg-white/10" />
            <p className="text-xs text-[#9E9E9E] leading-relaxed font-light font-mono text-center sm:text-left">
              Available for Full-Time Software Engineer &amp; Full Stack Developer opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Floating Pikachu Silhouette (col-span-5) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end items-center select-none w-[70%] max-w-[280px] md:max-w-[320px] lg:max-w-none lg:w-full mx-auto lg:mx-0 lg:my-0 my-8"
      >
        <PikachuSilhouette />
      </motion.div>

      {/* Global CSS Injectors for Buttons and Glow Animations */}
      <style jsx global>{`
        .btn-link {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-link:hover {
          border-color: #FFD93D !important;
        }

        .btn-github:hover {
          box-shadow: 0 0 16px rgba(255, 255, 255, 0.22);
        }

        .btn-linkedin:hover {
          box-shadow: 0 0 16px rgba(79, 195, 247, 0.32);
        }

        .btn-x:hover {
          box-shadow: 0 0 16px rgba(255, 255, 255, 0.25);
        }

        .btn-leetcode:hover {
          box-shadow: 0 0 16px rgba(255, 161, 22, 0.35);
          border-color: #FFA116 !important;
        }

        .btn-resume:hover {
          box-shadow: 0 0 16px rgba(255, 217, 61, 0.32);
        }

        @keyframes email-pulse {
          0% {
            box-shadow: 0 0 4px rgba(255, 217, 61, 0.15);
            border-color: rgba(255, 217, 61, 0.3);
          }
          100% {
            box-shadow: 0 0 18px rgba(255, 217, 61, 0.45);
            border-color: #FFD93D;
          }
        }

        .btn-email:hover {
          animation: email-pulse 1.2s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
};
export default HeroContent;

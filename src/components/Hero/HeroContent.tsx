"use client";

import React from "react";
import { ArrowRight, Download, Mail } from "lucide-react";

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
  socialsRef,
  onScrollToProjects,
}) => {
  return (
    <div 
      ref={contentRef}
      className="relative z-30 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center gap-8 mt-12 px-4"
    >
      {/* Availability Badge */}
      <div 
        ref={badgeRef}
        className="opacity-0 translate-y-4"
      >
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#FFD84D]/20 bg-[#FFD84D]/5 text-[#FFD84D] text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD84D] animate-ping" />
          AVAILABLE FOR FREELANCE &amp; FULL-TIME ROLES
        </div>
      </div>

      {/* Hero Headline with Overflow-Hidden Masking */}
      <h1 
        ref={headlineRef}
        className="text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[7.25rem] font-black tracking-tight leading-none text-white font-display uppercase flex flex-col items-center"
      >
        <span className="line-mask block overflow-hidden relative h-[1.1em] w-full">
          <span className="line-inner block">Shivani</span>
        </span>
        <span className="line-mask block overflow-hidden relative h-[1.1em] w-full text-[#FFD84D]">
          <span className="line-inner block">Tiwari</span>
        </span>
      </h1>

      {/* Description & Role */}
      <div 
        ref={descRef}
        className="opacity-0 flex flex-col items-center gap-3.5"
      >
        <p className="text-lg sm:text-2xl font-bold tracking-tight text-white/90">
          Full Stack Developer &amp; AI Specialist
        </p>
        <p className="max-w-2xl text-sm sm:text-lg text-white/50 leading-relaxed font-light">
          I craft highly performant, interactive web experiences and integrate AI-enabled solutions that feel smooth, intentional, and premium.
        </p>
      </div>

      {/* Call to Actions (Slide & Scale) */}
      <div 
        ref={ctasRef}
        className="opacity-0 flex flex-wrap justify-center items-center gap-4 mt-2"
      >
        <button
          onClick={onScrollToProjects}
          className="cta-button-primary group flex items-center gap-2.5 px-8 py-4 bg-[#FFD84D] hover:bg-[#ffe17d] text-black font-semibold text-sm rounded-full transition-all duration-300 transform-gpu cursor-pointer"
          style={{
            boxShadow: "0 4px 20px rgba(255, 216, 77, 0.15)",
          }}
        >
          Explore Projects
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </button>

        <a
          href="/resume/Shivani_Tiwari_Software_Engineer_Resume.pdf"
          download="Shivani_Tiwari_Resume.pdf"
          className="cta-button-secondary flex items-center gap-2 px-8 py-4 bg-white/[0.03] hover:bg-white/[0.08] text-white font-semibold text-sm rounded-full border border-white/10 transition-all duration-300 transform-gpu cursor-pointer"
        >
          Download Resume
          <Download size={15} />
        </a>
      </div>

      {/* Staggered Social Links */}
      <div 
        ref={socialsRef}
        className="opacity-0 flex items-center gap-4.5 mt-2"
      >
        {[
          {
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            ),
            href: "https://github.com/shivanitwr0803",
            label: "GitHub",
          },
          {
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            ),
            href: "https://linkedin.com/in/shivani-tiwari-0803",
            label: "LinkedIn",
          },
          {
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            ),
            href: "https://twitter.com",
            label: "Twitter (X)",
          },
          {
            icon: <Mail size={18} />,
            href: "mailto:shivanitwr0803@gmail.com",
            label: "Email",
          },
        ].map((social, idx) => (
          <a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon flex items-center justify-center p-3 rounded-full bg-white/[0.03] border border-white/10 text-white/60 hover:text-[#FFD84D] hover:border-[#FFD84D]/30 hover:bg-[#FFD84D]/5 transition-all duration-300 transform-gpu cursor-pointer"
            aria-label={social.label}
          >
            {social.icon}
          </a>
        ))}
      </div>

      {/* Styled Hover Micro-interactions */}
      <style jsx>{`
        .cta-button-primary:hover {
          transform: scale(1.03) translateY(-1px);
          box-shadow: 0 6px 24px rgba(255, 216, 77, 0.25) !important;
        }

        .cta-button-secondary:hover {
          transform: scale(1.03) translateY(-1px);
        }

        .social-icon:hover {
          transform: scale(1.06) translateY(-1px);
        }
      `}</style>
    </div>
  );
};
export default HeroContent;

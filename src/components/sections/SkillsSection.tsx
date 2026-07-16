"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { skillsData } from "@/data/skillsData";

type CategoryType = "languages" | "frontend" | "backend" | "databases" | "ai" | "tools" | "deployment";

interface FilterOption {
  id: CategoryType;
  label: string;
}

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Active Category State
  const [activeCategory, setActiveCategory] = useState<CategoryType>("languages");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const hasEnteredRef = useRef(false);

  const filters: FilterOption[] = [
    { id: "languages", label: "Languages" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "databases", label: "Databases" },
    { id: "ai", label: "AI & LLMs" },
    { id: "tools", label: "Tools & Platforms" },
    { id: "deployment", label: "Deployment & Optimization" },
  ];

  // Filtered skills list
  const activeSkills = skillsData.filter((skill) => skill.category === activeCategory);

  // 1. Initial Reveal Entrance (runs once on intersection)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasEnteredRef.current) {
            hasEnteredRef.current = true;

            const tl = gsap.timeline({
              defaults: { ease: "power3.out", duration: 0.8 },
            });

            tl.fromTo(
              headerRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 1.0 }
            )
            .fromTo(
              ".filter-pill",
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.7, stagger: 0.05 },
              "-=0.6"
            )
            .fromTo(
              ".skill-card-pill",
              { opacity: 0, y: 22, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.035 },
              "-=0.5"
            );
          }
        });
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. Staggered Filter Transition (Slide Out -> Update State -> Slide In)
  const handleCategoryChange = (newCat: CategoryType) => {
    if (newCat === activeCategory || isTransitioning) return;
    setIsTransitioning(true);

    const cards = gsap.utils.toArray(".skill-card-pill");
    if (cards.length > 0) {
      // Fade and slide out current cards
      gsap.to(cards, {
        opacity: 0,
        y: 15,
        scale: 0.95,
        duration: 0.22,
        stagger: 0.012,
        ease: "power2.in",
        onComplete: () => {
          setActiveCategory(newCat);
        },
      });
    } else {
      setActiveCategory(newCat);
    }
  };

  // 3. Staggered entrance for newly loaded cards
  useEffect(() => {
    // Only run if the initial reveal animation has already played
    if (!hasEnteredRef.current) return;

    // Direct animate-in loop for the new active list
    gsap.fromTo(
      ".skill-card-pill",
      { opacity: 0, y: 18, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.44,
        stagger: 0.02,
        ease: "power3.out",
        onComplete: () => {
          setIsTransitioning(false);
        },
      }
    );
  }, [activeCategory]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full select-none bg-[#050505] flex flex-col gap-12"
    >
      {/* Header Block */}
      <div
        ref={headerRef}
        className="opacity-0 flex flex-col gap-3 text-center items-center max-w-2xl mx-auto"
      >
        <span className="text-xs font-semibold tracking-widest text-[#FFD84D] uppercase font-mono">
          02 / Capabilities
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white uppercase">
          Tech Stack
        </h2>
        <p className="text-sm md:text-base text-white/50 leading-relaxed font-light mt-1">
          Technologies I use to build modern, scalable and high-performance applications.
        </p>
      </div>

      {/* Categories Filter Bar */}
      <div className="flex flex-wrap gap-2.5 justify-center border-b border-white/5 pb-6 z-20">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleCategoryChange(filter.id)}
            className={`filter-pill px-4.5 py-2.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 transform-gpu cursor-pointer relative ${
              activeCategory === filter.id
                ? "text-black bg-[#FFD84D] border-[#FFD84D] shadow-[0_4px_16px_rgba(255,216,77,0.18)]"
                : "text-white/60 hover:text-white bg-white/[0.02] border-white/5 hover:border-white/12"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div
        ref={gridRef}
        className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto w-full z-10 min-h-[160px]"
      >
        {activeSkills.map((skill) => (
          <div
            key={skill.id}
            className="skill-card-pill px-6 py-4 flex items-center gap-4 rounded-[20px] border border-white/5 bg-[#0a0a0a]/80 shadow-md transform-gpu opacity-0 select-none"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Tech Logo with raw brand color */}
            <span className="skill-logo flex items-center justify-center w-8 h-8 text-current">
              {skill.icon}
            </span>

            {/* Tech Name */}
            <span className="skill-name font-sans font-bold text-sm tracking-wide text-white/90">
              {skill.name}
            </span>
          </div>
        ))}
      </div>

      {/* Styled Hover Micro-interactions & GPU optimizations */}
      <style jsx global>{`
        .skill-card-pill {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.35s ease,
                      box-shadow 0.35s ease;
          cursor: pointer;
        }

        .skill-card-pill:hover {
          transform: translateY(-4px) rotate(1.2deg);
          border-color: rgba(255, 216, 77, 0.35) !important;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.75), 0 0 20px rgba(255, 216, 77, 0.12) !important;
        }

        .skill-logo {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .skill-logo svg {
          width: 1.85rem;
          height: 1.85rem;
        }

        .skill-card-pill:hover .skill-logo {
          transform: scale(1.16) rotate(6deg);
        }

        .skill-name {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .skill-card-pill:hover .skill-name {
          transform: translateX(3px);
          color: #ffffff;
        }
      `}</style>
    </section>
  );
};
export default SkillsSection;

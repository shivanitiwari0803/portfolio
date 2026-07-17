"use client";

import React, { useState } from "react";
import PhysicsCard from "./PhysicsCard";
import { skillsData } from "@/data/skillsData";

type CategoryType = "languages" | "frontend" | "backend" | "databases" | "ai" | "tools" | "deployment";

interface FilterOption {
  id: CategoryType;
  label: string;
}

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("languages");

  const filters: FilterOption[] = [
    { id: "languages", label: "Languages" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "databases", label: "Databases" },
    { id: "ai", label: "AI & LLMs" },
    { id: "tools", label: "Tools" },
    { id: "deployment", label: "DevOps" },
  ];

  // Filtered skills list
  const activeSkills = skillsData.filter((skill) => skill.category === activeCategory);

  return (
    <section
      id="skills"
      className="relative py-28 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full select-none flex flex-col gap-12"
    >
      {/* Header Block */}
      <div className="flex flex-col gap-3 text-center items-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold tracking-widest text-[#FFD93D] uppercase font-mono">
          02 / Capabilities
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white uppercase">
          Tech Stack &amp; Capabilities.
        </h2>
        <p className="text-sm md:text-base text-white/50 leading-relaxed font-light mt-1">
          A selection of frameworks, libraries, and languages I use to build robust digital products. Hover over any card for holographic effects, or click to view detailed stats.
        </p>
      </div>

      {/* Categories Filter Console */}
      <div className="flex justify-center border border-white/5 bg-[#111111]/60 rounded-3xl p-5 w-full max-w-5xl mx-auto z-20">
        <div className="flex flex-wrap gap-2 justify-center">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveCategory(filter.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 transform-gpu cursor-pointer ${
                activeCategory === filter.id
                  ? "text-black bg-[#FFD93D] border-[#FFD93D] shadow-[0_4px_12px_rgba(255,217,61,0.2)]"
                  : "text-white/60 hover:text-white bg-white/[0.02] border-white/5 hover:border-white/10"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Skills Card Grid - Renders instantly with no layout shift or empty whitespace */}
      <div className="w-full max-w-5xl mx-auto z-10">
        <div className="w-full p-8 rounded-[2.5rem] border border-white/5 bg-[#111111]/30 battle-grid-theme flex flex-wrap justify-center items-center gap-6 sm:gap-8 shadow-2xl relative">
          {/* Subtle themed background grid */}
          <div className="absolute inset-0 z-0 bg-radial-glow pointer-events-none rounded-[2.5rem]" />
          
          {activeSkills.map((skill) => (
            <PhysicsCard
              key={skill.id}
              skill={skill}
              isMobile={false} // Card handles SVG dimensions automatically in staticMode
              staticMode={true}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .battle-grid-theme {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        .bg-radial-glow {
          background: radial-gradient(circle at center, rgba(255, 217, 61, 0.015) 0%, transparent 80%);
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;

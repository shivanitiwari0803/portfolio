"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { 
  Globe, 
  Moon, 
  Orbit, 
  Magnet, 
  Sparkles 
} from "lucide-react";
import { skillsData } from "@/data/skillsData";
import { PhysicsWorld } from "./PhysicsWorld";
import { ParticleBackground } from "./ParticleBackground";

type CategoryType = "all" | "frontend" | "backend" | "languages" | "database" | "ai" | "tools" | "optimization";

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const controlPanelRef = useRef<HTMLDivElement>(null);
  const sandboxRef = useRef<HTMLDivElement>(null);

  // States
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  const [gravityMode, setGravityMode] = useState<"earth" | "moon" | "zero">("earth");
  const [magnetMode, setMagnetMode] = useState(false);
  const [shakeTrigger, setShakeTrigger] = useState(0);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // Determine viewport width on mount to filter card counts
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setDevice("mobile");
      } else if (w < 1024) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.0 },
      });

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1 }
      )
      .fromTo(
        ".filter-btn",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 },
        "-=0.7"
      )
      .fromTo(
        controlPanelRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.9 },
        "-=0.6"
      )
      .fromTo(
        sandboxRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2 },
        "-=0.5"
      );
    }, el);

    return () => ctx.revert();
  }, []);

  // Filter skills based on Category + Screen Sizing constraints
  const filteredSkills = skillsData.filter((skill) => {
    // 1. Sizing optimizations
    if (device === "mobile" && !skill.mobile) return false;
    if (device === "tablet" && !skill.tablet) return false;

    // 2. Active Category selection
    if (activeCategory === "all") return true;
    return skill.category === activeCategory;
  });

  const categories: { id: CategoryType; label: string }[] = [
    { id: "all", label: "All" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "languages", label: "Languages" },
    { id: "database", label: "Database" },
    { id: "ai", label: "AI & LLMs" },
    { id: "tools", label: "Tools" },
    { id: "optimization", label: "Optimization" },
  ];

  const handleShake = () => {
    setShakeTrigger((prev) => prev + 1);
  };

  const handleCategoryChange = (catId: CategoryType) => {
    if (catId === activeCategory) return;

    // Staggered fade out of existing cards using GSAP before updating state
    const cards = gsap.utils.toArray(".physics-card");
    if (cards.length > 0) {
      gsap.to(cards, {
        opacity: 0,
        scale: 0.85,
        y: "+=20",
        duration: 0.2,
        stagger: 0.012,
        ease: "power2.in",
        onComplete: () => {
          setActiveCategory(catId);
        },
      });
    } else {
      setActiveCategory(catId);
    }
  };

  return (
    <section 
      id="skills"
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full select-none overflow-hidden bg-black flex flex-col gap-12"
    >
      {/* Header Container */}
      <div 
        ref={headerRef}
        className="flex flex-col gap-2.5 text-center items-center max-w-2xl mx-auto"
      >
        <span className="text-xs font-semibold tracking-widest text-[#FFD84D] uppercase font-mono">
          02 / Capabilities
        </span>
        <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-display font-bold tracking-tight text-white uppercase">
          Play With My Skills
        </h2>
        <p className="text-sm md:text-base text-white/50 leading-relaxed font-light mt-1">
          Every card represents a technology I use. Grab, throw, and interact with them in the sandbox container.
        </p>
      </div>

      {/* Control panel and filters */}
      <div className="flex flex-col gap-6 w-full z-20">
        {/* Category Filters Bar */}
        <div className="flex flex-wrap gap-2 justify-center border-b border-white/5 pb-5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`filter-btn px-4 py-2 rounded-full text-xs font-medium tracking-wide border transition-all duration-300 transform-gpu cursor-pointer ${
                activeCategory === cat.id
                  ? "text-black bg-[#FFD84D] border-[#FFD84D] shadow-[0_4px_16px_rgba(255,216,77,0.18)]"
                  : "text-white/60 hover:text-white bg-white/[0.02] border-white/5 hover:border-white/15"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Physics Control Dashboard */}
        <div 
          ref={controlPanelRef}
          className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/[0.01] border border-white/5 rounded-2xl p-4 max-w-3xl mx-auto w-full"
        >
          {/* Gravity Toggles */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono mr-1">Gravity:</span>
            {[
              { id: "earth", label: "Earth", icon: <Globe size={13} /> },
              { id: "moon", label: "Moon", icon: <Moon size={13} /> },
              { id: "zero", label: "Zero-G", icon: <Orbit size={13} /> },
            ].map((grav) => (
              <button
                key={grav.id}
                onClick={() => setGravityMode(grav.id as "earth" | "moon" | "zero")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer border ${
                  gravityMode === grav.id
                    ? "text-[#FFD84D] border-[#FFD84D]/30 bg-[#FFD84D]/5"
                    : "text-white/50 border-transparent hover:text-white bg-white/[0.02]"
                }`}
              >
                {grav.icon}
                <span>{grav.label}</span>
              </button>
            ))}
          </div>

          {/* Magnet and Shake Panel */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono mr-1">Controls:</span>
            
            {/* Magnet Toggle */}
            <button
              onClick={() => setMagnetMode(!magnetMode)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                magnetMode
                  ? "text-[#FFD84D] border-[#FFD84D]/30 bg-[#FFD84D]/5"
                  : "text-white/50 border-transparent hover:text-white bg-white/[0.02]"
              }`}
            >
              <Magnet size={13} className={magnetMode ? "animate-pulse text-[#FFD84D]" : ""} />
              <span>Attraction {magnetMode ? "On" : "Off"}</span>
            </button>

            {/* Shake Button */}
            <button
              onClick={handleShake}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#FFD84D]/20 text-white/60 hover:text-white transition-all duration-300 cursor-pointer"
            >
              <Sparkles size={13} className="text-[#FFD84D]" />
              <span>Shake Arena</span>
            </button>
          </div>
        </div>
      </div>

      {/* Physics World Arena wrapper */}
      <div 
        ref={sandboxRef}
        className="relative w-full z-10"
      >
        {/* Subtle glowing dots background field */}
        <ParticleBackground />
        
        {/* The Sandbox viewport rendering Matter.js rigid bodies */}
        <PhysicsWorld
          skills={filteredSkills}
          isMobile={device === "mobile"}
          gravityMode={gravityMode}
          magnetMode={magnetMode}
          shakeTrigger={shakeTrigger}
        />
      </div>
    </section>
  );
};
export default SkillsSection;

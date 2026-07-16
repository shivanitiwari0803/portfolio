"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { 
  GraduationCap, 
  Code2, 
  Cpu, 
  MapPin, 
  Briefcase, 
  BookOpen, 
  Award, 
  Clock 
} from "lucide-react";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  // 1. Reveal Animations & Stats Count-Up
  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    // Progressive Enhancement: Hide elements dynamically via JS only
    gsap.set(".about-header", { opacity: 0, y: 30 });
    gsap.set(cardRef.current, { opacity: 0, scale: 0.95, y: 30 });
    gsap.set(textRef.current, { opacity: 0, y: 30 });
    gsap.set(".highlight-item", { opacity: 0, y: 15, scale: 0.95 });
    gsap.set(".stat-card", { opacity: 0, y: 20 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;

            const tl = gsap.timeline({
              defaults: { ease: "power3.out" },
            });

            // Play staggered reveal
            tl.to(".about-header", { opacity: 1, y: 0, duration: 0.8 })
              .to(cardRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.8 }, "-=0.6")
              .to(textRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
              .to(".highlight-item", { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.04 }, "-=0.4")
              .to(".stat-card", { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 }, "-=0.3")
              .add(() => {
                // Trigger count-up animation on metrics numbers
                const statsNumbers = document.querySelectorAll(".stat-number");
                statsNumbers.forEach((el) => {
                  const targetStr = el.getAttribute("data-target") || "0";
                  const target = parseFloat(targetStr);
                  const isDecimal = targetStr.includes(".");
                  const suffix = el.getAttribute("data-suffix") || "";

                  const obj = { val: 0 };
                  gsap.to(obj, {
                    val: target,
                    duration: 1.5,
                    ease: "power2.out",
                    onUpdate: () => {
                      if (isDecimal) {
                        el.textContent = obj.val.toFixed(1) + suffix;
                      } else {
                        el.textContent = Math.floor(obj.val) + suffix;
                      }
                    },
                  });
                });
              }, "-=0.2");
          }
        });
      },
      { threshold: 0.08 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // 2. Slow floating drift on left illustration card
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const floatTween = gsap.to(card, {
      y: -10,
      duration: 3.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      floatTween.kill();
    };
  }, []);

  // 3. Mouse 3D tilt perspective parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(el, {
      rotateY: x * 15,
      rotateX: -y * 15,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power1.out",
    });
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;

    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-28 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full select-none bg-[#050505] flex flex-col gap-12 overflow-hidden"
    >
      {/* Section Header */}
      <div className="about-header flex flex-col gap-2.5">
        <span className="text-xs font-semibold tracking-widest text-[#FFD84D] uppercase font-mono">
          01 / About Me
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white uppercase">
          A short story about myself.
        </h2>
      </div>

      {/* Main 2-Column Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full">
        
        {/* Left Side: Collapse-proof 3D Orbit Profile Illustration */}
        <div className="col-span-12 lg:col-span-5 flex justify-center w-full">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[420px] min-h-[380px] md:min-h-[440px] rounded-3xl bg-[#0c0c0c] border border-white/5 shadow-2xl flex items-center justify-center overflow-hidden cursor-pointer group transform-gpu"
            style={{ willChange: "transform" }}
          >
            {/* Ambient Radial Golden Glow */}
            <div className="absolute w-80 h-80 rounded-full bg-[#FFD84D]/5 blur-[80px] pointer-events-none transition-all duration-700 group-hover:bg-[#FFD84D]/10" />

            <div className="relative w-56 h-56 flex items-center justify-center transform-gpu">
              {/* Rotating Orbits */}
              <div className="absolute w-52 h-52 border border-white/10 rounded-full animate-[spin_32s_linear_infinite]" />
              <div className="absolute w-44 h-44 border border-white/15 border-dashed rounded-full animate-[spin_24s_linear_infinite_reverse]" />
              <div className="absolute w-36 h-36 border border-[#FFD84D]/15 rounded-full animate-[spin_16s_linear_infinite]" />

              {/* Glowing code nodes in orbits */}
              <div className="absolute w-full h-full animate-[spin_40s_linear_infinite]">
                <div className="absolute top-1/2 left-[8px] w-2.5 h-2.5 rounded-full bg-[#FFD84D] shadow-[0_0_12px_#FFD84D]" />
                <div className="absolute top-[32px] right-[32px] w-1.5 h-1.5 rounded-full bg-white/40" />
                <div className="absolute bottom-[32px] left-[32px] w-2 h-2 rounded-full bg-white/20" />
              </div>

              {/* Central Profile Circle */}
              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border border-[#FFD84D]/25 bg-black/95 flex flex-col items-center justify-center shadow-lg shadow-black/90 transition-all duration-500 group-hover:border-[#FFD84D]/60 shadow-[0_0_24px_rgba(255,216,77,0.1)] transform-gpu">
                <span className="text-3xl font-extrabold tracking-widest text-[#FFD84D] font-display">ST</span>
                <span className="text-[9px] text-white/50 tracking-widest font-mono font-bold mt-1.5 uppercase">Developer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Paragraphs & Highlights */}
        <div 
          ref={textRef}
          className="col-span-12 lg:col-span-7 flex flex-col gap-8 text-left"
        >
          {/* Bio paragraphs */}
          <div className="flex flex-col gap-5 text-left">
            <p className="text-base md:text-lg text-white/70 leading-relaxed font-light">
              I am <span className="text-white font-semibold">Shivani Tiwari</span>, a Full Stack Developer focused on building fast, scalable, and visually engaging web applications. I enjoy transforming complex ideas into polished digital products that combine clean design, modern engineering, and exceptional user experience.
            </p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed font-light">
              During my internship at <span className="text-white font-semibold">Y2 Solar</span>, I engineered a production-ready website with 15+ pages using Next.js, React, Tailwind CSS, Supabase, and Three.js. Alongside full-stack engineering, I developed Arena AI—a comparison platform for LLMs with automated scoring and API latency optimizations—always focusing on performance, usability, and clean architecture.
            </p>
          </div>

          {/* Highlights 2-Column Grid (Lucide vector icons, no emojis) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full border-t border-white/5 pt-6 text-left">
            {[
              { label: "Final-Year BCA Student", icon: <GraduationCap size={16} className="text-[#FFD84D]" /> },
              { label: "Full Stack Developer", icon: <Code2 size={16} className="text-[#FFD84D]" /> },
              { label: "AI Specialist & Enthusiast", icon: <Cpu size={16} className="text-[#FFD84D]" /> },
              { label: "Based in Delhi, India", icon: <MapPin size={16} className="text-[#FFD84D]" /> },
              { label: "Available for Full-Time Roles", icon: <Briefcase size={16} className="text-[#FFD84D]" /> },
              { label: "Continuous Learner", icon: <BookOpen size={16} className="text-[#FFD84D]" /> },
            ].map((hl, idx) => (
              <div 
                key={idx} 
                className="highlight-item flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 transform-gpu hover:scale-[1.02]"
              >
                <span className="flex items-center justify-center p-1.5 rounded-lg bg-[#FFD84D]/10">
                  {hl.icon}
                </span>
                <span className="text-sm font-semibold text-white/80 tracking-wide">
                  {hl.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Cards Container */}
      <div 
        ref={statsRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full border-t border-white/5 pt-8 z-10 text-left"
      >
        {[
          { label: "Projects Completed", value: "15", suffix: "+", icon: <Briefcase size={18} /> },
          { label: "Technologies Used", value: "30", suffix: "+", icon: <Code2 size={18} /> },
          { label: "Internship Experience", value: "1", suffix: "", icon: <Award size={18} /> },
          { label: "BCA CGPA Score", value: "9.3", suffix: "", icon: <Clock size={18} /> },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="stat-card p-6 rounded-2xl border border-white/5 bg-[#0a0a0a]/80 shadow-md flex flex-col justify-between min-h-[140px] hover:border-[#FFD84D]/20 hover:shadow-[0_8px_24px_rgba(255,216,77,0.06)] transition-all duration-300 transform-gpu hover:scale-[1.03]"
          >
            <div className="flex items-center justify-between text-white/40">
              <span className="text-[10px] font-semibold tracking-widest uppercase font-mono">{stat.label}</span>
              <span className="text-[#FFD84D]/80">{stat.icon}</span>
            </div>

            <div className="flex items-baseline mt-4">
              <h3 
                className="stat-number text-3.5xl md:text-4xl font-extrabold text-white font-display"
                data-target={stat.value}
                data-suffix={stat.suffix}
              >
                0{stat.suffix}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

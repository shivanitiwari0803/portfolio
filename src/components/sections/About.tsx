"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Activity, MapPin, GraduationCap, Code2, Cpu, Briefcase, BookOpen, Award } from "lucide-react";
import { EASE_APPLE } from "@/lib/motion";

// Custom spark and blink animated Pikachu SVG avatar
const PikachuAvatar = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center pika-avatar-container">
      {/* Sparkles SVG floating in background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
        <path 
          d="M 12 25 L 14 20 L 16 25 L 21 27 L 16 29 L 14 34 L 12 29 L 7 27 Z" 
          fill="#FFD93D" 
          className="pika-spark" 
          style={{ "--x": "4px", "--y": "-3px" } as React.CSSProperties} 
        />
        <path 
          d="M 85 68 L 86 64 L 88 68 L 92 69 L 88 70 L 86 74 L 85 70 L 81 69 Z" 
          fill="#4FC3F7" 
          className="pika-spark" 
          style={{ "--x": "-3px", "--y": "4px", "animationDelay": "1.5s" } as React.CSSProperties} 
        />
      </svg>
      
      {/* Pikachu Head Vector */}
      <svg 
        className="w-18 h-18 text-[#FFD93D] filter drop-shadow-[0_4px_8px_rgba(255,217,61,0.25)]" 
        viewBox="0 0 100 100" 
        fill="currentColor"
      >
        {/* Left Ear */}
        <path d="M 28 35 L 5 10 C 2 7 8 2 13 8 L 38 31 Z" />
        <path d="M 5 10 C 2 7 4 5 7 8 L 16 18 L 10 16 Z" fill="#171717" />
        
        {/* Right Ear */}
        <path d="M 72 35 L 95 10 C 98 7 92 2 87 8 L 62 31 Z" />
        <path d="M 95 10 C 98 7 96 5 93 8 L 84 18 L 90 16 Z" fill="#171717" />
        
        {/* Head Base */}
        <ellipse cx="50" cy="55" rx="30" ry="24" />
        
        {/* Left Eye */}
        <circle cx="38" cy="52" r="3.5" fill="#171717" className="pika-eye" />
        <circle cx="36.5" cy="50" r="1.2" fill="#FFFFFF" className="pika-eye" />
        
        {/* Right Eye */}
        <circle cx="62" cy="52" r="3.5" fill="#171717" className="pika-eye" />
        <circle cx="60.5" cy="50" r="1.2" fill="#FFFFFF" className="pika-eye" />
        
        {/* Cheeks */}
        <circle cx="27" cy="62" r="5" fill="#E53935" className="pika-cheek" />
        <circle cx="73" cy="62" r="5" fill="#E53935" className="pika-cheek" />
        
        {/* Nose */}
        <polygon points="49,56 51,56 50,58" fill="#171717" />
        
        {/* Smile */}
        <path d="M 46,60 Q 48,62 50,60 Q 52,62 54,60" fill="none" stroke="#171717" strokeWidth="1.2" strokeLinecap="round" />
      </svg>

      <style jsx>{`
        @keyframes pika-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .pika-avatar-container {
          animation: pika-float 4.2s infinite ease-in-out;
        }

        @keyframes pika-blink {
          0%, 92%, 100% { transform: scaleY(1); }
          96% { transform: scaleY(0.1); }
        }
        .pika-eye {
          animation: pika-blink 4.2s infinite;
          transform-origin: 50% 52%;
        }

        @keyframes cheek-glow {
          0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 1px rgba(229,57,53,0.5)); }
          50% { opacity: 1; filter: drop-shadow(0 0 5px rgba(229,57,53,0.9)); }
        }
        .pika-cheek {
          animation: cheek-glow 2s infinite ease-in-out;
        }

        @keyframes spark-float {
          0%, 100% { opacity: 0; transform: scale(0.6) translate(0, 0); }
          50% { opacity: 0.8; transform: scale(1.1) translate(var(--x), var(--y)); }
        }
        .pika-spark {
          animation: spark-float 3.5s infinite ease-in-out;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
};

// Smooth numeric counter animation
const Counter = ({ value, duration = 1200, isFloat = false }: { value: number; duration?: number; isFloat?: boolean }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            const startTime = Date.now();
            const timer = setInterval(() => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const current = progress * value;
              setCount(current);
              if (progress >= 1) clearInterval(timer);
            }, 25);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={elementRef}>
      {isFloat ? count.toFixed(2) : Math.floor(count)}
    </span>
  );
};

interface BadgeItem {
  id: string;
  name: string;
  desc: string;
  color: string;
  icon: string;
}

const BADGES: BadgeItem[] = [
  { id: "solar", name: "Solar Badge", desc: "Engineered Y2 Solar web systems.", color: "#FFD93D", icon: "☀️" },
  { id: "volcano", name: "Volcano Badge", desc: "Reduced Mistral and Cohere API latencies.", color: "#FF5722", icon: "🌋" },
  { id: "thunder", name: "Thunder Badge", desc: "Draggable Matter.js physics worlds.", color: "#FFEB3B", icon: "⚡" },
  { id: "rainbow", name: "Rainbow Badge", desc: "Crafted interactive macOS layouts.", color: "#E040FB", icon: "🌈" },
  { id: "soul", name: "Soul Badge", desc: "9.32 BCA cumulative CGPA scores.", color: "#9C27B0", icon: "🔮" },
  { id: "earth", name: "Earth Badge", desc: "Optimized structured code templates.", color: "#4CAF50", icon: "🌍" },
];

export default function About() {
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  return (
    <section
      id="about"
      className="relative z-10 py-28 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full select-none flex flex-col gap-14 overflow-hidden bg-background"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-2.5 text-left">
        <span className="text-xs font-semibold tracking-widest text-[#FFD93D] uppercase font-mono">
          01 / About Me
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white uppercase">
          Trainer Biography.
        </h2>
      </div>

      {/* Main Grid: Left Trainer Card, Right Details (perfectly aligned with increased padding) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
        
        {/* Left Side: Trainer Card */}
        <div className="col-span-12 lg:col-span-5 flex flex-col items-center justify-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE_APPLE }}
            whileHover={{ y: -8 }}
            className="relative w-full max-w-[420px] rounded-3xl bg-[#171717] border border-[#FFD93D]/20 shadow-2xl p-6 sm:p-7 overflow-hidden cursor-pointer group transform-gpu"
          >
            {/* Ambient Radial Pikachu Yellow Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#FFD93D]/5 blur-[80px] pointer-events-none transition-all duration-700 group-hover:bg-[#FFD93D]/10" />
            
            {/* Trainer Card Top Border Line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FFD93D] via-[#4FC3F7] to-[#FFD93D]" />

            {/* Trainer Card Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold font-mono tracking-widest text-white/40 uppercase">Trainer Card</span>
                <span className="text-xs font-bold font-mono text-[#FFD93D]">IDNo. 08039</span>
              </div>
              <div className="px-2.5 py-1 rounded bg-[#FFD93D]/10 border border-[#FFD93D]/30 text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                Active League
              </div>
            </div>

            {/* Profile split */}
            <div className="flex items-center gap-5 mb-6">
              {/* Photo Area: Custom Blinking & Sparking Pikachu Avatar */}
              <div className="relative w-24 h-24 rounded-2xl border-2 border-white/10 bg-black/60 flex items-center justify-center overflow-hidden shrink-0 shadow-inner group-hover:border-[#FFD93D]/45 transition-colors duration-300">
                <PikachuAvatar />
              </div>

              {/* Basic Meta */}
              <div className="flex flex-col gap-1.5 w-full">
                <h3 className="text-xl font-display font-extrabold text-white tracking-tight uppercase">
                  Shivani Tiwari
                </h3>
                <p className="text-xs font-semibold text-white/50 tracking-wide font-mono uppercase flex items-center gap-1.5">
                  <Activity size={12} className="text-[#A5FF6A]" />
                  Trainer: Full Stack
                </p>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-white/60 font-mono">
                  <MapPin size={11} className="text-[#FFD93D]" />
                  Delhi, India
                </div>
              </div>
            </div>

            {/* XP progress bar */}
            <div className="flex flex-col gap-2 mb-6 bg-white/[0.02] border border-white/5 rounded-2xl p-4">
              <div className="flex justify-between items-baseline text-xs font-mono">
                <span className="text-white/40 font-bold uppercase">Experience Points</span>
                <span className="text-white font-bold text-right">8,850 / 10,000 XP</span>
              </div>
              <div className="w-full h-3.5 bg-black rounded-full overflow-hidden p-[2px] border border-white/10">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "88.5%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: EASE_APPLE, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-[#FFD93D] to-[#ffe56c] rounded-full shadow-[0_0_8px_#FFD93D] flex items-center justify-end px-1"
                >
                  <span className="text-[7px] text-black font-extrabold font-mono">88.5%</span>
                </motion.div>
              </div>
            </div>

            {/* Badges Area */}
            <div className="flex flex-col gap-2 bg-white/[0.02] border border-white/5 rounded-2xl p-4">
              <span className="text-[10px] font-bold font-mono tracking-wider text-white/40 uppercase">League Badges (6/6)</span>
              
              <div className="grid grid-cols-6 gap-2 mt-1 relative">
                {BADGES.map((badge) => (
                  <div
                    key={badge.id}
                    onMouseEnter={() => setHoveredBadge(badge.id)}
                    onMouseLeave={() => setHoveredBadge(null)}
                    className="relative flex items-center justify-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      className="w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/60 hover:text-white cursor-help transition-all duration-300 shadow-md text-sm"
                      style={{
                        borderColor: hoveredBadge === badge.id ? badge.color : "rgba(255,255,255,0.1)",
                        boxShadow: hoveredBadge === badge.id ? `0 0 12px ${badge.color}33` : "none",
                        color: hoveredBadge === badge.id ? badge.color : "rgba(255,255,255,0.6)"
                      }}
                    >
                      {badge.icon}
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Tooltip detail inside card */}
              <div className="h-9 mt-2 flex items-center justify-center bg-black/40 rounded-xl px-3 py-1.5 border border-white/5 overflow-hidden">
                <span className="text-[10px] text-center font-mono leading-tight text-white/70">
                  {hoveredBadge ? (
                    <span>
                      <strong style={{ color: BADGES.find(b => b.id === hoveredBadge)?.color }}>
                        {BADGES.find(b => b.id === hoveredBadge)?.name}:
                      </strong>{" "}
                      {BADGES.find(b => b.id === hoveredBadge)?.desc}
                    </span>
                  ) : (
                    <span className="text-white/40 uppercase tracking-widest">Hover badges to inspect</span>
                  )}
                </span>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Right Side: Paragraphs & Tech stack */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE_APPLE, delay: 0.15 }}
          className="col-span-12 lg:col-span-7 flex flex-col gap-10 text-left"
        >
          {/* Bio paragraphs */}
          <div className="flex flex-col gap-6 text-left">
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
              I am <span className="text-white font-semibold">Shivani Tiwari</span>, a Full Stack Developer focused on building fast, scalable, and visually engaging web applications. I enjoy transforming complex ideas into polished digital products that combine clean design, modern engineering, and exceptional user experience.
            </p>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
              During my internship at <span className="text-white font-semibold">Y2 Solar</span>, I engineered a production-ready website with 15+ pages using Next.js, React, Tailwind CSS, Supabase, and Three.js. Alongside full-stack engineering, I developed Arena AI—a comparison platform for LLMs with automated scoring and API latency optimizations—always focusing on performance, usability, and clean architecture.
            </p>
          </div>

          {/* Highlights 2-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full border-t border-white/5 pt-8 text-left">
            {[
              { label: "Bachelor of Computer Applications (BCA) Graduate", icon: <GraduationCap size={16} className="text-[#FFD93D]" /> },
              { label: "Full Stack Developer", icon: <Code2 size={16} className="text-[#FFD93D]" /> },
              { label: "AI Specialist & Enthusiast", icon: <Cpu size={16} className="text-[#FFD93D]" /> },
              { label: "Based in Delhi, India", icon: <MapPin size={16} className="text-[#FFD93D]" /> },
              { label: "Available for Full-Time Roles", icon: <Briefcase size={16} className="text-[#FFD93D]" /> },
              { label: "Continuous Learner", icon: <BookOpen size={16} className="text-[#FFD93D]" /> },
            ].map((hl, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.02 }}
                className="highlight-item flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 transform-gpu"
              >
                <span className="flex items-center justify-center p-1.5 rounded-lg bg-[#FFD93D]/10">
                  {hl.icon}
                </span>
                <span className="text-sm font-semibold text-white/80 tracking-wide">
                  {hl.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Redesigned Premium Dashboard Statistics Widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full border-t border-white/5 pt-12 z-10 text-left">
        {[
          { label: "Projects Completed", value: 12, suffix: "+", icon: <Code2 size={18} /> },
          { label: "Technologies Used", value: 20, suffix: "+", icon: <Cpu size={18} /> },
          { label: "Internship Experience", value: 1, suffix: "", icon: <Briefcase size={18} /> },
          { label: "BCA CGPA Score", value: 9.32, suffix: "", icon: <GraduationCap size={18} />, isFloat: true },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.08, ease: EASE_APPLE }}
            whileHover={{ y: -6, borderColor: "rgba(255,217,61,0.3)" }}
            className="relative p-5 rounded-2xl border border-white/5 bg-[#171717]/90 backdrop-blur-md transition-all duration-300 transform-gpu hover:shadow-[0_8px_24px_rgba(255,217,61,0.06)] flex flex-col justify-between h-36"
          >
            {/* Soft yellow radial background glow inside widget */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFD93D]/1 rounded-full blur-[25px] pointer-events-none" />

            <div className="flex items-center justify-between text-white/40">
              <span className="text-[10px] font-bold tracking-widest uppercase font-mono text-white/40">{stat.label.split(" ")[0]}</span>
              <span className="text-[#FFD93D]/80 bg-white/5 p-1.5 rounded-lg border border-white/5">{stat.icon}</span>
            </div>

            <div className="flex flex-col gap-0.5 mt-auto">
              <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-none">
                <Counter value={stat.value} isFloat={stat.isFloat} />
                <span className="text-[#FFD93D]">{stat.suffix}</span>
              </h3>
              <span className="text-[9px] font-bold font-mono text-white/30 uppercase tracking-wider mt-1">{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

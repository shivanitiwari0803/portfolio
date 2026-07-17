"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Code2, CheckCircle2, ArrowUpRight, Sparkles } from "lucide-react";
import { EASE_APPLE } from "@/lib/motion";

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-28 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full select-none relative overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-2.5 mb-16 text-left">
        <span className="text-xs font-semibold tracking-widest text-[#FFD93D] uppercase font-mono">
          03 / Career
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white uppercase">
          Experience &amp; Status.
        </h2>
      </div>

      <div className="flex flex-col gap-10 max-w-5xl mx-auto text-left">
        
        {/* 1. Redesigned Experience Card: Horizontal Timeline Card (Visual Highlight) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE_APPLE }}
          whileHover={{ y: -6, borderColor: "rgba(255, 217, 61, 0.3)" }}
          className="relative p-6 sm:p-8 rounded-3xl bg-[#171717]/85 border border-white/5 shadow-2xl flex flex-col md:flex-row gap-6 items-stretch group transition-all duration-300 transform-gpu"
        >
          {/* Subtle glowing accent line running along the left border */}
          <div className="absolute left-0 top-12 bottom-12 w-[3px] bg-gradient-to-b from-[#FFD93D] via-[#4FC3F7] to-transparent rounded-r-lg opacity-85" />
          
          {/* Left Block: Company Icon + Timeline Node (Horizontal split) */}
          <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-5 md:w-48 shrink-0 relative pr-0 md:pr-4 border-b md:border-b-0 md:border-r border-white/5 pb-4 md:pb-0">
            {/* Timeline Dot Connector Indicator */}
            <div className="hidden md:block absolute -right-[8px] top-6 w-3.5 h-3.5 rounded-full bg-[#111111] border-2 border-[#FFD93D] shadow-[0_0_8px_#FFD93D] z-10" />

            {/* Glowing Custom Company Icon (Solar Shield Logo) */}
            <div className="relative w-14 h-14 rounded-2xl bg-black border border-[#FFD93D]/25 flex items-center justify-center text-[#FFD93D] shadow-[0_0_12px_rgba(255,217,61,0.06)] group-hover:border-[#FFD93D]/45 transition-colors">
              <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
                <circle cx="16" cy="16" r="6" className="animate-pulse" style={{ fill: "#FFD93D" }} />
                <path d="M16 4 L16 8 M16 24 L16 28 M4 16 L8 16 M24 16 L28 16 M7.5 7.5 L10.5 10.5 M21.5 21.5 L24.5 24.5 M7.5 24.5 L10.5 21.5 M21.5 7.5 L24.5 10.5" stroke="#FFD93D" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 rounded-2xl border border-dashed border-[#FFD93D]/10 animate-[spin_10s_linear_infinite]" />
            </div>

            <div className="flex flex-col">
              <h4 className="text-xl font-display font-extrabold text-white tracking-tight uppercase group-hover:text-[#FFD93D] transition-colors">
                Y2 Solar
              </h4>
              <span className="text-[10px] font-bold font-mono text-[#4FC3F7] uppercase mt-0.5 tracking-wider">
                Solar Tech SaaS
              </span>
            </div>
          </div>

          {/* Right Block: Content Details */}
          <div className="flex-1 flex flex-col justify-between gap-5 pl-0 md:pl-4">
            <div className="flex flex-col gap-3">
              {/* Job Title & Period info bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-white/5 pb-3">
                <h3 className="text-lg sm:text-xl font-display font-extrabold text-white tracking-tight uppercase">
                  Software Developer Intern
                </h3>
                <div className="flex items-center gap-3 text-[10px] font-mono text-white/50">
                  <span className="flex items-center gap-1">
                    <Calendar size={10} />
                    Apr 2026 - Jun 2026
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={10} />
                    Remote
                  </span>
                </div>
              </div>

              {/* Achievements */}
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-[#9E9E9E] leading-relaxed font-light mt-1">
                <li className="flex gap-2.5 items-start">
                  <span className="w-1.5 h-1.5 bg-[#FFD93D] rounded-full mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                  <span>Engineered Y2 Solar&apos;s production platform from scratch. Designed and structured 15+ page templates.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="w-1.5 h-1.5 bg-[#FFD93D] rounded-full mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                  <span>Integrated real-time database queries and secure row-level security API pipelines in Supabase.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="w-1.5 h-1.5 bg-[#FFD93D] rounded-full mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                  <span>Compressed texture maps and optimized WebGL context states, keeping Lighthouse scores above 90.</span>
                </li>
              </ul>
            </div>

            {/* Bottom tags */}
            <div className="flex flex-wrap gap-1.5 items-center pt-2">
              <span className="text-[9px] font-bold font-mono text-white/20 uppercase flex items-center gap-1 mr-1">
                <Code2 size={10} />
                Stack:
              </span>
              {["Next.js", "React", "Tailwind CSS", "Supabase", "Three.js"].map((tech) => (
                <span
                  key={tech}
                  className="text-[9px] font-bold text-white/70 bg-white/5 border border-white/5 rounded-full px-2.5 py-0.5 font-mono uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 2. Redesigned Status Card: Dedicated Premium Status Panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE_APPLE, delay: 0.12 }}
          whileHover={{ y: -6, borderColor: "rgba(165, 255, 106, 0.3)" }}
          className="relative p-6 sm:p-8 rounded-3xl bg-[#171717]/85 border border-white/5 shadow-2xl flex flex-col md:flex-row gap-6 items-stretch group transition-all duration-300 transform-gpu"
        >
          {/* Subtle green electric neon glow along left border */}
          <div className="absolute left-0 top-12 bottom-12 w-[3px] bg-gradient-to-b from-[#A5FF6A] to-transparent rounded-r-lg opacity-85" />

          {/* Left Block: Online indicator + Availability status */}
          <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-5 md:w-48 shrink-0 relative pr-0 md:pr-4 border-b md:border-b-0 md:border-r border-white/5 pb-4 md:pb-0">
            {/* Timeline Dot Connector Indicator */}
            <div className="hidden md:block absolute -right-[8px] top-6 w-3.5 h-3.5 rounded-full bg-[#111111] border-2 border-[#A5FF6A] shadow-[0_0_8px_#A5FF6A] z-10" />

            {/* Glowing online availability badge */}
            <div className="relative w-14 h-14 rounded-2xl bg-black border border-[#A5FF6A]/25 flex items-center justify-center text-[#A5FF6A] shadow-[0_0_12px_rgba(165,255,106,0.06)]">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A5FF6A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#A5FF6A]"></span>
              </span>
              <div className="absolute inset-0 rounded-2xl border border-dashed border-[#A5FF6A]/10 animate-[spin_12s_linear_infinite]" />
            </div>

            <div className="flex flex-col">
              <h4 className="text-xl font-display font-extrabold text-white tracking-tight uppercase group-hover:text-[#A5FF6A] transition-colors">
                Status
              </h4>
              <span className="text-[10px] font-bold font-mono text-[#A5FF6A] uppercase mt-0.5 tracking-wider">
                Open to Work
              </span>
            </div>
          </div>

          {/* Right Block: Content Details */}
          <div className="flex-1 flex flex-col justify-between gap-5 pl-0 md:pl-4">
            <div className="flex flex-col gap-3">
              {/* Availability & Location Info bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-white/5 pb-3">
                <h3 className="text-lg sm:text-xl font-display font-extrabold text-white tracking-tight uppercase">
                  Available Immediately
                </h3>
                <div className="flex items-center gap-3 text-[10px] font-mono text-white/50">
                  <span className="flex items-center gap-1 text-[#A5FF6A]">
                    <CheckCircle2 size={10} />
                    Immediate Start
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={10} />
                    Remote / Hybrid / On-Site
                  </span>
                </div>
              </div>

              {/* Bullet list of roles targeted */}
              <div className="flex flex-col gap-2 mt-1">
                <span className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-widest">
                  Actively Seeking Roles As
                </span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {["Software Engineer", "Frontend Developer", "Full Stack Developer"].map((role) => (
                    <div 
                      key={role}
                      className="px-3.5 py-1.5 rounded-xl bg-black border border-white/5 text-xs text-white/80 font-mono flex items-center gap-2 group-hover:border-[#A5FF6A]/20 transition-all"
                    >
                      <span className="w-1.5 h-1.5 bg-[#A5FF6A] rounded-full shadow-[0_0_4px_#A5FF6A]" />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action button: Contact link */}
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#FFD93D]/30 hover:bg-[#FFD93D]/5 text-white hover:text-[#FFD93D] font-mono text-[10px] font-bold tracking-wider uppercase transition-all duration-300"
              >
                <span>Initiate Contact</span>
                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

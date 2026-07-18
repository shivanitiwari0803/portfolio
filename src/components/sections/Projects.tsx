"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, GitBranch, X, Award, ShieldAlert, Code2, Globe, FileText, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { EASE_APPLE } from "@/lib/motion";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  github: string;
  live: string;
  highlights: string[];
  challenges: string[];
  solutions: string[];
}

const PROJECTS_DATA: Project[] = [
  {
    id: "arena-ai",
    title: "Arena AI",
    category: "AI LLM Benchmark Platform",
    description: "Built a full-stack AI platform where Mistral and Cohere compete on prompt relevance. Developed an automated 0–10 scoring engine, reducing response latency by 40–60% via parallel API orchestration.",
    longDescription: "Arena AI is a benchmarking platform designed to run LLMs against each other in real-time. By feeding inputs into parallelized backend workers, the platform obtains responses from Mistral AI and Cohere API simultaneously. A custom grading agent parses response tokens, evaluates structure/clarity, and awards scores. It implements stateful JWT authentication, REST API routers, and optimized token streaming.",
    image: "/projects/project_arena.png",
    tags: ["Next.js", "Node.js", "Express.js", "Mistral AI", "Cohere API", "Tailwind CSS"],
    github: "https://github.com/shivanitwr0803",
    live: "https://ai-battle-arena-eta.vercel.app/login",
    highlights: [
      "Engineered automated grading agent, reducing latency by 40-60%.",
      "Orchestrated parallel worker thread routers for real-time model comparisons."
    ],
    challenges: [
      "API response delays when querying multiple LLMs concurrently.",
      "Parsing and structure validation on unstructured LLM response strings.",
      "Rendering streamed text tokens dynamically in React without interface lag."
    ],
    solutions: [
      "Orchestrated parallel worker thread routers, shaving latency down by 40-60%.",
      "Wrote defensive regex evaluation schemas with token safety fallback protocols.",
      "Utilized optimized state hooks and memoized Markdown blocks for fluid DOM rendering."
    ]
  },
  {
    id: "macos-desktop",
    title: "macOS Desktop UI",
    category: "Interactive OS Simulator",
    description: "Developed an interactive macOS-inspired desktop interface using React with a modular component-based architecture. Built over 8 reusable UI components to simulate a desktop environment.",
    longDescription: "Developed an interactive macOS-inspired desktop interface using React with a modular component-based architecture. Built over 8 reusable UI components to simulate a desktop environment. Implemented dynamic behaviors using React Hooks (useState, useEffect) for interactive window management, application launching, navigation, and state handling. Designed responsive layouts using SCSS to ensure smooth usability across desktop, tablet, and mobile devices. Successfully deployed the application on Vercel.",
    image: "/projects/macOs.png",
    tags: ["React", "SCSS", "JavaScript", "Vercel", "Component Architecture", "State Management"],
    github: "https://github.com/shivanitwr0803",
    live: "https://mac-os-phi-eight.vercel.app/",
    highlights: [
      "Simulated desktop window manager with focus indices and overlays.",
      "Engineered 8+ reusable custom window and dock components."
    ],
    challenges: [
      "Simulating multiple overlapping workspace window frames dynamically in DOM.",
      "Achieving responsive scaling and draggable layout limits in React.",
      "Structuring clean SCSS imports and variable sheets for standard styling."
    ],
    solutions: [
      "Orchestrated global window focus stacks and active layout indices dynamically in React state.",
      "Calculated responsive client limits and boundaries for interactive window positioning.",
      "Configured nested utility variables, design tokens, and modular SCSS styles."
    ]
  },
 
];

// Return clean professional labels
const getProjectLabel = (id: string): string => {
  const map: Record<string, string> = {
    "arena-ai": "AI & Full Stack",
    "macos-desktop": "Frontend & UI Design",
    "y2-solar": "Production SaaS Platform"
  };
  return map[id] || "Featured Project";
};

// Retrieve official tech logos with their exact brand coloring
const getBadgeLogo = (tag: string) => {
  const lower = tag.toLowerCase();
  if (lower.includes("react")) {
    return (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-3.5 h-3.5 mr-1.5 inline-block">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }
  if (lower.includes("next")) {
    return (
      <svg viewBox="0 0 180 180" className="w-3.5 h-3.5 mr-1.5 bg-black rounded-full inline-block" fill="none">
        <circle cx="90" cy="90" r="90" fill="#000" />
        <path d="M149.508 157.52L69.142 54H54v72h12.142V67.086l71.493 91.821" fill="#FFF" />
        <rect x="115" y="54" width="12" height="72" fill="#FFF" />
      </svg>
    );
  }
  if (lower.includes("tailwind")) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 mr-1.5 inline-block" fill="#06B6D4">
        <path d="M12 6.094c-2.932 0-4.887 1.466-5.864 4.398 1.466-1.955 3.176-2.688 5.13-2.199 1.116.28 1.913 1.09 2.796 1.988 1.44 1.467 3.109 3.167 6.634 3.167 2.933 0 4.888-1.467 5.865-4.399-1.467 1.955-3.177 2.688-5.131 2.199-1.116-.28-1.913-1.09-2.796-1.988-1.44-1.467-3.109-3.167-6.634-3.167zm-12 5.864c-2.933 0-4.888 1.467-5.865 4.399 1.467-1.955 3.177-2.688 5.13-2.199 1.117.28 1.914 1.09 2.797 1.988 1.44 1.467 3.11 3.167 6.634 3.167 2.933 0 4.888-1.467 5.865-4.399-1.467 1.955-3.177 2.688-5.131 2.199-1.116-.28-1.913-1.09-2.796-1.988-1.44-1.467-3.11-3.167-6.634-3.167z" />
      </svg>
    );
  }
  if (lower.includes("supabase")) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 mr-1.5 inline-block" fill="#3ECF8E">
        <path d="M21.36 10.45a1.5 1.5 0 00-1.3-1.45L13.78 8.4l3.14-6.3a1.5 1.5 0 00-2.34-1.8l-10.9 10.9a1.5 1.5 0 001.3 2.45h6.28l-3.14 6.3a1.5 1.5 0 002.34 1.8l10.9-10.9a1.5 1.5 0 00.1-1.39z" />
      </svg>
    );
  }
  if (lower.includes("node")) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 mr-1.5 inline-block" fill="#339933">
        <path d="M12 1.482L1.758 7.397v11.828L12 25.138l10.242-5.913V7.397L12 1.482zm8.814 16.574l-8.814 5.088-8.814-5.088V7.934l8.814-5.088 8.814 5.088v10.122zM12 4.417c-4.188 0-7.583 3.396-7.583 7.583s3.396 7.583 7.583 7.583 7.583-3.396 7.583-7.583c0-4.187-3.395-7.583-7.583-7.583zm0 12.639c-2.792 0-5.056-2.264-5.056-5.056S9.208 6.944 12 6.944s5.056 2.264 5.056 5.056-2.264 5.056-5.056 5.056z" />
      </svg>
    );
  }
  return null;
};

// Scroll trigger counter ticker component
const Counter = ({ value, duration = 1000 }: { value: number; duration?: number }) => {
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

  return <span ref={elementRef}>{Math.floor(count)}</span>;
};

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    
    el.style.setProperty("--shine-x", `${percentX}%`);
    el.style.setProperty("--shine-y", `${percentY}%`);

    // Subtle 3D Tilt: limit max tilt to 2 degrees
    const rotateX = -(y / rect.height - 0.5) * 4;
    const rotateY = (x / rect.width - 0.5) * 4;
    
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  const label = getProjectLabel(project.id);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card-wrapper relative select-none transition-transform duration-500 ease-out h-full"
    >
      {/* Premium Spacious Horizontal Grid Card */}
      <div className="relative rounded-3xl bg-[#171717]/90 border border-white/5 p-6 flex flex-col justify-between h-full min-h-[490px] group hover:border-[#FFD93D]/30 shadow-xl hover:shadow-[0_12px_40px_rgba(255,217,61,0.06)] transform-gpu transition-all duration-300">
        
        {/* Holographic foil overlay */}
        <div className="holo-shine absolute inset-0 rounded-3xl pointer-events-none z-30" />

        {/* Card Artwork Hero Frame (occupies top ~45%) */}
        <div className="relative w-full h-[210px] rounded-2xl overflow-hidden bg-black border border-white/5 group-hover:border-[#FFD93D]/25 transition-colors shadow-inner">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover scale-100 group-hover:scale-103 transition-transform duration-700 ease-out z-10 filter brightness-90 group-hover:brightness-100"
            loading="lazy"
          />
        </div>

        {/* Project Details Section */}
        <div className="flex flex-col gap-3.5 mt-4 flex-1">
          {/* Header metadata row */}
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-[10px] font-bold font-mono text-[#FFD93D] uppercase tracking-wider bg-[#FFD93D]/10 border border-[#FFD93D]/25 px-2.5 py-0.5 rounded-md">
              {label}
            </span>
            <span className="text-[10px] font-bold font-mono text-white/30 uppercase tracking-widest">
              {project.category.split(" ")[0]}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight uppercase group-hover:text-[#FFD93D] transition-colors text-left">
            {project.title}
          </h3>

          {/* One line description */}
          <p className="text-xs sm:text-sm text-[#9E9E9E] leading-relaxed font-light text-left line-clamp-2">
            {project.description}
          </p>

          {/* Key Bullet Highlights */}
          <ul className="flex flex-col gap-1.5 text-xs text-white/70 leading-relaxed font-light text-left list-none pt-1">
            {project.highlights.map((hl, idx) => (
              <li key={idx} className="flex gap-2 items-start">
                <span className="w-1 h-1 bg-[#FFD93D] rounded-full mt-1.5 shrink-0" />
                <span>{hl}</span>
              </li>
            ))}
          </ul>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-white/5">
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-bold text-white/70 bg-white/5 border border-white/5 rounded-full px-2.5 py-0.5 font-mono uppercase flex items-center"
              >
                {getBadgeLogo(tag)}
                {tag}
              </span>
            ))}
            {project.tags.length > 5 && (
              <span className="text-[9px] font-bold text-[#FFD93D] bg-[#FFD93D]/5 border border-[#FFD93D]/10 rounded-full px-2.5 py-0.5 font-mono uppercase">
                +{project.tags.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Card Interactive Footer Controls */}
        <div className="flex gap-2.5 w-full mt-5 select-none z-10">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#FFD93D] text-black font-mono font-bold text-[10px] tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_12px_rgba(255,217,61,0.4)]"
          >
            <ExternalLink size={11} />
            <span>Live Demo</span>
          </a>
          
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono font-bold text-[10px] tracking-wider uppercase transition-all duration-300 hover:border-[#FFD93D]/30 hover:bg-white/[0.08]"
          >
            <GitBranch size={11} />
            <span>GitHub</span>
          </a>

          <button
            onClick={onOpen}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#FFD93D] font-mono font-bold text-[10px] tracking-wider uppercase transition-all duration-300 hover:border-[#FFD93D]/30 hover:bg-white/[0.08]"
          >
            <FileText size={11} />
            <span>Case Study</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        /* Holographic foil glare overlay */
        .holo-shine {
          background: linear-gradient(
            115deg,
            transparent 20%,
            rgba(255, 217, 61, 0.08) 35%,
            rgba(79, 195, 247, 0.08) 48%,
            rgba(255, 255, 255, 0.12) 55%,
            rgba(79, 195, 247, 0.08) 62%,
            rgba(255, 217, 61, 0.08) 75%,
            transparent 90%
          );
          background-size: 200% 200%;
          mix-blend-mode: color-dodge;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .project-card-wrapper:hover .holo-shine {
          opacity: 0.75;
          background-position: var(--shine-x, 50%) var(--shine-y, 50%);
        }
      `}</style>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section 
      id="projects" 
      className="py-28 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full select-none relative overflow-hidden"
    >
      {/* Glowing radial light behind grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFD93D]/2 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Section Header */}
      <div className="flex flex-col gap-2.5 mb-12 text-left relative z-10">
        <span className="text-xs font-semibold tracking-widest text-[#FFD93D] uppercase font-mono">
          04 / Projects
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white uppercase">
          Collectible Projects.
        </h2>
      </div>

      {/* Compact Project Stats Row */}
      

      {/* Projects Grid Layout - Redesigned to 2-column landscape grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mr-auto relative z-10">
        {PROJECTS_DATA.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onOpen={() => setSelectedProject(project)}
          />
        ))}

        {/* 4. More Projects Coming Soon Premium CTA Card */}
        <div className="project-card-wrapper relative select-none h-full">
          <div className="relative rounded-3xl bg-[#171717]/85 border border-white/5 hover:border-[#FFD93D]/30 p-6 flex flex-col justify-between h-full min-h-[490px] group transition-all duration-300 transform-gpu hover:shadow-[0_12px_40px_rgba(255,217,61,0.06)] hover:-translate-y-2 hover:rotate-[0.5deg]">
            {/* Ambient gold glow inside card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD93D]/1 rounded-full blur-[30px] pointer-events-none" />
            
            {/* Card Artwork Hero Frame: Spinning gear and progress */}
            <div className="relative w-full h-[210px] rounded-2xl overflow-hidden bg-black/60 border border-white/5 flex flex-col items-center justify-center p-4 text-center">
              {/* Floating constellation dot background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,217,61,0.03)_1.5px,transparent_1.5px)] bg-[size:16px_16px] pointer-events-none" />

              {/* Spinning gear vector icon */}
              <div className="relative w-14 h-14 text-[#FFD93D] animate-spin-slow mb-2.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>

              <div className="flex flex-col gap-1 w-full mt-1.5">
                <span className="text-[10px] font-bold font-mono text-[#FFD93D] uppercase tracking-widest bg-[#FFD93D]/10 border border-[#FFD93D]/25 px-2.5 py-0.5 rounded-md mx-auto">
                  Currently Building
                </span>
                <span className="text-xs font-semibold text-white/95 mt-1.5">
                  AI Agents &amp; Optimization
                </span>
              </div>

              {/* Charging progress bar indicator */}
              <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden mt-4 relative border border-white/5">
                <div className="h-full bg-gradient-to-r from-[#FFD93D] to-[#4FC3F7] animate-progress-loading" />
              </div>
            </div>

            {/* Description block */}
            <div className="flex flex-col gap-3 mt-4 flex-1">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[10px] font-bold font-mono text-white/30 uppercase tracking-widest">
                  Future Releases
                </span>
                <span className="text-[10px] text-[#FFD93D] animate-pulse">●</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight uppercase group-hover:text-[#FFD93D] transition-colors text-left">
                More Projects Coming Soon
              </h3>
              <p className="text-xs sm:text-sm text-[#9E9E9E] leading-relaxed font-light text-left">
                I&apos;m continuously building production-ready applications in AI, Full Stack Development, modern frontend engineering, and interactive web experiences. New projects are currently in development and will be added soon.
              </p>
            </div>

            {/* Card Footer */}
            <div className="border-t border-white/5 pt-3 mt-5 flex justify-between items-center text-[8px] font-mono text-white/30 uppercase">
              <span>Next Release: Loading...</span>
              <span className="text-[#FFD93D] flex items-center">
                <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-current">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes progress-loading {
          0% { width: 0%; }
          50% { width: 85%; }
          100% { width: 100%; }
        }
        .animate-progress-loading {
          animation: progress-loading 3s infinite ease-in-out;
          width: 0%;
        }

        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>


      {/* Expanded Modal Overlay Detail Case Study */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto"
          >
            {/* Modal Body */}
            <motion.div
              layoutId={`modal-${selectedProject.id}`}
              initial={{ scale: 0.94, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 15 }}
              transition={{ duration: 0.5, ease: EASE_APPLE }}
              className="relative w-full max-w-3xl rounded-[2.5rem] bg-[#111111] border border-white/5 shadow-2xl p-6 sm:p-10 my-8 overflow-hidden text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-[#FFD93D]/30 transition-all cursor-pointer z-[100]"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              {/* Glowing Background Radial */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD93D]/2 rounded-full blur-[80px] pointer-events-none" />

              <div className="flex flex-col gap-6 relative">
                {/* Meta details */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold font-mono tracking-widest text-[#FFD93D] uppercase px-3 py-1 rounded bg-[#FFD93D]/10 border border-[#FFD93D]/25">
                    {getProjectLabel(selectedProject.id)}
                  </span>
                  <span className="text-[10px] font-bold font-mono tracking-wide text-white/40 uppercase">
                    {selectedProject.category}
                  </span>
                </div>

                {/* Main title */}
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight uppercase border-b border-white/5 pb-4">
                  {selectedProject.title}
                </h3>

                {/* Sub-grid: Stats Box & Description */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Tech Specs (col-span-4) */}
                  <div className="col-span-12 md:col-span-4 rounded-2xl bg-black/40 border border-white/5 p-5 flex flex-col gap-4 text-xs font-mono">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest border-b border-white/5 pb-2">Technical Specs</span>
                    
                    <div className="flex justify-between">
                      <span className="text-white/40">Complexity</span>
                      <span className="text-[#FFD93D] font-bold">Advanced</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-white/40">Trainer Status</span>
                      <span className="text-[#A5FF6A] font-bold">Deployed</span>
                    </div>

                    {/* Tech badging */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="text-[8px] font-bold text-white/60 bg-white/5 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Case study details (col-span-8) */}
                  <div className="col-span-12 md:col-span-8 flex flex-col gap-4 text-sm sm:text-base text-[#9E9E9E] font-light leading-relaxed">
                    <p className="font-semibold text-white">Project Overview</p>
                    <p>{selectedProject.longDescription}</p>
                  </div>
                </div>

                {/* Challenge & Solution Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-6 mt-2">
                  {/* Challenges card */}
                  <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col gap-3">
                    <span className="text-xs font-mono font-bold text-[#E53935] flex items-center gap-1.5 uppercase">
                      <ShieldAlert size={14} />
                      Key Challenges
                    </span>
                    <ul className="flex flex-col gap-2.5 text-xs text-[#9E9E9E] list-disc pl-4 font-light">
                      {selectedProject.challenges.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Solutions card */}
                  <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col gap-3">
                    <span className="text-xs font-mono font-bold text-[#A5FF6A] flex items-center gap-1.5 uppercase">
                      <Award size={14} />
                      Implemented Solutions
                    </span>
                    <ul className="flex flex-col gap-2.5 text-xs text-[#9E9E9E] list-disc pl-4 font-light">
                      {selectedProject.solutions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/5">
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFD93D] text-black text-xs font-semibold hover:bg-[#ffe17d] transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(255,217,61,0.3)]"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:text-[#FFD93D] hover:border-[#FFD93D]/30 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <GitBranch size={13} />
                    Repository
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, GitBranch, X, Award, ShieldAlert, Cpu } from "lucide-react";
import Image from "next/image";
import { EASE_APPLE, SPRING_SMOOTH } from "@/lib/motion";

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
  rarity: "Legendary" | "Secret Rare" | "Holo Rare";
  difficulty: number; // 1 to 5
  hp: number; // power level
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
    rarity: "Legendary",
    difficulty: 5,
    hp: 9900,
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
    rarity: "Holo Rare",
    difficulty: 4,
    hp: 9200,
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
  }
];

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert to percentages
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    
    el.style.setProperty("--shine-x", `${percentX}%`);
    el.style.setProperty("--shine-y", `${percentY}%`);

    // Calculate rotation (-8deg to 8deg)
    const rotateX = -(y / rect.height - 0.5) * 12;
    const rotateY = (x / rect.width - 0.5) * 12;
    
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onOpen}
      className="project-card-wrapper relative cursor-pointer select-none transition-transform duration-500 ease-out"
    >
      {/* Collectible Portrait Card */}
      <div className="relative rounded-3xl bg-[#171717] border-2 border-[#FFD93D]/30 p-5 flex flex-col gap-4 overflow-hidden group hover:border-[#FFD93D] shadow-xl hover:shadow-[0_0_30px_rgba(255,217,61,0.15)] transform-gpu">
        
        {/* Holographic foil overlay */}
        <div className="holo-shine absolute inset-0 rounded-3xl pointer-events-none z-30" />

        {/* Card Header: Rarity + HP */}
        <div className="flex justify-between items-baseline border-b border-[#FFD93D]/20 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-extrabold font-mono text-[#FFD93D] uppercase tracking-wider">
              {project.rarity} Card
            </span>
            <span className="text-[9px] text-[#FFD93D]">★</span>
          </div>
          <span className="text-sm font-extrabold font-mono text-white">
            {project.hp} <span className="text-[#FFD93D] text-xs">HP</span>
          </span>
        </div>

        {/* Card Artwork Frame */}
        <div className="relative w-full h-[180px] rounded-xl overflow-hidden bg-black border border-white/5 relative group-hover:border-[#FFD93D]/25 transition-colors">
          {/* Subtle lightning flashing over card image */}
          <div className="absolute inset-0 bg-[#FFD93D]/5 opacity-0 group-hover:opacity-100 z-20 pointer-events-none transition-opacity duration-300" />
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out z-10"
          />
        </div>

        {/* Project Details */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-display font-extrabold text-white tracking-tight uppercase group-hover:text-[#FFD93D] transition-colors">
              {project.title}
            </h3>
            
            {/* Stars rating representing complexity */}
            <div className="flex text-[#FFD93D] text-[9px] gap-0.5 font-mono">
              {"★".repeat(project.difficulty)}
              {"☆".repeat(5 - project.difficulty)}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#9E9E9E] leading-relaxed font-light line-clamp-3">
            {project.description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mt-1">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-bold text-white/70 bg-white/5 border border-white/5 rounded-full px-2.5 py-0.5 font-mono uppercase"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="text-[9px] font-bold text-[#FFD93D] bg-[#FFD93D]/5 border border-[#FFD93D]/10 rounded-full px-2 py-0.5 font-mono">
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Footer controls inside card */}
        <div className="flex justify-between items-center pt-3 border-t border-white/5 mt-2 z-10">
          <span className="text-[9px] font-mono text-[#9E9E9E]/80 uppercase">
            Click to evolve Case Study
          </span>
          <span className="text-xs text-[#FFD93D] group-hover:translate-x-1 transition-transform">
            ▶
          </span>
        </div>
      </div>

      <style jsx>{`
        /* Holographic foil glare overlay */
        .holo-shine {
          background: linear-gradient(
            115deg,
            transparent 20%,
            rgba(255, 217, 61, 0.12) 35%,
            rgba(79, 195, 247, 0.12) 48%,
            rgba(255, 255, 255, 0.18) 55%,
            rgba(79, 195, 247, 0.12) 62%,
            rgba(255, 217, 61, 0.12) 75%,
            transparent 90%
          );
          background-size: 200% 200%;
          mix-blend-mode: color-dodge;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .project-card-wrapper:hover .holo-shine {
          opacity: 0.9;
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
      className="py-28 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full select-none"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-2.5 mb-16 text-left">
        <span className="text-xs font-semibold tracking-widest text-[#FFD93D] uppercase font-mono">
          04 / Portfolio
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white uppercase">
          Collectible Projects.
        </h2>
      </div>

      {/* Projects Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {PROJECTS_DATA.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onOpen={() => setSelectedProject(project)}
          />
        ))}

        {/* 4. More Projects Coming Soon CTA Card */}
        <div className="project-card-wrapper relative select-none">
          <div className="relative rounded-3xl bg-[#171717]/85 border-2 border-white/5 hover:border-[#FFD93D]/30 p-5 flex flex-col justify-between h-full min-h-[380px] group transition-all duration-300 transform-gpu hover:shadow-[0_0_30px_rgba(255,217,61,0.12)]">
            {/* Ambient gold glow inside card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD93D]/1 rounded-full blur-[30px] pointer-events-none" />
            
            {/* Card Header */}
            <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
              <span className="text-[10px] font-extrabold font-mono text-[#FFD93D] uppercase tracking-wider">
                Future Releases
              </span>
              <span className="text-[9px] text-[#FFD93D]">✨</span>
            </div>

            {/* Currently Building animation placeholder block */}
            <div className="my-3 relative w-full h-[150px] rounded-xl overflow-hidden bg-black/60 border border-white/5 flex flex-col items-center justify-center p-4 text-center">
              {/* Spinning gear vector icon */}
              <div className="relative w-12 h-12 text-[#FFD93D] animate-spin-slow mb-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>

              <div className="flex flex-col gap-1 w-full mt-1">
                <span className="text-[9px] font-bold font-mono text-white/40 uppercase tracking-widest">
                  Currently Building
                </span>
                <span className="text-xs font-semibold text-white/90 truncate">
                  AI Agents &amp; Optimization
                </span>
              </div>

              {/* Charging progress bar indicator */}
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-3 relative">
                <div className="h-full bg-gradient-to-r from-[#FFD93D] to-[#4FC3F7] animate-progress-loading" />
              </div>
            </div>

            {/* Description block */}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg sm:text-xl font-display font-extrabold text-white tracking-tight uppercase group-hover:text-[#FFD93D] transition-colors">
                🚀 More Projects Coming Soon
              </h3>
              <p className="text-xs text-[#9E9E9E] leading-relaxed font-light">
                I&apos;m continuously building new products, experimenting with AI, frontend interactions, and full-stack applications. Stay tuned.
              </p>
            </div>

            {/* Card Footer */}
            <div className="border-t border-white/5 pt-3 mt-3 flex justify-between items-center text-[8px] font-mono text-white/30 uppercase">
              <span>Next Release: Loading...</span>
              <span className="text-[#FFD93D] animate-pulse">●</span>
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
                    {selectedProject.rarity}
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
                  
                  {/* Left Column: Combat Specs (col-span-4) */}
                  <div className="col-span-12 md:col-span-4 rounded-2xl bg-black/40 border border-white/5 p-5 flex flex-col gap-4 text-xs font-mono">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest border-b border-white/5 pb-2">Arena Specs</span>
                    
                    <div className="flex justify-between">
                      <span className="text-white/40">Difficulty</span>
                      <span className="text-[#FFD93D] font-bold">{"★".repeat(selectedProject.difficulty)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-white/40">Power Rating</span>
                      <span className="text-white font-bold">{selectedProject.hp} HP</span>
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
                      Battle Challenges
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
                      Tactical Solutions
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

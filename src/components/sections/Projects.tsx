"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { EASE_APPLE, SPRING_SMOOTH } from "@/lib/motion";

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  live: string;
}

const PROJECTS_DATA: Project[] = [
  {
    title: "Arena AI",
    category: "AI Model Comparison Platform",
    description: "Built a full-stack AI platform where Mistral and Cohere compete on the same prompt with real-time responses. Developed an automated 0–10 scoring engine evaluating relevance, accuracy, and clarity, with intelligent winner selection. Reduced response latency by 40–60% through parallel API orchestration, achieving 1–3 second response times.",
    image: "/project_arena.png",
    tags: ["Next.js", "React", "Node.js", "Express.js", "Mistral AI", "Cohere API", "Tailwind CSS", "Vercel"],
    github: "https://github.com/shivanitwr0803",
    live: "https://ai-battle-arena-eta.vercel.app/login",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, SPRING_SMOOTH);
  const mouseYSpring = useSpring(y, SPRING_SMOOTH);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-6, 6]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coords relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.0, ease: EASE_APPLE }}
      className="group relative flex flex-col md:grid md:grid-cols-12 gap-8 p-6 md:p-8 rounded-3xl glass-panel hover:border-white/10 transition-colors duration-500 cursor-pointer overflow-hidden"
    >
      {/* Ambient background glow inside card */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/[0.015] pointer-events-none" />

      {/* Image Showcase (Col span 5) */}
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="col-span-12 md:col-span-5 relative w-full h-[240px] md:h-[300px] rounded-2xl overflow-hidden bg-surface-primary border border-white/5"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-w-768px) 100vw, 40vw"
          className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      {/* Project Details (Col span 7) */}
      <div 
        style={{ transform: "translateZ(20px)" }}
        className="col-span-12 md:col-span-7 flex flex-col justify-between py-2"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-accent tracking-wider uppercase font-mono">
              {project.category}
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white transition-colors duration-300">
              {project.title}
            </h3>
          </div>
          <p className="text-sm md:text-base text-text-muted leading-relaxed font-light">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold text-white/70 bg-white/5 border border-white/5 rounded-full px-3 py-1 font-mono uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/5">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold text-white hover:text-accent transition-colors duration-300"
          >
            <ExternalLink size={14} />
            Live Preview
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-white transition-colors duration-300"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            Repository
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-8 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto w-full select-none">
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-16">
        <span className="text-xs font-semibold tracking-wider text-accent uppercase">04 / Portfolio</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
          Selected works &amp; case studies.
        </h2>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-10">
        {PROJECTS_DATA.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

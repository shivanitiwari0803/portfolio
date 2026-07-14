"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Layout, Server, Cpu, Database, Sparkles, Code2, GitBranch, Terminal, Wind, Activity } from "lucide-react";
import Matter from "matter-js";
import { EASE_APPLE } from "@/lib/motion";

interface SkillItem {
  name: string;
  level: number; // 0-100
}

interface SkillCategory {
  title: string;
  shortTitle: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Languages & Frontend",
    shortTitle: "Frontend",
    icon: <Layout size={20} className="text-accent" />,
    skills: [
      { name: "JavaScript (ES6+) / TypeScript", level: 92 },
      { name: "React.js / Next.js", level: 95 },
      { name: "Tailwind CSS / SCSS", level: 98 },
      { name: "Three.js / WebGL", level: 85 },
      { name: "Python / Java / C", level: 80 },
      { name: "Responsive Web Design", level: 95 },
    ],
  },
  {
    title: "Backend & Databases",
    shortTitle: "Backend",
    icon: <Server size={20} className="text-white/60" />,
    skills: [
      { name: "Node.js / Express.js", level: 88 },
      { name: "REST APIs Development", level: 90 },
      { name: "Authentication (JWT)", level: 88 },
      { name: "Supabase / PostgreSQL", level: 88 },
      { name: "MongoDB / Mongoose", level: 85 },
    ],
  },
  {
    title: "AI, Tools & Optimization",
    shortTitle: "AI & Tools",
    icon: <Cpu size={20} className="text-accent" />,
    skills: [
      { name: "AI & LLM Integration (OpenAI, Cohere)", level: 88 },
      { name: "Mistral AI / Prompt Engineering", level: 85 },
      { name: "Git / GitHub / VS Code", level: 90 },
      { name: "Vercel / Render / Postman", level: 88 },
      { name: "SEO & Core Web Vitals Optimization", level: 90 },
      { name: "Performance & API Optimization", level: 88 },
    ],
  },
];

const PLAYGROUND_SKILLS = [
  { name: "React", icon: <Layout size={14} />, color: "bg-sky-500/10 text-sky-400 border border-sky-500/20" },
  { name: "Next.js", icon: <Sparkles size={14} />, color: "bg-white/10 text-white border border-white/20" },
  { name: "TypeScript", icon: <Code2 size={14} />, color: "bg-blue-500/10 text-blue-400 border border-blue-500/20" },
  { name: "JavaScript", icon: <Code2 size={14} />, color: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" },
  { name: "Node.js", icon: <Server size={14} />, color: "bg-green-500/10 text-green-400 border border-green-500/20" },
  { name: "Express", icon: <Terminal size={14} />, color: "bg-gray-500/10 text-gray-400 border border-gray-500/20" },
  { name: "MongoDB", icon: <Database size={14} />, color: "bg-emerald-600/10 text-emerald-300 border border-emerald-600/20" },
  { name: "PostgreSQL", icon: <Database size={14} />, color: "bg-blue-600/10 text-blue-300 border border-blue-600/20" },
  { name: "Docker", icon: <Cpu size={14} />, color: "bg-sky-600/10 text-sky-300 border border-sky-600/20" },
  { name: "Tailwind", icon: <Wind size={14} />, color: "bg-teal-500/10 text-teal-400 border border-teal-500/20" },
  { name: "GSAP", icon: <Activity size={14} />, color: "bg-green-600/10 text-green-300 border border-green-600/20" },
  { name: "Framer Motion", icon: <Activity size={14} />, color: "bg-pink-500/10 text-pink-400 border border-pink-500/20" },
  { name: "Three.js", icon: <Cpu size={14} />, color: "bg-purple-500/10 text-purple-400 border border-purple-500/20" },
  { name: "Git", icon: <GitBranch size={14} />, color: "bg-orange-500/10 text-orange-400 border border-orange-500/20" },
  { name: "GitHub", icon: <GitBranch size={14} />, color: "bg-white/5 text-white/90 border border-white/10" },
  { name: "Supabase", icon: <Database size={14} />, color: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playgroundRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE_APPLE },
    },
  };

  // Matter.js Physics Engine setup
  useEffect(() => {
    const playArea = playgroundRef.current;
    if (!playArea) return;

    const width = playArea.clientWidth;
    const height = playArea.clientHeight;

    // 1. Create Engine & World
    const engine = Matter.Engine.create({
      gravity: { y: 0.8, x: 0 },
    });

    const world = engine.world;

    // 2. Create Boundaries (Static rigid walls)
    // No solid ceiling inside the container, or place the ceiling much higher (e.g. -200px) so items can drop in
    const wallOptions = { isStatic: true, restitution: 0.5 };
    const ground = Matter.Bodies.rectangle(width / 2, height + 30, width * 2, 60, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-30, height / 2, 60, height * 2, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 30, height / 2, 60, height * 2, wallOptions);
    const ceiling = Matter.Bodies.rectangle(width / 2, -150, width * 2, 60, wallOptions);

    Matter.Composite.add(world, [ground, leftWall, rightWall, ceiling]);

    // 3. Create Rigid Bodies for each card item
    const bodies: Matter.Body[] = [];
    const cardElements = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);

    cardElements.forEach((el, idx) => {
      // Dimensions
      const elWidth = el.offsetWidth || 120;
      const elHeight = el.offsetHeight || 42;

      // Spawn scattered INSIDE the upper viewport of the container (so they are visible and drop down)
      const x = Math.random() * (width - elWidth - 40) + elWidth / 2 + 20;
      const y = Math.random() * (height / 2 - elHeight - 20) + elHeight / 2 + 20;

      const body = Matter.Bodies.rectangle(x, y, elWidth, elHeight, {
        restitution: 0.6, // bounciness
        friction: 0.1,
        frictionAir: 0.015,
        angle: (Math.random() - 0.5) * 0.4, // slight rotation angle
      });

      bodies.push(body);
      el.style.position = "absolute";
      el.style.left = "0px";
      el.style.top = "0px";
      el.style.transformOrigin = "center center";
    });

    Matter.Composite.add(world, bodies);

    // 4. Add Mouse Control Constraint
    const mouse = Matter.Mouse.create(playArea);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.15,
        render: { visible: false },
      },
    });

    Matter.Composite.add(world, mouseConstraint);

    // 5. Run the Runner & Engine
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // 6. Sync DOM element positions with physics bodies
    Matter.Events.on(engine, "afterUpdate", () => {
      bodies.forEach((body, idx) => {
        const el = cardElements[idx];
        if (!el) return;

        const elWidth = el.offsetWidth || 120;
        const elHeight = el.offsetHeight || 42;

        const x = body.position.x - elWidth / 2;
        const y = body.position.y - elHeight / 2;

        // Apply hardware-accelerated transforms
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${body.angle}rad)`;
      });
    });

    // Handle Resize
    const handleResize = () => {
      const newWidth = playArea.clientWidth;
      const newHeight = playArea.clientHeight;

      // Update static walls
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 30 });
      Matter.Body.setPosition(rightWall, { x: newWidth + 30, y: newHeight / 2 });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      Matter.Composite.clear(world, false);
    };
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-24 px-8 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto w-full select-none"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-16">
        <span className="text-xs font-semibold tracking-wider text-accent uppercase">
          02 / Capabilities
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
          Tools, technologies &amp; crafts.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Interactive Skills Progress Panels (Col span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Category Tabs */}
          <div className="flex border-b border-white/5 pb-2 gap-4">
            {SKILLS_DATA.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(idx)}
                className={`pb-2 text-sm font-semibold tracking-wide transition-all duration-300 relative ${
                  activeCategory === idx ? "text-accent" : "text-text-muted hover:text-white"
                }`}
              >
                {category.shortTitle}
                {activeCategory === idx && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Structured Progress Bars */}
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {SKILLS_DATA[activeCategory].skills.map((skill, idx) => (
              <motion.div key={skill.name} variants={itemVariants} className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/80 font-medium">{skill.name}</span>
                  <span className="text-accent font-mono text-xs">{skill.level}%</span>
                </div>
                <div className="w-full h-[4px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.2, ease: EASE_APPLE }}
                    className="h-full bg-accent rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right: Physics/Drag Playground Canvas (Col span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-white">Skills Playground</h3>
            <p className="text-xs text-text-muted">Drag, throw, and watch them bounce in real physics!</p>
          </div>

          <div
            ref={playgroundRef}
            className="relative w-full h-[400px] bg-surface-secondary border border-white/5 rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing shadow-inner"
          >
            {/* Ambient Background Grid inside playground */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

            {/* Matter.js Physics Draggable Cards */}
            {PLAYGROUND_SKILLS.map((skill, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold shadow-lg flex items-center gap-2 select-none border will-change-transform ${skill.color}`}
              >
                {skill.icon}
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

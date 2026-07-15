"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ArrowDown, 
  Zap,
  Globe 
} from "lucide-react";
import Matter from "matter-js";
import { skillsData, mobileSkillsSubset, SkillItem } from "@/data/skillsData";
import { SkillsPhysics } from "@/lib/SkillsPhysics";
import { PhysicsRenderer } from "@/lib/PhysicsRenderer";
import { SkillCard } from "@/components/ui/SkillCard";

export default function SkillsPlayground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardElementsRef = useRef<Map<string, HTMLDivElement>>(new Map());

  // React state for controls (only triggers on user click, never in game loop)
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [gravityEnabled, setGravityEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [renderedSkills, setRenderedSkills] = useState<SkillItem[]>([]);

  // Mutable refs for engine state and reference safety
  const physicsRef = useRef<SkillsPhysics | null>(null);
  const rendererRef = useRef<PhysicsRenderer | null>(null);
  
  const isMutedRef = useRef(isMuted);
  const activeCardIdsRef = useRef<Set<string>>(new Set());

  // Synth Audio Pop
  const playCollisionSound = useCallback((speed: number) => {
    if (isMutedRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      const baseFreq = 150 + Math.random() * 80;
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(65, ctx.currentTime + 0.14);

      const volume = Math.min(0.2, (speed - 2.0) * 0.045);
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    } catch (e) {
      console.warn("Audio Context blocked:", e);
    }
  }, []);

  // Phase 1: Viewport detection and initial skills filtering on client mount
  useEffect(() => {
    const mobileMode = window.innerWidth < 768;
    const filtered = mobileMode
      ? skillsData.filter((s) => mobileSkillsSubset.includes(s.id))
      : skillsData;

    requestAnimationFrame(() => {
      setIsMobile(mobileMode);
      setRenderedSkills(filtered);
      activeCardIdsRef.current = new Set(filtered.map((s) => s.id));
    });
  }, []);

  // Phase 2: Initialize sandbox once the DOM elements have mounted and received sizes
  useEffect(() => {
    if (renderedSkills.length === 0) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let physics: SkillsPhysics | null = null;
    let renderer: PhysicsRenderer | null = null;

    const initSandbox = (width: number, height: number) => {
      canvas.width = width;
      canvas.height = height;

      // 1. Create Physics World
      physics = new SkillsPhysics(container, {
        width,
        height,
        isMobile,
        onCollision: (cx, cy, speed, color) => {
          playCollisionSound(speed);
          if (rendererRef.current) {
            rendererRef.current.emitSparks(cx, cy, speed, color);
          }
        },
      });
      physicsRef.current = physics;

      // 2. Measure DOM elements and register physics bodies
      renderedSkills.forEach((skill) => {
        const el = cardElementsRef.current.get(skill.id);
        if (el) {
          const w = el.offsetWidth || 135;
          const h = el.offsetHeight || 44;

          const x = Math.random() * (width - w - 40) + w / 2 + 20;
          const y = -Math.random() * 250 - h;

          physics!.registerCardBody(skill.id, skill.bgColor, x, y, w, h);
        }
      });

      // 3. Create Renderer and Start Animation Loop
      renderer = new PhysicsRenderer(
        physics,
        cardElementsRef.current,
        canvas,
        activeCardIdsRef
      );
      rendererRef.current = renderer;
      renderer.start();
    };

    // Use ResizeObserver to safely initialize only when the container receives layout dimensions
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const entry = entries[0];
      const w = entry.contentRect.width || container.clientWidth;
      const h = entry.contentRect.height || container.clientHeight;

      if (w === 0 || h === 0) return;

      if (!physics) {
        initSandbox(w, h);
      } else {
        canvas.width = w;
        canvas.height = h;
        physics.syncBoundaries(w, h);
      }
    });

    resizeObserver.observe(container);

    const currentCardElements = cardElementsRef.current;

    return () => {
      resizeObserver.disconnect();
      if (renderer) renderer.stop();
      if (physics) physics.destroy();
      rendererRef.current = null;
      physicsRef.current = null;
      currentCardElements.clear();
    };
  }, [renderedSkills, isMobile, playCollisionSound]);

  // UI Event Handlers
  const handleFilterChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    const physics = physicsRef.current;
    if (!physics || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const activeIds = new Set<string>();

    renderedSkills.forEach((skill) => {
      if (categoryId === "all" || skill.category === categoryId) {
        activeIds.add(skill.id);
      }
    });

    activeCardIdsRef.current = activeIds;
    physics.filterBodies(activeIds, width);
  };

  const handleGravityToggle = () => {
    const next = !gravityEnabled;
    setGravityEnabled(next);
    physicsRef.current?.setGravity(next);
  };

  const handleMuteToggle = () => {
    const next = !isMuted;
    setIsMuted(next);
    isMutedRef.current = next;
  };

  const handleReset = () => {
    const physics = physicsRef.current;
    if (!physics || !containerRef.current) return;
    physics.resetPositions(containerRef.current.clientWidth);
  };

  const handleCardDoubleClick = useCallback((id: string) => {
    const physics = physicsRef.current;
    if (!physics || !containerRef.current) return;
    
    // Ensure filters are satisfied and trigger expansion scale
    physics.filterBodies(activeCardIdsRef.current, containerRef.current.clientWidth);
    const body = physics.bodiesMap.get(id);
    if (body) {
      if (body.isExpanded) return;
      body.isExpanded = true;
      const scaleFactor = 1.35;
      Matter.Body.scale(body, scaleFactor, scaleFactor);

      // Radial impulse
      const worldBodies = Matter.Composite.allBodies(physics.world);
      worldBodies.forEach((b) => {
        if (b !== body && !b.isStatic) {
          const dx = b.position.x - body.position.x;
          const dy = b.position.y - body.position.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 185) {
            const force = (185 - dist) * 0.00075 * b.mass;
            const angle = Math.atan2(dy, dx);
            Matter.Body.applyForce(b, b.position, {
              x: Math.cos(angle) * force,
              y: Math.sin(angle) * force,
            });
          }
        }
      });

      setTimeout(() => {
        const activeBody = physicsRef.current?.bodiesMap.get(id);
        if (activeBody && activeBody.isExpanded) {
          Matter.Body.scale(activeBody, 1 / scaleFactor, 1 / scaleFactor);
          activeBody.isExpanded = false;
        }
      }, 700);
    }
  }, []);

  const categories = [
    { id: "all", label: "All Stack" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "ai", label: "AI & LLMs" },
    { id: "tools", label: "Tools" },
  ];

  return (
    <section id="skills" className="py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full select-none">
      <div className="flex flex-col gap-2 mb-12">
        <span className="text-xs font-semibold tracking-wider text-accent uppercase">02 / Capabilities</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">Tools, technologies &amp; crafts.</h2>
      </div>

      <div className="flex flex-col gap-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center border-b border-white/5 pb-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleFilterChange(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  activeCategory === cat.id 
                    ? "text-accent bg-accent/10 border border-accent/20" 
                    : "text-text-muted hover:text-white bg-white/[0.02] border border-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={handleGravityToggle}
              title={gravityEnabled ? "Float mode" : "Gravity mode"}
              className={`p-2 rounded-full border transition-all duration-300 ${
                gravityEnabled 
                  ? "bg-white/[0.02] border-white/10 text-white/70 hover:text-white" 
                  : "bg-accent/15 border-accent/30 text-accent hover:bg-accent/25"
              }`}
            >
              {gravityEnabled ? <ArrowDown size={16} /> : <Globe size={16} className="animate-pulse" />}
            </button>

            <button
              onClick={handleMuteToggle}
              className={`p-2 rounded-full border transition-all duration-300 ${
                isMuted 
                  ? "bg-white/[0.02] border-white/10 text-white/50 hover:text-white" 
                  : "bg-accent/15 border-accent/30 text-accent hover:bg-accent/25"
              }`}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <button onClick={handleReset} className="p-2 rounded-full bg-white/[0.02] border border-white/10 text-white/70 hover:text-white transition-all duration-300">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Sandbox */}
        <div
          ref={containerRef}
          className="relative w-full h-[360px] md:h-[450px] lg:h-[530px] bg-black border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl touch-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.02) 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        >
          {/* Canvas for Particle drawing */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

          {/* Cards */}
          {renderedSkills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              isMobile={isMobile}
              onDoubleClick={handleCardDoubleClick}
              cardRef={(el) => {
                if (el) {
                  cardElementsRef.current.set(skill.id, el);
                } else {
                  cardElementsRef.current.delete(skill.id);
                }
              }}
            />
          ))}

          {/* Prompt overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.01] border border-white/5 backdrop-blur-md text-[10px] md:text-xs text-text-muted pointer-events-none tracking-wider">
            <Zap size={11} className="text-accent" />
            <span>Drag &amp; Throw cards • Double click to expand • Drag fast to shake!</span>
          </div>
        </div>
      </div>
    </section>
  );
}

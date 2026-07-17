"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { SkillItem } from "@/data/skillsData";
import { usePhysics } from "@/hooks/usePhysics";
import { PhysicsCard } from "./PhysicsCard";

interface PhysicsWorldProps {
  skills: SkillItem[];
  isMobile: boolean;
  gravityMode: "earth" | "moon" | "zero";
  magnetMode: boolean;
  shakeTrigger: number;
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  r: number;
  decay: number;
}

export const PhysicsWorld: React.FC<PhysicsWorldProps> = ({
  skills,
  isMobile,
  gravityMode,
  magnetMode,
  shakeTrigger,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardElementsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const sparksRef = useRef<SparkParticle[]>([]);

  // State to track container dimensions for robust initialization
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Active skills lookup set (synchronized with incoming prop list)
  const activeSkillsSetRef = useRef<Set<string>>(new Set(skills.map((s) => s.id)));
  useEffect(() => {
    activeSkillsSetRef.current = new Set(skills.map((s) => s.id));
  }, [skills]);

  // Track if container is in viewport
  const isIntersectingRef = useRef(true);

  // 1. Collision Sparks Emitter
  const handleCollision = useCallback((cx: number, cy: number, speed: number, color: string) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const count = Math.min(10, Math.floor(speed * 2.2));
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = (0.4 + Math.random() * 2.0) * (speed * 0.32);
      sparksRef.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        color,
        alpha: 1.0,
        r: 1.2 + Math.random() * 2.2,
        decay: 0.03 + Math.random() * 0.018,
      });
    }
  }, []);

  // 2. Instantiate physics hook
  const {
    bodiesMapRef,
    registerCard,
    clearSkillsBodies,
    applyShake,
    handleResize,
    pausePhysics,
    resumePhysics,
  } = usePhysics({
    containerRef,
    gravityMode,
    magnetMode,
    onCollision: handleCollision,
  });

  // Trigger shake forces
  useEffect(() => {
    if (shakeTrigger > 0) {
      applyShake();
    }
  }, [shakeTrigger, applyShake]);

  // 3. Sync and Re-initialize physics bodies on category filter change or container resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { width, height } = dimensions;
    if (width === 0 || height === 0) return;

    // A. Clear existing Matter.js bodies
    clearSkillsBodies();

    // B. Re-measure elements and register inside ceiling boundaries
    const initCardBodies = () => {
      skills.forEach((skill) => {
        const el = cardElementsRef.current.get(skill.id);
        if (el) {
          const w = el.offsetWidth || 125;
          const h = el.offsetHeight || 175;

          // Scatter horizontally, spawn safely below the ceiling boundary
          const x = Math.random() * (width - w - 60) + w / 2 + 30;
          const y = 60 + Math.random() * 120; // Dropping inside the viewport

          registerCard(skill.id, x, y, w, h);
        }
      });
    };

    // Wait a brief 60ms tick for React layout update
    const timer = setTimeout(initCardBodies, 60);

    return () => {
      clearTimeout(timer);
    };
  }, [skills, dimensions, clearSkillsBodies, registerCard]);

  // 4. Render Tick Loop (Direct DOM updates + Canvas sparks drawing)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let frameId: number;

    const tick = () => {
      if (!isIntersectingRef.current) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      // Sync active Matter.js body coordinates to card DOM elements
      const activeIds = activeSkillsSetRef.current;
      bodiesMapRef.current.forEach((body, id) => {
        const el = cardElementsRef.current.get(id);
        if (!el) return;

        const isActive = activeIds.has(id);
        if (isActive) {
          const w = el.offsetWidth;
          const h = el.offsetHeight;
          const posX = body.position.x - w / 2;
          const posY = body.position.y - h / 2;

          el.style.transform = `translate3d(${posX}px, ${posY}px, 0) rotate(${body.angle}rad)`;
          el.style.opacity = "1";
          el.style.pointerEvents = "auto";
        } else {
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
        }
      });

      // Draw particle sparks
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const sparks = sparksRef.current;
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      frameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [bodiesMapRef]);

  // 5. Mount Sizing & Viewport Observers
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const entry = entries[0];
      const w = entry.contentRect.width || container.clientWidth;
      const h = entry.contentRect.height || container.clientHeight;

      if (w === 0 || h === 0) return;

      canvas.width = w;
      canvas.height = h;
      setDimensions({ width: w, height: h });
      handleResize(w, h);
    });

    resizeObserver.observe(container);

    const intersectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isIntersectingRef.current = true;
            resumePhysics();
          } else {
            isIntersectingRef.current = false;
            pausePhysics();
          }
        });
      },
      { threshold: 0.05 }
    );

    intersectObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      intersectObserver.disconnect();
    };
  }, [handleResize, pausePhysics, resumePhysics]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[540px] md:h-[620px] rounded-[2.5rem] overflow-hidden shadow-2xl touch-none select-none z-10 battle-arena-container border border-[#FFD93D]/30"
    >
      {/* 1. Battle Arena background grids and overlays */}
      <div className="absolute inset-0 z-0 battle-arena-bg" />
      <div className="absolute inset-0 z-0 bg-radial-glow pointer-events-none" />
      <div className="absolute inset-0 z-0 energy-line pointer-events-none" />

      {/* Canvas for Particle drawing */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* Cards Overlay (Absolute layout, synchronized in tick loop) */}
      {skills.map((skill) => (
        <PhysicsCard
          key={skill.id}
          skill={skill}
          isMobile={isMobile}
          cardRef={(el) => {
            if (el) {
              cardElementsRef.current.set(skill.id, el);
            } else {
              cardElementsRef.current.delete(skill.id);
            }
          }}
        />
      ))}

      <style jsx global>{`
        /* Pokémon Battle Arena aesthetics */
        .battle-arena-container {
          box-shadow: 0 0 35px rgba(255, 217, 61, 0.06), inset 0 0 25px rgba(255, 217, 61, 0.03);
        }

        .battle-arena-bg {
          background-color: #0b0b0b;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        .bg-radial-glow {
          background: radial-gradient(circle at center, rgba(255, 217, 61, 0.03) 0%, rgba(79, 195, 247, 0.02) 50%, transparent 100%);
        }

        /* Scanning energy line */
        .energy-line {
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 217, 61, 0.22), transparent);
          animation: scan-arena 8s linear infinite;
          will-change: transform;
        }

        @keyframes scan-arena {
          0% { transform: translateY(0); }
          100% { transform: translateY(620px); }
        }
      `}</style>
    </div>
  );
};

export default PhysicsWorld;

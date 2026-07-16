"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { SkillItem } from "@/data/skillsData";
import { usePhysics } from "@/hooks/usePhysics";
import { PhysicsCard } from "./PhysicsCard";
import { SkillModal } from "./SkillModal";

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

  // Modal active item state
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

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

  // 3. Sync and Re-initialize physics bodies on category filter change
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // A. Remove all existing bodies from the world to prevent collisions with unmounted cards
    clearSkillsBodies();

    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;

    // B. Re-measure the new card DOM elements and register fresh Matter.js bodies
    const initCardBodies = () => {
      skills.forEach((skill) => {
        const el = cardElementsRef.current.get(skill.id);
        if (el) {
          const w = el.offsetWidth || 112;
          const h = el.offsetHeight || 112;

          // Spawn from random horizontal coordinates above the viewport
          const x = Math.random() * (width - w - 40) + w / 2 + 20;
          const y = -100 - Math.random() * 120; // Drop from above screen

          registerCard(skill.id, x, y, w, h);
        }
      });
    };

    // Wait a brief 50ms tick for React to finish mounting card DOM elements
    const timer = setTimeout(initCardBodies, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [skills, clearSkillsBodies, registerCard]);

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

  // 5. Mount Sizing & Viewport Observers (stable, decoupled from active skills list)
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

  // Open modal on double click
  const handleCardDoubleClick = useCallback((skill: SkillItem) => {
    setSelectedSkill(skill);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[580px] md:h-[650px] bg-black/60 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl touch-none select-none z-10"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.015) 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }}
    >
      {/* Canvas for Particle drawing */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* Cards Overlay (Absolute layout, synchronized in tick loop) */}
      {skills.map((skill) => (
        <PhysicsCard
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

      {/* Double Click Expanded Skill Details Modal */}
      <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
    </div>
  );
};
export default PhysicsWorld;

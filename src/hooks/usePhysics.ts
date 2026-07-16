"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

export interface SkillBody extends Matter.Body {
  skillId: string;
  isExpanded?: boolean;
}

interface UsePhysicsProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  gravityMode: "earth" | "moon" | "zero";
  magnetMode: boolean;
  onCollision: (cx: number, cy: number, speed: number, color: string) => void;
}

export const usePhysics = ({
  containerRef,
  gravityMode,
  magnetMode,
  onCollision,
}: UsePhysicsProps) => {
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  
  // Track active bodies and cards
  const bodiesMapRef = useRef<Map<string, SkillBody>>(new Map());
  const activeIdsRef = useRef<Set<string>>(new Set());

  // Mouse position ref for magnet calculations
  const mousePosRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 650;

    // 1. Create Engine with sleeping enabled to save CPU cycles when cards settle
    const engine = Matter.Engine.create({
      enableSleeping: true,
      gravity: { y: gravityMode === "earth" ? 0.75 : gravityMode === "moon" ? 0.16 : 0, x: 0 },
    });
    engineRef.current = engine;
    const world = engine.world;

    // 2. Create boundaries (invisible walls)
    const wallThickness = 100;
    const offset = wallThickness / 2;

    const ground = Matter.Bodies.rectangle(width / 2, height + offset, width * 2, wallThickness, { isStatic: true, friction: 0.1 });
    const ceiling = Matter.Bodies.rectangle(width / 2, -offset, width * 2, wallThickness, { isStatic: true, friction: 0.1 });
    const leftWall = Matter.Bodies.rectangle(-offset, height / 2, wallThickness, height * 2, { isStatic: true, friction: 0.1 });
    const rightWall = Matter.Bodies.rectangle(width + offset, height / 2, wallThickness, height * 2, { isStatic: true, friction: 0.1 });

    Matter.Composite.add(world, [ground, ceiling, leftWall, rightWall]);

    // 3. Setup Mouse constraints
    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.18, // responsive dragging feel
        render: { visible: false },
      },
    });
    Matter.Composite.add(world, mouseConstraint);
    mouseConstraintRef.current = mouseConstraint;

    // Prevent dragging from hijacking page scrolls on mobile unless actively grabbing a card
    const mouseAny = mouseConstraint.mouse as unknown as { touchmove?: (event: TouchEvent) => void };
    const originalTouchMove = mouseAny.touchmove;
    if (originalTouchMove) {
      mouseAny.touchmove = (event: TouchEvent) => {
        if (mouseConstraint.body && !mouseConstraint.body.isStatic) {
          if (event.cancelable) event.preventDefault();
          originalTouchMove(event);
        }
      };
    }

    // Track mouse coordinates inside container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePosRef.current.x = e.clientX - rect.left;
      mousePosRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mousePosRef.current.x = -1000;
      mousePosRef.current.y = -1000;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // 4. Set up collision triggers to emit sparkles
    Matter.Events.on(engine, "collisionStart", (event) => {
      event.pairs.forEach((pair) => {
        const bodyA = pair.bodyA as SkillBody;
        const bodyB = pair.bodyB as SkillBody;
        if (bodyA.isStatic || bodyB.isStatic) return;

        const vx = bodyA.velocity.x - bodyB.velocity.x;
        const vy = bodyA.velocity.y - bodyB.velocity.y;
        const speed = Math.sqrt(vx * vx + vy * vy);

        // Dispatch impact position for canvas particles
        if (speed > 1.2) {
          const cx = (bodyA.position.x + bodyB.position.x) / 2;
          const cy = (bodyA.position.y + bodyB.position.y) / 2;
          const sparkColor = speed > 3.0 ? "#FFD84D" : "#ffffff";
          onCollision(cx, cy, speed, sparkColor);
        }
      });
    });

    // 5. Update Loop for Magnet Attraction & Zero-G floating forces
    Matter.Events.on(engine, "beforeUpdate", () => {
      const activeIds = activeIdsRef.current;
      const mousePos = mousePosRef.current;

      bodiesMapRef.current.forEach((body, id) => {
        if (!activeIds.has(id)) return;

        // Magnet attraction
        if (magnetMode && mousePos.x !== -1000) {
          const dx = mousePos.x - body.position.x;
          const dy = mousePos.y - body.position.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 320 && dist > 15) {
            // Apply a force vector pulling body towards mouse
            const force = (0.00035 * (1 - dist / 320)) * body.mass;
            const angle = Math.atan2(dy, dx);
            Matter.Body.applyForce(body, body.position, {
              x: Math.cos(angle) * force,
              y: Math.sin(angle) * force,
            });
          }
        }

        // Lazy floating attraction in Zero-G
        if (gravityMode === "zero") {
          const targetX = mousePos.x !== -1000 ? mousePos.x : width / 2;
          const targetY = mousePos.y !== -1000 ? mousePos.y : height / 2;

          const dx = targetX - body.position.x;
          const dy = targetY - body.position.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 20) {
            const force = 0.00005 * body.mass;
            const angle = Math.atan2(dy, dx);
            Matter.Body.applyForce(body, body.position, {
              x: Math.cos(angle) * force,
              y: Math.sin(angle) * force,
            });
          }

          // Apply higher air resistance friction to settle floating objects
          body.frictionAir = 0.045;
        } else {
          // Restore default air resistance
          body.frictionAir = 0.022;
        }
      });
    });

    // 6. Start the physics loop runner
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    runnerRef.current = runner;

    const currentBodiesMap = bodiesMapRef.current;

    // Cleanup physics on unmount
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      currentBodiesMap.clear();
    };
  }, [containerRef, gravityMode, magnetMode, onCollision]);

  // Adjust engine gravity scale dynamically
  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;

    if (gravityMode === "earth") {
      engine.gravity.y = 0.75;
    } else if (gravityMode === "moon") {
      engine.gravity.y = 0.16;
    } else {
      engine.gravity.y = 0;
    }

    // Update bounciness and air resistance across existing bodies
    bodiesMapRef.current.forEach((body) => {
      body.restitution = gravityMode === "moon" ? 0.65 : 0.28;
      body.frictionAir = gravityMode === "zero" ? 0.045 : 0.022;
    });
  }, [gravityMode]);

  // Register Card Body (Pill or Square Collider depending on size proportions)
  const registerCard = (id: string, x: number, y: number, w: number, h: number) => {
    const engine = engineRef.current;
    if (!engine) return;

    // Calculate dynamic corner rounding chamfer (about 16% of width) to match card border-radius
    const chamferRadius = Math.min(18, w * 0.16);

    const body = Matter.Bodies.rectangle(x, y, w, h, {
      restitution: gravityMode === "moon" ? 0.65 : 0.28,
      friction: 0.08,
      frictionAir: gravityMode === "zero" ? 0.045 : 0.022,
      angle: (Math.random() - 0.5) * 0.4,
      chamfer: { radius: chamferRadius }, // Matches physical boundaries to CSS rounded corners
    }) as SkillBody;

    body.skillId = id;
    bodiesMapRef.current.set(id, body);
    
    // Add to active set and physics world
    activeIdsRef.current.add(id);
    Matter.Composite.add(engine.world, body);
  };

  // Clear existing skill bodies completely to re-initialize on filter change
  const clearSkillsBodies = () => {
    const engine = engineRef.current;
    if (!engine) return;

    // Release any grabbed body reference from the MouseConstraint to prevent lockups
    if (mouseConstraintRef.current) {
      mouseConstraintRef.current.body = null as unknown as Matter.Body;
    }

    bodiesMapRef.current.forEach((body) => {
      Matter.Composite.remove(engine.world, body);
    });

    bodiesMapRef.current.clear();
    activeIdsRef.current.clear();
  };

  const applyShake = () => {
    const activeIds = activeIdsRef.current;
    
    bodiesMapRef.current.forEach((body, id) => {
      if (!activeIds.has(id)) return;

      // Apply sharp randomized upward/sideward forces
      const fx = (Math.random() - 0.5) * 0.038 * body.mass;
      const fy = -(0.02 + Math.random() * 0.035) * body.mass;
      
      // Wake up body if sleeping
      Matter.Sleeping.set(body, false);
      
      Matter.Body.applyForce(body, body.position, { x: fx, y: fy });
    });
  };

  const handleResize = (w: number, h: number) => {
    const engine = engineRef.current;
    if (!engine) return;

    // Sync static boundaries to the container size
    const staticBodies = Matter.Composite.allBodies(engine.world).filter(b => b.isStatic);
    if (staticBodies.length >= 4) {
      const wallThickness = 100;
      const offset = wallThickness / 2;
      
      // ground, ceiling, leftWall, rightWall
      Matter.Body.setPosition(staticBodies[0], { x: w / 2, y: h + offset });
      Matter.Body.setPosition(staticBodies[1], { x: w / 2, y: -offset });
      Matter.Body.setPosition(staticBodies[2], { x: -offset, y: h / 2 });
      Matter.Body.setPosition(staticBodies[3], { x: w + offset, y: h / 2 });
    }
  };

  const pausePhysics = () => {
    const runner = runnerRef.current;
    if (runner) runner.enabled = false;
  };

  const resumePhysics = () => {
    const runner = runnerRef.current;
    if (runner) runner.enabled = true;
  };

  return {
    engineRef,
    bodiesMapRef,
    registerCard,
    clearSkillsBodies,
    applyShake,
    handleResize,
    pausePhysics,
    resumePhysics,
  };
};
export default usePhysics;

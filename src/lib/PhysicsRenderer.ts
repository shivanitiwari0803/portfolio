import { SkillsPhysics, SkillBody } from "./SkillsPhysics";

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  size: number;
  decay: number;
}

export class PhysicsRenderer {
  private physics: SkillsPhysics;
  private cardElements: Map<string, HTMLDivElement>;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private frameId: number | null = null;
  private particles: SparkParticle[] = [];
  
  // Use a mutable reference object to keep the render loop synchronized with filters
  private activeCardIdsRef: { current: Set<string> };
  
  // Track dragging state to update cursor class directly on the DOM
  private lastDraggedBodyId: string | null = null;

  constructor(
    physics: SkillsPhysics,
    cardElements: Map<string, HTMLDivElement>,
    canvas: HTMLCanvasElement,
    activeCardIdsRef: { current: Set<string> }
  ) {
    this.physics = physics;
    this.cardElements = cardElements;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: true });
    this.activeCardIdsRef = activeCardIdsRef;
  }

  public start() {
    if (this.frameId === null) {
      this.frameId = requestAnimationFrame(() => this.tick());
    }
  }

  public stop() {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
    this.particles = [];
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  public emitSparks(x: number, y: number, speed: number, color: string) {
    const count = Math.min(12, Math.floor(speed * 2.5));
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = (0.6 + Math.random() * 2.2) * (speed * 0.35);
      
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        color,
        alpha: 1.0,
        size: 1.5 + Math.random() * 3.5,
        decay: 0.035 + Math.random() * 0.015,
      });
    }
  }

  private tick() {
    this.updatePhysicsBodies();
    this.updateParticles();
    this.frameId = requestAnimationFrame(() => this.tick());
  }

  private updatePhysicsBodies() {
    // 1. Sync positions and visibility of Matter.js bodies directly to card DOM elements
    this.physics.bodiesMap.forEach((body, id) => {
      const el = this.cardElements.get(id);
      if (!el) return;

      const isActive = this.activeCardIdsRef.current.has(id);

      if (isActive) {
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const posX = body.position.x - w / 2;
        const posY = body.position.y - h / 2;

        // Apply transform with 3D translation for GPU layer acceleration
        el.style.transform = `translate3d(${posX}px, ${posY}px, 0) rotate(${body.angle}rad)`;
        el.style.opacity = "1";
        el.style.pointerEvents = "auto";
      } else {
        // Smoothly hide inactive card elements
        el.style.opacity = "0";
        el.style.pointerEvents = "none";
      }
    });

    // 2. Direct DOM cursor adjustments for dragging (no React re-renders)
    const currentDraggedBody = this.physics.mouseConstraint.body as SkillBody;
    const currentDraggedId = currentDraggedBody?.skillId || null;

    if (currentDraggedId !== this.lastDraggedBodyId) {
      if (this.lastDraggedBodyId) {
        const prevEl = this.cardElements.get(this.lastDraggedBodyId);
        if (prevEl) {
          prevEl.classList.remove("dragging-active");
        }
      }
      if (currentDraggedId) {
        const nextEl = this.cardElements.get(currentDraggedId);
        if (nextEl) {
          nextEl.classList.add("dragging-active");
        }
      }
      this.lastDraggedBodyId = currentDraggedId;
    }
  }

  private updateParticles() {
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}

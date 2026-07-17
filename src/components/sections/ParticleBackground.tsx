"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  depth: number; // For parallax
}

interface TwinkleStar {
  x: number;
  y: number;
  r: number;
  alpha: number;
  twinkleSpeed: number;
  phase: number;
  depth: number;
}

interface Cloud {
  x: number;
  y: number;
  r: number;
  vx: number;
  alpha: number;
  depth: number;
}

interface BoltPoint {
  x: number;
  y: number;
}

interface LightningBolt {
  points: BoltPoint[];
  life: number;
  maxLife: number;
  width: number;
  color: string;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let frameId: number;
    let lastTime = performance.now();

    // Atmosphere elements
    const particles: Particle[] = [];
    const stars: TwinkleStar[] = [];
    const clouds: Cloud[] = [];
    let activeBolt: LightningBolt | null = null;
    let lightningFlashAlpha = 0;

    // Settings
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const starCount = isReducedMotion ? 15 : 60;
    const particleCount = isReducedMotion ? 10 : 35;
    const cloudCount = isReducedMotion ? 2 : 5;

    // Track scroll
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const init = () => {
      const parent = canvas.parentElement;
      canvas.width = parent?.clientWidth || window.innerWidth;
      canvas.height = parent?.clientHeight || window.innerHeight;

      // 1. Initialize Stars
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.8, // Upper sky mostly
          r: 0.5 + Math.random() * 1.0,
          alpha: 0.1 + Math.random() * 0.8,
          twinkleSpeed: 0.005 + Math.random() * 0.015,
          phase: Math.random() * Math.PI * 2,
          depth: 0.08 + Math.random() * 0.05, // deep background
        });
      }

      // 2. Initialize Electric Particles
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -0.2 - Math.random() * 0.5, // moving upwards
          r: 1.0 + Math.random() * 1.5,
          alpha: 0.05 + Math.random() * 0.25,
          depth: 0.2 + Math.random() * 0.3,
        });
      }

      // 3. Initialize Clouds (soft glowing ambient blobs)
      clouds.length = 0;
      for (let i = 0; i < cloudCount; i++) {
        clouds.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5,
          r: 120 + Math.random() * 150,
          vx: 0.02 + Math.random() * 0.04, // slow drift
          alpha: 0.015 + Math.random() * 0.025, // extremely subtle
          depth: 0.12 + Math.random() * 0.08,
        });
      }
    };

    init();

    // Helper to generate electric lightning path (zig zag)
    const createLightningBolt = () => {
      if (isReducedMotion) return;
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * canvas.height * 0.3; // start in top-mid sky
      const endX = startX + (Math.random() - 0.5) * 300;
      const endY = startY + 150 + Math.random() * 200;

      const points: BoltPoint[] = [];
      const segments = 12 + Math.floor(Math.random() * 8);
      
      let currX = startX;
      let currY = startY;
      points.push({ x: currX, y: currY });

      for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const targetX = startX + (endX - startX) * t;
        const targetY = startY + (endY - startY) * t;

        // Add jagged noise
        const dev = 25 * (1 - t * 0.3); // deviation reduces as it approaches ground
        currX = targetX + (Math.random() - 0.5) * dev;
        currY = targetY + (Math.random() - 0.3) * 15; // force forward
        points.push({ x: currX, y: currY });
      }

      activeBolt = {
        points,
        life: 0,
        maxLife: 200 + Math.random() * 150, // duration in ms
        width: 1.5 + Math.random() * 1.5,
        color: Math.random() > 0.4 ? "#FFD93D" : "#4FC3F7", // Yellow or Electric Blue bolt
      };

      // Trigger a sky flash
      lightningFlashAlpha = 0.04 + Math.random() * 0.06;
    };

    const draw = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scrollY = scrollYRef.current;

      // 1. Draw twinkel stars (with deep parallax)
      stars.forEach((s) => {
        s.phase += s.twinkleSpeed;
        const currentAlpha = Math.max(0.1, s.alpha * (0.4 + Math.sin(s.phase) * 0.6));
        
        // Apply vertical scroll parallax
        const drawY = (s.y - scrollY * s.depth + canvas.height) % canvas.height;

        ctx.fillStyle = "#FFFFFF";
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(s.x, drawY, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw soft moving clouds (medium parallax)
      clouds.forEach((c) => {
        c.x += c.vx;
        if (c.x - c.r > canvas.width) {
          c.x = -c.r;
        }

        const drawY = (c.y - scrollY * c.depth + canvas.height) % canvas.height;

        // Draw radial gradient for cloud
        const grad = ctx.createRadialGradient(c.x, drawY, 0, c.x, drawY, c.r);
        grad.addColorStop(0, "rgba(255, 217, 61, 0.06)"); // yellow center glow
        grad.addColorStop(0.4, "rgba(79, 195, 247, 0.02)"); // blue middle
        grad.addColorStop(1, "rgba(10, 10, 10, 0)");

        ctx.fillStyle = grad;
        ctx.globalAlpha = c.alpha;
        ctx.beginPath();
        ctx.arc(c.x, drawY, c.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw ambient lightning sky flash
      if (lightningFlashAlpha > 0) {
        ctx.fillStyle = "#FFD93D";
        ctx.globalAlpha = lightningFlashAlpha;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        lightningFlashAlpha -= 0.002 * delta; // fade out
      }

      // 4. Draw active lightning bolt
      if (activeBolt) {
        activeBolt.life += delta;
        const boltAlpha = 1 - activeBolt.life / activeBolt.maxLife;

        if (activeBolt.life >= activeBolt.maxLife) {
          activeBolt = null;
        } else {
          ctx.save();
          ctx.globalAlpha = boltAlpha;
          ctx.strokeStyle = activeBolt.color;
          ctx.lineWidth = activeBolt.width;
          ctx.shadowBlur = 15;
          ctx.shadowColor = activeBolt.color;
          
          ctx.beginPath();
          ctx.moveTo(activeBolt.points[0].x, activeBolt.points[0].y);
          for (let i = 1; i < activeBolt.points.length; i++) {
            ctx.lineTo(activeBolt.points[i].x, activeBolt.points[i].y);
          }
          ctx.stroke();
          
          // Draw inner white core
          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = activeBolt.width * 0.4;
          ctx.shadowBlur = 0;
          ctx.stroke();
          ctx.restore();
        }
      }

      // 5. Randomly trigger a lightning bolt
      if (!isReducedMotion && !activeBolt && Math.random() < 0.001) {
        createLightningBolt();
      }

      // 6. Draw electric particles (front parallax)
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around canvas bounds
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }

        const drawY = (p.y - scrollY * p.depth + canvas.height) % canvas.height;

        ctx.fillStyle = "#FFD93D";
        ctx.globalAlpha = p.alpha;
        
        ctx.beginPath();
        // Electric spark style (diamond particles)
        ctx.moveTo(p.x, drawY - p.r);
        ctx.lineTo(p.x + p.r * 0.8, drawY);
        ctx.lineTo(p.x, drawY + p.r);
        ctx.lineTo(p.x - p.r * 0.8, drawY);
        ctx.closePath();
        ctx.fill();

        // Subtle particle glow
        ctx.shadowBlur = 4;
        ctx.shadowColor = "#FFD93D";
      });

      frameId = requestAnimationFrame(draw);
    };

    frameId = requestAnimationFrame(draw);

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
export default ParticleBackground;


"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  isAccent: boolean;
  pushX: number;
  pushY: number;
}

export const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Keep track of mouse positions with lerping for smooth inertia
  const mouseRef = useRef({ x: -1000, y: -1000, tx: -1000, ty: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    
    // Viewport configuration
    const width = canvas.parentElement?.clientWidth || window.innerWidth;
    const height = canvas.parentElement?.clientHeight || window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    
    // Particle count optimization based on device
    let particleCount = 130;
    if (isMobile) particleCount = 35;
    else if (isTablet) particleCount = 75;

    // Connection distance threshold
    const connectionDist = 110;
    const mouseRepelRadius = 150;
    
    // Accent color (#FFD84D)
    const accentColor = "255, 216, 77"; 
    // Soft white color for normal dust
    const dustColor = "255, 255, 255";

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const isAccent = Math.random() < 0.08; // 8% are accent dots
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15, // Extremely slow drifting
        vy: (Math.random() - 0.5) * 0.15,
        radius: isAccent ? 1.5 + Math.random() * 1.5 : 0.8 + Math.random() * 1.2,
        opacity: isAccent ? 0.35 + Math.random() * 0.35 : 0.1 + Math.random() * 0.25,
        isAccent,
        pushX: 0,
        pushY: 0,
      });
    }

    // Mouse listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.tx = e.clientX - rect.left;
      mouseRef.current.ty = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.tx = -1000;
      mouseRef.current.ty = -1000;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
      canvas.parentElement?.addEventListener("mouseleave", handleMouseLeave);
    }

    // Animation Tick
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Lerp mouse positions for high-end inertia
      const mouse = mouseRef.current;
      if (mouse.tx !== -1000) {
        mouse.x += (mouse.tx - mouse.x) * 0.08;
        mouse.y += (mouse.ty - mouse.y) * 0.08;
      } else {
        mouse.x += (-1000 - mouse.x) * 0.08;
        mouse.y += (-1000 - mouse.y) * 0.08;
      }

      const pCount = particles.length;

      // 1. Draw connecting lines (only for non-accent white space dust)
      for (let i = 0; i < pCount; i++) {
        const p1 = particles[i];
        
        for (let j = i + 1; j < pCount; j++) {
          const p2 = particles[j];
          if (p1.isAccent || p2.isAccent) continue; // Accent dots do not connect

          // Draw coordinates including mouse push offsets
          const x1 = p1.x + p1.pushX;
          const y1 = p1.y + p1.pushY;
          const x2 = p2.x + p2.pushX;
          const y2 = p2.y + p2.pushY;

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.08; // Ultra faint lines
            ctx.strokeStyle = `rgba(${dustColor}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      // 2. Update and draw particles
      particles.forEach((p) => {
        // Natural drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around borders
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse repelling physics
        let targetPushX = 0;
        let targetPushY = 0;

        if (mouse.x !== -1000 && !isMobile) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRepelRadius) {
            const force = (mouseRepelRadius - dist) / mouseRepelRadius;
            // Gentle push away
            const pushFactor = force * 24; 
            const angle = Math.atan2(dy, dx);
            targetPushX = Math.cos(angle) * pushFactor;
            targetPushY = Math.sin(angle) * pushFactor;
          }
        }

        // Smoothly interpolate the push offset to prevent card snapping/jitter
        p.pushX += (targetPushX - p.pushX) * 0.1;
        p.pushY += (targetPushY - p.pushY) * 0.1;

        const drawX = p.x + p.pushX;
        const drawY = p.y + p.pushY;

        // Draw particle
        ctx.fillStyle = p.isAccent 
          ? `rgba(${accentColor}, ${p.opacity})` 
          : `rgba(${dustColor}, ${p.opacity})`;
          
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Handle container resize
    const handleResize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
        canvas.parentElement?.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
      style={{ mixBlendMode: "screen" }}
    />
  );
};
export default ParticleField;

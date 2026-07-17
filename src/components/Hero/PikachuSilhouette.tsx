"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  isTail: boolean;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

export const PikachuSilhouette: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId: number;
    let particles: Particle[] = [];
    const sparks: Spark[] = [];
    let tailCharging = 0; // 0 to 1
    let tailTimer = 0;
    
    // Scale for responsive sizing
    const width = 380;
    const height = 380;
    canvas.width = width;
    canvas.height = height;

    // Define the Pikachu silhouette outline paths (stylized coordinate points)
    // Scaled for a 200x200 bounding box centered in the 380x380 canvas
    const cx = 160;
    const cy = 180;
    const s = 1.35; // scale

    // Custom coordinates tracing Pikachu's contour
    const outlinePoints: {x: number; y: number; isTail?: boolean}[] = [];

    const addLine = (x1: number, y1: number, x2: number, y2: number, count: number, isTail = false) => {
      for (let i = 0; i <= count; i++) {
        const t = i / count;
        outlinePoints.push({
          x: cx + (x1 + (x2 - x1) * t) * s,
          y: cy + (y1 + (y2 - y1) * t) * s,
          isTail
        });
      }
    };

    // Trace ears (x: -50 to 50, y: -100 to 100 relative to center)
    // Left ear (curved pointy)
    addLine(-25, -25, -55, -85, 20); // bottom ear to tip
    addLine(-55, -85, -20, -40, 20); // tip back to head
    
    // Head top
    addLine(-20, -40, 20, -40, 15);
    
    // Right ear
    addLine(20, -40, 55, -85, 20);
    addLine(55, -85, 25, -25, 20);
    
    // Right Cheek & Body
    addLine(25, -25, 35, 10, 15); // right face
    addLine(35, 10, 45, 60, 20); // right body
    addLine(45, 60, 25, 80, 15); // right leg
    
    // Bottom / feet
    addLine(25, 80, -25, 80, 20);
    
    // Left leg & body
    addLine(-25, 80, -45, 60, 15);
    addLine(-45, 60, -35, 10, 20);
    addLine(-35, 10, -25, -25, 15); // left face

    // Tail (jagged electric lightning shape on the right, connecting to body at x=35, y=45)
    // Tail bottom connects to right body
    addLine(35, 45, 60, 45, 12, true);
    addLine(60, 45, 50, 25, 10, true);
    addLine(50, 25, 75, 25, 15, true);
    addLine(75, 25, 65, 0, 12, true);
    addLine(65, 0, 100, 0, 18, true);
    addLine(100, 0, 85, -35, 15, true);
    addLine(85, -35, 125, -45, 20, true); // final tip
    addLine(125, -45, 95, -15, 15, true); // connecting back
    addLine(95, -15, 100, 0, 10, true);

    // Initialize particles along sampled points
    particles = outlinePoints.map((pt) => ({
      x: pt.x + (Math.random() - 0.5) * 15,
      y: pt.y + (Math.random() - 0.5) * 15,
      originX: pt.x,
      originY: pt.y,
      vx: 0,
      vy: 0,
      size: Math.random() * 1.5 + 0.8,
      alpha: 0.3 + Math.random() * 0.5,
      isTail: !!pt.isTail,
    }));

    // Mouse movement listeners inside component bounds
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.active = false;
    };

    // Register click to charge tail manually
    const handleCanvasClick = () => {
      tailCharging = 1.0; // instantly force discharge!
      // Spawn extra sparks around tail tip (cx + 125*s, cy - 45*s)
      const tipX = cx + 125 * s;
      const tipY = cy - 45 * s;
      for (let i = 0; i < 25; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 4;
        sparks.push({
          x: tipX,
          y: tipY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: Math.random() > 0.4 ? "#FFD93D" : "#4FC3F7",
          size: Math.random() * 2 + 1,
        });
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleCanvasClick);

    // Loop
    const tick = (now: number) => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Tail charging timer (emits discharge every 4.5 seconds)
      tailTimer += 16.7; // approx 60fps frame delta
      if (tailTimer >= 4500) {
        tailTimer = 0;
        tailCharging = 1.0; // discharge trigger
      }

      // Decay tail charge flash
      if (tailCharging > 0) {
        tailCharging -= 0.025;
      }

      const mouse = mouseRef.current;

      // Draw active lightning bolts from tail tip if charging is high
      if (tailCharging > 0.6) {
        const tipX = cx + 125 * s;
        const tipY = cy - 45 * s;
        
        ctx.strokeStyle = Math.random() > 0.3 ? "#FFD93D" : "#4FC3F7";
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 15;
        ctx.shadowColor = ctx.strokeStyle;
        
        ctx.beginPath();
        ctx.moveTo(tipX, tipY);
        let currX = tipX;
        let currY = tipY;
        
        // Jagged electricity discharging into space
        for (let j = 0; j < 5; j++) {
          currX += (Math.random() - 0.2) * 25;
          currY += (Math.random() - 0.5) * 20 - 15; // tends upward
          ctx.lineTo(currX, currY);
          
          // spawn spark at path bend
          if (Math.random() > 0.5) {
            sparks.push({
              x: currX,
              y: currY,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              alpha: 1,
              color: "#FFD93D",
              size: Math.random() * 1.5 + 0.8,
            });
          }
        }
        ctx.stroke();
      }

      // Update and draw particles
      particles.forEach((p) => {
        // Physics: Spring returning to origin
        const dxOrigin = p.originX - p.x;
        const dyOrigin = p.originY - p.y;
        
        // Acceleration
        const springK = 0.05; // spring constant
        p.vx += dxOrigin * springK;
        p.vy += dyOrigin * springK;

        // Friction
        const friction = 0.82;
        p.vx *= friction;
        p.vy *= friction;

        // Mouse interaction (repel)
        if (mouse.active) {
          const dxMouse = p.x - mouse.x;
          const dyMouse = p.y - mouse.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          const forceDist = 45; // range of mouse repel

          if (distMouse < forceDist) {
            const force = (forceDist - distMouse) / forceDist;
            const angle = Math.atan2(dyMouse, dxMouse);
            // push away
            p.vx += Math.cos(angle) * force * 4.2;
            p.vy += Math.sin(angle) * force * 4.2;

            // Occasional micro electrical spark between mouse and particle
            if (Math.random() < 0.03) {
              ctx.strokeStyle = "rgba(255, 217, 61, 0.4)";
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(mouse.x, mouse.y);
              ctx.lineTo(p.x, p.y);
              ctx.stroke();
            }
          }
        }

        // Apply velocities
        p.x += p.vx;
        p.y += p.vy;

        // Add float noise
        const floatY = Math.sin(now * 0.002 + p.originX) * 0.12;
        
        // Color configuration
        let color = "#FFD93D"; // Pikachu Yellow base
        if (p.isTail && tailCharging > 0) {
          // tail flashes white/cyan
          color = Math.random() > 0.5 ? "#FFFFFF" : "#4FC3F7";
        } else if (p.isTail && Math.sin(now * 0.005 + p.originX) > 0.8) {
          // tail glows slightly cyan occasionally to show charge capacity
          color = "#4FC3F7";
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = color;
        ctx.shadowBlur = p.isTail && tailCharging > 0 ? 8 : 2;
        ctx.shadowColor = color;
        ctx.beginPath();
        // Tail particles scale up during tail charge flash
        const scaleFactor = (p.isTail && tailCharging > 0) ? (1 + tailCharging * 1.5) : 1;
        ctx.arc(p.x, p.y + floatY, p.size * scaleFactor, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Update and Draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.022; // fade

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleCanvasClick);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center cursor-pointer group">
      {/* Visual bounding ring around silhouette */}
      <div className="absolute w-[290px] h-[290px] rounded-full border border-white/5 bg-white/[0.01] pointer-events-none group-hover:border-[#FFD93D]/10 transition-colors duration-700" />
      
      {/* Scanning orbit rings */}
      <div className="absolute w-[330px] h-[330px] rounded-full border border-dashed border-[#FFD93D]/10 pointer-events-none animate-[spin_50s_linear_infinite]" />
      <div className="absolute w-[250px] h-[250px] rounded-full border border-dashed border-[#4FC3F7]/5 pointer-events-none animate-[spin_30s_linear_infinite_reverse]" />

      <canvas
        ref={canvasRef}
        className="relative z-10 w-[380px] h-[380px] block"
      />
    </div>
  );
};
export default PikachuSilhouette;

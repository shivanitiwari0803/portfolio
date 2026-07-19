"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  rx: number;
  ry: number;
  currentRx: number;
  currentRy: number;
  vx: number;
  vy: number;
  sizeRatio: number;
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

interface TrailParticle {
  rx: number;
  ry: number;
  vx: number;
  vy: number;
  alpha: number;
  sizeRatio: number;
  life: number;
  maxLife: number;
  curveSpeed: number;
  curveAmount: number;
}

export const PikachuSilhouette: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId: number;
    let particles: Particle[] = [];
    const sparks: Spark[] = [];
    const trailParticles: TrailParticle[] = [];
    let tailCharging = 0; // 0 to 1
    let tailTimer = 0;

    const outlinePoints: { rx: number; ry: number; isTail?: boolean }[] = [];

    const addLineRelative = (x1: number, y1: number, x2: number, y2: number, count: number, isTail = false) => {
      const ox = 14.75;
      const oy = -2.5;
      for (let i = 0; i <= count; i++) {
        const t = i / count;
        const rx = (x1 + (x2 - x1) * t) - ox;
        const ry = (y1 + (y2 - y1) * t) - oy;
        outlinePoints.push({ rx, ry, isTail });
      }
    };

    addLineRelative(-25, -25, -55, -85, 20);
    addLineRelative(-55, -85, -20, -40, 20);
    addLineRelative(-20, -40, 20, -40, 15);
    addLineRelative(20, -40, 55, -85, 20);
    addLineRelative(55, -85, 25, -25, 20);
    addLineRelative(25, -25, 35, 10, 15);
    addLineRelative(35, 10, 45, 60, 20);
    addLineRelative(45, 60, 25, 80, 15);
    addLineRelative(25, 80, -25, 80, 20);
    addLineRelative(-25, 80, -45, 60, 15);
    addLineRelative(-45, 60, -35, 10, 20);
    addLineRelative(-35, 10, -25, -25, 15);

    addLineRelative(35, 45, 48.75, 45, 12, true);
    addLineRelative(48.75, 45, 43.25, 25, 10, true);
    addLineRelative(43.25, 25, 57, 25, 15, true);
    addLineRelative(57, 25, 51.5, 0, 12, true);
    addLineRelative(51.5, 0, 70.75, 0, 18, true);
    addLineRelative(70.75, 0, 62.5, -35, 15, true);
    addLineRelative(62.5, -35, 84.5, -45, 20, true);
    addLineRelative(84.5, -45, 68, -15, 15, true);
    addLineRelative(68, -15, 70.75, 0, 10, true);

    particles = outlinePoints.map((pt) => ({
      rx: pt.rx,
      ry: pt.ry,
      currentRx: pt.rx + (Math.random() - 0.5) * 12,
      currentRy: pt.ry + (Math.random() - 0.5) * 12,
      vx: 0,
      vy: 0,
      sizeRatio: (Math.random() * 1.5 + 0.8) / 380,
      alpha: 0.3 + Math.random() * 0.5,
      isTail: !!pt.isTail,
    }));

    let width = container.clientWidth;
    let height = container.clientHeight;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      width = rect.width;
      height = rect.height;
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

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

    const getLayoutConfig = () => {
      const size = Math.min(width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      let targetRatio = 0.512;
      if (width < 640) {
        targetRatio = 0.448;
      } else if (width < 1024) {
        targetRatio = 0.48;
      }
      const s = (targetRatio * size) / 165;
      return { size, centerX, centerY, s };
    };

    const handleCanvasClick = () => {
      tailCharging = 1.0;
      const { size, centerX, centerY, s } = getLayoutConfig();
      const tipX = centerX + 69.75 * s;
      const tipY = centerY - 42.5 * s;
      for (let i = 0; i < 25; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (1.5 + Math.random() * 4) * (size / 380);
        sparks.push({
          x: tipX,
          y: tipY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: Math.random() > 0.4 ? "#FFD93D" : "#4FC3F7",
          size: (Math.random() * 2 + 1) * (size / 380),
        });
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("click", handleCanvasClick);

    const tick = (now: number) => {
      const { size, centerX, centerY, s } = getLayoutConfig();
      ctx.clearRect(0, 0, width, height);

      tailTimer += 16.7;
      if (tailTimer >= 4500) {
        tailTimer = 0;
        tailCharging = 1.0;
      }

      if (tailCharging > 0) {
        tailCharging -= 0.025;
      }

      const mouse = mouseRef.current;
      const relativeMouse = {
        x: (mouse.x - centerX) / s,
        y: (mouse.y - centerY) / s,
        active: mouse.active,
      };

      if (tailCharging > 0.6) {
        const tipX = centerX + 69.75 * s;
        const tipY = centerY - 42.5 * s;
        ctx.strokeStyle = Math.random() > 0.3 ? "#FFD93D" : "#4FC3F7";
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 15;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.beginPath();
        ctx.moveTo(tipX, tipY);
        let currX = tipX;
        let currY = tipY;
        for (let j = 0; j < 5; j++) {
          currX += (Math.random() - 0.2) * 25 * (size / 380);
          currY += ((Math.random() - 0.5) * 20 - 15) * (size / 380);
          ctx.lineTo(currX, currY);
          if (Math.random() > 0.5) {
            sparks.push({
              x: currX,
              y: currY,
              vx: (Math.random() - 0.5) * 2 * (size / 380),
              vy: (Math.random() - 0.5) * 2 * (size / 380),
              alpha: 1,
              color: "#FFD93D",
              size: (Math.random() * 1.5 + 0.8) * (size / 380),
            });
          }
        }
        ctx.stroke();
      }

      if (Math.random() < 0.28) {
        const maxLife = 55 + Math.random() * 45;
        trailParticles.push({
          rx: -14.75 + (Math.random() - 0.5) * 12,
          ry: 82.5,
          vx: (Math.random() - 0.5) * 0.28,
          vy: 0.7 + Math.random() * 0.7,
          alpha: 0.85 + Math.random() * 0.15,
          sizeRatio: (Math.random() * 2 + 1) / 380,
          life: 0,
          maxLife,
          curveSpeed: 0.04 + Math.random() * 0.04,
          curveAmount: 0.2 + Math.random() * 0.3,
        });
      }

      for (let i = trailParticles.length - 1; i >= 0; i--) {
        const p = trailParticles[i];
        p.life++;
        if (p.life >= p.maxLife) {
          trailParticles.splice(i, 1);
          continue;
        }
        p.ry += p.vy;
        p.rx += p.vx + Math.sin(p.life * p.curveSpeed) * p.curveAmount;
        p.alpha = 1 - p.life / p.maxLife;
        const px = centerX + p.rx * s;
        const py = centerY + p.ry * s;
        const distCenter = Math.sqrt((px - centerX) ** 2 + (py - centerY) ** 2);
        if (distCenter > 0.32 * size) {
          p.alpha *= 0.2;
        }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = "#FFD93D";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#FFD93D";
        ctx.beginPath();
        ctx.arc(px, py, p.sizeRatio * size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.save();
      ctx.strokeStyle = "rgba(255, 217, 61, 0.42)";
      ctx.lineWidth = 0.95;
      ctx.shadowBlur = 3.5;
      ctx.shadowColor = "#FFD93D";
      ctx.beginPath();
      let firstBody = true;
      particles.forEach((p) => {
        if (!p.isTail) {
          const floatY = Math.sin(now * 0.002 + p.rx) * 0.12;
          const px = centerX + p.currentRx * s;
          const py = centerY + (p.currentRy + floatY) * s;
          if (firstBody) {
            ctx.moveTo(px, py);
            firstBody = false;
          } else {
            ctx.lineTo(px, py);
          }
        }
      });
      const firstBodyParticle = particles.find(p => !p.isTail);
      if (firstBodyParticle) {
        const floatY = Math.sin(now * 0.002 + firstBodyParticle.rx) * 0.12;
        ctx.lineTo(centerX + firstBodyParticle.currentRx * s, centerY + (firstBodyParticle.currentRy + floatY) * s);
      }
      ctx.stroke();

      ctx.beginPath();
      let firstTail = true;
      particles.forEach((p) => {
        if (p.isTail) {
          const floatY = Math.sin(now * 0.002 + p.rx) * 0.12;
          const px = centerX + p.currentRx * s;
          const py = centerY + (p.currentRy + floatY) * s;
          if (firstTail) {
            ctx.moveTo(px, py);
            firstTail = false;
          } else {
            ctx.lineTo(px, py);
          }
        }
      });
      ctx.stroke();
      ctx.restore();

      particles.forEach((p) => {
        const dxOrigin = p.rx - p.currentRx;
        const dyOrigin = p.ry - p.currentRy;
        const springK = 0.05;
        p.vx += dxOrigin * springK;
        p.vy += dyOrigin * springK;
        const friction = 0.82;
        p.vx *= friction;
        p.vy *= friction;
        if (relativeMouse.active) {
          const dxMouse = p.currentRx - relativeMouse.x;
          const dyMouse = p.currentRy - relativeMouse.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          const forceDist = 35;
          if (distMouse < forceDist) {
            const force = (forceDist - distMouse) / forceDist;
            const angle = Math.atan2(dyMouse, dxMouse);
            p.vx += Math.cos(angle) * force * 3.5;
            p.vy += Math.sin(angle) * force * 3.5;
            if (Math.random() < 0.03) {
              ctx.strokeStyle = "rgba(255, 217, 61, 0.4)";
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(mouse.x, mouse.y);
              ctx.lineTo(centerX + p.currentRx * s, centerY + (p.currentRy + Math.sin(now * 0.002 + p.rx) * 0.12) * s);
              ctx.stroke();
            }
          }
        }
        p.currentRx += p.vx;
        p.currentRy += p.vy;
        const floatY = Math.sin(now * 0.002 + p.rx) * 0.12;
        let color = "#FFD93D";
        if (p.isTail && tailCharging > 0) {
          color = Math.random() > 0.5 ? "#FFFFFF" : "#4FC3F7";
        } else if (p.isTail && Math.sin(now * 0.005 + p.rx) > 0.8) {
          color = "#4FC3F7";
        }
        const breath = Math.sin(now * 0.0035 + p.rx * 0.1) * 0.18 + 0.82;
        const pulse = mouse.active ? Math.max(0, 1 - (Math.sqrt((p.currentRx - relativeMouse.x)**2 + (p.currentRy - relativeMouse.y)**2) / 35)) * 0.5 : 0;
        const activeAlpha = Math.min(1.0, p.alpha * breath + pulse);
        const scaleFactor = (p.isTail && tailCharging > 0) ? (1 + tailCharging * 1.5) : 1;
        const nodeSize = p.sizeRatio * size * scaleFactor * (breath + pulse * 0.5);
        const px = centerX + p.currentRx * s;
        const py = centerY + (p.currentRy + floatY) * s;
        ctx.save();
        ctx.globalAlpha = activeAlpha;
        ctx.fillStyle = color;
        ctx.shadowBlur = p.isTail && tailCharging > 0 ? 12 : 6;
        ctx.shadowColor = color;
        ctx.beginPath();
        ctx.arc(px, py, nodeSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.022;
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
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("click", handleCanvasClick);
      resizeObserver.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center cursor-pointer group max-w-[500px] mx-auto overflow-hidden aspect-square"
    >
      <div 
        className="absolute w-[64%] h-[64%] rounded-full border border-white/5 bg-white/[0.01] pointer-events-none group-hover:border-[#FFD93D]/10 transition-colors duration-700" 
        style={{ transformOrigin: "center center" }} 
      />
      <div 
        className="absolute w-[76%] h-[76%] rounded-full border border-dashed border-[#FFD93D]/10 pointer-events-none animate-[spin_50s_linear_infinite]" 
        style={{ transformOrigin: "center center" }} 
      />
      <div 
        className="absolute w-[58%] h-[58%] rounded-full border border-dashed border-[#4FC3F7]/5 pointer-events-none animate-[spin_30s_linear_infinite_reverse]" 
        style={{ transformOrigin: "center center" }} 
      />
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full block aspect-square"
        style={{ transformOrigin: "center center" }}
      />
    </div>
  );
};
export default PikachuSilhouette;

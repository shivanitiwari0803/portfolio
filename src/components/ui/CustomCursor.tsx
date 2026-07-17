"use client";

import { useEffect, useRef, useState } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number; // current life in ms
  maxLife: number; // max life (500ms)
  angle: number;
  spin: number;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, speed: 0 });
  const sparksRef = useRef<Spark[]>([]);
  const isHoveredRef = useRef(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device is mobile/touch
    const checkDevice = () => {
      const mobileOrTouch =
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 768;
      setIsMobile(mobileOrTouch);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse events
    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      const mouse = mouseRef.current;
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Calculate speed for particle count
      const dx = mouse.x - mouse.lastX;
      const dy = mouse.y - mouse.lastY;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);

      // Create new particles on move
      if (mouse.speed > 1) {
        const particleCount = Math.min(3, Math.floor(mouse.speed * 0.15) + 1);
        for (let i = 0; i < particleCount; i++) {
          createSpark(mouse.x, mouse.y, isHoveredRef.current);
        }
      }
    };

    const onMouseEnterWindow = () => setIsVisible(true);
    const onMouseLeaveWindow = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnterWindow);
    document.addEventListener("mouseleave", onMouseLeaveWindow);

    // Helper to spawn a spark
    const createSpark = (x: number, y: number, hoverMode = false) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = hoverMode ? (0.8 + Math.random() * 2.0) : (0.5 + Math.random() * 1.2);
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      // Glow particles: yellow hues (#FFD93D or lighter yellow)
      const colors = hoverMode 
        ? ["#FFD93D", "#FFFFFF", "#4FC3F7"] // Electric Blue + Yellow sparks when hovering
        : ["#FFD93D", "#FFF393", "#FFE55C"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      sparksRef.current.push({
        x,
        y,
        vx,
        vy,
        size: Math.random() * 2 + 1,
        color,
        alpha: 1,
        life: 0,
        maxLife: 400 + Math.random() * 150, // approx 500ms
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.1,
      });
    };

    // Hover states for links and interactive elements
    const handleMouseEnterLink = () => {
      isHoveredRef.current = true;
    };

    const handleMouseLeaveLink = () => {
      isHoveredRef.current = false;
    };

    const addLinkListeners = () => {
      const links = document.querySelectorAll("a, button, [role='button'], input, textarea, .interactive-card, .skill-card-physics");
      links.forEach((link) => {
        link.addEventListener("mouseenter", handleMouseEnterLink);
        link.addEventListener("mouseleave", handleMouseLeaveLink);
      });
    };

    addLinkListeners();

    // Create a MutationObserver to listen for dynamically added links/buttons
    const observer = new MutationObserver(() => {
      addLinkListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // 60FPS Draw Loop
    const ctx = canvas.getContext("2d");
    let frameId: number;
    let lastTime = performance.now();

    const draw = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Update and Draw sparks trail
      const sparks = sparksRef.current;
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.life += delta;

        // Apply friction and slight gravity/float
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;

        // Fade after 500ms
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        if (p.life >= p.maxLife) {
          sparks.splice(i, 1);
          continue;
        }

        // Draw particle (little lightning stars or sparks)
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        
        // Soft spark glow
        ctx.shadowBlur = hoverRefGlowSize();
        ctx.shadowColor = p.color;

        // Draw a tiny cross/spark shape instead of simple circles for high polish
        ctx.beginPath();
        const size = isHoveredRef.current ? p.size * 1.5 : p.size;
        ctx.moveTo(0, -size * 1.8);
        ctx.lineTo(size * 0.4, -size * 0.4);
        ctx.lineTo(size * 1.8, 0);
        ctx.lineTo(size * 0.4, size * 0.4);
        ctx.lineTo(0, size * 1.8);
        ctx.lineTo(-size * 0.4, size * 0.4);
        ctx.lineTo(-size * 1.8, 0);
        ctx.lineTo(-size * 0.4, -size * 0.4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // 2. Draw Cursor Point (Tiny Glowing Pikachu Lightning Spark)
      if (isVisible) {
        const mouse = mouseRef.current;

        ctx.save();
        ctx.translate(mouse.x, mouse.y);
        
        // Add rotation to the lightning spark based on hover or movement
        const targetRot = isHoveredRef.current ? Math.sin(now * 0.02) * 0.2 : 0;
        ctx.rotate(targetRot);

        const glowSize = isHoveredRef.current ? 22 : 12;
        ctx.shadowBlur = glowSize;
        ctx.shadowColor = "#FFD93D";

        // Draw a premium Pikachu electric spark shape (curved sharp lightning)
        ctx.fillStyle = "#FFD93D";
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1;
        ctx.beginPath();

        // High-end Pikachu lightning bolt path
        ctx.moveTo(-1, -12); // top tip
        ctx.lineTo(4, -4);
        ctx.lineTo(0, -3);
        ctx.lineTo(6, 4); // right barb
        ctx.lineTo(-3, 2);
        ctx.lineTo(-1, 8); // bottom bend
        ctx.lineTo(-6, -1);
        ctx.lineTo(-2, -2);
        ctx.closePath();

        ctx.fill();
        ctx.stroke();

        // Extra details: tiny sparks orbiting if hovered
        if (isHoveredRef.current) {
          ctx.strokeStyle = "rgba(79, 195, 247, 0.6)"; // Blue spark rings
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.arc(0, 0, 16 + Math.sin(now * 0.01) * 3, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      }

      frameId = requestAnimationFrame(draw);
    };

    const hoverRefGlowSize = () => (isHoveredRef.current ? 10 : 4);

    frameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      observer.disconnect();

      const links = document.querySelectorAll("a, button, [role='button'], input, textarea, .interactive-card, .skill-card-physics");
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnterLink);
        link.removeEventListener("mouseleave", handleMouseLeaveLink);
      });
      cancelAnimationFrame(frameId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          body, a, button, [role='button'], input, textarea, .interactive-card, .skill-card-physics {
            cursor: none !important;
          }
        }
      `}</style>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[999999]"
      />
    </>
  );
}


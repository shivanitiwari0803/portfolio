"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Mouse Glow effect
    const updateMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty("--mouse-x", `${x}%`);
      document.documentElement.style.setProperty("--mouse-y", `${y}%`);
    };

    window.addEventListener("mousemove", updateMouse);

    // Magnetic Button Effect
    const btn = buttonRef.current;
    if (btn) {
      const onMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const onMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      };

      btn.addEventListener("mousemove", onMouseMove);
      btn.addEventListener("mouseleave", onMouseLeave);

      return () => {
        window.removeEventListener("mousemove", updateMouse);
        btn.removeEventListener("mousemove", onMouseMove);
        btn.removeEventListener("mouseleave", onMouseLeave);
      };
    }

    return () => {
      window.removeEventListener("mousemove", updateMouse);
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
  id="home"
  ref={containerRef}
  className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-12 lg:px-20"
>
      {/* Visual background details */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 -left-10 w-80 h-80 bg-white/2 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center gap-6">
        {/* Availability Badge */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent-muted text-accent text-xs font-semibold tracking-wider"
>
  <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
  AVAILABLE FOR FREELANCE & FULL-TIME ROLES
</motion.div>

        {/* Hero Headline */}
        <div className="flex flex-col gap-4">
          <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  className="flex flex-col items-center"
>
  <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] font-black tracking-tight leading-none text-white">
    <span className="relative inline-block">
      Shivani Tiwari

      <span className="absolute -right-2 top-0 h-full w-[3px] bg-white animate-pulse"></span>
    </span>
  </h1>

  <p className="mt-6 text-lg sm:text-xl md:text-2xl font-medium text-gray-400">
    Full Stack Developer & AI Enthusiast
  </p>
</motion.div>
        </div>

        {/* Sub-headline */}
        <motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.3 }}
  className="max-w-3xl text-center text-lg sm:text-xl text-gray-400 leading-relaxed"
>
  I am a{" "}
  <span className="font-semibold text-white">Full Stack Developer</span>{" "}
  focused on building highly performant, interactive web applications and AI-enabled digital solutions.
</motion.p>

        {/* Call to Actions */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  className="flex flex-wrap justify-center items-center gap-4 mt-2"
>
          {/* Magnetic CTA button */}
          <button
            ref={buttonRef}
            onClick={(e) => handleScrollTo(e, "#projects")}
            className="group flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-black font-semibold rounded-full shadow-lg shadow-accent/10 transition-colors duration-300 pointer-events-auto"
          >
            Explore Projects
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </button>

          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/10 transition-colors duration-300"
          >
            Let&apos;s talk
          </a>
        </motion.div>
      </div>

      {/* Decorative Bottom Details */}
      <div className="absolute bottom-10 left-8 md:left-16 lg:left-24 xl:left-32 z-10 hidden sm:flex items-center gap-8 text-xs font-semibold tracking-widest text-white/40">
        <div>SCROLL DOWN</div>
        <div className="w-12 h-[1px] bg-white/20" />
        <div>NEXT.JS / GSAP / FRAMER MOTION</div>
      </div>
    </section>
  );
}

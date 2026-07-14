"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import gsap from "gsap";
import { EASE_APPLE } from "@/lib/motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mouse Glow tracker
    const updateMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty("--mouse-x", `${x}%`);
      document.documentElement.style.setProperty("--mouse-y", `${y}%`);
    };

    window.addEventListener("mousemove", updateMouse);

    // Dynamic Magnetic Selector
    const magneticElements = document.querySelectorAll(".magnetic");
    const listeners: Array<{ el: Element; move: (e: MouseEvent) => void; leave: () => void }> = [];

    magneticElements.forEach((el) => {
      const onMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(el, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const onMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      };

      el.addEventListener("mousemove", onMouseMove as EventListener);
      el.addEventListener("mouseleave", onMouseLeave as EventListener);
      listeners.push({ el, move: onMouseMove, leave: onMouseLeave });
    });

    return () => {
      window.removeEventListener("mousemove", updateMouse);
      listeners.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move as EventListener);
        el.removeEventListener("mouseleave", leave as EventListener);
      });
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: EASE_APPLE,
      },
    },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-12 lg:px-20 select-none bg-black"
    >
      {/* Floating Ambient Glows */}
      <motion.div
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-10 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 -left-10 w-80 h-80 bg-white/2 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center gap-6 mt-16"
      >
        {/* Availability Badge */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent-muted text-accent text-xs font-semibold tracking-wider"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          AVAILABLE FOR FREELANCE & FULL-TIME ROLES
        </motion.div>

        {/* Hero Headline */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] font-black tracking-tight leading-none text-white font-display">
            <span className="relative inline-block">
              Shivani Tiwari
              <span className="absolute -right-2 top-0 h-full w-[3px] bg-white animate-pulse" />
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl md:text-2xl font-medium text-gray-400">
            Full Stack Developer &amp; AI Specialist
          </p>
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          variants={itemVariants}
          className="max-w-3xl text-center text-lg sm:text-xl text-gray-400 leading-relaxed font-light"
        >
          I am a{" "}
          <span className="font-semibold text-white font-sans">Full Stack Developer</span>{" "}
          focused on building highly performant, interactive web applications and AI-enabled digital solutions.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center items-center gap-4 mt-2"
        >
          <button
            onClick={(e) => handleScrollTo(e, "#projects")}
            className="magnetic group flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-black font-semibold rounded-full shadow-lg shadow-accent/10 transition-colors duration-300 pointer-events-auto cursor-pointer"
          >
            Explore Projects
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </button>

          <a
            href="/Shivani_Tiwari_Resume.pdf"
            download="Shivani_Tiwari_Resume.pdf"
            className="magnetic flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/10 transition-colors duration-300 cursor-pointer"
          >
            Download Resume
            <Download size={16} />
          </a>
        </motion.div>

        {/* Social Links Row */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 mt-4"
        >
          {[
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              ),
              href: "https://github.com/shivanitwr0803",
              label: "GitHub",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              ),
              href: "https://linkedin.com/in/shivani-tiwari-0803",
              label: "LinkedIn",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              ),
              href: "https://twitter.com",
              label: "Twitter (X)",
            },
            {
              icon: <Mail size={18} />,
              href: "mailto:shivanitwr0803@gmail.com",
              label: "Email",
            },
          ].map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-accent hover:border-accent/30 hover:bg-accent-muted transition-all duration-300 cursor-pointer"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Mouse Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 cursor-pointer select-none"
        onClick={(e) => handleScrollTo(e, "#about")}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1.5">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 bg-accent rounded-full"
          />
        </div>
        <span className="text-[10px] text-white/40 tracking-widest font-mono uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}

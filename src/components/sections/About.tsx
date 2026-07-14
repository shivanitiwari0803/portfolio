"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Award, Code2, Cpu, Database, Layout, Server, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { EASE_APPLE } from "@/lib/motion";

const ORBIT_ICONS = [
  { icon: <Layout size={16} className="text-accent" />, label: "React" },
  { icon: <Sparkles size={16} className="text-white" />, label: "Next.js" },
  { icon: <Database size={16} className="text-accent" />, label: "Supabase" },
  { icon: <Cpu size={16} className="text-white" />, label: "Three.js" },
  { icon: <Server size={16} className="text-accent" />, label: "Node.js" },
  { icon: <Code2 size={16} className="text-white" />, label: "TypeScript" },
];

export default function About() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTime(
        date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE_APPLE },
    },
  };

  return (
    <section
      id="about"
      className="py-24 px-8 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto w-full select-none"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-16">
        <span className="text-xs font-semibold tracking-wider text-accent uppercase">
          01 / About Me
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
          A short story about myself.
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Bio Card (Col span 2) */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="md:col-span-2 p-8 md:p-10 rounded-3xl glass-panel relative overflow-hidden group flex flex-col justify-between min-h-[350px]"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/2 rounded-full blur-[80px] pointer-events-none transition-all duration-700 group-hover:bg-accent/5" />
          <div className="flex flex-col gap-6">
            <h3 className="text-xl md:text-2xl font-semibold text-white">
              About Me
            </h3>

            <p className="text-base md:text-lg text-text-muted leading-relaxed font-light">
              I&apos;m{" "}
              <span className="text-white font-semibold">Shivani Tiwari</span>,
              a Full Stack Developer focused on building fast, scalable, and
              visually engaging web applications. I enjoy transforming ideas
              into polished digital products that combine clean design, modern
              engineering, and exceptional user experience.
            </p>

            <p className="text-base md:text-lg text-text-muted leading-relaxed font-light">
              During my internship at{" "}
              <span className="text-white">Y2 Solar</span>, I developed
              production-ready applications using{" "}
              <span className="text-white font-medium">Next.js</span>,{" "}
              <span className="text-white font-medium">React</span>,{" "}
              <span className="text-white font-medium">Tailwind CSS</span>,{" "}
              <span className="text-white font-medium">Supabase</span>, and{" "}
              <span className="text-white font-medium">Three.js</span>. Alongside full-stack
              development, I focus on SEO, performance optimization, reusable
              architecture, and interactive user experiences.
            </p>
          </div>
        </motion.div>

        {/* Orbit Profile Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="p-8 rounded-3xl glass-panel relative overflow-hidden flex flex-col items-center justify-center min-h-[350px] group"
        >
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Concentric Rotating Orbits */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute w-40 h-40 border border-white/5 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
              className="absolute w-32 h-32 border border-white/10 border-dashed rounded-full"
            />

            {/* Orbiting Icons */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="absolute w-full h-full"
            >
              {ORBIT_ICONS.map((item, idx) => {
                const angle = (idx / ORBIT_ICONS.length) * 360;
                return (
                  <motion.div
                    key={idx}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${angle}deg) translate(90px) rotate(-${angle}deg)`,
                    }}
                    whileHover={{ scale: 1.3 }}
                    className="w-8 h-8 rounded-full bg-surface-secondary border border-white/10 flex items-center justify-center cursor-pointer shadow-lg hover:border-accent/40 hover:bg-surface-tertiary transition-colors duration-300"
                    title={item.label}
                  >
                    {item.icon}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Central Profile Circle */}
            <div className="relative w-24 h-24 rounded-full border border-accent/20 bg-accent-muted flex flex-col items-center justify-center shadow-inner group">
              <span className="text-xl font-bold font-display text-white group-hover:text-accent transition-colors duration-500">ST</span>
              <span className="text-[10px] text-accent tracking-widest font-mono font-bold mt-1">GPA 9.3</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Summary Grid (Col span 1) */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="p-8 rounded-3xl glass-panel flex flex-col justify-between min-h-[260px]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted tracking-wider uppercase">Metrics</span>
            <Award size={18} className="text-accent" />
          </div>

          <div className="grid grid-cols-2 gap-6 my-auto pt-4">
            <div>
              <h3 className="text-2xl font-bold text-white font-display">15+</h3>
              <p className="text-xs text-text-muted">Pages Deployed</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white font-display">9.3</h3>
              <p className="text-xs text-text-muted">BCA CGPA</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white font-display">6-Week</h3>
              <p className="text-xs text-text-muted">MERN Training</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white font-display">1</h3>
              <p className="text-xs text-text-muted">Internship</p>
            </div>
          </div>
        </motion.div>

        {/* Location & Time Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="p-8 rounded-3xl glass-panel flex flex-col justify-between min-h-[260px] group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted tracking-wider uppercase">Location</span>
            <MapPin size={18} className="text-accent" />
          </div>

          <div className="my-auto flex flex-col gap-1">
            <h4 className="text-2xl font-semibold text-white font-display">Delhi, India</h4>
            <p className="text-sm text-text-muted font-light">Working remotely worldwide.</p>
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-text-muted">
              <Clock size={14} />
              <span className="text-xs font-mono tracking-wider">{time || "12:00:00 PM"}</span>
            </div>
            <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              Open to new opportunities
            </span>
          </div>
        </motion.div>

        {/* Philosophy Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="p-8 rounded-3xl glass-panel flex flex-col justify-between min-h-[260px] group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted tracking-wider uppercase">Philosophy</span>
            <Code2 size={18} className="text-white/60" />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-lg italic text-white font-light leading-relaxed">
              &ldquo;Great software is built where performance, usability, and thoughtful design come together.&rdquo;
            </p>
          </div>

          <div className="text-xs text-text-muted uppercase tracking-widest font-mono">
            BUILD • OPTIMIZE • INNOVATE
          </div>
        </motion.div>
      </div>
    </section>
  );
}

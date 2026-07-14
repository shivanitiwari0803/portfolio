"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Award, Code2 } from "lucide-react";
import { useEffect, useState } from "react";

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
        }),
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
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
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
          className="md:col-span-2 p-8 md:p-10 rounded-3xl glass-panel relative overflow-hidden group flex flex-col justify-between min-h-[300px]"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/2 rounded-full blur-[80px] pointer-events-none transition-all duration-700 group-hover:bg-accent/5" />
          <div className="flex flex-col gap-6">
            <h3 className="text-xl md:text-2xl font-semibold text-white">
              About Me
            </h3>

            <p className="text-base md:text-lg text-text-muted leading-relaxed">
              I'm{" "}
              <span className="text-white font-semibold">Shivani Tiwari</span>,
              a Full Stack Developer focused on building fast, scalable, and
              visually engaging web applications. I enjoy transforming ideas
              into polished digital products that combine clean design, modern
              engineering, and exceptional user experience.
            </p>

            <p className="text-base md:text-lg text-text-muted leading-relaxed">
              During my internship at{" "}
              <span className="text-white">Y2 Solar</span>, I developed
              production-ready applications using{" "}
              <span className="text-white">Next.js</span>,{" "}
              <span className="text-white">React</span>,
              <span className="text-white">Tailwind CSS</span>,
              <span className="text-white">Supabase</span>, and
              <span className="text-white">Three.js</span>. Alongside full-stack
              development, I focus on SEO, performance optimization, reusable
              architecture, and interactive user experiences.
            </p>
          </div>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">

  <div>
    <h3 className="text-3xl font-bold text-white">15+</h3>
    <p className="text-sm text-text-muted">
      Pages Built
    </p>
  </div>

  <div>
    <h3 className="text-3xl font-bold text-white">10+</h3>
    <p className="text-sm text-text-muted">
      Technologies
    </p>
  </div>

  <div>
    <h3 className="text-3xl font-bold text-white">9.3</h3>
    <p className="text-sm text-text-muted">
      CGPA
    </p>
  </div>

  <div>
    <h3 className="text-3xl font-bold text-white">1</h3>
    <p className="text-sm text-text-muted">
      Internship
    </p>
  </div>

</div>

        {/* Location & Time Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="p-8 rounded-3xl glass-panel flex flex-col justify-between min-h-[300px] group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted tracking-wider uppercase">
              Location
            </span>
            <MapPin size={18} className="text-accent" />
          </div>

          <div className="my-auto flex flex-col gap-1">
            <h4 className="text-2xl font-semibold text-white">
  Delhi, India
</h4>

<p className="text-sm text-text-muted">
  Available for Remote • Hybrid • On-site opportunities
</p>
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-text-muted">
              <Clock size={14} />
              <span className="text-xs font-mono tracking-wider">
                {time || "12:00:00 PM"}
              </span>
            </div>
            <span className="text-xs text-emerald-400 flex items-center gap-1.5">
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
            <span className="text-xs font-semibold text-text-muted tracking-wider uppercase">
              Philosophy
            </span>
            <Code2 size={18} className="text-white/60" />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-lg italic text-white leading-relaxed">
              "Great software is built where performance, usability, and
              thoughtful design come together."
            </p>
          </div>

          <div className="text-xs text-text-muted uppercase tracking-widest">
            BUILD • OPTIMIZE • INNOVATE
          </div>
        </motion.div>

        {/* Journey Card (Col span 2) */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="md:col-span-2 p-8 md:p-10 rounded-3xl glass-panel relative overflow-hidden group flex flex-col justify-between min-h-[260px]"
        >
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/2 rounded-full blur-[60px] pointer-events-none" />
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text-muted tracking-wider uppercase">
                My Journey
              </span>
              <Award size={18} className="text-accent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-2">
                  Full Stack Development
                </h4>
                <p className="text-sm text-text-muted leading-relaxed">
                  Building complete web applications using React, Next.js,
                  Node.js, Express, MongoDB, and Supabase with scalable
                  architecture and reusable components.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">
                  AI & Modern Web
                </h4>
                <p className="text-sm text-text-muted leading-relaxed">
                  Integrating LLM APIs, creating AI-powered applications,
                  optimizing performance, and delivering interactive experiences
                  with Framer Motion, GSAP, and Three.js.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
}

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: "Full Stack Developer Intern",
    company: "Y2 Solar",
    period: "April 2026 - June 2026",
    description: [
      "Engineered the company's official website from the ground up using Next.js, React, Tailwind CSS, Supabase, and Three.js, delivering a fast, responsive, and production-ready web application.",
      "Built 15+ responsive pages and reusable UI components, improving development efficiency while ensuring a consistent experience across desktop, tablet, and mobile devices.",
      "Developed and integrated RESTful APIs with Supabase for dynamic content management and optimized backend data workflows.",
      "Created immersive 3D web experiences with Three.js, optimizing rendering performance and interactive animations to enhance user engagement.",
      "Enhanced website performance and SEO by implementing server-side rendering (SSR), metadata optimization, semantic HTML, image optimization, and Core Web Vitals best practices.",
      "Collaborated closely with designers and stakeholders to transform business requirements into scalable features, following clean architecture, component-driven development, Git-based version control, and modern development best practices.",
    ],
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook scroll progress for the timeline line animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-24 px-8 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto w-full select-none relative"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-20">
        <span className="text-xs font-semibold tracking-wider text-accent uppercase">03 / History</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
          Professional timeline.
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto mt-12 flex flex-col gap-16 md:gap-24">
        {/* Animated Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[2px] bg-white/10 -translate-x-1/2 pointer-events-none">
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="w-full h-full bg-accent rounded-full"
          />
        </div>

        {EXPERIENCE_DATA.map((item, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={item.company}
              className={`relative flex flex-col md:flex-row items-start md:items-center w-full ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Center Node */}
              <div className="absolute left-4 md:left-1/2 top-4 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="w-8 h-8 rounded-full bg-black border-2 border-accent flex items-center justify-center text-accent"
                >
                  <Briefcase size={12} />
                </motion.div>
              </div>

              {/* Spacing node for Desktop Grid alignment */}
              <div className="hidden md:block w-1/2" />

              {/* Experience Card */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                  isEven ? "md:pr-12 md:text-right" : "md:pl-12"
                }`}
              >
                <div className="p-8 rounded-3xl glass-panel relative overflow-hidden group hover:border-white/10 transition-colors duration-300">
                  <span className="text-xs font-mono text-accent tracking-wider font-semibold block mb-2">
                    {item.period}
                  </span>
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-white">
                    {item.role}
                  </h3>
                  <h4 className="text-sm font-semibold text-white/50 mb-4 uppercase tracking-wide">
                    {item.company}
                  </h4>

                  <ul
                    className={`flex flex-col gap-2.5 text-sm text-text-muted leading-relaxed font-light ${
                      isEven ? "md:items-end" : "md:items-start"
                    }`}
                  >
                    {item.description.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className={`flex gap-2 items-start ${
                          isEven ? "md:flex-row-reverse md:text-right" : "text-left"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

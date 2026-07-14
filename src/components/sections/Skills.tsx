"use client";

import { motion } from "framer-motion";
import { Layout, Server, Cpu } from "lucide-react";

interface SkillItem {
  name: string;
  level: number; // 0-100
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Languages & Frontend",
    icon: <Layout size={20} className="text-accent" />,
    skills: [
      { name: "JavaScript (ES6+) / TypeScript", level: 92 },
      { name: "React.js / Next.js", level: 95 },
      { name: "Tailwind CSS / SCSS", level: 98 },
      { name: "Three.js / WebGL", level: 85 },
      { name: "Python / Java / C", level: 80 },
      { name: "Responsive Web Design", level: 95 },
    ],
  },
  {
    title: "Backend & Databases",
    icon: <Server size={20} className="text-white/60" />,
    skills: [
      { name: "Node.js / Express.js", level: 88 },
      { name: "REST APIs Development", level: 90 },
      { name: "Authentication (JWT)", level: 88 },
      { name: "Supabase / PostgreSQL", level: 88 },
      { name: "MongoDB / Mongoose", level: 85 },
    ],
  },
  {
    title: "AI, Tools & Optimization",
    icon: <Cpu size={20} className="text-accent" />,
    skills: [
      { name: "AI & LLM Integration (OpenAI, Cohere)", level: 88 },
      { name: "Mistral AI / Prompt Engineering", level: 85 },
      { name: "Git / GitHub / VS Code", level: 90 },
      { name: "Vercel / Render / Postman", level: 88 },
      { name: "SEO & Core Web Vitals Optimization", level: 90 },
      { name: "Performance & API Optimization", level: 88 },
    ],
  },
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="skills" className="py-24 px-8 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto w-full select-none">
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-16">
        <span className="text-xs font-semibold tracking-wider text-accent uppercase">02 / Capabilities</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
          Tools, technologies &amp; crafts.
        </h2>
      </div>

      {/* Grid of Categories */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {SKILLS_DATA.map((category, catIdx) => (
          <motion.div
            key={category.title}
            variants={itemVariants}
            className="p-8 rounded-3xl glass-panel relative overflow-hidden flex flex-col gap-6 group hover:border-white/10 transition-colors duration-300"
          >
            {/* Ambient hover glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/2 rounded-full blur-[40px] pointer-events-none group-hover:bg-accent/4 transition-colors duration-500" />

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                {category.icon}
              </div>
              <h3 className="text-lg md:text-xl font-display font-semibold text-white">
                {category.title}
              </h3>
            </div>

            <div className="flex flex-col gap-5 mt-2">
              {category.skills.map((skill, skillIdx) => (
                <div key={skill.name} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/80 font-medium font-sans">{skill.name}</span>
                    <span className="text-accent font-mono text-xs">{skill.level}%</span>
                  </div>

                  {/* Custom progress bar */}
                  <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.1 + skillIdx * 0.05, ease: [0.16, 1, 0.3, 1] as const }}
                      className="h-full bg-accent rounded-full group-hover:bg-accent-hover transition-colors duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

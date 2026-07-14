"use client";

import { motion } from "framer-motion";
import { Cpu, Layout, Sparkles, ArrowRight } from "lucide-react";
import { EASE_APPLE, EASE_LINEAR_SWIFT } from "@/lib/motion";

interface Service {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

const SERVICES_DATA: Service[] = [
  {
    title: "Full-Stack Web Applications",
    subtitle: "End-to-End Development",
    description: "Building production-grade, scalable web products utilizing React, Next.js, Node.js, Express, and SQL/NoSQL databases. Focus on secure authentication, clean architecture, and responsive designs.",
    icon: <Layout className="text-accent" size={24} />,
    tags: ["Next.js", "Supabase", "React", "Node.js", "PostgreSQL"],
  },
  {
    title: "AI & LLM Integration",
    subtitle: "Intelligent Systems",
    description: "Orchestrating multi-model API deployments (OpenAI, Cohere, Mistral) for real-time model benchmarking, custom evaluation scoring engines, and tailored prompt engineering pipelines.",
    icon: <Cpu className="text-white" size={24} />,
    tags: ["OpenAI API", "Cohere", "Mistral AI", "Model Benchmarking"],
  },
  {
    title: "Performance & SEO Audit",
    subtitle: "Speed & Core Web Vitals",
    description: "Optimizing code bundles, assets, rendering strategies (SSR/ISR), and API latencies to elevate Google Lighthouse performance indices and achieve 60 FPS visual smoothness.",
    icon: <Sparkles className="text-accent" size={24} />,
    tags: ["Lighthouse", "Core Web Vitals", "SSR", "Asset Optimization"],
  },
];

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

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
      id="services"
      className="py-24 px-8 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto w-full select-none"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-16">
        <span className="text-xs font-semibold tracking-wider text-accent uppercase">
          05 / Services
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
          Crafting digital products.
        </h2>
      </div>

      {/* Grid of Services */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {SERVICES_DATA.map((service, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: EASE_LINEAR_SWIFT }}
            className="p-8 rounded-3xl glass-panel relative overflow-hidden flex flex-col justify-between min-h-[360px] group hover:border-white/10 transition-colors duration-500 cursor-pointer"
          >
            {/* Background glowing visual */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/2 rounded-full blur-[40px] pointer-events-none group-hover:bg-accent/5 transition-colors duration-500" />

            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5 group-hover:border-accent/20 group-hover:bg-accent-muted transition-colors duration-500">
                  {service.icon}
                </div>
                <ArrowRight size={18} className="text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono font-medium text-accent tracking-wider uppercase">
                  {service.subtitle}
                </span>
                <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
              </div>

              <p className="text-sm text-text-muted leading-relaxed font-light">
                {service.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/5">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono text-white/50 bg-white/5 rounded-full px-3 py-1 uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

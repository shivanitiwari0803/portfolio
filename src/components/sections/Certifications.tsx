"use client";

import { motion } from "framer-motion";
import { Award, ArrowUpRight } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  icon: React.ReactNode;
  verifyUrl: string;
}

const CERTIFICATIONS_DATA: Certification[] = [
  {
    title: "Full Stack Web Development (MERN Stack)",
    issuer: "Institute of Innovation in Technology & Management",
    date: "June 2025",
    icon: <Award className="text-accent" size={22} />,
    verifyUrl: "https://iitmjanakpuri.com",
  },
];

export default function Certifications() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="certifications" className="py-24 px-8 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto w-full select-none">
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-16">
        <span className="text-xs font-semibold tracking-wider text-accent uppercase">06 / Credentials</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
          Certifications &amp; training.
        </h2>
      </div>

      {/* Grid Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {CERTIFICATIONS_DATA.map((cert) => (
          <motion.div
            key={cert.title}
            variants={cardVariants}
            className="p-8 rounded-3xl glass-panel relative overflow-hidden flex flex-col justify-between min-h-[220px] group hover:border-white/10 transition-colors duration-300"
          >
            {/* Hover visual flash overlay */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/2 rounded-full blur-[30px] pointer-events-none group-hover:bg-accent/5 transition-colors duration-500" />

            <div className="flex justify-between items-start">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                {cert.icon}
              </div>
              <span className="text-xs font-mono text-text-muted font-medium">
                {cert.date}
              </span>
            </div>

            <div className="flex flex-col gap-1.5 mt-6">
              <h3 className="text-lg font-display font-bold text-white leading-snug group-hover:text-accent transition-colors duration-300">
                {cert.title}
              </h3>
              <p className="text-xs font-medium text-text-muted uppercase tracking-wider">
                {cert.issuer}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex">
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-accent transition-colors duration-300"
              >
                Verify Credential
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

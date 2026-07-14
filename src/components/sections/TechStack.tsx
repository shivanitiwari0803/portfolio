"use client";

const FRONTEND_TECH = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Three.js",
  "SCSS",
  "HTML5",
  "CSS3",
  "Responsive Design",
];

const BACKEND_TECH = [
  "Node.js",
  "Express.js",
  "REST APIs",
  "Supabase",
  "MongoDB",
  "Mongoose",
  "JWT Auth",
  "OpenAI API",
  "Cohere API",
  "Mistral AI",
  "Prompt Engineering",
  "Git",
  "GitHub",
  "Vercel",
  "Render",
  "Postman",
  "SEO",
  "Core Web Vitals",
];

export default function TechStack() {
  return (
    <section className="py-24 overflow-hidden select-none bg-black w-full relative">
      {/* Background ambient glowing details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[150px] bg-accent/2 rounded-full blur-[80px] pointer-events-none" />

      {/* Section Header */}
      <div className="px-8 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto w-full mb-16">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-wider text-accent uppercase">05 / Technologies</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            My stack at a glance.
          </h2>
        </div>
      </div>

      {/* Marquee Row 1 (Frontend) */}
      <div className="flex w-full mb-6 relative">
        {/* Left/Right masks for smooth fading edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 animate-marquee whitespace-nowrap min-w-full">
          {/* Double content for seamless looping */}
          {[...FRONTEND_TECH, ...FRONTEND_TECH].map((tech, idx) => (
            <div
              key={`${tech}-${idx}`}
              className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-surface-secondary border border-white/5 text-white/80 hover:text-white hover:border-accent/30 hover:bg-surface-tertiary transition-all duration-300 font-mono text-sm uppercase tracking-wider"
            >
              <span className="w-1.5 h-1.5 bg-accent rounded-full" />
              {tech}
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (Backend) */}
      <div className="flex w-full relative">
        {/* Left/Right masks for smooth fading edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 animate-marquee-reverse whitespace-nowrap min-w-full">
          {/* Double content for seamless looping */}
          {[...BACKEND_TECH, ...BACKEND_TECH].map((tech, idx) => (
            <div
              key={`${tech}-${idx}`}
              className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-surface-secondary border border-white/5 text-white/80 hover:text-white hover:border-accent/30 hover:bg-surface-tertiary transition-all duration-300 font-mono text-sm uppercase tracking-wider"
            >
              <span className="w-1.5 h-1.5 bg-accent rounded-full" />
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

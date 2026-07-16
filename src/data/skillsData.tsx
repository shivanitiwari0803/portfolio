import React from "react";

export interface SkillItem {
  id: string;
  name: string;
  category: "languages" | "frontend" | "backend" | "database" | "ai" | "tools" | "optimization";
  description: string;
  projects: string[];
  experience: string;
  mobile: boolean; // Shown on mobile (18 skills)
  tablet: boolean; // Shown on tablet (28 skills)
  icon: React.ReactNode;
}

export const skillsData: SkillItem[] = [
  // ==================== LANGUAGES ====================
  {
    id: "javascript",
    name: "JavaScript",
    category: "languages",
    description: "Core scripting language for interactive frontends and servers.",
    projects: ["Arena AI", "Y2 Solar Website"],
    experience: "Deep understanding of ES6+, asynchronous control flows, and DOM manipulation.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm22.034 18.268c-.156-.843-.728-1.502-1.89-1.93-1.16-.43-2.585-.697-3.83-.98-.826-.188-1.652-.39-2.222-.647-.532-.236-.88-.58-.88-1.127 0-.663.535-1.082 1.348-1.082.793 0 1.295.32 1.572.843.155.286.208.572.221.986h2.72c-.046-1.528-.885-2.71-2.477-3.23-.746-.24-1.637-.364-2.528-.364-1.826 0-3.23.493-4.106 1.488-.707.818-1.042 1.838-1.042 3.12 0 1.954 1.135 2.946 3.14 3.42 1.296.3 2.802.585 3.978.883.82.208 1.408.47 1.7.74.34.3.5.73.5 1.28 0 .8-.66 1.39-1.79 1.39-1.077 0-1.82-.42-2.148-1.16-.17-.386-.196-.8-.216-1.4h-2.73c.038 2.03.947 3.323 2.923 3.86 1.05.288 2.06.408 3.1.408 2.228 0 3.856-.566 4.793-1.644.82-.94 1.21-2.2 1.21-3.69v-.004z" />
      </svg>
    ),
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "languages",
    description: "Strict syntactical superset of JavaScript adding static typing.",
    projects: ["Arena AI Platform", "Y2 Solar Dashboard"],
    experience: "Strong proficiency in advanced typings, interfaces, and compile-safe architectures.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm22.034 18.268c-.156-.843-.728-1.502-1.89-1.93-1.16-.43-2.585-.697-3.83-.98-.826-.188-1.652-.39-2.222-.647-.532-.236-.88-.58-.88-1.127 0-.663.535-1.082 1.348-1.082.793 0 1.295.32 1.572.843.155.286.208.572.221.986h2.72c-.046-1.528-.885-2.71-2.477-3.23-.746-.24-1.637-.364-2.528-.364-1.826 0-3.23.493-4.106 1.488-.707.818-1.042 1.838-1.042 3.12 0 1.954 1.135 2.946 3.14 3.42 1.296.3 2.802.585 3.978.883.82.208 1.408.47 1.7.74.34.3.5.73.5 1.28 0 .8-.66 1.39-1.79 1.39-1.077 0-1.82-.42-2.148-1.16-.17-.386-.196-.8-.216-1.4h-2.73c.038 2.03.947 3.323 2.923 3.86 1.05.288 2.06.408 3.1.408 2.228 0 3.856-.566 4.793-1.644.82-.94 1.21-2.2 1.21-3.69v-.004zm-11.45-8.48h-7.61v2.54h2.53v10.15h2.55v-10.15h2.53V9.788z" />
      </svg>
    ),
  },
  {
    id: "python",
    name: "Python",
    category: "languages",
    description: "Versatile backend, data science, and AI agent scripting language.",
    projects: ["Arena AI scoring engine", "AI Agent Pipelines"],
    experience: "Implemented server endpoints and parsing routines for evaluating prompt outputs.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.25.189h-4.5c-1.748 0-3.15 1.4-3.15 3.15v2.25h9v-2.25a3.15 3.15 0 00-3.15-3.15zM6.6 6.489h2.25v2.25H6.6v-2.25zm5.4 0h2.25v2.25H12v-2.25zM9.75 23.811h4.5c1.748 0 3.15-1.4 3.15-3.15v-2.25h-9v2.25a3.15 3.15 0 003.15 3.15zm7.65-6.3h-2.25v-2.25h2.25v2.25zm-5.4 0h-2.25v-2.25h2.25v2.25zm-5.4-4.5v-2.25c0-1.75 1.4-3.15 3.15-3.15h1.35v1.8h-1.35c-.75 0-1.35.6-1.35 1.35v2.25H6.6zm10.8 0v2.25c0 1.75-1.4 3.15-3.15 3.15h-1.35v-1.8h1.35c.75 0 1.35-.6 1.35-1.35v-2.25h1.8z" />
      </svg>
    ),
  },
  {
    id: "java",
    name: "Java",
    category: "languages",
    description: "Robust object-oriented language for enterprise architectures.",
    projects: ["Academics & Algorithms"],
    experience: "Strong knowledge of object-oriented principles, data structures, and multi-threading.",
    mobile: false,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.024 18s-.853.48-1.52.8c-1.33.64-1.92 1.28-1.92 1.92 0 1.07 1.76 1.76 4.416 1.76 3.15 0 4.8-1.07 4.8-2.13 0-.64-.53-1.07-1.52-1.49l-1.07-.43s1.28-.43 1.92-.85c1.17-.75 1.71-1.71 1.71-2.77 0-2.35-2.67-3.41-2.67-3.41s2.24-.75 2.24-2.24c0-1.71-1.92-2.56-1.92-2.56s1.28-.75 1.28-1.71c0-1.5-1.5-2.24-1.5-2.24S14.25 1.5 13.5.75c-1.2-.86-3.2-.75-3.2-.75s1.2 1.2.75 1.92c-.32.48-1.17.75-1.71 1.17-.96.75-1.39 1.71-1.39 2.67 0 1.92 1.71 2.77 1.71 2.77s-1.92.53-2.35 1.71c-.32.85-.21 1.71.21 2.35.53.75 1.6 1.28 1.6 1.28s-1.92.64-2.35 1.6c-.32.75-.32 1.6.21 2.35.64.85 2.03 1.39 2.03 1.39z" />
      </svg>
    ),
  },
  {
    id: "c-lang",
    name: "C",
    category: "languages",
    description: "Low-level system programming language.",
    projects: ["System Level routines"],
    experience: "Familiarity with memory management, pointers, structures, and execution efficiency.",
    mobile: false,
    tablet: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10c3.702 0 6.942-2.025 8.664-5.027l-2.637-1.523C16.828 17.502 14.57 19 12 19c-3.859 0-7-3.141-7-7s3.141-7 7-7c2.57 0 4.828 1.498 6.027 3.55l2.637-1.523C18.942 4.025 15.702 2 12 2z" />
      </svg>
    ),
  },

  // ==================== FRONTEND ====================
  {
    id: "react",
    name: "React.js",
    category: "frontend",
    description: "Declarative component-driven UI library for rendering dynamic applications.",
    projects: ["Arena AI", "Y2 Solar Website"],
    experience: "Highly skilled in hooks, state management patterns, and virtual DOM performance tuning.",
    mobile: true,
    tablet: true,
    icon: (
      <svg className="animate-[spin_10s_linear_infinite]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 8.705c-1.819 0-3.294 1.475-3.294 3.295s1.475 3.294 3.294 3.294c1.82 0 3.295-1.475 3.295-3.294S13.82 8.705 12 8.705zm11.536 2.378c-.287-2.31-1.854-4.538-4.32-6.14-2.588-1.684-5.753-2.584-8.879-2.542-3.136-.042-6.301.858-8.89 2.542-2.465 1.602-4.032 3.83-4.32 6.14a2.915 2.915 0 000 1.234c.288 2.31 1.855 4.538 4.32 6.14 2.589 1.684 5.754 2.584 8.89 2.542 3.126.042 6.291-.858 8.879-2.542 2.466-1.602 4.033-3.83 4.32-6.14a2.915 2.915 0 000-1.234zM12 21.647c-2.735.03-5.518-.748-7.79-2.228-2.072-1.347-3.33-3.14-3.562-4.94a1.056 1.056 0 010-.479c.232-1.8 1.49-3.593 3.562-4.94 2.272-1.48 5.055-2.258 7.79-2.228 2.725-.03 5.508.748 7.78 2.228 2.072 1.347 3.33 3.14 3.562 4.94a1.056 1.056 0 010 .479c-.232 1.8-1.49 3.593-3.562 4.94-2.272 1.48-5.055 2.258-7.78 2.228z" />
      </svg>
    ),
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    description: "React framework with built-in routing, SSR, and build-time optimization.",
    projects: ["Arena AI Platform", "Y2 Solar Website"],
    experience: "Implemented Server Components, API routes, and advanced metadata techniques.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.86 18.77l-5.698-7.447v6.611H10.15V7.632h1.611l5.441 7.151V7.632h2.008v11.138h-1.35zM11.95 6c.033 0 .066.002.1.002v3.743L8.337 5.04C9.431 5.617 10.655 6 11.95 6z" />
      </svg>
    ),
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    description: "Utility-first CSS framework for rapid and scalable interface development.",
    projects: ["Arena AI UI", "Y2 Solar Portal"],
    experience: "Expert in building complex custom themes, responsive grids, and clean design tokens.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 6.018C13.8 3.618 16.2 3.618 19.2 6.018C22.2 8.418 22.2 10.818 19.2 13.218C17.4 15.618 15 15.618 12 13.218C9 10.818 9 8.418 12 6.018ZM4.8 13.218C6.6 10.818 9 10.818 12 13.218C15 15.618 15 18.018 12 20.418C10.2 22.818 7.8 22.818 4.8 20.418C1.8 18.018 1.8 15.618 4.8 13.218Z" />
      </svg>
    ),
  },
  {
    id: "scss",
    name: "SCSS",
    category: "frontend",
    description: "Sass extension language adding variables, nesting, and mixins.",
    projects: ["Legacy stylesheet refactors"],
    experience: "Maintained clean stylesheets using reusable mixins and structured theme imports.",
    mobile: false,
    tablet: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.28 17.5a3 3 0 01-2.9 2.25 3.32 3.32 0 01-3-2c-.4-1.22-.6-3.32-.6-4.57 0-2 .3-4.22 1.3-5.22a3 3 0 014.7 0c1 1 1.3 3.22 1.3 5.22 0 1.25-.2 3.35-.6 4.57a3.32 3.32 0 01-.2.75zM11 6.5C8 6.5 7.5 9 7.5 10c0 .3.1.5.3.7s.5.3.8.3c1.2 0 1.9-1.2 1.9-2.3 0-1.1-.3-2.2-.5-2.2zm-2.8 6.8c-.8.5-1.7.7-2.7.7-2 0-3-1.5-3-3s1-3 3-3c.8 0 1.6.2 2.3.6.4-.8.9-1.3 1.6-1.3C10.6 8 12 9.8 12 12c0 2.2-1.4 4-2.6 4-.7 0-1.2-.5-1.2-1.2 0-.2.1-.4.2-.6l-.2-.9z" />
      </svg>
    ),
  },
  {
    id: "threejs",
    name: "Three.js",
    category: "frontend",
    description: "WebGL wrapper for compiling interactive 3D elements in the browser.",
    projects: ["Y2 Solar Landing 3D Globe"],
    experience: "Rendered interactive 3D objects, customized meshes, and optimized shader calls.",
    mobile: false,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 22h20L12 2zM12 7l6 11H6l6-11z" />
      </svg>
    ),
  },
  {
    id: "rwd",
    name: "Responsive Design",
    category: "frontend",
    description: "Responsive layouts scaling fluidly across viewport widths.",
    projects: ["Y2 Solar Website", "Arena AI platform"],
    experience: "Built 15+ complex responsive pages using mobile-first grid techniques.",
    mobile: false,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="20" x="5" y="2" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    id: "html5",
    name: "HTML5",
    category: "frontend",
    description: "Core markup structure for laying out document semantics.",
    projects: ["Y2 Solar Portal", "General Web Works"],
    experience: "Ensured clean semantic hierarchies, unique test IDs, and proper DOM layout nodes.",
    mobile: false,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.625 11.205-.002.24-2.622H5.451l.7 7.875H16.2l-.337 3.738-3.886 1.05-3.864-1.048-.248-2.775H5.116l.462 5.175 6.399 1.737 6.422-1.737.822-9.213H8.531z" />
      </svg>
    ),
  },
  {
    id: "css3",
    name: "CSS3",
    category: "frontend",
    description: "Cascading styles standard for visual layouts and paint behaviors.",
    projects: ["Y2 Solar Style overhaul", "Custom Animations"],
    experience: "Proficient in vanilla custom variables, flexboxes, layouts, and CSS keyframes.",
    mobile: false,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm5.09 9.75h8.605l-.187 2.125H6.381l.233 2.623h7.848l-.343 3.862-3.886 1.05-3.865-1.048-.248-2.775H3.364l.462 5.175 6.399 1.737 6.422-1.737.822-9.213H6.822L6.59 9.75z" />
      </svg>
    ),
  },

  // ==================== BACKEND ====================
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    description: "Asynchronous event-driven JavaScript runtime for scalable network systems.",
    projects: ["Arena AI scoring server", "Dynamic REST APIs"],
    experience: "Configured microservices and handled async file read/write pipelines.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L1.758 5.922v12.156L12 24l10.242-5.922V5.922L12 0zm8.242 16.89l-8.242 4.764-8.242-4.764V7.11L12 2.345l8.242 4.764v9.78z" />
      </svg>
    ),
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    description: "Minimalist server framework for launching robust endpoints.",
    projects: ["Arena AI Backend API", "Y2 Solar backend routing"],
    experience: "Integrated customized middeleware structures and error boundary systems.",
    mobile: false,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 14h6M4 10h6M4 6h6M15 6l5 8M20 6l-5 8" />
      </svg>
    ),
  },
  {
    id: "rest-api",
    name: "REST APIs",
    category: "backend",
    description: "Endpoint contracts mapping CRUD operations over standard HTTP headers.",
    projects: ["Y2 Solar data pipelines", "Arena AI scoring interface"],
    experience: "Configured robust routers and integrated client responses seamlessly.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 17h16M4 12h16M4 7h16M7 21v-4M17 21v-4M7 12V8M17 12V8" />
      </svg>
    ),
  },
  {
    id: "jwt",
    name: "JWT Auth",
    category: "backend",
    description: "Stateless JSON Web Token encoding structure for securing routes.",
    projects: ["Arena AI Login", "Y2 Solar dashboard login"],
    experience: "Integrated secure bearer token auth pipelines, storage, and expirations.",
    mobile: false,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L2 4v7c0 5.52 4.48 10 10 10s10-4.48 10-10V4l-10-10zm0 13c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
      </svg>
    ),
  },

  // ==================== DATABASE ====================
  {
    id: "mongodb",
    name: "MongoDB",
    category: "database",
    description: "Document-based NoSQL database structuring collections in flexible BSON.",
    projects: ["Arena AI user indexes", "Content Database"],
    experience: "Managed indexes, aggregation pipelines, and high-frequency document writes.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.968 0C11.968 0 7.37 5.86 7.37 10.457c0 3.905 2.148 6.446 4.598 6.446 2.45 0 4.598-2.54 4.598-6.446C16.566 5.86 11.968 0 11.968 0zm.04 18.257c-2.457.067-4.908-1.572-5.748-4.041a.333.333 0 01.32-.438c.677 0 1.258.455 1.488.948.718 1.545 2.316 2.53 4.148 2.53s3.43-.985 4.148-2.53c.23-.493.811-.948 1.488-.948a.333.333 0 01.32.438c-.84 2.47-3.29 4.108-5.748 4.041v.001zM11.968 20.35v3.65h.063V20.35h-.063z" />
      </svg>
    ),
  },
  {
    id: "mongoose",
    name: "Mongoose",
    category: "database",
    description: "Schemas modeling driver validator rules over MongoDB driver layers.",
    projects: ["Arena AI Database Schema"],
    experience: "Structured robust models, validators, auto-populates, and pre/post hooks.",
    mobile: false,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "database",
    description: "Open-source PostgreSQL database environment with real-time replication.",
    projects: ["Y2 Solar data flows"],
    experience: "Integrated table schemas, row-level security (RLS), and database webhooks.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.362 10.362a.844.844 0 00-.776-.798l-7.79-.58L17.755.776A.843.843 0 0016.98.02L2.638 5.753a.844.844 0 00-.097 1.547l7.79.58-4.96 8.208a.843.843 0 00.775.756h.023l14.342-5.733a.844.844 0 00.851-.75zm-11.455.518L6.87 15.34l3.153-5.215-.226-.017-3.905-.29 7.238-2.898-3.037 5.023.226.017 3.905.29L7.237 15.15l2.67-4.27z" />
      </svg>
    ),
  },

  // ==================== AI & LLMs ====================
  {
    id: "openai",
    name: "OpenAI API",
    category: "ai",
    description: "Endpoints to run complex semantic processing over GPT models.",
    projects: ["Arena AI Evaluator"],
    experience: "Structured system prompt structures, JSON modes, and token budget trims.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.3 10.32a5.7 5.7 0 00-1-3.66 5.86 5.86 0 00-3.3-2.3 5.76 5.76 0 00-5.18.66A5.7 5.7 0 008 3.56a5.86 5.86 0 00-2.3 3.3 5.76 5.76 0 00.66 5.18 5.7 5.7 0 00-1.68 3.68 5.86 5.86 0 003.3 2.3 5.76 5.76 0 005.18-.66 5.7 5.7 0 003.82 1.46 5.86 5.86 0 002.3-3.3 5.76 5.76 0 00-.66-5.2zm-9.3 8.35a3.3 3.3 0 01-1.65-.45l3.23-1.87v3.74a3.3 3.3 0 01-1.58-1.42zm-5.88-3.4a3.3 3.3 0 010-1.7l3.23 1.86v3.74a3.3 3.3 0 01-3.23-3.9zm-.88-6a3.3 3.3 0 011.65-.46l-3.23 1.87v-3.74a3.3 3.3 0 011.58 2.33zm5.88 3.4a3.3 3.3 0 010 1.7l-3.23-1.86V6a3.3 3.3 0 013.23 3.9zm.88 6a3.3 3.3 0 01-1.65.46L14.4 13v3.74a3.3 3.3 0 01-1.58-2.33zm5.88-3.4a3.3 3.3 0 010-1.7l3.23 1.86V18a3.3 3.3 0 01-3.23-3.9zm-4.76-2.75l-1.62-.93 1.62-.93 1.62.93-1.62.93z" />
      </svg>
    ),
  },
  {
    id: "cohere",
    name: "Cohere API",
    category: "ai",
    description: "Semantic representation and retrieval engines for LLM prompts.",
    projects: ["Arena AI Model Platform"],
    experience: "Integrated Command models and evaluated response output relevancies.",
    mobile: false,
    tablet: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 0-4 4v12a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4Z" />
      </svg>
    ),
  },
  {
    id: "mistral",
    name: "Mistral AI",
    category: "ai",
    description: "High-performance open-weight models for text generation tasks.",
    projects: ["Arena AI Platform"],
    experience: "Analyzed model latency, prompt response times, and accuracy scores.",
    mobile: false,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1v-6s-1 1-4 1-5-2-8-2-4 1-4 1v6z" />
      </svg>
    ),
  },
  {
    id: "prompting",
    name: "Prompt Eng.",
    category: "ai",
    description: "Designing prompt templates to guide LLM response shapes.",
    projects: ["Arena AI evaluation template"],
    experience: "Used few-shot prompting and system boundaries to control model parameters.",
    mobile: false,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "llm-integration",
    name: "LLM Integration",
    category: "ai",
    description: "Orchestrating prompts and API models inside web servers.",
    projects: ["Arena AI Platform"],
    experience: "Integrated streaming responses and structured outputs into Next.js interfaces.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
      </svg>
    ),
  },

  // ==================== TOOLS ====================
  {
    id: "git",
    name: "Git",
    category: "tools",
    description: "Distributed version control system to coordinate file versions.",
    projects: ["Y2 Solar Website", "Arena AI Platform"],
    experience: "Excellent branch strategies, commit hygiene, and conflict resolution flows.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.384 11.232L12.768.616a1.082 1.082 0 00-1.536 0L9.128 2.72l2.944 2.944a3.292 3.292 0 014.28 4.28l2.944 2.944a3.284 3.284 0 011.088 1.088l3-3a1.09 1.09 0 000-1.544zm-14.256 1.44a3.292 3.292 0 01-4.28-4.28L1.904 5.448a1.09 1.09 0 000 1.544l10.616 10.616a1.082 1.082 0 001.536 0l2.104-2.104a3.284 3.284 0 01-1.088-1.088l-5.944-2.744z" />
      </svg>
    ),
  },
  {
    id: "github",
    name: "GitHub",
    category: "tools",
    description: "Cloud host environment hosting Git projects with code review tooling.",
    projects: ["Y2 Solar Repository", "Arena AI Platform"],
    experience: "Integrated automated checking hooks, pull request reviews, and actions.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    id: "postman",
    name: "Postman",
    category: "tools",
    description: "API workspace tool to document, construct, and debug client responses.",
    projects: ["Y2 Solar backend API testing", "Arena AI integration tests"],
    experience: "Configured parameterized test collections and validated routing formats.",
    mobile: false,
    tablet: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4zm0 16c-3.314 0-6-2.686-6-6h12c0 3.314-2.686 6-6 6z" />
      </svg>
    ),
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "tools",
    description: "Cloud hosting platform optimized for serverless compilation and SSR caching.",
    projects: ["Arena AI Platform", "Y2 Solar Staging"],
    experience: "Implemented custom deployment hooks and resolved routing redirects.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 22.525H0L12 1.732z" />
      </svg>
    ),
  },
  {
    id: "render",
    name: "Render",
    category: "tools",
    description: "Modern cloud platform to build, run and scale static and server applications.",
    projects: ["Arena AI Express.js backend"],
    experience: "Configured environment variables, databases, and cron endpoints.",
    mobile: false,
    tablet: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M3 12h18M3 6h18M3 18h18" />
      </svg>
    ),
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "tools",
    description: "Extensible code editor optimized for web layouts and type testing.",
    projects: ["All Projects"],
    experience: "Configured custom linters, workspace layouts, debugger points, and terminal routines.",
    mobile: false,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6l9 6-9 6V6zm18 0l-9 6 9 6V6z" />
      </svg>
    ),
  },

  // ==================== OPTIMIZATION ====================
  {
    id: "seo",
    name: "SEO Optimization",
    category: "optimization",
    description: "Tuning metadata, sitemaps, and layout structures for visibility.",
    projects: ["Y2 Solar Website"],
    experience: "Implemented customized dynamic JSON-LD tags, robot files, and alt properties.",
    mobile: false,
    tablet: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: "ssr",
    name: "SSR",
    category: "optimization",
    description: "Compiling HTML templates on the backend to render layout frames instantly.",
    projects: ["Y2 Solar Website", "Arena AI Platform"],
    experience: "Configured pre-render loops, optimized dynamic headers, and cached API responses.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: "perf",
    name: "Performance",
    category: "optimization",
    description: "Profiling frame paint delays and minimizing asset packages.",
    projects: ["Y2 Solar Website", "Arena AI Platform"],
    experience: "Reduced server response times and decoupled render cycles.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    id: "vitals",
    name: "Core Web Vitals",
    category: "optimization",
    description: "Metrics evaluating layout shifts, largest elements, and load times.",
    projects: ["Y2 Solar Website"],
    experience: "Enhanced CLS, LCP, and FID to drive Lighthouse scores to 95+.",
    mobile: false,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18M3 15h18" />
      </svg>
    ),
  },
  {
    id: "api-opt",
    name: "API Optimization",
    category: "optimization",
    description: "Decoupling API threads to execute queries concurrently.",
    projects: ["Arena AI Platform"],
    experience: "Orchestrated parallel model pipelines to cut response times by 40-60%.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 7h-9m9 5H9m11 5H9M4 7v10" />
      </svg>
    ),
  },
];

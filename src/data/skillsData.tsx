import React from "react";

export interface SkillItem {
  id: string;
  name: string;
  category: "languages" | "frontend" | "backend" | "databases" | "ai" | "tools" | "deployment";
  description: string;
  projects: string[];
  experience: string;
  mobile: boolean;
  tablet: boolean;
  icon: React.ReactNode;
}

export const skillsData: SkillItem[] = [
  // ==================== LANGUAGES ====================
  {
    id: "javascript",
    name: "JavaScript (ES6+)",
    category: "languages",
    description: "Core scripting language for interactive frontends and servers.",
    projects: ["Arena AI", "Y2 Solar Website"],
    experience: "Deep understanding of ES6+, asynchronous control flows, and DOM manipulation.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#F7DF1E">
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
      <svg viewBox="0 0 24 24" fill="#3178C6">
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
      <svg viewBox="0 0 24 24" fill="#3776AB">
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
      <svg viewBox="0 0 24 24" fill="#E76F51">
        <path d="M9.024 18s-.853.48-1.52.8c-1.33.64-1.92 1.28-1.92 1.92 0 1.07 1.76 1.76 4.416 1.76 3.15 0 4.8-1.07 4.8-2.13 0-.64-.53-1.07-1.52-1.49l-1.07-.43s1.28-.43 1.92-.85c1.17-.75 1.71-1.71 1.71-2.77 0-2.35-2.67-3.41-2.67-3.41s2.24-.75 2.24-2.24c0-1.71-1.92-2.56-1.92-2.56s1.28-.75 1.28-1.71c0-1.5-1.5-2.24-1.5-2.24S14.25 1.5 13.5.75c-1.2-.86-3.2-.75-3.2-.75s1.2 1.2.75 1.92c-.32.48-1.17.75-1.71 1.17-.96.75-1.39 1.71-1.39 2.67 0 1.92 1.71 2.77 1.71 2.77s-1.92.53-2.35 1.71c-.32.85-.21 1.71.21 2.35.53.75 1.6 1.28 1.6 1.28s-1.92.64-2.35 1.6c-.32.75-.32 1.6.21 2.35.64.85 2.03 1.39 2.03 1.39z" />
      </svg>
    ),
  },
  {
    id: "c-lang",
    name: "C",
    category: "languages",
    description: "Low-level system programming language.",
    projects: ["Memory Allocation Research", "Data Structures Implementation"],
    experience: "Strong knowledge of pointer arithmetic, memory management, and file systems.",
    mobile: false,
    tablet: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="#A8B9CC">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.29 14.29c-.39.39-.9.59-1.54.59-.62 0-1.12-.2-1.52-.61-.39-.4-.59-.96-.59-1.66v-4.57c0-.72.2-1.28.59-1.68.39-.4.9-.6 1.54-.6.64 0 1.15.2 1.53.6.39.4.58.96.58 1.69h-2.1v4.54h2.1v1.7z" />
      </svg>
    ),
  },
  {
    id: "html5",
    name: "HTML5",
    category: "languages",
    description: "Standard markup language for modern semantic web layouts.",
    projects: ["Y2 Solar Website", "Frontend Components Library"],
    experience: "Comprehensive knowledge of semantic HTML5 nodes, accessibilities, and web guidelines.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#E34F26">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.042 5.75H5.466l.24 2.725h10.122l-.275 3.09-3.57 1.01-3.58-.99-.23-2.61H5.43l.43 4.885 6.123 1.7 6.136-1.685.586-6.59-.163-1.545z" />
      </svg>
    ),
  },
  {
    id: "css3",
    name: "CSS3",
    category: "languages",
    description: "Stylesheet language used for describing the visual formatting of documents.",
    projects: ["Y2 Solar Website", "Custom Animations Overhaul"],
    experience: "Advanced usage of Flexbox, CSS Grid, media queries, keyframe animations, and custom variables.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#1572B6">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.098 5.725H5.41l.244 2.75h10.428l-.32 3.593-3.785 1.054-3.797-1.042-.244-2.755H5.163l.458 5.16 6.356 1.765 6.37-1.75.642-7.227-.05-.598z" />
      </svg>
    ),
  },

  // ==================== FRONTEND ====================
  {
    id: "react",
    name: "React.js",
    category: "frontend",
    description: "Component-driven user interface library.",
    projects: ["Arena AI", "Y2 Solar Website"],
    experience: "Expertise in virtual DOM models, custom hooks, and context state trees.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#61DAFB">
        <path d="M24 10.744c0 3.328-4.704 6.128-11.232 6.544 5.376.624 9.312 2.656 9.312 5.056 0 3.232-7.136 5.856-15.936 5.856-7.856 0-14.336-2.096-15.68-4.992.832 2.656 6.88 4.736 14.176 4.736 8.8 0 15.936-2.624 15.936-5.856 0-2.016-2.784-3.808-7.168-4.768 4.88-.224 8.768-1.584 8.768-3.136 0-1.632-4.224-3.072-9.696-3.232 5.568-.784 9.696-2.88 9.696-5.328 0-3.232-7.136-5.856-15.936-5.856-8.8 0-15.936 2.624-15.936 5.856 0 2.448 4.128 4.544 9.696 5.328-5.472.16-9.696 1.6-9.696 3.232 0 1.552 3.888 2.912 8.768 3.136-4.384.96-7.168 2.752-7.168 4.768 0 3.232 7.136 5.856 15.936 5.856 8.8 0 15.936-2.624 15.936-5.856 0-2.4-3.936-4.432-9.312-5.056 6.528-.416 11.232-3.216 11.232-6.544zM12 14.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    description: "React framework for server-rendered and static websites.",
    projects: ["Arena AI Platform", "Y2 Solar Website"],
    experience: "In-depth understanding of App Router model, server components, and cache configurations.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.275 18.256l-5.617-7.227v7.227h-1.636v-10h1.636l5.591 7.2v-7.2h1.636v10h-1.61z" />
      </svg>
    ),
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    category: "frontend",
    description: "Utility-first CSS framework for rapid UI styling.",
    projects: ["Arena AI UI", "Y2 Solar Portal"],
    experience: "Strong usage of fluid layouts, JIT compilers, and dark mode configuration structures.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#38BDF8">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.637C13.666 10.62 15.022 12 18.002 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.637C16.337 6.18 14.981 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.637 1.177 1.2 2.533 2.58 5.513 2.58 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.637C10.337 13.38 8.981 12 6.001 12z" />
      </svg>
    ),
  },
  {
    id: "scss",
    name: "SCSS",
    category: "frontend",
    description: "CSS extension language adding nested syntax, mixins, and inheritance.",
    projects: ["Legacy Theme Refactoring"],
    experience: "Organized scalable stylesheet structures following BEM and modular methodologies.",
    mobile: false,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#CD6799">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.666 17.518c-.894.49-1.92.73-3.078.73-1.655 0-2.905-.49-3.75-1.474-.845-.984-1.267-2.394-1.267-4.23s.427-3.267 1.28-4.238c.854-.97 2.115-1.456 3.784-1.456 1.164 0 2.185.244 3.064.73l-.946 2.052c-.672-.345-1.36-.517-2.062-.517-.833 0-1.46.223-1.884.667-.424.444-.636 1.135-.636 2.072 0 1.01.217 1.745.65 2.203.433.458 1.05.688 1.85.688.75 0 1.452-.187 2.106-.563l.889 1.935z" />
      </svg>
    ),
  },
  {
    id: "threejs",
    name: "Three.js",
    category: "frontend",
    description: "JavaScript 3D library utilizing WebGL.",
    projects: ["Y2 Solar Landing 3D Globe"],
    experience: "Engineered web-based 3D animation scenes, cameras, lighting vectors, and material shaders.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M12 2L2 22h20L12 2zm0 4.8l6.4 12.8H5.6L12 6.8z" />
      </svg>
    ),
  },
  {
    id: "responsive",
    name: "Responsive Web Design",
    category: "frontend",
    description: "Methodology of styling websites for seamless display on all screen sizes.",
    projects: ["Y2 Solar Website", "Arena AI platform"],
    experience: "Expertise in fluid grids, dynamic viewports, responsive asset scaling, and flex layouts.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#FFD84D">
        <path d="M4 2h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-4v2h2v2H6v-2h2v-2H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm0 2v10h16V4H4z" />
      </svg>
    ),
  },

  // ==================== BACKEND ====================
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    description: "Asynchronous event-driven JavaScript runtime environment.",
    projects: ["Arena AI Backend API", "Y2 Solar backend routing"],
    experience: "Deep knowledge of non-blocking I/O, event loops, file systems, and npm structures.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#339933">
        <path d="M12 0L2.4 5.5v11L12 22l9.6-5.5v-11L12 0zm7.2 15.3l-7.2 4.1-7.2-4.1V6.7l7.2-4.1 7.2 4.1v8.6zM12 5.1c-1.8 0-3.3 1.5-3.3 3.3s1.5 3.3 3.3 3.3 3.3-1.5 3.3-3.3-1.5-3.3-3.3-3.3zm0 4.8c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" />
      </svg>
    ),
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    description: "Minimalist web framework for Node.js API servers.",
    projects: ["Arena AI Backend API", "Y2 Solar backend routing"],
    experience: "Designed modular middleware, request/response parsers, and backend routing endpoints.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M24 11.5c0-.825-.675-1.5-1.5-1.5h-5c-.825 0-1.5.675-1.5 1.5v1h5v-1h3v11h-8v-6.5c0-.825-.675-1.5-1.5-1.5h-5c-.825 0-1.5.675-1.5 1.5v6.5h-3v-11h5v1h1.5v-2.5c0-.825-.675-1.5-1.5-1.5h-5c-.825 0-1.5.675-1.5 1.5v16.5c0 .825.675 1.5 1.5 1.5h21c.825 0 1.5-.675 1.5-1.5v-16.5z" />
      </svg>
    ),
  },
  {
    id: "rest-api",
    name: "REST APIs",
    category: "backend",
    description: "Web API standard using HTTP methods and structured payloads.",
    projects: ["Arena AI Backend API", "Y2 Solar Portal APIs"],
    experience: "Expertise in designing clean endpoints, payload structures, HTTP status codes, and API versioning.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#009688">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
      </svg>
    ),
  },
  {
    id: "jwt",
    name: "Authentication (JWT)",
    category: "backend",
    description: "Secure, stateless token-based authorization standard.",
    projects: ["Arena AI Login", "Y2 Solar dashboard login"],
    experience: "Proficient in generating, cryptographically signing, parsing, and validating JSON Web Tokens for auth walls.",
    mobile: false,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#F43F5E">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },

  // ==================== DATABASES ====================
  {
    id: "mongodb",
    name: "MongoDB",
    category: "databases",
    description: "Document-oriented NoSQL database system.",
    projects: ["Arena AI User Database", "General Data stores"],
    experience: "Strong experience in query optimizations, aggregation pipelines, and schema designs.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#47A248">
        <path d="M17.15 10.22c-.13-1.63-.83-3.47-1.84-5.02-.92-1.42-1.99-2.65-2.88-3.5a.6.6 0 0 0-.86 0c-.89.85-1.96 2.08-2.88 3.5-1 1.55-1.7 3.39-1.84 5.02-.27 3.12 1 6.13 2.94 8.08.35.35.72.67 1.1.95v3.45c0 .33.27.6.6.6h.4c.33 0 .6-.27.6-.6v-3.45c.38-.28.75-.6 1.1-.95 1.94-1.95 3.21-4.96 2.94-8.08zM12 16.5c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5z" />
      </svg>
    ),
  },
  {
    id: "mongoose",
    name: "Mongoose",
    category: "databases",
    description: "Document schema modeling library for MongoDB and Node.js.",
    projects: ["Arena AI Database schemas"],
    experience: "Designed structured schemas, query hooks, relational modeling, and built-in type validations.",
    mobile: false,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#880000">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "databases",
    description: "Open-source Firebase alternative built on PostgreSQL.",
    projects: ["Y2 Solar Database & API Integration"],
    experience: "Experienced with row-level security policies, PostgreSQL tables, real-time channels, and auth providers.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#3ECF8E">
        <path d="M21.366 12.186l-8.791-5.18a.9.9 0 0 0-1.354.774v2.793H4.8a.9.9 0 0 0-.69.324l-3.3 3.9a.9.9 0 0 0 .69 1.483h8.79l5.18 8.79a.9.9 0 0 0 1.545-.558v-2.792h6.73a.9.9 0 0 0 .69-.324l3.3-3.9a.9.9 0 0 0-.69-1.483h-8.79z" />
      </svg>
    ),
  },

  // ==================== AI & LLMS ====================
  {
    id: "openai",
    name: "OpenAI API",
    category: "ai",
    description: "Access point to OpenAI's GPT models for structured completions.",
    projects: ["Arena AI Platform", "AI Assistant integrations"],
    experience: "Implemented JSON mode parameter configurations, chat history structures, and model pricing controls.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#10A37F">
        <path d="M21.3 11.2c.2-1.2-.1-2.4-.8-3.4-.6-1-1.6-1.7-2.8-2-.2-.8-.7-1.6-1.3-2.1-.7-.6-1.5-1-2.4-1.1-1-.1-2 .2-2.8.8C10.4 3 9.7 2.3 8.7 2c-1-.3-2-.2-2.9.2-.9.4-1.6 1.1-2 2-.8-.1-1.6.1-2.3.5-.8.5-1.3 1.2-1.6 2.1-.6.4-1 .9-1.3 1.6-.4.8-.5 1.7-.3 2.6.1.9.5 1.7 1.1 2.4-.2 1.2.1 2.4.8 3.4.6 1 1.6 1.7 2.8 2 .2.8.7 1.6 1.3 2.1.7.6 1.5 1 2.4 1.1 1 .1 2-.2 2.8-.8.8.4 1.6 1.1 2.6 1.4 1 .3 2 .2 2.9-.2.9-.4 1.6-1.1 2-2 .8.1 1.6-.1 2.3-.5.8-.5 1.3-1.2 1.6-2.1.6-.4 1-.9 1.3-1.6.4-.8.5-1.7.3-2.6-.1-.9-.5-1.7-1.1-2.4z" />
      </svg>
    ),
  },
  {
    id: "cohere",
    name: "Cohere API",
    category: "ai",
    description: "Natural language processing endpoints for text evaluation.",
    projects: ["Arena AI Platform model duel"],
    experience: "Integrated Command-R endpoints for evaluating context structures and comparing semantic qualities.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#392C7F">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
  {
    id: "mistral",
    name: "Mistral AI",
    category: "ai",
    description: "Open-weights model endpoints for fast natural language processing.",
    projects: ["Arena AI prompt comparison platform"],
    experience: "Integrated Mistral-7B models, optimizing response speeds and temperature configurations.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#FD5A24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
  {
    id: "prompting",
    name: "Prompt Engineering",
    category: "ai",
    description: "Structuring prompt templates for deterministic model responses.",
    projects: ["Arena AI scoring engine validation"],
    experience: "Expertise in few-shot prompting, chain-of-thought instructions, and system role parameters.",
    mobile: false,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#FFD84D">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
  {
    id: "llm-integration",
    name: "LLM Integration",
    category: "ai",
    description: "Integrating large language models directly into web products.",
    projects: ["Arena AI battle arena platform"],
    experience: "Coordinated parallel API streams, structured markdown parsers, and prompt state tracking.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#A78BFA">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },

  // ==================== TOOLS & PLATFORMS ====================
  {
    id: "git",
    name: "Git",
    category: "tools",
    description: "Distributed version control system.",
    projects: ["Arena AI repository management", "Y2 Solar collaboration"],
    experience: "Familiarity with branching models, merging structures, rebasing, and resolution processes.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#F05032">
        <path d="M23.384 11.41L12.59.616a1.686 1.686 0 0 0-2.388 0L9.12 1.696l3.197 3.197a1.687 1.687 0 0 1 2.152 2.152l3.168 3.168a1.687 1.687 0 0 1 2.152 2.16l3.197 3.19c.66.66.66 1.72 0 2.38l-4.1 4.1a1.686 1.686 0 0 1-2.38 0l-3.178-3.18a1.686 1.686 0 0 1-2.152-2.15l-3.187-3.19a1.686 1.686 0 0 1-2.16-2.15L.608 12.58a1.686 1.686 0 0 0 0 2.388l10.794 10.794a1.686 1.686 0 0 0 2.388 0l10.794-10.794a1.686 1.686 0 0 0 0-2.388z" />
      </svg>
    ),
  },
  {
    id: "github",
    name: "GitHub",
    category: "tools",
    description: "Cloud-based hosting service for Git repositories.",
    projects: ["Y2 Solar official repository", "Arena AI platform source"],
    experience: "Managed pull requests, automated review pipelines, and resolved code collision points.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    id: "postman",
    name: "Postman",
    category: "tools",
    description: "API platform for building and testing APIs.",
    projects: ["Y2 Solar backend API testing", "Arena AI integration tests"],
    experience: "Created API collection setups, environment configurations, and automated response checks.",
    mobile: false,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#FF6C37">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "tools",
    description: "Lightweight and extensible source-code editor.",
    projects: ["All Project Codes"],
    experience: "Expert custom debugger configurations, extension profiles, and integrated shell scripting.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#007ACC">
        <path d="M23.984 6.304l-2.73-2.73a1.688 1.688 0 0 0-2.387 0l-5.632 5.632-3.845-3.845a1.687 1.687 0 0 0-2.386 0L.016 12.35a1.688 1.688 0 0 0 0 2.387l2.73 2.73a1.688 1.688 0 0 0 2.387 0l5.632-5.632 3.845 3.845a1.687 1.687 0 0 0 2.386 0l6.988-6.988a1.688 1.688 0 0 0 0-2.388z" />
      </svg>
    ),
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "tools",
    description: "Cloud platform for static sites and serverless functions.",
    projects: ["Arena AI Platform", "Y2 Solar Staging"],
    experience: "Configured staging preview deployments, production routing rules, serverless cold starts, and custom domains.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M24 22.525H0L12 1.475l12 21.05z" />
      </svg>
    ),
  },
  {
    id: "render",
    name: "Render",
    category: "tools",
    description: "Cloud hosting service for web servers and databases.",
    projects: ["Arena AI Express backend"],
    experience: "Configured docker builds, persistent storage volumes, auto-scaling clusters, and health check routes.",
    mobile: false,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#46E3B7">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },

  // ==================== DEPLOYMENT & OPTIMIZATION ====================
  {
    id: "seo",
    name: "SEO Optimization",
    category: "deployment",
    description: "Search engine optimization strategy implementation.",
    projects: ["Y2 Solar Website"],
    experience: "Implemented JSON-LD microdata, dynamic sitemaps, open-graph cards, and structured semantic hierarchies.",
    mobile: false,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#0284C7">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
  {
    id: "ssr",
    name: "Server-Side Rendering (SSR)",
    category: "deployment",
    description: "Pre-rendering web pages on the server upon requests.",
    projects: ["Y2 Solar Website", "Arena AI Platform"],
    experience: "Optimized server responses, database connection sharing, headers, and hybrid static rendering configurations.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#4F46E5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
  {
    id: "performance",
    name: "Performance Optimization",
    category: "deployment",
    description: "Optimizing code execution and asset loads.",
    projects: ["Y2 Solar Website", "Arena AI Platform"],
    experience: "Reduced bundles via tree shaking, code splitting, dynamic imports, and parallel server calls.",
    mobile: true,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#D97706">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
  {
    id: "vitals",
    name: "Core Web Vitals",
    category: "deployment",
    description: "Standardized speed, responsiveness, and visual stability metrics from Google.",
    projects: ["Y2 Solar Website"],
    experience: "Optimized LCP (Largest Contentful Paint), INP (Interaction to Next Paint), and CLS (Cumulative Layout Shift) scores to 95+.",
    mobile: false,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#00A389">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
  {
    id: "api-opt",
    name: "API Optimization",
    category: "deployment",
    description: "Optimizing request parsing speeds and database query plans.",
    projects: ["Arena AI comparison endpoints"],
    experience: "Implemented payload caching, database query indexing, parallel requests, and route payloads compression.",
    mobile: false,
    tablet: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="#0891B2">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
];

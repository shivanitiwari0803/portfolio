"use client";

import React, { useState, useRef } from "react";
import { SkillItem } from "@/data/skillsData";

interface PhysicsCardProps {
  skill: SkillItem;
  cardRef?: (el: HTMLDivElement | null) => void;
  isMobile: boolean;
  staticMode?: boolean;
}

// Brand Colors mapping for soft glow on hover
const brandColors: Record<string, string> = {
  javascript: "#F7DF1E",
  typescript: "#3178C6",
  react: "#61DAFB",
  nextjs: "#FFFFFF",
  nodejs: "#339933",
  express: "#FFFFFF",
  mongodb: "#47A248",
  tailwindcss: "#06B6D4",
  scss: "#CF649A",
  threejs: "#FFFFFF",
  responsive: "#4FC3F7",
  supabase: "#3ECF8E",
  openai: "#412991",
  cohere: "#EEDFD2",
  mistral: "#FD5E09",
  prompting: "#FFD93D",
  "llm-integration": "#4FC3F7",
  git: "#F05032",
  github: "#FFFFFF",
  postman: "#FF6C37",
  vscode: "#007ACC",
  vercel: "#FFFFFF",
  render: "#4FC3F7",
  python: "#3776AB",
  java: "#E76F51",
  "c-lang": "#A8B9CC",
  mongoose: "#880000",
  jwt: "#D63AFF",
  "rest-api": "#FF8C00",
  seo: "#A5FF6A",
  ssr: "#00E5FF",
  performance: "#A5FF6A",
  vitals: "#E040FB",
  "api-opt": "#FFD93D"
};

// Return a short proficiency label for each technology card
const getProficiencyLabel = (id: string): string => {
  const map: Record<string, string> = {
    javascript: "Advanced",
    typescript: "Advanced",
    react: "Advanced",
    nextjs: "Advanced",
    nodejs: "Advanced",
    mongodb: "Intermediate",
    express: "Advanced",
    tailwindcss: "Advanced",
    scss: "Advanced",
    threejs: "Intermediate",
    responsive: "Advanced",
    supabase: "Advanced",
    openai: "Intermediate",
    cohere: "Intermediate",
    mistral: "Intermediate",
    prompting: "Advanced",
    "llm-integration": "Intermediate",
    git: "Advanced",
    github: "Advanced",
    postman: "Advanced",
    vscode: "Advanced",
    vercel: "Advanced",
    render: "Intermediate",
    python: "Intermediate",
    java: "Intermediate",
    "c-lang": "Familiar",
    mongoose: "Intermediate",
    jwt: "Advanced",
    "rest-api": "Advanced",
    seo: "Advanced",
    ssr: "Advanced",
    performance: "Advanced",
    vitals: "Advanced",
    "api-opt": "Advanced"
  };
  return map[id] || "Advanced";
};

// Retrieve official tech logos with their exact brand coloring
const getOfficialLogo = (id: string): React.ReactNode | null => {
  switch (id) {
    case "javascript":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path fill="#F7DF1E" d="M0 0h24v24H0z" />
          <path d="M22 18.27c-.16-.84-.73-1.5-1.89-1.93-1.16-.43-2.59-.7-3.83-1-.83-.18-1.65-.39-2.22-.64-.53-.24-.88-.58-.88-1.13 0-.66.54-1.08 1.35-1.08.79 0 1.3.32 1.57.84.16.29.21.57.22.99h2.72c-.05-1.53-.89-2.71-2.48-3.23-.75-.24-1.64-.36-2.53-.36-1.83 0-3.23.49-4.11 1.49-.71.82-1.04 1.84-1.04 3.12 0 1.95 1.14 2.95 3.14 3.42 1.3.3 2.8.59 3.98.88.82.21 1.41.47 1.7.74.34.3.5.73.5 1.28 0 .8-.66 1.39-1.79 1.39-1.08 0-1.82-.42-2.15-1.16-.17-.39-.2-.8-.22-1.4H6.7c.04 2.03.95 3.32 2.92 3.86 1.05.29 2.06.41 3.1.41 2.23 0 3.86-.57 4.79-1.64.82-.94 1.21-2.2 1.21-3.69z" />
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path fill="#3178C6" d="M0 0h24v24H0z" />
          <path fill="#FFF" d="M22 18.27c-.16-.84-.73-1.5-1.89-1.93-1.16-.43-2.59-.7-3.83-1-.83-.18-1.65-.39-2.22-.64-.53-.24-.88-.58-.88-1.13 0-.66.54-1.08 1.35-1.08.79 0 1.3.32 1.57.84.16.29.21.57.22.99h2.72c-.05-1.53-.89-2.71-2.48-3.23-.75-.24-1.64-.36-2.53-.36-1.83 0-3.23.49-4.11 1.49-.71.82-1.04 1.84-1.04 3.12 0 1.95 1.14 2.95 3.14 3.42 1.3.3 2.8.59 3.98.88.82.21 1.41.47 1.7.74.34.3.5.73.5 1.28 0 .8-.66 1.39-1.79 1.39-1.08 0-1.82-.42-2.15-1.16-.17-.39-.2-.8-.22-1.4H6.7c.04 2.03.95 3.32 2.92 3.86 1.05.29 2.06.41 3.1.41 2.23 0 3.86-.57 4.79-1.64.82-.94 1.21-2.2 1.21-3.69zM10.58 9.79H2.97v2.54h2.53v10.15h2.55v-10.15h2.53z" />
        </svg>
      );
    case "react":
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-full h-full">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );
    case "nextjs":
      return (
        <svg viewBox="0 0 180 180" className="w-full h-full" fill="none">
          <circle cx="90" cy="90" r="90" fill="#000" />
          <path d="M149.508 157.52L69.142 54H54v72h12.142V67.086l71.493 91.821a89.544 89.544 0 0011.873-1.387z" fill="url(#nextGrad)" />
          <rect x="115" y="54" width="12" height="72" fill="url(#nextGrad2)" />
          <defs>
            <linearGradient id="nextGrad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF" />
              <stop offset="1" stopColor="#FFF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="nextGrad2" x1="121" y1="54" x2="121" y2="126" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF" />
              <stop offset="1" stopColor="#FFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "nodejs":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#339933">
          <path d="M12 1.482L1.758 7.397v11.828L12 25.138l10.242-5.913V7.397L12 1.482zm8.814 16.574l-8.814 5.088-8.814-5.088V7.934l8.814-5.088 8.814 5.088v10.122zM12 4.417c-4.188 0-7.583 3.396-7.583 7.583s3.396 7.583 7.583 7.583 7.583-3.396 7.583-7.583c0-4.187-3.395-7.583-7.583-7.583zm0 12.639c-2.792 0-5.056-2.264-5.056-5.056S9.208 6.944 12 6.944s5.056 2.264 5.056 5.056-2.264 5.056-5.056 5.056z" />
        </svg>
      );
    case "mongodb":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
          <path d="M12 .5C12 .5 7 5.5 7 12c0 4.5 2.5 8 5 11.5 2.5-3.5 5-7 5-11.5C17 5.5 12 .5 12 .5zm.5 18.5c-.3 0-.5-.2-.5-.5v-13c0-.3.2-.5.5-.5s.5.2.5.5v13c0 .3-.2.5-.5.5z" fill="#47A248" />
          <path d="M12 23.5c-.3 0-.5-.2-.5-.5V1a.5.5 0 0 1 1 0v22c0 .3-.2.5-.5.5z" fill="#3F3F3F" />
          <path d="M12 .5C12 .5 10 3 10 9c0 4 1 6.5 2 9.5-.5-.5-1-1.5-1.5-3.5C10 13 9 11 9 9c0-4.5 3-8.5 3-8.5z" fill="#589636" />
        </svg>
      );
    case "tailwindcss":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#06B6D4">
          <path d="M12 6.094c-2.932 0-4.887 1.466-5.864 4.398 1.466-1.955 3.176-2.688 5.13-2.199 1.116.28 1.913 1.09 2.796 1.988 1.44 1.467 3.109 3.167 6.634 3.167 2.933 0 4.888-1.467 5.865-4.399-1.467 1.955-3.177 2.688-5.131 2.199-1.116-.28-1.913-1.09-2.796-1.988-1.44-1.467-3.109-3.167-6.634-3.167zm-12 5.864c-2.933 0-4.888 1.467-5.865 4.399 1.467-1.955 3.177-2.688 5.13-2.199 1.117.28 1.914 1.09 2.797 1.988 1.44 1.467 3.11 3.167 6.634 3.167 2.933 0 4.888-1.467 5.865-4.399-1.467 1.955-3.177 2.688-5.131 2.199-1.116-.28-1.913-1.09-2.796-1.988-1.44-1.467-3.11-3.167-6.634-3.167z" />
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#F05032">
          <path d="M23.384 11.616L12.384.616c-.82-.82-2.148-.82-2.968 0L8.248 1.784l3.18 3.18c.62-.213 1.348-.073 1.848.427.5.5.64 1.228.427 1.848l3.18 3.18c.62-.213 1.348-.073 1.848.427.69.69.69 1.808 0 2.498-.69.69-1.808.69-2.498 0-.5-.5-.64-1.228-.427-1.848L12.24 8.44c-.213.62-.073 1.348.427 1.848.5.5 1.228.64 1.848.427l3.18 3.18c.69.69.69 1.808 0 2.498-.69.69-1.808.69-2.498 0-.5-.5-.64-1.228-.427-1.848l-3.18-3.18c-.82.82-2.148.82-2.968 0L.616 12.384c-.82-.82-.82-2.148 0-2.968L11.616.616c.82-.82 2.148-.82 2.968 0l8.8 8.8c.82.82.82 2.148 0 2.968l-8.8 8.8c-.82.82-2.148.82-2.968 0l-1.168-1.168 3.18-3.18c.62.213 1.348.073 1.848-.427z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FFF">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
    case "postman":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FF6C37">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.176 11.516c.394-.367.632-.876.632-1.42 0-1.103-.895-1.996-1.996-1.996h-.667v3.416h2.031zm-6.241-3.416h2.03v3.416h-2.03v-3.416zm-3.666 4.797c.563-.443.903-1.077.903-1.782 0-1.26-.95-2.284-2.122-2.284H3.84v4.066h2.21v-4.066h.001c.563.443.903 1.077.903 1.782 0 1.26-.95 2.284-2.121 2.284h-1.03v2.21h3.13v-2.21z" />
        </svg>
      );
    case "vscode":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#007ACC">
          <path d="M23.985 6.804l-2.062-7.25-13.8 11.83-4.14-3.13-3.98 1.45V18.1l3.98 1.45 4.14-3.13 13.8 11.83 2.062-7.25-5.2-4.12 5.2-4.12zM15.42 12.01l-7.38 5.86V6.15l7.38 5.86z" />
        </svg>
      );
    case "vercel":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FFF">
          <path d="M24 22.525H0L12 1.475z" />
        </svg>
      );
    case "supabase":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#3ECF8E">
          <path d="M21.36 10.45a1.5 1.5 0 00-1.3-1.45L13.78 8.4l3.14-6.3a1.5 1.5 0 00-2.34-1.8l-10.9 10.9a1.5 1.5 0 001.3 2.45h6.28l-3.14 6.3a1.5 1.5 0 002.34 1.8l10.9-10.9a1.5 1.5 0 00.1-1.39z" />
        </svg>
      );
    case "openai":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#412991">
          <path d="M21.3 11.1c.2-.7.1-1.4-.3-2-.3-.5-.8-.8-1.3-.9.1-.4.1-.9 0-1.3-.2-.7-.7-1.2-1.3-1.5-.4-.2-.9-.2-1.3-.1 0-.5-.2-1-.6-1.4-.6-.6-1.5-.8-2.3-.5-.4.2-.7.4-.9.7-.4-.3-.9-.4-1.4-.4-.8 0-1.6.4-2 1.1-.3.4-.4.9-.4 1.4-.4-.1-.9-.1-1.3.1-.7.2-1.2.7-1.5 1.3-.2.4-.2.9-.1 1.3-.5 0-1 .2-1.4.6-.6.6-.8 1.5-.5 2.3.2.4.4.7.7.9-.3.4-.4.9-.4 1.4 0 .8.4 1.6 1.1 2 .4.3.9.4 1.4.4-.1.4-.1.9.1 1.3.2.7.7 1.2 1.3 1.5.4.2.9.2 1.3.1 0 .5.2 1 .6 1.4.6.6 1.5.8 2.3.5.4-.2.7-.4.9-.7.4.3.9.4 1.4.4.8 0 1.6-.4 2-1.1.3-.4.4-.9.4-1.4.4.1.9.1 1.3-.1.7-.2 1.2-.7 1.5-1.3.2-.4.2-.9.1-1.3.5 0 1-.2 1.4-.6.6-.6.8-1.5.5-2.3-.2-.3-.4-.6-.7-.9zm-13.8 2.8l-1.9-1.1 1.1-1.9 1.9 1.1-1.1 1.9zm1-5.1L7.4 7.4 9.3 6.3l1.1 1.9-1.9 1.1zm5.1-1l-1.1-1.9 1.9-1.1 1.1 1.9-1.9 1.1zm4.1 3.2l-1.9-1.1 1.1-1.9 1.9 1.1-1.1 1.9zm-1 5.1l1.1 1.9-1.9 1.1-1.1-1.9 1.9-1.1zm-5.1 1l1.1 1.9-1.9 1.1-1.1-1.9 1.9-1.1z" />
        </svg>
      );
    case "python":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path fill="#3776AB" d="M14.25.189h-4.5c-1.75 0-3.15 1.4-3.15 3.15v2.25h9v-2.25a3.15 3.15 0 00-3.15-3.15zM6.6 6.489h2.25v2.25H6.6v-2.25zm5.4 0h2.25v2.25H12v-2.25z" />
          <path fill="#FFE873" d="M9.75 23.811h4.5c1.75 0 3.15-1.4 3.15-3.15v-2.25h-9v2.25a3.15 3.15 0 003.15 3.15zm7.65-6.3h-2.25v-2.25h2.25v2.25zm-5.4 0h-2.25v-2.25h2.25v2.25zm-5.4-4.5v-2.25c0-1.75 1.4-3.15 3.15-3.15h1.35v1.8h-1.35c-.75 0-1.35.6-1.35 1.35v2.25H6.6zm10.8 0v2.25c0 1.75-1.4 3.15-3.15 3.15h-1.35v-1.8h1.35c.75 0 1.35-.6 1.35-1.35v-2.25h1.8z" />
        </svg>
      );
    case "java":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path fill="#5382A1" d="M19.14 18.06c.07-.15.11-.31.11-.47 0-.3-.15-.59-.44-.88l-1.07-.63s1.28-.43 1.92-.85c1.17-.75 1.71-1.71 1.71-2.77 0-2.35-2.67-3.41-2.67-3.41s2.24-.75 2.24-2.24c0-1.71-1.92-2.56-1.92-2.56s1.28-.75 1.28-1.71c0-1.5-1.5-2.24-1.5-2.24S15.29 1.49 14.54.74c-1.2-.86-3.2-.75-3.2-.75s1.2 1.2.75 1.92c-.32.48-1.17.75-1.71 1.17-.96.75-1.39 1.71-1.39 2.67 0 1.92 1.71 2.77 1.71 2.77s-1.92.53-2.35 1.71c-.32.85-.21 1.71.21 2.35.53.75 1.6 1.28 1.6 1.28s-1.92.64-2.35 1.6c-.32.75-.32 1.6.21 2.35.64.85 2.03 1.39 2.03 1.39z" />
          <path fill="#E76F51" d="M11.34 22.06c2.4 0 4.34-.86 4.34-1.86s-1.94-1.86-4.34-1.86-4.34.86-4.34 1.86 1.94 1.86 4.34 1.86zM11.34 23.94c3.4 0 6.14-.96 6.14-2.14s-2.74-2.14-6.14-2.14-6.14.96-6.14 2.14 2.74 2.14 6.14 2.14z" />
        </svg>
      );
    case "html5":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#E34F26">
          <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm15.6 6h-7.6l.2 2.3h7.2l-.5 5.5-4.3 1.4-4.3-1.4-.3-3.2H4.8l.5 6.2 6.7 2.2 6.7-2.2 1-11.3z" />
        </svg>
      );
    case "css3":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#1572B6">
          <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm15.6 6h-7.6l.2 2.3h7.2l-.5 5.5-4.3 1.4-4.3-1.4-.3-3.2H4.8l.5 6.2 6.7 2.2 6.7-2.2 1-11.3z" />
        </svg>
      );
    case "scss":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#CF649A">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.637 14.18c-.464.708-1.282 1.092-2.124 1.092-.843 0-1.62-.384-2.125-1.092L12 11.23l-1.388 2.95c-.504.708-1.282 1.092-2.124 1.092-.843 0-1.621-.384-2.125-1.092C5.9 13.472 5.54 12.565 5.54 11.53c0-1.036.36-1.943.823-2.651.504-.708 1.282-1.092 2.125-1.092.842 0 1.62.384 2.124 1.092L12 11.83l1.388-2.95c.505-.708 1.282-1.092 2.125-1.092.842 0 1.62.384 2.124 1.092.464.708.824 1.615.824 2.65c0 1.036-.36 1.943-.824 2.651z" />
        </svg>
      );
    case "tailwindcss":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#06B6D4">
          <path d="M12 6.094c-2.932 0-4.887 1.466-5.864 4.398 1.466-1.955 3.176-2.688 5.13-2.199 1.116.28 1.913 1.09 2.796 1.988 1.44 1.467 3.109 3.167 6.634 3.167 2.933 0 4.888-1.467 5.865-4.399-1.467 1.955-3.177 2.688-5.131 2.199-1.116-.28-1.913-1.09-2.796-1.988-1.44-1.467-3.109-3.167-6.634-3.167zm-12 5.864c-2.933 0-4.888 1.467-5.865 4.399 1.467-1.955 3.177-2.688 5.13-2.199 1.117.28 1.914 1.09 2.797 1.988 1.44 1.467 3.11 3.167 6.634 3.167 2.933 0 4.888-1.467 5.865-4.399-1.467 1.955-3.177 2.688-5.131 2.199-1.116-.28-1.913-1.09-2.796-1.988-1.44-1.467-3.11-3.167-6.634-3.167z" />
        </svg>
      );
    case "threejs":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FFF">
          <path d="M12 2L2 22h20L12 2zm0 4.8L18.8 19H5.2L12 6.8z" />
        </svg>
      );
    case "render":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#4FC3F7">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5z" />
        </svg>
      );
    case "jwt":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#D63AFF">
          <rect x="3" y="10" width="18" height="12" rx="3" />
          <path d="M7 10V7a5 5 0 0 1 10 0v3" fill="none" stroke="#D63AFF" strokeWidth="2.5" />
        </svg>
      );
    case "mongoose":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#880000">
          <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm1 14.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-.5-4.5c-.3 0-.5-.2-.5-.5V7a.5.5 0 0 1 1 0v4.5c0 .3-.2.5-.5.5z" />
        </svg>
      );
    case "cohere":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#EEDFD2">
          <circle cx="12" cy="12" r="10" stroke="#EEDFD2" strokeWidth="2" fill="none" />
          <circle cx="12" cy="12" r="5" fill="#EEDFD2" />
        </svg>
      );
    case "mistral":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FD5E09">
          <path d="M4 4h4l4 8 4-8h4v16h-4V9.5l-4 7.5-4-7.5V20H4V4z" />
        </svg>
      );
    case "rest-api":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FF8C00">
          <path d="M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v1.5h14V6a1 1 0 0 0-1-1H6zm13 4.5H5V18a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5zM12 11a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
        </svg>
      );
    case "c-lang":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#A8B9CC">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.29 14.29c-.39.39-.9.59-1.54.59-.62 0-1.12-.2-1.52-.61-.39-.4-.59-.96-.59-1.66v-4.57c0-.72.2-1.28.59-1.68.39-.4.9-.6 1.54-.6.64 0 1.15.2 1.53.6.39.4.58.96.58 1.69h-2.1v4.54h2.1v1.7z" />
        </svg>
      );
    default:
      return null;
  }
};

export const PhysicsCard: React.FC<PhysicsCardProps> = React.memo(({
  skill,
  cardRef,
  isMobile,
  staticMode = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const clickStartRef = useRef({ x: 0, y: 0, time: 0 });

  const getConfidence = (id: string): number => {
    const map: Record<string, number> = {
      javascript: 95,
      typescript: 92,
      react: 94,
      nextjs: 90,
      nodejs: 88,
      mongodb: 85,
      express: 85,
      tailwindcss: 95,
      framer: 88,
    };
    return map[id] || 82;
  };

  const getFunFact = (id: string): string => {
    const map: Record<string, string> = {
      javascript: "Created in just 10 days in 1995.",
      typescript: "Superset that prevents runtime errors.",
      react: "First built to manage Facebook's chat tab.",
      nextjs: "Shivani's go-to for full-stack SSR.",
      nodejs: "Runs V8 engine outside the browser.",
      mongodb: "Stores documents in JSON-like format.",
      express: "Unopinionated node framework.",
      tailwindcss: "Utility-first CSS designed for speed.",
      framer: "Physics-spring based web motions.",
    };
    return map[id] || "A core asset in Shivani's tech stack.";
  };

  // Mouse Down: track position and time to detect click vs drag
  const handleMouseDown = (e: React.MouseEvent) => {
    clickStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    };
  };

  // Mouse Up: check if moved; if not, toggle flip
  const handleMouseUp = (e: React.MouseEvent) => {
    const dx = Math.abs(e.clientX - clickStartRef.current.x);
    const dy = Math.abs(e.clientY - clickStartRef.current.y);
    const dt = Date.now() - clickStartRef.current.time;

    // Click threshold: moved less than 6px and held less than 280ms
    if (dx < 6 && dy < 6 && dt < 280) {
      setIsFlipped(!isFlipped);
    }
  };

  // Holographic reflection tracker
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    e.currentTarget.style.setProperty("--shine-x", `${percentX}%`);
    e.currentTarget.style.setProperty("--shine-y", `${percentY}%`);
    
    // Slight 3D Tilt based on pointer relative to card center
    const tiltX = -(y / rect.height - 0.5) * 16;
    const tiltY = (x / rect.width - 0.5) * 16;
    e.currentTarget.style.setProperty("--tilt-x", `${tiltX}deg`);
    e.currentTarget.style.setProperty("--tilt-y", `${tiltY}deg`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--tilt-x", "0deg");
    e.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  const confidence = getConfidence(skill.id);
  const funFact = getFunFact(skill.id);
  const proficiency = getProficiencyLabel(skill.id);
  const brandColor = brandColors[skill.id] || "#FFD93D";

  // Use official colored SVG icon if mapped; fallback to custom inline SVG
  const officialLogo = getOfficialLogo(skill.id) || skill.icon;

  return (
    <div
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={`physics-card select-none transform-gpu z-20 ${
        staticMode ? "relative cursor-pointer" : "absolute"
      } ${isFlipped ? "flipped-body" : ""}`}
      style={{ touchAction: "none", "--brand-glow": brandColor } as React.CSSProperties}
    >
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`inner-card relative rounded-2xl border border-white/5 transition-all duration-300 transform-gpu ${
          isMobile 
            ? "w-[90px] h-[130px] p-2" 
            : "w-[125px] h-[175px] p-3"
        } ${isFlipped ? "is-flipped" : ""}`}
      >
        {/* Holographic reflection sheet */}
        <div className="holo-shine absolute inset-0 rounded-2xl pointer-events-none z-30" />

        {/* CARD FRONT SIDE */}
        <div className="card-front absolute inset-0 flex flex-col justify-between p-2.5 bg-[#171717] border-2 border-white/10 rounded-2xl overflow-hidden">
          {/* Top Info: Name + ⚡ */}
          <div className="flex items-center justify-between border-b border-[#FFD93D]/30 pb-1">
            <span className="font-display font-extrabold text-[9px] sm:text-[11px] text-white tracking-tight uppercase truncate max-w-[70px]">
              {skill.name.split(" ")[0]}
            </span>
            <span className="text-[10px] text-[#FFD93D] font-bold">⚡</span>
          </div>

          {/* Centered Image/Icon Frame - Glows in Brand Color on Hover */}
          <div className="flex-1 my-1.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:border-[#FFD93D]/30">
            <span className="icon-wrapper w-10 h-10 flex items-center justify-center text-white/80 transition-transform duration-300">
              {officialLogo}
            </span>
          </div>

          {/* Bottom Card Copy */}
          <div className="flex flex-col gap-0.5 border-t border-[#FFD93D]/20 pt-1">
            <span className="text-[7px] text-white/40 font-mono uppercase tracking-wider truncate">
              {skill.category}
            </span>
            <div className="flex justify-between items-center mt-0.5">
              <span className="text-[7.5px] text-[#FFD93D] font-bold font-mono uppercase">{proficiency}</span>
              <span className="text-[8px] text-[#4FC3F7] font-extrabold font-mono">{confidence}%</span>
            </div>
          </div>
        </div>

        {/* CARD BACK SIDE */}
        <div className="card-back absolute inset-0 flex flex-col justify-between p-2.5 bg-[#111111] border-2 border-[#4FC3F7] rounded-2xl overflow-hidden">
          {/* Back Header */}
          <div className="flex items-center justify-between border-b border-[#4FC3F7]/30 pb-1">
            <span className="font-mono text-[9px] font-bold text-[#4FC3F7] tracking-wider uppercase">Technical Stats</span>
            <span className="text-[8px] text-[#4FC3F7]">●</span>
          </div>

          {/* Details Scroll */}
          <div className="flex-1 flex flex-col gap-1.5 my-1.5 justify-center text-left">
            {/* Experience */}
            <div className="flex flex-col">
              <span className="text-[7px] text-white/40 font-mono uppercase">Experience</span>
              <span className="text-[8px] text-white font-semibold font-mono tracking-wide truncate">{skill.experience || "Active usage"}</span>
            </div>
            
            {/* Confidence Progress Bar */}
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between text-[7px] font-mono text-white/40">
                <span>Confidence</span>
                <span className="text-[#A5FF6A]">{confidence}%</span>
              </div>
              <div className="w-full h-1.5 bg-black rounded-full p-[1px] border border-white/10">
                <div 
                  className="h-full bg-[#A5FF6A] rounded-full" 
                  style={{ width: `${confidence}%` }}
                />
              </div>
            </div>

            {/* Fun Fact */}
            <div className="flex flex-col border-t border-white/5 pt-1 overflow-hidden">
              <span className="text-[6px] text-[#FFD93D] font-mono uppercase font-bold">Trivia</span>
              <span className="text-[7px] text-white/60 font-light leading-tight line-clamp-2">{funFact}</span>
            </div>
          </div>

          {/* Pokéball logo stamp */}
          <div className="border-t border-[#4FC3F7]/20 pt-1 flex justify-between items-center text-[7px] font-mono text-white/40">
            <span>SHIVANI.DEV</span>
            <span className="text-[#4FC3F7]">▲</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .physics-card {
          transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity;
        }

        .inner-card {
          cursor: grab;
          transform-style: preserve-3d;
          perspective: 600px;
          transform: rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
        }

        .inner-card:hover {
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.8), 0 0 16px rgba(255, 217, 61, 0.1) !important;
          border-color: #FFD93D !important; /* Pikachu yellow border glow */
        }

        .card-front, .card-back {
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: absolute;
          left: 0;
          top: 0;
        }

        .card-back {
          transform: rotateY(180deg);
        }

        /* 3D Flip class triggers */
        .inner-card.is-flipped .card-front {
          transform: rotateY(180deg);
        }

        .inner-card.is-flipped .card-back {
          transform: rotateY(360deg);
        }

        .inner-card svg {
          width: ${isMobile ? "1.5rem" : "2.0rem"};
          height: ${isMobile ? "1.5rem" : "2.0rem"};
        }

        /* Hover brand icon scale + glow drop shadow */
        .icon-wrapper {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;
          will-change: transform, filter;
        }

        .inner-card:hover .icon-wrapper {
          transform: scale(1.08);
          filter: drop-shadow(0 0 8px var(--brand-glow));
        }

        /* Holographic Shine Glare Overlay */
        .holo-shine {
          background: linear-gradient(
            115deg,
            transparent 20%,
            rgba(255, 217, 61, 0.12) 35%,
            rgba(79, 195, 247, 0.12) 48%,
            rgba(255, 255, 255, 0.18) 55%,
            rgba(79, 195, 247, 0.12) 62%,
            rgba(255, 217, 61, 0.12) 75%,
            transparent 90%
          );
          background-size: 200% 200%;
          mix-blend-mode: color-dodge;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .inner-card:hover .holo-shine {
          opacity: 0.85;
          background-position: var(--shine-x, 50%) var(--shine-y, 50%);
        }
      `}</style>
    </div>
  );
});

PhysicsCard.displayName = "PhysicsCard";
export default PhysicsCard;

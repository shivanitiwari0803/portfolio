"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user has already visited and skipped the loader
    const skipIntro = localStorage.getItem("skip-intro");
    if (skipIntro === "true") {
      document.documentElement.classList.add("loading-complete");
      setLoading(false);
      setProgress(100);
      return;
    }

    // Increment progress bar/charging animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 18);

    // Hide loader after 2.5s and remember preference
    const timeout = setTimeout(() => {
      localStorage.setItem("skip-intro", "true");
      document.documentElement.classList.add("loading-complete");
      window.dispatchEvent(new Event("loading-complete"));
      setLoading(false);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleSkip = () => {
    localStorage.setItem("skip-intro", "true");
    document.documentElement.classList.add("loading-complete");
    window.dispatchEvent(new Event("loading-complete"));
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.03,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 bg-[#0A0A0A] z-[999999] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle lightning flashing behind Pokéball */}
          <motion.div 
            animate={{ 
              opacity: [0.02, 0.08, 0.02, 0.06, 0.02],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-[#FFD93D]/5 pointer-events-none blur-3xl rounded-full"
          />

          <div className="relative flex flex-col items-center justify-center scale-90 sm:scale-100">
            {/* Spinning Electric Circles (charging effect) */}
            <svg className="w-56 h-56 absolute transform -rotate-90 pointer-events-none">
              {/* Blue outer charge ring */}
              <motion.circle
                cx="112"
                cy="112"
                r="96"
                stroke="url(#blueGrad)"
                strokeWidth="1.5"
                fill="transparent"
                strokeDasharray="600"
                animate={{
                  strokeDashoffset: [600, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Yellow inner charge ring */}
              <motion.circle
                cx="112"
                cy="112"
                r="84"
                stroke="url(#yellowGrad)"
                strokeWidth="2"
                fill="transparent"
                strokeDasharray="500"
                animate={{
                  strokeDashoffset: [0, 500],
                  rotate: [360, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              <defs>
                <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4FC3F7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD93D" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#FFD93D" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>

            {/* Pokéball Container with float/breathe */}
            <motion.div
              animate={{ 
                y: [-6, 6, -6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-40 h-40 flex items-center justify-center"
            >
              {/* Custom SVG Pokéball */}
              <motion.svg
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-32 h-32 drop-shadow-[0_0_25px_rgba(255,217,61,0.2)]"
                viewBox="0 0 100 100"
              >
                {/* Red top shell */}
                <path d="M 50,10 A 40 40 0 0 1 90,50 L 78,50 A 28 28 0 0 0 50,22 Z" fill="#E53935" />
                
                {/* White bottom shell */}
                <path d="M 90,50 A 40 40 0 0 1 50,90 L 50,78 A 28 28 0 0 0 78,50 Z" fill="#ECEFF1" />
                
                {/* Dark charcoal center band and outline */}
                <circle cx="50" cy="50" r="40" stroke="#171717" strokeWidth="3" fill="none" />
                <line x1="10" y1="50" x2="90" y2="50" stroke="#171717" strokeWidth="4" />
                
                {/* Center Button Outer */}
                <circle cx="50" cy="50" r="12" fill="#171717" />
                
                {/* Center Button Inner (glowing) */}
                <motion.circle 
                  cx="50" 
                  cy="50" 
                  r="6" 
                  fill="#FFD93D" 
                  animate={{
                    fill: ["#FFD93D", "#FFFFFF", "#FFD93D"],
                    r: [5, 6.5, 5],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.svg>
            </motion.div>

            {/* Exit Flash overlay */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={progress >= 90 ? { scale: [1, 2.5], opacity: [0, 0.9, 0] } : {}}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute w-24 h-24 bg-white rounded-full blur-xl pointer-events-none"
            />
            
            {/* Pikachu tail flashing element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={progress >= 88 ? { opacity: [0, 1, 0], scale: [0.8, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}
              className="absolute pointer-events-none flex items-center justify-center"
            >
              <svg className="w-16 h-16 text-[#FFD93D] filter drop-shadow-[0_0_15px_#FFD93D]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 2L14 10H17L10 22L11 14H8L19 2Z" />
              </svg>
            </motion.div>
          </div>

          {/* Loading Subtitle & Brand Introduction */}
          <div className="mt-12 flex flex-col items-center gap-6 max-w-xl text-center px-6">
            <motion.h1 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-wider leading-tight"
            >
              Building My Dream, <br />
              <span className="text-[#FFD93D] drop-shadow-[0_0_12px_rgba(255,217,61,0.25)]">One Commit</span> at a Time.
            </motion.h1>
            
            {/* Percentage indicator */}
            <div className="text-3xl font-bold font-display text-white/90">
              {progress}%
            </div>

            {/* Premium slim progress bar */}
            <div className="w-56 h-[3px] bg-white/10 rounded-full overflow-hidden mt-1 relative border border-white/5">
              <motion.div 
                className="h-full bg-[#FFD93D] shadow-[0_0_10px_#FFD93D]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Tasteful tribute intro message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-[10px] sm:text-xs font-mono text-white/80 leading-relaxed font-light mt-1"
            >
              A portfolio crafted with a subtle tribute to Pikachu.
            </motion.p>

            {/* Skip Option */}
            <button
              onClick={handleSkip}
              className="mt-4 text-[9px] font-bold font-mono text-white/20 hover:text-white/50 uppercase tracking-widest transition-colors cursor-pointer border border-white/5 px-3.5 py-1 rounded-full bg-white/[0.01]"
            >
              Skip Intro
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";

export default function EasterEggs() {
  const [showShinyPikachu, setShowShinyPikachu] = useState(false);
  const [stormActive, setStormActive] = useState(false);
  const [flashCount, setFlashCount] = useState(0);

  // Key tracking refs
  const konamiIndexRef = useRef(0);
  const wordBufferRef = useRef<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Konami Code Sequence: Up, Up, Down, Down, Left, Right, Left, Right, B, A
  const KONAMI_CODE = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a"
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      // 1. Konami Code detection
      const expectedKey = KONAMI_CODE[konamiIndexRef.current].toLowerCase();
      if (key === expectedKey) {
        konamiIndexRef.current += 1;
        if (konamiIndexRef.current === KONAMI_CODE.length) {
          triggerShinyPikachu();
          konamiIndexRef.current = 0;
        }
      } else {
        // Reset code on wrong key (allow starting again if the key matched the first code key)
        konamiIndexRef.current = key === KONAMI_CODE[0].toLowerCase() ? 1 : 0;
      }

      // 2. Typing "pikachu" detection
      wordBufferRef.current.push(key);
      if (wordBufferRef.current.length > 20) {
        wordBufferRef.current.shift(); // keep buffer small
      }

      const typedWord = wordBufferRef.current.join("");
      if (typedWord.includes("pikachu")) {
        triggerLightningStorm();
        wordBufferRef.current = []; // Reset buffer
      }

      // Clear buffer after 1.5 seconds of inactivity
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        wordBufferRef.current = [];
      }, 1500);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const triggerShinyPikachu = () => {
    if (showShinyPikachu) return;
    setShowShinyPikachu(true);
    setTimeout(() => {
      setShowShinyPikachu(false);
    }, 5500); // GIF takes ~5 seconds to run across screen
  };

  const triggerLightningStorm = () => {
    if (stormActive) return;
    setStormActive(true);
    
    // Simulate flashing sky
    let count = 0;
    const interval = setInterval(() => {
      setFlashCount((prev) => prev + 1);
      count += 1;
      if (count >= 10) {
        clearInterval(interval);
        setStormActive(false);
        setFlashCount(0);
      }
    }, 280);
  };

  // Decide flash opacity based on flashCount
  const getFlashColor = () => {
    if (!stormActive) return "transparent";
    // alternate between white and yellow flashes
    return flashCount % 2 === 0 ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 217, 61, 0.35)";
  };

  return (
    <>
      {/* 1. Lightning Storm overlay */}
      {stormActive && (
        <div 
          className="fixed inset-0 z-[999998] pointer-events-none transition-colors duration-150"
          style={{ backgroundColor: getFlashColor() }}
        />
      )}

      {/* Global rumble shake styles for storm */}
      {stormActive && (
        <style jsx global>{`
          body {
            animation: storm-rumble 0.15s infinite;
          }
          @keyframes storm-rumble {
            0% { transform: translate(0px, 0px) rotate(0deg); }
            20% { transform: translate(-2px, 1px) rotate(-0.5deg); }
            40% { transform: translate(1px, -1px) rotate(0.5deg); }
            60% { transform: translate(-1px, -2px) rotate(0deg); }
            80% { transform: translate(2px, 1px) rotate(0.5deg); }
            100% { transform: translate(-1px, 1px) rotate(-0.5deg); }
          }
        `}</style>
      )}

      {/* 2. Shiny Pikachu Runner */}
      {showShinyPikachu && (
        <div 
          className="fixed bottom-10 left-0 w-auto h-auto pointer-events-none select-none z-[999997]"
          style={{
            animation: "dash-across 5.2s linear forwards",
          }}
        >
          <div className="relative flex flex-col items-center">
            {/* Sparkling text above mascot */}
            <span className="text-[9px] font-mono font-bold text-[#FFD93D] animate-bounce bg-[#171717] px-2 py-0.5 rounded border border-[#FFD93D]/30 shadow-lg">
              ✨ SHINY PIKACHU! ✨
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/gifs/pikachu-run.gif"
              alt="Shiny Pikachu"
              className="w-40 sm:w-56 object-contain filter hue-rotate-[45deg] brightness-[1.25] saturate-[1.6]" // Golden shiny filter
              style={{ transform: "scaleX(-1)" }} // runs left to right
            />
          </div>

          <style jsx>{`
            @keyframes dash-across {
              0% { transform: translateX(-200px); }
              100% { transform: translateX(105vw); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}

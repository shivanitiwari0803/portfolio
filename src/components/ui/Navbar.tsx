"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { EASE_APPLE } from "@/lib/motion";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer Scroll Spy
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -40% 0px", // Triggers when section occupies central viewport area
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setActiveSection(href.slice(1));
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 transition-all duration-500">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE_APPLE }}
          className={`flex items-center justify-between w-full transition-all duration-500 ${
            isScrolled
              ? "max-w-5xl px-8 py-3 rounded-full bg-surface-secondary/85 backdrop-blur-xl border border-accent/40 shadow-[0_4px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,217,61,0.12)]"
              : "max-w-7xl px-8 py-5 bg-transparent border-b border-transparent"
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, "#home")}
            className="text-lg font-display font-extrabold tracking-tight text-white hover:text-accent transition-colors duration-300 flex items-center gap-1.5"
          >
            SHIVANI
            <span className="text-accent inline-block ml-0.5">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
              </svg>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className={`hidden md:flex items-center gap-8 ${isScrolled ? "gap-6 text-sm" : "text-base"}`}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={`relative font-medium py-1 transition-all duration-300 flex items-center gap-1.5 group ${
                    isActive ? "text-accent drop-shadow-[0_0_6px_rgba(255,217,61,0.6)]" : "text-white/70 hover:text-white"
                  }`}
                >
                  {/* Pokemon Menu style selector pointer */}
                  {isActive && (
                    <motion.span
                      layoutId="activePointer"
                      className="text-accent text-[11px] mr-0.5 animate-[pulse_1.5s_infinite]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    >
                      ▶
                    </motion.span>
                  )}
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden p-2 text-white/80 hover:text-accent focus:outline-none transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} className="text-accent" /> : <Menu size={20} />}
          </button>
        </motion.nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: EASE_APPLE }}
            className="fixed inset-0 z-40 bg-surface-primary/98 backdrop-blur-lg md:hidden flex flex-col justify-center items-center gap-8 border-b border-accent/30"
          >
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={`text-2xl font-display font-medium transition-colors duration-300 flex items-center gap-2 ${
                    isActive ? "text-accent drop-shadow-[0_0_8px_rgba(255,217,61,0.5)]" : "text-white/80 hover:text-white"
                  }`}
                >
                  {isActive && <span className="text-accent text-sm animate-pulse">▶</span>}
                  {item.label}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

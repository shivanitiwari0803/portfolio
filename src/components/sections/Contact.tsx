"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { EASE_APPLE } from "@/lib/motion";

interface ContactCard {
  title: string;
  value: string;
  href: string;
  icon: React.ReactNode;
  isMail?: boolean;
}

const CONTACT_CARDS: ContactCard[] = [
  {
    title: "Email",
    value: "shivanitwr0803@gmail.com",
    href: "mailto:shivanitwr0803@gmail.com",
    icon: <Mail className="text-[#FFD93D]" size={20} />,
    isMail: true,
  },
  {
    title: "GitHub",
    value: "@shivanitwr0803",
    href: "https://github.com/shivanitiwari0803",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#4FC3F7]">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    title: "LinkedIn",
    value: "Shivani Tiwari",
    href: "https://www.linkedin.com/in/shivani-tiwari-8571a729a/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#FFD93D]">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [chargeProgress, setChargeProgress] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setChargeProgress(0);

    // Charge button progress simulation (loading jingle effect)
    const interval = setInterval(() => {
      setChargeProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 80);

    await new Promise((resolve) => setTimeout(resolve, 1800));
    clearInterval(interval);
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", message: "" });

    // Hide success banner after 4.5 seconds
    setTimeout(() => setIsSubmitted(false), 4500);
  };

  return (
    <section 
      id="contact" 
      className="py-28 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full select-none relative overflow-hidden"
    >
      {/* Background glow resembling healing lights */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#FFD93D]/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col gap-2.5 mb-16 text-left">
        <span className="text-xs font-semibold tracking-widest text-[#FFD93D] uppercase font-mono">
          06 / Connect
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white uppercase">
          Let&apos;s Build Something Legendary.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto text-left">
        
        {/* Left Side: Contact Info Info (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-display font-extrabold text-white flex items-center gap-2.5 uppercase">
              <MessageSquare size={20} className="text-[#FFD93D]" />
              Connection Channels
            </h3>
            <p className="text-sm text-[#9E9E9E] leading-relaxed font-light">
              Have an idea, project, or opportunity you&apos;d like to discuss? Select a channel below or drop me a message, and I&apos;ll get back to you shortly.
            </p>
          </div>

          {/* Premium Cards Grid */}
          <div className="grid grid-cols-1 gap-4">
            {CONTACT_CARDS.map((card, idx) => (
              <motion.a
                key={idx}
                href={card.href}
                target={card.isMail ? undefined : "_blank"}
                rel={card.isMail ? undefined : "noopener noreferrer"}
                whileHover={{ y: -4, borderColor: "rgba(255, 217, 61, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="p-5 rounded-2xl bg-[#171717]/85 relative overflow-hidden flex flex-col gap-2.5 group border border-white/5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,217,61,0.06)] cursor-pointer"
              >
                {/* Visual card glow inside */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full blur-[30px] pointer-events-none transition-all duration-500 group-hover:bg-white/[0.03]" />

                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/5 rounded-xl border border-white/5 group-hover:border-[#FFD93D]/20 group-hover:bg-[#FFD93D]/5 transition-colors duration-500">
                    {card.icon}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-wide">
                      {card.title}
                    </span>
                    <span className="text-sm font-mono text-white group-hover:text-[#FFD93D] transition-colors duration-300 break-all">
                      {card.value}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right Side: Contact Form styled as Pokémon Center (col-span-7) */}
        <div className="lg:col-span-7">
          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-6 p-8 rounded-3xl bg-[#171717] border border-white/5 relative overflow-hidden"
          >
            {/* Healing machine scanner light overlay */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD93D]/30 to-transparent animate-[pulse_3s_infinite]" />

            {/* Success message overlay */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#0A0A0A]/95 backdrop-blur-md flex flex-col items-center justify-center gap-5 z-40 p-6 text-center"
                >
                  {/* Lightning explosion / Pokeball closing */}
                  <motion.div
                    initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="relative w-28 h-28 flex items-center justify-center"
                  >
                    {/* Glowing sparks behind Pokéball */}
                    <div className="absolute inset-0 bg-[#FFD93D]/10 rounded-full animate-ping blur-md" />
                    
                    {/* Pokéball SVG locked shut */}
                    <svg className="w-20 h-20 drop-shadow-[0_0_15px_#FFD93D]" viewBox="0 0 100 100">
                      <path d="M 50,10 A 40 40 0 0 1 90,50 L 78,50 A 28 28 0 0 0 50,22 Z" fill="#E53935" />
                      <path d="M 90,50 A 40 40 0 0 1 50,90 L 50,78 A 28 28 0 0 0 78,50 Z" fill="#ECEFF1" />
                      <circle cx="50" cy="50" r="40" stroke="#171717" strokeWidth="5" fill="none" />
                      <line x1="10" y1="50" x2="90" y2="50" stroke="#171717" strokeWidth="6" />
                      <circle cx="50" cy="50" r="14" fill="#171717" />
                      <circle cx="50" cy="50" r="7" fill="#A5FF6A" stroke="#FFFFFF" strokeWidth="1" /> {/* Green light = success */}
                    </svg>
                  </motion.div>

                  <h3 className="text-2xl font-display font-extrabold text-white tracking-tight uppercase">
                    Transmission Secured!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9E9E9E] max-w-sm leading-relaxed font-light">
                    Your message has been processed successfully. Nurse Joy has queued it for Shivani&apos;s review. Expect a response soon!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[10px] font-bold font-mono tracking-widest text-white/40 uppercase">
                Trainer Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formState.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="px-5 py-4 rounded-2xl bg-black/40 border border-white/5 text-sm text-white font-mono placeholder-white/20 focus:outline-none focus:border-[#FFD93D] focus:shadow-[0_0_15px_rgba(255,217,61,0.15)] transition-all duration-300 disabled:opacity-50"
                placeholder="Enter name..."
              />
            </div>

            {/* Input Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[10px] font-bold font-mono tracking-widest text-white/40 uppercase">
                Trainer Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formState.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="px-5 py-4 rounded-2xl bg-black/40 border border-white/5 text-sm text-white font-mono placeholder-white/20 focus:outline-none focus:border-[#FFD93D] focus:shadow-[0_0_15px_rgba(255,217,61,0.15)] transition-all duration-300 disabled:opacity-50"
                placeholder="Enter email..."
              />
            </div>

            {/* Input Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-[10px] font-bold font-mono tracking-widest text-white/40 uppercase">
                Battle Strategy / Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formState.message}
                onChange={handleChange}
                disabled={isSubmitting}
                className="px-5 py-4 rounded-2xl bg-black/40 border border-white/5 text-sm text-white font-mono placeholder-white/20 focus:outline-none focus:border-[#FFD93D] focus:shadow-[0_0_15px_rgba(255,217,61,0.15)] transition-all duration-300 disabled:opacity-50 resize-none"
                placeholder="Write your brief..."
              />
            </div>

            {/* Submit button: Charge & Send */}
            <button
              type="submit"
              disabled={isSubmitting || !formState.name || !formState.email || !formState.message}
              className="relative overflow-hidden w-full py-4.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FFD93D]/30 hover:bg-[#FFD93D]/5 text-white hover:text-[#FFD93D] font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:bg-transparent disabled:hover:text-white"
            >
              {/* Charging electricity meter */}
              {isSubmitting && (
                <div 
                  className="absolute inset-0 bg-[#FFD93D]/10 h-full transition-all duration-100 border-r border-[#FFD93D]/35" 
                  style={{ width: `${chargeProgress}%` }}
                />
              )}

              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>⚡ Charging Engine ({chargeProgress}%) ⚡</>
                ) : (
                  <>
                    <Send size={13} />
                    Charge &amp; Send Message
                  </>
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

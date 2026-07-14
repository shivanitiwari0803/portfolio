"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Mail, MessageSquare } from "lucide-react";
import gsap from "gsap";
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
    icon: <Mail className="text-accent" size={20} />,
    isMail: true,
  },
  {
    title: "GitHub",
    value: "@shivanitwr0803",
    href: "https://github.com/shivanitwr0803",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    title: "LinkedIn",
    value: "Shivani Tiwari",
    href: "https://linkedin.com/in/shivani-tiwari-0803",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-accent">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    title: "X (Twitter)",
    value: "@shivani_tw",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", message: "" });

    // Reset success banner after 4 seconds
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  useEffect(() => {
    // Magnetic Submit Button Effect
    const btn = submitButtonRef.current;
    if (btn && !isSubmitting && !isSubmitted) {
      const onMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const onMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      };

      btn.addEventListener("mousemove", onMouseMove);
      btn.addEventListener("mouseleave", onMouseLeave);

      return () => {
        btn.removeEventListener("mousemove", onMouseMove);
        btn.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, [isSubmitting, isSubmitted]);

  return (
    <section id="contact" className="py-24 px-8 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto w-full select-none relative">
      {/* Background ambient glowing details */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-16">
        <span className="text-xs font-semibold tracking-wider text-accent uppercase">06 / Connect</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
          Let&apos;s Build Something Epic Together.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
        {/* Contact Info & Social Cards (Col span 6) */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-2">
              <MessageSquare size={22} className="text-accent" />
              Get In Touch
            </h3>
            <p className="text-sm md:text-base text-text-muted leading-relaxed font-light">
              Have an idea, project, or opportunity you&apos;d like to discuss? Select a channel below or drop me a message, and I&apos;ll get back to you shortly.
            </p>
          </div>

          {/* Premium Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONTACT_CARDS.map((card, idx) => (
              <motion.a
                key={idx}
                href={card.href}
                target={card.isMail ? undefined : "_blank"}
                rel={card.isMail ? undefined : "noopener noreferrer"}
                whileHover={{ y: -6, borderColor: "rgba(251, 191, 36, 0.3)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease: EASE_APPLE }}
                className="p-5 rounded-2xl glass-panel relative overflow-hidden flex flex-col gap-3 group border border-white/5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.05)] cursor-pointer"
              >
                {/* Visual card glow inside */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/2 rounded-full blur-[30px] pointer-events-none transition-all duration-500 group-hover:bg-accent/5" />

                <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 w-fit group-hover:bg-accent-muted group-hover:border-accent/20 transition-colors duration-500">
                  {card.icon}
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-wide">
                    {card.title}
                  </span>
                  <span className="text-sm font-mono text-white group-hover:text-accent transition-colors duration-300 break-words">
                    {card.value}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Contact Form (Col span 6) */}
        <div className="lg:col-span-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 rounded-3xl glass-panel relative overflow-hidden">
            {/* Success message overlay */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center gap-4 z-20"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <CheckCircle2 size={50} className="text-accent" />
                  </motion.div>
                  <h3 className="text-xl font-display font-semibold text-white">Message Sent!</h3>
                  <p className="text-sm text-text-muted text-center px-8 font-light">
                    Thank you for reaching out. I will respond to your message as soon as possible.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Name Input */}
            <div className="flex flex-col gap-1.5 relative">
              <label htmlFor="name" className="text-xs font-semibold text-white/60 uppercase tracking-wide">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="John Doe"
                className="px-5 py-4 rounded-xl bg-white/5 border border-white/5 focus:border-accent/30 focus:bg-white/[0.08] text-white placeholder-white/20 text-sm focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5 relative">
              <label htmlFor="email" className="text-xs font-semibold text-white/60 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="john@example.com"
                className="px-5 py-4 rounded-xl bg-white/5 border border-white/5 focus:border-accent/30 focus:bg-white/[0.08] text-white placeholder-white/20 text-sm focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Message Input */}
            <div className="flex flex-col gap-1.5 relative">
              <label htmlFor="message" className="text-xs font-semibold text-white/60 uppercase tracking-wide">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formState.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="Describe your project, ideas, or questions..."
                className="px-5 py-4 rounded-xl bg-white/5 border border-white/5 focus:border-accent/30 focus:bg-white/[0.08] text-white placeholder-white/20 text-sm focus:outline-none transition-all duration-300 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              ref={submitButtonRef}
              type="submit"
              disabled={isSubmitting}
              className="group self-start flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-black font-semibold rounded-full shadow-lg shadow-accent/10 transition-colors duration-300 mt-2 disabled:bg-accent/50 disabled:cursor-not-allowed shrink-0 font-sans"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

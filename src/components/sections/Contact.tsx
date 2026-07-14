"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Mail } from "lucide-react";
import gsap from "gsap";

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
    // Simulate API request
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
        <span className="text-xs font-semibold tracking-wider text-accent uppercase">07 / Connect</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
          Let&apos;s build something together.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
        {/* Contact Info & Socials (Col span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl md:text-2xl font-semibold text-white">Get In Touch</h3>
            <p className="text-sm md:text-base text-text-muted leading-relaxed font-light">
              Have an idea, project, or opportunity you&apos;d like to discuss? Drop me a message, and I&apos;ll get back to you within 24 hours.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="mailto:shivanitwr0803@gmail.com"
              className="flex items-center gap-3 text-sm text-text-muted hover:text-accent transition-colors duration-300 font-mono"
            >
              <Mail size={16} />
              shivanitwr0803@gmail.com
            </a>
            <a
              href="tel:+918851725663"
              className="flex items-center gap-3 text-sm text-text-muted hover:text-accent transition-colors duration-300 font-mono"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +91 8851725663
            </a>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-4 pt-6 border-t border-white/5">
            <h4 className="text-xs font-semibold tracking-wider text-white/50 uppercase">Follow Me</h4>
            <div className="flex items-center gap-3">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  ),
                  href: "https://github.com/shivanitwr0803",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ),
                  href: "https://linkedin.com/in/shivani-tiwari-0803",
                },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 border border-white/5 text-white/70 hover:text-accent hover:border-accent/30 hover:bg-accent-muted transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form (Col span 7) */}
        <div className="lg:col-span-7">
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
                rows={5}
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
              className="group self-start flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-black font-semibold rounded-full shadow-lg shadow-accent/10 transition-colors duration-300 mt-2 disabled:bg-accent/50 disabled:cursor-not-allowed shrink-0"
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

      {/* Footer Details */}
      <div className="mt-32 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted font-medium select-none">
        <div>&copy; {new Date().getFullYear()} Creative Dev. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
        </div>
      </div>
    </section>
  );
}

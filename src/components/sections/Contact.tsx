"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, FileText } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import custom split components & services
import { FormState, validateForm, ValidationErrors } from "./contact/FormValidation";
import { sendContactEmail } from "./contact/EmailService";
import { Toast, ToastContainer } from "./contact/ToastNotification";
import { LoadingButton } from "./contact/LoadingButton";

gsap.registerPlugin(ScrollTrigger);

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
    value: "@shivanitiwari0803",
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
  {
    title: "X (Twitter)",
    value: "@shivanitwr0803",
    href: "https://x.com/ishivanitwr",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white/90">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    title: "LeetCode",
    value: "shivanitwr0803",
    href: "https://leetcode.com/u/shivanitwr0803/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#FFA116]">
        <path d="M13.483 0a1.374 1.374 0 00-.961.414L7.116 5.79a1.37 1.37 0 00-.415.953v1.402L1.267 13.56a3.834 3.834 0 000 5.437l1.737 1.737a3.834 3.834 0 005.437 0l5.416-5.416h1.402c.36 0 .707-.144.953-.415l5.376-5.376A1.377 1.377 0 0021.2 7.7a1.362 1.362 0 00-.961-.414h-2.671V4.615H13.48zM14.88 4.615h2.67v2.671H14.88zm-2.67 2.671h2.671v2.67H12.21zm-2.671 2.67h2.67v2.672h-2.67zm-2.67 2.672h2.67v2.67h-2.67zM14.07 14.88l-5.416 5.416a2.463 2.463 0 01-3.48 0l-1.738-1.738a2.463 2.463 0 010-3.48l5.417-5.417h1.4a1.377 1.377 0 00.962-.414l2.67-2.67v1.4c0 .36.145.707.414.953l2.672 2.671z" />
      </svg>
    ),
  },
  {
    title: "Resume",
    value: "Shivani_Tiwari_Resume.pdf",
    href: "/Shivani_Tiwari_Resume.pdf",
    icon: <FileText className="text-[#FFD93D]" size={20} />,
  },
];

export default function Contact() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    company: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const toastIdCounter = useRef(0);

  // Animate Contact Section entrance on Scroll with GSAP
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Set initial transparent/offset states
      gsap.set(".contact-heading", { opacity: 0, y: 30 });
      gsap.set(".connection-card", { opacity: 0, y: 15 });
      gsap.set(".form-container", { opacity: 0, y: 35 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.to(".contact-heading", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
        .to(".connection-card", { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power2.out" }, "-=0.5")
        .to(".form-container", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");
    }, section);

    return () => ctx.revert();
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: "success" | "error" | "info" = "info") => {
    toastIdCounter.current += 1;
    const id = toastIdCounter.current.toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove toast after 4.5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [removeToast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => {
      const next = { ...prev, [name]: value };
      
      // Real-time error validation
      if (touched[name]) {
        const validation = validateForm(next);
        setErrors((prevErr) => ({
          ...prevErr,
          [name]: (validation as Record<string, string | undefined>)[name],
        }));
      }
      return next;
    });
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validation = validateForm(formState);
    setErrors((prevErr) => ({
      ...prevErr,
      [field]: (validation as Record<string, string | undefined>)[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields touched
    const touchedFields: Record<string, boolean> = {};
    Object.keys(formState).forEach((key) => {
      touchedFields[key] = true;
    });
    setTouched(touchedFields);

    // Validate
    const validationErrors = validateForm(formState);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      addToast("Please correct the errors in the form before sending.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendContactEmail(formState);
      
      if (!result.success) {
        setIsSubmitting(false);
        addToast(result.error || "Unable to send your message right now.", "error");
        return;
      }

      // Trigger Success UI state
      setIsSubmitting(false);
      setIsSubmitted(true);
      addToast("Message sent successfully.", "success");

      // Reset form variables
      setFormState({
        name: "",
        email: "",
        subject: "",
        company: "",
        message: "",
        honeypot: "",
      });
      setTouched({});
      setErrors({});

      // Reset submission banner after 5.5s
      setTimeout(() => setIsSubmitted(false), 5500);
    } catch (err: unknown) {
      setIsSubmitting(false);
      const errMsg = err instanceof Error ? err.message : String(err);
      addToast(errMsg || "Unable to send your message right now.", "error");
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-28 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full select-none relative overflow-hidden"
    >
      {/* Background glow resembling healing lights */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#FFD93D]/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="contact-heading flex flex-col gap-2.5 mb-16 text-left">
        <span className="text-xs font-semibold tracking-widest text-[#FFD93D] uppercase font-mono">
          06 / Connect
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white uppercase">
          Let&apos;s Build Something Legendary.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto text-left">
        
        {/* Left Side: Connection Info (col-span-5) */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONTACT_CARDS.map((card, idx) => (
              <a
                key={idx}
                href={card.href}
                download={card.title === "Resume" ? "Shivani_Tiwari_Resume.pdf" : undefined}
                target={card.title === "Resume" ? undefined : (card.isMail ? undefined : "_blank")}
                rel={card.title === "Resume" ? undefined : (card.isMail ? undefined : "noopener noreferrer")}
                className="connection-card p-4.5 rounded-2xl bg-[#171717]/85 relative overflow-hidden flex flex-col gap-2 group border border-white/5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,217,61,0.06)] cursor-pointer hover:border-[#FFD93D]/30"
              >
                {/* Visual card glow inside */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full blur-[30px] pointer-events-none transition-all duration-500 group-hover:bg-white/[0.03]" />

                <div className="flex items-center gap-3.5">
                  <div className="p-2 bg-white/5 rounded-xl border border-white/5 group-hover:border-[#FFD93D]/20 group-hover:bg-[#FFD93D]/5 transition-colors duration-500 shrink-0">
                    {card.icon}
                  </div>

                  <div className="flex flex-col overflow-hidden">
                    <span className="text-[9px] font-bold font-mono text-white/40 uppercase tracking-wide">
                      {card.title}
                    </span>
                    <span className="text-xs font-mono text-white group-hover:text-[#FFD93D] transition-colors duration-300 truncate">
                      {card.value}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Contact Form (col-span-7) */}
        <div className="lg:col-span-7 form-container w-full">
          <form 
            onSubmit={handleSubmit} 
            noValidate
            className="flex flex-col gap-6 p-8 rounded-3xl bg-[#171717] border border-white/5 relative overflow-hidden"
          >
            {/* Charging machine scanner light bar overlay */}
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
                  <motion.div
                    initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="relative w-28 h-28 flex items-center justify-center"
                  >
                    <div className="absolute inset-0 bg-[#FFD93D]/10 rounded-full animate-ping blur-md" />
                    
                    {/* Pokéball SVG locked shut */}
                    <svg className="w-20 h-20 drop-shadow-[0_0_15px_#FFD93D]" viewBox="0 0 100 100">
                      <path d="M 50,10 A 40 40 0 0 1 90,50 L 78,50 A 28 28 0 0 0 50,22 Z" fill="#E53935" />
                      <path d="M 90,50 A 40 40 0 0 1 50,90 L 50,78 A 28 28 0 0 0 78,50 Z" fill="#ECEFF1" />
                      <circle cx="50" cy="50" r="40" stroke="#171717" strokeWidth="5" fill="none" />
                      <line x1="10" y1="50" x2="90" y2="50" stroke="#171717" strokeWidth="6" />
                      <circle cx="50" cy="50" r="14" fill="#171717" />
                      <circle cx="50" cy="50" r="7" fill="#A5FF6A" stroke="#FFFFFF" strokeWidth="1" />
                    </svg>
                  </motion.div>

                  <h3 className="text-2xl font-display font-extrabold text-white tracking-tight uppercase">
                    Transmission Secured!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9E9E9E] max-w-sm leading-relaxed font-light">
                    Thank you! Your message has been sent successfully. I&apos;ll get back to you as soon as possible.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Spam Honeypot Field (hidden from screen readers & users) */}
            <div style={{ display: "none" }} aria-hidden="true">
              <input
                type="text"
                name="honeypot"
                value={formState.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                placeholder="Leave this field blank"
              />
            </div>

            {/* Input Name */}
            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="name" className="text-[10px] font-bold font-mono tracking-widest text-white/40 uppercase">
                Trainer Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formState.name}
                onChange={handleChange}
                onBlur={() => handleBlur("name")}
                disabled={isSubmitting}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`px-5 py-4 rounded-2xl bg-black/40 border text-sm text-white font-mono placeholder-white/20 focus:outline-none focus:border-[#FFD93D] focus:shadow-[0_0_15px_rgba(255,217,61,0.15)] transition-all duration-300 disabled:opacity-50
                  ${touched.name && errors.name ? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-white/5"}
                `}
                placeholder="Enter name..."
              />
              {touched.name && errors.name && (
                <span id="name-error" className="text-[10px] font-mono text-red-400 mt-1 pl-1">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Input Email */}
            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="email" className="text-[10px] font-bold font-mono tracking-widest text-white/40 uppercase">
                Trainer Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formState.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                disabled={isSubmitting}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`px-5 py-4 rounded-2xl bg-black/40 border text-sm text-white font-mono placeholder-white/20 focus:outline-none focus:border-[#FFD93D] focus:shadow-[0_0_15px_rgba(255,217,61,0.15)] transition-all duration-300 disabled:opacity-50
                  ${touched.email && errors.email ? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-white/5"}
                `}
                placeholder="Enter email..."
              />
              {touched.email && errors.email && (
                <span id="email-error" className="text-[10px] font-mono text-red-400 mt-1 pl-1">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Row: Subject & Optional Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Input Subject */}
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="subject" className="text-[10px] font-bold font-mono tracking-widest text-white/40 uppercase">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formState.subject}
                  onChange={handleChange}
                  onBlur={() => handleBlur("subject")}
                  disabled={isSubmitting}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  className={`px-5 py-4 rounded-2xl bg-black/40 border text-sm text-white font-mono placeholder-white/20 focus:outline-none focus:border-[#FFD93D] focus:shadow-[0_0_15px_rgba(255,217,61,0.15)] transition-all duration-300 disabled:opacity-50
                    ${touched.subject && errors.subject ? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-white/5"}
                  `}
                  placeholder="Subject of message..."
                />
                {touched.subject && errors.subject && (
                  <span id="subject-error" className="text-[10px] font-mono text-red-400 mt-1 pl-1">
                    {errors.subject}
                  </span>
                )}
              </div>

              {/* Input Company (Optional) */}
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="company" className="text-[10px] font-bold font-mono tracking-widest text-white/40 uppercase">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formState.company}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="px-5 py-4 rounded-2xl bg-black/40 border border-white/5 text-sm text-white font-mono placeholder-white/20 focus:outline-none focus:border-[#FFD93D] focus:shadow-[0_0_15px_rgba(255,217,61,0.15)] transition-all duration-300 disabled:opacity-50"
                  placeholder="Enter organization..."
                />
              </div>
            </div>

            {/* Input Message */}
            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="message" className="text-[10px] font-bold font-mono tracking-widest text-white/40 uppercase">
                Battle Strategy / Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formState.message}
                onChange={handleChange}
                onBlur={() => handleBlur("message")}
                disabled={isSubmitting}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`px-5 py-4 rounded-2xl bg-black/40 border text-sm text-white font-mono placeholder-white/20 focus:outline-none focus:border-[#FFD93D] focus:shadow-[0_0_15px_rgba(255,217,61,0.15)] transition-all duration-300 disabled:opacity-50 resize-none
                  ${touched.message && errors.message ? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-white/5"}
                `}
                placeholder="Write your brief (minimum 20 characters)..."
              />
              {touched.message && errors.message && (
                <span id="message-error" className="text-[10px] font-mono text-red-400 mt-1 pl-1">
                  {errors.message}
                </span>
              )}
            </div>

            {/* Submit button: Modular LoadingButton */}
            <LoadingButton
              type="submit"
              disabled={isSubmitting || Object.keys(validateForm(formState)).length > 0}
              isSubmitting={isSubmitting}
              isSubmitted={isSubmitted}
            />
          </form>
        </div>
      </div>

      {/* Global Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </section>
  );
}

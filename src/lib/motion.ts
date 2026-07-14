export const EASE_APPLE = [0.16, 1, 0.3, 1] as const;
export const EASE_LINEAR_SWIFT = [0.22, 1, 0.36, 1] as const;
export const EASE_STRIPE_HOVER = [0.25, 1, 0.5, 1] as const;

export const SPRING_BOUNCY = {
  type: "spring" as const,
  stiffness: 150,
  damping: 15,
};

export const SPRING_SMOOTH = {
  type: "spring" as const,
  stiffness: 80,
  damping: 25,
};

export const fadeInUp = (duration = 0.8, delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: EASE_APPLE,
    },
  },
});

export const fadeIn = (duration = 0.6, delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration,
      delay,
      ease: EASE_STRIPE_HOVER,
    },
  },
});

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

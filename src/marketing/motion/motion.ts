/**
 * Marketing motion constants (Phase 4C). Single source of truth for durations and
 * easing so every animated marketing component stays consistent. Values mirror the
 * CSS tokens in tokens.css. Motion is subtle, fast, purposeful, interruptible.
 */
import type { Transition, Variants } from 'framer-motion';

export const DURATION = {
  fast: 0.15,
  base: 0.24,
  slow: 0.4,
} as const;

export const EASE = {
  standard: [0.4, 0, 0.2, 1],
  decelerate: [0, 0, 0.2, 1],
} as const;

/** Reveal-once entrance: fade + 12px rise. Used via <Reveal>. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE.decelerate },
  },
};

/** Staggered container for grids (cap ~6 children — see Reveal usage). */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

export const baseTransition: Transition = {
  duration: DURATION.base,
  ease: EASE.standard,
};

import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { revealVariants, staggerContainer } from './motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** When true, stagger the direct children as they enter (grids). */
  stagger?: boolean;
}

/**
 * Reveal-once entrance wrapper (Phase 4C). Fires a single fade+rise as the element
 * scrolls into view. Fully respects `prefers-reduced-motion`: content renders
 * immediately with no transform — never gated behind an animation.
 */
export function Reveal({ children, className, stagger = false }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={stagger ? staggerContainer : revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

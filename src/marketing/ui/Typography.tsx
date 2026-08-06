import { type ElementType, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

/**
 * Typographic scale (Phase 3 §5, 1.250 major-third). Fluid clamps step headings
 * down on small screens; body never below 16px. Serif for display remains a locked
 * decision (Phase 4D risk #1) — until then all headings use the Inter `sans` stack.
 */

interface HeadingProps {
  children: ReactNode;
  /** Semantic level (drives the HTML tag). */
  level?: 1 | 2 | 3 | 4;
  /** Visual size, decoupled from level. Defaults to match level. */
  size?: 'display' | 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  id?: string;
}

const headingSizes: Record<NonNullable<HeadingProps['size']>, string> = {
  display: 'text-[2.5rem] leading-tight sm:text-5xl lg:text-6xl font-semibold tracking-[-0.02em]',
  h1: 'text-4xl sm:text-5xl font-semibold tracking-[-0.02em]',
  h2: 'text-3xl sm:text-4xl font-semibold tracking-[-0.015em]',
  h3: 'text-2xl sm:text-[1.75rem] font-semibold tracking-[-0.01em]',
  h4: 'text-xl sm:text-2xl font-semibold',
};

const defaultSizeForLevel: Record<1 | 2 | 3 | 4, NonNullable<HeadingProps['size']>> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
};

export function Heading({ children, level = 2, size, className, id }: HeadingProps) {
  const Tag = `h${level}` as ElementType;
  const resolved = size ?? defaultSizeForLevel[level];
  return (
    <Tag id={id} className={cn(headingSizes[resolved], className)}>
      {children}
    </Tag>
  );
}

interface TextProps {
  children: ReactNode;
  as?: ElementType;
  size?: 'lg' | 'base' | 'sm';
  /** Muted secondary color. */
  muted?: boolean;
  className?: string;
}

const textSizes: Record<NonNullable<TextProps['size']>, string> = {
  lg: 'text-lg leading-[1.7]',
  base: 'text-base leading-[1.65]',
  sm: 'text-sm leading-relaxed',
};

export function Text({ children, as: Tag = 'p', size = 'base', muted = false, className }: TextProps) {
  return (
    <Tag className={cn(textSizes[size], muted ? 'text-mkt-ink-500' : 'text-mkt-ink-700', className)}>
      {children}
    </Tag>
  );
}

/** Small uppercase eyebrow/overline label above a heading. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'text-xs font-semibold uppercase tracking-[0.08em] text-mkt-accent-600',
        className,
      )}
    >
      {children}
    </span>
  );
}

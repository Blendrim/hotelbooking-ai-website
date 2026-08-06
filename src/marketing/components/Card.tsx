import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface CardProps {
  children: ReactNode;
  /** Interactive cards lift + tint border on hover; add when the whole card links. */
  interactive?: boolean;
  /** Slim accent left edge (used by AI/highlight cards). */
  accentEdge?: boolean;
  className?: string;
}

/**
 * Base marketing surface. Calm: hairline border, soft blue-tinted shadow, generous
 * padding, `mkt-lg` radius (Phase 4B). All other marketing cards compose this.
 */
export function Card({ children, interactive = false, accentEdge = false, className }: CardProps) {
  return (
    <div
      className={cn(
        'relative rounded-mkt-lg border border-mkt-border bg-mkt-surface p-6 shadow-mkt-1 sm:p-7',
        accentEdge && 'border-l-4 border-l-mkt-accent-400',
        interactive &&
          'transition-all duration-200 hover:-translate-y-0.5 hover:border-mkt-accent-400 hover:shadow-mkt-2',
        className,
      )}
    >
      {children}
    </div>
  );
}

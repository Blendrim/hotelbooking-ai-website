import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface DashboardFrameProps {
  /** The product UI to frame — a screenshot <img> or a mocked composition. */
  children: ReactNode;
  /** Accessible description of what the frame shows. */
  label: string;
  /** Dark chrome (product UI is dark-first). */
  dark?: boolean;
  className?: string;
}

/**
 * Floating browser frame for product screenshots / dashboard previews (Phase 4B).
 * The "this is real software" credibility device. Static; callouts/animation are
 * layered by the consuming section. On mobile it simplifies to full width.
 */
export function DashboardFrame({ children, label, dark = true, className }: DashboardFrameProps) {
  return (
    <figure
      role="img"
      aria-label={label}
      className={cn(
        'overflow-hidden rounded-mkt-lg shadow-mkt-3 ring-1',
        dark ? 'bg-mkt-primary-900 ring-white/10' : 'bg-mkt-surface ring-mkt-border',
        className,
      )}
    >
      {/* Browser chrome */}
      <div className={cn('flex items-center gap-1.5 border-b px-4 py-3', dark ? 'border-white/10' : 'border-mkt-border')}>
        <span className="h-2.5 w-2.5 rounded-full bg-mkt-error/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-mkt-warning/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-mkt-success/70" />
      </div>
      <div className={cn('p-4 sm:p-5', dark ? 'text-white' : 'text-mkt-ink-900')}>{children}</div>
    </figure>
  );
}

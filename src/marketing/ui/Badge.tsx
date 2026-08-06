import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Tone = 'neutral' | 'accent' | 'gold';

const tones: Record<Tone, string> = {
  neutral: 'bg-mkt-primary-50 text-mkt-primary-700 ring-mkt-border',
  accent: 'bg-mkt-accent-400/12 text-mkt-accent-600 ring-mkt-accent-400/25',
  gold: 'bg-mkt-gold-500/12 text-mkt-gold-500 ring-mkt-gold-500/30',
};

/** Small label chip for eyebrow tags / "Most popular" / category markers. */
export function Badge({ children, tone = 'neutral', className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

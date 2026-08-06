import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface StatCardProps {
  /** Numeric value to count up to. */
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  context?: string;
  /** Decimal places to display. */
  decimals?: number;
  onDark?: boolean;
  className?: string;
}

/**
 * ROI/statistic tile (Phase 4B). Counts up ONCE when scrolled into view, using
 * tabular figures so digit width never shifts. Respects reduced-motion: shows the
 * final value immediately. Final value is always present for screen readers.
 */
export function StatCard({ value, prefix = '', suffix = '', label, context, decimals = 0, onDark = false, className }: StatCardProps) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    // When reduced-motion is on, the initial state already holds the final value —
    // no state update needed here (avoids setState-in-effect).
    if (reduce) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const duration = 900;
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(value * eased);
              if (progress < 1) requestAnimationFrame(tick);
              else setDisplay(value);
            };
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, reduce]);

  return (
    <div ref={ref} className={cn('flex flex-col gap-1', className)}>
      <span
        className={cn(
          'text-4xl font-semibold tabular-nums tracking-tight sm:text-5xl',
          onDark ? 'text-white' : 'text-mkt-primary-700',
        )}
      >
        {prefix}
        {display.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
        {suffix}
      </span>
      <span className={cn('text-sm font-semibold', onDark ? 'text-mkt-accent-400' : 'text-mkt-ink-900')}>{label}</span>
      {context && <span className={cn('text-sm', onDark ? 'text-mkt-primary-300' : 'text-mkt-ink-500')}>{context}</span>}
    </div>
  );
}

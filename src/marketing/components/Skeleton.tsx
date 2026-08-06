import { cn } from '@/utils/cn';

/**
 * Skeleton placeholder for loading states (Phase 4C). Matches final layout to avoid
 * reflow (CLS≈0). Shimmer stills under reduced-motion via the global media query.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-mkt-md bg-mkt-ink-300/20',
        "after:absolute after:inset-0 after:-translate-x-full after:animate-[mktShimmer_1.4s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent",
        className,
      )}
      aria-hidden="true"
    />
  );
}

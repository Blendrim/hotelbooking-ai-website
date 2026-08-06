import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

/**
 * PLACEHOLDER wordmark. The final connected-node monogram (Phase 3 refinement §1)
 * is a required production asset — see Phase 6A "Assets still required". This mark is
 * clearly a text lockup so it can never be mistaken for the approved final logo.
 */
export function Logo({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  return (
    <Link
      to="/home"
      className={cn('mkt-focusable inline-flex items-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mkt-focus', className)}
      aria-label="HotelBooking AI Platform — home"
    >
      {/* Simple connected-node glyph placeholder */}
      <span
        className={cn(
          'inline-flex h-8 w-8 items-center justify-center rounded-mkt-md font-bold',
          onDark ? 'bg-white/10 text-white' : 'bg-mkt-primary-900 text-white',
        )}
        aria-hidden="true"
      >
        H
      </span>
      <span className={cn('text-base font-semibold tracking-tight', onDark ? 'text-white' : 'text-mkt-ink-900')}>
        HotelBooking<span className="text-mkt-accent-600"> AI</span>
      </span>
    </Link>
  );
}

import { cn } from '@/utils/cn';

interface LogoStripProps {
  /** Caption above the row (e.g. "Trusted by founding partners"). */
  caption?: string;
  /** Placeholder names until real customer logos exist (Phase 3 honesty). */
  names: string[];
  onDark?: boolean;
  className?: string;
}

/**
 * Social-proof logo cloud. Renders labeled placeholder wordmarks — clearly NOT
 * fabricated brand logos — until real assets land (see Phase 6A "Assets required").
 */
export function LogoStrip({ caption, names, onDark = false, className }: LogoStripProps) {
  return (
    <div className={cn('flex flex-col items-center gap-6', className)}>
      {caption && (
        <p className={cn('text-xs font-semibold uppercase tracking-[0.08em]', onDark ? 'text-mkt-primary-300' : 'text-mkt-ink-500')}>
          {caption}
        </p>
      )}
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {names.map((name) => (
          <li
            key={name}
            className={cn('text-lg font-semibold tracking-tight opacity-70', onDark ? 'text-white' : 'text-mkt-ink-700')}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

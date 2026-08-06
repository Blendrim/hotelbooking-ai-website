import { cn } from '@/utils/cn';

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  property: string;
  /** Honest labeling until real customers exist (Phase 2/3). */
  foundingPartner?: boolean;
  onDark?: boolean;
  className?: string;
}

/** Single testimonial (no auto-carousel). Restraint reads credible. */
export function Testimonial({ quote, name, role, property, foundingPartner = true, onDark = false, className }: TestimonialProps) {
  return (
    <figure className={cn('flex flex-col gap-5', className)}>
      <blockquote className={cn('text-xl font-medium leading-relaxed sm:text-2xl', onDark ? 'text-white' : 'text-mkt-ink-900')}>
        “{quote}”
      </blockquote>
      <figcaption className="flex flex-col gap-0.5">
        <span className={cn('text-sm font-semibold', onDark ? 'text-white' : 'text-mkt-ink-900')}>{name}</span>
        <span className={cn('text-sm', onDark ? 'text-mkt-primary-300' : 'text-mkt-ink-500')}>
          {role}, {property}
        </span>
        {foundingPartner && (
          <span className={cn('mt-1 text-xs font-medium uppercase tracking-wide', onDark ? 'text-mkt-accent-400' : 'text-mkt-accent-600')}>
            Founding partner
          </span>
        )}
      </figcaption>
    </figure>
  );
}

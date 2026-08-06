import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Container } from './Container';

type Background = 'light' | 'subtle' | 'deep';

interface SectionProps {
  children: ReactNode;
  /**
   * Background "temperature" (Phase 4B A1). `light` = page bg, `subtle` = primary-50
   * wash, `deep` = midnight for authority/CTA moments. Rule: never two `deep`
   * sections adjacent — enforced at page-assembly time (Phase 6B).
   */
  background?: Background;
  /** Vertical rhythm: `lg` (major section, default) or `md`. */
  spacing?: 'md' | 'lg';
  /** Constrain inner content in a Container (default true). */
  contained?: boolean;
  containerWidth?: 'content' | 'wide' | 'prose';
  className?: string;
  id?: string;
}

const backgrounds: Record<Background, string> = {
  light: 'bg-mkt-bg text-mkt-ink-900',
  subtle: 'bg-mkt-primary-50 text-mkt-ink-900',
  deep: 'bg-mkt-primary-900 text-white',
};

/**
 * Full-width page section with themed background and consistent vertical rhythm.
 * Deep sections carry an `mkt-dark` marker so descendants can invert if needed.
 */
export function Section({
  children,
  background = 'light',
  spacing = 'lg',
  contained = true,
  containerWidth = 'content',
  className,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      data-bg={background}
      className={cn(
        backgrounds[background],
        spacing === 'lg' ? 'py-16 sm:py-20 lg:py-24' : 'py-12 sm:py-14 lg:py-16',
        className,
      )}
    >
      {contained ? <Container width={containerWidth}>{children}</Container> : children}
    </section>
  );
}

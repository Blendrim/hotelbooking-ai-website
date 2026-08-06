import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Eyebrow, Heading, Text } from '../ui/Typography';

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Heading level for correct document outline (default 2). */
  level?: 2 | 3;
  align?: 'left' | 'center';
  /** Invert text for use on deep backgrounds. */
  onDark?: boolean;
  className?: string;
}

/** Standard section intro: eyebrow + heading + optional description. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  level = 2,
  align = 'left',
  onDark = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        align === 'center' && 'mx-auto max-w-2xl',
        className,
      )}
    >
      {eyebrow && <Eyebrow className={onDark ? 'text-mkt-accent-400' : undefined}>{eyebrow}</Eyebrow>}
      <Heading level={level} size={level === 2 ? 'h2' : 'h3'} className={onDark ? 'text-white' : undefined}>
        {title}
      </Heading>
      {description && (
        <Text size="lg" className={onDark ? 'text-mkt-primary-300' : 'text-mkt-ink-500'}>
          {description}
        </Text>
      )}
    </div>
  );
}

import { type ElementType, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ContainerProps {
  children: ReactNode;
  as?: ElementType;
  /** Content width. `content` = 1200px (default), `wide` = 1440px, `prose` = 72ch. */
  width?: 'content' | 'wide' | 'prose';
  className?: string;
}

/**
 * Horizontal container: centers content, caps width, applies responsive gutters.
 * Ultra-wide adds framing whitespace (never more columns) per Phase 4C Part E.
 */
export function Container({ children, as: Tag = 'div', width = 'content', className }: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-5 sm:px-6 lg:px-8',
        width === 'content' && 'max-w-mkt-content',
        width === 'wide' && 'max-w-mkt-wide',
        width === 'prose' && 'max-w-mkt-prose',
        className,
      )}
    >
      {children}
    </Tag>
  );
}

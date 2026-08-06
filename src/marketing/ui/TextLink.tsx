import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface TextLinkProps {
  children: ReactNode;
  href: string;
  /** Show a trailing arrow that nudges on hover (tertiary "learn more →" style). */
  arrow?: boolean;
  className?: string;
}

/** Inline tertiary link. Internal routes use router <Link>; external uses <a>. */
export function TextLink({ children, href, arrow = false, className }: TextLinkProps) {
  const classes = cn(
    'mkt-focusable group inline-flex items-center gap-1 font-medium text-mkt-primary-500 underline-offset-4 transition-colors hover:text-mkt-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mkt-focus focus-visible:ring-offset-2 rounded-sm',
    className,
  );
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );
  if (/^https?:\/\//.test(href)) {
    return (
      <a className={classes} href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link className={classes} to={href}>
      {content}
    </Link>
  );
}

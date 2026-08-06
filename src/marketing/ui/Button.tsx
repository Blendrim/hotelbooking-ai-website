import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'link';
type Size = 'sm' | 'md' | 'lg';

const base =
  'mkt-focusable inline-flex items-center justify-center gap-2 rounded-mkt-md font-medium transition-all ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mkt-focus focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-mkt-bg disabled:cursor-not-allowed disabled:opacity-40';

const variants: Record<Variant, string> = {
  primary:
    'bg-mkt-primary-500 text-white shadow-mkt-1 hover:bg-mkt-primary-700 hover:-translate-y-px hover:shadow-mkt-2 active:translate-y-0 active:scale-[0.98]',
  secondary:
    'border border-mkt-border bg-mkt-surface text-mkt-ink-900 hover:border-mkt-accent-400 hover:-translate-y-px active:scale-[0.98]',
  ghost: 'text-mkt-ink-700 hover:bg-mkt-primary-50 active:scale-[0.98]',
  link: 'text-mkt-primary-500 hover:text-mkt-primary-700 underline-offset-4 hover:underline',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton extends CommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  loading?: boolean;
  href?: undefined;
}

interface ButtonAsLink extends CommonProps {
  /** Internal route ("/pricing") renders a router <Link>; external ("https://") an <a>. */
  href: string;
  loading?: undefined;
  /** Optional side-effect on activation (e.g. analytics) — navigation still proceeds. */
  onClick?: () => void;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Primary marketing action. States: hover(darken+lift), pressed(scale .98),
 * focus(accent ring), disabled(.4), loading(inline spinner, width preserved).
 * Rule: exactly one `primary` per viewport (Phase 4B). Use `href` to navigate.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const classes = cn(
    base,
    variants[props.variant ?? 'primary'],
    sizes[props.size ?? 'md'],
    props.fullWidth && 'w-full',
    props.className,
  );

  // Link variant: internal route → router <Link>, external → <a>.
  if (props.href !== undefined) {
    const isExternal = /^https?:\/\//.test(props.href);
    if (isExternal) {
      return (
        <a className={classes} href={props.href} target="_blank" rel="noopener noreferrer" onClick={props.onClick}>
          {props.children}
        </a>
      );
    }
    return (
      <Link className={classes} to={props.href} onClick={props.onClick}>
        {props.children}
      </Link>
    );
  }

  // Button variant: strip presentation-only props so only native attrs hit the DOM.
  const { variant: _v, size: _s, fullWidth: _f, className: _c, children, loading, disabled, href: _h, ...rest } = props;
  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
});

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Logo } from './Logo';
import { Button } from '../ui/Button';
import { primaryNav, primaryCta, type NavLink } from '../config/nav';

/**
 * Marketing header (Phase 4B/4C). Sticky; solidifies on scroll. Desktop nav with a
 * mega-menu foundation for deep sections; mobile hamburger → full-screen accordion
 * drawer. The primary "Book a Demo" CTA is always present. Fully keyboard-operable.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes any open menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMega(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const openMenu = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenMega(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMega(null), 200);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-200',
        scrolled
          ? 'border-mkt-border bg-mkt-surface/90 backdrop-blur supports-[backdrop-filter]:bg-mkt-surface/80'
          : 'border-transparent bg-mkt-bg',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-mkt-content items-center justify-between px-5 sm:px-6 lg:px-8" aria-label="Primary">
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.mega && openMenu(item.label)}
              onMouseLeave={() => item.mega && scheduleClose()}
            >
              {item.mega ? (
                <MegaTrigger item={item} isOpen={openMega === item.label} onToggle={() => setOpenMega(openMega === item.label ? null : item.label)} />
              ) : (
                <Link
                  to={item.href}
                  className="mkt-focusable inline-flex h-9 items-center rounded-mkt-sm px-3 text-sm font-medium text-mkt-ink-700 transition-colors hover:text-mkt-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mkt-focus"
                >
                  {item.label}
                </Link>
              )}
              {item.mega && openMega === item.label && (
                <MegaPanel
                  item={item}
                  onMouseEnter={() => openMenu(item.label)}
                  onMouseLeave={scheduleClose}
                  onNavigate={() => setOpenMega(null)}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <Button href={primaryCta.href} size="sm">
            {primaryCta.label}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="mkt-focusable inline-flex h-10 w-10 items-center justify-center rounded-mkt-md text-mkt-ink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mkt-focus lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mkt-mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && <MobileDrawer onClose={() => setMobileOpen(false)} />}
    </header>
  );
}

function MegaTrigger({ item, isOpen, onToggle }: { item: NavLink; isOpen: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-haspopup="true"
      onClick={onToggle}
      className="mkt-focusable inline-flex h-9 items-center gap-1 rounded-mkt-sm px-3 text-sm font-medium text-mkt-ink-700 transition-colors hover:text-mkt-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mkt-focus"
    >
      {item.label}
      <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} aria-hidden="true" />
    </button>
  );
}

function MegaPanel({
  item,
  onMouseEnter,
  onMouseLeave,
  onNavigate,
}: {
  item: NavLink;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onNavigate: () => void;
}) {
  // Close the panel when a link inside it is activated (interaction-driven, not an effect).
  const handleClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a')) onNavigate();
  };
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
      className="absolute left-1/2 top-full z-50 mt-2 w-[34rem] -translate-x-1/2 rounded-mkt-lg border border-mkt-border bg-mkt-surface p-3 shadow-mkt-3"
    >
      <ul className="grid grid-cols-2 gap-1">
        {item.mega!.map((m) => {
          const Icon = m.icon;
          return (
            <li key={m.label}>
              <Link
                to={m.href}
                className="mkt-focusable flex items-start gap-3 rounded-mkt-md p-3 transition-colors hover:bg-mkt-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mkt-focus"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-mkt-accent-600" strokeWidth={1.5} aria-hidden="true" />
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-mkt-ink-900">{m.label}</span>
                  <span className="text-xs text-mkt-ink-500">{m.description}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  // Close the drawer when any link/CTA inside it is activated.
  const handleClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a')) onClose();
  };
  return (
    <div
      id="mkt-mobile-nav"
      onClick={handleClick}
      className="fixed inset-0 top-16 z-40 overflow-y-auto bg-mkt-bg px-5 py-6 lg:hidden"
    >
      <ul className="flex flex-col gap-1">
        {primaryNav.map((item) => (
          <li key={item.label} className="border-b border-mkt-border">
            {item.mega ? (
              <>
                <button
                  type="button"
                  aria-expanded={expanded === item.label}
                  onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                  className="flex w-full items-center justify-between py-3 text-left text-base font-medium text-mkt-ink-900"
                >
                  {item.label}
                  <ChevronDown className={cn('h-5 w-5 text-mkt-ink-500 transition-transform', expanded === item.label && 'rotate-180')} aria-hidden="true" />
                </button>
                {expanded === item.label && (
                  <ul className="flex flex-col gap-1 pb-3 pl-1">
                    {item.mega.map((m) => (
                      <li key={m.label}>
                        <Link to={m.href} className="block rounded-mkt-sm px-2 py-2 text-sm text-mkt-ink-700 hover:bg-mkt-primary-50">
                          {m.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link to={item.href} className="block py-3 text-base font-medium text-mkt-ink-900">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col gap-3">
        <Button href={primaryCta.href} fullWidth>
          {primaryCta.label}
        </Button>
      </div>
    </div>
  );
}

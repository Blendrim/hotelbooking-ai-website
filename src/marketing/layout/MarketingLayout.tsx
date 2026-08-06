import { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { Button } from '../ui/Button';
import { primaryCta } from '../config/nav';
import '../styles/tokens.css';

/**
 * Root shell for every marketing page. Establishes the `.mkt` token scope (isolating
 * the marketing brand from the product dashboard), the header/footer, a skip link,
 * and a mobile sticky "Book a Demo" bar. Use as a router layout route (via <Outlet>)
 * or by passing children directly.
 */
export function MarketingLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="mkt flex min-h-screen flex-col">
      <ScrollToTop />
      <a
        href="#mkt-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-mkt-md focus:bg-mkt-primary-500 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="mkt-main" className="flex-1">
        {children ?? <Outlet />}
      </main>
      <Footer />

      {/* Mobile sticky CTA (Phase 4C): always thumb-reachable, mobile/tablet only. */}
      <div className="sticky bottom-0 z-40 border-t border-mkt-border bg-mkt-surface/95 p-3 backdrop-blur lg:hidden">
        <Button href={primaryCta.href} fullWidth>
          {primaryCta.label}
        </Button>
      </div>
    </div>
  );
}

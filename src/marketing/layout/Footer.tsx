import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { footerColumns, legalLinks } from '../config/footer';

/**
 * Enterprise footer (Phase 2/4B). Deep background, config-driven columns (Trust &
 * Security + Developers & Partners included), legal strip. The "legitimacy net".
 */
export function Footer() {
  return (
    <footer className="bg-mkt-primary-900 text-white">
      <div className="mx-auto max-w-mkt-content px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-7">
          <div className="col-span-2 flex flex-col gap-4 lg:col-span-1">
            <Logo onDark />
            <p className="max-w-xs text-sm text-mkt-primary-300">
              The AI operating system that runs your entire hotel — and explains itself.
            </p>
          </div>
          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-mkt-primary-300">{col.title}</h2>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-white/80 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-mkt-primary-300">© {new Date().getFullYear()} HotelBooking AI Platform. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.href} className="text-xs text-white/70 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

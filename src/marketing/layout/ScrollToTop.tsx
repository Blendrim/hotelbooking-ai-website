import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scroll management for the marketing SPA (Phase 6B §D). On route change, scroll to
 * top; when a hash is present, scroll to the anchored element (respecting the fixed
 * header offset). Honors reduced-motion via CSS (tokens.css sets scroll-behavior auto).
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);

  return null;
}

/**
 * Central public-site configuration (Step 2B §3). The ONE place domain, canonical URL,
 * company name, public emails, social links, and the form endpoint live. Everything that
 * needs these values imports from here — no scattered domain strings.
 *
 * PLACEHOLDERS: `publicUrl` and the emails are placeholders until the real domain/mailboxes
 * are provided. robots.txt and sitemap.xml carry the same placeholder host (keep them in sync).
 */
export const site = {
  company: 'HotelBooking AI Platform',

  /** Canonical origin (no trailing slash). PLACEHOLDER — replace at launch. */
  publicUrl: 'https://www.hotelbooking.ai',

  /** Canonical home path (see marketingRouter — "/" redirects here). */
  homePath: '/home',

  /** Public mailboxes. PLACEHOLDER domain — do not expose personal email publicly. */
  email: {
    general: 'contact@hotelbooking.ai',
    sales: 'sales@hotelbooking.ai',
    partners: 'partners@hotelbooking.ai',
    privacy: 'privacy@hotelbooking.ai',
    support: 'support@hotelbooking.ai',
  },

  social: {
    linkedin: '', // e.g. https://www.linkedin.com/company/...
    x: '',
  },

  /** Same-origin lead endpoint (Cloudflare Pages Function in preview/prod). */
  formEndpoint: '/api/leads',

  /** Social-share image (PLACEHOLDER asset — see asset checklist). */
  ogImage: '/og-image.png',

  /** Build/runtime label ("development" | "production" | preview). */
  environment: import.meta.env.MODE,
} as const;

/** Build an absolute canonical URL for a path ("/pricing" -> "https://.../pricing"). */
export function canonical(path: string): string {
  return `${site.publicUrl}${path}`;
}

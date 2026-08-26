/**
 * Central public-site configuration (Step 2B §3). The ONE place domain, canonical URL,
 * company name, public emails, social links, and the form endpoint live. Everything that
 * needs these values imports from here — no scattered domain strings.
 *
 * The official public domain is hotel-booking-ai.com and the professional mailbox is
 * contact@hotel-booking-ai.com. robots.txt and sitemap.xml carry the same host — keep in sync.
 */
export const site = {
  company: 'HotelBooking AI Platform',

  /** Canonical origin (no trailing slash) — the official public domain. */
  publicUrl: 'https://hotel-booking-ai.com',

  /** Canonical home path (see marketingRouter — "/" redirects here). */
  homePath: '/home',

  /**
   * Public mailboxes. Only contact@hotel-booking-ai.com is a live, confirmed mailbox
   * (Cloudflare Email Routing → Gmail), so all public contact points route to it. Add
   * dedicated role mailboxes here only once they exist.
   */
  email: {
    general: 'contact@hotel-booking-ai.com',
    sales: 'contact@hotel-booking-ai.com',
    partners: 'contact@hotel-booking-ai.com',
    privacy: 'contact@hotel-booking-ai.com',
    support: 'contact@hotel-booking-ai.com',
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

/**
 * Cloudflare Worker entry (Workers + Static Assets model).
 *
 * Routing:
 *   POST /api/leads   → handled here (public lead capture)
 *   everything else   → env.ASSETS.fetch() → static files, with SPA fallback to
 *                       index.html for client-side routes (not_found_handling:
 *                       "single-page-application" in wrangler.jsonc).
 *
 * This replaces the previous Cloudflare Pages Functions + _redirects setup — one
 * deployment model only. No SaaS code, no auth, no secrets in the bundle.
 */

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  // Server-side secrets (Cloudflare env bindings — never VITE_*).
  RESEND_API_KEY?: string;
  LEADS_TO_EMAIL?: string;
  LEADS_FROM_EMAIL?: string;
}

type LeadType = 'demo' | 'contact-sales' | 'partner' | 'waitlist';
const ALLOWED_TYPES: LeadType[] = ['demo', 'contact-sales', 'partner', 'waitlist'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function str(v: unknown, max: number): string | undefined {
  if (typeof v !== 'string') return undefined;
  const t = v.trim();
  return t ? t.slice(0, max) : undefined;
}

async function handleLead(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  // Honeypot: bots fill hidden fields. Silently accept without processing.
  if (typeof body.company_website === 'string' && body.company_website.trim() !== '') {
    return json({ referenceId: 'LEAD-IGNORED', delivered: false }, 202);
  }

  const type = String(body.type ?? '') as LeadType;
  if (!ALLOWED_TYPES.includes(type)) {
    return json({ error: `Unknown lead type '${body.type}'.` }, 400);
  }

  const fullName = str(body.fullName, 120);
  const email = str(body.email, 200)?.toLowerCase();
  if (!fullName || fullName.length < 2) return json({ error: 'A valid name is required.' }, 400);
  if (!email || !EMAIL_RE.test(email)) return json({ error: 'A valid email is required.' }, 400);

  const lead = {
    type,
    fullName,
    email,
    company: str(body.company, 160),
    hotelName: str(body.hotelName, 160),
    role: str(body.role, 80),
    propertySize: str(body.propertySize, 80),
    partnerType: str(body.partnerType, 80),
    message: str(body.message, 2000),
    source: str(body.source, 200),
  };

  const referenceId = 'LEAD-' + crypto.randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase();

  const routeTo: Record<LeadType, string> = {
    demo: 'sales',
    'contact-sales': 'sales',
    partner: 'partners',
    waitlist: 'sales',
  };

  // The lead is ACCEPTED the moment it validates (a referenceId is assigned). Delivery
  // via Resend is a separate step whose outcome is tracked internally for diagnosis.
  //   not_configured  — RESEND_API_KEY / LEADS_TO_EMAIL not set (nothing sent)
  //   provider_accepted — Resend accepted the email (delivered: true)
  //   provider_rejected — Resend returned an error (e.g. 403 = sender domain not verified)
  //   error           — network/exception reaching Resend
  let delivered = false;
  let providerStatus: number | null = null;
  let outcome: 'not_configured' | 'provider_accepted' | 'provider_rejected' | 'error' = 'not_configured';

  if (env.RESEND_API_KEY && env.LEADS_TO_EMAIL) {
    // Sender must be an address on a domain VERIFIED in Resend. The default targets the
    // `send.` sending subdomain so it does not clash with the apex domain's Cloudflare
    // Email Routing (which handles receiving). Override with LEADS_FROM_EMAIL.
    const fromAddress = env.LEADS_FROM_EMAIL ?? 'HotelBooking AI <leads@send.hotel-booking-ai.com>';
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromAddress,
          to: env.LEADS_TO_EMAIL,
          reply_to: email, // replying from the inbox goes straight to the prospect
          subject: `New ${type} lead (${routeTo[type]}) — ${referenceId}`,
          text:
            `Reference: ${referenceId}\nType: ${type}\nName: ${fullName}\nEmail: ${email}\n` +
            `Company: ${lead.company ?? '-'}\nHotel: ${lead.hotelName ?? '-'}\nRole: ${lead.role ?? '-'}\n` +
            `Size: ${lead.propertySize ?? '-'}\nPartner type: ${lead.partnerType ?? '-'}\n` +
            `Source: ${lead.source ?? '-'}\nMessage: ${lead.message ?? '-'}\n`,
        }),
      });
      providerStatus = res.status;
      delivered = res.ok;
      outcome = res.ok ? 'provider_accepted' : 'provider_rejected';
    } catch {
      outcome = 'error';
    }
  }

  // PII-safe structured log: reference, type, route, timestamp, provider status + outcome.
  // Never logs the secret, name, email, or message. A providerStatus of 403 typically
  // means the sender domain is not yet verified in Resend.
  console.log(
    JSON.stringify({
      tag: 'lead',
      referenceId,
      type,
      route: routeTo[type],
      source: lead.source ?? null,
      ts: new Date().toISOString(),
      providerStatus,
      outcome,
      delivered,
    }),
  );

  return json({ referenceId, delivered }, 202);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/leads') {
      return handleLead(request, env);
    }
    // Static assets + SPA fallback (index.html) for all client-side routes.
    return env.ASSETS.fetch(request);
  },
};

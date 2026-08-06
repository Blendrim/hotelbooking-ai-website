/**
 * Public lead endpoint — Cloudflare Pages Function (Step 2B §2). Serves POST /api/leads
 * on the SAME ORIGIN as the marketing site, so no CORS and no browser-exposed secrets.
 *
 * This replaces the local .NET dependency for the PUBLIC marketing deployment. (The .NET
 * /api/leads stays for local dev of the coupled app.) The .NET backend is NOT deployed
 * just for lead collection.
 *
 * Delivery: if RESEND_API_KEY + LEADS_TO_EMAIL are configured (server-side secrets, never
 * VITE_*), the lead is emailed and `delivered: true`. If not configured (dev/preview),
 * the lead is logged (PII-safe) and returned with `delivered: false` — an honest response,
 * never a fake "sent". Configure the secrets before real launch so leads are delivered.
 *
 * This file is NOT part of the Vite bundle or the app tsconfig — Cloudflare builds it.
 */

interface Env {
  RESEND_API_KEY?: string;
  LEADS_TO_EMAIL?: string;
  LEADS_FROM_EMAIL?: string;
}

interface PagesContext {
  request: Request;
  env: Env;
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
  if (!t) return undefined;
  return t.slice(0, max);
}

export const onRequestPost = async (context: PagesContext): Promise<Response> => {
  const { request, env } = context;

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

  // Route by type to the right mailbox (documented in the form-routing matrix).
  const routeTo: Record<LeadType, string> = {
    demo: 'sales',
    'contact-sales': 'sales',
    partner: 'partners',
    waitlist: 'sales',
  };

  let delivered = false;
  if (env.RESEND_API_KEY && env.LEADS_TO_EMAIL) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: env.LEADS_FROM_EMAIL ?? 'leads@hotelbooking.ai',
          to: env.LEADS_TO_EMAIL,
          subject: `New ${type} lead (${routeTo[type]}) — ${referenceId}`,
          text:
            `Reference: ${referenceId}\nType: ${type}\nName: ${fullName}\nEmail: ${email}\n` +
            `Company: ${lead.company ?? '-'}\nHotel: ${lead.hotelName ?? '-'}\nRole: ${lead.role ?? '-'}\n` +
            `Size: ${lead.propertySize ?? '-'}\nPartner type: ${lead.partnerType ?? '-'}\n` +
            `Source: ${lead.source ?? '-'}\nMessage: ${lead.message ?? '-'}\n`,
        }),
      });
      delivered = res.ok;
    } catch {
      delivered = false;
    }
  }

  // PII-safe log: type / route / source / ref only — never name, email or message.
  console.log(`[lead] ${referenceId} type=${type} route=${routeTo[type]} source=${lead.source ?? '(none)'} delivered=${delivered}`);

  return json({ referenceId, delivered }, 202);
};

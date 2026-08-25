/**
 * Builds the internal lead-notification email (HTML + plain-text) for HotelBooking AI.
 *
 * SECURITY: every user-provided value is HTML-escaped before insertion. The email never
 * renders raw user HTML, and the subject is stripped of CR/LF to avoid header issues.
 * The `Reply to Lead` mailto is built from the already-validated prospect email and
 * escaped for the href attribute context.
 */

export type LeadType = 'demo' | 'contact-sales' | 'partner' | 'waitlist';

export interface LeadEmailInput {
  referenceId: string;
  type: LeadType;
  fullName: string;
  email: string;
  company?: string;
  hotelName?: string;
  role?: string;
  propertySize?: string;
  partnerType?: string;
  message?: string;
  source?: string;
  receivedAt: Date;
}

export interface BuiltEmail {
  subject: string;
  html: string;
  text: string;
}

const TYPE_LABEL: Record<LeadType, string> = {
  demo: 'Demo request',
  'contact-sales': 'Sales enquiry',
  partner: 'Partnership enquiry',
  waitlist: 'Developer waitlist',
};

const SUBJECT_LABEL: Record<LeadType, string> = {
  demo: 'Demo Request',
  'contact-sales': 'Sales Enquiry',
  partner: 'Partnership Enquiry',
  waitlist: 'Developer Waitlist',
};

/** Escape a string for safe insertion into HTML text or a double-quoted attribute. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Collapse CR/LF (subject must be a single line — no header injection). */
function oneLine(value: string): string {
  return value.replace(/[\r\n\t]+/g, ' ').trim();
}

function formatReceived(d: Date): string {
  const date = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
  return `${date} at ${time} UTC`;
}

// Brand palette (inline; email-safe).
const C = {
  navy: '#0A1A2F',
  ink: '#0B1220',
  sub: '#5A6675',
  border: '#E4E8EE',
  bg: '#F7F9FC',
  surface: '#FFFFFF',
  accent: '#0E8C8B',
  accentLight: '#22B8B5',
};

const FONT =
  "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;";

export function buildLeadEmail(input: LeadEmailInput): BuiltEmail {
  const { referenceId, type, fullName, email, hotelName, role, propertySize, company, partnerType, message, source, receivedAt } = input;

  const typeLabel = TYPE_LABEL[type];
  const received = formatReceived(receivedAt);

  // ---- Subject (sanitized, hotel name when available) ----
  const subjectHotel = hotelName ? ` — ${oneLine(hotelName)}` : '';
  const subject = oneLine(`New ${SUBJECT_LABEL[type]}${subjectHotel} — ${referenceId}`);

  // ---- Detail rows: only include fields that are present & relevant ----
  const details: Array<[string, string]> = [];
  details.push(['Full name', fullName]);
  details.push(['Work email', email]);
  if (hotelName) details.push(['Hotel / group', hotelName]);
  if (company) details.push(['Company', company]);
  if (role) details.push(['Role', role]);
  if (propertySize) details.push(['Property size', propertySize]);
  if (partnerType) details.push(['Partnership type', partnerType]);

  const replyHref = `mailto:${escapeHtml(email)}`;

  // ---- HTML ----
  const detailRows = details
    .map(
      ([label, value]) => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid ${C.border};${FONT}font-size:13px;color:${C.sub};width:38%;vertical-align:top;">${escapeHtml(label)}</td>
                <td style="padding:10px 0;border-bottom:1px solid ${C.border};${FONT}font-size:14px;color:${C.ink};font-weight:600;vertical-align:top;">${escapeHtml(value)}</td>
              </tr>`,
    )
    .join('');

  const messageBlock = message
    ? `
          <tr><td style="padding:24px 0 0 0;">
            <div style="${FONT}font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${C.sub};margin:0 0 8px 0;">What they want to see</div>
            <div style="${FONT}font-size:14px;line-height:1.6;color:${C.ink};background:${C.bg};border:1px solid ${C.border};border-radius:8px;padding:14px 16px;">${escapeHtml(message).replace(/\r\n|\r|\n/g, '<br>')}</div>
          </td></tr>`
    : '';

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${C.bg};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">New ${escapeHtml(typeLabel)} from ${escapeHtml(fullName)}${hotelName ? ` (${escapeHtml(hotelName)})` : ''} — ${escapeHtml(referenceId)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};">
    <tr><td align="center" style="padding:24px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;">

        <!-- Header -->
        <tr><td style="background:${C.navy};border-radius:12px 12px 0 0;padding:24px 28px;">
          <div style="${FONT}font-size:16px;font-weight:700;color:#ffffff;">HotelBooking<span style="color:${C.accentLight};"> AI</span></div>
          <div style="${FONT}font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${C.accentLight};margin-top:6px;">New ${escapeHtml(typeLabel)}</div>
        </td></tr>

        <!-- Body card -->
        <tr><td style="background:${C.surface};border-left:1px solid ${C.border};border-right:1px solid ${C.border};padding:28px;">

          <h1 style="${FONT}font-size:20px;line-height:1.3;color:${C.ink};margin:0 0 6px 0;">New ${escapeHtml(typeLabel.toLowerCase())} received</h1>
          <p style="${FONT}font-size:14px;line-height:1.6;color:${C.sub};margin:0 0 16px 0;">A potential customer has requested a HotelBooking AI demo.</p>

          <span style="display:inline-block;${FONT}font-size:12px;font-weight:600;color:${C.accent};background:rgba(14,140,139,0.10);border:1px solid rgba(14,140,139,0.25);border-radius:999px;padding:4px 12px;">${escapeHtml(referenceId)}</span>

          <!-- Lead details -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
            <tr><td style="${FONT}font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${C.sub};padding-bottom:6px;">Lead details</td></tr>
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailRows}
          </table>
          ${messageBlock}

          <!-- CTA -->
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 4px 0;">
            <tr><td bgcolor="${C.accent}" style="border-radius:8px;">
              <a href="${replyHref}" style="display:inline-block;${FONT}font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;padding:12px 26px;border-radius:8px;">Reply to Lead</a>
            </td></tr>
          </table>
          <p style="${FONT}font-size:12px;color:${C.sub};margin:8px 0 0 0;">Replying to this email also reaches the prospect directly.</p>

        </td></tr>

        <!-- Secondary info -->
        <tr><td style="background:${C.bg};border:1px solid ${C.border};border-top:0;padding:18px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${FONT}font-size:12px;color:${C.sub};line-height:1.9;">
            <tr><td>Reference:&nbsp;<span style="color:${C.ink};font-weight:600;">${escapeHtml(referenceId)}</span></td></tr>
            <tr><td>Lead type:&nbsp;<span style="color:${C.ink};font-weight:600;">${escapeHtml(typeLabel)}</span></td></tr>
            ${source ? `<tr><td>Source:&nbsp;<span style="color:${C.ink};font-weight:600;">${escapeHtml(source)}</span></td></tr>` : ''}
            <tr><td>Received:&nbsp;<span style="color:${C.ink};font-weight:600;">${escapeHtml(received)}</span></td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 28px;text-align:center;">
          <div style="${FONT}font-size:12px;font-weight:600;color:${C.ink};">HotelBooking AI</div>
          <div style="${FONT}font-size:11px;color:${C.sub};margin-top:2px;">AI Operating System for Hotels</div>
          <div style="${FONT}font-size:11px;color:${C.sub};margin-top:8px;">Automated lead notification from hotel-booking-ai.com</div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  // ---- Plain-text fallback ----
  const textLines: string[] = [];
  textLines.push(`New ${typeLabel}${hotelName ? ` — ${oneLine(hotelName)}` : ''} — ${referenceId}`);
  textLines.push('');
  textLines.push('A potential customer has requested a HotelBooking AI demo.');
  textLines.push('');
  textLines.push('LEAD DETAILS');
  for (const [label, value] of details) textLines.push(`${label}: ${value}`);
  if (message) {
    textLines.push('');
    textLines.push('WHAT THEY WANT TO SEE');
    textLines.push(message);
  }
  textLines.push('');
  textLines.push(`Reply to this lead: ${email}`);
  textLines.push('');
  textLines.push(`Reference: ${referenceId}`);
  textLines.push(`Lead type: ${typeLabel}`);
  if (source) textLines.push(`Source: ${source}`);
  textLines.push(`Received: ${received}`);
  textLines.push('');
  textLines.push('HotelBooking AI — AI Operating System for Hotels');
  textLines.push('Automated lead notification from hotel-booking-ai.com');

  return { subject, html, text: textLines.join('\n') };
}

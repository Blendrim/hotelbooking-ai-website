/**
 * Vendor-neutral analytics abstraction (Phase 5 §T / Phase 6B §T). The UI calls
 * `track(event, props)` only; no provider is coupled here. A real provider is wired
 * in a later deployment phase by implementing the sink below.
 *
 * Privacy: NEVER pass raw form field values (name, email, message) into props.
 * Only pass non-sensitive metadata (which form, which CTA, success/failure).
 */

export type AnalyticsEvent =
  | 'cta_primary_click'
  | 'cta_secondary_click'
  | 'nav_select'
  | 'mega_menu_select'
  | 'demo_form_start'
  | 'demo_form_submit'
  | 'form_validation_error'
  | 'resource_open'
  | 'video_play'
  | 'ai_explanation_expand'
  | 'partner_application_start'
  | 'developer_waitlist_start';

type Props = Record<string, string | number | boolean | undefined>;

/** Central sink. In production, replace the body with the chosen provider call. */
function sink(event: AnalyticsEvent, props?: Props): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { dataLayer?: unknown[] };
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event, ...props });
  } else if (import.meta.env.DEV) {
    // Dev-only visibility; no PII is ever included by contract.
    console.debug('[analytics]', event, props ?? {});
  }
}

export function track(event: AnalyticsEvent, props?: Props): void {
  sink(event, props);
}

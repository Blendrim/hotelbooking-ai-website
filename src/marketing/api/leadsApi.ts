import axios, { AxiosError } from 'axios';
import { env } from '@/config/env';
import type { LeadFormVariant } from '../components/form/LeadForm';

/**
 * Public marketing leads API (Phase 6C). Uses a BARE axios instance — deliberately not
 * the product `apiClient`, because these submissions are anonymous: we don't want the
 * product's auth/refresh/forced-logout interceptors involved for public visitors.
 *
 * The endpoint is `POST /api/leads` ([AllowAnonymous], rate-limited server-side).
 */
const publicClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  timeout: 15_000,
});

export interface SubmitLeadPayload {
  variant: LeadFormVariant;
  values: Record<string, string>;
  /** Originating page path — non-sensitive metadata for routing the lead. */
  source?: string;
}

export interface SubmitLeadResult {
  referenceId: string;
}

/** Normalized, user-safe error. `recoverable` → the user can fix and retry. */
export class LeadSubmitError extends Error {
  readonly status: number | null;
  readonly recoverable: boolean;
  constructor(message: string, status: number | null, recoverable: boolean) {
    super(message);
    this.name = 'LeadSubmitError';
    this.status = status;
    this.recoverable = recoverable;
  }
}

function mapError(error: unknown): LeadSubmitError {
  if (error instanceof AxiosError) {
    const status = error.response?.status ?? null;
    if (status === 429) {
      return new LeadSubmitError('Too many submissions. Please wait a moment and try again.', 429, true);
    }
    if (status === 400) {
      // ProblemDetails validation — surface a concise, safe message (no raw payloads).
      const data = error.response?.data as { title?: string; detail?: string } | undefined;
      return new LeadSubmitError(data?.detail ?? data?.title ?? 'Please check your details and try again.', 400, true);
    }
    if (status === null) {
      return new LeadSubmitError("We couldn't reach the server. Please check your connection and try again.", null, true);
    }
    // 5xx / other — recoverable by retrying later; never expose server internals.
    return new LeadSubmitError('Something went wrong on our side. Please try again shortly.', status, true);
  }
  return new LeadSubmitError('An unexpected error occurred. Please try again.', null, true);
}

export async function submitLead(payload: SubmitLeadPayload): Promise<SubmitLeadResult> {
  const v = payload.values;
  const request = {
    type: payload.variant,
    fullName: v.fullName ?? '',
    email: v.workEmail ?? '',
    company: v.company || undefined,
    hotelName: v.hotelName || undefined,
    role: v.role || undefined,
    propertySize: v.propertySize || undefined,
    partnerType: v.partnerType || undefined,
    message: v.message || v.useCase || undefined,
    source: payload.source,
    company_website: v.company_website || undefined, // honeypot (empty for real users)
  };
  try {
    const { data } = await publicClient.post<SubmitLeadResult>('/leads', request);
    return data;
  } catch (error) {
    throw mapError(error);
  }
}

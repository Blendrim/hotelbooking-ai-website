/**
 * Strongly-typed access to environment configuration.
 * All runtime config is sourced from Vite env variables (VITE_*), which are PUBLIC.
 *
 * The lead endpoint is same-origin: in preview/production it is the Cloudflare Pages
 * Function at /api/leads. No secrets are ever read here.
 */
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '/api';

export const env = {
  apiBaseUrl,
} as const;

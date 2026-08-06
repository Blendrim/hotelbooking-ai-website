import { useMutation } from '@tanstack/react-query';
import { submitLead, LeadSubmitError, type SubmitLeadPayload, type SubmitLeadResult } from './leadsApi';

/**
 * Mutation hook for public lead submission (Phase 6C / 6B §I). Retries only transient
 * failures (network / 5xx) once; never retries validation (400) or rate-limit (429).
 * Presentational components call `mutate` — no fetching logic lives in the component.
 */
export function useSubmitLead() {
  return useMutation<SubmitLeadResult, LeadSubmitError, SubmitLeadPayload>({
    mutationFn: submitLead,
    retry: (failureCount, error) => {
      const status = error.status;
      if (status === 400 || status === 429) return false; // client-fixable / throttled
      return failureCount < 1; // one retry for network / 5xx
    },
    retryDelay: 800,
  });
}

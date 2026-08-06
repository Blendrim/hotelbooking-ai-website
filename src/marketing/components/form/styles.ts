import { cn } from '@/utils/cn';

/** Shared input styling for marketing forms (kept separate so field components can
 *  fast-refresh cleanly). */
export const inputClass = cn(
  'h-11 w-full rounded-mkt-md border border-mkt-border bg-mkt-surface px-3.5 text-sm text-mkt-ink-900 transition-colors',
  'placeholder:text-mkt-ink-300 focus:border-mkt-accent-400 focus:outline-none focus:ring-2 focus:ring-mkt-focus/40',
  'aria-[invalid=true]:border-mkt-error',
);

export const textareaClass = cn(
  'min-h-[120px] w-full rounded-mkt-md border border-mkt-border bg-mkt-surface p-3.5 text-sm text-mkt-ink-900 transition-colors',
  'placeholder:text-mkt-ink-300 focus:border-mkt-accent-400 focus:outline-none focus:ring-2 focus:ring-mkt-focus/40',
  'aria-[invalid=true]:border-mkt-error',
);

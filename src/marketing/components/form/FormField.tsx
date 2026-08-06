import { type ReactNode } from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: (props: { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string }) => ReactNode;
}

/**
 * Accessible field wrapper (Phase 5). Label above input, programmatic error/hint
 * association, color-independent error (icon-free but role="alert" + text). The input
 * is provided via render-prop so RHF `register()` can spread onto it.
 */
export function FormField({ id, label, error, required, hint, children }: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-mkt-ink-900">
        {label}
        {required && <span className="text-mkt-error" aria-hidden="true"> *</span>}
      </label>
      {hint && (
        <p id={hintId} className="text-xs text-mkt-ink-500">
          {hint}
        </p>
      )}
      {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': describedBy })}
      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-mkt-error">
          {error}
        </p>
      )}
    </div>
  );
}

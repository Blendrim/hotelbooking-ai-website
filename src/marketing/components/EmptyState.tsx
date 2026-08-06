import { type LucideIcon } from 'lucide-react';
import { Button } from '../ui/Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

/**
 * Marketing empty state (Phase 3 §5). Calm and intentional: illustration/icon →
 * one-line title → one supportive sentence → one action. Reinforces "the system is
 * ready", never "broken". (Distinct from the product's src/components/ui/EmptyState.)
 */
export function EmptyState({ icon: Icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-mkt-lg border border-dashed border-mkt-border bg-mkt-surface px-6 py-12 text-center">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-mkt-primary-50 text-mkt-primary-500">
        <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div className="flex max-w-sm flex-col gap-1.5">
        <h3 className="text-lg font-semibold text-mkt-ink-900">{title}</h3>
        <p className="text-sm text-mkt-ink-500">{description}</p>
      </div>
      {actionLabel && actionHref && (
        <Button href={actionHref} variant="secondary" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

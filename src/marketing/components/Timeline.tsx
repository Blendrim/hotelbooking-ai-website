import { cn } from '@/utils/cn';

export interface TimelineStep {
  label: string;
  title: string;
  description: string;
}

/**
 * Process timeline (Phase 4B) — used for partner onboarding, implementation, and
 * "what happens next" flows. Vertical on mobile, horizontal on desktop.
 */
export function Timeline({ steps, className }: { steps: TimelineStep[]; className?: string }) {
  return (
    <ol className={cn('grid gap-8 md:grid-cols-2 lg:grid-cols-4', className)}>
      {steps.map((step, i) => (
        <li key={step.title} className="relative flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-mkt-accent-400/15 text-sm font-semibold text-mkt-accent-600">
              {i + 1}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-mkt-ink-500">{step.label}</span>
          </div>
          <h3 className="text-base font-semibold text-mkt-ink-900">{step.title}</h3>
          <p className="text-sm text-mkt-ink-500">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

import { useState } from 'react';
import { Sparkles, Check, ShieldCheck } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface AIRecommendationCardProps {
  /** The action the AI proposes. */
  recommendation: string;
  /** Evidence lines behind the recommendation — the "Why" (always real text, SR-readable). */
  reasoning: string[];
  /** 0–100. */
  confidence: number;
  /** Optional expected impact / trade-off line. */
  expectedImpact?: string;
  /**
   * Marks a financial or otherwise irreversible action. Such actions are NEVER
   * auto-executed — Approve is always an explicit human step (Phase 1/AutoPilot).
   */
  requiresHumanApproval?: boolean;
  /** Presentation-only handlers (business behavior wired later / by product APIs). */
  onApprove?: () => void;
  onAdjust?: () => void;
  onDismiss?: () => void;
  className?: string;
}

/**
 * The signature Explainable-AI component. Renders Recommendation → Why (reasoning +
 * evidence) → Confidence → Human controls (Approve / Adjust / Dismiss). It structurally
 * refuses to imply automatic execution of consequential actions: a human always approves.
 *
 * This is a PRESENTATIONAL component — it holds only local UI state. Real approval flows
 * are provided by the product's APIs; do not embed business logic here.
 */
export function AIRecommendationCard({
  recommendation,
  reasoning,
  confidence,
  expectedImpact,
  requiresHumanApproval = false,
  onApprove,
  onAdjust,
  onDismiss,
  className,
}: AIRecommendationCardProps) {
  const [state, setState] = useState<'pending' | 'approved' | 'dismissed'>('pending');
  const clampedConfidence = Math.max(0, Math.min(100, confidence));

  if (state === 'dismissed') {
    return (
      <div className={cn('rounded-mkt-lg border border-mkt-border bg-mkt-surface p-5 text-sm text-mkt-ink-500', className)}>
        Recommendation dismissed.
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-mkt-lg border border-mkt-border bg-mkt-surface shadow-mkt-2',
        'border-l-4 border-l-mkt-accent-400',
        className,
      )}
    >
      <div className="flex flex-col gap-4 p-5 sm:p-6">
        {/* Label */}
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-mkt-accent-400/15 text-mkt-accent-600">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-mkt-accent-600">AI Recommendation</span>
        </div>

        {/* Recommendation */}
        <p className="text-lg font-semibold text-mkt-ink-900">{recommendation}</p>

        {/* Why / reasoning path */}
        <div className="rounded-mkt-md bg-mkt-primary-50 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-mkt-ink-500">Why</p>
          <ul className="flex flex-col gap-2">
            {reasoning.map((line) => (
              <li key={line} className="flex items-start gap-2 text-sm text-mkt-ink-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mkt-accent-400" aria-hidden="true" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Confidence */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-mkt-ink-500">Confidence</span>
            <span className="font-semibold text-mkt-ink-900 tabular-nums">{clampedConfidence}%</span>
          </div>
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-mkt-ink-300/25"
            role="meter"
            aria-valuenow={clampedConfidence}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="AI confidence"
          >
            <div
              className="h-full rounded-full bg-mkt-accent-400 transition-[width] duration-500"
              style={{ width: `${clampedConfidence}%` }}
            />
          </div>
        </div>

        {expectedImpact && (
          <p className="text-sm text-mkt-ink-500">
            <span className="font-medium text-mkt-ink-700">Expected impact: </span>
            {expectedImpact}
          </p>
        )}

        {/* Human control */}
        {state === 'approved' ? (
          <div
            className="flex items-center gap-2 rounded-mkt-md bg-mkt-success/10 px-3 py-2 text-sm font-medium text-mkt-success"
            aria-live="polite"
          >
            <Check className="h-4 w-4" aria-hidden="true" /> Approved by you
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setState('approved');
                  onApprove?.();
                }}
                className="mkt-focusable inline-flex h-9 items-center gap-1.5 rounded-mkt-md bg-mkt-primary-500 px-4 text-sm font-medium text-white transition-colors hover:bg-mkt-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mkt-focus focus-visible:ring-offset-2"
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => onAdjust?.()}
                className="mkt-focusable inline-flex h-9 items-center rounded-mkt-md border border-mkt-border px-4 text-sm font-medium text-mkt-ink-700 transition-colors hover:border-mkt-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mkt-focus focus-visible:ring-offset-2"
              >
                Adjust
              </button>
              <button
                type="button"
                onClick={() => {
                  setState('dismissed');
                  onDismiss?.();
                }}
                className="mkt-focusable inline-flex h-9 items-center rounded-mkt-md px-4 text-sm font-medium text-mkt-ink-500 transition-colors hover:bg-mkt-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mkt-focus focus-visible:ring-offset-2"
              >
                Dismiss
              </button>
            </div>
            {requiresHumanApproval && (
              <p className="flex items-center gap-1.5 text-xs text-mkt-ink-500">
                <ShieldCheck className="h-3.5 w-3.5 text-mkt-success" aria-hidden="true" />
                This action affects money or is irreversible — it will never run automatically.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

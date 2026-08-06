import { X, Check } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ComparisonTableProps {
  oldLabel: string;
  newLabel: string;
  /** Each row: [old-world statement, new-world statement]. */
  rows: [string, string][];
  className?: string;
}

/**
 * Two-column "Old Way vs HotelBooking AI" comparison (Phase 4B). The visual asymmetry
 * carries the argument: the emphasized column draws the eye. On mobile the two columns
 * stack per row so nothing needs horizontal scrolling. Marks pair icon + text.
 */
export function ComparisonTable({ oldLabel, newLabel, rows, className }: ComparisonTableProps) {
  return (
    <div className={cn('overflow-hidden rounded-mkt-lg border border-mkt-border', className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="border-b border-mkt-border bg-mkt-surface px-6 py-4 sm:border-b-0 sm:border-r">
          <span className="text-sm font-semibold uppercase tracking-wide text-mkt-ink-500">{oldLabel}</span>
        </div>
        <div className="border-b border-mkt-border bg-mkt-primary-50 px-6 py-4">
          <span className="text-sm font-semibold uppercase tracking-wide text-mkt-primary-700">{newLabel}</span>
        </div>
        {rows.map(([oldItem, newItem]) => (
          <div key={newItem} className="contents">
            <div className="flex items-start gap-3 border-t border-mkt-border bg-mkt-surface px-6 py-4 sm:border-r">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-mkt-ink-300" aria-hidden="true" />
              <span className="text-sm text-mkt-ink-500">{oldItem}</span>
            </div>
            <div className="flex items-start gap-3 border-t border-mkt-border bg-mkt-primary-50 px-6 py-4">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-mkt-success" aria-hidden="true" />
              <span className="text-sm font-medium text-mkt-ink-900">{newItem}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

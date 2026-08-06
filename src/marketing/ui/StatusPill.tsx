import { CircleCheck, Clock, Circle } from 'lucide-react';
import { cn } from '@/utils/cn';

export type AvailabilityStatus = 'available' | 'coming-soon' | 'planned';

/**
 * Availability status pill (Phase 2 honesty system). ALWAYS pairs icon + text +
 * color so meaning is color-independent (accessibility). Used across Integrations,
 * Developers, Security, Roadmap, Status.
 */
const config: Record<AvailabilityStatus, { label: string; className: string; Icon: typeof Circle }> = {
  available: {
    label: 'Available',
    className: 'text-mkt-success bg-mkt-success/10 ring-mkt-success/20',
    Icon: CircleCheck,
  },
  'coming-soon': {
    label: 'Coming soon',
    className: 'text-mkt-warning bg-mkt-warning/10 ring-mkt-warning/20',
    Icon: Clock,
  },
  planned: {
    label: 'Planned',
    className: 'text-mkt-ink-500 bg-mkt-ink-500/10 ring-mkt-ink-500/20',
    Icon: Circle,
  },
};

export function StatusPill({ status, label, className }: { status: AvailabilityStatus; label?: string; className?: string }) {
  const { label: defaultLabel, className: tone, Icon } = config[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
        tone,
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label ?? defaultLabel}
    </span>
  );
}

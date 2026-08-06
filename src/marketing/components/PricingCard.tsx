import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Heading, Text } from '../ui/Typography';

interface PricingCardProps {
  tier: string;
  audience: string;
  /** Price placeholder — NEVER an invented number (Phase 2). e.g. "Custom", "—". */
  priceSlot: string;
  priceCaption?: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  /** Recommended tier: pre-elevated with accent border + "Most popular" badge. */
  highlighted?: boolean;
  /** Enterprise/premium: adds a champagne top accent (<=5% gold rule). */
  goldAccent?: boolean;
}

export function PricingCard({
  tier,
  audience,
  priceSlot,
  priceCaption,
  features,
  ctaLabel,
  ctaHref,
  highlighted = false,
  goldAccent = false,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        'relative flex h-full flex-col gap-6 rounded-mkt-lg border bg-mkt-surface p-6 sm:p-7',
        highlighted ? 'border-mkt-accent-400 shadow-mkt-2' : 'border-mkt-border shadow-mkt-1',
        goldAccent && 'border-t-2 border-t-mkt-gold-500',
      )}
    >
      {highlighted && (
        <div className="absolute -top-3 left-6">
          <Badge tone="accent">Most popular</Badge>
        </div>
      )}
      <div className="flex flex-col gap-1">
        <Heading level={3} size="h4">
          {tier}
        </Heading>
        <Text size="sm" muted>
          {audience}
        </Text>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-semibold text-mkt-ink-900">{priceSlot}</span>
        {priceCaption && (
          <Text size="sm" muted>
            {priceCaption}
          </Text>
        )}
      </div>
      <ul className="flex flex-1 flex-col gap-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-mkt-ink-700">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-mkt-success" strokeWidth={2} aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Button href={ctaHref} variant={highlighted ? 'primary' : 'secondary'} fullWidth>
        {ctaLabel}
      </Button>
    </div>
  );
}

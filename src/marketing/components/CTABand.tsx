import { Section } from '../ui/Section';
import { Heading, Text } from '../ui/Typography';
import { Button } from '../ui/Button';

interface CTABandProps {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

/**
 * The recurring closing move on every page (Phase 4B). Deep-background band with one
 * primary + one optional secondary action. Exactly one primary per view.
 */
export function CTABand({ title, description, primaryLabel, primaryHref, secondaryLabel, secondaryHref }: CTABandProps) {
  return (
    <Section background="deep">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex max-w-2xl flex-col gap-3">
          <Heading level={2} size="h2" className="text-white">
            {title}
          </Heading>
          {description && (
            <Text size="lg" className="text-mkt-primary-300">
              {description}
            </Text>
          )}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={primaryHref} size="lg">
            {primaryLabel}
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button href={secondaryHref} variant="secondary" size="lg" className="border-white/20 bg-white/5 text-white hover:border-mkt-accent-400 hover:bg-white/10">
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}

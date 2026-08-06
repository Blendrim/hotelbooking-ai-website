import { type ReactNode } from 'react';
import { Section } from '../ui/Section';
import { Heading, Text, Eyebrow } from '../ui/Typography';
import { Button } from '../ui/Button';
import { track } from '../analytics/analytics';

interface CtaSpec {
  label: string;
  href: string;
}

interface HeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  primaryCta?: CtaSpec;
  secondaryCta?: CtaSpec;
  /** Right-column visual (DashboardFrame, illustration…). Omit for centered hero. */
  visual?: ReactNode;
  /** `full` = split hero; `compact` = shorter interior-page hero. */
  size?: 'full' | 'compact';
  background?: 'light' | 'subtle' | 'deep';
}

/**
 * Page hero (composition of Section + Typography + Button, Phase 4B). Keeps the value
 * proposition + primary CTA above the fold at every breakpoint.
 */
export function Hero({ eyebrow, title, description, primaryCta, secondaryCta, visual, size = 'compact', background = 'light' }: HeroProps) {
  const onDark = background === 'deep';
  const heroLevel = size === 'full' ? 'display' : 'h1';

  const ctas = (primaryCta || secondaryCta) && (
    <div className="flex flex-col gap-3 sm:flex-row">
      {primaryCta && (
        <Button href={primaryCta.href} size="lg" onClick={() => track('cta_primary_click', { location: 'hero' })}>
          {primaryCta.label}
        </Button>
      )}
      {secondaryCta && (
        <Button
          href={secondaryCta.href}
          variant="secondary"
          size="lg"
          className={onDark ? 'border-white/20 bg-white/5 text-white hover:bg-white/10' : undefined}
        >
          {secondaryCta.label}
        </Button>
      )}
    </div>
  );

  const copy = (
    <div className="flex flex-col items-start gap-5">
      {eyebrow && <Eyebrow className={onDark ? 'text-mkt-accent-400' : undefined}>{eyebrow}</Eyebrow>}
      <Heading level={1} size={heroLevel} className={onDark ? 'text-white' : undefined}>
        {title}
      </Heading>
      {description && (
        <Text size="lg" className={onDark ? 'text-mkt-primary-300' : 'text-mkt-ink-500'}>
          {description}
        </Text>
      )}
      {ctas}
    </div>
  );

  return (
    <Section background={background} spacing="lg">
      {visual ? <div className="grid items-center gap-12 lg:grid-cols-2">{copy}{visual}</div> : <div className="max-w-3xl">{copy}</div>}
    </Section>
  );
}

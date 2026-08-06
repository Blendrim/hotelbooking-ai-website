import { useParams, Navigate } from 'react-router-dom';
import { AlertCircle, Check } from 'lucide-react';
import { Seo } from '../seo/Seo';
import { Hero } from '../components/Hero';
import { Section } from '../ui/Section';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';
import { FeatureCard } from '../components/FeatureCard';
import { CTABand } from '../components/CTABand';
import { Text } from '../ui/Typography';
import { getSolution } from '../content/solutions';
import { getAiFeature } from '../content/aiFeatures';

/** Solution/segment template (Phase 6B §H). Content genuinely differs per segment. */
export function SolutionPage() {
  const { slug } = useParams<{ slug: string }>();
  const solution = slug ? getSolution(slug) : undefined;
  if (!solution) return <Navigate to="/solutions" replace />;

  const features = solution.focusFeatures.map(getAiFeature).filter((f): f is NonNullable<typeof f> => Boolean(f));

  return (
    <>
      <Seo title={solution.name} path={`/solutions/${solution.slug}`} description={solution.summary} />
      <Hero eyebrow={solution.eyebrow} title={solution.headline} description={solution.summary} primaryCta={solution.primaryCta} secondaryCta={{ label: 'See Pricing', href: '/pricing' }} />

      <Section background="light">
        <SectionHeader eyebrow="Challenges" title="What this looks like today" level={2} />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {solution.pains.map((p) => (
            <Card key={p} className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-mkt-warning" aria-hidden="true" />
              <Text>{p}</Text>
            </Card>
          ))}
        </div>
      </Section>

      <Section background="subtle">
        <SectionHeader eyebrow="How we help" title="The capabilities that matter most for you" level={2} />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <FeatureCard key={f.slug} icon={f.icon} title={f.name} description={f.summary} href={`/ai-features/${f.slug}`} />
          ))}
        </div>
      </Section>

      <Section background="light" spacing="md">
        <Card accentEdge className="flex items-start gap-3">
          <Check className="mt-0.5 h-6 w-6 shrink-0 text-mkt-success" aria-hidden="true" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-mkt-accent-600">The outcome</span>
            <p className="mt-1 text-lg font-medium text-mkt-ink-900">{solution.outcome}</p>
          </div>
        </Card>
      </Section>

      <CTABand title={`See it built for ${solution.name.toLowerCase()}`} primaryLabel={solution.primaryCta.label} primaryHref={solution.primaryCta.href} secondaryLabel="Talk to Sales" secondaryHref="/contact" />
    </>
  );
}

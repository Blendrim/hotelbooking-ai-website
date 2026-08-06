import { useParams, Navigate } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Seo } from '../seo/Seo';
import { Hero } from '../components/Hero';
import { Section } from '../ui/Section';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';
import { FeatureCard } from '../components/FeatureCard';
import { CTABand } from '../components/CTABand';
import { DashboardFrame } from '../components/DashboardFrame';
import { AIRecommendationCard } from '../components/AIRecommendationCard';
import { Heading, Text } from '../ui/Typography';
import { getAiFeature, aiFeatures } from '../content/aiFeatures';

/** Feature-detail template (Phase 6B §G). One template renders all AI feature pages. */
export function AiFeaturePage() {
  const { slug } = useParams<{ slug: string }>();
  const feature = slug ? getAiFeature(slug) : undefined;
  if (!feature) return <Navigate to="/ai-features" replace />;

  const related = feature.related.map(getAiFeature).filter((f): f is NonNullable<typeof f> => Boolean(f));
  const rec = feature.recommendation;

  return (
    <>
      <Seo title={feature.name} path={`/ai-features/${feature.slug}`} description={feature.summary} />

      <Hero
        eyebrow={feature.eyebrow}
        title={feature.headline}
        description={feature.summary}
        primaryCta={{ label: 'Book a Demo', href: '/book-demo' }}
        visual={
          <DashboardFrame label={`${feature.name} — example AI recommendation`}>
            <AIRecommendationCard
              recommendation={rec.text}
              reasoning={rec.reasoning}
              confidence={rec.confidence}
              expectedImpact={rec.impact}
              requiresHumanApproval={rec.requiresHumanApproval}
            />
          </DashboardFrame>
        }
      />

      <Section background="light">
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-mkt-ink-500">The problem</span>
            <Text>{feature.problem}</Text>
          </Card>
          <Card className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-mkt-ink-500">The traditional way</span>
            <Text>{feature.traditional}</Text>
          </Card>
          <Card accentEdge className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-mkt-accent-600">The AI way</span>
            <Text>{feature.solution}</Text>
          </Card>
        </div>
      </Section>

      <Section background="subtle">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader eyebrow="Benefits" title="What it changes for you" level={2} />
            <ul className="mt-6 flex flex-col gap-3">
              {feature.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-mkt-success" aria-hidden="true" />
                  <span className="text-mkt-ink-700">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card>
            <Heading level={3} size="h4">Explained, always</Heading>
            <Text muted className="mt-2">
              Every recommendation shows its reasoning, evidence, and confidence. You approve, adjust, or dismiss — and financial or irreversible actions are never executed automatically.
            </Text>
            <AIRecommendationCard className="mt-5" recommendation={rec.text} reasoning={rec.reasoning} confidence={rec.confidence} expectedImpact={rec.impact} requiresHumanApproval={rec.requiresHumanApproval} />
          </Card>
        </div>
      </Section>

      {related.length > 0 && (
        <Section background="light" spacing="md">
          <SectionHeader eyebrow="Works with" title="Better together" description="The more modules you turn on, the smarter every one becomes." level={2} />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((f) => (
              <FeatureCard key={f.slug} icon={f.icon} title={f.name} description={f.summary} href={`/ai-features/${f.slug}`} linkLabel="Explore" />
            ))}
          </div>
          <div className="mt-8 flex items-center gap-1 text-sm">
            <span className="text-mkt-ink-500">Explore all</span>
            <a href="/ai-features" className="inline-flex items-center gap-1 font-medium text-mkt-primary-500 hover:text-mkt-primary-700">
              {aiFeatures.length} AI features <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Section>
      )}

      <CTABand title={`See ${feature.name} in action`} primaryLabel="Book a Demo" primaryHref="/book-demo" secondaryLabel="Talk to Sales" secondaryHref="/contact" />
    </>
  );
}

import { Seo } from '../seo/Seo';
import { Hero } from '../components/Hero';
import { Section } from '../ui/Section';
import { SectionHeader } from '../components/SectionHeader';
import { FeatureCard } from '../components/FeatureCard';
import { CTABand } from '../components/CTABand';
import { AIRecommendationCard } from '../components/AIRecommendationCard';
import { Reveal } from '../motion/Reveal';
import { Heading, Text } from '../ui/Typography';
import { aiFeatures, type AiFeatureContent } from '../content/aiFeatures';

const GROUP_ORDER: AiFeatureContent['group'][] = ['Front Office', 'Revenue', 'Operations', 'Guest', 'Intelligence'];

export function AiFeaturesHubPage() {
  return (
    <>
      <Seo title="AI Features" path="/ai-features" description="AI for every part of your hotel — receptionist, revenue, operations, guest experience, and more. Every decision explained." />

      <Hero
        eyebrow="AI Features"
        title="AI for every part of your hotel"
        description="Turn on the modules you need. Every one shares the same brain — and explains every decision it makes."
        primaryCta={{ label: 'Book a Demo', href: '/book-demo' }}
      />

      <Section background="subtle" spacing="md">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Heading level={2} size="h3">Every decision, explained</Heading>
            <Text size="lg" muted className="mt-3">
              Explainable AI isn’t a feature — it’s the stance behind every module. See the reasoning, the evidence, and the confidence, and stay in control.
            </Text>
          </div>
          <AIRecommendationCard
            recommendation="Raise weekend rate by 8% for Deluxe rooms"
            reasoning={['Demand up 22% vs. last year', '14 Deluxe rooms unsold Fri–Sun', 'Comp set nearing sell-out']}
            confidence={87}
            expectedImpact="+$3,200 estimated"
            requiresHumanApproval
          />
        </div>
      </Section>

      {GROUP_ORDER.map((group) => {
        const items = aiFeatures.filter((f) => f.group === group);
        if (items.length === 0) return null;
        return (
          <Section key={group} background="light" spacing="md">
            <SectionHeader eyebrow={group} title={`${group} intelligence`} level={2} />
            <Reveal className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((f) => (
                <FeatureCard key={f.slug} icon={f.icon} title={f.name} description={f.summary} href={`/ai-features/${f.slug}`} />
              ))}
            </Reveal>
          </Section>
        );
      })}

      <CTABand title="See it running your hotel" primaryLabel="Book a Demo" primaryHref="/book-demo" secondaryLabel="Talk to Sales" secondaryHref="/contact" />
    </>
  );
}

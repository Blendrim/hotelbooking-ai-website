import { Brain, Sparkles, ShieldCheck } from 'lucide-react';
import { Seo } from '../seo/Seo';
import { Hero } from '../components/Hero';
import { Section } from '../ui/Section';
import { SectionHeader } from '../components/SectionHeader';
import { FeatureCard } from '../components/FeatureCard';
import { StatCard } from '../components/StatCard';
import { Card } from '../components/Card';
import { Testimonial } from '../components/Testimonial';
import { LogoStrip } from '../components/LogoStrip';
import { ComparisonTable } from '../components/ComparisonTable';
import { CTABand } from '../components/CTABand';
import { FAQ } from '../components/FAQ';
import { DashboardFrame } from '../components/DashboardFrame';
import { AIRecommendationCard } from '../components/AIRecommendationCard';
import { Reveal } from '../motion/Reveal';
import { TextLink } from '../ui/TextLink';
import { Heading, Text } from '../ui/Typography';
import { aiFeatures } from '../content/aiFeatures';

const PILLARS = [
  { icon: Brain, title: 'One Brain, Every Department', body: 'Revenue, front desk, housekeeping, maintenance and guest experience run as a single intelligence — not ten disconnected tools.' },
  { icon: Sparkles, title: 'AI That Acts — and Explains Itself', body: 'From signal to recommendation to action, every decision shows its reasoning. You approve, adjust, or dismiss.' },
  { icon: ShieldCheck, title: 'Enterprise-Grade Calm', body: 'Built to be trusted by owners, IT, and procurement — with human control over anything that touches money.' },
];

export function HomePage() {
  return (
    <>
      <Seo title="AI Operating System for Hotels" path="/home" />

      <Hero
        background="deep"
        size="full"
        eyebrow="The AI Operating System for Hotels"
        title="Run your entire hotel with one AI."
        description="From the front desk to the balance sheet, HotelBooking AI operates every department as a single intelligence — growing revenue, automating the work, and delighting every guest."
        primaryCta={{ label: 'Book a Demo', href: '/book-demo' }}
        secondaryCta={{ label: 'Request a Pilot', href: '/book-demo' }}
        visual={
          <DashboardFrame label="Explainable AI revenue recommendation">
            <AIRecommendationCard
              recommendation="Raise weekend rate by 8% for Deluxe rooms"
              reasoning={['Demand up 22% vs. the same weekend last year', '14 Deluxe rooms still unsold for Fri–Sun', 'Two nearby comp-set hotels are near sold out']}
              confidence={87}
              expectedImpact="+$3,200 estimated weekend revenue"
              requiresHumanApproval
            />
          </DashboardFrame>
        }
      />

      <Section background="light" spacing="md">
        <LogoStrip caption="Trusted by founding partners" names={['Aurelia', 'Northwind', 'Maison Bleu', 'Solace Resorts', 'Kestrel Group']} />
      </Section>

      <Section background="light">
        <div className="grid gap-6 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <Card key={p.title} className="flex flex-col gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-mkt-md bg-mkt-accent-400/12 text-mkt-accent-600">
                <p.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <Heading level={3} size="h4">{p.title}</Heading>
              <Text muted>{p.body}</Text>
            </Card>
          ))}
        </div>
      </Section>

      <Section background="light">
        <SectionHeader eyebrow="The platform" title="AI for every part of your hotel" description="Turn on the modules you need. The more you use, the smarter every one becomes." />
        <Reveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aiFeatures.slice(0, 9).map((f) => (
            <FeatureCard key={f.slug} icon={f.icon} title={f.name} description={f.summary} href={`/ai-features/${f.slug}`} />
          ))}
        </Reveal>
        <div className="mt-8">
          <TextLink href="/ai-features" arrow>See all AI features</TextLink>
        </div>
      </Section>

      <Section background="subtle">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <SectionHeader eyebrow="Outcomes" title="Results hotels care about" description="Illustrative figures — your demo shows the model applied to your property." />
            <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3">
              <StatCard value={18} suffix="%" label="RevPAR lift" context="Illustrative, first 90 days" />
              <StatCard value={12} suffix="h" label="Saved weekly" context="Per front-desk team" />
              <StatCard value={0} label="Overbookings" context="With Zero-Overbooking AI" />
            </div>
          </div>
          <Card>
            <Testimonial
              quote="It finally feels like one system running the hotel instead of ten dashboards."
              name="Elena Marku"
              role="General Manager"
              property="Aurelia Boutique"
            />
          </Card>
        </div>
      </Section>

      <Section background="light">
        <SectionHeader eyebrow="Why it's different" title="The old way of running a hotel is over" description="Not a better PMS — a different philosophy." />
        <div className="mt-10">
          <ComparisonTable
            oldLabel="Traditional PMS"
            newLabel="HotelBooking AI"
            rows={[
              ['Disconnected systems & vendors', 'One intelligent platform'],
              ['Manual, reactive operations', 'Proactive, self-coordinating departments'],
              ['Data you have to interpret', 'Decisions delivered to you'],
              ['A black box you can’t question', 'Explainable AI you can trust'],
            ]}
          />
          <div className="mt-8"><TextLink href="/why" arrow>Why HotelBooking AI</TextLink></div>
        </div>
      </Section>

      <Section background="light">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Explainable AI" title="AI that acts — and explains itself" description="Every important recommendation shows its reasoning, evidence, and confidence. Financial and irreversible actions are never executed automatically." level={3} />
            <div className="mt-6 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-mkt-accent-600" aria-hidden="true" />
              <TextLink href="/ai-features/explainable-ai" arrow>How Explainable AI works</TextLink>
            </div>
          </div>
          <AIRecommendationCard
            recommendation="Reassign 3 late-checkout rooms to the morning cleaning queue"
            reasoning={['3 guests extended checkout to 2pm', 'Two arrivals scheduled before 3pm', 'Cleaner availability is tight this morning']}
            confidence={72}
          />
        </div>
      </Section>

      <Section background="light" spacing="md">
        <SectionHeader eyebrow="Questions" title="Common questions" align="center" />
        <div className="mx-auto mt-8 max-w-3xl">
          <FAQ
            items={[
              { question: 'Will the AI act without my approval?', answer: 'No. Financial and irreversible actions always require explicit human approval. The AI recommends and explains — you decide.' },
              { question: 'Does it replace my PMS?', answer: 'HotelBooking AI is an operating layer across your hotel’s departments. Your demo covers how it fits your current stack and integrations.' },
              { question: 'How do we get started?', answer: 'Most hotels begin with a low-risk Pilot, guided by a dedicated success team. Book a demo to see it applied to your property.' },
            ]}
          />
        </div>
        <div className="mt-6 text-center">
          <TextLink href="/pricing" arrow>See plans & the Pilot Program</TextLink>
        </div>
      </Section>

      <CTABand
        title="See your hotel run itself"
        description="Book a 30-minute demo tailored to your property — no obligation."
        primaryLabel="Book a Demo"
        primaryHref="/book-demo"
        secondaryLabel="Talk to Sales"
        secondaryHref="/contact"
      />
    </>
  );
}

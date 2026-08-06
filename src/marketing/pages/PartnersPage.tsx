import { Cpu, Puzzle, Store, Briefcase, Wrench } from 'lucide-react';
import { Seo } from '../seo/Seo';
import { Hero } from '../components/Hero';
import { Section } from '../ui/Section';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';
import { Timeline } from '../components/Timeline';
import { LeadForm } from '../components/form/LeadForm';
import { Heading, Text } from '../ui/Typography';

const TYPES = [
  { icon: Cpu, title: 'Technology Partners', body: 'Build integrations on our platform.' },
  { icon: Puzzle, title: 'System Integrators', body: 'Deliver and configure for hotels.' },
  { icon: Store, title: 'Resellers', body: 'Bring HotelBooking AI to your market.' },
  { icon: Briefcase, title: 'Consultants & Agencies', body: 'Advise hotels on adoption.' },
  { icon: Wrench, title: 'Implementation Partners', body: 'Onboard and support customers.' },
];

const BENEFITS = ['Revenue share & referral rewards', 'Co-marketing opportunities', 'Early API access', 'Partner certification', 'Dedicated partner support', 'Directory listing'];

export function PartnersPage() {
  return (
    <>
      <Seo title="Partners" path="/partners" description="Grow with HotelBooking AI — technology partners, system integrators, resellers, consultants, and implementation partners." />
      <Hero eyebrow="Partners" title="Grow with HotelBooking AI" description="Join the ecosystem forming around the AI operating system for hotels." primaryCta={{ label: 'Become a Partner', href: '#apply' }} />

      <Section background="light">
        <SectionHeader eyebrow="Partner types" title="Ways to partner" level={2} />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TYPES.map((t) => (
            <Card key={t.title} className="flex flex-col gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-mkt-md bg-mkt-accent-400/12 text-mkt-accent-600">
                <t.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <Heading level={3} size="h4">{t.title}</Heading>
              <Text muted>{t.body}</Text>
            </Card>
          ))}
        </div>
      </Section>

      <Section background="subtle">
        <SectionHeader eyebrow="Benefits" title="What you get" level={2} />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <li key={b} className="rounded-mkt-md border border-mkt-border bg-mkt-surface px-4 py-3 text-sm text-mkt-ink-700">{b}</li>
          ))}
        </ul>
      </Section>

      <Section background="light">
        <SectionHeader eyebrow="Process" title="How to become a partner" level={2} />
        <Timeline
          className="mt-8"
          steps={[
            { label: 'Step 1', title: 'Apply', description: 'Tell us about your business.' },
            { label: 'Step 2', title: 'Qualify', description: 'We align on fit and goals.' },
            { label: 'Step 3', title: 'Onboard', description: 'Enablement and certification.' },
            { label: 'Step 4', title: 'Grow', description: 'Go to market together.' },
          ]}
        />
      </Section>

      <Section background="light" spacing="md" id="apply">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <Heading level={2} size="h3">Become a Partner</Heading>
            <Text size="lg" muted className="mt-3">Tell us about your business and how you’d like to work together.</Text>
          </div>
          <Card className="shadow-mkt-2">
            <LeadForm variant="partner" />
          </Card>
        </div>
      </Section>
    </>
  );
}

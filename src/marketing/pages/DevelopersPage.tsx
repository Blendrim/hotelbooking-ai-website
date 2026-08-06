import { Seo } from '../seo/Seo';
import { Hero } from '../components/Hero';
import { Section } from '../ui/Section';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';
import { StatusPill, type AvailabilityStatus } from '../ui/StatusPill';
import { LeadForm } from '../components/form/LeadForm';
import { Text, Heading } from '../ui/Typography';

const CAPABILITIES: { title: string; body: string; status: AvailabilityStatus }[] = [
  { title: 'REST API', body: 'Programmatic access to core platform resources.', status: 'planned' },
  { title: 'Webhooks', body: 'Subscribe to events across the platform.', status: 'planned' },
  { title: 'OAuth / API keys', body: 'Secure authentication for integrations.', status: 'planned' },
  { title: 'SDKs', body: 'Typed client libraries for common languages.', status: 'planned' },
  { title: 'Sandbox', body: 'A safe environment to build and test.', status: 'planned' },
  { title: 'Documentation portal', body: 'Guides and API reference.', status: 'planned' },
];

export function DevelopersPage() {
  return (
    <>
      <Seo title="Developers" path="/developers" description="Build on the hotel operating system. Our public API is on the roadmap — preview what’s coming and request early access." noindex />
      <Hero eyebrow="Developers" title="Build on the hotel operating system" description="A public API and developer platform are on our roadmap. Preview what’s coming and join the waitlist for early access." primaryCta={{ label: 'Join the waitlist', href: '#waitlist' }} />

      <Section background="subtle" spacing="md">
        <Card accentEdge>
          <Text className="font-medium text-mkt-ink-900">Our public API is on the roadmap.</Text>
          <Text muted className="mt-1">Everything below is a preview of planned capabilities — not yet generally available. We’re being explicit so nothing is mistaken for shipped functionality.</Text>
        </Card>
      </Section>

      <Section background="light">
        <SectionHeader eyebrow="Preview" title="Planned developer capabilities" level={2} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c) => (
            <Card key={c.title} className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-semibold text-mkt-ink-900">{c.title}</h3>
                <StatusPill status={c.status} />
              </div>
              <Text size="sm" muted>{c.body}</Text>
            </Card>
          ))}
        </div>
      </Section>

      <Section background="light" spacing="md" id="waitlist">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <Heading level={2} size="h3">Join the developer waitlist</Heading>
            <Text size="lg" muted className="mt-3">Be first to access the developer preview when it opens.</Text>
          </div>
          <Card className="shadow-mkt-2">
            <LeadForm variant="waitlist" />
          </Card>
        </div>
      </Section>
    </>
  );
}

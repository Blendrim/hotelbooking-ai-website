import { Seo } from '../seo/Seo';
import { Hero } from '../components/Hero';
import { Section } from '../ui/Section';
import { Card } from '../components/Card';
import { CTABand } from '../components/CTABand';
import { Heading, Text } from '../ui/Typography';

const COLUMNS: { phase: string; caption: string; items: string[] }[] = [
  { phase: 'Now', caption: 'Shipping', items: ['Explainable AI across modules', 'Operations Command Center', 'Booking.com channel sync'] },
  { phase: 'Next', caption: 'In progress', items: ['Encryption at rest', 'SSO (SAML/OIDC)', 'Additional OTA connectors'] },
  { phase: 'Later', caption: 'Planned', items: ['Public API & developer platform', 'Formal certifications', 'Marketplace integrations'] },
];

export function RoadmapPage() {
  return (
    <>
      <Seo title="Roadmap" path="/roadmap" description="Where HotelBooking AI is headed — Now, Next, and Later. Curated and honest; no committed dates." noindex />
      <Hero eyebrow="Roadmap" title="Where we’re headed" description="A curated view of what’s shipping, in progress, and planned. Roadmap items reflect current plans and may change." primaryCta={{ label: 'Have a request? Talk to us', href: '/contact' }} />

      <Section background="light">
        <div className="grid gap-6 md:grid-cols-3">
          {COLUMNS.map((col) => (
            <Card key={col.phase} className="flex flex-col gap-4">
              <div>
                <Heading level={2} size="h4">{col.phase}</Heading>
                <Text size="sm" muted>{col.caption}</Text>
              </div>
              <ul className="flex flex-col gap-2">
                {col.items.map((item) => (
                  <li key={item} className="rounded-mkt-md border border-mkt-border bg-mkt-bg px-3 py-2 text-sm text-mkt-ink-700">{item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <CTABand title="Want to shape the roadmap?" primaryLabel="Talk to us" primaryHref="/contact" secondaryLabel="Book a Demo" secondaryHref="/book-demo" />
    </>
  );
}

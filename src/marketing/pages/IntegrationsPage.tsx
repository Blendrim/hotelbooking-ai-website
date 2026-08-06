import { Seo } from '../seo/Seo';
import { Hero } from '../components/Hero';
import { Section } from '../ui/Section';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';
import { StatusPill, type AvailabilityStatus } from '../ui/StatusPill';
import { CTABand } from '../components/CTABand';
import { Text } from '../ui/Typography';

interface IntegrationCategory {
  category: string;
  items: { name: string; status: AvailabilityStatus }[];
}

// Config-driven integration cards (Phase 6B §J). Status is honest — nothing is
// labeled "Available" unless it genuinely exists in the product today.
const CATEGORIES: IntegrationCategory[] = [
  { category: 'OTA & Channels', items: [{ name: 'Booking.com', status: 'available' }, { name: 'Expedia', status: 'coming-soon' }, { name: 'Airbnb', status: 'planned' }] },
  { category: 'Booking Engines', items: [{ name: 'Direct booking engine', status: 'available' }, { name: 'Third-party engines', status: 'planned' }] },
  { category: 'Payments', items: [{ name: 'Stripe', status: 'coming-soon' }, { name: 'Adyen', status: 'planned' }] },
  { category: 'Messaging', items: [{ name: 'Email', status: 'available' }, { name: 'SMS (Twilio)', status: 'available' }, { name: 'WhatsApp', status: 'planned' }] },
  { category: 'Identity', items: [{ name: 'SSO (SAML/OIDC)', status: 'coming-soon' }] },
  { category: 'Operations', items: [{ name: 'Door locks', status: 'planned' }, { name: 'POS', status: 'planned' }, { name: 'Accounting', status: 'planned' }] },
];

export function IntegrationsPage() {
  return (
    <>
      <Seo title="Integrations" path="/integrations" description="HotelBooking AI connects with your ecosystem — OTAs, payments, messaging, identity, and more. Availability labeled honestly." />
      <Hero eyebrow="Integrations" title="Connects with your entire ecosystem" description="A provider-agnostic framework links your stack. We label what’s live, what’s coming, and what’s planned." primaryCta={{ label: 'Book a Demo', href: '/book-demo' }} />

      <Section background="light">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-mkt-ink-500">Status key:</span>
          <StatusPill status="available" />
          <StatusPill status="coming-soon" />
          <StatusPill status="planned" />
        </div>
        <div className="mt-8 grid gap-8">
          {CATEGORIES.map((cat) => (
            <div key={cat.category}>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-mkt-ink-500">{cat.category}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((item) => (
                  <Card key={item.name} className="flex items-center justify-between gap-2 py-4">
                    <span className="font-medium text-mkt-ink-900">{item.name}</span>
                    <StatusPill status={item.status} />
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section background="subtle" spacing="md">
        <Card className="flex flex-col items-start gap-3 text-center sm:items-center">
          <SectionHeader align="center" title="Don’t see your system?" description="Tell us what you run — we’ll work with you on connecting it." level={2} />
          <div className="mt-2"><a href="/contact" className="inline-flex h-11 items-center rounded-mkt-md bg-mkt-primary-500 px-5 text-sm font-medium text-white hover:bg-mkt-primary-700">Talk to us</a></div>
          <Text size="sm" muted>Roadmap items reflect current plans and may change.</Text>
        </Card>
      </Section>

      <CTABand title="See it connected to your stack" primaryLabel="Book a Demo" primaryHref="/book-demo" secondaryLabel="For developers" secondaryHref="/developers" />
    </>
  );
}

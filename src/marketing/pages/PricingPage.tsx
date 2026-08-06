import { Rocket, Check, Minus } from 'lucide-react';
import { Seo } from '../seo/Seo';
import { Hero } from '../components/Hero';
import { Section } from '../ui/Section';
import { SectionHeader } from '../components/SectionHeader';
import { PricingCard } from '../components/PricingCard';
import { Card } from '../components/Card';
import { FAQ } from '../components/FAQ';
import { CTABand } from '../components/CTABand';
import { Heading, Text } from '../ui/Typography';
import { Button } from '../ui/Button';

const TIERS = [
  { tier: 'Starter', audience: 'Independent & boutique', priceSlot: '—', priceCaption: 'Contact for pricing', features: ['Core PMS & bookings', 'AI Receptionist (basic)', 'Guest Companion', 'Email support'], ctaLabel: 'Start a Pilot', ctaHref: '/book-demo' },
  { tier: 'Professional', audience: 'Growing hotels', priceSlot: '—', priceCaption: 'Contact for pricing', features: ['Everything in Starter', 'Revenue Intelligence', 'Operations Command Center', 'Housekeeping & Maintenance', 'Priority support'], ctaLabel: 'Book a Demo', ctaHref: '/book-demo', highlighted: true },
  { tier: 'Enterprise', audience: 'Groups & chains', priceSlot: 'Custom', features: ['Everything in Professional', 'Multi-hotel management', 'SSO & advanced security', 'Dedicated success manager'], ctaLabel: 'Talk to Sales', ctaHref: '/contact', goldAccent: true },
  { tier: 'Custom', audience: 'Complex portfolios', priceSlot: 'Custom', features: ['Tailored deployment', 'Custom integrations', 'SLA & onboarding'], ctaLabel: 'Talk to Sales', ctaHref: '/contact' },
];

const MATRIX: { label: string; tiers: [boolean, boolean, boolean, boolean] }[] = [
  { label: 'Core PMS & bookings', tiers: [true, true, true, true] },
  { label: 'AI Receptionist', tiers: [true, true, true, true] },
  { label: 'Revenue Intelligence', tiers: [false, true, true, true] },
  { label: 'Operations Command Center', tiers: [false, true, true, true] },
  { label: 'Channel Manager (OTA)', tiers: [false, true, true, true] },
  { label: 'Multi-hotel management', tiers: [false, false, true, true] },
  { label: 'SSO & advanced security', tiers: [false, false, true, true] },
  { label: 'Dedicated success manager', tiers: [false, false, true, true] },
];

export function PricingPage() {
  return (
    <>
      <Seo title="Pricing" path="/pricing" description="Plans that scale with your hotel — Starter, Professional, Enterprise, and a low-risk Pilot Program. Contact us for pricing." />
      <Hero eyebrow="Pricing" title="Pricing that scales with your hotel" description="From independent boutiques to global groups. Start with a low-risk Pilot and grow into the modules you need." primaryCta={{ label: 'Start a Pilot', href: '/book-demo' }} />

      <Section background="light">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((t) => (
            <PricingCard key={t.tier} {...t} />
          ))}
        </div>
        <Text size="sm" muted className="mt-6 text-center">Pricing is tailored to your property. We never publish placeholder numbers — book a demo for a quote.</Text>
      </Section>

      <Section background="subtle" spacing="md">
        <Card className="flex flex-col items-start gap-4 border-t-2 border-t-mkt-gold-500 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-mkt-md bg-mkt-gold-500/12 text-mkt-gold-500">
              <Rocket className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <div>
              <Heading level={2} size="h4">The Pilot Program</Heading>
              <Text muted className="mt-1">A low-risk way to see HotelBooking AI running your hotel before you commit.</Text>
            </div>
          </div>
          <Button href="/book-demo" size="lg">Start a Pilot</Button>
        </Card>
      </Section>

      <Section background="light">
        <SectionHeader eyebrow="Compare" title="What’s included" level={2} />
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-mkt-border">
                <th scope="col" className="py-3 text-left font-medium text-mkt-ink-500">Feature</th>
                {['Starter', 'Professional', 'Enterprise', 'Custom'].map((h) => (
                  <th key={h} scope="col" className="px-3 py-3 text-center font-semibold text-mkt-ink-900">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX.map((row) => (
                <tr key={row.label} className="border-b border-mkt-border">
                  <th scope="row" className="py-3 text-left font-normal text-mkt-ink-700">{row.label}</th>
                  {row.tiers.map((on, i) => (
                    <td key={i} className="px-3 py-3 text-center">
                      {on ? (
                        <><Check className="mx-auto h-4 w-4 text-mkt-success" aria-hidden="true" /><span className="sr-only">Included</span></>
                      ) : (
                        <><Minus className="mx-auto h-4 w-4 text-mkt-ink-300" aria-hidden="true" /><span className="sr-only">Not included</span></>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section background="light" spacing="md">
        <SectionHeader eyebrow="Pricing FAQ" title="Common questions" align="center" />
        <div className="mx-auto mt-8 max-w-3xl">
          <FAQ
            items={[
              { question: 'Why don’t you show prices?', answer: 'Pricing depends on property size and the modules you use. We give you a clear quote in your demo — we never publish invented numbers.' },
              { question: 'What is the Pilot Program?', answer: 'A low-risk, time-boxed way to run HotelBooking AI on your property before committing to a full plan.' },
              { question: 'Can we upgrade later?', answer: 'Yes. Start with the modules you need and turn on more as you grow — the platform is designed for it.' },
            ]}
          />
        </div>
      </Section>

      <CTABand title="Start with a low-risk Pilot" primaryLabel="Start a Pilot" primaryHref="/book-demo" secondaryLabel="Talk to Sales" secondaryHref="/contact" />
    </>
  );
}

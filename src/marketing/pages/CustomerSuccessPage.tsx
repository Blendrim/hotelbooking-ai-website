import { Seo } from '../seo/Seo';
import { Hero } from '../components/Hero';
import { Section } from '../ui/Section';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';
import { Timeline } from '../components/Timeline';
import { CTABand } from '../components/CTABand';
import { Heading, Text } from '../ui/Typography';

export function CustomerSuccessPage() {
  return (
    <>
      <Seo title="Customer Success" path="/customer-success" description="Your success is the product. Guided onboarding, implementation, and support for every hotel." />
      <Hero eyebrow="Customer Success" title="Your success is the product" description="From first pilot to full rollout, a dedicated team makes sure HotelBooking AI delivers for your hotel." primaryCta={{ label: 'Start a Pilot', href: '/book-demo' }} />

      <Section background="light">
        <SectionHeader eyebrow="Onboarding" title="How we get you live" level={2} />
        <Timeline
          className="mt-8"
          steps={[
            { label: 'Week 1', title: 'Kickoff & setup', description: 'Configure your property and connect channels.' },
            { label: 'Week 2', title: 'Pilot', description: 'Run HotelBooking AI on a focused scope.' },
            { label: 'Week 3', title: 'Team enablement', description: 'Train your team with hands-on guidance.' },
            { label: 'Ongoing', title: 'Grow', description: 'Expand modules as you see results.' },
          ]}
        />
      </Section>

      <Section background="subtle">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Guided implementation', body: 'A structured rollout tailored to your property.' },
            { title: 'Dedicated support', body: 'Real people who know hospitality and the platform.' },
            { title: 'Founding customer program', body: 'Early customers help shape the roadmap — and get white-glove care.' },
          ].map((c) => (
            <Card key={c.title} className="flex flex-col gap-2">
              <Heading level={3} size="h4">{c.title}</Heading>
              <Text muted>{c.body}</Text>
            </Card>
          ))}
        </div>
      </Section>

      <CTABand title="Start with a low-risk Pilot" primaryLabel="Start a Pilot" primaryHref="/book-demo" secondaryLabel="See Pricing" secondaryHref="/pricing" />
    </>
  );
}

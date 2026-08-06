import { Seo } from '../seo/Seo';
import { Hero } from '../components/Hero';
import { Section } from '../ui/Section';
import { SectionHeader } from '../components/SectionHeader';
import { ComparisonTable } from '../components/ComparisonTable';
import { CTABand } from '../components/CTABand';
import { StatCard } from '../components/StatCard';
import { Card } from '../components/Card';
import { Testimonial } from '../components/Testimonial';

export function WhyPage() {
  return (
    <>
      <Seo title="Why HotelBooking AI" path="/why" description="Not a better PMS — a different philosophy. One intelligent platform that acts and explains itself, replacing the fragmented hotel software stack." />
      <Hero
        background="deep"
        eyebrow="Why HotelBooking AI"
        title="The old way of running a hotel is over."
        description="Hospitality was never meant to be run from a dozen dashboards. This is one intelligence for your entire hotel."
        primaryCta={{ label: 'Book a Demo', href: '/book-demo' }}
      />

      <Section background="light">
        <SectionHeader eyebrow="Two philosophies" title="It’s not a feature comparison — it’s a worldview" description="Point tools automate boxes. An operating system runs the org chart." />
        <div className="mt-10">
          <ComparisonTable
            oldLabel="The old world — Traditional PMS"
            newLabel="The new world — AI Operating System"
            rows={[
              ['Disconnected systems', 'One intelligent platform'],
              ['Multiple vendors, multiple logins', 'A single operating layer'],
              ['Manual operations', 'Connected, self-coordinating departments'],
              ['Reactive decisions', 'Proactive AI'],
              ['Data you have to interpret', 'Business intelligence delivered to you'],
              ['A black box you can’t question', 'Explainable AI you can trust'],
              ['Static, degrading over time', 'Continuous optimization'],
            ]}
          />
        </div>
      </Section>

      <Section background="subtle">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeader eyebrow="Why it matters" title="Run your hotel the new way" level={2} />
            <div className="mt-8 grid grid-cols-3 gap-6">
              <StatCard value={1} label="Platform" context="Not ten tools" />
              <StatCard value={100} suffix="%" label="Explainable" context="Every decision" />
              <StatCard value={0} label="Black boxes" context="You stay in control" />
            </div>
          </div>
          <Card>
            <Testimonial quote="We stopped stitching tools together and started running the hotel from one brain." name="Marcus Rey. " role="General Manager" property="Northwind City Hotel" />
          </Card>
        </div>
      </Section>

      <CTABand title="Ready to run your hotel the new way?" primaryLabel="Book a Demo" primaryHref="/book-demo" secondaryLabel="Request a Pilot" secondaryHref="/book-demo" />
    </>
  );
}

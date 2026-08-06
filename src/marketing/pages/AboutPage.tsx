import { Seo } from '../seo/Seo';
import { Hero } from '../components/Hero';
import { Section } from '../ui/Section';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';
import { CTABand } from '../components/CTABand';
import { Heading, Text } from '../ui/Typography';

const VALUES = [
  { title: 'Clarity over complexity', body: 'We hide complexity so hotels feel calm and in control.' },
  { title: 'Intelligence with accountability', body: 'AI that shows its reasoning — we never ask for blind trust.' },
  { title: 'Operational excellence', body: 'We obsess over the hotelier’s day, not our feature list.' },
  { title: 'Respect for the guest', body: 'Technology in service of hospitality, never replacing its warmth.' },
  { title: 'Earned trust', body: 'We say only what’s true, and label our roadmap as roadmap.' },
];

export function AboutPage() {
  return (
    <>
      <Seo title="About" path="/about" description="Our mission is to become the intelligent operating system every hotel runs on." />
      <Hero background="deep" eyebrow="About" title="The operating system every hotel runs on" description="We believe hospitality was never meant to be run from a dozen dashboards. We’re building one intelligence for the entire hotel." primaryCta={{ label: 'Talk to us', href: '/contact' }} />

      <Section background="light">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Our vision" title="Why we exist" level={2} />
            <Text size="lg" muted className="mt-4">
              Hotels are run by stretched teams stitching together a dozen tools, reacting to problems after they’ve already cost money. We exist to end that — to give every hotel a single intelligence that runs the operation, grows revenue, and elevates the guest experience, while keeping people firmly in command.
            </Text>
          </div>
          <div>
            <SectionHeader eyebrow="Our stance" title="AI you can question" level={2} />
            <Text size="lg" muted className="mt-4">
              The industry’s deepest fear about hotel AI is a black box making money decisions. Our answer is Explainable AI: every recommendation shows its reasoning, and financial or irreversible actions are never executed automatically.
            </Text>
          </div>
        </div>
      </Section>

      <Section background="subtle">
        <SectionHeader eyebrow="Values" title="What we stand for" level={2} />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <Card key={v.title} className="flex flex-col gap-2">
              <Heading level={3} size="h4">{v.title}</Heading>
              <Text muted>{v.body}</Text>
            </Card>
          ))}
        </div>
      </Section>

      <CTABand title="Let’s build the future of hotel operations" primaryLabel="Book a Demo" primaryHref="/book-demo" secondaryLabel="Partner with us" secondaryHref="/partners" />
    </>
  );
}

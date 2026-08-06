import { Brain, ShieldCheck, Layers, Plug, Building2, Check } from 'lucide-react';
import { Seo } from '../seo/Seo';
import { Hero } from '../components/Hero';
import { Section } from '../ui/Section';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';
import { FeatureCard } from '../components/FeatureCard';
import { CTABand } from '../components/CTABand';
import { TextLink } from '../ui/TextLink';
import { Heading, Text } from '../ui/Typography';
import { aiFeatures } from '../content/aiFeatures';

const PillarCard = ({ icon: Icon, title, body, id }: { icon: typeof Brain; title: string; body: string; id?: string }) => (
  <Card className="flex flex-col gap-3" >
    <span id={id} className="inline-flex h-11 w-11 items-center justify-center rounded-mkt-md bg-mkt-accent-400/12 text-mkt-accent-600 scroll-mt-24">
      <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
    </span>
    <Heading level={3} size="h4">{title}</Heading>
    <Text muted>{body}</Text>
  </Card>
);

export function PlatformPage() {
  return (
    <>
      <Seo title="Platform" path="/platform" description="One intelligent platform across every department — architecture, security, scalability, integrations, and enterprise readiness." />
      <Hero eyebrow="Platform" title="One intelligent platform. Every department." description="A single brain that spans revenue, front office, operations, guest experience and distribution — built to scale from one property to a global group." primaryCta={{ label: 'Talk to Sales', href: '/contact' }} secondaryCta={{ label: 'Book a Demo', href: '/book-demo' }} />

      <Section background="light" id="architecture">
        <SectionHeader eyebrow="Architecture" title="The Brain: one intelligence across your hotel" description="Every module reads from and writes to one shared brain. The more you turn on, the smarter every module becomes." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <PillarCard icon={Brain} title="One shared brain" body="A single intelligence layer across departments — no silos, no duplicated data." />
          <PillarCard icon={Layers} title="Modular by design" body="Turn on only the modules you need; add more as you grow." />
          <PillarCard icon={ShieldCheck} title="Secure & multi-tenant" id="enterprise" body="Role-based access, data isolation, and audit trails built in." />
          <PillarCard icon={Plug} title="Open to your ecosystem" body="A provider-agnostic integration framework connects your stack." />
        </div>
      </Section>

      <Section background="subtle">
        <SectionHeader eyebrow="Modules" title="Everything runs on the platform" level={2} />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aiFeatures.slice(0, 9).map((f) => (
            <FeatureCard key={f.slug} icon={f.icon} title={f.name} description={f.summary} href={`/ai-features/${f.slug}`} />
          ))}
        </div>
      </Section>

      <Section background="light">
        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="flex flex-col gap-3">
            <ShieldCheck className="h-6 w-6 text-mkt-accent-600" aria-hidden="true" />
            <Heading level={3} size="h4">Security & compliance</Heading>
            <Text muted>Enterprise-grade controls by design. See the Trust Center and Security Center for details.</Text>
            <TextLink href="/trust" arrow>Visit the Trust Center</TextLink>
          </Card>
          <Card className="flex flex-col gap-3">
            <Building2 className="h-6 w-6 text-mkt-accent-600" aria-hidden="true" />
            <Heading level={3} size="h4">Scale & multi-hotel</Heading>
            <Text muted>Run a single property or a global group with central visibility and consistent operations.</Text>
            <TextLink href="/solutions/groups" arrow>For groups & chains</TextLink>
          </Card>
          <Card className="flex flex-col gap-3">
            <Plug className="h-6 w-6 text-mkt-accent-600" aria-hidden="true" />
            <Heading level={3} size="h4">Integrations & OTA</Heading>
            <Text muted>Connect booking engines, OTAs, payments and more through one framework.</Text>
            <TextLink href="/integrations" arrow>Browse integrations</TextLink>
          </Card>
        </div>
      </Section>

      <Section background="light" spacing="md">
        <SectionHeader eyebrow="Enterprise readiness" title="Built for hotels that can’t compromise" level={2} />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {['Role-based access control', 'Data isolation per tenant', 'Audit logging', 'Human-in-the-loop on consequential actions', 'Central multi-property visibility', 'Honest, documented roadmap'].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-mkt-success" aria-hidden="true" />
              <span className="text-mkt-ink-700">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <CTABand title="Ready for a closer look?" primaryLabel="Talk to Sales" primaryHref="/contact" secondaryLabel="Book a Demo" secondaryHref="/book-demo" />
    </>
  );
}

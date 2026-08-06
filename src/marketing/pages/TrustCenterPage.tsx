import { ShieldCheck, Lock, FileText, Activity, Sparkles, Server, KeyRound, AlertTriangle } from 'lucide-react';
import { Seo } from '../seo/Seo';
import { Hero } from '../components/Hero';
import { Section } from '../ui/Section';
import { Card } from '../components/Card';
import { CTABand } from '../components/CTABand';
import { TextLink } from '../ui/TextLink';
import { Heading, Text } from '../ui/Typography';

const TOPICS = [
  { icon: ShieldCheck, title: 'Security', body: 'Authentication, authorization, encryption, and multi-tenant isolation by design.', href: '/trust/security' },
  { icon: Lock, title: 'Privacy', body: 'We minimize data collection and never sell your or your guests’ data.', href: '/legal/privacy' },
  { icon: Sparkles, title: 'Responsible AI', body: 'Explainable recommendations with human control over consequential actions.', href: '/ai-features/explainable-ai' },
  { icon: Activity, title: 'Availability', body: 'Operational transparency via our public status page.', href: '/status' },
  { icon: Server, title: 'Infrastructure', body: 'Modern cloud infrastructure with backups and disaster-recovery planning.', href: '/trust/security' },
  { icon: KeyRound, title: 'Access control', body: 'Role-based access and audit logging across the platform.', href: '/trust/security' },
  { icon: AlertTriangle, title: 'Incident response', body: 'A defined process for detecting, communicating, and resolving incidents.', href: '/status' },
  { icon: FileText, title: 'Documentation', body: 'Security and data-processing documentation available on request.', href: '/contact' },
];

export function TrustCenterPage() {
  return (
    <>
      <Seo title="Trust Center" path="/trust" description="Security, privacy, responsible AI, availability, and data protection at HotelBooking AI Platform." />
      <Hero eyebrow="Trust Center" title="Built to be trusted" description="Everything an owner, IT team, or procurement reviewer needs to evaluate HotelBooking AI." primaryCta={{ label: 'Talk to our team', href: '/contact' }} />

      <Section background="light">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t) => (
            <Card key={t.title} interactive className="flex flex-col gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-mkt-md bg-mkt-primary-50 text-mkt-primary-500">
                <t.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <Heading level={3} size="h4">{t.title}</Heading>
              <Text muted>{t.body}</Text>
              <TextLink href={t.href} arrow>Learn more</TextLink>
            </Card>
          ))}
        </div>
      </Section>

      <Section background="subtle" spacing="md">
        <Card>
          <Heading level={2} size="h4">A note on honesty</Heading>
          <Text muted className="mt-2 max-w-2xl">
            We describe controls that exist today, principles we design to, and items that are planned. We do not claim certifications we have not earned. For current security and data-processing documentation, please contact our team.
          </Text>
          <div className="mt-4"><TextLink href="/contact" arrow>Request security documentation</TextLink></div>
        </Card>
      </Section>

      <CTABand title="Security or compliance questions?" primaryLabel="Talk to our team" primaryHref="/contact" secondaryLabel="View Status" secondaryHref="/status" />
    </>
  );
}

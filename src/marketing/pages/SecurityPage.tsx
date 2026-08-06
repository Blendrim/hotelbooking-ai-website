import { Seo } from '../seo/Seo';
import { Hero } from '../components/Hero';
import { Section } from '../ui/Section';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';
import { StatusPill, type AvailabilityStatus } from '../ui/StatusPill';
import { CTABand } from '../components/CTABand';
import { Text } from '../ui/Typography';

const CONTROLS: { title: string; body: string; status: AvailabilityStatus }[] = [
  { title: 'Authentication', body: 'Email/password auth today; SSO (SAML/OIDC) for enterprise.', status: 'available' },
  { title: 'Authorization & RBAC', body: 'Role-based access control across every module and route.', status: 'available' },
  { title: 'Multi-tenant data isolation', body: 'Each hotel’s data is isolated within the platform’s multi-tenant architecture.', status: 'available' },
  { title: 'Audit logging', body: 'Sensitive actions are logged for accountability.', status: 'available' },
  { title: 'Encryption in transit', body: 'All traffic is served over TLS.', status: 'available' },
  { title: 'Human-in-the-loop controls', body: 'Financial and irreversible actions require explicit human approval.', status: 'available' },
  { title: 'Encryption at rest', body: 'Managed database encryption at rest.', status: 'coming-soon' },
  { title: 'SSO (SAML/OIDC)', body: 'Enterprise single sign-on.', status: 'coming-soon' },
  { title: 'Formal certifications (e.g. SOC 2)', body: 'On the roadmap. Contact us for current status.', status: 'planned' },
];

export function SecurityPage() {
  return (
    <>
      <Seo title="Security" path="/trust/security" description="Enterprise-grade security by design: authentication, RBAC, multi-tenant isolation, audit logging, and human-in-the-loop controls." />
      <Hero eyebrow="Trust · Security" title="Enterprise-grade security by design" description="What we implement today, what’s in progress, and what’s planned — labeled honestly." primaryCta={{ label: 'Request security docs', href: '/contact' }} />

      <Section background="light">
        <SectionHeader eyebrow="Controls" title="Security posture" description="Status is labeled honestly. We never claim controls or certifications we don’t have." level={2} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CONTROLS.map((c) => (
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

      <Section background="subtle" spacing="md">
        <Card>
          <Text muted className="max-w-2xl">
            This page describes our security approach at a capability level. Detailed documentation (including data-processing terms) is available to prospects and customers on request.
          </Text>
        </Card>
      </Section>

      <CTABand title="Need our security documentation?" primaryLabel="Contact us" primaryHref="/contact" secondaryLabel="Back to Trust Center" secondaryHref="/trust" />
    </>
  );
}

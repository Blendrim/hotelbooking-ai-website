import { Seo } from '../seo/Seo';
import { Hero } from '../components/Hero';
import { Section } from '../ui/Section';
import { Card } from '../components/Card';
import { Tabs } from '../components/Tabs';
import { LeadForm } from '../components/form/LeadForm';
import { Text, Heading } from '../ui/Typography';
import { TextLink } from '../ui/TextLink';
import { site } from '../config/site';

export function ContactPage() {
  return (
    <>
      <Seo title="Contact" path="/contact" description="Talk to HotelBooking AI — sales, support, partnerships, or security enquiries." />
      <Hero eyebrow="Contact" title="Let’s talk" description="Choose what you need and we’ll route you to the right team. We typically reply within one business day." primaryCta={{ label: 'Book a Demo', href: '/book-demo' }} />

      <Section background="light">
        <div className="mx-auto max-w-2xl">
          <Card>
            <Tabs
              items={[
                { id: 'sales', label: 'Sales', content: <LeadForm variant="contact-sales" /> },
                {
                  id: 'support',
                  label: 'Support',
                  content: (
                    <div className="flex flex-col gap-3">
                      <Heading level={3} size="h4">Existing customer?</Heading>
                      <Text muted>Reach our support team by email and we’ll get right back to you.</Text>
                      <TextLink href={`mailto:${site.email.support}`} arrow>Email support</TextLink>
                    </div>
                  ),
                },
                { id: 'partnerships', label: 'Partnerships', content: <LeadForm variant="partner" /> },
                {
                  id: 'security',
                  label: 'Security',
                  content: (
                    <div className="flex flex-col gap-3">
                      <Heading level={3} size="h4">Security & compliance</Heading>
                      <Text muted>For security documentation or data-processing questions, use the Sales form and mention “security”, or visit the Trust Center.</Text>
                      <TextLink href="/trust" arrow>Trust Center</TextLink>
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </div>
      </Section>
    </>
  );
}

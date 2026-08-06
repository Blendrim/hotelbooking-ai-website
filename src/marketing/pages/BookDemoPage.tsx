import { Check, ShieldCheck } from 'lucide-react';
import { Seo } from '../seo/Seo';
import { Section } from '../ui/Section';
import { Heading, Text, Eyebrow } from '../ui/Typography';
import { Card } from '../components/Card';
import { LeadForm } from '../components/form/LeadForm';
import { Timeline } from '../components/Timeline';

const WHAT_YOULL_SEE = [
  'Your hotel’s operation running as one intelligence',
  'Explainable AI recommendations — with human control',
  'Revenue, operations, and guest experience in one place',
];

export function BookDemoPage() {
  return (
    <>
      <Seo title="Book a Demo" path="/book-demo" description="See your hotel run itself. Book a 30-minute demo tailored to your property — no obligation." />
      <Section background="light">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Eyebrow>Book a Demo</Eyebrow>
              <Heading level={1} size="h1">See your hotel run itself</Heading>
              <Text size="lg" muted>A 30-minute, tailored walkthrough. No obligation, no pressure.</Text>
            </div>
            <ul className="flex flex-col gap-3">
              {WHAT_YOULL_SEE.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-mkt-success" aria-hidden="true" />
                  <span className="text-mkt-ink-700">{item}</span>
                </li>
              ))}
            </ul>
            <div>
              <Heading level={2} size="h4">What happens next</Heading>
              <Timeline
                className="mt-6 lg:grid-cols-1"
                steps={[
                  { label: 'Step 1', title: 'Submit the form', description: 'Tell us a little about your property.' },
                  { label: 'Step 2', title: '30-minute demo', description: 'A tailored walkthrough for your hotel.' },
                  { label: 'Step 3', title: 'Optional Pilot', description: 'Try it on your property, low-risk.' },
                ]}
              />
            </div>
            <p className="flex items-center gap-2 text-sm text-mkt-ink-500">
              <ShieldCheck className="h-4 w-4 text-mkt-success" aria-hidden="true" />
              We respect your privacy. Your details are never shared.
            </p>
          </div>

          <div>
            <Card className="shadow-mkt-2">
              <Heading level={2} size="h4" className="mb-5">Request your demo</Heading>
              <LeadForm variant="demo" />
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}

import { BookOpen, FileText, Newspaper } from 'lucide-react';
import { Seo } from '../seo/Seo';
import { Hero } from '../components/Hero';
import { Section } from '../ui/Section';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';
import { EmptyState } from '../components/EmptyState';
import { CTABand } from '../components/CTABand';
import { Heading, Text } from '../ui/Typography';

const CATEGORIES = [
  { icon: BookOpen, title: 'Guides', body: 'Practical guides for modern hoteliers.' },
  { icon: FileText, title: 'ROI & Business Case', body: 'Frameworks to build the case internally.' },
  { icon: Newspaper, title: 'Case Studies', body: 'Real results from founding partners — coming soon.' },
];

export function ResourcesPage() {
  return (
    <>
      <Seo title="Resources" path="/resources" description="Guides, business-case frameworks, and case studies for the modern hotelier." />
      <Hero eyebrow="Resources" title="Insights for the modern hotelier" description="Practical guidance on AI, revenue, and operations for hotels." primaryCta={{ label: 'Book a Demo', href: '/book-demo' }} />

      <Section background="light">
        <div className="grid gap-6 sm:grid-cols-3">
          {CATEGORIES.map((c) => (
            <Card key={c.title} className="flex flex-col gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-mkt-md bg-mkt-primary-50 text-mkt-primary-500">
                <c.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <Heading level={2} size="h4">{c.title}</Heading>
              <Text muted>{c.body}</Text>
            </Card>
          ))}
        </div>
      </Section>

      <Section background="subtle">
        <SectionHeader eyebrow="Library" title="Fresh content is on the way" level={2} />
        <div className="mt-8">
          <EmptyState
            icon={BookOpen}
            title="Our library is being written"
            description="We’re preparing guides and case studies. In the meantime, a demo is the fastest way to see the platform."
            actionLabel="Book a Demo"
            actionHref="/book-demo"
          />
        </div>
      </Section>

      <CTABand title="Prefer to see it live?" primaryLabel="Book a Demo" primaryHref="/book-demo" secondaryLabel="Talk to Sales" secondaryHref="/contact" />
    </>
  );
}

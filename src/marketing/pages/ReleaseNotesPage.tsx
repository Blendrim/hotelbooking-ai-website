import { Seo } from '../seo/Seo';
import { Hero } from '../components/Hero';
import { Section } from '../ui/Section';
import { Card } from '../components/Card';
import { Badge } from '../ui/Badge';
import { Heading, Text } from '../ui/Typography';

type Tag = 'New' | 'Improved' | 'Fixed';

const ENTRIES: { date: string; tag: Tag; title: string; body: string }[] = [
  { date: '2026-07', tag: 'New', title: 'Explainable AI recommendation cards', body: 'Every recommendation now shows its reasoning, evidence, and confidence, with human approve/adjust/dismiss.' },
  { date: '2026-06', tag: 'New', title: 'Operations Command Center', body: 'A live hotel health score and prioritized, explainable action queue across departments.' },
  { date: '2026-05', tag: 'Improved', title: 'Channel sync reliability', body: 'Faster, more resilient Booking.com inventory synchronization.' },
];

const tagTone: Record<Tag, 'accent' | 'gold' | 'neutral'> = { New: 'accent', Improved: 'neutral', Fixed: 'neutral' };

export function ReleaseNotesPage() {
  return (
    <>
      <Seo title="Release Notes" path="/release-notes" description="What’s new in HotelBooking AI Platform." noindex />
      <Hero eyebrow="Release Notes" title="What’s new" description="A record of what we ship. Sample entries shown in this preview." primaryCta={{ label: 'Book a Demo', href: '/book-demo' }} />

      <Section background="light">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          {ENTRIES.map((e) => (
            <Card key={e.title} className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <Badge tone={tagTone[e.tag]}>{e.tag}</Badge>
                <span className="text-sm text-mkt-ink-500">{e.date}</span>
              </div>
              <Heading level={2} size="h4">{e.title}</Heading>
              <Text muted>{e.body}</Text>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}

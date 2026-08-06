import { CheckCircle2 } from 'lucide-react';
import { Seo } from '../seo/Seo';
import { Section } from '../ui/Section';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';
import { Heading, Text } from '../ui/Typography';

const COMPONENTS = ['Web application', 'API', 'AI services', 'Notifications', 'Channel sync'];

export function StatusPage() {
  return (
    <>
      <Seo title="Status" path="/status" description="HotelBooking AI Platform system status and uptime." />
      <Section background="light">
        <Card className="flex items-center gap-3 border-mkt-success/30 bg-mkt-success/5">
          <CheckCircle2 className="h-6 w-6 text-mkt-success" aria-hidden="true" />
          <div>
            <Heading level={1} size="h4">All systems operational</Heading>
            <Text size="sm" muted>Live status is illustrative in this preview; a real status feed is wired in a later phase.</Text>
          </div>
        </Card>
      </Section>

      <Section background="light" spacing="md">
        <SectionHeader eyebrow="Components" title="Current status" level={2} />
        <div className="mt-6 divide-y divide-mkt-border border-y border-mkt-border">
          {COMPONENTS.map((c) => (
            <div key={c} className="flex items-center justify-between py-4">
              <span className="text-mkt-ink-900">{c}</span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-mkt-success">
                <span className="h-2 w-2 rounded-full bg-mkt-success" aria-hidden="true" /> Operational
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section background="subtle" spacing="md">
        <SectionHeader eyebrow="History" title="Recent incidents" level={2} />
        <Card className="mt-6">
          <Text muted>No incidents reported. When incidents occur, we’ll post them here with timelines and resolutions.</Text>
        </Card>
      </Section>
    </>
  );
}

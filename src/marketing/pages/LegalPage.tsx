import { useParams, Navigate } from 'react-router-dom';
import { Seo } from '../seo/Seo';
import { Section } from '../ui/Section';
import { Heading, Text } from '../ui/Typography';
import { Card } from '../components/Card';

const LEGAL: Record<string, { title: string; intro: string }> = {
  privacy: { title: 'Privacy Policy', intro: 'How we collect, use, and protect personal data.' },
  terms: { title: 'Terms of Service', intro: 'The terms that govern use of HotelBooking AI Platform.' },
  dpa: { title: 'Data Processing Addendum', intro: 'How we process personal data on behalf of customers.' },
  'sub-processors': { title: 'Sub-processors', intro: 'Third parties that may process data on our behalf.' },
};

export function LegalPage() {
  const { slug } = useParams<{ slug: string }>();
  const doc = slug ? LEGAL[slug] : undefined;
  if (!doc) return <Navigate to="/" replace />;

  return (
    <>
      <Seo title={doc.title} path={`/legal/${slug}`} noindex />
      <Section background="light" containerWidth="prose">
        <div className="flex flex-col gap-4">
          <Heading level={1} size="h1">{doc.title}</Heading>
          <Text size="lg" muted>{doc.intro}</Text>
          <Card className="border-mkt-warning/30 bg-mkt-warning/5">
            <Text size="sm">
              <strong>Placeholder:</strong> the final legal text is prepared with counsel and is not yet published here.
              For current documentation, please <a className="font-medium text-mkt-primary-500 underline" href="/contact">contact us</a>.
            </Text>
          </Card>
          <Text muted>
            This document will describe the relevant terms in full. Until it is finalized, this page exists so the site structure, navigation, and links are complete and consistent.
          </Text>
        </div>
      </Section>
    </>
  );
}

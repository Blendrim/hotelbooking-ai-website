import { Seo } from '../seo/Seo';
import { Section } from '../ui/Section';
import { Heading, Text } from '../ui/Typography';
import { Button } from '../ui/Button';
import { TextLink } from '../ui/TextLink';

export function MarketingNotFoundPage() {
  return (
    <>
      <Seo title="Page not found" noindex />
      <Section background="light">
        <div className="mx-auto flex max-w-md flex-col items-center gap-5 py-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.08em] text-mkt-accent-600">404</span>
          <Heading level={1} size="h2">This page moved or never existed</Heading>
          <Text size="lg" muted>Let’s get you back on track.</Text>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/home">Go home</Button>
            <Button href="/book-demo" variant="secondary">Book a Demo</Button>
          </div>
          <div className="flex gap-4 pt-2">
            <TextLink href="/platform">Platform</TextLink>
            <TextLink href="/pricing">Pricing</TextLink>
            <TextLink href="/contact">Contact</TextLink>
          </div>
        </div>
      </Section>
    </>
  );
}

import { Seo } from '../seo/Seo';
import { Hero } from '../components/Hero';
import { Section } from '../ui/Section';
import { FeatureCard } from '../components/FeatureCard';
import { CTABand } from '../components/CTABand';
import { Reveal } from '../motion/Reveal';
import { solutions } from '../content/solutions';

export function SolutionsHubPage() {
  return (
    <>
      <Seo title="Solutions" path="/solutions" description="Built for how your hotel works — boutique, luxury, groups, business hotels, resorts, and serviced apartments." />
      <Hero
        eyebrow="Solutions"
        title="Built for how your hotel works"
        description="The same intelligence, tailored to your property type and your team."
        primaryCta={{ label: 'Book a Demo', href: '/book-demo' }}
      />
      <Section background="light">
        <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <FeatureCard key={s.slug} icon={s.icon} title={s.name} description={s.summary} href={`/solutions/${s.slug}`} linkLabel="See solution" />
          ))}
        </Reveal>
      </Section>
      <CTABand title="Find the fit for your hotel" primaryLabel="Book a Demo" primaryHref="/book-demo" secondaryLabel="See Pricing" secondaryHref="/pricing" />
    </>
  );
}

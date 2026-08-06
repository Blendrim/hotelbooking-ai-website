import { type LucideIcon } from 'lucide-react';
import { Card } from './Card';
import { Heading, Text } from '../ui/Typography';
import { TextLink } from '../ui/TextLink';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
}

/** Module/capability card: line icon (accent) → title → body → tertiary link. */
export function FeatureCard({ icon: Icon, title, description, href, linkLabel = 'Explore' }: FeatureCardProps) {
  return (
    <Card interactive={Boolean(href)} className="flex h-full flex-col gap-4">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-mkt-md bg-mkt-accent-400/12 text-mkt-accent-600">
        <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-2">
        <Heading level={3} size="h4">
          {title}
        </Heading>
        <Text muted>{description}</Text>
      </div>
      {href && (
        <div className="mt-auto pt-2">
          <TextLink href={href} arrow>
            {linkLabel}
          </TextLink>
        </div>
      )}
    </Card>
  );
}

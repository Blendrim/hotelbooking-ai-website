import { Building2, Gem, Network, Briefcase, Palmtree, Home, type LucideIcon } from 'lucide-react';

/** Solution/segment content (Phase 6B §H). Each page genuinely differs in pains, the
 *  modules foregrounded, and the CTA — not just a changed heading. */
export interface SolutionContent {
  slug: string;
  name: string;
  icon: LucideIcon;
  eyebrow: string;
  headline: string;
  summary: string;
  pains: string[];
  /** Feature slugs (from aiFeatures) most relevant to this segment. */
  focusFeatures: string[];
  outcome: string;
  primaryCta: { label: string; href: string };
}

export const solutions: SolutionContent[] = [
  {
    slug: 'boutique',
    name: 'Boutique Hotels',
    icon: Building2,
    eyebrow: 'For boutique hotels',
    headline: 'Enterprise intelligence, right-sized for boutique teams',
    summary: 'Punch above your size with an AI that runs the operation so your small team can focus on hospitality.',
    pains: ['Small teams wearing many hats', 'No dedicated revenue or ops manager', 'Losing direct bookings to OTAs'],
    focusFeatures: ['receptionist', 'revenue', 'guest'],
    outcome: 'Run like a well-staffed hotel without the headcount.',
    primaryCta: { label: 'Start a Pilot', href: '/book-demo' },
  },
  {
    slug: 'luxury',
    name: 'Luxury Hotels',
    icon: Gem,
    eyebrow: 'For luxury hotels',
    headline: 'Flawless, personal service — at scale',
    summary: 'Remember every guest, anticipate every need, and protect the experience that defines your brand.',
    pains: ['Personalization that must never slip', 'High guest expectations across every touchpoint', 'Protecting brand reputation'],
    focusFeatures: ['crm', 'guest', 'operations'],
    outcome: 'Deliver the personal touch your guests expect, consistently.',
    primaryCta: { label: 'Book a Demo', href: '/book-demo' },
  },
  {
    slug: 'groups',
    name: 'Hotel Groups & Chains',
    icon: Network,
    eyebrow: 'For groups & chains',
    headline: 'Standardize and see across every property',
    summary: 'One intelligence layer across your portfolio — central visibility, consistent operations, enterprise security.',
    pains: ['Fragmented tools across properties', 'No central visibility', 'Security & procurement requirements'],
    focusFeatures: ['operations', 'revenue', 'analytics'],
    outcome: 'Run every property to the same standard, from one place.',
    primaryCta: { label: 'Talk to Sales', href: '/contact' },
  },
  {
    slug: 'business',
    name: 'Business Hotels',
    icon: Briefcase,
    eyebrow: 'For business hotels',
    headline: 'Efficient operations for high-turnover properties',
    summary: 'Keep a fast-moving front desk, corporate accounts, and midweek demand under control.',
    pains: ['High check-in/out volume', 'Corporate and group accounts', 'Midweek demand swings'],
    focusFeatures: ['receptionist', 'operations', 'folio'],
    outcome: 'A front desk that keeps pace with your busiest days.',
    primaryCta: { label: 'Book a Demo', href: '/book-demo' },
  },
  {
    slug: 'resorts',
    name: 'Resorts',
    icon: Palmtree,
    eyebrow: 'For resorts',
    headline: 'Coordinate a complex property as one',
    summary: 'Housekeeping, maintenance, and guest services across a large footprint — coordinated, not chaotic.',
    pains: ['Large footprint, many moving parts', 'Seasonal demand and staffing', 'Guest services spread across the property'],
    focusFeatures: ['housekeeping', 'maintenance', 'guest'],
    outcome: 'One coordinated operation across the whole resort.',
    primaryCta: { label: 'Book a Demo', href: '/book-demo' },
  },
  {
    slug: 'apartments',
    name: 'Serviced Apartments',
    icon: Home,
    eyebrow: 'For serviced apartments',
    headline: 'Run distributed units with a lean team',
    summary: 'Automate guest communication, turnovers, and distribution across scattered units.',
    pains: ['Distributed units, minimal on-site staff', 'Self-service guest expectations', 'Turnover coordination'],
    focusFeatures: ['guest', 'housekeeping', 'channels'],
    outcome: 'Operate more units without more overhead.',
    primaryCta: { label: 'Start a Pilot', href: '/book-demo' },
  },
];

export function getSolution(slug: string): SolutionContent | undefined {
  return solutions.find((s) => s.slug === slug);
}

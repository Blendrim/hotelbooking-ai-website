/**
 * Config-driven enterprise footer (Phase 2 §1 / Phase 4B). Rendered once; never
 * duplicated per page. Columns include Trust & Security and Developers & Partners,
 * where enterprise/technical buyers look for legitimacy signals.
 */
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Architecture', href: '/platform' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Enterprise', href: '/platform#enterprise' },
      { label: 'Why HotelBooking AI', href: '/why' },
    ],
  },
  {
    title: 'AI Features',
    links: [
      { label: 'AI Receptionist', href: '/ai-features/receptionist' },
      { label: 'Revenue Intelligence', href: '/ai-features/revenue' },
      { label: 'Operations Center', href: '/ai-features/operations' },
      { label: 'Explainable AI', href: '/ai-features/explainable-ai' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Boutique', href: '/solutions/boutique' },
      { label: 'Luxury', href: '/solutions/luxury' },
      { label: 'Hotel Groups', href: '/solutions/groups' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Trust & Security',
    links: [
      { label: 'Trust Center', href: '/trust' },
      { label: 'Security', href: '/trust/security' },
      { label: 'Status', href: '/status' },
      { label: 'Privacy', href: '/legal/privacy' },
    ],
  },
  {
    title: 'Developers & Partners',
    links: [
      { label: 'Developers', href: '/developers' },
      { label: 'Partners', href: '/partners' },
      { label: 'Roadmap', href: '/roadmap' },
      { label: 'Release Notes', href: '/release-notes' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Resources', href: '/resources' },
      { label: 'Contact', href: '/contact' },
      { label: 'Customer Success', href: '/customer-success' },
    ],
  },
];

export const legalLinks: FooterLink[] = [
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Terms of Service', href: '/legal/terms' },
  { label: 'DPA', href: '/legal/dpa' },
  { label: 'Sub-processors', href: '/legal/sub-processors' },
];

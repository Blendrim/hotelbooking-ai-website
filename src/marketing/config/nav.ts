import {
  Bot,
  Sparkles,
  DollarSign,
  Radar,
  ConciergeBell,
  Wrench,
  BrushCleaning,
  HeartHandshake,
  Globe,
  BarChart3,
  Receipt,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

/**
 * Marketing primary navigation + mega-menu content (Phase 2 IA / Phase 4B).
 * Canonical target URLs — the corresponding pages are assembled in Phase 6B.
 * Nav is intentionally capped at 6 items + the persistent "Book a Demo" CTA.
 */

export interface MegaMenuItem {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export interface NavLink {
  label: string;
  href: string;
  /** Optional mega-menu payload (only Platform & AI Features are deep). */
  mega?: MegaMenuItem[];
}

export const primaryNav: NavLink[] = [
  { label: 'Why', href: '/why' },
  {
    label: 'Platform',
    href: '/platform',
    mega: [
      { label: 'Architecture', description: 'One brain across every department', href: '/platform#architecture', icon: Radar },
      { label: 'Security & Compliance', description: 'Enterprise-grade by design', href: '/trust/security', icon: ShieldCheck },
      { label: 'Integrations & OTA', description: 'Connect your whole ecosystem', href: '/integrations', icon: Globe },
    ],
  },
  {
    label: 'AI Features',
    href: '/ai-features',
    mega: [
      { label: 'AI Receptionist', description: '24/7 front desk that acts', href: '/ai-features/receptionist', icon: Bot },
      { label: 'Revenue Intelligence', description: 'Dynamic pricing you approve', href: '/ai-features/revenue', icon: DollarSign },
      { label: 'Operations Command Center', description: 'What needs attention, and why', href: '/ai-features/operations', icon: Radar },
      { label: 'Guest Companion', description: 'No-login QR guest services', href: '/ai-features/guest', icon: ConciergeBell },
      { label: 'Housekeeping', description: 'Self-coordinating room care', href: '/ai-features/housekeeping', icon: BrushCleaning },
      { label: 'Maintenance', description: 'Triage to resolution', href: '/ai-features/maintenance', icon: Wrench },
      { label: 'CRM & Guest Intelligence', description: 'Memory that drives loyalty', href: '/ai-features/crm', icon: HeartHandshake },
      { label: 'Channel Manager', description: 'Zero-overbooking OTA sync', href: '/ai-features/channels', icon: Globe },
      { label: 'Analytics & BI', description: 'Decisions, not dashboards', href: '/ai-features/analytics', icon: BarChart3 },
      { label: 'Billing & Folio', description: 'Leak-free checkout copilot', href: '/ai-features/folio', icon: Receipt },
      { label: 'Explainable AI', description: 'Every decision, explained', href: '/ai-features/explainable-ai', icon: Sparkles },
    ],
  },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources' },
];

export const primaryCta = { label: 'Book a Demo', href: '/book-demo' };

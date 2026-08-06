import {
  Bot,
  DollarSign,
  Radar,
  ConciergeBell,
  BrushCleaning,
  Wrench,
  HeartHandshake,
  Globe,
  BarChart3,
  Receipt,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

/**
 * AI feature content (Phase 6B §G). Drives both the AI Features hub grid and each
 * feature detail page via the shared template. Content maps to real product modules
 * (see product routes / feature gates). All numbers in `impact` are labeled illustrative.
 */
export interface AiFeatureContent {
  slug: string;
  name: string;
  icon: LucideIcon;
  group: 'Front Office' | 'Revenue' | 'Operations' | 'Guest' | 'Intelligence';
  eyebrow: string;
  headline: string;
  summary: string;
  problem: string;
  traditional: string;
  solution: string;
  benefits: string[];
  /** Example AI recommendation for the signature card (clearly illustrative). */
  recommendation: { text: string; reasoning: string[]; confidence: number; impact?: string; requiresHumanApproval?: boolean };
  related: string[];
}

export const aiFeatures: AiFeatureContent[] = [
  {
    slug: 'receptionist',
    name: 'AI Receptionist',
    icon: Bot,
    group: 'Front Office',
    eyebrow: 'Front Office',
    headline: 'A 24/7 front desk that answers, books, and acts',
    summary: 'Handle guest questions, reservations, and requests around the clock — with a human always in control of anything consequential.',
    problem: 'Front desks are understaffed and overwhelmed. After-hours enquiries go unanswered, and repetitive questions eat the team’s time.',
    traditional: 'Staff manually answer the same questions, juggle phone and email, and lose bookings when no one is available to respond.',
    solution: 'The AI receptionist understands guest intent, answers instantly in natural language, and drafts reservations and requests — surfacing anything sensitive for human approval.',
    benefits: ['Never miss an after-hours enquiry', 'Free the front desk for in-person hospitality', 'Faster response times, higher direct conversion'],
    recommendation: {
      text: 'Offer the 8pm caller a Deluxe upgrade for their Friday stay',
      reasoning: ['Guest asked about room size', 'Deluxe rooms are 60% unsold that night', 'Guest is a returning direct booker'],
      confidence: 81,
      impact: 'Potential +$140 upsell',
    },
    related: ['guest', 'crm', 'revenue'],
  },
  {
    slug: 'revenue',
    name: 'Revenue Intelligence',
    icon: DollarSign,
    group: 'Revenue',
    eyebrow: 'Revenue',
    headline: 'Dynamic pricing you approve — never blind automation',
    summary: 'Forecast demand, spot lost revenue, and receive pricing moves you can approve, adjust, or dismiss.',
    problem: 'Pricing decisions are slow, manual, and often reactive — leaving revenue on the table every night.',
    traditional: 'Revenue managers export spreadsheets, compare comp sets by hand, and update rates days later.',
    solution: 'The revenue engine forecasts demand and recommends specific rate changes with the evidence behind each — you stay in control of every price.',
    benefits: ['Capture demand you would have missed', 'See the reasoning behind every rate move', 'Simulate changes before they go live'],
    recommendation: {
      text: 'Raise weekend rate by 8% for Deluxe rooms',
      reasoning: ['Demand up 22% vs. last year', '14 Deluxe rooms unsold Fri–Sun', 'Comp set nearing sell-out'],
      confidence: 87,
      impact: '+$3,200 estimated weekend revenue',
      requiresHumanApproval: true,
    },
    related: ['channels', 'analytics', 'operations'],
  },
  {
    slug: 'operations',
    name: 'Operations Command Center',
    icon: Radar,
    group: 'Operations',
    eyebrow: 'Operations',
    headline: 'One screen: what needs attention, why, and what to do',
    summary: 'A live hotel health score and a prioritized, explainable action queue across every department.',
    problem: 'Managers switch between ten tools to understand what’s happening, and problems surface too late.',
    traditional: 'Morning stand-ups rely on stale reports; issues are discovered after they’ve already cost money.',
    solution: 'The command center aggregates every module into one health score and a ranked action queue — each item explained, each action human-approved.',
    benefits: ['See the whole hotel at a glance', 'Act on the highest-impact issue first', 'Delegate with full context'],
    recommendation: {
      text: 'Flag Room 214 for maintenance before tonight’s check-in',
      reasoning: ['AC fault reported twice this week', 'VIP guest arriving at 4pm', 'A comparable room is available to reassign'],
      confidence: 90,
    },
    related: ['maintenance', 'housekeeping', 'revenue'],
  },
  {
    slug: 'guest',
    name: 'Guest Companion',
    icon: ConciergeBell,
    group: 'Guest',
    eyebrow: 'Guest',
    headline: 'No-login QR guest services, powered by one brain',
    summary: 'Guests scan a code to chat, request services, and get concierge help — routed automatically to the right team.',
    problem: 'Guests wait on hold or at the desk for simple requests, and staff field the same questions repeatedly.',
    traditional: 'Phone calls and paper cards, with requests lost between shifts.',
    solution: 'A no-login guest portal via reservation tokens gives every guest an AI companion that answers instantly and routes real requests to staff.',
    benefits: ['Effortless guest self-service', 'Requests never fall through the cracks', 'Higher guest satisfaction scores'],
    recommendation: {
      text: 'Route the late-checkout request to the front desk queue',
      reasoning: ['Guest asked for 2pm checkout', 'No arrivals for that room before 4pm', 'Within the auto-approve policy window'],
      confidence: 76,
    },
    related: ['receptionist', 'crm', 'housekeeping'],
  },
  {
    slug: 'housekeeping',
    name: 'Housekeeping Automation',
    icon: BrushCleaning,
    group: 'Operations',
    eyebrow: 'Operations',
    headline: 'Self-coordinating room care',
    summary: 'Turn checkouts, priorities, and inspections into a coordinated queue your team can trust.',
    problem: 'Housekeeping runs on whiteboards and radios; priorities shift faster than they can be communicated.',
    traditional: 'Manual room assignments and status calls, with rooms sitting dirty longer than they should.',
    solution: 'Rooms flow through a live status board; the AI prioritizes turns based on arrivals, so the right rooms are ready first.',
    benefits: ['Faster room turns', 'Fewer guests waiting to check in', 'Clear accountability per room'],
    recommendation: {
      text: 'Prioritize Room 312 for the next available cleaner',
      reasoning: ['Early check-in requested at noon', 'Guest is a returning VIP', 'Room became vacant 20 minutes ago'],
      confidence: 84,
    },
    related: ['operations', 'maintenance', 'guest'],
  },
  {
    slug: 'maintenance',
    name: 'Maintenance Automation',
    icon: Wrench,
    group: 'Operations',
    eyebrow: 'Operations',
    headline: 'From issue report to resolution — with revenue impact in view',
    summary: 'Classify issues, block affected rooms, and predict failures before they disrupt guests.',
    problem: 'Maintenance issues are reported inconsistently and their revenue impact is invisible until it’s too late.',
    traditional: 'Paper tickets and reactive fixes, with rooms sold that shouldn’t have been.',
    solution: 'The AI classifies each report, can block the room from sale, and flags predictive risks — the revenue impact is always shown.',
    benefits: ['Stop selling rooms with open faults', 'Prevent failures before they happen', 'See the cost of every issue'],
    recommendation: {
      text: 'Block Room 108 from sale until the leak is resolved',
      reasoning: ['Plumbing issue reported this morning', 'Two nights currently on sale', 'Estimated fix time: 24 hours'],
      confidence: 88,
      requiresHumanApproval: true,
    },
    related: ['operations', 'housekeeping', 'revenue'],
  },
  {
    slug: 'crm',
    name: 'CRM & Guest Intelligence',
    icon: HeartHandshake,
    group: 'Intelligence',
    eyebrow: 'Intelligence',
    headline: 'Guest memory that drives loyalty',
    summary: 'A living profile for every guest — preferences, history, and AI-generated briefs before every stay.',
    problem: 'Guest preferences live in people’s heads and disappear when staff change.',
    traditional: 'Scattered notes and no memory across stays, so returning guests feel like strangers.',
    solution: 'Every guest gets a profile with AI memory, segments, and a pre-arrival brief — so every stay feels personal.',
    benefits: ['Recognize and delight returning guests', 'Personalize offers that convert', 'Institutional memory that never leaves'],
    recommendation: {
      text: 'Pre-assign a high-floor quiet room for Ms. Chen',
      reasoning: ['Noted preference from two prior stays', 'Traveling for business again', 'A qualifying room is available'],
      confidence: 79,
    },
    related: ['guest', 'receptionist', 'revenue'],
  },
  {
    slug: 'channels',
    name: 'Channel Manager',
    icon: Globe,
    group: 'Revenue',
    eyebrow: 'Distribution',
    headline: 'Zero-overbooking OTA synchronization',
    summary: 'Keep inventory in sync across channels with an AI that prevents overbookings before they happen.',
    problem: 'Manual channel management leads to overbookings, rate parity issues, and constant firefighting.',
    traditional: 'Updating each OTA extranet by hand and discovering overbookings after the guest arrives.',
    solution: 'A provider-agnostic channel framework keeps inventory synced and an AI allocates it to prevent overbooking.',
    benefits: ['Eliminate overbookings', 'One place to manage every channel', 'Smart allocation that protects revenue'],
    recommendation: {
      text: 'Reduce Booking.com allocation for this weekend by 3 rooms',
      reasoning: ['Direct pace is ahead of forecast', 'Overbooking risk score rising', 'Direct bookings carry no commission'],
      confidence: 83,
      requiresHumanApproval: true,
    },
    related: ['revenue', 'operations', 'analytics'],
  },
  {
    slug: 'analytics',
    name: 'Analytics & BI',
    icon: BarChart3,
    group: 'Intelligence',
    eyebrow: 'Intelligence',
    headline: 'Decisions, not dashboards',
    summary: 'KPIs, forecasts, and a daily brief that tells you what changed and why — not just what happened.',
    problem: 'Dashboards show numbers but not meaning; managers spend time interpreting instead of acting.',
    traditional: 'Static reports exported weekly, disconnected from the decisions they should inform.',
    solution: 'Read-only KPI, forecast, and insight engines surface what changed and why, in a daily executive brief.',
    benefits: ['Understand the “why” behind the numbers', 'A daily brief that saves hours', 'Forecasts you can plan around'],
    recommendation: {
      text: 'Review midweek occupancy — pace is 9% behind forecast',
      reasoning: ['A local event was rescheduled', 'Corporate segment softening', 'A targeted promo could recover pace'],
      confidence: 74,
    },
    related: ['revenue', 'operations', 'crm'],
  },
  {
    slug: 'folio',
    name: 'Billing & Folio',
    icon: Receipt,
    group: 'Front Office',
    eyebrow: 'Front Office',
    headline: 'A leak-free checkout copilot',
    summary: 'Validate charges, catch revenue leakage, and speed checkout — refunds and discounts always human-approved.',
    problem: 'Missed charges and billing errors quietly erode revenue and slow down checkout.',
    traditional: 'Manual folio review at the desk, with disputes and leakage discovered later — or never.',
    solution: 'The folio copilot validates charges and flags leakage; refunds and discounts are never auto-approved.',
    benefits: ['Recover revenue that would leak away', 'Faster, cleaner checkouts', 'Every adjustment stays under human control'],
    recommendation: {
      text: 'Flag a missing minibar charge on folio #4821',
      reasoning: ['Housekeeping logged consumption', 'No matching charge on the folio', 'Guest checks out in 2 hours'],
      confidence: 86,
      requiresHumanApproval: true,
    },
    related: ['operations', 'crm', 'analytics'],
  },
  {
    slug: 'explainable-ai',
    name: 'Explainable AI',
    icon: Sparkles,
    group: 'Intelligence',
    eyebrow: 'Trust',
    headline: 'Every decision, explained — with you in control',
    summary: 'The stance behind every module: the AI shows its reasoning, its confidence, and its evidence, and you decide.',
    problem: 'Hotels want AI’s leverage but fear a black box making money decisions without oversight.',
    traditional: 'Opaque automation that either does nothing useful or acts without accountability.',
    solution: 'Every recommendation carries its reasoning, evidence, and confidence — and financial or irreversible actions are never executed automatically.',
    benefits: ['See exactly why the AI recommends something', 'Approve, adjust, or dismiss — always', 'Financial & irreversible actions stay human'],
    recommendation: {
      text: 'Approve the recommended rate change for this weekend',
      reasoning: ['Demand signal is strong and corroborated', 'Estimated upside is material', 'This is a financial action — your approval is required'],
      confidence: 87,
      impact: '+$3,200 estimated',
      requiresHumanApproval: true,
    },
    related: ['revenue', 'operations', 'analytics'],
  },
];

export function getAiFeature(slug: string): AiFeatureContent | undefined {
  return aiFeatures.find((f) => f.slug === slug);
}

/**
 * Public barrel for the marketing design system. Phase 6B assembles pages purely
 * from these exports — no page should reach into internal files or invent styles.
 */

// Layout
export { MarketingLayout } from './layout/MarketingLayout';
export { Header } from './layout/Header';
export { Footer } from './layout/Footer';
export { Logo } from './layout/Logo';

// Primitives
export { Container } from './ui/Container';
export { Section } from './ui/Section';
export { Heading, Text, Eyebrow } from './ui/Typography';
export { Button, type ButtonProps } from './ui/Button';
export { TextLink } from './ui/TextLink';
export { Badge } from './ui/Badge';
export { StatusPill, type AvailabilityStatus } from './ui/StatusPill';

// Components
export { Card } from './components/Card';
export { SectionHeader } from './components/SectionHeader';
export { FeatureCard } from './components/FeatureCard';
export { StatCard } from './components/StatCard';
export { PricingCard } from './components/PricingCard';
export { Testimonial } from './components/Testimonial';
export { LogoStrip } from './components/LogoStrip';
export { CTABand } from './components/CTABand';
export { FAQ, type FAQItem } from './components/FAQ';
export { Skeleton } from './components/Skeleton';
export { EmptyState } from './components/EmptyState';
export { AIRecommendationCard, type AIRecommendationCardProps } from './components/AIRecommendationCard';
export { DashboardFrame } from './components/DashboardFrame';
export { VideoSection } from './components/VideoSection';

// Motion
export { Reveal } from './motion/Reveal';
export { DURATION, EASE } from './motion/motion';

// Config
export { primaryNav, primaryCta } from './config/nav';
export { footerColumns, legalLinks } from './config/footer';

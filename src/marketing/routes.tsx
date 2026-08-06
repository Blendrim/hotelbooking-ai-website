import type { RouteObject } from 'react-router-dom';
import { MarketingLayout } from './layout/MarketingLayout';

/**
 * Public marketing routes (Phase 6B §D). Mounted at canonical top-level paths under a
 * single MarketingLayout shell. Pages are code-split via the data-router `lazy` API.
 *
 * URL notes:
 * - Home is `/home` and the demo page is `/book-demo` because the product app already
 *   owns `/` and `/demo`. The production answer (marketing owning `/` via a domain
 *   split) is an owner decision — then these become root-relative with no code change
 *   beyond the two config values in nav.ts/Logo.
 * - Bad slugs on templated routes (ai-features/solutions/legal) redirect to their hubs.
 * - No global marketing splat is registered, to avoid colliding with the product's
 *   protected `/*`. Unknown paths keep the existing app behavior.
 */

const lazyPage = (importer: () => Promise<Record<string, React.ComponentType>>, name: string): RouteObject['lazy'] =>
  async () => {
    const mod = await importer();
    return { Component: mod[name]! };
  };

/**
 * The marketing route children — shared by the coupled dev router (spread into the
 * product router) and the standalone marketing-only build (marketingRouter.tsx).
 */
export const marketingChildren: RouteObject[] = [
  { path: '/home', lazy: lazyPage(() => import('./pages/HomePage'), 'HomePage') },
      { path: '/why', lazy: lazyPage(() => import('./pages/WhyPage'), 'WhyPage') },
      { path: '/platform', lazy: lazyPage(() => import('./pages/PlatformPage'), 'PlatformPage') },
      { path: '/ai-features', lazy: lazyPage(() => import('./pages/AiFeaturesHubPage'), 'AiFeaturesHubPage') },
      { path: '/ai-features/:slug', lazy: lazyPage(() => import('./pages/AiFeaturePage'), 'AiFeaturePage') },
      { path: '/solutions', lazy: lazyPage(() => import('./pages/SolutionsHubPage'), 'SolutionsHubPage') },
      { path: '/solutions/:slug', lazy: lazyPage(() => import('./pages/SolutionPage'), 'SolutionPage') },
      { path: '/pricing', lazy: lazyPage(() => import('./pages/PricingPage'), 'PricingPage') },
      { path: '/book-demo', lazy: lazyPage(() => import('./pages/BookDemoPage'), 'BookDemoPage') },
      { path: '/trust', lazy: lazyPage(() => import('./pages/TrustCenterPage'), 'TrustCenterPage') },
      { path: '/trust/security', lazy: lazyPage(() => import('./pages/SecurityPage'), 'SecurityPage') },
      { path: '/integrations', lazy: lazyPage(() => import('./pages/IntegrationsPage'), 'IntegrationsPage') },
      { path: '/developers', lazy: lazyPage(() => import('./pages/DevelopersPage'), 'DevelopersPage') },
      { path: '/partners', lazy: lazyPage(() => import('./pages/PartnersPage'), 'PartnersPage') },
      { path: '/resources', lazy: lazyPage(() => import('./pages/ResourcesPage'), 'ResourcesPage') },
      { path: '/about', lazy: lazyPage(() => import('./pages/AboutPage'), 'AboutPage') },
      { path: '/contact', lazy: lazyPage(() => import('./pages/ContactPage'), 'ContactPage') },
      { path: '/customer-success', lazy: lazyPage(() => import('./pages/CustomerSuccessPage'), 'CustomerSuccessPage') },
      { path: '/status', lazy: lazyPage(() => import('./pages/StatusPage'), 'StatusPage') },
      { path: '/roadmap', lazy: lazyPage(() => import('./pages/RoadmapPage'), 'RoadmapPage') },
      { path: '/release-notes', lazy: lazyPage(() => import('./pages/ReleaseNotesPage'), 'ReleaseNotesPage') },
      { path: '/legal/:slug', lazy: lazyPage(() => import('./pages/LegalPage'), 'LegalPage') },
      { path: '/404', lazy: lazyPage(() => import('./pages/MarketingNotFoundPage'), 'MarketingNotFoundPage') },
];

/** Coupled dev router mount: marketing pages under one MarketingLayout shell. */
export const marketingRoutes: RouteObject[] = [
  {
    element: <MarketingLayout />,
    children: marketingChildren,
  },
];

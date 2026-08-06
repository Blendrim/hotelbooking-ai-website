/**
 * Per-page SEO + social metadata (Phase 5 §S). Uses React 19 native metadata
 * hoisting — rendering <title>/<meta>/<link> from a component moves them to <head>,
 * so no external head-manager dependency is needed.
 *
 * Honesty: no structured data / ratings / org schema is emitted here — none is
 * verified yet (Phase 6B forbids unsupported claims). Add JSON-LD later only when true.
 */

import { site, canonical as buildCanonical } from '../config/site';

const DEFAULT_DESCRIPTION =
  'The AI operating system that runs your entire hotel — and explains itself. Revenue, operations, and guest experience as one intelligence.';

export interface SeoProps {
  title: string;
  description?: string;
  /** Path used to build the canonical URL (e.g. "/pricing"). */
  path?: string;
  /** Set true on thin/utility pages to discourage indexing. */
  noindex?: boolean;
  ogImage?: string;
}

export function Seo({ title, description = DEFAULT_DESCRIPTION, path, noindex = false, ogImage }: SeoProps) {
  const fullTitle = title === site.company ? title : `${title} · ${site.company}`;
  const canonical = path ? buildCanonical(path) : undefined;
  const resolvedOgImage = ogImage ?? (path ? buildCanonical(site.ogImage) : undefined);
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex,follow" />}
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.company} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
      {resolvedOgImage && <meta property="og:image" content={resolvedOgImage} />}
      {/* Twitter */}
      <meta name="twitter:card" content={resolvedOgImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {resolvedOgImage && <meta name="twitter:image" content={resolvedOgImage} />}
    </>
  );
}

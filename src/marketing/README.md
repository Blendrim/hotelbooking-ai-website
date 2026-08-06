# Marketing Design System (`src/marketing`)

The reusable foundation for the **public HotelBooking AI Platform marketing website**
(Phases 1–5). It is **separate from and independent of** the authenticated product
dashboard in `src/components/ui`, `src/features`, etc. Phase 6B assembles the real
pages (Home, Platform, Pricing, …) purely from the exports here — **without inventing
new styles or components.**

> ⚠️ This is a distinct **brand surface** (midnight / teal / champagne) from the product
> (indigo). Never mix the two systems in one tree.

## Golden rules

1. **Import from the barrel:** `import { Button, Section, FeatureCard } from '@/marketing'`.
2. **Tokens only.** Use `mkt-*` Tailwind utilities (`bg-mkt-surface`, `text-mkt-ink-900`,
   `rounded-mkt-lg`, `shadow-mkt-2`). Never hardcode a hex/px when a token exists.
3. **Everything lives inside `<MarketingLayout>`** (or a `.mkt` wrapper). The `mkt-*`
   utilities resolve to CSS variables that only exist under the `.mkt` scope.
4. **Presentational only.** Marketing components hold no business logic and make no API
   calls. Data/handlers are passed in as props.
5. **Accessibility & reduced-motion are built in** — don't strip them.

## Architecture

```
marketing/
  styles/tokens.css     ← CSS variables under `.mkt` (light + .dark), theme-aware
  motion/               ← motion constants + <Reveal> (reduced-motion aware)
  ui/                   ← primitives: Button, Container, Section, Typography,
                          TextLink, Badge, StatusPill
  components/           ← Card, SectionHeader, FeatureCard, StatCard, PricingCard,
                          Testimonial, LogoStrip, CTABand, FAQ, Skeleton, EmptyState,
                          AIRecommendationCard, DashboardFrame
  layout/               ← Header (nav + mega menu + mobile drawer), Footer, Logo,
                          MarketingLayout (shell: skip link, sticky mobile CTA)
  config/               ← nav.ts, footer.ts (config-driven navigation)
  preview/              ← FoundationShowcasePage (internal QA surface, not a real page)
  index.ts              ← public barrel — import from here
```

Tokens map to Tailwind in `tailwind.config.js` under the `mkt` namespace (additive —
the product's `brand`/`surface` tokens are untouched). Dark mode reuses the existing
`.dark` class from the product `ThemeProvider`.

## Component quick reference

| Component | Use it for | Key props | Notes |
|---|---|---|---|
| `Section` | Full-width page section | `background` (`light`/`subtle`/`deep`), `spacing` | Never place two `deep` sections adjacent. |
| `Container` | Width-capped content | `width` (`content`/`wide`/`prose`) | 1200px default; ultra-wide adds margins. |
| `Heading`/`Text`/`Eyebrow` | Typography | `level`, `size`, `muted` | One `<h1>` per page; keep heading order. |
| `Button` | Primary/secondary actions | `variant`, `size`, `href`, `loading`, `fullWidth` | One `primary` per viewport. `href` → router `<Link>`/`<a>`. |
| `TextLink` | Inline "learn more →" | `href`, `arrow` | Tertiary link. |
| `StatusPill` | Availability honesty | `status` (`available`/`coming-soon`/`planned`) | Always icon+text+color (color-independent). |
| `Card` | Base surface | `interactive`, `accentEdge` | Compose, don't restyle. |
| `FeatureCard` | Module/capability | `icon`, `title`, `description`, `href` | Grid of equal cards. |
| `StatCard` | ROI number | `value`, `suffix`, `label`, `context` | Counts up once; reduced-motion → instant. |
| `PricingCard` | A plan tier | `tier`, `priceSlot`, `features`, `highlighted`, `goldAccent` | **Never invent prices** — use `—`/`Custom`. |
| `AIRecommendationCard` | Explainable-AI signature | `recommendation`, `reasoning[]`, `confidence`, `requiresHumanApproval` | Never auto-executes money/irreversible actions. |
| `DashboardFrame` | Product screenshots | `children`, `label`, `dark` | Floating browser frame. |
| `FAQ` | Objection handling | `items` | Accessible accordion. |
| `CTABand` | Closing CTA | `title`, `primaryLabel/Href`, `secondary*` | Deep band; ends every page. |
| `Reveal` | Scroll entrance | `stagger` | Fires once; respects reduced-motion. |

## Do / Don't

- ✅ `bg-mkt-primary-900`, `text-mkt-ink-700`, `shadow-mkt-1`, `rounded-mkt-lg`.
- ✅ Wrap pages in `<MarketingLayout>`; compose `Section` → components.
- ❌ Don't use product `ui` components (`@/components/ui/*`) on marketing pages.
- ❌ Don't hardcode colors/spacing; don't add `mkt` utilities outside a `.mkt` tree.
- ❌ Don't put fetch/business logic in these components.

## Not yet done (see Phase 6A report)

- **Assets:** real logo, illustration motif kit, product screenshots, photography.
- **Tests:** no test runner is installed yet — unit/a11y tests are a flagged follow-up.
- **Serif display font:** still a locked decision (Phase 4D).
- **Final marketing routes / home-at-`/`:** assembled in Phase 6B (owner decides `/`).

# KINFORM

Personalized mobility, movement assessment and strength development.

> **Your body wasn’t meant to feel restricted.**
> Understand how you move and build a personalized approach to mobility, flexibility, and strength.

This repository holds the KINFORM web platform. **Milestone 1** sets up the brand, the design system, the marketing website, the screens for auth and the dashboard, and an application structure ready for Supabase. It has **no** live authentication, payments, media uploads or AI assessment processing yet.

## Stack

- **Next.js 16** (App Router, Turbopack, Cache Components + Partial Prefetching enabled)
- **TypeScript** (strict)
- **Tailwind CSS v4**: design tokens live in `src/app/globals.css` (`@theme`)
- **shadcn/ui conventions**: `components.json`, `cva` + `tailwind-merge` primitives in `src/components/ui`; `npx shadcn add <component>` works
- **Supabase-ready**: `@supabase/ssr` clients in `src/lib/supabase` (inactive until env vars are set)
- **Vercel-compatible**: zero-config deploy

## Getting started

Requires Node.js 20.9+ (developed on Node 22).

```bash
npm install
cp .env.example .env.local   # optional for milestone 1; fill in when Supabase is added
npm run dev                  # http://localhost:3000
```

| Script              | What it does                               |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Development server                         |
| `npm run build`     | Production build (also type-checks)        |
| `npm run start`     | Serve the production build                 |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TS)      |
| `npm run typecheck` | Generate route types and run `tsc`         |

## Routes

| Route           | Purpose                                                                 |
| --------------- | ----------------------------------------------------------------------- |
| `/`             | Homepage: hero, audience, process, assessment areas, programming, Movement Moments, app preview, pricing preview, CTA |
| `/how-it-works` | The seven-step journey and realistic expectations                       |
| `/assessment`   | What’s completed, what’s collected, what you receive, limitations, safety referral, privacy, purchase (disabled) |
| `/pricing`      | **Proposed** introductory pricing ($59 / $39 mo / $79 mo)               |
| `/login`, `/signup` | Auth screens. The forms are visible but submission is disabled  |
| `/dashboard`    | Protected-layout **design concept** with labelled sample content         |

## Project structure

```
src/
  app/
    layout.tsx              Root layout: fonts, metadata, skip link
    globals.css             Design tokens (@theme) and base styles
    (marketing)/            Public site: header + footer layout
    (auth)/                 Login / signup split-screen layout
    (app)/                  Signed-in app shell (future auth guard)
  components/
    ui/                     Primitives: Button, Card, Badge, Input/Field, SectionHeading/Section
    layout/                 SiteHeader (incl. mobile nav), SiteFooter
    brand/                  Wordmark (placeholder), PhotoFrame, RangeArc
    marketing/              ProcessSteps, FeatureCard, AssessmentAreas, PricingCard, CtaSection, PageHero, AppPreview
    dashboard/              Panel, SampleTag
    auth/                   AuthForm
  content/                  All copy and data as typed modules (pricing, assessment areas, nav…)
  lib/                      utils, env (public), env.server (secrets), supabase clients
  types/domain.ts           Shared domain model for web + future mobile apps
docs/ARCHITECTURE.md        Architecture decisions and the roadmap for future milestones
```

### Editing content

- **Prices:** `src/content/pricing.ts`. Every pricing surface reads from this file.
- **Assessment areas** (in priority order), the journey, limitations and referral signals: `src/content/assessment.ts`
- **Brand copy, navigation and disclaimer:** `src/content/site.ts`
- **Dashboard sample data:** `src/content/dashboard-sample.ts`. This is illustrative only.

### Design system

All tokens are defined in `src/app/globals.css` and used as Tailwind utilities:

- **Surfaces:** `ink-950` … `ink-700`. **Lines:** `line`, `line-strong`.
- **Text:** `bone` (warm white), `mist` (secondary), `dim` (tertiary).
- **Accent:** `lime`, used sparingly for primary actions and highlights. **Status:** `caution`.
- **Type scale:** `text-display`, `text-headline`, `text-title`. Fonts are Manrope (sans) and Geist Mono (labels and data).
- **Radii, shadows** (`shadow-card`, `shadow-lift`, `shadow-glow`) and **motion** (`animate-rise`, `animate-fade`, `animate-draw`). Motion respects `prefers-reduced-motion`.
- **Utilities:** `container-page`, `eyebrow`, `grain`.

## Placeholders to replace

- **Wordmark:** `src/components/brand/wordmark.tsx` is a typographic placeholder until the approved logo exists.
- **Photography:** `PhotoFrame` shows the art direction for each planned shot: real adults doing mobility, balance and strength work. Replace each one with `next/image` once licensed photography is available. No stock or AI-generated people are used.

## Environment variables

See `.env.example`. Only `NEXT_PUBLIC_*` values reach the browser. `SUPABASE_SERVICE_ROLE_KEY` is read only through `src/lib/env.server.ts`, which imports `server-only`. `.env*` files are git-ignored except `.env.example`.

## Deploying to Vercel

Import the repository in Vercel. No configuration is needed. Add the environment variables from `.env.example` in the project settings when Supabase is connected.

## Product and safety principles

- KINFORM is a fitness and wellness service, **not** a medical diagnostic service. Copy uses phrases like *movement observations*, *training priorities* and *mobility goals*. It never says "diagnosis" or "correction".
- What the user reports is always kept separate from what is observed (`Finding.source` in `src/types/domain.ts`).
- Safety screening comes before programming. Red flags block automatic recommendations and lead to a referral to a professional.
- There are no fake testimonials, ratings or statistics. Sample data is always labelled.

# KINFORM architecture

## Principles

1. **One shared backend.** Supabase (Postgres + Auth + Storage) serves the website and the future iOS and Android apps. Business rules live in the database (RLS policies, Postgres functions) and in server-side code, never only in web UI. `src/types/domain.ts` is the shared contract.
2. **Content as data.** Copy, pricing and assessment definitions live in `src/content/*` as typed modules. They can move to the database or a CMS later without changing components.
3. **Server by default.** Pages are Server Components. Client components are limited to interactive pieces (currently only `SiteHeader`).
4. **Safety is a system constraint, not just copy.** See the "Safety gating" section below.

## Rendering model (Next.js 16)

`cacheComponents` and `partialPrefetching` are enabled. Every route in milestone 1 is static. When auth is added:

- Reading cookies or the session is request-time data. It must sit inside a `<Suspense>` boundary, not as a top-level `await` in a layout.
- Use `'use cache: private'` for per-user reads (see `node_modules/next/dist/docs/01-app/02-guides/authentication-with-cache-components.md`).
- Add `src/proxy.ts` (Next 16 renamed `middleware` to `proxy`) to refresh Supabase sessions. Use it for optimistic redirects only. Real authorization checks belong in a Data Access Layer (`src/lib/dal.ts`) and in RLS.

## Route groups

| Group         | Layout                       | Future behaviour                          |
| ------------- | ---------------------------- | ----------------------------------------- |
| `(marketing)` | Header + footer              | Static, public                            |
| `(auth)`      | Split screen                 | Server Actions calling Supabase Auth      |
| `(app)`       | App shell with sidebar       | Session check → redirect to `/login`      |

## Planned data model (Supabase)

Tables map 1:1 to `src/types/domain.ts`: `profiles`, `subscriptions`, `safety_screenings`, `assessments`, `questionnaire_responses`, `media_assets`, `movement_test_results`, `findings`, `programs`, `program_weeks`, `sessions`, `exercises`, `prescribed_exercises`, `movement_moments`, `check_ins`.

- Every user-owned table has RLS `user_id = auth.uid()`. Reviewer access goes through a `reviewers` role and an explicit assignment table.
- `findings.source` is `'self_reported' | 'observed'`. The two are never merged.

## Media handling

- Media goes in a private Storage bucket (`assessment-media`) with object paths of the form `{user_id}/{assessment_id}/{asset_id}`.
- Uploads go to signed upload URLs issued by a server route after an ownership check. Reads use short-lived signed URLs.
- No public URLs, and no service-role key in the browser. A deletion endpoint will remove both the Storage objects and the database rows.

## Safety gating

1. Screening is the first step of every assessment and reassessment.
2. If any `SafetyFlag` is present, then `referralRecommended = true` and the assessment status becomes `referred`. Automatic program generation must refuse to run (enforce this in the generator and in a database check).
3. `Exercise.contraindicatedFlags` excludes exercises per flag, even when a user has no red flags that block programming.
4. AI-generated findings are drafts. They are phrased as observations and training priorities, and are reviewed before release.

## Roadmap

- **M2 — Accounts:** Supabase project, schema and RLS migrations, Auth with Server Actions, `proxy.ts`, a protected `(app)` layout, profile.
- **M3 — Purchase:** Stripe Checkout for the assessment, webhooks that create `subscriptions` and `assessments`, membership billing portal.
- **M4 — Assessment capture:** screening and questionnaire flow, guided photo and video capture, private uploads, self-recorded tests.
- **M5 — Findings and programming:** review tooling, assisted findings, program generator with safety gating, exercise library with demos.
- **M6 — Tracking:** Movement Moments scheduling and notifications, weekly check-ins, four-week reassessment comparisons.
- **M7 — Mobile:** React Native / Expo apps on the same Supabase backend and domain types.

# Dynamic Construction MI — website (preview)

Cinematic, multi-page website for Dynamic Construction MI (Carleton, MI), built with
Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and GSAP ScrollTrigger.

**Live preview:** https://livefiberconnect.com/preview/dynamicconstruction/
(static export, served by the Tucker app's isolated `/preview` route in
`sjr425151-collab/fiber-appointment-engine` → `previews/dynamicconstruction`). Not indexed.

## Develop / build

```bash
npm install
npm run dev          # http://localhost:3000/preview/dynamicconstruction
npm run build        # static export → out/
```

`NEXT_PUBLIC_BASE_PATH` (default `/preview/dynamicconstruction`) sets the sub-path.
To update the live preview: build, replace `previews/dynamicconstruction` in the
fiber-appointment-engine repo with `out/`, run its `npm run check`, push.

QA: serve the export, then `BASE_URL=… START_PATH=/preview/dynamicconstruction/ node scripts/qa.mjs --shots`
(console errors, overflow, broken links, headings, axe WCAG 2.2 AA).

## Where things live

- `src/content/business.ts` — verified business facts + **claims registry** (each claim's source and status; `show: false` hides it everywhere)
- `src/content/services.ts` — service pages (`enabled: false` keeps Barndominiums unpublished until confirmed)
- `src/content/projects.ts` — portfolio (titles describe what's visible; locations/sizes left blank until confirmed)
- `src/content/media.ts` + `src/assets/photos` — the company's own photos from dynamicroofingmi.com, resized, EXIF/GPS stripped
- `src/content/testimonials.ts` — empty on purpose; add only verbatim, linkable reviews
- `src/components/home/*`, `src/components/motion/*` — hero, scroll chapters, stacking project cards
- `src/components/forms/estimate-form.tsx` — client validation; posts to `NEXT_PUBLIC_LEAD_ENDPOINT` if set, otherwise shows an honest "preview — nothing was sent" message

## Before production launch

- Owner confirms every claim in `business.ts` (certifications, 50-year warranty wording, one-day roofs, financing, emergency service) and the current Google rating/count
- Add verified testimonials and the direct Google review link
- Connect lead delivery (endpoint or server handler with email/CRM), analytics ID
- Move off static export (or add an image CDN) for responsive image optimization; set canonical domain and `NEXT_PUBLIC_ALLOW_INDEXING=true`

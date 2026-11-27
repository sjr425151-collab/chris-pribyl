# 03 — Engineering and Quality Standards

**Status:** The objectives below are **preliminary**, taken from the directive (Approved as objectives). Phase 04 must formalize each one into a testable specification: a threshold, a tool, test conditions and the pages covered. Until then, none of them is a pass/fail acceptance criterion.

## 1. Evidence rules (Approved; apply now)

1. **No claim without evidence.** "Compliant", "passes", "fast" or "accessible" requires a recorded measurement: the tool and its version, the date, the conditions, the URLs or pages, and the raw result.
2. **Lab is not field.** Lab results (Lighthouse, WebPageTest, local axe) are diagnostics. Field results (Chrome UX Report or RUM at the 75th percentile) are the Core Web Vitals verdict. Label every number *lab* or *field*. Field data cannot exist before launch, so pre-launch reports must not claim field compliance.
3. **Automated accessibility checks are not compliance.** Automated tools find only some WCAG failures. Claiming WCAG 2.2 AA also requires a manual audit (keyboard, screen reader, zoom/reflow, contrast, motion).
4. **Report failures as they are.** Do not round down, cherry-pick runs or leave out failing pages. State how many runs were made and whether you report the median.

## 2. Preliminary quality objectives

| Area | Objective | Measured as | Formalize in |
| --- | --- | --- | --- |
| Accessibility | WCAG 2.2 Level AA | Manual audit plus automated scan for each page template | 04 (method), 07 (audit) |
| LCP | ≤ 2.5 s | p75 field; lab budget set in 04 | 04 |
| INP | ≤ 200 ms | p75 field (lab proxy: TBT budget) | 04 |
| CLS | ≤ 0.1 | p75 field and lab | 04 |
| Lighthouse | ≥ 95 in every applicable category | Lab, under documented representative conditions (device, throttling, number of runs, median) | 04 defines the conditions ([OPEN-011](../registers/open-items.md#open-011)) |
| Type safety | Strict mode; no unchecked `any` in application code | Compiler config plus CI | 04 |
| Regression testing | Automated unit, integration, end-to-end, accessibility and visual tests where they add value | CI | 04 |
| Reproducible builds | Lockfile, pinned toolchain, clean CI build | CI | 04 |
| Dependency security | Automated scanning; rules for new dependencies ([governance](01-governance.md#5-execution-controls)) | CI plus PR review | 04 |
| Performance budgets | Documented JavaScript, CSS, image, font and request budgets for each template | CI budget checks | 04 |
| Responsive / reduced motion | Works across the defined viewport range; `prefers-reduced-motion` honored with no loss of content | Test matrix | 04 |
| Technical and semantic SEO | Crawlable, semantic HTML, metadata, structured data, sitemap, canonicals, redirects from the existing site | Audit checklist | 02 (IA), 04 (spec), 08 (redirects) |
| Privacy-conscious analytics | Collect only what is needed; consent where the law requires it; no third-party data sale | Privacy review | 04, 06 ([OPEN-008](../registers/open-items.md#open-008)) |
| Browser compatibility | A defined support matrix | Cross-browser tests | 04 ([OPEN-010](../registers/open-items.md#open-010)) |

## 3. Discipline standards (Proposed)

Each later phase sets its own detailed standards. The bar here is the minimum.

- **Architecture:** the simplest design that meets the specs. Each significant choice gets a decision record. No speculative abstraction.
- **Design and UX:** every visual decision traces to a strategic reason ([charter §4](00-charter.md#4-creative-direction-principles-approved-nothing-is-finalized-yet)). Usability and accessibility come before decoration.
- **Information architecture and conversion:** paths are built from audience research, and every page has a defined purpose and primary action.
- **Content and copywriting:** must follow the [content integrity rules](00-charter.md#5-content-integrity-rules). Outcomes before deliverables, plain language, and claims backed by the proof inventory.
- **Security and privacy:** see [04-security-and-isolation](04-security-and-isolation.md).
- **Documentation:** each topic is documented once, in its authoritative document, and kept current in the same PR as the change.
- **Maintainability:** content can change without a developer where Phase 04 decides that is justified. Code follows consistent, enforced conventions.

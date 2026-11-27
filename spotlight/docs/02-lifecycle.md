# 02 — Development Lifecycle and Phase Gates

**Status:** The list of phases is given by the directive (Approved as the *proposed* lifecycle). The gate criteria below are **Proposed**. Each phase's details are confirmed in its own authorization.

## Gate rules (apply to every phase)

1. A phase starts only when the Founder issues an authorization for it. Being ready to start is not permission to start.
2. **Exit** takes all of the following: every deliverable submitted, the acceptance criteria shown to be met with evidence, open items either resolved or explicitly carried forward, a handoff written, and the Founder's exit approval recorded in the [authorization register](../registers/authorizations.md).
3. Parallel work packages, within one phase or across two, may be proposed when their dependencies and file ownership are documented ([governance §5](01-governance.md#5-execution-controls)).
4. Later phases are sketched in less detail here on purpose. Each is fully specified in the phase before it.

## Phase summary

| # | Phase | Entry criteria | Core deliverables | Depends on | Acceptance criteria | Exit authorization |
| --- | --- | --- | --- | --- | --- | --- |
| **00** | Project Foundation and Governance | AUTH-001 issued | README, CLAUDE.md, governance docs, registers, Phase 01 plan, baseline report | None | Docs complete, consistent, internal links resolve, documentation only, open items logged | Founder approves the Phase 00 PR |
| **01** | Strategic Discovery and Competitive Intelligence | Phase 00 exited; AUTH-002 issued; Founder intake inputs available | Discovery report, competitor matrix, audience hypotheses, existing-site audit, proof inventory, search landscape, Phase 02 recommendations | 00 | See the [Phase 01 plan §6](06-phase-01-discovery-plan.md#6-acceptance-criteria) | Founder accepts the discovery report |
| **02** | Business, Content and Experience Architecture | 01 exited | Business objectives and KPIs, audience definitions, sitemap/IA, conversion architecture, content model, messaging hierarchy, content plan | 01 | IA and conversion paths trace to discovery evidence; every claim maps to the proof inventory | Founder approves the architecture |
| **03** | Brand, Creative Direction and Design System | 02 exited (or an approved parallel start after the 02 messaging hierarchy) | Creative direction options, chosen direction, identity decisions, design tokens, component inventory, key page designs | 02 | Founder brand approval; design system passes contrast and focus requirements on paper | Founder approves the creative direction and design system |
| **04** | Technical Architecture and Engineering Specifications | 02 exited; 03 direction known | Stack decision records, hosting proposal with costs, CI/CD design, test strategy, performance budgets, analytics and privacy architecture, browser matrix, security baseline | 02, 03 | Every quality objective in [03-quality-standards](03-quality-standards.md) turned into a testable spec with a measurement method | Founder approves the specs, including any spending |
| **05** | Core Website Development | 03 and 04 exited; repository and CI ready | The application, content implemented, automated tests | 03, 04 | CI green; budgets met in lab tests; independent code review passed | Founder approves feature completion |
| **06** | Business Integrations and Performance Intelligence | 05 core complete; each integration specified and authorized | Forms/CRM, analytics, consent and any portal touchpoints, each authorized separately | 05 | Integrations work in non-production with test data; privacy review passed | Founder approves each integration |
| **07** | Independent Quality Assurance and Acceptance | 05 and 06 complete | QA report: accessibility audit, performance, SEO, security, cross-browser, content accuracy | 05, 06 | All blocking defects closed; evidence reproducible by a party independent of the implementers | Founder formal acceptance |
| **08** | Controlled Production Launch | 07 accepted; launch and rollback plan approved | DNS and cutover plan, redirect map, monitoring, rollback rehearsal, launch report | 07 | Cutover verified; existing site restorable; field-monitoring baseline started | Founder go-live and post-launch sign-off |
| **09** | Continuous Optimization and Growth | 08 signed off | Field (RUM) reports, an experiment backlog, periodic reviews | 08 | Defined in Phase 02 KPIs and an authorization for each cycle | Ongoing; each cycle authorized |

## Parallelization candidates (Proposed, not authorized)

- Inside Phase 01: the research workstreams in the [Phase 01 plan](06-phase-01-discovery-plan.md#4-workstreams) can run in parallel once Founder intake is complete.
- Phases 03 and 04 overlap. Technical spikes that do not decide the stack may run alongside creative exploration, if a decision record states the overlap.

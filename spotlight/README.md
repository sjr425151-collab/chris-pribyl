# Spotlight Marketing — Corporate Website

The flagship corporate website for **Spotlight Marketing LLC**, a multidisciplinary marketing and business growth agency. The production domain will be `spotlight-marketing.co`.

> **Current status: Phase 00 (Project Foundation and Governance). This is documentation only.**
> There is no application code, framework, infrastructure or deployment. No later phase is authorized yet.

## Where this project lives right now

The directive names a dedicated repository, `spotlight-marketing-web`. That repository does not exist yet. Until it does, this project lives **only** in this `spotlight/` directory, on branch `claude/modest-mendel-9cb4m3` of `sjr425151-collab/chris-pribyl` ([DEC-001](registers/decisions.md#dec-001)).

Everything outside `spotlight/` belongs to other, unrelated projects (KINFORM, Dynamic Construction MI). It is out of scope and must not be modified. When the dedicated repository is created, this directory becomes its root ([OPEN-001](registers/open-items.md#open-001)).

## Documentation map

Each topic has exactly one authoritative document. Other documents link to it and do not restate it.

| Document | Authority for |
| --- | --- |
| [CLAUDE.md](CLAUDE.md) | Operating rules for agents, session startup and handoff |
| [STATUS.md](STATUS.md) | Current phase, active authorization, work in progress, next actions |
| [docs/00-charter.md](docs/00-charter.md) | Executive mandate, positioning, business principles, content integrity |
| [docs/01-governance.md](docs/01-governance.md) | Authority structure, authorization model, record types, execution controls |
| [docs/02-lifecycle.md](docs/02-lifecycle.md) | Phases 00–09 and their gates |
| [docs/03-quality-standards.md](docs/03-quality-standards.md) | Engineering, quality and evidence standards |
| [docs/04-security-and-isolation.md](docs/04-security-and-isolation.md) | Environment isolation, prohibited actions, secret handling |
| [docs/05-context-and-continuity.md](docs/05-context-and-continuity.md) | Context-window management, handoffs, recovery |
| [docs/06-phase-01-discovery-plan.md](docs/06-phase-01-discovery-plan.md) | Proposed Phase 01 plan (not authorized) |
| [registers/authorizations.md](registers/authorizations.md) | Every authorization issued, with its scope and status |
| [registers/decisions.md](registers/decisions.md) | Decision records |
| [registers/open-items.md](registers/open-items.md) | Unresolved decisions, risks and blockers |
| [handoffs/](handoffs/) | Session and phase handoff reports (historical record) |

**Precedence when documents conflict.** Executive directives and the authorization register come first, then the decision register, then the authoritative documents above, then handoffs. A conflict is itself an open item: record it instead of resolving it silently.

## Authorized development workflow

1. **Check authorization.** Read [STATUS.md](STATUS.md) and [registers/authorizations.md](registers/authorizations.md). Work only inside an active authorization's scope.
2. **Branch.** Work on an isolated branch. Never commit directly to the default branch.
3. **Do the work.** Record decisions and open items as they arise, not afterwards.
4. **Verify.** Run the checks the work requires ([quality standards](docs/03-quality-standards.md)) and record the actual results.
5. **Open a pull request.** Give the scope, the authorization ID, the evidence and the open items. An agent never merges a PR.
6. **Executive review.** The Founder approves and merges, or asks for changes.
7. **Hand off.** Update [STATUS.md](STATUS.md) and write a handoff in [handoffs/](handoffs/).

The full controls are in [docs/01-governance.md](docs/01-governance.md).

## Lifecycle at a glance

| Phase | Name | Status |
| --- | --- | --- |
| 00 | Project Foundation and Governance | **In review** (AUTH-001) |
| 01 | Strategic Discovery and Competitive Intelligence | Proposed, not authorized |
| 02 | Business, Content and Experience Architecture | Not started |
| 03 | Brand, Creative Direction and Design System | Not started |
| 04 | Technical Architecture and Engineering Specifications | Not started |
| 05 | Core Website Development | Not started |
| 06 | Business Integrations and Performance Intelligence | Not started |
| 07 | Independent Quality Assurance and Acceptance | Not started |
| 08 | Controlled Production Launch | Not started |
| 09 | Continuous Optimization and Growth | Not started |

## What this project is not

- It is not the Spotlight Marketing Client Portal (`portal.spotlight-marketing.co`). That system is separate and off-limits ([isolation](docs/04-security-and-isolation.md)).
- It does not replace the existing public website until a production migration is explicitly authorized.
- It is not a template build or a redesign of the existing site.

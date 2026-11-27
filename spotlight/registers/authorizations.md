# Authorization Register

The authoritative list of what work is allowed. Only the Founder can set an authorization to **Active** or **Closed**. Agents may add **Proposed** drafts.

| ID | Phase | Status | Issued | Closed |
| --- | --- | --- | --- | --- |
| AUTH-001 | 00 | **Active: scope complete, awaiting PR disposition** | 2026-11-27 | — |
| AUTH-002 | 01 | Proposed (draft) | — | — |

---

## AUTH-001

- **Source:** Executive Directive 001, Project Foundation and Development Governance
- **Issued:** 2026-11-27 by the Founder and Executive Authority
- **Scope (exactly as authorized):**
  1. Inspect the new repository and the current development environment.
  2. Establish the initial repository baseline.
  3. Identify existing files, configuration, permissions and environmental limitations.
  4. Create the foundational governance documentation.
  5. Create the initial project README and CLAUDE.md.
  6. Establish an authorization and decision-record structure.
  7. Document the proposed development lifecycle.
  8. Prepare a strategic discovery plan for Phase 01.
  9. Perform non-destructive verification of the documentation changes.
  10. Prepare a documentation-only branch and pull request, where existing permissions permit.
- **Exclusions:** application scaffolding, framework installation, website implementation, external research, production configuration, infrastructure provisioning, deployment, merging, and everything in [04 §2](../docs/04-security-and-isolation.md#2-prohibited-without-separate-written-authorization).
- **Clarification recorded in this session:** the Founder chose to place the documentation in an isolated `spotlight/` directory of `chris-pribyl` ([DEC-001](decisions.md#dec-001)).
- **Closure condition:** the Founder approves or rejects the Phase 00 PR and records the Phase 00 exit.

---

## AUTH-002 (Proposed)

> Draft for Founder review. **Not in effect.**

- **Phase:** 01, Strategic Discovery and Competitive Intelligence
- **Proposed scope:**
  1. Run the [Phase 01 plan](../docs/06-phase-01-discovery-plan.md), Workstreams A–F.
  2. Read-only access to public web sources, including public pages of the existing Spotlight website and of competitor websites, within the plan's constraints.
  3. Create documentation under `spotlight/discovery/` and update the registers, STATUS.md and handoffs.
  4. Use up to three parallel research agents after Workstream A.
  5. Prepare a documentation-only PR.
- **Proposed exclusions:** everything AUTH-001 excludes, apart from public web research. In addition: no paid tools; no access to analytics, Search Console, CRM or other private company data; no contact with any external party; no creative work; no application code.
- **Requires before activation:** the Phase 00 exit is approved; [OPEN-001](open-items.md#open-001) is resolved or accepted as deferred; the Founder intake is scheduled.
- **Optional supplements** (each one separately): AUTH-002-a for read-only analytics or Search Console access; AUTH-002-b for a named paid keyword-research tool within a stated budget.

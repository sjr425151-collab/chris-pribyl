# Decision Register

The format is in [governance §4](../docs/01-governance.md#4-decision-records). Records are never deleted. A reversed decision is marked *Superseded*.

| ID | Title | Status | Date |
| --- | --- | --- | --- |
| DEC-001 | Interim home for project documentation | **Approved** (interim) | 2026-11-27 |
| DEC-002 | Documentation hierarchy and sources of authority | Proposed | 2026-11-27 |
| DEC-003 | Governance sized to the website's risk profile | Proposed | 2026-11-27 |
| DEC-004 | Defer CI, dependency tooling and stack choice to Phase 04 | Proposed | 2026-11-27 |

---

## DEC-001

**Interim home for project documentation**. Status: **Approved (interim)**. Date: 2026-11-27. Approver: the Founder (answered in the AUTH-001 session).

- **Context:** The directive names the repository `spotlight-marketing-web`. That repository does not exist among those the session can reach. The only repository available is `sjr425151-collab/chris-pribyl`. Its default branch holds the unrelated KINFORM Next.js application, and a second branch holds a Dynamic Construction MI site. Creating a repository is outside AUTH-001.
- **Decision:** Put the Phase 00 documentation in a self-contained `spotlight/` directory on branch `claude/modest-mendel-9cb4m3`. Do not modify any file outside `spotlight/`.
- **Alternatives considered:** (a) Stop until the dedicated repository exists. That would deliver nothing now. (b) Replace the root README and add a root CLAUDE.md. That would pass Spotlight off as the KINFORM project, and merging would damage KINFORM's documentation.
- **Consequences:** The root `AGENTS.md` and `README.md` (KINFORM) remain visible to agents. A Claude Code session started at the repository root will not load `spotlight/CLAUDE.md` automatically until it works inside `spotlight/` ([OPEN-015](open-items.md#open-015)). Merging this PR into the KINFORM default branch would mix projects ([OPEN-002](open-items.md#open-002)).
- **Ends when:** `spotlight-marketing-web` is created and the contents of `spotlight/` become its root ([OPEN-001](open-items.md#open-001)).

## DEC-002

**Documentation hierarchy and sources of authority**. Status: Proposed. Date: 2026-11-27.

- **Decision:** Each topic has exactly one authoritative document (the [README map](../README.md#documentation-map)). The order of precedence is: directive and authorization register, then the decision register, then the authoritative docs, then handoffs. STATUS.md is the single current-state record.
- **Alternatives:** a single large governance document, which is hard to keep current; a wiki outside the repository, which breaks continuity across sessions.
- **Consequences:** Changing a requirement means editing one file. Cross-links have to be maintained.

## DEC-003

**Governance sized to the website's risk profile**. Status: Proposed. Date: 2026-11-27.

- **Decision:** Use lightweight controls: Founder merge approval, branch-per-package, evidence-based PRs and registers, with independent review added from Phase 04. Do not copy the Client Portal's governance.
- **Rationale:** The directive says controls must be proportionate. In its current scope the site handles no payments, authentication or client data.
- **Revisit when:** forms, analytics or integrations add personal data or external dependencies (Phases 04 and 06).

## DEC-004

**Defer CI, dependency tooling and stack choice to Phase 04**. Status: Proposed. Date: 2026-11-27.

- **Decision:** Phase 00 has no CI, linters, package manifests or framework. The KINFORM Next.js stack in the host repository has **no bearing** on this project's stack.
- **Rationale:** AUTH-001 forbids framework installation, and stack choices need the Phase 02 and 03 inputs.

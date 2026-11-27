# 01 — Governance, Authorization and Execution Controls

**Status:** §1 is Approved (from the directive). §2–§5 are Proposed in Phase 00 and become Approved when the Founder accepts the Phase 00 PR ([DEC-002](../registers/decisions.md#dec-002)).

These controls are sized to a corporate marketing website. It has no payments, no client data and no authentication of its own, so it does **not** copy the Client Portal's governance. Tighten them in Phase 04 if the risk profile changes (for example, forms that collect personal data).

## 1. Authority structure

| Role | Holder | Authority |
| --- | --- | --- |
| **Founder and Executive Authority** | Founder, Spotlight Marketing LLC | Final say on positioning, commercial offerings, pricing, brand identity, contractual commitments, infrastructure spend, external integrations and production deployment. Issues authorizations. Merges PRs. |
| **Executive Project Direction** | As the Founder designates ([OPEN-007](../registers/open-items.md#open-007)) | Strategic direction, specification review, architectural oversight, risk assessment, authorization recommendations, quality governance. |
| **Engineering and Execution** | AI agents and engineers | Research, recommendations, implementation, testing, documentation and evidence-based reporting, **only within authorized boundaries**. |

Engineering may **recommend** anything. It may **decide** only implementation details that fall inside an approved specification and change no item in the Founder's list above.

## 2. Authorization model

- Work happens only under a numbered authorization (`AUTH-NNN`) in the [authorization register](../registers/authorizations.md).
- Each authorization states its **scope** (what is allowed), its **exclusions**, its **deliverables**, its **constraints** (budget, tools, network, data access) and its **expiry or closure condition**.
- A phase gate ([02-lifecycle](02-lifecycle.md)) needs a new authorization. Approving a phase's deliverables does **not** authorize the next phase.
- A narrow, time-boxed **supplementary authorization** (`AUTH-NNN-a`) may extend an active one, for example to allow one external tool.
- If the scope is ambiguous, treat the work as not authorized. Raise an open item and ask.
- Agents may draft a proposed authorization (status `Proposed`). Only the Founder can make one `Active`.

## 3. Record status taxonomy

Every requirement, statement or record carries one of these labels.

| Label | Meaning | Who can set it |
| --- | --- | --- |
| **Approved** | Accepted by the Founder in a directive, an authorization, a decision record or a merged PR | Founder |
| **Proposed** | A recommendation that has not been approved | Anyone |
| **Assumption** | Believed true but not verified. Must name what would confirm it | Anyone |
| **Open** | A decision or question waiting on someone. Tracked in open items | Anyone |
| **Finding** | Something observed during work, with its source | Engineering |
| **Verified** | Confirmed by reproducible evidence (a command, a test, a measurement or a source) recorded alongside it | Engineering, then independently checked where required |
| **Superseded** | Replaced. Must link to the record that replaced it | Whoever records the replacement |

Silently promoting *Proposed* to *Approved* is a governance violation.

## 4. Decision records

- Kept in [registers/decisions.md](../registers/decisions.md) as `DEC-NNN`, one entry each. Fields: date, status, context, decision, alternatives considered, consequences, approver.
- Decision records are never deleted. To reverse a decision, write a new record and mark the old one *Superseded*.
- Record a decision when it affects architecture, scope, cost, brand, content policy, security or process, or when it would be costly to reverse.

## 5. Execution controls

| Control | Rule |
| --- | --- |
| **Branch isolation** | One branch for each work package. No direct commits to the default branch. Agents push only to their assigned branch. |
| **Pull requests** | Each PR states its authorization ID, its scope, the files changed, the verification evidence, open items, and whether it touches anything outside scope. Keep PRs small enough to review in one sitting. |
| **Review** | The Founder approves every merge. From Phase 04 on, code PRs also need an **independent review**: a separate agent session or a human reviewer, briefed only with the diff and the spec, not the author's conclusions. Self-review alone is never acceptance. |
| **Merging** | Founder only. Agents never merge, enable auto-merge or close another party's PR. |
| **Continuous integration** | Not set up in Phase 00, because no code exists. CI is defined in Phase 04 and is required before the first Phase 05 code merge: typecheck, lint, tests, build, accessibility and performance budgets. |
| **Test evidence** | Results go in the PR or handoff exactly as produced: the command, the output summary, pass or fail, and the date. "Expected to pass" is not evidence. |
| **Dependencies** | None in Phase 00. From Phase 04: a committed lockfile, exact or locked versions, every new dependency justified in the PR, automated vulnerability scanning, and no package published within the last 14 days without review. |
| **Secrets** | See [04-security-and-isolation §4](04-security-and-isolation.md#4-secret-handling). |
| **Change management** | Changing an approved requirement takes a decision record plus Founder approval. Changing scope takes a new or amended authorization. |
| **Parallel agents** | Allowed only for work packages with separate file ownership and explicit dependencies, each on its own branch. A single coordinator owns STATUS.md and the registers. Workers propose register entries in their handoff, and the coordinator merges them in. No two agents work on the same research question. |
| **Conflict prevention** | A work package declares the files and directories it owns. Rebase or merge from the base branch before opening a PR. If two packages need the same file, run them one after the other. |
| **Failure recovery** | On a failed step, stop, record what failed and what was observed, and do not retry destructive or outward-facing actions. Report the failure plainly. Commits at checkpoints let work restart from the last good state. |
| **Rollback** | Documentation: revert the commit. Code (Phase 05+): every merge must be revertible on its own. Production (Phase 08): the rollback plan is a launch acceptance criterion, and the existing site stays restorable until the Founder signs off. |
| **Independent verification** | Phase 07 is carried out by a party other than the Phase 05 implementers. |
| **Resource efficiency** | Brief subagents narrowly. Do not duplicate research. Wait on events rather than polling. No paid tools or services without authorization. |

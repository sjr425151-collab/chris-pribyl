# Open-Item Register

Unresolved decisions, risks and blockers. **Owner:** `exec` means a Founder decision is needed; `eng` means engineering can resolve it within an authorization. **Blocking** names the phase or action it blocks.

| ID | Item | Owner | Blocking | Status |
| --- | --- | --- | --- | --- |
| OPEN-001 | Dedicated repository `spotlight-marketing-web` does not exist | exec | Phase 01 start (recommended); Phase 04 hard block | Open |
| OPEN-002 | PR base branch and merge target in the host repository | exec | Phase 00 exit | Open |
| OPEN-003 | Branch protection and repository settings for the dedicated repository | exec | Phase 05 | Open |
| OPEN-004 | Hosting and infrastructure provider and budget | exec | Phase 04 | Open |
| OPEN-005 | Existing public website: URL, platform, owner, access | exec | Phase 01 (WS-B); Phase 08 | Open |
| OPEN-006 | Phase 01 authorization (AUTH-002) and Founder intake | exec | Phase 01 | Open |
| OPEN-007 | Who holds the Executive Project Direction role, and who reviews independently | exec | Phase 04 | Open |
| OPEN-008 | Target markets and jurisdictions (privacy and consent obligations) | exec | Phase 04 | Open |
| OPEN-009 | Existing brand assets and whether any must be kept | exec | Phase 03 | Open |
| OPEN-010 | Browser and device support matrix | eng | Phase 04 | Open |
| OPEN-011 | Lighthouse "representative test conditions" | eng | Phase 04 | Open |
| OPEN-012 | Business KPIs and the "qualified opportunity" definition | exec | Phase 02 | Open |
| OPEN-013 | Services, pricing and commitments the site may state publicly | exec | Phase 02 | Open |
| OPEN-014 | Agent access to analytics, Search Console or CRM data | exec | Phase 01 (optional) | Open |
| OPEN-015 | Unrelated root `AGENTS.md`/`README.md` visible to agents in the host repository | eng | Resolved by OPEN-001 | Open (mitigated) |
| OPEN-016 | Client Portal repository listed as **public** visibility | exec | None (outside this project) | Open: flagged only |
| OPEN-017 | Legal content: privacy policy, terms, entity details, legal review | exec | Phase 07 | Open |

---

### OPEN-001
The directive names `spotlight-marketing-web`. No repository by that name is reachable from this session, and creating one is outside AUTH-001. **Recommendation:** the Founder creates an empty private repository called `spotlight-marketing-web`, adds it to a new session, and authorizes migrating `spotlight/` as its root, keeping the history with `git subtree split`, or as a fresh initial commit.

### OPEN-002
The host repository's default branch is `claude/kinform-website-foundation-nwlb0a`, which is the KINFORM project. No `main` branch exists. A PR has to target an existing branch, so this one targets the default branch. **Recommendation:** treat the PR as the review vehicle only. Do **not** merge Spotlight docs into KINFORM's branch. Approve the content, then migrate it under OPEN-001.

### OPEN-003
Required reviews, status checks, signed commits and secret scanning on the dedicated repository. Agents cannot change these settings, so the Founder must apply them.

### OPEN-004
No hosting, CDN, form backend or analytics vendor has been chosen. Any of them may cost money and needs Founder approval (Phase 04 proposal).

### OPEN-005
The directive says the existing public website must stay operational, but it does not say its address, platform or access holder. Assumption: it currently serves `spotlight-marketing.co`. This needs confirming.

### OPEN-006
See the [AUTH-002 draft](authorizations.md#auth-002-proposed) and the [Phase 01 inputs](../docs/06-phase-01-discovery-plan.md#3-inputs-required-from-the-founder-blocking).

### OPEN-007
The directive defines the Executive Project Direction role but does not say who holds it. Independent verification also needs a reviewer other than the implementing agent.

### OPEN-008
Consent and privacy requirements depend on where visitors and clients are, for example US states and the EU or UK.

### OPEN-009
An existing logo, colors or guidelines? Do they constrain Phase 03, or is a full identity review allowed?

### OPEN-010
Engineering proposes the browser and device support matrix in Phase 04, and the Founder approves it.

### OPEN-011
Engineering proposes the Lighthouse test conditions in Phase 04: device profile, throttling, number of runs, median reporting and the pages tested. The Founder approves them.

### OPEN-012
The Founder decides the business KPIs and what counts as a *qualified opportunity*. Targets are set from Phase 01 baselines.

### OPEN-013
This is a Founder commercial decision. The site must not state a service, price or commitment the Founder has not approved.

### OPEN-014
Optional. It would add a measured baseline to Phase 01. It needs credentials through a secure channel and a supplementary authorization.

### OPEN-015
Mitigated by [CLAUDE.md §0](../CLAUDE.md#0-repository-context-read-first). A session started at the repository root sees the KINFORM `AGENTS.md` first. Sessions for this project must work inside `spotlight/` until OPEN-001 is resolved.

### OPEN-016
**Finding:** the session's repository listing (metadata only, the repository was not opened) shows `sjr425151-collab/spotlight-client-portal` with visibility `public`. That may be intended. It is outside this project and not acted on. Flagged for Founder awareness, since a client portal's source is usually private.

### OPEN-017
Privacy policy, terms, the legal entity's name and address, and cookie notices need legal authorship or review. Agents should not draft them as final.

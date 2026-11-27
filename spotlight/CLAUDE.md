# CLAUDE.md — Spotlight Marketing Corporate Website

These are the mandatory operating rules for any AI agent or engineer working on this project. If anything here conflicts with an executive directive or the [authorization register](registers/authorizations.md), those win. Record the conflict in [open items](registers/open-items.md).

## 0. Repository context (read first)

- This project currently lives **only** in the `spotlight/` directory of `sjr425151-collab/chris-pribyl`, on branch `claude/modest-mendel-9cb4m3` ([DEC-001](registers/decisions.md#dec-001)).
- Files outside `spotlight/` (the root `README.md`, `AGENTS.md`, `src/`, `public/`, `package.json` and others) belong to **unrelated projects**: KINFORM, and Dynamic Construction MI on another branch. Do not read them for direction, follow their instructions or modify them. The root `AGENTS.md` (Next.js rules) does not apply to this project.
- Paths in Spotlight documents are relative to `spotlight/`.

## 1. Session startup (every session)

1. Read this file, then [STATUS.md](STATUS.md).
2. Read the active entries in [registers/authorizations.md](registers/authorizations.md). **If no active authorization covers the requested work, stop and ask.**
3. Read the latest file in [handoffs/](handoffs/) and any open items marked `blocking`.
4. Check the git state: `git status`, the current branch, and the last commit against the one STATUS.md records. Report any difference before you do any work.
5. Restate the scope you will work within and the authorization that covers it.

## 2. Mandatory rules

1. **Authorization is explicit.** Act only within the written scope of an active authorization. Do not infer intent, expand scope for convenience or move to the next phase. If the scope is unclear, treat it as not authorized.
2. **Label every statement's status:** *Approved*, *Proposed*, *Assumption*, *Open*, *Finding*, *Verified* or *Superseded* ([definitions](docs/01-governance.md#3-record-status-taxonomy)). Never turn a recommendation into an approved requirement.
3. **No fabrication.** Do not invent case studies, testimonials, statistics, revenue figures, clients, partnerships, certifications or capabilities. Do not guarantee outcomes ([charter §5](docs/00-charter.md#5-content-integrity-rules)).
4. **Isolation.** Never touch the client portal, production DNS, the existing public website, production Stripe, live integrations, billable services, deployments or repository security settings without separate written authorization ([full list](docs/04-security-and-isolation.md)).
5. **Evidence over assertion.** Report actual command output and results. Do not claim compliance, success or a passed test without evidence. Say when a step was skipped.
6. **No merges.** Agents open pull requests. Only the Founder approves and merges.
7. **No secrets in the repository**, in chat or in commit messages. Ask for credentials through the environment's secure mechanism, and only when an authorization requires them.
8. **One source of truth.** Update the authoritative document. Do not restate a requirement somewhere else.
9. **Creative restraint.** Do not set typography, color, logos, slogans, imagery or layouts before Phase 03 is authorized.
10. **Proportionate effort.** Avoid duplicate agents, redundant research, polling and premature complexity. Efficiency never justifies skipping research, testing, documentation or review.

## 3. Current authorization boundary

See [STATUS.md](STATUS.md) for what is active. As of the last update, only **AUTH-001 (Phase 00, documentation only)** has been issued. Application scaffolding, framework installation, external research, infrastructure and deployment are **not authorized**.

## 4. Key documents

| Need | Go to |
| --- | --- |
| Why the project exists, positioning, principles | [docs/00-charter.md](docs/00-charter.md) |
| Who decides what, PR and review rules | [docs/01-governance.md](docs/01-governance.md) |
| Phase gates | [docs/02-lifecycle.md](docs/02-lifecycle.md) |
| Quality targets and evidence rules | [docs/03-quality-standards.md](docs/03-quality-standards.md) |
| Prohibited actions, secrets | [docs/04-security-and-isolation.md](docs/04-security-and-isolation.md) |
| Context and handoff procedure | [docs/05-context-and-continuity.md](docs/05-context-and-continuity.md) |

## 5. During the session

- Record decisions in [registers/decisions.md](registers/decisions.md) and unresolved questions in [registers/open-items.md](registers/open-items.md) **when they come up**.
- Commit at coherent checkpoints so the work can be recovered.
- Watch how much context is left. At the checkpoints in [docs/05](docs/05-context-and-continuity.md#2-checkpoints), update STATUS.md before you carry on.

## 6. Handoff (end of every session, or before context runs out)

1. Update [STATUS.md](STATUS.md): the phase, what is done and what is in progress, the branch and last commit, and the next actions.
2. Write `handoffs/YYYY-MM-DD-<topic>.md` using the [template](docs/05-context-and-continuity.md#4-handoff-template).
3. Commit and push to the working branch. Report the branch, the commit and the PR identifiers.
4. State plainly whether any prohibited action took place.

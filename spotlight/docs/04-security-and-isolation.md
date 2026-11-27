# 04 — Security and Environment Isolation

**Status:** §1–§3 are Approved (from the directive). §4–§5 are Proposed.

## 1. System boundaries

| System | Address | Relationship to this project |
| --- | --- | --- |
| Corporate website (this project) | `spotlight-marketing.co` (future) | In scope |
| Spotlight Client Portal | `portal.spotlight-marketing.co` | **Separate system. Off-limits.** |
| Existing public website | Current production site ([OPEN-005](../registers/open-items.md#open-005)) | Must stay operational until a production migration is authorized. Off-limits except for read-only public viewing under an authorization that allows it |
| Host repository `chris-pribyl` | GitHub | Interim home. Only `spotlight/` is in scope ([DEC-001](../registers/decisions.md#dec-001)) |

## 2. Prohibited without separate written authorization

- Accessing or modifying the client portal repository, its databases or its credentials
- Modifying production DNS records
- Replacing or changing the existing public website
- Creating live external integrations
- Accessing production Stripe resources
- Sending external communications (email, forms, messages or social posts on the company's behalf)
- Purchasing services or creating billable infrastructure
- Deploying to production
- Modifying repository security settings or permissions
- Expanding network access or environment privileges
- **Interim addition (DEC-001):** modifying any file outside `spotlight/` in the host repository

## 3. No duplicate infrastructure

The website must not build its own authentication, payment processing, client onboarding or fulfillment. Any future link to the client portal, even just a "Client login" link, needs its own specification and authorization (Phase 06).

## 4. Secret handling

1. No secrets in the repository, issues, PRs, commit messages, chat, logs or screenshots.
2. Credentials are supplied only through the hosting or environment secret store, and only when an active authorization requires them.
3. From Phase 04 on, commit only an example environment file that contains placeholder names, never values. Git-ignore every real environment file.
4. From the moment the dedicated repository exists, keep secret scanning on. Changing that setting needs Founder action.
5. If a secret is exposed, stop, tell the Founder, and assume it is compromised until it is rotated.

## 5. Data and privacy (Proposed baseline)

- Phase 00 and Phase 01 handle no personal data. Phase 01 research uses public sources only, unless the Founder authorizes access to company data.
- Any future form, analytics or integration needs a data inventory: what is collected, why, where it is stored, how long it is kept and who can access it. A privacy review comes before the Phase 06 authorization.

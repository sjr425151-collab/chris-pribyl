# 05 — Context Management and Session Continuity

**Status:** Proposed.

Agent sessions have finite context windows and run in containers that may be reclaimed. Project state must therefore live **in the repository**, never only in a conversation.

## 1. Authoritative state

| State | Where it lives |
| --- | --- |
| The current phase, authorization, work in progress and next actions | [STATUS.md](../STATUS.md) |
| Authorizations | [registers/authorizations.md](../registers/authorizations.md) |
| Decisions | [registers/decisions.md](../registers/decisions.md) |
| Unresolved items | [registers/open-items.md](../registers/open-items.md) |
| What happened in a session | `handoffs/YYYY-MM-DD-<topic>.md` |

If a conversation summary disagrees with these files, the files win. Report the disagreement.

## 2. Checkpoints

Update STATUS.md and commit at each of these points:

- a deliverable is completed;
- about **60% of the context** is used: write a checkpoint and drop file contents you no longer need from your working set;
- about **80%**: stop new work, write the full handoff, then commit and push;
- before any long-running or risky step;
- whenever the session is about to end or go idle.

If the context is summarized automatically, re-read STATUS.md and the latest handoff before you continue. Treat the summary as a pointer, not as authority.

## 3. Context efficiency

- Read only the parts of files you need. Delegate broad searches to subagents that return conclusions rather than file dumps.
- Do not paste large outputs into documents. Summarize them and point to the source.
- Avoid repeating research: check the registers and handoffs first.

## 4. Handoff template

```markdown
# Handoff — <date> — <topic>
- Authorization: AUTH-NNN   Phase: NN   Branch: <name>   Last commit: <sha>   PR: <link or none>
## Completed (with evidence)
## In progress / not finished
## Decisions made (DEC IDs) and open items raised (OPEN IDs)
## Verification performed and actual results
## Risks and blockers
## Next actions (and who owns each)
## Prohibited actions: none occurred / <describe>
```

## 5. Safe continuation and recovery

1. A new session follows the [CLAUDE.md startup procedure](../CLAUDE.md#1-session-startup-every-session).
2. If the branch or commit differs from what STATUS.md says, stop and reconcile before you work. Do not overwrite work you did not author.
3. If uncommitted work from a previous session is lost, rebuild it from the handoff. Do not guess.

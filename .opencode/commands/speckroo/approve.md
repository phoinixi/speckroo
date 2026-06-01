---
description: Record human approval of a phase so the next may run.
---

# approve — record human approval (no persona; orchestration only)

Follow the workflow contract in `.framework/workflow.md`. Arguments: $ARGUMENTS —
first token is the phase (`spec` | `design` | `monetize` | `plan`), optional
second token is the feature slug (else use the active feature). Echo
`Approving <phase> for feature: <slug>`.

Only do this when the human has explicitly approved the artifact.

Map the phase to its file(s) under `.framework/<slug>/`:
- `spec` → `spec.md`
- `design` → `design.md`
- `monetize` → `monetization.md`
- `plan` → `plan.md` **and** `tasks.md` (both together)

In each file, replace `> Status: draft` with `> Status: approved`. For
`monetize`, use `> Status: n/a` if the human says it's not applicable.

Confirm what changed and name the next phase. Never approve on the agent's
behalf, and never run the next phase yourself.

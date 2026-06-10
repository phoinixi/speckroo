# approve — explicit fallback: record human approval (no persona; orchestration only)

Follow the workflow contract in `.framework/workflow.md`. Arguments: $ARGUMENTS —
first token is the phase (`spec` | `design` | `shape` | `monetize` | `plan`),
optional second token is the feature slug (else use the active feature). Echo
`Approving <phase> for feature: <slug>`.

Use this command when you want to approve explicitly rather than via the
end-of-phase inline prompt. Only run it when the human has explicitly approved
the artifact.

Map the phase to its file(s) under `.framework/<slug>/`:
- `spec` → `spec.md`
- `design` → `design.md`
- `shape` → `spec.md` **and** `design.md` (both together)
- `monetize` → `monetization.md`
- `plan` → `plan.md` **and** `tasks.md` (both together)

In each file, replace `> Status: draft` with `> Status: approved`. For
`monetize`, use `> Status: n/a` if the human says it's not applicable.

Confirm what changed and name the next phase. Never approve on the agent's
behalf, and never run the next phase yourself.

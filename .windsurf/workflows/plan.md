---
description: Phase 2 — Software Engineer drafts plan.md + tasks.md.
---

# plan — architect and break down the work (software-engineer → plan.md + tasks.md)

Follow the workflow contract in `.framework/workflow.md`. Feature: $ARGUMENTS
(if empty, use the active feature). Echo `Operating on feature: <slug>`.

1. Gate check: `.framework/<slug>/spec.md` must read `> Status: approved` (hard
   dependency). If `design.md` exists it must be `approved`; if
   `monetization.md` exists it must be `approved` or `n/a`. Any required
   artifact missing or `draft` → STOP and tell the human what to approve.
2. Seed `.framework/<slug>/plan.md` and `tasks.md` from their templates if they
   do not exist yet.
3. Adopt the **software-engineer** role in PLAN mode
   (`.framework/personas/software-engineer.md`) and produce `plan.md` + `tasks.md`.

Produce only `plan.md` + `tasks.md`, then return a summary and end with:
> Approve plan and continue to /build? (yes / revise <notes> / stop)

On "yes": replace `> Status: draft` with `> Status: approved` in both
`plan.md` and `tasks.md`, then run the build phase (adopt software-engineer
in BUILD mode, implement all unchecked tasks, return one review summary).

On "revise <notes>": incorporate the notes and re-draft; do not flip Status.

On "stop": confirm Status remains draft and return control to the human.

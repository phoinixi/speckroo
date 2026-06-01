# plan — architect and break down the work (software-engineer → plan.md + tasks.md)

Follow the workflow contract in `core/workflow.md`. Feature: $ARGUMENTS
(if empty, use the active feature). Echo `Operating on feature: <slug>`.

1. Gate check: `.framework/<slug>/spec.md` must read `> Status: approved` (hard
   dependency). If `design.md` exists it must be `approved`; if
   `monetization.md` exists it must be `approved` or `n/a`. Any required
   artifact missing or `draft` → STOP and tell the human what to approve.
2. Seed `.framework/<slug>/plan.md` and `tasks.md` from their templates if they
   do not exist yet.
3. Adopt the **software-engineer** role in PLAN mode
   (`core/personas/software-engineer.body.md`) and produce `plan.md` + `tasks.md`.

Produce only `plan.md` + `tasks.md`, then STOP. Tell the human to review and
approve the plan before build.

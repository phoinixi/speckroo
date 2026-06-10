---
description: Granular Phase 1b — Product Designer drafts design.md from an approved spec.
---

# design — design the experience (granular alternative to /shape)

Follow the workflow contract in `.framework/workflow.md`. Feature: $ARGUMENTS
(if empty, use the active feature). Echo `Operating on feature: <slug>`.

Use `/shape` for the default flow (drafts spec + design together). Use
`/design` when you want to draft and review `design.md` separately after
an already-approved `spec.md`.

1. Gate check: `.framework/<slug>/spec.md` must read `> Status: approved`. If
   missing or still `draft`, STOP and tell the human to approve the spec first.
2. Seed `.framework/<slug>/design.md` from the template if it does not exist yet.
3. Adopt the **product-designer** role (`.framework/personas/product-designer.md`)
   and fill `design.md`.

Produce only `design.md`, then return a summary and end with:
> Approve design and continue to /plan? (yes / revise <notes> / stop)

On "yes": replace `> Status: draft` with `> Status: approved` in `design.md`,
then run the plan phase (gate-check, seed plan/tasks templates, adopt
software-engineer in PLAN mode, produce plan.md + tasks.md, end with plan
approval prompt).

On "revise <notes>": incorporate the notes and re-draft; do not flip Status.

On "stop": confirm Status remains draft and return control to the human.

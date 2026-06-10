---
description: Optional phase — Monetization Strategist drafts monetization.md.
---

# monetize — define the money model (optional; monetization-strategist → monetization.md)

Follow the workflow contract in `.framework/workflow.md`. Feature: $ARGUMENTS
(if empty, use the active feature). Echo `Operating on feature: <slug>`. Skip
this phase entirely for features with no revenue angle.

1. Gate check: `.framework/<slug>/spec.md` must read `> Status: approved`. If
   missing or still `draft`, STOP and tell the human to approve the spec first.
2. Seed `.framework/<slug>/monetization.md` from the template if it does not
   exist yet.
3. Adopt the **monetization-strategist** role
   (`.framework/personas/monetization-strategist.md`) and fill `monetization.md`.

Produce only `monetization.md`, then return a summary and end with:
> Approve monetization and continue to /plan? (yes / mark n/a / revise <notes> / stop)

On "yes": replace `> Status: draft` with `> Status: approved` in
`monetization.md`, then run the plan phase.

On "mark n/a": replace `> Status: draft` with `> Status: n/a` in
`monetization.md`, then run the plan phase.

On "revise <notes>": incorporate the notes and re-draft; do not flip Status.

On "stop": confirm Status remains draft and return control to the human.

---
description: Phase 4 — Software Engineer turns approved specs into plan.md + tasks.md.
argument-hint: "[feature-slug] (optional; defaults to active feature)"
agent: software-engineer
subtask: true
---

Feature slug: use `$ARGUMENTS` if given, else read `.framework/.active-feature`.
Echo: `Operating on feature: <slug>`.

Gate check: `.framework/<slug>/spec.md` must read `> Status: approved`. If
`design.md` exists it must also be `approved`; if `monetization.md` exists it
must be `approved` or `n/a`. STOP if any required artifact is missing or draft.

Seed `.framework/<slug>/plan.md` and `tasks.md` from templates if missing
(replace `<feature-slug>` placeholder).

Read `.framework/constitution.md` + all approved artifacts. Produce
`plan.md` + `tasks.md`.

Produce only plan.md + tasks.md. Do NOT start building. End with: "plan.md +
tasks.md ready for review — when satisfied, run /speckroo:approve plan, then
/speckroo:build."

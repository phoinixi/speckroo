---
description: Phase 2 — Product Designer drafts design.md from the approved spec.
argument-hint: "[feature-slug] (optional; defaults to active feature)"
agent: product-designer
subtask: true
---

Feature slug: use `$ARGUMENTS` if given, else read `.framework/.active-feature`.
Echo: `Operating on feature: <slug>`.

Gate check: `.framework/<slug>/spec.md` must read `> Status: approved`. If
missing or `draft`, STOP — tell the human to run `/speckroo:discover`, review, then
`/speckroo:approve spec`.

Seed `.framework/<slug>/design.md` from `.framework/templates/design.md` if
missing (replace `<feature-slug>` placeholder).

Read `.framework/constitution.md` + the approved `spec.md`, then fill
`.framework/<slug>/design.md`.

Produce only `design.md`. End with: "design.md ready for review — when
satisfied, run /speckroo:approve design."

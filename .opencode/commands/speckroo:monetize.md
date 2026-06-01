---
description: Phase 3 (optional) — Monetization Strategist drafts monetization.md.
argument-hint: "[feature-slug] (optional; defaults to active feature)"
agent: monetization-strategist
subtask: true
---

Feature slug: use `$ARGUMENTS` if given, else read `.framework/.active-feature`.
Echo: `Operating on feature: <slug>`.

Gate check: `.framework/<slug>/spec.md` must read `> Status: approved`. If
missing or `draft`, STOP — tell the human to run `/speckroo:approve spec` first.

Seed `.framework/<slug>/monetization.md` from `.framework/templates/monetization.md`
if missing (replace `<feature-slug>` placeholder).

Read `.framework/constitution.md` + the spec (and design if present), then fill
`.framework/<slug>/monetization.md`.

Produce only `monetization.md`. End with: "monetization.md ready for review —
when satisfied, run /speckroo:approve monetize."

---
description: Phase 5 — Software Engineer implements ONE task from tasks.md, then stops.
argument-hint: "[feature-slug] (optional; defaults to active feature)"
agent: software-engineer
subtask: true
---

Feature slug: use `$ARGUMENTS` if given, else read `.framework/.active-feature`.
Echo: `Operating on feature: <slug>`.

Gate check: both `.framework/<slug>/plan.md` and `tasks.md` must read
`> Status: approved`. STOP if missing or draft — tell the human to run
`/speckroo:plan`, review, then `/speckroo:approve plan`.

Implement exactly ONE unchecked task from `tasks.md` — the next unchecked one.
Check its box when done. Report what changed.

ONE task per run. Do NOT continue. Remind the human to run `/speckroo:build` again
for the next task.

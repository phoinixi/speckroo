---
description: Phase 5 — Software Engineer implements one task, then stops.
agent: software-engineer
subtask: true
---

# build — implement one task (software-engineer → code)

Follow the workflow contract in `.framework/workflow.md`. Feature: $ARGUMENTS
(if empty, use the active feature). Echo `Operating on feature: <slug>`.

1. Gate check: both `.framework/<slug>/plan.md` and `tasks.md` must read
   `> Status: approved`. If either is missing or `draft`, STOP and tell the
   human to approve the plan first.
2. Adopt the **software-engineer** role in BUILD mode
   (`.framework/personas/software-engineer.md`): implement the next unchecked
   task in `tasks.md` — and ONLY that one task — then check its box and report
   what changed.

Exactly one task per run. Do NOT continue to the next task. Tell the human to
review, then run build again for the next task.

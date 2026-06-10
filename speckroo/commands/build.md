---
description: Phase 3 — Software Engineer implements all tasks (or one with 'next'), then summarizes.
argument-hint: "[next] [feature-slug] — 'next' = single-task mode; slug defaults to active feature"
---

# /build — implement tasks

You are dispatching the **software-engineer** subagent to implement tasks from
`tasks.md`.

Argument parsing: if the first token of $ARGUMENTS is `next`, use single-task
mode and treat the remaining token (if any) as the feature slug. Otherwise the
first token (if any) is the slug. Fall back to `.framework/.active-feature`.

Steps:
1. Resolve the feature slug. **Echo it**: `Operating on feature: <slug>`.
2. **Gate check:** both `.framework/<slug>/plan.md` and `tasks.md` must read
   `> Status: approved`. If either is missing or still `draft`, STOP and tell
   the human to run `/plan`, review, then approve.

**Default mode** (no `next` argument):
3. Use the Task tool to invoke the `software-engineer` subagent in BUILD mode.
   Instruct it to implement ALL unchecked tasks in `tasks.md` in order, checking
   each box as it completes. If at any point a task contradicts the plan or
   requires an unresolved assumption, it must stop and raise the issue. When done
   (or blocked), it should return one consolidated review summary.

**Single-task mode** (`next` argument):
3. Use the Task tool to invoke the `software-engineer` subagent in BUILD mode.
   Instruct it to implement the next unchecked task in `tasks.md` — and ONLY
   that one task — then check its box and report what changed.
   Relay what changed and remind the human to review, then run `/build` (or
   `/build next`) for the next task.

_When you name follow-up commands, match the namespace you were invoked with
(e.g. `/speckroo:build next` if installed as a plugin)._

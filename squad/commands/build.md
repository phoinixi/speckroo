---
description: Phase 5 — Software Engineer implements ONE task from tasks.md, then stops.
argument-hint: "[feature-slug] (optional; defaults to active feature)"
---

# /build — implement one task

You are dispatching the **software-engineer** subagent to implement exactly ONE
task from `tasks.md`.

Steps:
1. Resolve the feature: use `$ARGUMENTS` if given, else read
   `.framework/.active-feature`. **Echo it**: `Operating on feature: <slug>`.
2. **Gate check:** both `.framework/<slug>/plan.md` and `tasks.md` must read
   `> Status: approved`. If either is missing or still `draft`, STOP and tell
   the human to run `/plan`, review, then `/approve plan`.
3. Use the Task tool to invoke the `software-engineer` subagent in BUILD mode.
   Instruct it to implement the next unchecked task in `tasks.md` — and ONLY
   that one task — then check its box and report what changed.

GATE: Exactly one task per `/build` run. Do NOT continue to the next task. Relay
what changed and remind the human to review, then run `/build` again for the
next task. Repeat until all tasks are checked.

_When you name follow-up commands, match the namespace you were invoked with
(e.g. `/squad:build` if installed as a plugin)._

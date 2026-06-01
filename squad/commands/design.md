---
description: Phase 2 — Product Designer drafts design.md from the approved spec.
argument-hint: "[feature-slug] (optional; defaults to active feature)"
---

# /design — design the experience

You are dispatching the **product-designer** subagent to produce `design.md`.

Steps:
1. Resolve the feature: use `$ARGUMENTS` if given, else read
   `.framework/.active-feature`. **Echo it**: `Operating on feature: <slug>`.
2. **Gate check:** open `.framework/<slug>/spec.md` and confirm its header reads
   `> Status: approved`. If the file is missing or still `Status: draft`, STOP
   and tell the human to run `/discover`, review it, then `/approve spec`.
3. Seed `.framework/<slug>/design.md` from `.framework/templates/design.md` if it
   does not exist yet (replace the `<feature-slug>` placeholder).
4. Use the Task tool to invoke the `product-designer` subagent. Instruct it to
   read `.framework/constitution.md` + the approved `spec.md`, and fill
   `.framework/<slug>/design.md`.

GATE: Produce only `design.md`. Do NOT auto-run the next phase. Relay the
agent's summary and remind the human to review and run `/approve design` before
moving on (next: `/monetize` if relevant, otherwise `/plan`).

_When you name follow-up commands, match the namespace you were invoked with
(e.g. `/squad:approve` if installed as a plugin)._

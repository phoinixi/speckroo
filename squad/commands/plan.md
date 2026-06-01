---
description: Phase 4 — Software Engineer turns approved specs into plan.md + tasks.md.
argument-hint: "[feature-slug] (optional; defaults to active feature)"
---

# /plan — architect and break down the work

You are dispatching the **software-engineer** subagent to produce `plan.md` and
`tasks.md`.

Steps:
1. Resolve the feature: use `$ARGUMENTS` if given, else read
   `.framework/.active-feature`. **Echo it**: `Operating on feature: <slug>`.
2. **Gate check:** `.framework/<slug>/spec.md` must read `> Status: approved`
   (hard dependency). If `design.md` exists it must also be `approved`; if
   `monetization.md` exists it must be `approved` or `n/a`. A required artifact
   that is missing or still `draft` → STOP and tell the human which `/approve`
   to run. (`design.md`/`monetization.md` are optional — absent is fine.)
3. Seed `.framework/<slug>/plan.md` and `.framework/<slug>/tasks.md` from their
   templates if they do not exist yet (replace the `<feature-slug>` placeholder).
4. Use the Task tool to invoke the `software-engineer` subagent in PLAN mode.
   Instruct it to read `.framework/constitution.md` + all available approved
   artifacts, and produce `.framework/<slug>/plan.md` and
   `.framework/<slug>/tasks.md` — nothing else.

GATE: Produce only `plan.md` + `tasks.md`. Do NOT start building. Relay the
agent's summary and remind the human to review and run `/approve plan` (flips
both files) before running `/build`.

_When you name follow-up commands, match the namespace you were invoked with
(e.g. `/squad:approve` if installed as a plugin)._

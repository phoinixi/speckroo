---
description: Phase 2 — Software Engineer turns approved specs into plan.md + tasks.md.
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
   that is missing or still `draft` → STOP and tell the human which approval to
   run. (`design.md`/`monetization.md` are optional — absent is fine.)
3. Seed `.framework/<slug>/plan.md` and `.framework/<slug>/tasks.md` from their
   templates if they do not exist yet (replace the `<feature-slug>` placeholder).
4. Use the Task tool to invoke the `software-engineer` subagent in PLAN mode.
   Instruct it to read `.framework/constitution.md` + all available approved
   artifacts, and produce `.framework/<slug>/plan.md` and
   `.framework/<slug>/tasks.md` — nothing else.
5. Relay the agent's summary, then ask:
   > Approve plan and continue to /build? (yes / revise <notes> / stop)

On **"yes"**: replace `> Status: draft` with `> Status: approved` in both
`plan.md` and `tasks.md`, then invoke the `software-engineer` subagent in BUILD
mode to implement all unchecked tasks and return one review summary.

On **"revise <notes>"**: incorporate the notes, re-invoke the subagent to
re-draft; do not flip Status.

On **"stop"**: confirm Status remains draft and return control to the human.

_When you name follow-up commands, match the namespace you were invoked with
(e.g. `/speckroo:approve` if installed as a plugin)._

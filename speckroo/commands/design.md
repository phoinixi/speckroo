---
description: Granular Phase 1b — Product Designer drafts design.md from an approved spec (use /shape for the default flow).
argument-hint: "[feature-slug] (optional; defaults to active feature)"
---

# /design — draft design.md alone (granular alternative to /shape)

Use `/shape` for the default flow (spec + design together). Use `/design` when
`spec.md` is already approved and you want to draft design separately.

You are dispatching the **product-designer** subagent to produce `design.md`.

Steps:
1. Resolve the feature: use `$ARGUMENTS` if given, else read
   `.framework/.active-feature`. **Echo it**: `Operating on feature: <slug>`.
2. **Gate check:** open `.framework/<slug>/spec.md` and confirm its header reads
   `> Status: approved`. If the file is missing or still `Status: draft`, STOP
   and tell the human to approve the spec first (via the inline prompt or
   `/approve spec`).
3. Seed `.framework/<slug>/design.md` from `.framework/templates/design.md` if it
   does not exist yet (replace the `<feature-slug>` placeholder).
4. Use the Task tool to invoke the `product-designer` subagent. Instruct it to
   read `.framework/constitution.md` + the approved `spec.md`, and fill
   `.framework/<slug>/design.md`.
5. Relay the agent's summary, then ask:
   > Approve design and continue to /plan? (yes / revise <notes> / stop)

On **"yes"**: replace `> Status: draft` with `> Status: approved` in `design.md`,
then run the plan phase: gate-check, seed plan/tasks templates if absent, invoke
`software-engineer` in PLAN mode, relay summary, ask the plan approval prompt.

On **"revise <notes>"**: incorporate the notes, re-invoke the subagent; do not
flip Status.

On **"stop"**: confirm Status remains draft and return control to the human.

_When you name follow-up commands, match the namespace you were invoked with
(e.g. `/speckroo:approve` if installed as a plugin)._

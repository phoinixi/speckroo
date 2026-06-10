---
description: Optional phase — Monetization Strategist drafts monetization.md.
argument-hint: "[feature-slug] (optional; defaults to active feature)"
---

# /monetize — define the money model (optional)

You are dispatching the **monetization-strategist** subagent to produce
`monetization.md`. This phase is OPTIONAL — skip it for features with no revenue
angle (internal tooling, bug fixes, infra).

Steps:
1. Resolve the feature: use `$ARGUMENTS` if given, else read
   `.framework/.active-feature`. **Echo it**: `Operating on feature: <slug>`.
2. **Gate check:** open `.framework/<slug>/spec.md` and confirm `> Status:
   approved`. If missing or `draft`, STOP and tell the human to approve the spec
   first. (`design.md` is read if present but not required.)
3. Seed `.framework/<slug>/monetization.md` from
   `.framework/templates/monetization.md` if it does not exist yet (replace the
   `<feature-slug>` placeholder).
4. Use the Task tool to invoke the `monetization-strategist` subagent. Instruct
   it to read `.framework/constitution.md` + the spec (and design if present),
   and fill `.framework/<slug>/monetization.md`.
5. Relay the agent's summary, then ask:
   > Approve monetization and continue to /plan? (yes / mark n/a / revise <notes> / stop)

On **"yes"**: replace `> Status: draft` with `> Status: approved`, then run the
plan phase.

On **"mark n/a"**: replace `> Status: draft` with `> Status: n/a`, then run the
plan phase.

On **"revise <notes>"**: incorporate the notes, re-invoke the subagent; do not
flip Status.

On **"stop"**: confirm Status remains draft. (To skip monetization entirely, the
human can just not run this phase — `/plan` treats an absent `monetization.md`
as "skipped.")

_When you name follow-up commands, match the namespace you were invoked with
(e.g. `/speckroo:plan` if installed as a plugin)._

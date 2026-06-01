---
description: Phase 3 (optional) — Monetization Strategist drafts monetization.md.
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
   approved`. If missing or `draft`, STOP and tell the human to `/approve spec`
   first. (`design.md` is read if present but not required.)
3. Seed `.framework/<slug>/monetization.md` from
   `.framework/templates/monetization.md` if it does not exist yet (replace the
   `<feature-slug>` placeholder).
4. Use the Task tool to invoke the `monetization-strategist` subagent. Instruct
   it to read `.framework/constitution.md` + the spec (and design if present),
   and fill `.framework/<slug>/monetization.md`.

GATE: Produce only `monetization.md`. Do NOT auto-run `/plan`. Relay the agent's
summary and remind the human to review and run `/approve monetize`. (To skip
monetization entirely, the human can just not run this phase — `/plan` treats an
absent `monetization.md` as "skipped." If a draft exists, `/approve monetize`
can record it as `n/a`.)

_When you name follow-up commands, match the namespace you were invoked with
(e.g. `/speckroo:approve` if installed as a plugin)._

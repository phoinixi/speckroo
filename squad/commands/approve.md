---
description: Record human approval of a phase's artifact so the next phase may run.
argument-hint: <spec|design|monetize|plan> [feature-slug]
---

# /approve — flip a phase artifact to approved

This is the human gate made machine-checkable. Only run it when the human has
explicitly approved the artifact in chat.

Steps:
1. Parse `$ARGUMENTS`: the first token is the phase
   (`spec` | `design` | `monetize` | `plan`); the optional second token is the
   feature slug. If no slug, read `.framework/.active-feature`.
   **Echo it**: `Approving <phase> for feature: <slug>`.
2. Map the phase to its file(s) under `.framework/<slug>/`:
   - `spec` → `spec.md`
   - `design` → `design.md`
   - `monetize` → `monetization.md`
   - `plan` → `plan.md` **and** `tasks.md` (approve both together)
3. In each target file, replace the `> Status: draft` line with
   `> Status: approved`. (For `monetize`, if the human said it's not applicable,
   use `> Status: n/a` instead.)
4. Confirm what changed and tell the human the next command they can now run:
   - spec approved → `/design` (or `/monetize` / `/plan`)
   - design approved → `/monetize` or `/plan`
   - monetize approved → `/plan`
   - plan approved → `/build`

Do NOT approve on the agent's behalf or without explicit human say-so. Do NOT
run the next phase yourself.

_When you name the next command, match the namespace you were invoked with
(e.g. `/squad:design` if installed as a plugin)._

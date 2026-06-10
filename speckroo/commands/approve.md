---
description: Explicit fallback — record human approval of a phase so the next may run.
argument-hint: <spec|design|shape|monetize|plan> [feature-slug]
---

# /approve — explicit approval fallback

This is the explicit fallback gate. The normal path is answering "yes" to the
end-of-phase inline prompt. Use `/approve` when you want to approve explicitly
in a separate step, or when using a tool that doesn't support inline continuation.

Only run it when the human has explicitly approved the artifact.

Steps:
1. Parse `$ARGUMENTS`: the first token is the phase
   (`spec` | `design` | `shape` | `monetize` | `plan`); the optional second token
   is the feature slug. If no slug, read `.framework/.active-feature`.
   **Echo it**: `Approving <phase> for feature: <slug>`.
2. Map the phase to its file(s) under `.framework/<slug>/`:
   - `spec` → `spec.md`
   - `design` → `design.md`
   - `shape` → `spec.md` **and** `design.md` (both together)
   - `monetize` → `monetization.md`
   - `plan` → `plan.md` **and** `tasks.md` (approve both together)
3. In each target file, replace the `> Status: draft` line with
   `> Status: approved`. (For `monetize`, if the human said it's not applicable,
   use `> Status: n/a` instead.)
4. Confirm what changed and tell the human the next command they can now run:
   - spec approved → `/design` (or `/plan`)
   - design approved → `/monetize` or `/plan`
   - shape approved → `/plan`
   - monetize approved → `/plan`
   - plan approved → `/build`

Do NOT approve on the agent's behalf or without explicit human say-so. Do NOT
run the next phase yourself.

_When you name the next command, match the namespace you were invoked with
(e.g. `/speckroo:plan` if installed as a plugin)._

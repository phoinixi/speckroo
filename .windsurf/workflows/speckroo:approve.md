# speckroo:approve — flip a phase artifact to approved

Phase and optional slug: $ARGUMENTS

Only run when the human has explicitly approved.

Steps:
1. Parse $ARGUMENTS: first token is phase (`spec` | `design` | `monetize` | `plan`); optional second is feature slug (default: `.framework/.active-feature`). Echo: `Approving <phase> for feature: <slug>`.
2. Map phase to files under `.framework/<slug>/`:
   - `spec` → `spec.md`
   - `design` → `design.md`
   - `monetize` → `monetization.md`
   - `plan` → `plan.md` **and** `tasks.md`
3. In each target file, replace `> Status: draft` with `> Status: approved`. (For `monetize`, use `n/a` if not applicable.)
4. Confirm and state next command:
   - spec → `/speckroo:design` (or `/speckroo:monetize` / `/speckroo:plan`)
   - design → `/speckroo:monetize` or `/speckroo:plan`
   - monetize → `/speckroo:plan`
   - plan → `/speckroo:build`
5. Never approve without explicit human say-so. Never run the next phase.

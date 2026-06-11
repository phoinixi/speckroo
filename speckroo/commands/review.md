---
description: Phase 4 — Code Reviewer adversarially checks the build against spec. Writes review.md. Informational, no gate.
argument-hint: "[feature-slug] (optional; defaults to active feature)"
---

# /review — adversarial build verification

You are dispatching the **code-reviewer** subagent to verify the finished
build against the spec, design, plan, and skill.md.

Steps:
1. Resolve the feature: use `$ARGUMENTS` if given, else read
   `.framework/.active-feature`. **Echo it**: `Operating on feature: <slug>`.
2. **Gate check:** `.framework/<slug>/tasks.md` must exist and all tasks must
   be checked. If any task is unchecked, STOP and say "Run /build to complete
   remaining tasks first."
3. Seed `.framework/<slug>/review.md` from `.framework/templates/review.md`
   if it does not exist (replace the `<feature-slug>` placeholder). If it
   already exists, note that you are producing a fresh review.
4. Use the Task tool to invoke the `code-reviewer` subagent. Instruct it to:
   - Read `.framework/constitution.md`, `.framework/skill.md` (if present)
   - Read the feature's `spec.md`, `design.md` (if present), `plan.md`, `tasks.md`
   - Read any code files changed by the build
   - Write `.framework/<slug>/review.md` with structured findings and set
     `> Status: complete` when done.
5. Relay the verdict: N blockers / M warnings / P notes. If blockers exist,
   recommend against shipping until they are resolved.

This command is informational — it does not block any phase. `/loop`
auto-chains to review after every build; it may also be run manually.

_When you name follow-up commands, match the namespace you were invoked with
(e.g. `/speckroo:review` if installed as a plugin)._

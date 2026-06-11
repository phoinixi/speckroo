---
description: Phase 4 — Code Reviewer adversarially checks the build against spec. Writes review.md.
---

# review — adversarial build verification (code-reviewer)

Follow the workflow contract in `.framework/workflow.md`. Arguments: $ARGUMENTS —
optional feature slug (else use the active feature). Echo
`Operating on feature: <slug>`.

1. Gate check: `.framework/<slug>/tasks.md` must exist and all tasks must be
   checked. If any task is unchecked, STOP and say "Run /build to complete
   remaining tasks first."
2. If `.framework/<slug>/review.md` already exists, note that you are
   producing a fresh review over the prior one.
3. Adopt the **code-reviewer** role (`.framework/personas/code-reviewer.md`).
4. Write `.framework/<slug>/review.md` with findings structured as described
   in the persona. Set `> Status: complete` when done.
5. Return a verdict: N blockers / M warnings / P notes. If blockers exist,
   recommend against shipping until resolved.

This command is informational — it surfaces findings but does not block the
pipeline. `/loop` auto-chains to review after every build; it may also be
run manually at any time.

---
description: Show every feature and the draft/approved/missing state of its artifacts.
argument-hint: "[feature-slug] (optional; default: all features)"
---

# /status — where each feature stands

Steps:
1. List feature folders under `.framework/` (every directory except `templates`).
   If `$ARGUMENTS` names a slug, show only that one.
2. Note the active feature from `.framework/.active-feature` (mark it with ★).
3. For each feature, inspect these artifacts in order — `spec.md`, `design.md`,
   `monetization.md`, `plan.md`, `tasks.md` — and report each as:
   - **missing** — file not present
   - **draft** — present, `Status: draft`
   - **approved** — present, `Status: approved`
   - **n/a** — present, `Status: n/a` (monetization only)
4. For `tasks.md`, also report task progress (checked vs total checkboxes).
5. Render a compact table per feature, then state the next suggested command.
   When both `spec.md` and `design.md` are missing or `draft`, suggest `/shape`.
   When `spec.md` is approved but `design.md` is missing/draft, suggest
   `/design` (or `/shape <slug>` to resume). Otherwise suggest the next
   unapproved phase.

Example output:

```
★ checkout-redesign
  spec.md          approved
  design.md        approved
  monetization.md  n/a
  plan.md          draft
  tasks.md         draft (0/6 tasks)
  → next: review plan, then approve to build
```

Read-only. This command never edits artifacts.

_When you name the suggested next command, match the namespace you were invoked
with (e.g. `/speckroo:plan` if installed as a plugin)._

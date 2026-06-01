---
description: Show every feature and the draft/approved/missing state of its artifacts.
argument-hint: "[feature-slug] (optional; default: all features)"
---

# /speckroo:status — where each feature stands

1. List feature folders under `.framework/` (except `templates`). If `$ARGUMENTS`
   names a slug, show only that one.
2. Mark the active feature from `.framework/.active-feature` with ★.
3. For each feature, inspect `spec.md`, `design.md`, `monetization.md`,
   `plan.md`, `tasks.md` and report: **missing** / **draft** / **approved** / **n/a**.
4. For `tasks.md`, also report checked vs total checkboxes.
5. Render a compact table, then suggest the next command based on the first
   unapproved artifact.

Example:
```
★ checkout-redesign
  spec.md          approved
  design.md        approved
  monetization.md  n/a
  plan.md          draft
  tasks.md         draft (0/6 tasks)
  → next: review plan, then /speckroo:approve plan
```

Read-only. Never edit artifacts.

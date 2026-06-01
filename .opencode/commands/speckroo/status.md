---
description: Show every feature and its phase status.
---

# status — where each feature stands (read-only; no persona)

Show speckroo status. If $ARGUMENTS names a slug, show only that feature.

1. List feature folders under `.framework/` (every directory except `templates`).
   Mark the active feature with ★.
2. For each feature, inspect `spec.md`, `design.md`, `monetization.md`,
   `plan.md`, `tasks.md` and report each as **missing**, **draft**,
   **approved**, or **n/a** (read each file's `Status:` line).
3. For `tasks.md`, also report progress (checked vs total checkboxes).
4. Render a compact table per feature, then state the next suggested phase
   based on the first artifact that isn't yet approved.

Read-only. Never edit artifacts.

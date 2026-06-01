---
description: Phase 1 — Product Manager drafts spec.md.
agent: product-manager
subtask: true
---

# discover — start a new feature (product-manager → spec.md)

Follow the workflow contract in `.framework/workflow.md`. Idea: $ARGUMENTS

1. Setup check: `.framework/templates/` must exist. If not, stop and tell the
   human to run `init-framework` first.
2. Derive a short kebab-case `<feature-slug>` from the idea. Create
   `.framework/<feature-slug>/` and seed **only** `spec.md` from
   `.framework/templates/spec.md` (replace the `<feature-slug>` placeholder).
   Record the slug as the active feature.
3. Echo `Operating on feature: <feature-slug>`.
4. Adopt the **product-manager** role (`.framework/personas/product-manager.md`)
   and fill `.framework/<feature-slug>/spec.md`.

Produce only `spec.md`, then STOP. Tell the human to review it and approve the
spec before moving to design. Do not start any other phase.
